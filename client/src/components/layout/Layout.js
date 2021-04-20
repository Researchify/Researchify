import React from 'react'
import Header from './Header'
import Drawer from './Drawer'

function Layout(PageContent) {
    return (
        <div>
            <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header />
                <Drawer />
                { PageContent() }
            </div>
        </div>
    )
}

export default Layout
