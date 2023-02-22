import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const expandAll = singular.term.value === 'true'
    return { expandAll }
}