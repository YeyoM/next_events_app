import { getFilteredEvents } from '../../dummy-data'
import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'

import { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

export default function FilteredEventsPage() {

  const router = useRouter()

  const filteredData = router.query.slug;

  if (!filteredData) {
    return (
      <h1 className='center' style={{
        padding: '30px',
      }}>Loading...</h1>
    )
  }

  const filteredYear = filteredData[0]
  const filteredMonth = filteredData[1]

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if(
    isNaN(numYear) || 
    isNaN(numMonth) || 
    numYear < 2021 || 
    numYear > 2030 || 
    numMonth < 1 || 
    numMonth > 12
  ) {
    return <h1 className='center' style={{
      padding: '30px',
    }}>Oops! Invalid Request</h1>
  }

  const filteredEvents = getFilteredEvents({
    year: numYear, 
    month: numMonth
  })

  if(!filteredEvents || filteredEvents.length === 0) {
    return <h2 className='center' style={{
      padding: '30px',
    }}>No events found for the chosen filter</h2>
  }

  if(filteredEvents.length === 1) {
    return (
      <Fragment>
      <EventSummary title={filteredEvents[0].title}/>
      <EventLogistics 
        date={filteredEvents[0].date} 
        address={filteredEvents[0].location}
        image={filteredEvents[0].image}
        imageAlt={filteredEvents[0].title}
      />
      <EventContent>
        <p>{filteredEvents[0].description}</p>
      </EventContent>
    </Fragment>
    )
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh'
    }}>
      <EventList items={filteredEvents}/>
    </div>
  )
}