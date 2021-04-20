import React from 'react'
import Header from './Header'
import Drawer from './Drawer'

/**
 * Returns HTML code of particular page with pre-built layout.
 * 
 * Layout() takes PageContent {function} as input, and return HTML code to render 
 * the page with pre-built layout. PageContent must be a function that outputs 
 * HTML code of the content that user wants to put inside the page layout.
 * 
 * @param {function} PageContent A function header that outputs HTML code of the content.
 * 
 * @returns {HTML Code} HTML code to be rendered on the webpage.
 */
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
