/**
 * The AwardPage component displays the team Award page
 */

 import { Container, CardDeck } from 'react-bootstrap';
 import Award from './Award';
 import { useSelector, useDispatch } from 'react-redux';
 import { Button, Modal, Spinner, Alert } from 'react-bootstrap';
 import React, { useEffect, useState } from 'react';
 import AwardForm from './form/AwardForm';
 import { getAchievementsByTeamId } from '../../actions/achievements';
 import './awardPage.css';
 
 const AwardPage = () => {
   const dispatch = useDispatch();
   const teamId = useSelector((state) => state.team.teamId);
   const [showCreateForm, setShowCreateForm] = useState(false);
 
   useEffect(() => {
     if(teamId){
       dispatch(getAchievementsByTeamId(teamId));
     }
   }, [dispatch, teamId]);
 
   const { loading, achievements } = useSelector((state) => state.achievement);
 
   return (
     <div className="awardPageContainer">
       <h1>Achievements achieved by our team</h1>
       <Button className="mt-2" onClick={() => setShowCreateForm(true)}>
         Add Award
       </Button>
 
       <div className="text-center">
         {loading && <Spinner className="mt-5" animation="border" />}
       </div>
 
       {!loading && achievements.length === 0 ? (
         <Alert className="mt-3" variant="primary">
           There are no achievements to show at this moment. Add an Award!
         </Alert>
       ) : (
         <Container>
           <CardDeck
             style={{ display: 'flex', flexDirection: 'row' }}
             className="mt-4 mb-4"
           >
             {achievements.map((award) => (
               <Award award={award} key={award._id} />
             ))}
           </CardDeck>
         </Container>
       )}
 
       {/* A modal for showing create an Award */}
       <Modal show={showCreateForm}>
         <Modal.Header className="modalHeader">
           <Modal.Title> New Award </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <AwardForm
             type="create"
             closeModal={() => setShowCreateForm(false)}
           />
         </Modal.Body>
       </Modal>
     </div>
   );
 };
 
 export default AwardPage;
 