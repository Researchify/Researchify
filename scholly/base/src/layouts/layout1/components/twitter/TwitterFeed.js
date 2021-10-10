/**
 * The TwitterFeed component displays a panel that renders a linked twitter account's feed.
 */
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import './TwitterFeed.css';

const TwitterFeed = ({ linkedHandle, themeOption, twitterHeight }) => {
  let borderColour = '#000000';
  if (themeOption === 'dark') {
    borderColour = '#ffffff';
  }
  return (
    <div className="twitter-feed">
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: linkedHandle }}
        options={{ theme: themeOption, height: twitterHeight, borderColor: borderColour }}
      />
    </div>
  );
};

export default TwitterFeed;
