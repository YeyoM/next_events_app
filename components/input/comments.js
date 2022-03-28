import { useState, useEffect } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

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
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
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