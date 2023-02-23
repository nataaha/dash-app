import * as React from 'react';
import { Box, BoxProps} from '@mui/material';
import { css } from '@emotion/react';

interface ChildrenProps {
  children: React.ReactNode
}
const layout = {
  flexBox: css({
    display:'flex'
  }),
  centeredFlexBox: css({
    justifyContent: 'center',
    alignItems: 'center',
  }),
  fullSizeCenteredFlexBox: css({
    width: '100%',
    height: '100%',
  })
}
const FlexBox = <C extends React.ElementType>(props: BoxProps<C, { component?: C }>)=>{
  const { children, ...rest } = props;
  return(
    <Box 
      css={ layout.flexBox } 
      {...rest}
    >
      { children }
    </Box>
  );
} 

const CenteredFlexBox = <C extends React.ElementType>(props: BoxProps<C, { component?: C }>)=>{
  const { children, ...rest } = props;
  return (
    <FlexBox css={ layout.centeredFlexBox} />
  );
}
const FullSizeCenteredFlexBox = <C extends React.ElementType>(props: BoxProps<C, { component?: C }>)=>{
  const { children, ...rest } = props;
  return (
    <CenteredFlexBox css={ layout.fullSizeCenteredFlexBox } />
  );
}

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox };
