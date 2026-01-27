# Excel Options Creator

This web app, modeled after Excel Options Form, logs options data informing the production schedule and other company functions

## Table of Contents
### General
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation/Setup](#installationsetup)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Important Files](#important-files)
- [Bugs/Notes](#bugsnotes)

## Demo

A live demo is not available yet. The application is a web-based tool for managing bids and materials for cabinetry projects.

## Features

- **Options Creator**: Main center to create Job Options based on existing job on server. Follows options form format. Users can save drafts and push options to production, affecting current production schedule.
    - **Form Printing**: Creates .docx file based on form in options creator. Date and production approved info markers changes based on current state in the form
    - **Package Creation**: Users can create packages, reusable saved options related to a project. 
- **P&D Editor**: Allows users to perform CRUD operations on Customer/Job/Project/Lot tables.
    - **Project Location Updater**: Users can set coordinates for a given project which later get translated to addresses. These addresses are set as the location of all cost centers in HR database that are children of that project.
- **Form Options**: Interface for users to adjust lot properties such as color, drawer front, materials, etc. 

## Tech Stack

- **Frontend:** React (18.3+), TypeScript (5.5+), Vite (5.4+), React Router (6.24+)
- **Testing:** Vitest (for unit tests), Playwright (for E2E tests)
- **Other Tools:** Docker, Docker Compose, Gitlab (for CI/CD), Nodemon (for development), ESLint, docx (for document generation)

## Installation/Setup

### Prerequisites
- Node.js (version 18 or higher)
- SQL Server instance (local or remote)
- Docker (optional, for containerized deployment)

### Steps
1. Clone the repository:
   ```
   git clone <repository-url>
   cd optionscreator
   ```

2. Install dependencies:
   ```
   cd ../optionsTemplate
   npm install
   cd ../excelBackend
   npm install
   ```

3. For development:
   - Start backend: `npm run dev` (runs on port specified in env, default via Nodemon)
   - Start frontend: `npm run dev` (Vite dev server)

4. For production:
   - Follow steps outlined in 'Releasing Internal Web Apps' & 'How to Start Apps' in Excel Systems Google Drive > Gitlab CI/CD

Ensure SQL Server is running and accessible via the connection string.

## Architecture

- **React Components**: Main UI modules include `OptionsCreator` for managing and creating options, `PDEditor` for CRUD behaviors inside of EXCELP&D database namely affecting Customers, Projects, Jobs, and Lots, `FormOptions` for modifying property drop downs on options creator, and various modals/cards (e.g., `AddingLotModal`, `JobDocument`) for detailed views and interactions.
- **State Management**: Uses React Contexts (`AuthContext` for authentication and `OptionsTemplateContext` for options data) to manage global state across the app.
- **Data Handling**: Employs loaders like `JobOptionLoader` and `PDLoader` for async data fetching from external APIs, and custom hooks such as `useFetch` for authenticated API calls with auto token refresh, and hooks for facilitating data transfer to backend and creating documents (e.g., `docxConverter`, `useSQLJobDetailsPost`).
- **Routing**: Implemented with React Router for navigation between pages like login, bid center, inventory, and saved bids.
- **Modals**: Modals are routed through `Modal` component, "screens" or component logic are held in ModalScreens folder. 
- **Authentication**: Integrates JWT-based auth with token refresh handled in the `useFetch` hook.

## Environment Variables
- `VITE_AUTH_URL`: URL for authentication service.
- `VITE_BACKEND_URL`: URL for backend API.
- `VITE_EXCEL_INFO`: URL for Sage/Excel info service.
- `VITE_PROD_ENV`: Production environment flag.

## Important Files
- `useFetch.ts`: Hook allows fetch requests to internal servers to be validated correctly, Allowing access to the endpoints.
- `validate.ts`: Hook checks through all options objects in current options creator and checks for errors in each relevant input
- `useSQLJobDetailsPost.tsx`: Hook takes in options objects parses it and pushes it to excelBackend to create job option or package.
- `docxConverter.tsx`: Hook defines the docx structure for options. Converts options data in creator to output.

### Bugs/Notes
- OptionsCreator.tsx needs refactor to make it more readable and more maintanable
