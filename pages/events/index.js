import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../helpers/api-util'

export default function AllEventsPage(props) {

  const router = useRouter()

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
      <EventList items={props.events}/>
    </div>
  )
}

export async function getStaticProps(context) {

  const allEvents = await getAllEvents()
  return {
    props: {
      events: allEvents
    },
    revalidate: 120
  }
}