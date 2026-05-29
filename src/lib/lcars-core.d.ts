// Ambient types for the core runtime (authored in plain JS).
declare module '@openfantasymap/lcars-core/js' {
  export interface LcarsCoreStore {
    get(key?: string): any;
    set(key: string | Record<string, any>, value?: any): string[];
    update(key: string, fn: (value: any, state: Record<string, any>) => any): string[];
    subscribe(fn: (changedKeys: string[], state: Record<string, any>) => void): () => void;
    readonly state: Record<string, any>;
  }
  export function createStore(initial?: Record<string, any>): LcarsCoreStore;
  export function bind(root: Element, store: LcarsCoreStore): () => void;
  export function simulate(store: LcarsCoreStore, spec: Record<string, any>, intervalMs?: number): () => void;
  export const formatters: Record<string, (value: any) => any>;
  export function format(value: any, name?: string): any;
  export interface OverviewApi {
    host: Element;
    stage: Element;
    svg: SVGElement | null;
    regions: Map<string, Element>;
    defaults: Record<string, string>;
    seed: Record<string, string>;
    connect(store?: LcarsCoreStore): LcarsCoreStore;
    store?: LcarsCoreStore;
    statuses(): Record<string, string | null>;
    setStatus(id: string, status: string): void;
    setText(id: string, text: string): void;
    select(id: string): void;
    bind(store: LcarsCoreStore): () => void;
  }
  export function loadOverview(
    host: Element,
    source: string | SVGElement,
    opts?: { onSelect?: (id: string, el: Element) => void; legend?: boolean }
  ): Promise<OverviewApi>;
}
