/**
 * The ImportSucessPage component displays a list of publications returned by scholar api if the import is success 
 */

import { useSelector, useDispatch } from 'react-redux'
import ImportedPublication from "../importedPublication/ImportedPublication"
import React, { useState } from 'react';
import { createBulkPublications } from "../../../actions/publications"
import { Row, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { IMPORT_CLEAR_STATE } from "../../../actions/types"

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

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    const handleClose = () => {
        closeModal()
        dispatch({
            type: IMPORT_CLEAR_STATE
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
                <div className="mt-2 ml-3">
                    <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="bottom"
                        overlay={renderTooltip}
                    >
                        <Button className="mr-2" variant="outline-danger" onClick={handleClose}>
                            Cancel
                        </Button>
                    </OverlayTrigger>
                </div>
                <div className="mt-2 ml-auto mr-3">
                    <Button variant="primary" onClick={handleConfirmImport}> Import </Button>
                </div>
            </Row>

        </>
    )
}

export default ImportSucessPage 