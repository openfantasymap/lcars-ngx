import { Injectable, computed, signal, type Signal } from '@angular/core';
import { createStore, bind, simulate, type LcarsCoreStore } from '@openfantasymap/lcars-core/js';

/**
 * Signal-based wrapper around the core LCARS store.
 *
 * Singleton by default (`providedIn: 'root'`); for a scoped store, list
 * `LcarsStore` in a component's `providers`.
 *
 *   const store = inject(LcarsStore);
 *   const shields = store.select<number>('shields'); // a Signal
 *   store.set('shields', 91);
 */
@Injectable({ providedIn: 'root' })
export class LcarsStore {
  private readonly core: LcarsCoreStore = createStore({});
  private readonly _state = signal<Record<string, any>>({});

  /** Reactive snapshot of the whole store. */
  readonly state = this._state.asReadonly();

  constructor() {
    this._state.set({ ...this.core.state });
    this.core.subscribe((_keys, st) => this._state.set({ ...st }));
  }

  set(key: string | Record<string, any>, value?: any): string[] {
    return this.core.set(key, value);
  }
  get(key?: string): any {
    return this.core.get(key);
  }

  /** A computed signal tracking a single key. */
  select<T = any>(key: string): Signal<T> {
    return computed(() => this._state()[key] as T);
  }

  /** Bind the core runtime to a DOM subtree (data-bind-* / inline SVG). */
  bind(root: Element): () => void {
    return bind(root, this.core);
  }

  /** Drive demo telemetry. */
  simulate(spec: Record<string, any>, intervalMs?: number): () => void {
    return simulate(this.core, spec, intervalMs);
  }

  /** Underlying core store (for loadOverview / advanced use). */
  raw(): LcarsCoreStore {
    return this.core;
  }
}
