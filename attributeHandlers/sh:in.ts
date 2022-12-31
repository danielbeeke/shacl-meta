import { Resource } from '../deps.ts'

export default (_singular: Resource, plural: Array<Resource>) => {
    const inValues = plural.map(resource => {
        return resource.list?.map(listItem => listItem.term.value)            
    }).flat()

    return { in: inValues }
}