db = db.getSiblingDB('testdb');

// Users 컬렉션 생성 및 인덱스
db.createCollection('test_table1', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['col1', 'col2', 'available'],
            properties: {
                col1: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 100,
                    description: 'Col1 must have 1-100 length'
                },
                col2: {
                    bsonType: 'string',
                    minLength: 1,
                    maxLength: 255,
                    description: 'Col2 must have 1-255 length'
                },
                available: {
                    bsonType: 'bool',
                    description: 'Availability'
                }
            }
        }
    }
});

db.test_table1.createIndex({ col1: 1 }, { unique: true });