/* eslint-disable react/no-multi-comp */
import React from 'react';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { leadershipAndGovernance, managementAndWorkforce, informationAndTechnology, standardsAndInteroperability, dataQualityAndUse } from './StagesData';
// import MuiTreeView from 'material-ui-treeview';

const getTreeItemsFromData = treeItems => {
  return treeItems.map(treeItemData => {
    let children = undefined;
    if (treeItemData.children && treeItemData.children.length > 0) {
      children = getTreeItemsFromData(treeItemData.children);
    }
    return (
      <TreeItem
        children={children}
        key={treeItemData.id}
        label={treeItemData.name}
        nodeId={treeItemData.id}
      />
    );
  });
};
const DataTreeView = ({ treeItems }) => {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {getTreeItemsFromData(treeItems)}
    </TreeView>
  );
};
export function HisOverviewStages() {
  return (
    <div className="App">
      <DataTreeView treeItems={leadershipAndGovernance} />
      <DataTreeView treeItems={managementAndWorkforce}/>
      <DataTreeView treeItems={informationAndTechnology} />
      <DataTreeView treeItems={standardsAndInteroperability}/>
      <DataTreeView treeItems={dataQualityAndUse}/>
    </div>
  );
}