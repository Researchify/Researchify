/**
 * This module configures and starts the Scholly service.
 */
const express = require('express');
const cors = require('cors');

const logger = require('./config/log');
const deployRouter = require('./routes/deploy');


// Create and configure express server
const app = express();
const PORT = process.env.PORT || 8000;

// Use cors and express.json
app.use(cors());
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));

// "Welcome" route
app.get('/', (req, res) => res.send('You have reached the Scholly service'));

// Use the routes
app.use('/deploy', deployRouter);

const buildBaseApp = require('./core/build');
// buildBaseApp({
//     teamTwitterHandle: 'chun_yang_chen',
//     teamPublications: '[{"authors":["G","H","I"],"_id":"606e88366a6daf816da6ace7","teamId":"609f5ad827b1d48257c321d3","title":"Diagnostic standards and classification of tuberculosis","link":"https://wonder.cdc.gov/wonder/Prevguid/p0000425/p0000425.asp","description":"Historically, the American Thoracic Society (ATS) and the Centers for Disease Control(CDC) have provided guidance on the diagnosis, treatment, prevention, and control oftuberculosis in the United States and Canada. ","__v":0,"createdAt":"2021-04-08T04:36:06.220Z","updatedAt":"2021-05-16T13:22:30.702Z","category":{"type":"CONFERENCE","categoryTitle":"dwwew","volume":"1","issue":"1","pages":"1","publisher":"1"},"yearPublished":"2012-01-01T00:00:00.000Z"},{"authors":["sdsfsdf"],"_id":"609bbb991c796886683e4475","title":"Test","yearPublished":"2012-01-01T00:00:00.000Z","description":"sdcdcsdc","link":"https://react-bootstrap.github.io/components/forms/#forms-input-readonly","category":{"type":"OTHER","categoryTitle":"fsfd","volume":"ewf","issue":"ewf","pages":"","publisher":""},"teamId":"609f5ad827b1d48257c321d3","createdAt":"2021-05-12T11:27:21.542Z","updatedAt":"2021-05-16T13:23:39.362Z","__v":0},{"authors":["Author"],"_id":"609d04252a572642653f7294","title":"Some publication","yearPublished":"2021-01-01T00:00:00.000Z","description":"This is some publication.","link":"","category":{"type":"JOURNAL","categoryTitle":"Some journal","volume":"10","issue":"1","pages":"","publisher":""},"teamId":"609f5ad827b1d48257c321d3","createdAt":"2021-05-13T10:49:09.236Z","updatedAt":"2021-05-17T10:58:54.642Z","__v":0},{"authors":["Efsdfsd","author2"],"_id":"609d1877084ac83370632074","teamId":"609f5ad827b1d48257c321d3","link":"","title":"Staphylococcus aureus with reduced susceptibility to vancomycin--United States, 1997","description":"Staphylococcus aureus is one of the most common causes of both hospital-and community-acquired infections worldwide, and the antimicrobial agent vancomycin","createdAt":"2021-04-08T04:36:06.220Z","updatedAt":"2021-04-08T04:36:06.220Z","yearPublished":"2002-01-01T00:00:00.000Z","category":{"type":"CONFERENCE","categoryTitle":"vddd","publisher":"wefwefewf"},"__v":0},{"authors":["Ccccc"],"_id":"609d3b39e657890012fde46a","title":"test","yearPublished":"2021-01-01T00:00:00.000Z","description":"SSSSs","link":"","teamId":"609f5ad827b1d48257c321d3","createdAt":"2021-05-13T14:44:09.370Z","updatedAt":"2021-05-13T14:44:09.370Z","__v":0,"category":{"type":"CONFERENCE","categoryTitle":"sdfad","publisher":"rdhasdfhas"}},{"authors":["Me"],"_id":"60a08c0de473b07fb2d480ac","title":"Some title again","yearPublished":"2021-01-01T00:00:00.000Z","description":"Some description again","link":"","category":{"type":"JOURNAL","categoryTitle":"Some conference","volume":"","issue":"","pages":"","publisher":""},"teamId":"609f5ad827b1d48257c321d3","createdAt":"2021-05-16T03:05:49.333Z","updatedAt":"2021-05-16T03:05:49.333Z","__v":0},{"authors":["Me"],"_id":"60a24c531f6b4314abf27d5d","title":"This is some journal","yearPublished":"2012-01-01T00:00:00.000Z","description":"This is some journal description","link":"","category":{"type":"JOURNAL","categoryTitle":"Some journal","volume":"","issue":"","pages":"","publisher":""},"teamId":"609f5ad827b1d48257c321d3","createdAt":"2021-05-17T10:58:27.937Z","updatedAt":"2021-05-17T10:58:27.937Z","__v":0},{"authors":["fwe","fwefewf"],"_id":"60a362b6085ddf8a545c5d96","title":"fwfewffwe","yearPublished":"2021-01-01T00:00:00.000Z","description":"wefwefwe","link":"http://www.google.com","category":{"type":"JOURNAL","categoryTitle":"fwefwe","volume":"","issue":"","pages":"","publisher":""},"teamId":"609f5ad827b1d48257c321d3","createdAt":"2021-05-18T06:46:14.614Z","updatedAt":"2021-05-18T06:46:14.614Z","__v":0}]'
// });

// Listen for connections
app.listen(PORT, () => logger.info(`Scholly service running on port: ${PORT}`));