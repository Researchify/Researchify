/**
 * LogoutModal component display a modal and ask for confirmation when the sign out button is clicked 
 */
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT } from '../../actions/types';
import { REMOVE_LOG_OUT_ALERT } from '../../actions/types';

const LogoutModal = () => {
    const logoutAlert = useSelector((state) => state.auth.logoutAlert);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch({ type: REMOVE_LOG_OUT_ALERT})
        dispatch({ type: LOG_OUT})
    }

    return (
        <Modal show={logoutAlert}>
            <Modal.Header className="modalHeader">
                <Modal.Title> Logging out </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to log out? 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={() => dispatch({ type: REMOVE_LOG_OUT_ALERT})}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSignOut}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LogoutModal