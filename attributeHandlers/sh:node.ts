import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const nodeType = singular.term.value
    return { nodeType }
}