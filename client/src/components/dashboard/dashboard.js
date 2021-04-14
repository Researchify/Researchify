import React from 'react'
import Header from '../layout/Header'
import Drawer from '../layout/Drawer'
import './Dashboard.css'


class PageContent extends React.Component {
    render() {  
        return (
            <main class="mdl-layout__content">
                <div class="page-content">

                    <div class="mdl-grid">

                        <div class="mdl-cell mdl-cell--8-col">
                            <div class="mdl-card mdl-shadow--3dp">
                                <div class="mdl-card__title">
                                    <h2 class="mdl-card__title-text">Page 1</h2>
                                </div>
                                <div class="mdl-card__supporting-text">
                                    Description of Page 1...... 
                                </div>
                                <div class="mdl-card__actions mdl-card--border">
                                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        Manage Page
                                    </a>
                                </div>
                                <div class="mdl-card__menu">
                                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                        <i class="material-icons">share</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mdl-cell mdl-cell--8-col">
                            <div class="mdl-card mdl-shadow--3dp">
                                <div class="mdl-card__title">
                                    <h2 class="mdl-card__title-text">Page 2</h2>
                                </div>
                                <div class="mdl-card__supporting-text">
                                    Description of Page 2...... 
                                </div>
                                <div class="mdl-card__actions mdl-card--border">
                                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        Manage Page
                                    </a>
                                </div>
                                <div class="mdl-card__menu">
                                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                        <i class="material-icons">share</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mdl-cell mdl-cell--8-col">
                            <div class="mdl-card mdl-shadow--3dp">
                                <div class="mdl-card__title">
                                    <h2 class="mdl-card__title-text">Page 2</h2>
                                </div>
                                <div class="mdl-card__supporting-text">
                                    Description of Page 2...... 
                                </div>
                                <div class="mdl-card__actions mdl-card--border">
                                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        Manage Page
                                    </a>
                                </div>
                                <div class="mdl-card__menu">
                                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                        <i class="material-icons">share</i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        )
    }
}

class Layout extends React.Component {
    render() {
        return (
            <div>
                <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                    <Header />
                    <Drawer />
                    <PageContent />
                </div>
            </div>
        )
    }
}

function Dashboard() {
    return (
        <Layout />
    )
}

export default Dashboard