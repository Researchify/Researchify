import { useSelector, useDispatch } from 'react-redux'
import ImportedPublication from "../importedPublication/ImportedPublication"
import React, { useState } from 'react';
import { createBulkPublications } from "../../../actions/publications"
import { Row, Button } from "react-bootstrap";


const ImportSucessPage = ({closeModal}) => {
    const { publications } = useSelector(state => state.importedPublications)
    const teamId = useSelector(state => state.team.teamId)
    const [checkedArray, setCheckedArray] = useState(new Array(publications.length).fill(true))
    const dispatch = useDispatch()

    const checkPublication = (index) => {
        let newCheckArray = checkedArray
        newCheckArray[index] = !newCheckArray[index]
        setCheckedArray(newCheckArray)
    }

    const handleClose = () => {
        closeModal()
        dispatch({
            type: "CLEAR_IMPORT"
        })
    }

    const handleConfirmImport = () => {
        let checkedPublications = publications.filter((pub, idx) => checkedArray[idx])
        checkedPublications.map(pub => ({...pub, teamId: teamId}))
        dispatch(createBulkPublications(teamId, checkedPublications))
        handleClose()
    }

    return(
        <>
            {
                publications.map((pub, idx) => 
                    <ImportedPublication key={idx} pub={pub} index={idx} setChecked={checkPublication}/>
                )
            }
            <Row>
                <div className="ml-auto mt-3 mr-3">
                    <Button className="mr-2" variant="outline-danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleConfirmImport}> Import </Button>
                </div>
            </Row>

        </>
    )
}

export default ImportSucessPage 