#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if S3_BUCKET environment variable is set.
if [ -z "$S3_BUCKET" ]; then
  echo "S3_BUCKET environment variable is not set. Skipping S3 upload."
  exit 0
fi

# Check for essential AWS credentials.
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) are not set. Skipping S3 upload."
  exit 0
fi

# Create a timestamped folder for the current test run.
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
S3_PATH="s3://${S3_BUCKET}/test-results/${TIMESTAMP}"

echo "--- Starting S3 Upload ---"
echo "Uploading artifacts to ${S3_PATH}"

# Sync the reports directory to S3.
if [ -d "/app/reports" ]; then
  echo "Uploading reports..."
  aws s3 sync /app/reports "${S3_PATH}/reports" --delete
else
  echo "Warning: /app/reports directory not found. Nothing to upload."
fi

# Sync the test-results directory (screenshots, traces) to S3.
if [ -d "/app/test-results" ]; then
  echo "Uploading test results (screenshots, traces)..."
  aws s3 sync /app/test-results "${S3_PATH}/test-results" --delete
else
  echo "Warning: /app/test-results directory not found. Nothing to upload."
fi

echo "--- S3 Upload Complete ---"
echo "View your HTML report at:"
echo "https://s3.console.aws.amazon.com/s3/buckets/${S3_BUCKET}?prefix=test-results/${TIMESTAMP}/reports/html-report/index.html"
echo "(Note: You may need to make the files public to view them directly in a browser)" 