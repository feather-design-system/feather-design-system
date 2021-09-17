---
to: "packages/@featherds/<%= package %>/docs/README.md"
---

## Usage

Example usage is like the below;
```js
import { <%= h.changeCase.pascalCase(component) %> } from "@featherds/<%= package %>";

export default {
    ...
    components: {
        <%= h.changeCase.pascalCase(component) %>
    },
    ...
}

```
