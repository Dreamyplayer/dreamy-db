declare module 'dreamy-db' {
  import { EventEmitter } from 'events';

  export type DreamyOptions = {
    uri?: string;
    namespace?: string;
    serialize?: () => any;
    deserialize?: () => any;
    adapter?: string;
    store?: any;
    collection?: string;
    table?: string;
    keySize?: number;
  };

  type Element = {
    key: string;
    value?: any;
  };

  export class Dreamy extends EventEmitter {
    public options: DreamyOptions;
    constructor(options?: DreamyOptions);
    public static multi(names: string[], options?: DreamyOptions): Record<string, Dreamy>;

    public all(): Promise<Element[] | undefined>;
    public clear(): Promise<undefined>;
    public delete(key: string | string[]): Promise<boolean | boolean[]>;
    public ensure(key: string, value: any): Promise<any | undefined>;
    public find(fn: () => any, thisArg?: any): Promise<Element | undefined>;
    public get(key: string, path?: string): Promise<any | undefined>;
    public has(key: string): Promise<boolean>;
    public keys(): Promise<string[]>;
    public math(key: string, operation: string, operand: number, path?: string): Promise<true>;

    public push(key: string, value: any, path?: string, allowDuplicates?: boolean): Promise<any>;

    public remove(key: string, value: any, path?: string): Promise<any>;
    public set(key: string, value: any, path?: string): Promise<true>;
    public values(): Promise<any[]>;
  }

  export class Util {
    public static addKeyPrefix(key: string | string[], namespace: string): string;

    public static isBufferLike(value: any): boolean;
    public static get(object: object, path: string, defaultValue: object): object | undefined;

    public static load(options: DreamyOptions): any;
    public static parse(text: string): object;
    public static math(firstOperand: number, operation: string, secondOperand: number): number;

    public static mergeDefault(def: object, given: object): object;
    public static removeKeyPrefix(key: string, namespace: string): string;
    public static safeRequire(id: string): any | undefined;
    public static set(object: object, path: string | string[], value: object): object;

    public static stringify(value: any, space?: string | number): string;
    public static validateOptions(options?: DreamyOptions): void;
  }
}
