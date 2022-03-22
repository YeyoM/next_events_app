import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util'

export default async function handler(req, res) {

  const eventId = req.query.eventId
  let client

  try {
    client = await connectDatabase();
  } catch (e) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

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

    console.log(eventId)

    // store newComment on a database
    let result;

    try {
      result = await insertDocument(client, 'comments', newComment)
      newComment._id = result.insertedId
      res.status(201).json({ message: 'Added comment.', comment: newComment })
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' })
    }

  } else if(req.method === 'GET') {

    // get the comments from a database
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 })
      const filteredDocuments = documents.filter(doc => {
        return doc.event === eventId
      })
      res.status(200).json({ comments: filteredDocuments })
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' })
    }
  }

  client.close()

}