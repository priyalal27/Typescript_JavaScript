FROM mcr.microsoft.com/playwright:v1.53.2-jammy

WORKDIR /app

# Install AWS CLI and dependencies
RUN apt-get update && apt-get install -y \
    awscli \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

# Install project dependencies, including AWS SDK
RUN npm install

COPY playwright.config.js ./
COPY storage.json ./
COPY tests ./tests
COPY PageObject ./PageObject
COPY utils ./utils
COPY tests-examples ./tests-examples

# Copy failed test management scripts
COPY extract-failed-tests.js ./
COPY run-failed-tests.js ./

# Create reports directory and set permissions
RUN mkdir -p /app/reports /app/test-results && chmod -R 777 /app/reports /app/test-results

COPY entrypoint.sh /entrypoint.sh
COPY upload-to-s3.sh /upload-to-s3.sh
RUN chmod +x /entrypoint.sh /upload-to-s3.sh

ENTRYPOINT ["/entrypoint.sh"]
