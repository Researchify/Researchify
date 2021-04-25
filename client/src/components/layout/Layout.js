<<<<<<< HEAD
import Header from './Header'
=======
//import Header from './Header'
>>>>>>> main
import Container from "react-bootstrap/Container"

/**
 * Returns HTML code of particular page with pre-built layout.
 * 
 * Layout() takes props.innerContent {JSX Component} as input, and return HTML code to render 
 * the page with pre-built layout. 
 * 
 * @param {JSX Component} props.innerContent An JSX component to be render as the content.
 * @returns {HTML Code} HTML code to be rendered on the webpage.
 */
function Layout(props) {
    return (
        <Container fluid className="layout">
<<<<<<< HEAD
            <Header />
=======
>>>>>>> main
            {props.innerContent}
        </Container>
    )
}

export default Layout
