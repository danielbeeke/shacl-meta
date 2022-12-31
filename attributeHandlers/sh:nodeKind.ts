import { Resource } from '../deps.ts'

/**
 * Values can be: 
 * sh:BlankNode, sh:IRI, sh:Literal sh:BlankNodeOrIRI, sh:BlankNodeOrLiteral and sh:IRIOrLiteral
 */
export default (singular: Resource) => {
    const nodeKind = singular.term.value
    return { nodeKind }
}