import { ShaclParserInterface, AttributeHandlers, PostHandlers, Options, ShaclProperty } from './types.ts'
import { N3Parser, RdfObjectLoader, Resource } from './deps.ts'

export class Parser {

    shaclParser: ShaclParserInterface
    attributeHandlers: AttributeHandlers = {}
    postHandlers: PostHandlers = {}

    constructor (options: Options = {}) {
        this.shaclParser = options.shaclParserClass ?? new N3Parser()
    }

    /**
     * Loads the handlers from a folder.
     */
    async loadHandlers (folder: string) {
        const handlers: { [key: string]: any } = {}
        const handlerFiles = Deno.readDir(`./${folder}`)
        for await (const handlerFile of handlerFiles) {
            const label = handlerFile.name.replace('.ts', '')
            handlers[label] = (await import(`./${folder}/${handlerFile.name}`)).default
        }

        return handlers
    }

    /**
     * Parsing of the SHACL string into Quads and then into the SHACL properties
     */
    async parse (shaclTurtleString: string): Promise<{ [key: string]: Array<ShaclProperty> }> {
        this.attributeHandlers = await this.loadHandlers('attributeHandlers')
        this.postHandlers = await this.loadHandlers('postHandlers')

        const quads = this.shaclParser.parse(shaclTurtleString)
        const context = { ...this.shaclParser._prefixes }
        const objectLoader = new RdfObjectLoader({ context })
        await objectLoader.importArray(quads)

        const shaclProperties: { [key: string]: Array<ShaclProperty> } = {}

        for (const [iri, resource] of Object.entries(objectLoader.resources)) {
            const targetClass = resource.property['sh:targetClass']?.term?.value
            if (!targetClass) continue
            shaclProperties[iri] = []
            
            for (const shaclProperty of resource.properties['sh:property']) {
                const property = this.processProperty(shaclProperty)
                if (Object.keys(property).length) shaclProperties[iri].push(property)
            }
        }

        return shaclProperties
    }

    /**
     * One property process,
     * First attribute handlers,
     * Then post handlers.
     * 
     * Post handlers use the data created by the attribute handlers.
     * 
     * It is possible to skip post handlers, this is done for nested statements such as sh:or sh:and.
     */
    processProperty (shaclProperty: Resource, applyPostHandlers = true) {
        const property = {}

        for (const [compactedPredicate, handler] of Object.entries(this.attributeHandlers)) {
            const singular = shaclProperty.property[compactedPredicate]
            const plural = shaclProperty.properties[compactedPredicate]
            if (!(singular && plural)) continue

            const handlerOutput = handler.call(this, singular, plural)
            if (!handlerOutput) continue

            Object.assign(property, handlerOutput)
        }    

        if (!applyPostHandlers) return property
        
        for (const handler of Object.values(this.postHandlers)) {
            const handlerOutput = handler.call(this, property)
            if (!handlerOutput) continue
            Object.assign(property, handlerOutput)
        }    

        return property
    }

}