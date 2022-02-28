import { getAllEvents } from "../../dummy-data"
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { useRouter } from 'next/router'

export default function AllEventsPage() {

  const router = useRouter()
  const events = getAllEvents()

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      flexDirection: 'column'
    }}>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={events}/>
    </div>
  )
}