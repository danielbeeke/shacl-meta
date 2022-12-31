import { ShaclProperty } from '../types.ts'

export default (property: ShaclProperty) => {
    const singular = property.min <= 1 && property.max === 1
    const multiple = !singular
    return { singular, multiple }
}