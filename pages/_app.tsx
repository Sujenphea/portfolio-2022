/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import '../styles/sanitize.css'
import '../styles/globals.css'
import { AppProps } from 'next/app'

function MyApp(props: AppProps) {
  return <props.Component {...props.pageProps} />
}

export default MyApp
