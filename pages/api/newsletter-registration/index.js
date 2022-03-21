import { MongoClient } from 'mongodb'
import 'dotenv/config'

export default async function handler(req, res) {
  if(req.method == 'POST') {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      res.status(422).send({
        message: 'Email missing or invalid'
      })
      return
    }

    const newNewsletter = {
      email
    }

    // store it in a database here
    const client = await MongoClient.connect(process.env.mongoUrl);
    const db = client.db()
    await db.collection('newsletter').insertOne(newNewsletter)
    client.close()

    res.status(201).json({
      message: 'Email successfully recieved!',
      newNewsletter
    })
  } else {
    res.status(200).json({
      message: 'Newsletter api'
    })
  }
}