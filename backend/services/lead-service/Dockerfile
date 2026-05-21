FROM python:3.11-slim

WORKDIR /app

# Install dependencies first (layer cache)
COPY services/lead-service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy shared library and service code
COPY shared/ ./shared/
COPY services/lead-service/app/ ./app/

ENV PYTHONPATH=/app

CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
