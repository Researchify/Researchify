/**
 * The TeamPage component displays the team member page 
 */

import { Container,CardDeck } from 'react-bootstrap'
import TeamMember from './TeamMember'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Spinner, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import TeamMemberForm from './form/TeamMemberForm';
import { getTeamMembersByTeamId } from '../../actions/team'
import './teamPage.css'

const TeamPage = () => {
    const dispatch = useDispatch()
    const teamId = useSelector(state => state.team.teamId)
    const [showCreateForm, setShowCreateForm] = useState(false)

    useEffect(() => {
        dispatch(getTeamMembersByTeamId(teamId));
      }, [dispatch, teamId]);

    const { loading, teamMembers } = useSelector(state => state.teamMember)

    console.log(teamMembers)

    return(
        <div className="teamPageContainer">
            <h1>Meet Our Team Members</h1>
            <Button className="mt-2" onClick={() => setShowCreateForm(true)}>    
                Add Team Member
            </Button>

            <div className="text-center">
                {
                    loading && <Spinner className="mt-5" animation="border" /> 
                }
            </div>

            {
                !loading && teamMembers.length === 0 ?
                <Alert className="mt-3" variant="primary">
                    There is no member for this team. Please add team members. 
                </Alert> :
                <Container>
                    <CardDeck style={{display: 'flex', flexDirection: 'row'}} className="mt-4 mb-4">
                        {
                            teamMembers.map(member => <TeamMember member={member} key={member._id}/>)
                        }
                    </CardDeck>
                </Container>
            }

            {/* A modal for showing create a team member */}
            <Modal show={showCreateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> New Team Member </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeamMemberForm type="create" closeModal={()=>setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}


export default TeamPage 