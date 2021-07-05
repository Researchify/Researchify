/**
 * The ImportSucessPage component displays a list of publications returned by scholar api if the import is success 
 */

import { useSelector, useDispatch } from 'react-redux'
import ImportedPublication from "../importedPublication/ImportedPublication"
import React, { useState } from 'react';
import {createBulkPublications, retrieveMorePublications} from "../../../actions/publications"
import { Row, Button, Tooltip, OverlayTrigger , Pagination} from "react-bootstrap";
import { IMPORT_CLEAR_STATE, CHANGE_ACTIVE_PAGE } from "../../../actions/types";
import { pageSize } from "../../../config/publications";

const ImportSuccessPage = ({closeModal}) => {
    const { publications } = useSelector(state => state.importedPublications)
    const teamId = useSelector(state => state.team.teamId)
    const [checkedArray, setCheckedArray] = useState(new Array(publications.length).fill(true))
    const { startFrom } = useSelector(state => state.importedPublications);
    const { gScholarId } = useSelector(state => state.importedPublications);
    const { reachedEnd } = useSelector(state => state.importedPublications);
    const { activePage } = useSelector(state => state.importedPublications);
    const { totalPages } = useSelector(state => state.importedPublications);
    const { shownPublications } = useSelector(state => state.importedPublications);

    const renderPagination = () => {
        let pageItems = [];
        console.log("render pagination " + activePage);
        for (let number = 1; number <= totalPages; number++) {
            pageItems.push(
                <Pagination.Item key={number} active={number === activePage}>
                {number}
                </Pagination.Item>
            );
        }
        return pageItems;
    }

    const dispatch = useDispatch()

    const checkPublication = (index) => {
        let newCheckArray = checkedArray
        newCheckArray[index] = !newCheckArray[index]
        setCheckedArray(newCheckArray)
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You will lose your progress
        </Tooltip>
    )

    const handleClose = () => {
        closeModal()
        dispatch({
            type: IMPORT_CLEAR_STATE
        })
    }

    const handlePagination = () => {
        console.log("handle pagination")
        dispatch(retrieveMorePublications(gScholarId, startFrom))
        console.log(activePage);
    }

    const handleConfirmImport = () => {
        let checkedPublications = publications.filter((pub, idx) => checkedArray[idx])
        for (let i = 0; i < checkedPublications.length; i++) {
            checkedPublications[i].yearPublished = checkedPublications[i].yearPublished.toString() + "-01-01";
        }
        checkedPublications = checkedPublications.map(pub => ({...pub, teamId: teamId}))
        dispatch(createBulkPublications(teamId, checkedPublications))
        handleClose()
    }

    const handlePageForward = () => {
        console.log("forward " + activePage);
                console.log(
                  publications.slice(
                    (activePage) * pageSize,
                    (activePage+1) * pageSize
                  )
                );
        dispatch({
          type: CHANGE_ACTIVE_PAGE,
          payload: {
            activePage: activePage + 1,
            shownPublications: publications.slice(
              (activePage) * pageSize,
              (activePage+1) * pageSize
            ),
          },
        });
    }

    const handlePageBack = () => {
        dispatch({
          type: CHANGE_ACTIVE_PAGE,
          payload: {
            activePage: activePage - 1,
            shownPublications: publications.slice(
              (activePage - 2) * pageSize,
              (activePage - 1) * pageSize
            ),
          },
        });
    }

    const handlePageClick = (pageNo) => {
        dispatch({
            type: CHANGE_ACTIVE_PAGE,
            payload: {
                activePage: pageNo,
                shownPublications: publications.slice(
                    pageNo*pageSize, 
                    (pageNo+1)*pageSize
                )
            }
        })
    }

    // ;

    return (
      <>
        {shownPublications.map((pub, idx) => (
        <ImportedPublication
            key={idx}
            pub={pub}
            index={idx}
            setChecked={checkPublication}
        />
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination size="sm">
            <Pagination.Prev
            onClick={handlePageBack}
            disabled={activePage === 1}
            />
            {renderPagination()}
            <Pagination.Next
            onClick={handlePageForward}
            disabled={activePage === totalPages}
            />
        </Pagination>
        </div>
        <Row>
          <div className="mt-2 ml-3">
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="bottom"
              overlay={renderTooltip}
            >
              <Button
                className="mr-2"
                variant="outline-danger"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </OverlayTrigger>
          </div>
          <div className="mt-2 ml-auto mr-3 text-center">
            <Button
              variant="primary"
              disabled={reachedEnd}
              onClick={handlePagination}
            >
              {" "}
              Show more{" "}
            </Button>
          </div>
          <div className="mt-2 ml-auto mr-3">
            <Button variant="primary" onClick={handleConfirmImport}>
              {" "}
              Import{" "}
            </Button>
          </div>
        </Row>
      </>
    );
}

export default ImportSuccessPage