import { MongoClient } from 'mongodb'

export default async function handler(req, res) {

  const eventId = req.query.eventId

  const client = await MongoClient.connect(process.env.mongoUrl);

  if(req.method === 'POST') {
    const {
      email,
      name,
      text
    } = req.body

    if(!email || !name || !text || !email.includes('@')) {
      res.status(422).json({
        message: 'Missing or invalid information'  
      })
      return
    }

    const newComment = {
      email,
      name,
      text,
      event: eventId,
    }

    // store newComment on a database
    const db = client.db()
    const result = await db.collection('comments').insertOne(newComment)

    res.status(201).send({
      message: 'Comment send correctly to event ' + eventId,
      result
    })

  } else if(req.method === 'GET') {

    // get the comments from a database
    const allComments = [
      { id: 'c1', name: 'Yeyo', text: 'comment 1' },
      { id: 'c2', name: 'Yeyo', text: 'comment 2' }
    ]

    res.status(201).send({
      message: 'Comments of event ' + eventId,
      comments: allComments
    })
  }

  client.close()

}