# Project Setup

This README provides step-by-step instructions to set up and run the project, which includes starting a MySQL database and a RabbitMQ server using Docker, migrating the database, and running the NestJS project.

## Prerequisites

- Docker and Docker Compose must be installed and running on your machine.

## Step-by-Step Guide

### 1. Start Docker Services

We have a `docker-compose.yml` file that sets up a MySQL database and a RabbitMQ server. To start these services, run the following command in your terminal:

```sh
docker-compose up -d
```

This will start a MySQL database and a RabbitMQ server on Docker. If the command fails, check your Docker services to ensure there are no port conflicts. You may need to adjust the port settings in the docker-compose.yml file if there are conflicts.

### 2. Migrate the database

To populate the database with tables, run the following command:

``` sh
npm run migrate
```

### 3. Verify database tables
To check if the tables have been successfully created, you can use your preferred database IDE to inspect the database.
The following tables should be available in your database: 
- logs
- accessed_logs
- migrations

### 4. Verify your RabbitMQ server
To verify that the RabbitMQ server is running correctly, open your browser and navigate to:

http://localhost:15673/

### 5. Log in to RabbitMQ
You will be prompted to log in. Use the following credentials:

- Username: guest
- Password: guest

Once logged in, you should see the RabbitMQ dashboard. Initially, there should be no messages or queues.

### 6. Install project dependencies

To install the project dependencies, run:

```sh
npm install
```

### 7. Start the NestJS project

To start the project in development mode, use the command:

```sh
npm run build
npm run start:dev
```

### 8. Access API documentation

Once the NestJS project is running, you can access the API documentation by navigating to:

http://localhost:3000/docs

Here, you will find all the information needed to interact with the API and test its endpoints.

### 9. Access the architecture documentation in the DOCUMENTATION.md file

Here you'll find some insights on the technology tools and the database models

### 10. Access the assessment in the ASSESSMENT.md file

Here you'll find the case for this code