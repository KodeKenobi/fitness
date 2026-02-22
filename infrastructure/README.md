# Gym API Infrastructure

This directory contains the AWS CDK (Cloud Development Kit) code to deploy the Gym API infrastructure.

## Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- AWS CDK CLI (`npm install -g aws-cdk`)

## Deployment

1. **Build the Backend**:
   Ensure the backend is built and the distribution files are in the `backend/dist` directory.
   ```bash
   cd ../backend
   npm run build
   ```

2. **Deploy the Infrastructure**:
   ```bash
   cd ../infrastructure
   npm install
   cdk deploy
   ```

## Infrastructure Components

- **Lambda Function**: Hosts the Fastify API.
- **API Gateway**: Provides a RESTful interface and triggers the Lambda function for specific routes.
