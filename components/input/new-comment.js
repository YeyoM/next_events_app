import { useRef, useState, useContext } from 'react'
import NotificationContext from '../../store/notification-context'
import classes from './new-comment.module.css'

function NewComment(props) {

  const notificationCtx = useContext(NotificationContext)

  const [isInvalid, setIsInvalid] = useState(false)
  const [comment, setComment] = useState('')	
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const emailInputRef = useRef()
  const nameInputRef = useRef()
  const commentInputRef = useRef()

  function sendCommentHandler(event) {
    event.preventDefault()

    const enteredEmail = email
    const enteredName = name
    const enteredComment = comment

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredName ||
      enteredName.trim() === '' ||
      !enteredComment ||
      enteredComment.trim() === ''
    ) {
      notificationCtx.showNotification({
        title: 'Error',
        message: 'Please fill in all fields.',
        status: 'error'
      })
      return
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    })
    setComment('')
    setName('')
    setEmail('')
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' value={email} onChange={handleEmailChange}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' value={name} onChange={handleNameChange}/>
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' value={comment} onChange={handleCommentChange}></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
}

export default NewComment