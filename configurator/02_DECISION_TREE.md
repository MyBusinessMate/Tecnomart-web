# Decision Tree

Legend:
- `->` next step
- `[filter]` hidden technical filter
- `*` recommended default

## A. Gaming PC

Build Type
-> Priority

Priority
-> Best Value | Balanced* | Maximum Performance

Priority + Goal
-> CPU tier

CPU tier options are generated from the internal catalog using:
- platform generation
- performance tier
- build goal
- price tier

CPU
-> Graphics
[filter: compatible platform, tier match, target resolution/performance]

Graphics
-> Motherboard
[filter: CPU socket/platform + board generation + form factor]

Motherboard
-> Memory
[filter: board memory type + supported capacity/form factor]

Memory
-> Storage
[filter: board interface availability]

Storage
-> Power
[filter: GPU power requirement + CPU power class + safety headroom]

Power
-> Cooling
[filter: CPU thermal class + case/radiator support]

Cooling
-> Cabinet
[filter: motherboard form factor + GPU length/slot fit + cooler clearance + PSU format]

Cabinet
-> Optional monitor
[only if user chooses to add it]

Optional monitor
-> Final summary

## B. Workstation PC

Build Type
-> Priority

Priority
-> Best Value | Balanced* | Maximum Performance

Goal
-> CPU

CPU
-> Graphics
[filter: workload class]

Graphics
-> Motherboard
[filter: platform/socket]

Motherboard
-> Memory
[filter: memory type + board capacity]

Memory
-> Storage
[filter: motherboard interfaces + workload recommendation]

Storage
-> Power
[filter: power budget]

Power
-> Cooling
[filter: thermal class]

Cooling
-> Cabinet
[filter: form factor + clearances]

Cabinet
-> Final summary

## C. Complete Gaming Setup

Build Type
-> Priority

Priority
-> Best Value | Balanced* | Maximum Performance

Goal
-> PC component flow

PC component flow
-> Monitor
[filter: GPU tier + target resolution/refresh]

Monitor
-> Keyboard + Mouse
[filter: package type]

Keyboard + Mouse
-> Headset
[filter: package tier]

Headset
-> Optional extras

Optional extras
-> Final summary

## Recovery logic

At every step store:
- current step id
- all selected option ids
- recommendation source
- customizations
- current estimated subtotal if available internally

When an upstream selection changes:
1. recompute valid options for all downstream steps;
2. preserve downstream choices that remain valid;
3. clear only invalid choices;
4. show a non-blocking compatibility notice;
5. never strand the user.
