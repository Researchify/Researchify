const axios = require("axios");

/**
 * Creates a repository with the given `repoName` under the user represented by the given token.
 *
 * TODO: If the account already has a repository of the same name as the given `repoName`, this function will fail.
 * @param {*} token The token of the user for whom the repository is to be created
 * @param {*} owner The github username
 * @param {*} teamName The name of the user's team
 * @param {*} callback function that takes two arguments, a boolean representing whether the repository was successfully created and the api response data
 */
export async function createRepository(token, owner, teamName, callback) {
    //FIXME: For testing we just create a different repo, but it really should be ${owner}.github.io
  // let repoName = `${owner}.github.io`;
  let repoName = 'TestRepo1';
  axios({
    method: "post",
    url: 'https://api.github.com/user/repos',
    headers: { Authorization: "Bearer " + token },
    data: {
      name: repoName,
      private: false,
      description: `This repository was auto-created by Researchify to deploy ${teamName}'s website. Please avoid editing this Repository directly`,
      auto_init: true,
    },
  }).then(
    (response) => {
      callback(true, response.data)
    },
    (error) => {
      callback(false, error);
    }
  );
  
}