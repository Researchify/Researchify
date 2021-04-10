import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getPublicationById } from '../../../actions/publications'

const Publication = () => {
    const dispatch = useDispatch();
    const { pubId } = useParams();

    useEffect(() => {
        dispatch(getPublicationById(pubId));
      }, [pubId, dispatch]);
    
    const pub = useSelector(state => state.publications.currentPublication)
    
    return (
        <div>
            <h1> Individual Publication Page </h1>
            <h3> Title: {pub?.title} </h3>
            <h3> Description: {pub?.description} </h3>
            <h3> Authors: {pub?.authors.join(", ")} </h3>
            <h3> Created at: {pub?.createdAt} </h3>
            <h3> Updated at: {pub?.updatedAt} </h3>
            <h3> Year Published: {pub?.yearPublished} </h3>
            <h3> Team Id: {pub?.teamId} </h3>
        </div>
    )
}

export default Publication