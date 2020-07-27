import React from 'react';
import { Layout, Divider } from 'antd';

import Match from './Match';
import Stats from './Stats';
import Commentory from './Commentory';




const { Header, Footer, Sider, Content } = Layout;

const MatchContanier = (props) => {
    return(
        <Layout style={{ height: '100%' }}>
            <Header>
                <Match />
            </Header>
            <Content>
                <Stats/>
            </Content>
            {/* <Content> <Commentory /> </Content> */}
      </Layout>
    );
};

export default MatchContanier;