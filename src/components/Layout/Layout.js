import React from 'react';

import cn from 'classnames';

import './Layout.scss';

function Layout({ children, className }) {
  return (
    <div className={cn('Layout', className)}>
      <div className="Layout-Content">
        {children}
      </div>
    </div>
  )
}

export default Layout;
