# SHACL meta

Converts a SHACL file to meta data that can be read by some other library.

Main usage goals of this library:

- Convert SHACL to a TypeScript type
- Convert SHACL to a SPARQL query
- Convert SHACL to metadata that can be used to create a visual data explorer

## Previous attempt

https://github.com/danielbeeke/shaclToType

This attempt is less clean, it mushes together all these concepts into one module.
In this attempt I want to create separate modules. 
Ofcourse some thight coupling happens because of the needed metadata properties.