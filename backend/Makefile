.PHONY: dev dev-down migrate migrate-local test test-lead test-notification lint format install-tools

# Local development (run from backend/)
dev:
	docker-compose up --build

dev-down:
	docker-compose down -v

# Alembic migrations (run from backend/)
migrate:
	docker-compose run --rm lead-service \
		sh -c "alembic -c migrations/alembic/alembic.ini upgrade head"

migrate-local:
	alembic -c migrations/alembic/alembic.ini upgrade head

# Tests — run from backend/; CURDIR resolves to backend/ so shared/ is found
test-lead:
	cd services/lead-service && \
		PYTHONPATH=$(CURDIR) pytest tests/ --cov=app --cov-report=term-missing -v

test-notification:
	cd services/notification-service && \
		PYTHONPATH=$(CURDIR) pytest tests/ --cov=app --cov-report=term-missing -v

# Linting (run from backend/)
lint:
	ruff check services/ shared/ migrations/

format:
	ruff format services/ shared/ migrations/

install-tools:
	pip install ruff
