import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const property = singular.term.value
    return { property }
}