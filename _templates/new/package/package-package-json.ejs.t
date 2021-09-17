---
to: "packages/@featherds/<%= package.toLowerCase() %>/package.json"
---

{
  "name": "@featherds/<%= package.toLowerCase() %>",
  "version": "0.0.1",
  "author": "NantHealth",
  "scripts": {},
  "main": "dist/app.js",
  "license": "Apache-2.0",
  "dependencies": {
    "@featherds/styles": "file:../styles",
    "vue": "^3.1.0-0"
  },
  "keywords": [
    "vue",
    "<%= h.changeCase.pascalCase(component) %>"
  ],
  "types": "./src/index.d.ts"
}

