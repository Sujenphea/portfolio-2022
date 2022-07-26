import '../styles/globals.css'
import { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp(props: AppProps) {
  return (
    <props.Component {...props.pageProps}>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
    </props.Component>
  )
}

export default MyApp
