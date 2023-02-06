import { ShaclParserInterface, Options, ParserOutput } from './types.ts'
import { N3Parser, RdfObjectLoader, Resource } from './deps.ts'
import { classAttributes, propertyAttributes } from './attributeHandlers.ts'
import postHandlers from './postHandlers.ts'

export class Parser {

    shaclParser: ShaclParserInterface

    constructor (options: Options = {}) {
        this.shaclParser = options.shaclParserClass ?? new N3Parser()
    }

    /**
     * Parsing of the SHACL string into Quads and then into the SHACL properties
     */
    async parse (shaclTurtleString: string): Promise<ParserOutput> {
        const quads = this.shaclParser.parse(shaclTurtleString)
        const context = { ...this.shaclParser._prefixes }
        const objectLoader = new RdfObjectLoader({ context })
        await objectLoader.importArray(quads)

        const shaclProperties: ParserOutput = {}

        for (const [iri, resource] of Object.entries(objectLoader.resources)) {
            const isNodeShape = resource.property['http://www.w3.org/1999/02/22-rdf-syntax-ns#type']?.term?.value === 'http://www.w3.org/ns/shacl#NodeShape'
            if (!isNodeShape) continue

            const shaclClassAttributes = this.processProperty(resource, classAttributes, {})

            shaclProperties[iri] = {
                attributes: shaclClassAttributes,
                properties: []
            }
            
            for (const shaclProperty of resource.properties['sh:property']) {
                const property = this.processProperty(shaclProperty)
                if (Object.keys(property).length) shaclProperties[iri].properties.push(property)
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
    processProperty (shaclProperty: Resource, attributeHandlers: any = propertyAttributes, afterHandlers: any = postHandlers) {
        const property = {}

        for (const [compactedPredicate, handler] of Object.entries(attributeHandlers)) {
            const singular = shaclProperty.property[compactedPredicate]
            const plural = shaclProperty.properties[compactedPredicate]
            if (!(singular && plural)) continue

            /** @ts-ignore */
            const handlerOutput = handler.call(this, singular, plural)
            if (!handlerOutput) continue

            Object.assign(property, handlerOutput)
        }    

        for (const handler of Object.values(afterHandlers)) {
            /** @ts-ignore */
            const handlerOutput = handler.call(this, property)
            if (!handlerOutput) continue
            Object.assign(property, handlerOutput)
        }    

        return property
    }

}