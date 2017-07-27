import {CollectionInsertOneOptions, ReplaceOneOptions, ObjectID, Db, Collection} from 'mongodb'
import { Model } from './model'
import { kebabCase } from 'lodash'
export class MongoModel extends Model {

    static get className(): string {
        return this.toString().split ('(' || /s+/)[0].split (' ' || /s+/)[1];
    }

    static get collectionName(): string {
        return kebabCase(this.className)
    }
    
    static database: Db
    
    static get collection(): Collection<Model> {
        return this.database.collection<Model>(this.collectionName)
    }
    static get col(): Collection<Model> {
        return this.collection
    }
    
    _id: ObjectID

    get locator(): {[attr: string]: any} {
        return {_id: this._id}
    }

    async insert(options?: CollectionInsertOneOptions) {
        return await MongoModel.col.insertOne(this.toDocs(), options)
    }

    async update(options?: ReplaceOneOptions) {
        return await MongoModel.col.updateOne(this.locator, {"$set":this.toDocs()}, options)
    }
    async updateByDocs(docs: Object, options?: ReplaceOneOptions) {
        return await MongoModel.col.updateOne(this.locator, docs, options)
    }

    async delete(docs: Object, 
                 options?: { w?: number | string, wtimmeout?: number, j?: boolean, bypassDocumentValidation?: boolean }) {
        return await MongoModel.col.deleteOne(this.locator, options)
    }
}