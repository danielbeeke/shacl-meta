import { ShaclProperty } from '../types.ts'

export default (property: ShaclProperty) => {
    const min = property.min ?? 0
    const singular = min <= 1 && property.max === 1
    const multiple = !singular
    return { singular, multiple }
}