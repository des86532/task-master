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
- **Responsive Design**:
  - Mobile-friendly interface
  - Adaptive layouts

## Tech Stack

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- HeroUI Components
- SWR for data fetching
- IndexedDB for local storage
- FullCalendar for calendar view

### Backend

- NestJS
- TypeORM
- PostgreSQL
- OpenAI API integration

### Development Tools

- Nx Monorepo
- ESLint
- Prettier
- Husky
- Commitlint
- GitHub Actions

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
# Start backend
pnpm nx serve server

# Start frontend
pnpm nx serve client
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

- Deployed on Railway
- PostgreSQL database
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
