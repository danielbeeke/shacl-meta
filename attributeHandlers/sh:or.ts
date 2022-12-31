import { Resource } from '../deps.ts'
import { Parser } from '../mod.ts'

/**
 * When an sh:or predicate is found it signals to our SHACL to TypeScript type logic 
 * that it should create multiple types and use a pipe so that those are alternative options.
 */
export default function (this: Parser, _singular: Resource, plural: Array<Resource>) {
    const or = plural.map(resource => {
        return resource.list?.map(listItem => this.processProperty(listItem))            
    }).flat()

    return { or }
}