## Available Scripts

In the project directory, you can run:

## Scripts

### `npm run start`

Start server in production mode

### `npm run dev`

Start server in development mode

### `npm run tsc`

Compile typescript to javascript

## Scripts in docker

### `docker-compose build`

Create app image

### `docker run -p 8080:8080 -d app-server --name app-server`

Run app image

scp -r ./build/* franco@192.168.0.105:/var/www/your_domain/html
