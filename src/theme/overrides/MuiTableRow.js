import palette from '../palette';

// eslint-disable-next-line import/no-anonymous-default-export
const MuiTableRow = {
  root: {
    '&$selected': {
      backgroundColor: palette.background.default
    },
    '&$hover': {
      '&:hover': {
        backgroundColor: palette.background.default
      }
    }
  }
};
export default MuiTableRow;
