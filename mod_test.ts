import { Parser } from './mod.ts'
import { assertEquals } from 'https://deno.land/std@0.168.0/testing/asserts.ts'

Deno.test('Output of Parser', async () => {
    const personTurtle = Deno.readTextFileSync('./shapes/Person.ttl')
    const shaclParser = new Parser()
    const shacl = await shaclParser.parse(personTurtle)
    const expected = JSON.parse(Deno.readTextFileSync('./expected-meta/Person.json'))
    assertEquals(shacl, expected)
})