import { connectDatabase, insertDocument } from '../../../helpers/db-util'

export default async function handler(req, res) {

  try {
    client = await connectDatabase();
  } catch (e) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

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
    try {
      result = await insertDocument(client, 'newsletter', newNewsletter)
      client.close()
    } catch (e) {
      res.status(500).json({
        message: 'Couldnt upload the email!',
        newNewsletter
      })
    }

    res.status(201).json({
      message: 'Email successfully recieved!',
      newNewsletter
    })

  }
}