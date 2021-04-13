import React from 'react'

function Dashboard() {
    return (
        <div>
            
            <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">

                <header class="mdl-layout__header">
                    <div class="mdl-layout__header-row">
                        
          <span class="mdl-layout-title">Researchify</span>
                        
          <div class="mdl-layout-spacer"></div>
                        
          <nav class="mdl-navigation mdl-layout--large-screen-only">
                            <a class="mdl-navigation__link" href="">Suppose to be profile here</a>
                        </nav>
                    </div>
                </header>

                <div class="mdl-layout__drawer">
                    <span class="mdl-layout-title">Researchify</span>
                    <nav class="mdl-navigation">
                        <a class="mdl-navigation__link" href="">Dashboard</a>
                        <a class="mdl-navigation__link" href="/dashboard/profile">Profile</a>
                        <a class="mdl-navigation__link" href="">Something else</a>
                        <a class="mdl-navigation__link" href="">Maybe List out all the pages</a>
                        <a class="mdl-navigation__link" href="">Setting</a>
                        <a class="mdl-navigation__link" href="">Help</a>
                        <a class="mdl-navigation__link" href="">Send Feedback</a>
                    </nav>
                </div>

                <main class="mdl-layout__content">
                    <div class="page-content"></div>
                </main>
            </div>
        </div>

    )
}

export default Dashboard