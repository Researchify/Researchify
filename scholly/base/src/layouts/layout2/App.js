/**
 * Root App.js
 */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TEAM_INFO } from '../../global/data';
import Sidebar from './components/layout/Sidebar';
import './components/layout/Sidebar.css';
import getRoutes from './components/router/routes';
import './components/centered.css';
import '../../shared/css/style.css';
import '../../shared/css/baseColours.css';
import TopBar from './components/layout/TopBar';
import FooterMenu from './components/layout/FooterMenu';

const themeOption = '1';
if (themeOption === '1') {
  import('../../shared/css/lightColours.css');
} else if (themeOption === '2') {
  import('../../shared/css/darkColours.css');
} else {
  // Fallback to light mode if unknown theme option is used
  import('../../shared/css/lightColours.css');
}

const App = () => {
  const { teamName } = TEAM_INFO;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const updateDimensions = () => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

    setWidth(windowWidth);
    setHeight(windowHeight);
  };

  console.log(height, width);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  }, []);

  const styles = {
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    topBarHeight: 40,
    footerMenuHeight: 50,
    showFooterMenuText: width > 500,
    showSidebar: width > 768,
    sidebarWidth: width < 1100 ? 50 : 200,
    sidebarCollapsed: width < 1100,
  };

  const contentStyle = {
    paddingTop: styles.showSidebar ? 20 : styles.topBarHeight + 20,
    paddingRight: 20,
    paddingBottom: styles.showSidebar ? 20 : styles.footerMenuHeight + 20,
    paddingLeft: styles.showSidebar ? styles.sidebarWidth + 20 : 20,
  };

  const routeItems = getRoutes().map(({ path, exact, component }) => {
    const View = component;
    return (
      <Route exact={exact} path={path} key={path}>
        <div style={contentStyle}>{View ? <View /> : null}</div>
      </Route>
    );
  });
  return (
    <div
      style={{
        backgroundColor: styles.black(0.05),
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Helmet>
        <title>{teamName}</title>
      </Helmet>

      {styles.showSidebar ? (
        <Sidebar styles={styles} />
      ) : (
        <TopBar styles={styles} />
      )}

      <Switch>
        {routeItems}
      </Switch>

      {!styles.showSidebar && (
      <FooterMenu styles={styles} />
      )}

    </div>
  );
};

export default App;
