import { Card, Container,CardDeck } from 'react-bootstrap'
import TeamMember from './TeamMember'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Dropdown, DropdownButton, Spinner, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import TeamMemberForm from './form/TeamMemberForm';
import { getTeamMembersByTeamId } from '../../actions/team'

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
        <>
            <h1>Meet Our Team Members</h1>
            <Button className="mt-2 ml-2" onClick={() => setShowCreateForm(true)}>    
                Add Team Member
            </Button>
            <Container>
                <CardDeck className="mt-4">
                    {
                        teamMembers.map(member => <TeamMember member={member} key={member._id}/>)
                    }
                </CardDeck>
            </Container>

            {/* A modal for showing create a team member */}
            <Modal show={showCreateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> New Team Member </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeamMemberForm type="create" closeModal={()=>setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>
        </>
    )
}


export default TeamPage 