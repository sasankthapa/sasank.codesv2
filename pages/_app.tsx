import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
        NProgress.start();
    }

    const handleRouteComplete = ()=>{
        NProgress.done()
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
  }, [])

  return <Component {...pageProps} />
}
export default MyApp
