import { APIGatewayProxyEvent } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk';

export const handler = async (event: APIGatewayProxyEvent) => {
  const apigwManagementApi = new ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint:
      event.requestContext.domainName + '/' + event.requestContext.stage,
  });
  const postData = JSON.parse(event.body ?? '').data.split(',');
  console.log('Received:', postData);
  console.log('Payload:', { ConnectionId: postData[0], Data: postData[1] });

  try {
    await apigwManagementApi
      .postToConnection({ ConnectionId: postData[0], Data: postData[1] })
      .promise();
  } catch (error) {
    console.error('Error sending message:', error);
  }
  return { statusCode: 200, body: 'Message sent' };
};
