import { Resource } from '../deps.ts'

export default (singular: Resource) => {
    const languageCodes = singular.list?.map(term => term.value)
    return { languageIn: languageCodes }
}