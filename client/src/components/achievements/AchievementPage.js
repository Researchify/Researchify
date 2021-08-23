/**
 * The AchievementPage component displays the team Achievement page
 */

 import { Row, Col, Container, CardDeck } from 'react-bootstrap';
 import Achievement from './Achievement';
 import { useSelector, useDispatch } from 'react-redux';
 import { Button, Modal, Spinner, Alert } from 'react-bootstrap';
 import React, { useEffect, useState } from 'react';
 import AchievementForm from './form/AchievementForm';
 import { getAchievementsByTeamId } from '../../actions/achievements';
 import './achievementPage.css';

 const AchievementPage = () => {
   const dispatch = useDispatch();
   const teamId = useSelector((state) => state.team.teamId);
   const [showCreateForm, setShowCreateForm] = useState(false);

   useEffect(() => {
     if(teamId){
       dispatch(getAchievementsByTeamId(teamId));
     }
   }, [dispatch, teamId]);

   const { loading, achievements } = useSelector((state) => state.achievements);

   return (
     <div className="achievementPageContainer">
       <Row className="container-fluid mt-4">
        <Col>
          <h1>Achievements</h1>
        </Col>
        <Col id="achievementButton" md={{ offset: 6 }}>
          <Button className="mt-2" onClick={() => setShowCreateForm(true)}>
            Add Achievement
          </Button>
        </Col>
       </Row>
       <div className="text-center">
         {loading && <Spinner className="mt-5" animation="border" />}
       </div>

       {!loading && achievements.length === 0 ? (
         <Alert className="mt-3" variant="primary">
           There are no achievements to show at this moment. Add an Achievement!
         </Alert>
       ) : (
         <Container>
           <CardDeck
             style={{ display: 'flex', flexDirection: 'row' }}
             className="mt-4 mb-4"
           >
             {achievements.map((achievement) => (
               <Achievement achievement={achievement} key={achievement._id} />
             ))}
           </CardDeck>
         </Container>
       )}

       {/* A modal for showing create an Achievement */}
       <Modal show={showCreateForm}>
         <Modal.Header className="modalHeader">
           <Modal.Title> New Achievement </Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <AchievementForm
             type="create"
             closeModal={() => setShowCreateForm(false)}
           />
         </Modal.Body>
       </Modal>
     </div>
   );
 };

 export default AchievementPage;
