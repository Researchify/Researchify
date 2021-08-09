/**
 * The Publications component displays a list of publications.
 */
import React from 'react';

import Publication from './publication/Publication'
import './publications.css'
import {TEAM_PUBLICATIONS} from "../../global/data";


const Publications = () => {
    const teamPublications = TEAM_PUBLICATIONS;

    return (
        <>
            <div className="text-center mt-3 mb-3">
                <h4>
                    Total of {teamPublications.length} publications
                </h4>
            </div>
            <div className="publicationList">
                {
                    teamPublications.map(pub => <Publication pub={pub} key={pub._id}/>)
                }
            </div>
        </>
    )
}

export default Publications