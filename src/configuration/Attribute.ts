import {DynamoMetadataInterface} from './DynamoMetadataInterface';

export interface AttributeConfig {
  type: string;
  columnName?: string;
}

export function Attribute(config: AttributeConfig) {
  return function (_: any, context: ClassFieldDecoratorContext) {
    if (!context.metadata['dynamoEntityConfig']) {
      context.metadata['dynamoEntityConfig'] = {};
    }
    (
      context.metadata['dynamoEntityConfig'] as DynamoMetadataInterface
    ).entityAttributes = {
      [context.name]: config,
    };
  };
}
