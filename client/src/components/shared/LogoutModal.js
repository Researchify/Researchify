/**
 * LogoutModal component display a modal and ask for confirmation when the sign out button is clicked 
 */
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { LOG_OUT } from '../../actions/types';

const LogoutModal = ({logoutAlert, setLogoutAlert}) => {
    const dispatch = useDispatch();
    const handleSignOut = () => {
        setLogoutAlert(false)
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
                <Button variant="light" onClick={() => setLogoutAlert(false)}>
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