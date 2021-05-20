import { Alert, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { IMPORT_CLEAR_STATE } from "../../../actions/types"

const ImportFailPage = ({closeModal}) => {
    const { error } = useSelector(state => state.importedPublications)
    const dispatch = useDispatch()

    const handleClose = () => {
        closeModal()
        dispatch({
            type: IMPORT_CLEAR_STATE
        })
    }

    return(
        <>
            <Alert variant='danger'>
                {error}
            </Alert>
            <Row>
                <div className="ml-auto mt-3 mr-3">
                    <Button className="mr-2" variant="outline-danger" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Row>
        </>
    )
}

export default ImportFailPage