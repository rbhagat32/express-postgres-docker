## (1)--->>> Connect Postgres in container to Express app on Host Machine:

1. Run Postgres in a container:
   (use port 5433 instead of default port 5432 because it conflicts with the host machine)

   ```
   docker run -d
   --name pg-container
   -p 5433:5432
   -e POSTGRES_USER=admin
   -e POSTGRES_PASSWORD=password
   -e POSTGRES_DB=docker-tut
   -v pg-data:/var/lib/postgresql/data
   postgres
   ```

2. Connection ENV Variables (use on host machine) :

   ```
   PG_USER=admin
   PG_PASSWORD=password
   PG_HOST=localhost
   PG_PORT=5433
   PG_DATABASE=docker-tut
   ```

## (2)--->>> Connect Postgres in container to Express app in another container:

1. Build express app image using Dockerfile:

   ```
   docker build -t express-image .
   ```

2. Create custom network:

   ```
   docker network create my-net
   ```

3. Run Postgres in a container:
   (no need to expose Postgres port as we won't be accessing from host machine)

   ```
   docker run -d
   --name pg-container
   --network my-net
   -e POSTGRES_USER=admin
   -e POSTGRES_PASSWORD=password
   -e POSTGRES_DB=my-db
   -v pg-data:/var/lib/postgresql/data
   postgres
   ```

4. Run Express app in a container:
   (can use default port 5432 because it won't conflict inside Express container)

   ```
   docker run -d
   --name express-container
   -p 4000:4000 -e express-image
   --network my-net
   -e PG_USER=admin
   -e PG_PASSWORD=password
   -e PG_HOST=pg-container
   -e PG_DATABASE=my-db
   -e PG_PORT=5432
   express-image
   ```
