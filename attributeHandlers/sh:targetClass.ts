import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const targetClass = singular.term.value
    return { targetClass }
}