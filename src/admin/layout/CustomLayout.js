import * as React from 'react';
import { Layout } from './Layout';
import { AppBar } from './AppBar';
import { Menu } from './Menu';

export const CustomLayout = (props) => {
    return <Layout {...props} appBar={AppBar} menu={Menu} />;
};