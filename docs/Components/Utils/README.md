---
title: "Utils"
lang: en-US
tags: ["Utils", "component"]
layout: ComponentLayout

---

`@featherds/utils`


## id

In previous version of Feather we exposed the `getSafeId` via a mixin through `feather-utils`. For `@featherds/utils` we have now exposed `getSafeId` as a pure function that can be consumed anywhere.

### Direct Import

```js
import { getSafeId } from "@featherds/utils/id";

const uniqueId = getSafeId("My Component");
```
