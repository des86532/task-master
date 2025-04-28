# TaskMaster

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

[Live Demo](https://task-master-frontend-xi.vercel.app/list)

TaskMaster is a full-stack task management application built with modern web technologies. It provides a comprehensive solution for managing tasks with multiple views and real-time updates.

## Features

- **Multiple Views**:
  - List View
  - Board View (Kanban-style)
  - Calendar View
- **Task Management**:
  - Create, Read, Update, Delete (CRUD) operations
  - Task status tracking
  - Priority levels
  - Due dates
- **Real-time Chat**:
  - AI-powered chat assistant
  - Message history with IndexedDB

## Tech Stack

### Frontend

- Next.js 14: Used for building server-side rendered React applications.
- React 18: Used for building the user interface JavaScript library.
- TypeScript: Provides static type checking JavaScript superset.
- Tailwind CSS: Used for rapid building of custom design CSS framework.
- HeroUI Components: Used for UI component library.
- SWR: Used for data fetching library.
- IndexedDB: Used for local storage database.
- FullCalendar: Used for calendar view library.

### Backend

- NestJS: A framework for building efficient and scalable server-side applications.
- TypeORM: An ORM (Object-Relational Mapping) tool for interacting with databases.
- PostgreSQL: As a database management system.
- OpenAI API: For generating subtasks with the chat assistant.

### Development Tools

- Nx Monorepo: A tool for managing multiple applications and libraries.
- ESLint: A static code analysis tool for JavaScript and TypeScript.
- Prettier: A tool for code formatting.
- Husky: A tool for Git hooks.
- Commitlint: A tool for checking commit messages.
- GitHub Actions: A tool for continuous integration and continuous deployment.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/task-master.git
cd task-master
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create `.env.local` in the root directory with:

```
DATABASE_URL=your_postgres_database_url
CHAT_API_KEY=your_openai_api_key
```

4. Start the development servers:

```bash
# Start frontend
pnpm nx run client:dev

# Start backend
pnpm nx run server:serve
```

## Project Structure

task-master/
├── apps/
│ ├── client/ # Next.js frontend
│ ├── client-e2e/ # Playwright frontend tests
│ ├── server/ # NestJS backend
│ └── server-e2e/ # Jest backend tests
└── shared/ # Shared types and mock data

## Deployment

### Frontend

- Deployed on Vercel
- Automatic deployments from main branch

### Backend

- Deployed on Render
- PostgreSQL database on Supabase
- Automatic scaling and monitoring

## Testing

```bash
# Run frontend tests
pnpm nx test client

# Run backend tests
pnpm nx test server

# Run e2e tests
pnpm nx e2e client-e2e
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
