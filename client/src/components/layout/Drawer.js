import React from "react"

class Drawer extends React.Component {
    render() {
        return (
            <div class="mdl-layout__drawer">
                <span class="mdl-layout-title">Researchify</span>
                <nav class="mdl-navigation">
                    <a class="mdl-navigation__link" href="/temp">Dashboard</a>
                    <a class="mdl-navigation__link" href="/temp">Profile</a>
                    <a class="mdl-navigation__link" href="/temp">Something else</a>
                    <a class="mdl-navigation__link" href="/temp">Pages 1</a>
                    <a class="mdl-navigation__link" href="/temp">Pages 2</a>
                    <a class="mdl-navigation__link" href="/temp">Pages 3</a>
                    <a class="mdl-navigation__link" href="/temp">Setting</a>
                    <a class="mdl-navigation__link" href="/temp">Help</a>
                    <a class="mdl-navigation__link" href="/temp">Send Feedback</a>
                </nav>
            </div>
        )
    }
}

export default Drawer