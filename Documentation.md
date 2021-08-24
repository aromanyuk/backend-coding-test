# Rides monitoring API

The API is responsible for providing a list of rides or single ride with ability to create one. The main goal is to monitor rides created by drivers.

## Requirements

- Node.js v10
- NPM

## Start the server

To start the server locally:

1. Run `npm install` command to install all dependencies
2. Run `npm start` command

## Tests

Application includes eslint and unit tests. To run whole test process use `npm test` command.
You can also run each part separately.

- Eslint `npm run lint`
- Unit tests `npm run test:unit`
- Coverage `npm run coverage`

## Continuous integration

You can find CircleCI `config.yml` file in `.circleci` folder. The project is setup to automatically run tests on CircleCI after each push of code.
Also, pre push hook was set up to prevent remote repo changes in case of failed tests.

## API documentation

API documentation can be found in `/docs` folder. It's `swagger` format of documentation for endpoints. To see documentation in Web UI format do the following:

1. Run `npm start`
2. Go to `localhost:8010/docs`