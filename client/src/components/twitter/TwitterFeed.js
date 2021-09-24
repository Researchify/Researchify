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
  // get team from state
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  // adjust the height of twitter according to the size of window
  const twitterTimelineHeight = () => {
    const windowHeight = window.innerHeight;
    switch (true) {
      case (windowHeight >= 1000):
        return { height: 800 };
      case (windowHeight < 1000 && windowHeight >= 800):
        return { height: 600 };
      case (windowHeight < 800 && windowHeight >= 600):
        return { height: 400 };
      default:
        return { height: 300 };
    }
  };

  return (
    <div className="twitter-feed">
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: team.twitterHandle }}
        options={twitterTimelineHeight()}
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
