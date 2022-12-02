import type { AppProps } from 'next/app'
import '../styles/global.scss'
import { ProjectsProvider } from '../ProjectsContext'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProjectsProvider apiUrl='/inventario/all'>
      <Component {...pageProps} />
    </ProjectsProvider>
    )
}

export default MyApp
