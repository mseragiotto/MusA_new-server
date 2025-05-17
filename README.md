# MusA Management Webapp - NodeJS Server

This repository contains the NodeJS server for the MusA Management webapp. The server handles the backend operations, including API endpoints, database interactions, and authentication.

The aim of this server is to replace the current MUSA backend/backoffice solution, which is split into 2 different applications that requires to be linked each other to work.

Second objective is to have an unique application that can also manage the expected new indoor positioning Library to be used by the Musa mobile client, which probably don't need any configuration on here, but at least a proper storage on the server and database side.

Currently most of the content management use cases are implemented. There is no business logic implemented, so this server is now only working to store contents.
An important TODO is to implement a layer over the existing actions to support the MUSA content management logic (users, artworks, artists, etc). This server is supposed to serve the MUSA client app during its usage.

## Table of Contents

- [MusA Management Webapp - NodeJS Server](#musa-management-webapp---nodejs-server)
  - [Table of Contents](#table-of-contents)
  - [Installation \& Requirements](#installation--requirements)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)

## Installation & Requirements

To install the necessary dependencies, run the following command:

```bash
npm install
```

To have TypeORM successfully working, a Postgres instance available is needed in your local machine (or if any remote if you have).
Then, a Database must be created. TypeORM will use it automatically to maintain the tables up-to-date, based on what is coded in the project.

Considering that this repository was built with MacOS, could be possible on Windows things can be messier and additional steps will be required to make things work.

## Usage

An environment file is needed (.env) in the parent directory (along with this README.md).
Below the schema

```
DB_HOST=localhost       #by default using postgres with TypeORM
DB_PORT=5432            #by default using postgres with TypeORM
DB_USER=username        #postgres user
DB_PASS=password        #postgres password
DB_NAME=NEW_MUSA_DB     #postgres database

JWT_SECRET=@MusA_Secret_Key_2024   #whatever value will be ok. This is used for the JWT authentication 

AWS_ACCESS_KEY_ID=                #this part is for AWS S3 integration
AWS_SECRET_ACCESS_KEY=            #a work started to manage the upload and download of files outside postgres
AWS_REGION=                       #it is not completed, so better to use local server storage linked in postgres
S3_BUCKET_NAME=
```

To start the server, use one of the following commands:

```bash
npm run dev   // ts-node-dev execution
npm run start // compile typescript and execute it
npm run build // compile typescript
```

The server will start on the default port 3000. You can change the port by editing the main index.ts file, in the last code chunk.
TO DO: add the port in the environment variables.

## API Documentation

The complete Swagger API Documentation is available at these URLs, once the server is online:

| URL                     | Description                                |
| ----------------------- | ------------------------------------------ |
| `{{environment}}/documentation/json` | The JSON object representing the API       |
| `{{environment}}/documentation/yaml` | The YAML object representing the API       |
| `{{environment}}/documentation/`     | The swagger UI                             |
