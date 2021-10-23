# Researchify

_An open source lightweight CMS enabling streamlined webpage development for academic research groups_

Researchify is a web platform for academic researchers, providing an end-to-end service to present and share their publications and other information on their own website. As such our product includes not only Researchify, the web platform, but also the development of websites deployed by users. 

To provide this service, this repository is set up similarly to the components depicted in Figure 2. 
- The ‘client’ folder contains everything related to the Researchify web platform. Notable items include the React UI components of Researchify, along with associated Redux reducers and actions all within their own separate subfolders.
- The ‘api’ folder contains all backend related functionality, which are implemented as Express REST APIs using Node.JS.
- The ‘scholly’ folder contains 2 subfolders ‘base’ and ‘service’. The ‘base’ folder houses the website layouts implemented using React components and environment variables for dynamic data rendering. The ‘service’ folder contains an independent microservice that invokes the base application to build a client website and deploys it to GitHub pages.

Live site: http://researchify-env.eba-wjxcgupn.ap-southeast-2.elasticbeanstalk.com/

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install all required components.

```bash
# to install `concurrently` package & nested dependencies (api & client)
npm install

# to install API packages manually
cd api
npm install

# to install frontend packages manually
cd client
npm install

# to install packages required for scholly/base
cd scholly/base
npm install

# to install packages required for scholly/service
cd scholly/service
npm install

```

To build Docker images in a single line using [docker-compose](https://docs.docker.com/compose/reference/build/):

```bash
# in root project directory
docker-compose build
```

Please create a new `.env` file in the root of `api` folder. Then, copy all keys in the team's Google Drive > Admin > Secret Environment Variable Docs to this `.env` file. If you cannot access it, please raise an issue in the repository.

## Usage

Run the _api_ and _client_ using `npm`.

```bash
# to run the application concurrently (api & client)
npm run dev

# to run backend separately
cd api
node src/server.js

# to run frontend separately
cd client
npm start

```

Run the _scholly/service_ using `npm` (Note: scholly service will need to be running concurrently in order to deploy a website through _Researchify_)
```bash
# to run the scholly service
cd scholly/service
npm start
```

Or via [docker-compose](https://docs.docker.com/compose/reference/build/):

```bash
# in root project directory
docker-compose up
```

To view the client website User Interface using fake data, run scholly/base using `npm`
```bash
cd scholly/base
npm run dev
```

## Required Software

Researchify runs on a web server environment. All components of Researchify are encapsulated by Docker containers to ensure Researchify can run on any web server.
The current web server comprises of:
- Amazon Elastic Beanstalk application the running [Multicontainer Docker](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecs.html) environment
- Amazon EC2 compute instance (t2.micro) running on Amazon Linux OS
- NGINX Reverse Proxy

The web server runs 4 Node.js projects, and so requires the following:
- Latest version of [Node.js](https://nodejs.org) (14.18.1 used during development)
- Latest version of [npm](https://www.npmjs.com/package/npm) (8.1.0 used during development)

Researchify consists of 4 Node.js projects within the following directories:
- /api (backend of Researchify dashboard)
- /client (frontend of Researchify dashboard)
- /scholly/base (frontend template of client websites)
- /scholly/service (backend to create client website frontends)

Each of these 4 projects have their own dependencies.
Dependencies can be installed by running “npm install” in the root directory of each project.
A list of these dependencies can be found within the package.json file in each project.

As mentioned before, Docker is used to assist with deployment and make it easy to deploy on any web server, with all requirements packaged into a container. Therefore, the web server must have Docker installed, to run the container. Each of the 4 projects has a Dockerfile (scholly base and service have a single shared Dockerfile).

Finally, a CI/CD pipeline is required for testing and deployment.
Currently, GitHub Actions is used.
The pipeline workflows are stored within /.github/workflows/
Current workflows include:
- CodeQL Analysis
- Static Analyser
- Integration Tests
- Deployment Strategies (Docker and AWS)

## Deployment Implementation

The primary aim of our website Researchify is to provide users with a platform where they can publish their work & publications through websites, and deploy them using our application as a backbone. This meant that the process of deployment that had to be implemented for our project needed to be robust, systematic and extremely sophisticated.
We have been able to achieve these objectives by implementing the Scholly service (via GitHub pages) and the Elastic Beanstalk application.

### Scholly

The scholly service is an independent microservice responsible for handling site deployment for the user. It uses clever mechanisms (discussed below) to upload the static assets of the edited website to the user’s GitHub Pages account. 

The client-side source code that the user creates when they edit websites on our platform, which we refer to as “static assets”, include HTML/CSS/JS files. These need to be uploaded to a host and we have used GitHub Pages as our hosting provider. The client will supply the pages repository for us to upload these static assets to via GitHubOpen Authorization (OAuth) tokens. These tokens are considered sensitive as they provide write access to a user’s repositories and so the transfer must be over HTTPS.

The main idea is that when a user wishes to deploy their site (e.g. click on Deploy), they authorise access to their GitHub account via the GitHub OAuth Web Application Flow so that we can upload their website for them into GitHub Pages. The flow is depicted in the diagrams below; but the gist of it is that our Node REST API will be leveraging Scholly for the deployment.

### Elastic Beanstalk

We have included an AWS directory in the root of our project via the AWS CloudFormation tool. This helps us deploy all our websites and applications to the AWS Elastic Beanstalk by taking in different parameters of the application and creating a new version in Elastic Beanstalk and then deploying that version. These parameters include the name of the application, details of its environment, version,tools, region etc. Overall, Elastic Beanstalk is used to deploy our entire application, including all the JavaScript components as well as Scholly.


Further details about the setup can be found here: [Elastic Beanstalk Github](https://github.com/einaregilsson/beanstalk-deploy).

## Versioning Strategy

Researchify aims to ensure that the future releases of the application are uniquely identifiable, and help identify the state of the project at every point of time.


We prefer to follow the number versioning scheme where the versions would be defined by X.Y.Z,  where:
 X represents Major: when the changes made deprecates/ adds new API functionalities. 
 Y represents Minor: when new features/ changes are added and backward- compatible.
 Z represents Patch: when the changes include minor bug fixes.

The versioning strategy during the development phase can be marked by having x as 0 and once the product is ready for production, it is initially marked 1.0.0 and incremented based on the above rule.

## Pull Request Strategy

This section aims to ensure every team member is following the same procedure for making changes to source control. Each team member is expected to create a develop branch for each feature and commit to the develop branch only.

### Creating a pull request
In order to be included in the production ready code in the main branch, the new piece of work in the develop branch needs to pass through a single pull request (PR) to the main branch. Each PR should follow the same template as decided by the whole team, important sections including summary of the changes, screenshot of the expected changes etc. 

Current PR template of the project can be found here: [PR Template](https://github.com/Researchify/Researchify/blob/main/pull_request_template.md)
Further details can be found here: [Creating a PR in GitHub](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)

### Merging a pull request

The PR will be to merge from the develop branch into the main branch. This will require at least 2 approvals from the rest of the team to accept the new changes. The reason for having approvals from other team members is to filter and prevent PRs which aren't fully finished or implemented to be merged onto the main branch, as we expect the main branch to contain the production level code and thus don't expect it to break or have unfinished features. Merged or stale branches should also be removed to achieve better branch management. 

## Documentation

In the api folder, run:

```bash
 ./node_modules/.bin/jsdoc ./src/controllers -c ./jsdoc_config.json --readme ./README.md
```

The hosted documentation site can be found at https://researchify.github.io/ [source code](https://github.com/Researchify/researchify.github.io)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
