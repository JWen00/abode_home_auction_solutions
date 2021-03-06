## Setup

1. Ensure you have python version >= 3.6.4.
2. `cd backend`
3. `python -m venv env` or `python3 -m venv env`
    - This creates a virtual environment where we isolate the projects dependencies
4. Activate the virtual environment:

    - If on a Windows terminal, run `env\Scripts\activate.bat`
    - If on Windows but using a bash terminal, run `source env/Scripts/activate`
    - Otherwise run `source env/bin/activate`

    You should see `(env)` on your terminal prompt

5. Install the dependencies via `pip install -r requirements.txt` or `pip3 install -r requirements.txt`
6. Download the appropriate PostgreSQL 10.14 installer for your platform [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
7. Install PostgreSQL, setting the superuser to `postgres` and its password to `password` and ensuring the server will listen on the default port of 5432.
   If your superuser is not `postgres` change that in the below commands:
8. `psql -U postgres -f init_db.sql`
9. `gunzip -c populate_db.gz | psql -U postgres -d abode`
    - Note that this may take 20-30 seconds

## Development

### Run

-   Inside the `backend` directory, `uvicorn src.main:app --reload`.
    -   The API is then running with base URL `http://localhost:8000` and the documentation can be viewed at http://localhost:8000/docs

### Debug

-   You can debug the live API via `F5` or `Ctrl + Shift + P -> Start Debugging`.

### Docs:

-   REST API framework - [FastAPI](https://fastapi.tiangolo.com/) and [FastAPI-Login](https://github.com/MushroomMaula/fastapi_login)
-   ORM framework - [FastAPI-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
-   DB schema migration - [Alembic](https://alembic.sqlalchemy.org/en/latest/tutorial.html)

API endpoints should be documented and validated using type hints ([some bonus ones](https://pydantic-docs.helpmanual.io/usage/types/#pydantic-types)) and [field](https://fastapi.tiangolo.com/tutorial/body-fields/#declare-model-attributes)/[parameter](https://fastapi.tiangolo.com/tutorial/query-params-str-validations/) validators, so that the API is clear for everyone and to improve error messages.

### Tips

1. In the bottom bar of VSCode, hover over the Python interpreter and make sure it points to the executable inside the `env` folder. If it doesn't, click the button and select the interpreter. Note: If you don't see it in the list then open and close VSCode.
2. If you make changes to the database `models`, you need to do a schema migration:
    1. Run `alembic revision --auto-generate -m "your summary of the change"`, which outputs something like `Generating <projectDir>\backend\migrations\versions\3549dc4d94e8_your_summary_of_the_change.py`
    2. Inspect the contents of the file and confirm the commands in the `upgrade` and `downgrade` sections make sense based on the changes you made. If not, manually modify them. If your change was one of [these types](https://alembic.sqlalchemy.org/en/latest/autogenerate.html#what-does-autogenerate-detect-and-what-does-it-not-detect), you _will_ need to manually modify the file - [this operations reference](https://alembic.sqlalchemy.org/en/latest/ops.html) should be helpful.
    3. Run `alembic upgrade head`
3. To locally smoke test an api endpoint, ideally use the app's frontend. But if it's not yet built/hooked up:
    1. Use the Swagger UI available at http://localhost:5000
    2. Use [Postman](https://www.postman.com/downloads/) - the API can be [exported as a Postman collection](https://flask-restx.readthedocs.io/en/latest/postman.html)
    3. Use `curl`
