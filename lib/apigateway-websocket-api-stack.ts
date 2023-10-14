import * as cdk from 'aws-cdk-lib';
import * as apigw2 from '@aws-cdk/aws-apigatewayv2-alpha';
import { WebSocketLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class ApigatewayWebsocketApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sendMessageLambda = new NodejsFunction(this, 'send-message-lambda', {
      entry: join(__dirname, '../src/send-message/index.ts'),
      runtime: Runtime.NODEJS_18_X,
      functionName: 'send-message',
      handler: 'handler',
    });

    const wsConnectLambda = new NodejsFunction(this, 'ws-connect-lambda', {
      entry: join(__dirname, '../src/connect/index.ts'),
      handler: 'handler',
      functionName: 'connect-lambda',
      runtime: Runtime.NODEJS_18_X,
    });

    const wsDisconnectLambda = new NodejsFunction(
      this,
      'ws-disconnect-lambda',
      {
        entry: join(__dirname, '../src/disconnect/index.ts'),
        handler: 'handler',
        functionName: 'disconnect-lambda',
        runtime: Runtime.NODEJS_18_X,
      }
    );

    const webSocketApi = new apigw2.WebSocketApi(
      this,
      'my-first-websocket-api',
      {
        connectRouteOptions: {
          integration: new WebSocketLambdaIntegration(
            'ws-connect-integration',
            wsConnectLambda
          ),
        },
        disconnectRouteOptions: {
          integration: new WebSocketLambdaIntegration(
            'ws-disconnect-integration',
            wsDisconnectLambda
          ),
        },
      }
    );

    const apiStage = new apigw2.WebSocketStage(this, 'dev', {
      webSocketApi,
      stageName: 'dev',
      autoDeploy: true,
    });

    webSocketApi.addRoute('sendMessage', {
      integration: new WebSocketLambdaIntegration(
        'send-message-integration',
        sendMessageLambda
      ),
    });

    const connectionsArns = this.formatArn({
      service: 'execute-api',
      resourceName: `${apiStage.stageName}/POST/*`,
      resource: webSocketApi.apiId,
    });

    sendMessageLambda.addToRolePolicy(
      new PolicyStatement({
        actions: ['execute-api:ManageConnections'],
        resources: [connectionsArns],
      })
    );
  }
}
