import { useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    if(showComments) {
      fetch(`/api/comments/${eventId}`)
      .then(response => {
        return response.json()
      }).then(data => {
        setComments(data.comments)
      })
    }
  })

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
    }).then(data => {
      console.log(data)
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && message}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments;