/**
 * The TwitterFeed component displays a panel that renders a linked twitter account's feed.
 */
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './TwitterFeed.css';
import { TEAM_SITE_METADATA } from '../../../../global/data';

const themeOption = TEAM_SITE_METADATA.template.theme;

const TwitterFeed = ({ linkedHandle }) => (
  <div className="twitter-feed" style={{ boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)' }}>
    <Timeline dataSource={{ sourceType: 'profile', screenName: linkedHandle }} options={{ height: 888, theme: themeOption }} />
  </div>
);

export default TwitterFeed;
