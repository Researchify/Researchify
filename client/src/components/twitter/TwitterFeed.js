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
  },
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
        options={{
          height: 'calc(65vh)',
        }}
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
