import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';

export const handler = async (event: APIGatewayProxyEvent) => {
  const apigwManagementApi = new ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint:
      event.requestContext.domainName + '/' + event.requestContext.stage,
  });

  const eventBody = JSON.parse(event.body ?? '');
  const connectionId = eventBody.connectionId;
  const message = eventBody.message;

  console.log('Payload:', { ConnectionId: connectionId, Data: message });

  try {
    await apigwManagementApi
      .postToConnection({ ConnectionId: connectionId, Data: message })
      .promise();
  } catch (error) {
    console.error('Error sending message:', error);
  }
  return { statusCode: 200, body: 'Message sent' };
};
