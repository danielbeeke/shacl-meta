import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const closed = singular.term.value
    return { closed }
}