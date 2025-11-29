#!/bin/bash

# Accept environment variables
FILE_NAME=${FILE_NAME:-tests/clientApp.spec.js}
TEST_NAME=${TEST_NAME}
TAG=${TAG}
WORKERS=${WORKERS:-3}
EXTRACT_FAILED=${EXTRACT_FAILED:-false}
UPLOAD_S3=${UPLOAD_S3:-false}
USE_SECRETS_MANAGER=${USE_SECRETS_MANAGER:-false}

# --- Validate AWS Credentials if needed ---
if [ "$USE_SECRETS_MANAGER" = "true" ] || [ "$UPLOAD_S3" = "true" ]; then
  echo "AWS integration is enabled. Checking for credentials..."
  if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ] || [ -z "$AWS_REGION" ]; then
    echo "Error: AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION) must be set as environment variables."
    exit 1
  fi
  echo "AWS credentials found."
fi

# --- Run Playwright Tests ---
echo "Running Playwright test file: $FILE_NAME"
echo "Using $WORKERS workers for parallel execution"

# Run tests and save the exit code
set +e
if [ -n "$TAG" ]; then
  echo "Filtering by tag: $TAG"
  npx playwright test "$FILE_NAME" --grep "$TAG" --workers=$WORKERS
elif [ -n "$TEST_NAME" ]; then
  echo "Filtering by test name: $TEST_NAME"
  npx playwright test "$FILE_NAME" --grep "$TEST_NAME" --workers=$WORKERS
else
  echo "Running all tests in file"
  npx playwright test "$FILE_NAME" --workers=$WORKERS
fi
EXIT_CODE=$?
set -e

# --- Post-test Actions ---

# Extract failed tests if requested
if [ "$EXTRACT_FAILED" = "true" ]; then
  echo "Extracting failed tests..."
  node extract-failed-tests.js
fi

# Upload results to S3 if requested
if [ "$UPLOAD_S3" = "true" ]; then
  echo "Uploading results to S3..."
  /upload-to-s3.sh
fi

echo "Test execution completed."
echo "HTML Report is available in the 'reports' directory if mounted."

exit $EXIT_CODE
