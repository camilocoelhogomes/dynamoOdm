import {Entity} from '../../configuration/Entity';
import {DynamoMetadataInterface} from '../../configuration/DynamoMetadataInterface';

@Entity({tableName: 'teste'})
class EntityTest {
  readonly teste: number;

  constructor(teste: number) {
    this.teste = teste;
  }
}

describe('Entity test', () => {
  test('call new entity', () => {
    const testingClass = new EntityTest(3);
    expect(
      (
        testingClass.constructor[Symbol.metadata]!
          .dynamoEntityConfig! as DynamoMetadataInterface
      ).tableConfig.tableName
    ).toEqual('teste');
    expect(testingClass.teste).toEqual(3);
  });
});
