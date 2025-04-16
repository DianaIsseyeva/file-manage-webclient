# File Manager Frontend

This is the frontend for the File Manager project. It allows users to:
- Upload image files with a preview before uploading.
- View a list of uploaded files.
- Delete files.
- Log in (authenticate) using JWT.

The frontend is built with [Next.js](https://nextjs.org/) and TypeScript and uses:
- **Ant Design** for UI components.
- **Apollo Client** for communicating with the GraphQL API.
- **Zustand** for managing application state (uploading status, preview images, authentication token, etc.).

## Features

- **File Upload with Preview:**
  - Allows selection of multiple image files.
  - Previews selected images using the FileReader API.
  - Uses a custom upload process that simulates progress and sends files via GraphQL to the backend.
  
- **File List:**
  - Displays a table of uploaded files with preview, filename, MIME type, size, and upload date.
  - Provides functionality to delete files.
  
- **Authentication:**
  - A login page enables users to authenticate using email and password.
  - On successful login, the JWT token is saved (in localStorage and in the Zustand store) and used for protected operations.

- **GraphQL Integration:**
  - Uses Apollo Client with `apollo-upload-client` to handle file uploads.
  - Automatically adds the `Authorization` header (using the JWT token from localStorage) for authenticated requests.

## Setup

After cloning the repository, run the following commands in the project directory:

```bash
cd file-manager-frontend
npm install

Running the Frontend
To start the development server, run:
npm run dev

This will launch the Next.js development server (default on port 3000). Open your browser and navigate to http://localhost:3000 to see the application.

