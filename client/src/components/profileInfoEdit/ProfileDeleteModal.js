/**
 * Delete Alert Modal component display a modal and ask for confirmation when the delete button is clicked
 */
import React from 'react';
 import toast from 'react-hot-toast';
 import { Button, Modal } from 'react-bootstrap'; 
 import { useSelector, useDispatch } from 'react-redux';
 import { logout } from '../../actions/auth';
 import { deleteTeam ,deleteGHPages} from '../../actions/team';


  const ProfileDeleteModal = ({ deleteAlert, setdeleteAlert }) => {


    const {
      teamId
    } = useSelector(
      (state) => state.team,
    );
    
   const dispatch = useDispatch();


   const fullDelete = () => {

    const access_token = localStorage.getItem('GH_access_token');
    dispatch(deleteGHPages(teamId,access_token))
    // dispatch(deleteTeam(teamId))
    // dispatch(logout())
    
    toast.success(`profile has been successfully deleted${access_token}`);
    // delete github repo using git apis
    
   };
   const handleDelete = () => {
    
    dispatch(deleteTeam(teamId))
    dispatch(logout())
    toast.success(`profile has been successfully deleted${teamId}`);

   };
   return (
     <Modal show={deleteAlert}>
       <Modal.Header className="modalHeader">
         <Modal.Title> Delete Account! </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         Are you sure you want to delete your account? All significant data will be deleted!
       </Modal.Body>
       <Modal.Footer>
       <Button variant="light" onClick={() => setdeleteAlert(false)}>
           back
         </Button>
         <Button variant="danger" onClick={handleDelete}>
           Keep github page
         </Button>
         <Button variant="danger" onClick={fullDelete}>
           Delete All Data
         </Button>
       </Modal.Footer>
     </Modal>
   );
 };
 
 export default ProfileDeleteModal;
 