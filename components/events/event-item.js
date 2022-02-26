import Link from 'next/Link'

import Button from '../ui/button'

import classes from './event-item.module.css'

export default function EventItem(props) {

  const {
    title,
    image,
    date,
    location,
    id
  } = props

  const humanRedableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const formattedAdress = location.replace(', ', '\n')

  const exploreLink = `/events/${id}`

  return (
    <li className={classes.item}>
      <img 
        src={'/' + image} 
        alt={title} 
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanRedableDate}</time>
          </div>
        </div>
        <div className={classes.address}>
          <address>{formattedAdress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink} >Explore Event</Button>
        </div>
      </div>
    </li>
  )
}