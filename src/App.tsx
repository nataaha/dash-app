import { Fragment } from 'react';
import {
  BootstrapApp
} from '@alkuip/jsonforms';

//import { withErrorHandler } from '@/error-handling';
//import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';

import Notifications from '@/sections/Notifications';
import SW from '@/serviceWorkers/SW';

const App = ()=> {
  return (
    <Fragment>
      <BootstrapApp/>
      <Notifications />
      <SW />
    </Fragment>
  )
}

//export default withErrorHandler(App, AppErrorBoundaryFallback);
export default App;
