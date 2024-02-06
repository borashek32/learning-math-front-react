import { Provider } from 'react-redux'
import { store } from '../common/providers/model/store'
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from '../common/router/router'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
