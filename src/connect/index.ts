import { APIGatewayProxyEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent) => {
  const connectionId = event.requestContext.connectionId;
  console.log('connection created:', connectionId);
  return { statusCode: 200, body: 'Connected.' };
};
