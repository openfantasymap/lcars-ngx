# @openfantasymap/lcars-ngx

Angular (**standalone + signals**) components for the **LCARS** design system —
thin wrappers over [`@openfantasymap/lcars-core`](../lcars-lib) (the Stylus/CSS +
data-binding runtime). Props are signal `input()`s mapped to classes / CSS
variables; reactivity is exposed through a signal-based store service.

> **Requires Angular ≥ 17 (peer) and Node ≥ 18.19 to build.** Signals + the
> standalone APIs used here need Angular 16+. This package is authored as
> source; build it with `ng-packagr` on a Node 18+ machine (this repo's sandbox
> is pinned to Node 16 and cannot compile Angular ≥ 16).

## Install

```bash
npm install @openfantasymap/lcars-ngx @openfantasymap/lcars-core
```

Add the core stylesheet once (e.g. in `angular.json` → `styles`, or a global
`styles.css`):

```json
"styles": ["node_modules/@openfantasymap/lcars-core/dist/lcars.css", "src/styles.css"]
```

Wrap your UI with the `lcars` directive (applies tokens/font + optional theme):

```html
<div lcars theme="tng">
  <lcars-gauge [value]="shields()" color="primary" label="Shields" />
  <button lcars-button color="danger" shape="rounded" (click)="engage()">Engage</button>
</div>
```

Import what you need (standalone), or spread the `LCARS` array:

```ts
import { Component, signal } from '@angular/core';
import { LCARS } from '@openfantasymap/lcars-ngx';

@Component({
  selector: 'app-bridge',
  standalone: true,
  imports: [...LCARS],            // or list individual components
  templateUrl: './bridge.html',
})
export class BridgeComponent {
  shields = signal(98);
}
```

## Components & selectors

Element selectors (`<lcars-gauge>`, `<lcars-compass>`, …) for most components;
attribute selectors where a native element matters:
`button[lcars-button]`, `a[lcars-nav-item]`, `button[lcars-tab]`,
`a[lcars-crumb]`, `[lcars-app-sidebar|header|content]`, and the root `[lcars]`.

Full set mirrors the React package — primitives, tools, systems, navigation,
conn (compass/scanner/starmap/helm), engineering (conduit/power/MSD), comms
(panel/waveform/hail), transporter, and `lcars-overview`. All colour/size/state
inputs are signals:

```html
<lcars-slider [value]="72" color="secondary" showValue />
<lcars-compass [heading]="87" [mark]="21" />
<lcars-helm [warp]="6.2" [impulse]="75" [throttle]="80" [readouts]="readouts" />
<lcars-msd saucer="nominal" hull="warning" nacelleRight="critical" />
<lcars-toggle label="Deflector" [(checked)]="deflector" />   <!-- two-way model() -->
```

## Reactivity — `LcarsStore` (signals)

```ts
import { inject } from '@angular/core';
import { LcarsStore } from '@openfantasymap/lcars-ngx';

export class Bridge {
  private store = inject(LcarsStore);
  shields = this.store.select<number>('shields');   // Signal<number>
  constructor() {
    this.store.simulate({ shields: [20, 100] });    // demo feed
    // real feed: mqtt.on('message', (t, b) => this.store.set('shields', +b));
  }
}
```

```html
<lcars-gauge [value]="shields()" [color]="shields() < 30 ? 'danger' : 'primary'" label="Shields" />
```

`LcarsStore` is `providedIn: 'root'` (singleton); list it in a component's
`providers` for a scoped instance. For raw `data-bind-*` markup or inline SVG,
use the directive: `<div [lcarsBind]="store"> … </div>`.

## Overview (annotated SVG)

```html
<lcars-overview [svg]="svgMarkup" title="Systems" [autoConnect]="true"
                (regionSelect)="onSelect($event)"></lcars-overview>
```

Pass markup, an `<svg>`, or a `.svg` URL. `autoConnect` seeds + binds a store
from the SVG annotations; or pass `[store]="store"` to drive it from app state.

## Build

```bash
npm install          # on Node ≥ 18.19
npm run build        # ng-packagr -p ng-package.json → dist/
```

Or drop `src/lib` into an existing Angular workspace library. The components are
plain standalone classes — no NgModule required.

## Releasing

`.github/workflows/publish.yml` runs on a `v*` tag (Node 20): `npm install` →
`ng-packagr` build → publish the generated **`dist/`** to **npm (public)** with
provenance. Add the repo secret **`NPM_TOKEN`**. CI builds against the
**published** `@openfantasymap/lcars-core` (`core-version` input, default
`latest`), so publish core first.

```bash
npm version patch && git push --follow-tags
```
