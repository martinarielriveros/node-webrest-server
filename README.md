# Dev

1. Clone **.env.template** and create **.env**
2. Create the Postgre DB in detached mode console

```bash
docker compose up -d
```

# Notes:

## Prisma installation:

1. Navigate into your project directory that contains the **`package.json`** file.

2. Add the Prisma CLI as a development dependency to your project:

```bash
 npm install prisma --save-dev

```

- Now you can now invoke the Prisma CLI by prefixing it with npx:

```bash
npx prisma
```

3. Set up your Prisma ORM project by creating your **Prisma schema** file template with:

```bash
npx prisma init
```

This command does two things:

- Creates a new directory called prisma that contains a file called **schema.prisma**, which contains the Prisma schema with your database connection variable and schema models
- Creates the **.env** file in the root directory of the project, which is used for defining environment variables (such as your database connection).

The generated **schema.prisma** file will have the following default structure:

```Typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // <-- This is the default provider shown in the docs, but you can change it
  url      = env("DATABASE_URL")
}
```

If you already have a **.env** file in your project, Prisma will not overwrite it. Instead, it will:

Append any missing environment variables that are required for Prisma, such as **DATABASE_URL**.
If **DATABASE_URL** already exists in your **.env** file, it will leave it unchanged.
