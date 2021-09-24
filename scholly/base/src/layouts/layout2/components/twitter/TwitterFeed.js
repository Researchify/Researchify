/**
 * The TwitterFeed component displays a panel that renders a linked twitter account's feed.
 */
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './TwitterFeed.css';
import { TEAM_SITE_METADATA } from '../../../../global/data';

const themeOption = TEAM_SITE_METADATA.template.theme;

const TwitterFeed = ({ linkedHandle }) => (
  <div className="twitter-feed">
    <Timeline dataSource={{ sourceType: 'profile', screenName: linkedHandle }} options={{ height: 800, theme: themeOption }} />
  </div>
);

export default TwitterFeed;
