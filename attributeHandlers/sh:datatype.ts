import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const dataType = singular.term.value
    return { dataType }
}