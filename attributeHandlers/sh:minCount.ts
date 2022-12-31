import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const required = parseInt(singular.term.value) > 0
    const min = parseInt(singular.term.value)
    
    return { required, min }
}