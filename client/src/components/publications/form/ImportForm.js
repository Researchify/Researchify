import React from 'react';
import { useSelector } from 'react-redux'
import { Spinner } from "react-bootstrap";
import ImportSuccessPage from './ImportSuccessPage';
import ImportFailPage from './ImportFailPage';
import ProfileLinkPage from './ProfileLinkPage';

const ImportForm = ({closeModal}) => {
    const { importStatus, loading } = useSelector(state => state.importedPublications)

    const displayResult = () => {
        switch(importStatus){
            case "SUCCESS":
                return <ImportSuccessPage closeModal={closeModal}/>
            case "FAIL":
                return <ImportFailPage closeModal={closeModal}/>
            default:
                return <ProfileLinkPage closeModal={closeModal}/> 
        }
    }

    return(
        loading?
        <div className="mb-3 mt-3 text-center">
            <Spinner animation="border" />
        </div>: 
        (
            importStatus !== null?
            <div>
                {displayResult()}
            </div>:
            <ProfileLinkPage closeModal={closeModal}/>     
        )
    )
}

export default ImportForm