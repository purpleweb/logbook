# Logbook 🚘

## Description

Logbook is a self-project made with react and FastAPI python backend.
This app helps users to manage their vehicle history and logs.

## Installation

If you want to intall and try this app on your machine you just need to clone the project in a repository and lunch it with docker compose.

```bash
git clone git@github.com:purpleweb/logbook.git logbook
cd logbook
docker compose up
```

## Run tests

Running tests for the backend.

```bash
cd api/
source venv/bin/activate
pytest
```

Running tests for the frontend.

```bash
npm run test
```

## Tech Stack

Frontend

- **Programming language:** [TypeScript](https://www.typescriptlang.org/)
- **Front-end library:** [React](https://reactjs.org/)
- **Package manager:** [npm](https://www.npmjs.com/)
- **Build tool:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Query manager:** [TanStack Query](https://tanstack.com/query/v3/)
- **Form manager:** [React Hook Form](https://react-hook-form.com/)
- **CSS preprocessor:** [Sass](https://sass-lang.com/)
- **CSS framework:** [Bulma](https://bulma.io/)
- **Unit testing:** [Vitest](https://vitest.netlify.app/), [Testing Library](https://testing-library.com/)

Backend

- **Programming language:** [Python](https://www.python.org/)
- **Web framework:** [FastAPI](https://fastapi.tiangolo.com/)
- **Database:** [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database management system:** [SQLite](https://www.sqlite.org/index.html)
- **API documentation:** [Swagger UI](https://swagger.io/tools/swagger-ui/) and [ReDoc](https://redoc.ly/)
- **Package manager:** [pip](https://pypi.org/project/pip/)
- **ORM:** [SQLAlchemy ORM](https://docs.sqlalchemy.org/en/14/orm/)
- **Testing framework:** [Pytest](https://pytest.org/)
