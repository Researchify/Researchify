# Researchify

Open source web framework enabling streamlined webpage development for academic research groups.

## Installation

Use the package manager [npm](https://www.npmjs.com/get-npm) to install all required components.

```bash
# install api
cd api
npm install

# install client
cd client
npm install
```
To build Docker images in a single line using [docker-compose](https://docs.docker.com/compose/reference/build/):
```bash
# in root project directory
docker-compose build
```

## Usage
Run the *api* and *client* using `npm`.
```bash
# run api
cd api
npm run start

# run client
cd client
npm run start
```
Or via [docker-compose](https://docs.docker.com/compose/reference/build/):
```bash
# in root project directory
docker-compose up
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)