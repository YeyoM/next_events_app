import { getFeaturedEvents } from '../dummy-data'
import EventIList from '../components/events/event-list'

export default function Home() {

  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <h1>Home</h1>
      <ul>
        <EventIList items={featuredEvents}/>
      </ul>
    </div>
  )
}