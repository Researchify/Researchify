/**
 * Root App.js
 */
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TEAM_INFO, TEAM_SITE_METADATA } from '../../global/data';
import Sidebar from './components/layout/Sidebar';
import getRoutes from './components/router/routes';
import './components/centered.css';
import '../../shared/css/style.css';
import '../../shared/css/baseColours.css';
import MobileTopBar from './components/layout/MobileTopBar';
import FooterMenu from './components/layout/FooterMenu';
import ScrollIntoView from './components/layout/ScrollIntoView';
import DesktopTopBar from './components/layout/DesktopTopBar';

const themeOption = TEAM_SITE_METADATA.template.theme;
if (themeOption === 'light') {
  import('../../shared/css/lightColours.css');
} else if (themeOption === 'dark') {
  import('../../shared/css/darkColours.css');
} else {
  // Fallback to light mode if unknown theme option is used
  import('../../shared/css/lightColours.css');
}

const App = () => {
  const { teamName } = TEAM_INFO;
  const [width, setWidth] = useState(0);
  const headerData = getRoutes();

  const updateDimensions = () => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    setWidth(windowWidth);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
  }, []);

  const styles = {
    mobiletopBarHeight: 40,
    desktoptopBarHeight: 80,
    footerMenuHeight: 50,
    showFooterMenuText: width > 500,
    showSidebar: width > 768,
    sidebarWidth: width < 1200 ? 50 : 140,
    sidebarCollapsed: width < 1200,
  };

  const contentStyle = {
    paddingTop: styles.showSidebar ? 20 : styles.mobiletopBarHeight + 20,
    paddingRight: 20,
    paddingBottom: styles.showSidebar ? 20 : styles.footerMenuHeight + 20,
    paddingLeft: styles.showSidebar ? styles.sidebarWidth + 20 : 20,
    maxWidth: '1200px',
  };

  const routeItems = headerData.map(({ path, exact, component }) => {
    const View = component;
    return (
      <Route exact={exact} path={path} key={path}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={contentStyle}>
            {styles.showSidebar && <DesktopTopBar styles={styles} />}
            {View ? <View /> : null}
          </div>
        </div>
      </Route>
    );
  });
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Helmet>
        <title>{teamName}</title>
      </Helmet>

      {styles.showSidebar ? (
        <>
          <Sidebar styles={styles} menuItems={headerData} />

        </>
      ) : (
        <MobileTopBar styles={styles} />
      )}
      <ScrollIntoView>
        <Switch>
          {routeItems}
        </Switch>
      </ScrollIntoView>

      {!styles.showSidebar && (
      <FooterMenu styles={styles} menuItems={headerData} />
      )}

    </div>
  );
};

export default App;
