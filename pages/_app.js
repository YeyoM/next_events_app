import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import { NotificationContextProvider } from '../store/notification-context'

function MyApp({ Component, pageProps }) {
  return( 
    <NotificationContextProvider>
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
      </Layout>
    </NotificationContextProvider>
  )
}

export default MyApp
