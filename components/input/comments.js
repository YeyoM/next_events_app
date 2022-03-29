import { useState, useEffect, useContext } from 'react'
import NotificationContext from '../../store/notification-context'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

  const notificationCtx = useContext(NotificationContext)

  const [ showComments, setShowComments ] = useState(false)
  const [ message, setMessage ] = useState('')
  const [ comments, setComments ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    if(showComments) {
      setLoading(true)
      fetch(`/api/comments/${eventId}`)
      .then(response => {
        return response.json()
      }).then(data => {
        setLoading(false)
        setComments(data.comments)
      })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  } 

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: 'Adding comment...',
      message: 'Please wait.',
      status: 'pending'
    })

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.ok) { 
        return response.json()
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!')
      })
    }).then(data => {
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully added comment.',
        status: 'success'
      })
      setEmail('')
      console.log(data)
    }).catch(e => {
      notificationCtx.showNotification({
        title: 'Something went wrong!',
        message: 'Try again later',
        status: 'error'
      })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && message}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} loading={loading}/>}
    </section>
  );
}

export default Comments;