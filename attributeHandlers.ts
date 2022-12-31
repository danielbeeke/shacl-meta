import closed from './attributeHandlers/sh:closed.ts'
import datatype from './attributeHandlers/sh:datatype.ts'
import hasValue from './attributeHandlers/sh:hasValue.ts'
import ignoredProperties from './attributeHandlers/sh:ignoredProperties.ts'
import inHandler from './attributeHandlers/sh:in.ts'
import languageIn from './attributeHandlers/sh:languageIn.ts'
import alias from './attributeHandlers/shm:alias.ts'
import maxCount from './attributeHandlers/sh:maxCount.ts'
import minCount from './attributeHandlers/sh:minCount.ts'
import nodeKind from './attributeHandlers/sh:nodeKind.ts'
import node from './attributeHandlers/sh:node.ts'
import or from './attributeHandlers/sh:or.ts'
import path from './attributeHandlers/sh:path.ts'
import property from './attributeHandlers/sh:property.ts'

export default {
    'sh:closed': closed,
    'sh:datatype': datatype,
    'sh:hasValue': hasValue,
    'sh:ignoredProperties': ignoredProperties,
    'sh:in': inHandler,
    'sh:languageIn': languageIn,
    'shm:alias': alias,
    'sh:maxCount': maxCount,
    'sh:minCount': minCount,
    'sh:nodeKind': nodeKind,
    'sh:node': node,
    'sh:or': or,
    'sh:path': path,
    'sh:property': property
}