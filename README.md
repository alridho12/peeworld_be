<br />
<p align="center">
  <div align="center">
    <img height="150" src="https://cdn.discordapp.com/attachments/1118733891738554480/1147830303457550416/Screenshot_120-removebg-preview.png" alt="blanja" border="0"/>
  </div>
  <h3 align="center">Blanja</h3>
  <p align="center">
    <a href="https://github.com/alridho12/peeworld_be"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://peeworld-fe-4b1w.vercel.app/">View Demo</a>
    ·
    <a href="https://peeworld-be.vercel.app/portofolio/">Api Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)
  - [Related Project](#related-project)
- [Contributors](#contributors)
  - [Meet The Team Members](#meet-the-team-members)

# About The Project

Peworld is a jobseeker website project that aims to assist Software Developers in finding jobs that match their skills.

On this website, job seekers can create a profile, upload their experience and portfolio. Peworld also offers a feature to connect job seekers with companies that are looking for candidates with the required skills.

One of the outstanding features of Peworld is the ability to identify the skills and interests of job seekers based on their abilities. With this information, recruiters can directly connect through the hire feature.

## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)

# Installation

1. Clone this repository

```sh
git clone https://github.com/alridho12/peeworld_be
```

2. Change directory to peeworld_be

```sh
cd peeworld_be
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
npm run server
```

- Or run this command for running in development environment

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/27920957/2s9YC4Vt4j)

## Related Project

:rocket: [`Backend Hiring App`](https://github.com/alridho12/peeworld_be)

:rocket: [`Frontend Hiring App`](https://github.com/alridho12/peeworld_fe)

:rocket: [`Demo Hiring App`](https://peeworld-fe-4b1w.vercel.app/)

Project link : [https://github.com/alridho12/peeworld_be](https://github.com/alridho12/peeworld_be))
