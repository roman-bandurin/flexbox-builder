// `Vue` in `export = Vue` must be a namespace
// All available types are exported via this namespace
declare namespace Vue {
  export type CreateElement = V.CreateElement;

  export type Component = Options.Component;
  export type AsyncComponent = Options.AsyncComponent;
  export type ComponentOptions<V extends Vue> = Options.ComponentOptions<V>;
  export type FunctionalComponentOptions = Options.FunctionalComponentOptions;
  export type RenderContext = Options.RenderContext;
  export type PropOptions = Options.PropOptions;
  export type ComputedOptions<V extends Vue> = Options.ComputedOptions<V>;
  export type WatchHandler<V extends Vue> = Options.WatchHandler<V, any>;
  export type WatchOptions = Options.WatchOptions;
  export type DirectiveFunction = Options.DirectiveFunction;
  export type DirectiveOptions = Options.DirectiveOptions;

  export type PluginFunction<T> = Plugin.PluginFunction<T>;
  export type PluginObject<T> = Plugin.PluginObject<T>;

  export type VNodeChildren = VNode.VNodeChildren;
  export type VNodeChildrenArrayContents = VNode.VNodeChildrenArrayContents;
  export type VNode = VNode.VNode;
  export type VNodeComponentOptions = VNode.VNodeComponentOptions;
  export type VNodeData = VNode.VNodeData;
  export type VNodeDirective = VNode.VNodeDirective;
}

// TS cannot merge imported class with namespace, declare a subclass to bypass
declare class Vue extends V.Vue {}
export default Vue;

//Vue
declare namespace V {
	export type CreateElement = {
	  // empty node
	  (): VNode.VNode;

	  // element or component name
	  (tag: string, children: VNode.VNodeChildren): VNode.VNode;
	  (tag: string, data?: VNode.VNodeData, children?: VNode.VNodeChildren): VNode.VNode;

	  // component constructor or options
	  (tag: Options.Component, children: VNode.VNodeChildren): VNode.VNode;
	  (tag: Options.Component, data?: VNode.VNodeData, children?: VNode.VNodeChildren): VNode.VNode;

	  // async component
	  (tag: Options.AsyncComponent, children: VNode.VNodeChildren): VNode.VNode;
	  (tag: Options.AsyncComponent, data?: VNode.VNodeData, children?: VNode.VNodeChildren): VNode.VNode;
	}


	export class Vue {

	  constructor(options?: Options.ComponentOptions<Vue>);

	  $data: Object;
	  readonly $el: HTMLElement;
	  readonly $options: Options.ComponentOptions<this>;
	  readonly $parent: Vue;
	  readonly $root: Vue;
	  readonly $children: Vue[];
	  readonly $refs: { [key: string]: Vue | Element | Vue[] | Element[]};
	  readonly $slots: { [key: string]: VNode.VNode[] };
	  readonly $scopedSlots: { [key: string]: VNode.ScopedSlot };
	  readonly $isServer: boolean;
	  readonly $ssrContext: any;
	  readonly $props: any;
	  readonly $vnode: VNode.VNode;
	  readonly $attrs: { [key: string] : string } | void;
	  readonly $listeners: { [key: string]: Function | Array<Function> } | void;

	  $mount(elementOrSelector?: Element | String, hydrating?: boolean): this;
	  $forceUpdate(): void;
	  $destroy(): void;
	  $set: typeof Vue.set;
	  $delete: typeof Vue.delete;
	  $watch(
	    expOrFn: string,
	    callback: Options.WatchHandler<this, any>,
	    options?: Options.WatchOptions
	  ): (() => void);
	  $watch<T>(
	    expOrFn: (this: this) => T,
	    callback: Options.WatchHandler<this, T>,
	    options?: Options.WatchOptions
	  ): (() => void);
	  $on(event: string | string[], callback: Function): this;
	  $once(event: string, callback: Function): this;
	  $off(event?: string | string[], callback?: Function): this;
	  $emit(event: string, ...args: any[]): this;
	  $nextTick(callback: (this: this) => void): void;
	  $nextTick(): Promise<void>;
	  $createElement: CreateElement;

	  static config: {
	    silent: boolean;
	    optionMergeStrategies: any;
	    devtools: boolean;
	    productionTip: boolean;
	    performance: boolean;
	    errorHandler(err: Error, vm: Vue, info: string): void;
	    warnHandler(msg: string, vm: Vue, trace: string): void;
	    ignoredElements: string[];
	    keyCodes: { [key: string]: number };
	  }

	  static extend(options: Options.ComponentOptions<Vue> | Options.FunctionalComponentOptions): typeof Vue;
	  static nextTick(callback: () => void, context?: any[]): void;
	  static nextTick(): Promise<void>
	  static set<T>(object: Object, key: string, value: T): T;
	  static set<T>(array: T[], key: number, value: T): T;
	  static delete(object: Object, key: string): void;
	  static delete<T>(array: T[], key: number): void;

	  static directive(
	    id: string,
	    definition?: Options.DirectiveOptions | Options.DirectiveFunction
	  ): Options.DirectiveOptions;
	  static filter(id: string, definition?: Function): Function;
	  static component(id: string, definition?: Options.Component | Options.AsyncComponent): typeof Vue;

	  static use<T>(plugin: Plugin.PluginObject<T> | Plugin.PluginFunction<T>, options?: T): void;
	  static mixin(mixin: typeof Vue | Options.ComponentOptions<Vue>): void;
	  static compile(template: string): {
	    render(createElement: typeof Vue.prototype.$createElement): VNode.VNode;
	    staticRenderFns: (() => VNode.VNode)[];
	  };
	}
}

//Vnode
declare namespace VNode {
	export type ScopedSlot = (props: any) => VNodeChildrenArrayContents | string;

	export type VNodeChildren = VNodeChildrenArrayContents | [ScopedSlot] | string;
	export interface VNodeChildrenArrayContents {
	  [x: number]: VNode | string | VNodeChildren;
	}

	export interface VNode {
	  tag?: string;
	  data?: VNodeData;
	  children?: VNode[];
	  text?: string;
	  elm?: Node;
	  ns?: string;
	  context?: Vue;
	  key?: string | number;
	  componentOptions?: VNodeComponentOptions;
	  componentInstance?: Vue;
	  parent?: VNode;
	  raw?: boolean;
	  isStatic?: boolean;
	  isRootInsert: boolean;
	  isComment: boolean;
	}

	export interface VNodeComponentOptions {
	  Ctor: typeof Vue;
	  propsData?: Object;
	  listeners?: Object;
	  children?: VNodeChildren;
	  tag?: string;
	}

	export interface VNodeData {
	  key?: string | number;
	  slot?: string;
	  scopedSlots?: { [key: string]: ScopedSlot };
	  ref?: string;
	  tag?: string;
	  staticClass?: string;
	  class?: any;
	  staticStyle?: { [key: string]: any };
	  style?: Object[] | Object;
	  props?: { [key: string]: any };
	  attrs?: { [key: string]: any };
	  domProps?: { [key: string]: any };
	  hook?: { [key: string]: Function };
	  on?: { [key: string]: Function | Function[] };
	  nativeOn?: { [key: string]: Function | Function[] };
	  transition?: Object;
	  show?: boolean;
	  inlineTemplate?: {
	    render: Function;
	    staticRenderFns: Function[];
	  };
	  directives?: VNodeDirective[];
	  keepAlive?: boolean;
	}

	export interface VNodeDirective {
	  readonly name: string;
	  readonly value: any;
	  readonly oldValue: any;
	  readonly expression: any;
	  readonly arg: string;
	  readonly modifiers: { [key: string]: boolean };
	}
}

//Options
declare namespace Options {
	type Constructor = {
	  new (...args: any[]): any;
	}

	export type Component = typeof Vue | ComponentOptions<Vue> | FunctionalComponentOptions;
	export type AsyncComponent = (
	  resolve: (component: Component) => void,
	  reject: (reason?: any) => void
	) => Promise<Component> | Component | void;

	export interface ComponentOptions<V extends Vue> {
	  data?: Object | ((this: V) => Object);
	  props?: string[] | { [key: string]: PropOptions | Constructor | Constructor[] };
	  propsData?: Object;
	  computed?: { [key: string]: ((this: V) => any) | ComputedOptions<V> };
	  methods?: { [key: string]: (this: V, ...args: any[]) => any };
	  watch?: { [key: string]: ({ handler: WatchHandler<V, any> } & WatchOptions) | WatchHandler<V, any> | string };

	  el?: Element | String;
	  template?: string;
	  render?(this: V, createElement: Vue.CreateElement): VNode.VNode;
	  renderError?: (h: () => VNode.VNode, err: Error) => VNode.VNode;
	  staticRenderFns?: ((createElement: Vue.CreateElement) => VNode.VNode)[];

	  beforeCreate?(this: V): void;
	  created?(this: V): void;
	  beforeDestroy?(this: V): void;
	  destroyed?(this: V): void;
	  beforeMount?(this: V): void;
	  mounted?(this: V): void;
	  beforeUpdate?(this: V): void;
	  updated?(this: V): void;
	  activated?(this: V): void;
	  deactivated?(this: V): void;

	  directives?: { [key: string]: DirectiveOptions | DirectiveFunction };
	  components?: { [key: string]: Component | AsyncComponent };
	  transitions?: { [key: string]: Object };
	  filters?: { [key: string]: Function };

	  provide?: Object | (() => Object);
	  inject?: { [key: string]: string | symbol } | Array<string>;

	  model?: {
	    prop?: string;
	    event?: string;
	  };

	  parent?: Vue;
	  mixins?: (ComponentOptions<Vue> | typeof Vue)[];
	  name?: string;
	  extends?: ComponentOptions<Vue> | typeof Vue;
	  delimiters?: [string, string];
	  comments?: boolean;
	  inheritAttrs?: boolean;
	}

	export interface FunctionalComponentOptions {
	  name?: string;
	  props?: string[] | { [key: string]: PropOptions | Constructor | Constructor[] };
	  functional: boolean;
	  render(this: never, createElement: Vue.CreateElement, context: RenderContext): VNode.VNode | void;
	}

	export interface RenderContext {
	  props: any;
	  children: VNode.VNode[];
	  slots(): any;
	  data: VNode.VNodeData;
	  parent: Vue;
	  injections: any
	}

	export interface PropOptions {
	  type?: Constructor | Constructor[] | null;
	  required?: boolean;
	  default?: any;
	  validator?(value: any): boolean;
	}

	export interface ComputedOptions<V> {
	  get?(this: V): any;
	  set?(this: V, value: any): void;
	  cache?: boolean;
	}

	export type WatchHandler<V, T> = (this: V, val: T, oldVal: T) => void;

	export interface WatchOptions {
	  deep?: boolean;
	  immediate?: boolean;
	}

	export type DirectiveFunction = (
	  el: HTMLElement,
	  binding: VNode.VNodeDirective,
	  vnode: VNode.VNode,
	  oldVnode: VNode.VNode
	) => void;

	export interface DirectiveOptions {
	  bind?: DirectiveFunction;
	  inserted?: DirectiveFunction;
	  update?: DirectiveFunction;
	  componentUpdated?: DirectiveFunction;
	  unbind?: DirectiveFunction;
	}
}

//Plugins
declare namespace Plugin {
	export type PluginFunction<T> = (options?: T) => void;

	export interface PluginObject<T> {
	  install: PluginFunction<T>;
	  [key: string]: any;
	}
}
