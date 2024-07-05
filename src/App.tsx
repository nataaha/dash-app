import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { AppStateProvider } from '@alkuip/core';

const App = ()=> {
  return (
    <AppStateProvider>
      <RouterProvider router= { router }/>
    </AppStateProvider>
  )
}

//export default withErrorHandler(App, AppErrorBoundaryFallback);
export default App;
