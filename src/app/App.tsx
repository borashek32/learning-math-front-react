import { Provider } from 'react-redux'
import { store } from '../common/providers/model/store'
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from '../common/router/router'
import { Suspense } from 'react'
import { Loader } from '../common/components/loaders/CircularLoader'

const queryClient = new QueryClient()

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
