import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const max = parseInt(singular.term.value)
    return { max }
}