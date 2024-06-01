import {DynamoMetadataInterface} from './DynamoMetadataInterface';

export enum AttributeType {
  String = 'S',
  Number = 'N',
}

export interface AttributeConfig {
  type: AttributeType;
  columnName?: string;
}

export function Attribute(config: AttributeConfig) {
  return function (_: any, context: ClassFieldDecoratorContext) {
    if (!context.metadata['dynamoEntityConfig']) {
      context.metadata['dynamoEntityConfig'] = {};
    }
    if (
      !(context.metadata['dynamoEntityConfig'] as DynamoMetadataInterface)
        .entityAttributes
    ) {
      (
        context.metadata['dynamoEntityConfig'] as DynamoMetadataInterface
      ).entityAttributes = {
        [context.name]: config,
      };
    } else {
      (
        context.metadata['dynamoEntityConfig'] as DynamoMetadataInterface
      ).entityAttributes = {
        ...(context.metadata['dynamoEntityConfig'] as DynamoMetadataInterface)
          .entityAttributes,
        [context.name]: config,
      };
    }
  };
}
