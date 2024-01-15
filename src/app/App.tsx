import { Provider } from 'react-redux'
import { store } from './store'
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from '../common/router/router'
import { BaseLayout } from '../common/components/layouts/BaseLayout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BaseLayout>
          <RouterProvider router={router} />
        </BaseLayout>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
