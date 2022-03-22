import { MongoClient } from 'mongodb'
import 'dotenv/config'

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.mongoUrl)
  return client
}

export async function insertDocument(client, collection, document) {
  const db = client.db()
  const result = await db.collection(collection).insertOne(document)
  return result
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db()

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray()

  return documents
}