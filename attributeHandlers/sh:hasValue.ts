import { Resource } from '../deps.ts'
import { Parser } from '../mod.ts'

export default function (this: Parser, singular: Resource) {
    return { hasValue: singular.term.value }
}