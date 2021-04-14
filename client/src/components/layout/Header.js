import React from "react"

class Header extends React.Component {
    render() {
        return (
            <header class="mdl-layout__header">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">Researchify</span>
                    <div class="mdl-layout-spacer"></div>
                    <nav class="mdl-navigation mdl-layout--large-screen-only">
                        <a class="mdl-navigation__link" href="/dashboard/profile"><span class="material-icons">account_circle</span>User Name</a>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header