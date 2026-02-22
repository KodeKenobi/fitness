import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from 'path';

export class GymApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Define the Lambda function using NodejsFunction for automatic bundling with esbuild
    const apiLambda = new lambda_nodejs.NodejsFunction(this, 'GymApiHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../../backend/src/server.ts'), // Point to the entry point
      handler: 'handler',
      bundling: {
        minify: true,
        sourceMap: true,
        externalModules: [
          'aws-sdk', // Use the SDK available in the runtime
        ],
      },
      environment: {
        // Add environment variables if needed
      },
    });

    // 2. Define the API Gateway
    const api = new apigateway.RestApi(this, 'gym-api', {
      restApiName: 'Gym Service API',
      description: 'This service handles gym bookings and capacity checks.',
    });

    // 3. Integrate Lambda with API Gateway
    const getLambdaIntegration = new apigateway.LambdaIntegration(apiLambda);

    // Define routes
    const gyms = api.root.addResource('gyms');
    const gymId = gyms.addResource('{id}');
    
    // GET /gyms/:id/capacity
    const capacity = gymId.addResource('capacity');
    capacity.addMethod('GET', getLambdaIntegration);

    // POST /gyms/:id/book
    const book = gymId.addResource('book');
    book.addMethod('POST', getLambdaIntegration);
  }
}
