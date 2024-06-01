import {DynamoRepository} from '../../repository/DynamoRepository';
import {Entity} from '../../configuration/Entity';
import {Attribute, AttributeType} from '../../configuration/Attribute';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';

jest.mock('@aws-sdk/client-dynamodb');

@Entity({tableName: 'todo_list'})
export class ToDoListEntity {
  @Attribute({type: AttributeType.String})
  pk: string | undefined;
  @Attribute({type: AttributeType.String})
  sk: string | undefined;
  @Attribute({type: AttributeType.String, columnName: 'task_description'})
  description: string | undefined;
}

describe('DynamoRepository', () => {
  const mockClient = new DynamoDBClient();
  const testingClass = new DynamoRepository(mockClient);

  test('Should create a put item request', async () => {
    const item = new ToDoListEntity();
    item.pk = '123';
    item.sk = '456';
    item.description = 'Test task';

    await testingClass.putItem(item);
  });
});
