NOTE:
-   We have uploaded our final submission to our team’s GitHub repo.
-   You should use 2 different terminals to setup/run the backend and frontend as outlined below.
-   Backticks (`) indicate a terminal command and should not be included when running the command.

# Setup

## Setting up the backend

### Prerequisites

1. Ensure you have python version >= 3.6.4. You can find the downloads here: https://www.python.org/downloads/
2. Ensure you have PostgreSQL 10.14. You can find the appropriate installer for your platform here: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
    - Your PostgreSQL installation should have the superuser as postgres and its password as password and should listen on the default port of 5432.
    - If your superuser is not postgres, then change that in the commands for the rest of the setup instructions
    - If your superuser password is not password then run: `psql -U postgres "ALTER USER postgres PASSWORD 'password'"`;

### Further Setup

1. `cd backend`
2. `python -m venv env` or `python3 -m venv env`
    - This creates a virtual environment where we isolate the projects dependencies
3. Activate the virtual environment:

    - If on a Windows terminal, run `env\Scripts\activate.bat`
    - If on Windows but using a bash terminal, run `source env/Scripts/activate`
    - Otherwise run `source env/bin/activate`

    You should see '(env)' on your terminal prompt. If you do not then you have not activated the environment and should try another method of running the `activate` file.

4. Install the dependencies via `pip install -r requirements.txt` or `pip3 install -r requirements.txt`
    - If this fails for some module try to uninstall it with `pip uninstall <module>`
    - Then try to install it with `pip install <module>`
5. `psql -U postgres -f init_db.sql`
6. `gunzip -c populate_db.gz | psql -U postgres -d abode`
    - Note that this may take 20-30 seconds and could pause on lines beginning with COPY

### Running the backend

-   Now you can run the backend with: `uvicorn src.main:app --reload`
    -   Ensure you are still in the backend directory when doing so

## Setting up the frontend

### Prerequisites

1. You must have node version >= 13.
    - If you don't have it you have two options to download it:
        1. You can download it from the website, but this may conflict with your local version: https://nodejs.org/en/download/releases/
        2. Or you can use nvm to manage different versions.
            - You can install it following these instructions: (installation instructions here: https://github.com/nvm-sh/nvm#installing-and-updating)
            - Then run: nvm install 13.0.0
            - then: nvm use 13.0.0

### Further Setup

1. `npm install -g yarn`
2. In the frontend directory, run `yarn install`

### Running the frontend

-   Now you can run the frontend with: `yarn start`
    -   Ensure you are still in the frontend directory when doing so
