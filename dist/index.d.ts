declare module "scenario" {
    import 'reflect-metadata';
    export const ScenarioMetadataKey: symbol;
    export class ScenarioFilter {
        defaultInclude: boolean;
        include: string[];
        exclude: string[];
        constructor(defaultInclude?: boolean, include?: string[], exclude?: string[]);
        check(scenario: string): boolean;
        static NEVER: ScenarioFilter;
        static ALWAYS: ScenarioFilter;
    }
    export function scenario(ScenarioFilter: ScenarioFilter): {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    export function Never(): {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    export function Always(): {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
}
declare module "validator" {
    import 'reflect-metadata';
    export const ValidateMetadataKey: symbol;
    export function validate(...validators: IValidator[]): {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    export type ValidationError = string | null | {
        [attr: string]: ValidationError;
    };
    export interface IValidator {
        validate(obj: Object): ValidationError;
    }
    export class RegexValidator implements IValidator {
        regex: RegExp;
        errorMessage: string;
        constructor(regex: RegExp, errorMessage?: string);
        validate(obj: Object): ValidationError;
    }
    export class RangeValidator implements IValidator {
        min: number;
        max: number;
        errorMessage: string;
        constructor(min?: number, max?: number, errorMessage?: string);
        validate(obj: Object): ValidationError;
    }
    export class ArrayValidator implements IValidator {
        itemValidator: IValidator;
        constructor(itemValidator: IValidator);
        validate(obj: Object): ValidationError;
    }
    export class NestedValidator implements IValidator {
        fields: string[];
        constructor(...fields: string[]);
        validate(obj: Object): ValidationError;
    }
    export class ChainValidator implements IValidator {
        validators: IValidator[];
        constructor(...validators: IValidator[]);
        validate(obj: Object): ValidationError;
    }
    export class PredicateValidator implements IValidator {
        predicate: (obj: Object) => any;
        errorMessage: string;
        constructor(predicate: (obj: Object) => any, errorMessage?: string);
        validate(obj: Object): ValidationError;
    }
    export class NotEmptyValidator implements IValidator {
        errorMessage: string;
        constructor(errorMessage?: string);
        validate(obj: Object): ValidationError;
    }
}
declare module "model" {
    import 'reflect-metadata';
    import { IValidator, ValidationError } from "validator";
    export class Model {
        scenario: string;
        scenarioDefaultInclude: boolean;
        constructor();
        isFieldAvailable(field: string): boolean;
        load(obj: Object, fields?: string[]): void;
        toDocs(fields?: string[]): Object;
        validate(fields?: string[], defaultValidator?: IValidator): ValidationError;
    }
}
declare module "mongo-model" {
    import { CollectionInsertOneOptions, ReplaceOneOptions, ObjectID, Db, Collection, InsertOneWriteOpResult, UpdateWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';
    import { Model } from "model";
    export class MongoModel extends Model {
        static readonly className: string;
        static readonly collectionName: string;
        static database: Db;
        static readonly collection: Collection<Model>;
        static readonly col: Collection<Model>;
        _id: ObjectID;
        readonly locator: {
            [attr: string]: any;
        };
        insert(options?: CollectionInsertOneOptions): Promise<InsertOneWriteOpResult>;
        update(options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
        updateByDocs(docs: Object, options?: ReplaceOneOptions): Promise<UpdateWriteOpResult>;
        delete(docs: Object, options?: {
            w?: number | string;
            wtimmeout?: number;
            j?: boolean;
            bypassDocumentValidation?: boolean;
        }): Promise<DeleteWriteOpResultObject>;
    }
}
