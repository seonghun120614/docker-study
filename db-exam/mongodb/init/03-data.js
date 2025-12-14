db = db.getSiblingDB('testdb');

const singleDoc = db.test_table1.insertOne({
    col1: "HIHIH",
    col2: "This is a test document",
    available: true
});

const multiDocs = db.test_table1.insertMany([
    {
        col1: "unique_value_2",
        col2: "Second document with longer content",
        available: true
    },
    {
        col1: "unique_value_3",
        col2: "Third document",
        available: false
    },
    {
        col1: "unique_value_4",
        col2: "Fourth document with some special characters: !@#$%",
        available: true
    },
    {
        col1: "unique_value_5",
        col2: "Fifth document",
        available: true
    }
]);
