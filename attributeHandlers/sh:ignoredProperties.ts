import { Resource } from '../deps.ts'
import { Parser } from '../mod.ts'

export default function (this: Parser,_singular: Resource, plural: Array<Resource>) {
    const ignoredProperties = plural.map(resource => {
        return resource.list?.map(listItem => listItem.term.value)            
    }).flat()

    return { ignoredProperties }
}