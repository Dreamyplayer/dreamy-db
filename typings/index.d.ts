// Type definitions for Dreamy-db

declare module 'dreamy-db' {

  /**
   * The version of the package
   * @type {string}
   */
  export const version: string;

  /**
   * @class Database
   * @classdesc Lazy - A Powerful database for storing, accessing, and managing database.
   */
  export class Database {
    constructor(options?: object);

    /**
     * The name for the table of the database
     * @type {string}
     */
    public readonly name: string;

    /**
     * The filename for the database
     * @type {string}
     */
    public readonly fileName: string;

    /**
     * The path for the database
     * @type {string}
     */
    public readonly path: string;

    /**
     * Whether or not, use the memory for the database
     * @type {boolean}
     */
    public readonly memory: boolean;

    /**
     * Whether or not, the database file must exist, if not throws an Error
     * @type {boolean}
     */
    public readonly fileMustExist: boolean;

    /**
     * The timeout for the database
     * @type {number}
     */
    public readonly timeout: number;

    /**
     * The SQLite connection of the database
     * @type {*}
     */
    private db: any;

    public count(): number;
    public indexes(): string[];

    /**
     * Adds a value to a key
     * @param {string|number} key
     * @param {number} value
     * @returns {number}
     * @example
     * Database.add('key', 1);
     */
    public add(key: string | number, value: number): number;

    /**
     * Creates a backup of the database
     * @param {string} name
     * @returns {void}
     * @example
     * Database.backup('mybackup');
     */
    public backup(name: string): void;

    /**
     * Checks if the table exists in the database
     * @returns {null}
     * @private
     */
    private _check(): null;

    /**
     * Closes the database
     * @returns {void}
     * @example
     * Database.close();
     */
    public close(): any;

    /**
     * Deletes a key from the database
     * @param {string|number} key
     * @returns {boolean}
     * @example
     * Database.delete('key');
     */
    public delete(key: string | number): boolean;

    /**
     * Deletes all the keys from the database
     * @returns {boolean}
     * @example
     * Database.deleteAll();
     */
    public deleteAll(): boolean;

    /**
     * Destroys the database (THE DATABASE CANNOT BE REVERT BACK ONCE DESTROYED)
     * @returns {void}
     * @example
     * Database.destroy();
     */
    public destroy(): null;

    /**
     * Finds a key matching the prefix supplied
     * @param {string|number} prefix
     * @returns {object}
     * @example
     * Database.find('key');
     */
    public find(prefix: string | number): object;

    /**
     * Gets the specified key from the database, if exists
     * @param {string|number} key
     * @returns {string|number|Object}
     * @example
     * Database.get('key');
     */
    public get(key: string | number): string | number | object;

    /**
     * Gets all the keys and values from the database
     * @returns {Array<Object>}
     * @example
     * Database.getAll();
     */
    public getAll(): object[];

    /**
     * Whether or not, specified key exists
     * @param {string|number} key
     * @returns {boolean}
     * @example
     * Database.has('key');
     */
    public has(key: string | number): boolean;

    /**
     * Pushes a value into a key
     * @param {string|number} key
     * @param {string|number|Object} value
     * @returns {*}
     */
    public push(key: string | number, value: string | number | object): any;

    /**
     * Sets a key and value to the database
     * @param {string|number} key
     * @param {string|number|Object} value
     * @returns {Object}
     * @example
     * Database.set('key', 'value');
     */
    public set(key: string | number, value: string | number | object): object;

    /**
     * Subtracts a value from the key
     * @param {string|number} key
     * @param {number} value
     * @returns {number}
     * @example
     * Database.subtract('key', 1);
     */
    public subtract(key: string | number, value: number): number;
  }
}
