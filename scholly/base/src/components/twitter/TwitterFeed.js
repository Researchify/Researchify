/**
 * The TwitterFeed component displays a panel that renders a linked twitter account's feed.
 */
import React from 'react';
import {Timeline} from 'react-twitter-widgets';
import './TwitterFeed.css';


const TwitterFeed = ({linkedHandle}) => {

    return (
        <div className="twitter-feed">
        <div>
            <h2> { linkedHandle } </h2>
        </div>
            <button> Test </button>
            <Timeline dataSource={{sourceType: 'profile', screenName: linkedHandle}} options={{height: 800}}/>
        </div>
    );
};

export default TwitterFeed;
