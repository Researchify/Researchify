/**
 * The TwitterFeed component displays a panel that renders a linked twitter account's feed.
 */
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './TwitterFeed.css';

const TwitterFeed = ({ linkedHandle, themeOption }) => (
  <div className="twitter-feed">
    <Timeline dataSource={{ sourceType: 'profile', screenName: linkedHandle }} options={{ theme: themeOption, height: 600 }} />
  </div>
);

export default TwitterFeed;
