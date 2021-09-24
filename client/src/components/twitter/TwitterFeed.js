/**
 * The TwitterFeed component displays a panel that renders a linked
 * twitter account's feed.
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Timeline } from 'react-twitter-widgets';
import { unlinkTwitter } from '../../actions/team';
import { PrimaryButton } from '../shared/styledComponents';

// css styles
const styles = {
  twitterFeed: {
    paddingTop: '15px',
    paddingBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: '1px',
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: '16px',
    position: 'fixed',
  },
};

// function of changing twitter height according window
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

// function returning twitter component
const TwitterFeed = () => {
  // get team from state
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team);

  return (
    <div style={styles.twitterFeed}>
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
