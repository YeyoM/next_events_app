import EventItem from "./event-item"

import classes from './evetn-list.module.css'

export default function EventList(props) {
  
  const { items } = props

  return (
    <ul className={classes.list}>
      {items.map(event => (
        <EventItem
          key = {event.id}
          title = {event.title} 
          image = {event.image}
          date = {event.date}
          location = {event.location}
          id = {event.id}   
        />
      ))}
    </ul>
  )
}