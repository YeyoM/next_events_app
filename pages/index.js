import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/event-list'

export default function Home() {

  const featuredEvents = getFeaturedEvents();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <EventList items={featuredEvents}/>
    </div>
  )
}