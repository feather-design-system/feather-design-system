---
title: "Progress Indicator"
pre: "@featherds/progress"
description: "Communicates a user-driven action is processing."
lang: en-US
tags: ["Progress", "component"]
menu: components
---

## Design
Progress indicators are designed in a linear and circular format to represent
a specified amount of time to load (determinate) or an unspecified amount of
load time (indeterminate).  Both styles of indicators have a track and an
indicator that animates over the track.  The circular indicator comes in 3
sizes while the linear indicator can be sized based on accompanying content.
The animation and design for indicators are kept simple as to not further
delay load time.

## Example
<Progress-Examples />

## Usage
Progress indicators can be used for anything within a page or application that
requires users to wait before moving on to a task.  When choosing the style or
size of indicator, the size and format of the information being presented
should be taken into consideration.

Determinate progress indicators express a specified amount of time and should
be used for anything that takes more than 10 seconds to load.  Indeterminate
progress indicators express an unspecified amount of time and can be used in
more scenarios.

### Additional Usage Guidelines

#### Determinate Progress Indicators
- Used to express a specified amount of time.
- Used only when load times can be accurately specified
- Used for load times of 10 seconds or more.
#### Indeterminate Progress Indicators
- Use an indicator for anything that takes less than 1 second to load.
