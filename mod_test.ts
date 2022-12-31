import { Parser } from './mod.ts'

const personTurtle = Deno.readTextFileSync('./shapes/Person.ttl')
const shaclParser = new Parser()
const shacl = await shaclParser.parse(personTurtle)
console.log(JSON.stringify(shacl, null, 2))