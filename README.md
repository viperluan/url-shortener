# Pratice Test - Teddy Open Finances

Project created using Node.js, TypeScript, Prisma, PostgreSQL, JSON Web Token, Nano ID, ESLint and Prettier.

## Table of Contents

- [Pratice Test - Teddy Open Finances](#pratice-test---teddy-open-finances)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)

## About

The project allows both authenticated and non-authenticated users to use a URL shortening service, tracking the number of accesses to the shortened URLs. Authenticated users can edit or delete the URLs they created. Deletions are performed logically, meaning the record remains in the database but is no longer returned to the user and cannot be accessed anymore.

## Features

- URL Shortening: Users can shorten URLs to a shorter format.
- Access Tracking: The system tracks the number of accesses to each shortened URL.
- Authenticated User Capabilities:
  - Edit URLs: Authenticated users can edit URLs they have created.
  - Delete URLs: Authenticated users can delete URLs they have created (logically, meaning the record is kept in the database but is no longer accessible or visible).
- Logical Deletion: Deleted URLs are not removed from the database but are hidden from user access.
- Public and Authenticated Access: The URL shortening service is available to both authenticated and non-authenticated users.

## Technologies Used

- **Node.js**: [https://nodejs.org](https://nodejs.org)
- **Express**: [https://expressjs.com](https://expressjs.com)
- **Prisma**: [https://www.prisma.io](https://www.prisma.io)
- **PostgreSQL**: [https://www.postgresql.org](https://www.postgresql.org)
- **Docker**: [https://www.docker.com](https://www.docker.com)
- **Json Web Token**: [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Nano ID**: [https://www.npmjs.com/package/nanoid](https://www.npmjs.com/package/nanoid)

## Installation

Follow these steps to set up and configure the project:

1. **Docker engine and docker compose**: Ensure that Docker Engine and Docker Compose are installed on your system.

2. **Clone this repository**: SSH or HTTP
    ```bash
    git clone git@github.com:viperluan/url-shortener.git
    git clone https://github.com/viperluan/url-shortener.git
    ```

1. **Run the project**: Navigate to the project directory and execute the following command to start the containers:
    This command can be run with or without the hyphen, depending on the version of your Docker Compose.
    
    ```bash
    docker compose up -d
    docker-compose up -d
    ```
    
    *This will set up the environment and start the project in detached mode.*

After completing these steps, two containers will be created and bound to ports 5432 and 3333 on the host. If you need to modify these parameters, they are defined as environment variables within the `docker-compose.yml` file.


