
import { Card } from "antd";

import React from 'react';


const Layout = ({
    children,
  }: Readonly<{ children: React.ReactNode }>) => {
  
  return (
    <div className="container" style={{ marginTop: 12 }}>
      <div className="container__inner">
        <Card>
            <div className="margin-auto" style={{maxWidth: 700 }}>
              {children}
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Layout;