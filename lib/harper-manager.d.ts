export interface HarperManager {
    host: string;
    key: string;
    schema?: string;
}
export declare class HarperManager {
    constructor(_options: object);
    private init;
    describeDB(): Promise<any>;
    describeSchema(_schema: string): Promise<any>;
    createSchema(_schema: string): Promise<any>;
    dropSchema(_schema: string): Promise<any>;
    createTable(_options: object): Promise<any>;
    dropTable(_options: object): Promise<any>;
    describeTable(_options: object): Promise<any>;
    insert(_options: object): Promise<any>;
    delete(_options: object): Promise<any>;
    upsert(_options: object): Promise<any>;
    update(_options: object): Promise<any>;
    searchByHash(_options: object): Promise<any>;
    searchByValue(_options: object): Promise<any>;
    searchByConditions(_options: object): Promise<any>;
    csvUrlLoad(_options: object): Promise<any>;
}
