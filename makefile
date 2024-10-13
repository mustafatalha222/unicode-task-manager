.PHONY: up down build

# Build and run in production mode
up:
	docker-compose -f docker-compose.prod.yml up --build -d

# Stop and remove containers
down:
	docker-compose -f docker-compose.prod.yml down

# Rebuild the production image without starting the containers
build:
	docker-compose -f docker-compose.prod.yml build



# Build and run in dev mode
up-dev:
	docker-compose up --build

# Stop and remove containers
down-dev:
	docker-compose down

# Rebuild the image without starting the containers
build-dev:
	docker-compose build