(Symbol as any)['metadata'] ??= Symbol('Symbol.metadata');

export interface EntityConfig {
  tableName: string;
}

export function Entity(config: EntityConfig) {
  return function (originalMethod: any, context: ClassDecoratorContext) {
    // @ts-ignore
    if (!context.metadata['dynamoEntityConfig']) {
      context.metadata['dynamoEntityConfig'] = {};
    }

    context.metadata['dynamoEntityConfig'] = {
      ...context.metadata['dynamoEntityConfig']!,
      tableConfig: config,
    };
    return originalMethod;
  };
}
