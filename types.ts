import { Resource, Quad } from './deps.ts'

export interface ShaclParserInterface {
    parse (shaclString: string): Array<Quad>
    _prefixes?: { [key: string]: string }
}

export type Options = {
    shaclParserClass? : ShaclParserInterface
}

export type ShaclProperty = {
    [key: string]: string | number | boolean
}

export type AttributeHandlers = { [key: string]: (singular: Resource, plural: Array<Resource>) => Record<string | number | symbol, never> } 
export type PostHandlers = { [key: string]: (property: { [key: string]: string }) => Record<string | number | symbol, never> } 