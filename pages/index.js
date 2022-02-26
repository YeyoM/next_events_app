import { getFeaturedEvents } from '../dummy-data'
import EventIList from '../components/events/event-list'

export default function Home() {

  const featuredEvents = getFeaturedEvents();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <EventIList items={featuredEvents}/>
    </div>
  )
}