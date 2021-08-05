import {TEAM_MEMBERS} from "../../global/data";

const TeamPage = () => {
    const teamMembers = TEAM_MEMBERS;
    return(
        <>
            <h2> Team Page </h2>
            {
                teamMembers.map((member, idx) => 
                    <div>
                        <h4> Member {idx+1} </h4>
                        <li> full Name: {member.fullName} </li>
                        <li> position: {member.position} </li>
                        <li> summary: {member.position} </li>
                    </div>)
            }
        </>
    )
}

export default TeamPage