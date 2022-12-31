import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const alias = singular.term.value
    return { alias }
}