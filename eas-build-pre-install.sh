#!/bin/sh

if [ -n "$GOOGLE_SERVICES_JSON" ]; then
  echo "$GOOGLE_SERVICES_JSON" | base64 --decode --ignore-garbage > google-services.json
  echo "google-services.json created successfully"
else
  echo "GOOGLE_SERVICES_JSON is not set"
fi

