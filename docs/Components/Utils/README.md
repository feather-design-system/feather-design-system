---
title: "Utils"
pre: "@featherds/utils"
npm: ""
description: "Handy utilities for common use cases."
lang: en-US
tags: ["Utils", "component"]
menu: components
---

## id

We have exposed `getSafeId` as a pure function that can be consumed anywhere. This is a utility for generated unique ID's for autogenerated forms etc.

### Direct Import

```js
import { getSafeId } from "@featherds/utils/id";

const uniqueId = getSafeId("My Component");
```
