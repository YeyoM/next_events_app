import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { useRouter } from 'next/router'
import { getAllEvents } from '../../helpers/api-util'
import Head from 'next/head'

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
      <Head>
        <title>All Events</title>
        <meta 
          name="description"
          content="A great events page built in top of NextJS"
        />
      </Head>
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