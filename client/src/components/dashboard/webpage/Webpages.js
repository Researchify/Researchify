import { BsPencilSquare } from 'react-icons/bs';
import {
    Table,
    Button
} from 'react-bootstrap';
import '../Dashboard.css';

const Webpages = ({currentWebPages, directToAnotherPage, showDeleteModal, setSelectedPage}) => {
    const promptDeleteConfirmation = (pageName) => {
        setSelectedPage(pageName);
        showDeleteModal();
      };

    return(
        <Table striped bordered hover>
            {
                // Display appropriate message when no webpage is added
                currentWebPages.length === 0 &&
                <thead>
                    <tr>
                        <th className="reduced-column tableHeading">
                            No web-page added yet...
                        </th>
                    </tr>
                </thead>
              }
              <tbody>
                {
                    currentWebPages.map((webPage, index) => (
                        <tr key={index}>
                            <td className="body">
                                {webPage}
                                <Button
                                    variant="outline-danger"
                                    className="action primary-danger float-right"
                                    onClick={() => promptDeleteConfirmation(webPage)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="outline-success"
                                    className="action float-right mx-2"
                                    onClick={() => {
                                        directToAnotherPage(webPage);
                                    }}
                                >
                                    <BsPencilSquare />
                                </Button>
                            </td>
                        </tr>)
                    )
                }
            </tbody>
        </Table>
    )
}

export default Webpages 