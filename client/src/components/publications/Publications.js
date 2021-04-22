import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getPublicationsByTeamId } from '../../actions/publications'

const Publications = () => {
    const dispatch = useDispatch();
    const { teamId } = useParams();

    useEffect(() => {
        dispatch(getPublicationsByTeamId(teamId));
      }, [teamId, dispatch]);

    const teamPublications = useSelector(state => state.publications.teamPublications)
    
    return (
        <div> 
            <h1> Team Publications Page </h1>
            {
                teamPublications.map(pub => 
                    <div key={pub._id}>
                        <Link to={`/publications/${pub._id}`}>
                            <h3> 
                                Title: {pub.title} 
                            </h3>
                        </Link>
                        <h3> Description: {pub.description} </h3>
                        <h3> Authors: {pub.authors.join(", ")} </h3>
                        <h3> Link: {pub.link} </h3>
                        <br />
                    </div>
                )
            }

        </div>
    )
}

export default Publications