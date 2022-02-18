import { createTheme } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';
const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)
const theme = createTheme({
  palette,
  typography,
  overrides
});

export default theme;
