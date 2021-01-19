#Weekly - Server

##RESTful api for Weekly-Client

    heroku url: https://weekly-api.herokuapp.com/

Endpoints

    GET /api/items | get all items
    POST /api/items | add an item
    GET /api/items/:item_id | get a specific item by id
    DELETE /api/items/:item_id | delete a specific item by id

Req & Res

    Include Content-Type: application/json in header of all requests
    Responses are in JSON format
    Example responses
        GET /api/items

        [
            {
                "item_id": 10,
                "description": "Wash the car"
            },
           {
                "item_id": 11,
                "description": "Go grocery shopping"
            },
            ...
        ]

        GET /api/items/:item_id

        {
           "item_id": 1,
           "description": "Do homework"
        }

Technologies

Express.js, PostgreSQL, Node.js
Scripts

    Start the application npm start
    Start development server npm dev
    Run database migrations npm run migrate
    Run test database migrations npm run migrate:test
    Deploy to heroku & run migrations npm run deploy

Use / Set-up

    clone repo
    install and audit dependencies, npm i & npm audit fix
    create psql databases 'weekly' and 'weekly-test', createdb weekly && createdb weekly-test
    create .env file
    configure .env :

    PORT=[your_dev_port]
    DATABASE_URL='postgresql://postgres@localhost/weekly'
    TEST_DATABASE_URL='postgresql://postgres@localhost/weekly-test'

    run database migrations, npm run migrate && npm run migrate:test

Once you're done following the steps you should be able to run the server locally!

