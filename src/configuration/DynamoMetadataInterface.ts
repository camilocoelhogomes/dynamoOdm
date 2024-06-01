import {EntityConfig} from './Entity';
import {AttributeConfig} from './Attribute';

export interface DynamoMetadataInterface {
  tableConfig: EntityConfig;
  entityAttributes: Record<string, AttributeConfig>;
}
