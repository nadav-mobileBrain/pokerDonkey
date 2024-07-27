#!/bin/sh

if [ -n "$NEW_GOOGLE_SERVICES_JSON" ]; then
  echo "$NEW_GOOGLE_SERVICES_JSON" | base64 --decode --ignore-garbage > google-services.json
  echo "google-services.json created successfully"
else
  echo "NEW_GOOGLE_SERVICES_JSON is not set"
fi

