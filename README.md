# Faris Transactions API

## Description

Faris Transactions - simple transaction aggregator application

## Application

- Live URL - [Faris Transactions](https://faris-ikqo.onrender.com)
- API Documentation - [Faris Transactions API Documentation](https://faris-ikqo.onrender.com/api)
- Note - Faris Transactions is hosted on a free spot instance that goes standby after 15 minutes of inactivity. This standby is temporary and the system would be resumed on receiving it's first request which migh take a 30s delay to restart.

## Dependencies

- yarn - [Yarn package manager](https://classic.yarnpkg.com/lang/en/docs/install/)
- postgres - [Postgres](https://www.postgresql.org/download/)

## Installation

- ### Instructions

  - setup a local database
  - create a .env file with .env.example file and put in appropriate values
  - Install dependencies

    ```bash
    yarn install
    ```

  - Migrate database

    ```bash
    yarn prisma migrate dev --name 'initial migration'
    ```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Stay in touch

- Author - [Chidiebere Nwachukwu](https://www.linkedin.com/in/chidi-godwin/)
- Website - [https://www.linkedin.com/in/chidi-godwin/](https://www.linkedin.com/in/chidi-godwin/)
- Twitter - [@chidi_godwn](https://twitter.com/chidi_godwn)
