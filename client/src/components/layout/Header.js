import React from "react"

class Header extends React.Component {
    render() {
        return (
            <header class="mdl-layout__header">
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">Researchify</span>
                    <div class="mdl-layout-spacer"></div>
                    <nav class="mdl-navigation mdl-layout--large-screen-only">
                        <a class="mdl-navigation__link" href="/temp">A profile icon here</a>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header