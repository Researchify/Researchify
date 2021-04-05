function getPublications(req, res){
    const {id} = req.params;
    const axios = require('axios');

    // set up the request parameters
    query = {
      api_key: "1DAECC1A0F80482ABCC139EA948CC23E",// use your own api key
      q: id,
      search_type: "scholar",
        num: 10
    };

    // make the http GET request to Scale SERP
    axios.get('https://api.scaleserp.com/search', { query })
      .then(response => {

        results = response.data["scholar_results"];
        es.status(200).json(results);

      }).catch(error => {
        // catch and print the error
        console.log(error);
      })
}