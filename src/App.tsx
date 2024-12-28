import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import { AppStateProvider } from '@alkuip/core';
import { PrimeReactProvider } from "primereact/api";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';

const App = ()=> {
  return (
    <PrimeReactProvider>
      <AppStateProvider>
        <RouterProvider router= { router }/>
      </AppStateProvider>
    </PrimeReactProvider>
  )
}

//export default withErrorHandler(App, AppErrorBoundaryFallback);
export default App;
