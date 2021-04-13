/**
 * This file exports a profile page management component that displays the ability to edit user information
 */


import React from "react"
import './ProfileInfoEdit.css'

class ProfileInfoEdit extends React.Component {

    constructor(){
        super() 
        // Add user's current profile information here to display on screen (link with backend)
    }

    render(){

        return (
            <form   
                onSubmit={(event) => {
                    event.preventDefault();
                    alert('You have updated your profile')
                    /**
                     * Update user information here onclick button
                     */
                }}
            >
                
                <fieldset>
                    <h1>Edit Profile</h1>
                    
                    <label>
                        User Profile Picture    <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                    </label>
                
                    <label>
                        First Name: <input type="text" class="form-control" name="firstName" placeholder="John" />
                    </label>

                    <label>
                        Last Name:  <input type="text" class="form-control" name="lastName" placeholder="Doe" />
                    </label>

                    <label>
                        Email:  <input type="text" class="form-control" name="email" placeholder="john.doe@gmail.com"/>
                    </label>

                    <label>
                        Phone Number:   <input type="text" name="phoneNumber" />
                    </label>

                    <label>
                        Password:   <input type="text" name="password" />
                    </label>
                </fieldset>
    
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        )
    }
    
}

export default ProfileInfoEdit