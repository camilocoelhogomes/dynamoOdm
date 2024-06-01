import {Attribute} from '../../configuration/Attribute';
import {Entity} from '../../configuration/Entity';
import {DynamoMetadataInterface} from '../../configuration/DynamoMetadataInterface';

@Entity({tableName: 'attributes'})
class TestingAttribute {
  @Attribute({type: 'string', columnName: 'heiniken'})
  cervejinha: string;

  constructor(teste: string) {
    this.cervejinha = teste;
  }
}

describe('Attribute test', () => {
  test('metadada has been saved', () => {
    const testingClass = new TestingAttribute('camilo');
    expect(
      (
        testingClass.constructor[Symbol.metadata]!
          .dynamoEntityConfig as DynamoMetadataInterface
      ).entityAttributes['cervejinha'].columnName
    ).toEqual('heiniken');
  });
});
