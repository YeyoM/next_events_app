export default function handler(req, res) {
  if(req.method == 'POST') {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      res.status(422).send({
        message: 'Email missing or invalid'
      })
      return
    }

    const newNewsletter = {
      id: new Date().toString(),
      email
    }

    // store it in a database here
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