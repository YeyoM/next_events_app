import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import Notification from '../components/ui/notification'

function MyApp({ Component, pageProps }) {
  return( 
    <Layout>
      <Head>
        <title>
          Next Events
        </title>
        <meta 
          name="description"
          content="A great events page built in top of NextJS"
        />
        <meta 
          name="viewport" 
          content="initial-scale=1.0, 
            width=device-width"
        />
      </Head>
      <Component {...pageProps} />
      <Notification title="test" message="This is a test" status="pending"/>
    </Layout>
  )
}

export default MyApp
