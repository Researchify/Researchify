/**
 * The TwitterFeed component displays a panel that renders a linked twitter account's feed.
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Timeline } from 'react-twitter-widgets';

import { unlinkTwitter } from '../../actions/team';
import './TwitterFeed.css';

import { PrimaryButton } from '../shared/styledComponents';

const TwitterFeed = () => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  return (
    <div className="twitter-feed">
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: team.twitterHandle }}
        options={{ height: 800 }}
      />
      <PrimaryButton
        fontSize="0.875rem"
        onClick={() => dispatch(unlinkTwitter(team.teamId))}
      >
        Unlink Twitter
      </PrimaryButton>
    </div>
  );
};

export default TwitterFeed;
