#!/bin/sh

if [ -n "$MY_NEW_POKER_DONK" ]; then
  echo "$MY_NEW_POKER_DONK" | base64 --decode --ignore-garbage > google-services.json
  echo "google-services.json created successfully"
else
  echo "MY_NEW_POKER_DONK is not set"
fi

