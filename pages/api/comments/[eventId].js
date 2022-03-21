export default function handler(req, res) {

  const eventId = req.query.eventId

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
      id: new Date().toISOString()
    }

    // store newComment on a database

    res.status(201).send({
      message: 'Comment send correctly to event ' + eventId,
      newComment
    })

  } else if(req.method === 'GET') {

    // get the comments from a database
    const allComments = {
      { id: 'c1' }
    }

    res.status(201).send({
      message: 'Comments of event ' + eventId,
      allComments
    })
  }
}