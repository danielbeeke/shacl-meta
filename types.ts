import { Resource } from './deps.ts'

export interface ShaclParserInterface {
    parse (shaclString: string): Array<any>
    _prefixes?: { [key: string]: string }
}

export type Options = {
    shaclParserClass? : ShaclParserInterface
}

export type ShaclProperty = {
    [key: string]: string | number | boolean
}

export type AttributeHandlers = { [key: string]: (singular: Resource, plural: Array<Resource>) => any } 
export type PostHandlers = { [key: string]: (property: { [key: string]: string }) => any } 

export type ParserOutput = { [key: string]: { 
    properties: Array<ShaclProperty> 
    attributes: { [key: string]: any }
} }