import { Card, Container,CardDeck } from 'react-bootstrap'
import TeamMember from './TeamMember'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Dropdown, DropdownButton, Spinner, Alert } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import TeamMemberForm from './form/TeamMemberForm';

const TeamPage = () => {
    const dispatch = useDispatch()
    const teamId = useSelector(state => state.team.teamId)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const { loading } = useSelector(state => state.teamMember)



    // useEffect(() => {
    //     dispatch(getTeamMembersByTeamId(teamId));
    //   }, [dispatch, teamId]);

    return(
        <>
            <h1>Meet Our Team Members</h1>
            <Button className="mt-2 ml-2" onClick={() => setShowCreateForm(true)}>    
                Add Team Member
            </Button>
            <Container>
                <CardDeck className="mt-4">
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                    <TeamMember name="Name" summary="summary"/>
                </CardDeck>
            </Container>

            {/* A modal for showing create a team member */}
            <Modal show={showCreateForm}>
                <Modal.Header className="modalHeader">
                    <Modal.Title> New Team Member </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TeamMemberForm closeModal={()=>setShowCreateForm(false)}/>
                </Modal.Body>
            </Modal>
        </>
    )
}


export default TeamPage 