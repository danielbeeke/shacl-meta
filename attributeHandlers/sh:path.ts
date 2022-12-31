import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    return { predicate: singular.term.value }
}