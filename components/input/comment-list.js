import classes from './comment-list.module.css'
import { Fragment } from 'react'

function CommentList(props) {

  const { items, loading } = props

  return (
    <Fragment>
      {
        loading 
          ? <p>Loading...</p>
          : <ul className={classes.comments}>
              {items.map(item => (
                <li key={item._id}>
                  <p>{item.text}</p>
                  <div>
                    By <address>{item.name}</address>
                  </div>
                </li>
              ))}
            </ul>
      }
    </Fragment>
  );
}

export default CommentList;