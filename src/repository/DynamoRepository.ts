import {DynamoDBClient} from '@aws-sdk/client-dynamodb';

export class DynamoRepository {
  constructor(private readonly dynamoClient: DynamoDBClient) {}
}
