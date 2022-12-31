import { Resource } from '../deps.ts'
import { Parser } from '../mod.ts'

/**
 * When an sh:or predicate is found it signals to our SHACL to TypeScript type logic 
 * that it should create multiple types and use a pipe so that those are alternative options.
 */
export default function (this: Parser, _singular: Resource, plural: Array<Resource>) {
    const lists = plural
        .map(resource => resource.list)
        .flat()
        .filter(Boolean) as Array<Resource>
        
    const nestedAttributes = lists
        .map(resource => this.processProperty(resource, false))

    const returnObject: { [key: string]: any } = {}

    for (const nestedAttribute of nestedAttributes) {
        for (const [key, value] of Object.entries(nestedAttribute)) {
            if (!returnObject[key]) returnObject[key] = []
            returnObject[key].push(value)
        }
    }

    return { or: returnObject }
}