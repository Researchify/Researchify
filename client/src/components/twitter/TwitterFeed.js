/**
 * The TwitterFeed component displays a panel that renders a linked twitter account's feed.
 */
import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Button from 'react-bootstrap/Button'
import {Timeline} from 'react-twitter-widgets';

import {unlinkTwitter} from '../../actions/team';
import './TwitterFeed.css';


const TwitterFeed = () => {
    const dispatch = useDispatch();
    const team = useSelector(state => state.team);

    return (
        <div className="twitter-feed">
            <Timeline dataSource={{sourceType: 'profile', screenName: team.twitterHandle}} options={{height: 800}}/>
            <Button size="sm" variant="outline-secondary" onClick={() => dispatch(unlinkTwitter(team.teamId))}>
                Unlink Twitter
            </Button>
        </div>
    );
};

export default TwitterFeed;
