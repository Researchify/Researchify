/**
 * This file houses Action Creaters for client website
 */
import {CREATE_WEBSITE, DELETE_WEBSITE} from "./types";


/**
 * Action called when 'create website' button is clicked
 */
export const createWebsite = () => {
    return {
        type: CREATE_WEBSITE
    };
};

/**
 * Action called when user choose to delete the website
 */
export const deleteWebsite = () => {
    return {
        type: DELETE_WEBSITE
    };
};
