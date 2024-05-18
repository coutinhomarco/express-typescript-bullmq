# express-typescript-bullmq

## Description

`express-typescript-bullmq` is a CLI tool to generate a Node.js project structure with Express, TypeScript, BullMQ, and Redis. This tool helps streamline the setup process for creating an API with best practices and commonly used configurations.

## Features

- Automatically generates a Node.js project with a predefined structure.
- Includes Express for handling HTTP requests.
- Uses TypeScript for static type checking.
- Configures BullMQ for job processing.
- Integrates Redis for data storage and message brokering.
- Sets up ESLint for code quality and linting.
- Includes sample controllers, routes, models, and services.

## Installation

To install the CLI tool globally, run:

```sh
npm install -g express-typescript-bullmq
```

## Usage

After installing, you can use the CLI to generate a new project:

```sh
express-typescript-bullmq
```

You will be prompted to enter a project name. The CLI will create a new directory with the specified name and generate the project structure inside it.

## Project Structure

The generated project structure looks like this:

```
project-name/
├── src/
│   ├── @types/
│   │   ├── custom-types.d.ts
│   │   └── ServiceResponse.ts
│   ├───prisma/
│   │   └── schema.prisma
│   ├── api/
│   │   ├── controllers/
│   │   │   └── user/
│   │   │       ├── user.command.controller.ts
│   │   │       └── user.query.controller.ts
│   │   ├── models/
│   │   │   └── user.model.ts
│   │   ├── routes/
│   │   │   └── user.routes.ts
│   │   ├── services/
│   │   │   └── user/
│   │   │       ├── user.command.service.ts
│   │   │       └── user.query.service.ts
│   │   ├── utils/
│   │   │   ├── middleware/
│   │   │   │   └── auth.ts
│   │   │   └── validations/
│   │   │       └── user.validations.ts
│   ├── config/
│   │   └── bullmq.ts
│   ├── app.ts
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

### Description of Key Files and Directories

- **src/@types/**: Custom TypeScript type definitions.
- **src/prisma/**: Prisma schema and migrations folder
- **src/api/controllers/**: Contains controllers for handling HTTP requests.
- **src/api/models/**: Defines data models for the application.
- **src/api/routes/**: Defines route handlers.
- **src/api/services/**: Contains business logic and service methods.
- **src/api/utils/**: Utility functions and middleware.
- **src/config/**: Configuration files for BullMQ and other services.
- **src/app.ts**: Main application entry point.
- **.env.example**: Sample environment variables file.
- **.gitignore**: Specifies files to ignore in the version control.
- **package.json**: Contains project metadata and dependencies.
- **tsconfig.json**: TypeScript compiler configuration.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Install Dependencies

Navigate to the generated project directory and install the dependencies:

```sh
cd project-name
npm install
```

### Environment Variables

Rename the `.env.example` file to `.env`:

```sh
mv .env.example .env
```

Update the `DATABASE_URL` in the `.env` file with your database connection string.

### Running Prisma Migrations

Run the following command to apply Prisma migrations:

```sh
npx prisma migrate dev
```

### Running the Project

To start the development server, run:

```sh
npm run dev
```

The server will start on `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions for improvements or new features.

## License

This project is licensed under the MIT License.

## Author

Developed by [coutinhomarco](https://github.com/coutinhomarco). Feel free to reach out if you have any questions or need assistance.