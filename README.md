# Neanderthal Synapse

The website of the [Neanderthal's Synapse project](https://research.pasteur.fr/fr/project/neanderthals-synapse).

## Configuration

The configuration of the application is handled by environment variables, according to the [Twelve Factors third principle](https://12factor.net/config).

### Server

Handles the server setup.

| **Variable name**       | **Default** | **Description**                  |
| ----------------------- | ----------- | -------------------------------- |
| `NEANDERTHAL_APP_HOST`  | "localhost" | Host for the Node.js server.     |
| `NEANDERTHAL_APP_PORT`  | 3000        | Listening port for the server.   |
| `NEANDERTHAL_APP_PROXY` | "false"     | If the server is behind a proxy. |

### Database

Handles the connection to the MongoDB database.

| **Variable name**     | **Default**   | **Description**              |
| --------------------- | ------------- | ---------------------------- |
| `NEANDERTHAL_DB_HOST` | "localhost"   | Host of the database.        |
| `NEANDERTHAL_DB_PORT` | 27017         | Port of the database.        |
| `NEANDERTHAL_DB_NAME` | "neanderthal" | Name of the database.        |
