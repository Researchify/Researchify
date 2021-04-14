/**
 * This file exports a dashboard component, the page our users first land on upon signing in
 */
import React from 'react';
import {useSelector} from 'react-redux';

export default function Dashboard() {
    const userName = useSelector(state => {console.log(state); console.log(state.users); return state.users.userProfile?.name});
    return (
        <div>Hi {userName}!</div>
    )
}