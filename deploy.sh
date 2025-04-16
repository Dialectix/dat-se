#!/bin/bash

TOKEN="e6f6698d0c2902c395faf5e5c8ec04ede506133e852467cac634fef7b13857cf06-f4bf058e-ae4d-42a0-b966-9bc3681a81060031414063a7a703"

# Optional: build your production frontend
npm run build

# Deploy to Azure Static Web Apps
swa deploy \
  --app-name dialectix-web \
  --env production \
  --deployment-token $TOKEN \
  --output-location dist

