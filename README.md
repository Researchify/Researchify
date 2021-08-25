# Researchify

An open source lightweight CMS enabling streamlined webpage development for academic research groups.

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

Run the _scholly/service_ using `npm` (Note: scholly service will need to be running concurrently in order to deploy a wesbite through _Researchify_)
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
