import Head from 'next/head'

import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'
import NewsletterRegistration from '../components/input/newsletter-registration'

export default function Home(props) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      flexDirection: 'column',
    }}>
      <Head>
        <title>Events-NextJS</title>
        <meta 
          name="description"
          content="A great events page built in top of NextJS"
        />
      </Head>
      <EventList items={props.events}/>
      <NewsletterRegistration />
    </div>
  )
}

export async function getStaticProps(context) {    

  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}