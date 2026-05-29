// @openfantasymap/lcars-ngx — Angular (standalone + signals) wrappers for LCARS.
//
// Load the core stylesheet once (e.g. in angular.json styles or a global import):
//   @openfantasymap/lcars-core/dist/lcars.css
// Then import the components/directives you need, or spread LCARS into `imports`.

export * from './lib/types';
export { LcarsStore } from './lib/store';
export { LcarsBindDirective } from './lib/bind.directive';

export * from './lib/components/primitives';
export * from './lib/components/tools';
export * from './lib/components/systems';
export * from './lib/components/navigation';
export * from './lib/components/conn';
export * from './lib/components/engineering';
export * from './lib/components/comms';
export * from './lib/components/transporter';
export * from './lib/components/layout';
export { LcarsOverviewComponent } from './lib/components/overview.component';

import { LcarsBindDirective } from './lib/bind.directive';
import {
  LcarsElbowComponent, LcarsBarComponent, LcarsBarGroupComponent, LcarsBarVerticalComponent,
  LcarsBracketComponent, LcarsTextBoxComponent, LcarsReadoutComponent,
} from './lib/components/primitives';
import {
  LcarsButtonComponent, LcarsToggleComponent, LcarsSliderComponent, LcarsKeypadComponent,
  LcarsKeypadKeyComponent, LcarsIndicatorComponent,
} from './lib/components/tools';
import {
  LcarsGaugeComponent, LcarsBarGraphComponent, LcarsDataCascadeComponent, LcarsWarpCoreComponent, LcarsAlertComponent,
} from './lib/components/systems';
import {
  LcarsNavComponent, LcarsNavItemComponent, LcarsNavSpacerComponent, LcarsNavGroupComponent,
  LcarsTabsComponent, LcarsTabComponent, LcarsBreadcrumbComponent, LcarsCrumbComponent,
} from './lib/components/navigation';
import {
  LcarsCompassComponent, LcarsScannerComponent, LcarsScannerContactComponent, LcarsStarmapComponent,
  LcarsStarComponent, LcarsStarmapShipComponent, LcarsStarmapWaypointComponent, LcarsStarmapCourseComponent,
  LcarsStarmapLabelComponent, LcarsHelmComponent,
} from './lib/components/conn';
import {
  LcarsConduitComponent, LcarsPowerComponent, LcarsPowerRowComponent, LcarsMsdComponent,
} from './lib/components/engineering';
import {
  LcarsCommsComponent, LcarsCommsChannelComponent, LcarsWaveformComponent, LcarsHailComponent,
} from './lib/components/comms';
import { LcarsTransporterPadComponent, LcarsTransporterComponent } from './lib/components/transporter';
import {
  LcarsRootDirective, LcarsRowComponent, LcarsColumnComponent, LcarsPanelComponent, LcarsAppComponent,
  LcarsAppSidebarDirective, LcarsAppHeaderDirective, LcarsAppContentDirective, LcarsSpacerComponent, LcarsGrowComponent,
} from './lib/components/layout';
import { LcarsOverviewComponent } from './lib/components/overview.component';

/** Every standalone component/directive — spread into a component's `imports`. */
export const LCARS = [
  LcarsBindDirective,
  LcarsElbowComponent, LcarsBarComponent, LcarsBarGroupComponent, LcarsBarVerticalComponent,
  LcarsBracketComponent, LcarsTextBoxComponent, LcarsReadoutComponent,
  LcarsButtonComponent, LcarsToggleComponent, LcarsSliderComponent, LcarsKeypadComponent,
  LcarsKeypadKeyComponent, LcarsIndicatorComponent,
  LcarsGaugeComponent, LcarsBarGraphComponent, LcarsDataCascadeComponent, LcarsWarpCoreComponent, LcarsAlertComponent,
  LcarsNavComponent, LcarsNavItemComponent, LcarsNavSpacerComponent, LcarsNavGroupComponent,
  LcarsTabsComponent, LcarsTabComponent, LcarsBreadcrumbComponent, LcarsCrumbComponent,
  LcarsCompassComponent, LcarsScannerComponent, LcarsScannerContactComponent, LcarsStarmapComponent,
  LcarsStarComponent, LcarsStarmapShipComponent, LcarsStarmapWaypointComponent, LcarsStarmapCourseComponent,
  LcarsStarmapLabelComponent, LcarsHelmComponent,
  LcarsConduitComponent, LcarsPowerComponent, LcarsPowerRowComponent, LcarsMsdComponent,
  LcarsCommsComponent, LcarsCommsChannelComponent, LcarsWaveformComponent, LcarsHailComponent,
  LcarsTransporterPadComponent, LcarsTransporterComponent,
  LcarsRootDirective, LcarsRowComponent, LcarsColumnComponent, LcarsPanelComponent, LcarsAppComponent,
  LcarsAppSidebarDirective, LcarsAppHeaderDirective, LcarsAppContentDirective, LcarsSpacerComponent, LcarsGrowComponent,
  LcarsOverviewComponent,
] as const;
