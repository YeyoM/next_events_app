import { getFilteredEvents } from '../../helpers/api-util'
import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'

import { Fragment } from 'react'
import Head from 'next/head'

import ErrorAlert from '../../components/ui/error-alert'
import Button from '../../components/ui/button'
import ResultsTitle from '../../components/events/results-title'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

export default function FilteredEventsPage(props) {

  const router = useRouter()

  if(props.hasError) {
    return (
      <Fragment>
        <Head>
          <title>Oops, invalid filter!</title>
          <meta 
            name="description"
            content="Please select a valid filter"
          />
        </Head>
        <ErrorAlert>
          <p>Invalid filter, Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    ) 
  }

  console.log(props)

  const filteredEvents = props.events

  if(!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <Head>
          <title>No events found</title>
          <meta 
            name="description"
            content="0 events found"
          />
        </Head>
        <h2 className='center' style={{
          padding: '30px',
        }}>
          No events found for the chosen filter
        </h2>
      </Fragment>
    )
  }

  if(filteredEvents.length === 1) {
    return (
      <Fragment>
      <Head>
        <title>{filteredEvents[0].title}</title>
        <meta 
          name="description"
          content={filteredEvents[0].description}
        />
      </Head>
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

  const date = new Date(props.date.year, props.date.month - 1)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      flexDirection: 'column'
    }}>
      <Head>
        <title>Selected Events</title>
        <meta 
          name="description"
          content={`All events for ${props.date.month}/${props.date.year}.`}
        />
      </Head>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents}/>
    </div>
  )
}

export async function getServerSideProps(context) {

  const { params } = context
  const filteredData = params.slug

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
    return {
      props: { hasError: true }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear, 
    month: numMonth
  })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }
}