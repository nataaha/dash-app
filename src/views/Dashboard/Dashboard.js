import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  GridDashboard
} from '@alkuip/visualization';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [ panels, setPanels] = React.useState([]);

  const getPanels =(dashItems)=>{
    setPanels(dashItems);
  }
  return (
    <div className={classes.root}>
      <GridDashboard
        options = { panels }
        getPanels = { getPanels }
        isDraggable = { true }
        isResizable = { true }
      />
    </div>
  );
};

export default Dashboard;
