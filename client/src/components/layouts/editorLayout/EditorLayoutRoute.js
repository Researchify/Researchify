/**
 * This file exports Route that embedded with Researchify Editor Layout
 */

import React from 'react';
import { Route } from 'react-router-dom';
import EditorLayout from './EditorLayout';

const EditorLayoutRoute = ({ component: Component, ...rest }) => {
    //get 'component' and renamed to 'Component', any other 'props' renamed to 'rest'
    return (
        <Route
            {...rest}
            render={routeProps => (
                <EditorLayout>
                    <Component {...routeProps} />
                </EditorLayout>
            )}
        />
    );
};


export default EditorLayoutRoute;
