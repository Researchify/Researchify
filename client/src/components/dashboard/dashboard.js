import React from 'react'
import Header from '../layout/Header'
import Drawer from '../layout/Drawer'


class PageContent extends React.Component {
    render() {
        return (
            <main class="mdl-layout__content">
                <div class="page-content">This is the content of the pages</div>
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