import Button from '../ui/button'
import DateIcon from '../icons/date-icon'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import classes from './event-item.module.css'

import Image from 'next/image'

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
      <Image 
        src={'/' + image} 
        alt={title} 
        width={350}
        height={260}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanRedableDate}</time>
          </div>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedAdress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}