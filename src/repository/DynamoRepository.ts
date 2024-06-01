import {
  AttributeValue,
  DynamoDBClient,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import {DynamoMetadataInterface} from '../configuration/DynamoMetadataInterface';
import {AttributeConfig} from '../configuration/Attribute';

export class DynamoRepository {
  constructor(private readonly dynamoClient: DynamoDBClient) {}

  async putItem(item: Object): Promise<void> {
    if (
      !(
        item.constructor[Symbol.metadata] &&
        item.constructor[Symbol.metadata]!.dynamoEntityConfig
      )
    ) {
      throw new Error('Not a dynamoDb Entity');
    }

    const dynamoMetadata = item.constructor[Symbol.metadata]!
      .dynamoEntityConfig as unknown as DynamoMetadataInterface;
    const putItem = this.putItemRequestBuilder(
      item,
      dynamoMetadata.entityAttributes
    );
    const putItemCommand = new PutItemCommand({
      TableName: dynamoMetadata.tableConfig.tableName,
      Item: putItem,
    });

    //await this.dynamoClient.send(putItemCommand);
  }

  private putItemRequestBuilder(
    item: Record<string, any>,
    attributes: Record<string, AttributeConfig>
  ): Record<string, AttributeValue> {
    return Object.keys(item).reduce(
      (returnValue: Record<string, AttributeValue>, currentValue: string) => {
        const a = {
          [attributes[currentValue].type]: item[currentValue].toString(),
        } as unknown as AttributeValue;
        return {
          ...returnValue,
          [attributes[currentValue].columnName ?? currentValue]: a,
        };
      },
      {}
    );
  }
}
