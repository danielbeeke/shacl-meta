import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    return { hasValue: singular.term.value }
}