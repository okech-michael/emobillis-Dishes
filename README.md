# eMobilis Dishes

A simple full-stack dish management CRUD application built with React and Django REST Framework.

## Tech Stack

### Frontend
- React.js
- JavaScript
- CSS
- Vite

### Backend
- Python
- Django
- Django REST Framework
- django-cors-headers

### Database
- SQLite

## Features

- Add dishes
- View dishes
- Edit dishes
- Delete dishes
- Search by name, category, or description
- Filter by category and availability
- Mark dishes as available or unavailable
- Django Admin support
- Local dish images included in the repository

## Project Structure

```text
frontend/    React application
backend/     Django REST API, SQLite database, migrations, and tests
```

## Running the Backend

From the project root, create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate
```

On Windows PowerShell:

```powershell
py -m venv venv
.\venv\Scripts\Activate.ps1
```

Install the backend dependencies and run migrations:

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000`.

For deployment, set the `DJANGO_SECRET_KEY` environment variable. Local development generates a temporary key when it is not set.

## Running the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://127.0.0.1:5173`.

## Running the Project

Start the backend in one terminal and the frontend in another:

```bash
# Terminal 1
cd backend
python manage.py runserver

# Terminal 2
cd frontend
npm run dev
```

Open `http://127.0.0.1:5173` in a browser.

## API Endpoints

Base URL: `http://127.0.0.1:8000/api`

- `GET /api/dishes/`
- `POST /api/dishes/`
- `GET /api/dishes/<id>/`
- `PUT /api/dishes/<id>/`
- `PATCH /api/dishes/<id>/`
- `DELETE /api/dishes/<id>/`

Optional filters:

- `/api/dishes/?search=chicken`
- `/api/dishes/?category=Main%20Course`
- `/api/dishes/?available=true`

## Testing

Run the backend tests with:

```bash
cd backend
python manage.py test dishes
```

Build the frontend with:

```bash
cd frontend
npm run build
```

## Django Admin

Create an admin user with:

```bash
cd backend
python manage.py createsuperuser
```

Then open `http://127.0.0.1:8000/admin/`.

## Author

Michael Onyango

