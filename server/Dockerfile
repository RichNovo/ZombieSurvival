# Existing Dockerfile content
FROM python:3.12

# Set working directory
WORKDIR /app

# Copy backend files
COPY server/ ./

# Install backend dependencies
RUN pip install -r requirements.txt

# Expose port
EXPOSE 8000

# Start the backend
CMD ["python", "main.py"]