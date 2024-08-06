import { createBrowserRouter } from 'react-router-dom'
import { PageNotFound } from '../../shared'
import { Layout } from '../../widgets'
import { PATH } from './route-path.ts'
import { DoctorsPages } from '../../pages'
import { NursesPages } from '../../pages'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: (
          <Layout>
            <DoctorsPages />
          </Layout>
        ),
        index: true,
      },
      {
        element: (
          <Layout>
            <NursesPages />
          </Layout>
        ),
        path: PATH.NURSES,
      },
    ],
    errorElement: <PageNotFound />,
    path: '/',
  },
])
