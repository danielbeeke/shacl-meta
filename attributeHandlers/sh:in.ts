import { Resource } from '../deps.ts'
import { Parser } from '../mod.ts'

export default function (this: Parser,_singular: Resource, plural: Array<Resource>) {
    const inValues = plural.map(resource => {
        return resource.list?.map(listItem => listItem.term.value)            
    }).flat()

    return { in: inValues }
}