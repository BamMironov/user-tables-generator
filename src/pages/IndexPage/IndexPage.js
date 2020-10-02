import React from 'react';

import { Layout } from 'components';
import { UserManager } from 'containers/Users';

import './IndexPage.scss';

function IndexPage() {
  return (
    <Layout className="IndexPage">
      <UserManager />
    </Layout>
  )
}

export default IndexPage;
