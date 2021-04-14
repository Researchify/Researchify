import React from "react"

class Drawer extends React.Component {
    render() {
        return (
            <div class="mdl-layout__drawer">
                <span class="mdl-layout-title">Researchify</span>
                <nav class="mdl-navigation">
                    <a class="mdl-navigation__link" href="/dashboard">Dashboard</a>
                    <a class="mdl-navigation__link" href="/dashboard/profile">Profile</a>
                    <a class="mdl-navigation__link" href="/publications">Publications</a>
                    <a class="mdl-navigation__link" >Pages 1</a>
                    <a class="mdl-navigation__link" >Pages 2</a>
                    <a class="mdl-navigation__link" >Pages 3</a>
                    <a class="mdl-navigation__link" >Setting</a>
                    <a class="mdl-navigation__link" >Help</a>
                    <a class="mdl-navigation__link" >Send Feedback</a>
                </nav>
            </div>
        )
    }
}

export default Drawer