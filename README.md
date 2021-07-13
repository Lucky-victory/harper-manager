# Harper Manager
 Unofficial node-js module to manage your [haperdb](https://haperdb.io) database in a simplified way.

## Usage
Using **Harper Manager** is very easy,

install the package using 

`npm install harper-manager`
 or 
 
 `yarn add harper-manager`.
 
 

require it in your app , and instantiate it using `new` keyword, 
```
var { HarperManager } =require("harper-manager");

var options={
   host:process.env.db_host,  /* your host url, ex: http://localhost:9925 or https://xxxxxx.harperdbcloud.com */,
   key:process.env.db_key,  // your Basic auth token,
   
       //schema is optional, but if you include it
    // HarperManager will create it for you if it doesn't exist yet.

   schema: "dog"
}
var myDB = new HarperManager(options);


```
Now you can start using it to perform every operation.
```
myDB.createSchema("pets") ;
myDB.createTable({schema:"pets",table:"cats"}) ;
```

## what you can do with HarperManager
- get the structure of your database using the `.describeDB()` method.
- create schema using the `.createSchema(schema)` method.
- drop schema using the `.dropSchema(schema)` method.
- describe schema using the `.describeSchema(schema)` method.
- create table using the `.createTable(options)` method.
- drop table using the `.dropTable(options)` method.
- describe table using the `.describeTable(options)` method.
- insert data using the `.insert(options)` method.
- upsert data using the `.upsert(options)` method.
- update data using the `.update(options)` method.
- delete data using the `.delete(options)` method.
- search by hash using the `.searchByHash(options)` method.
- search by value using the `.searchByValue(options)` method.
- search by conditions using the `.searchByConditions(options)` method.
- upload data using `.csvUrlLoad(options)` method.

## What you should know about HarperManager.

> **HarperManager** is not an extension to [harperdb](https://harperdb.io), you can only perform operations that are available by Harperdb.

- Every method returns a `Promise`, this means you will need to use `.then()` and `.catch()` to get the response or errors.
- the methods that requires options must be passed in as an Object `{}`.
- you can insert data into a table not yet created, **HarperManager** will automatically create the table and insert the data for you.

## Available methods and their options. 

> To better understand **HarperManager's** options, you should refer to the [harperdb docs](https://api.harperdb.io) page.

- method:`describeDB()` | param: none.

- method: `createSchema()` | param : Type- `string`  the name of the schema you want to create.

- method: `dropSchema()` | param : Type- `string`  the name of the schema you want to drop.

- method: `describeSchema()` | param : Type- `string` the name of the schema you want to describe.
 
  
- method: `createTable()` | options : Type- `Object` 
 schema:  *required*,
  table: *required*,
  hashAttribute: *required* (if not specified, will default to id).

- method: `dropTable()` | options : Type- `Object` 
 schema:  *required*,
  table: *required*.
  
  - method: `describeTable()` | options : Type- `Object` 
 schema:  *required*,
  table: *required*.

- method: `insert()` | options : Type- `Object` 
  schema:  *required*,
  table: *required*,
  records:  *required* .

- method: `delete()` | options : Type- `Object` 
  schema:  *required*,
  table: *required*,
  hashValues: *required*.

- method: `update()` | options : Type- `Object` 
  schema:  *required*,
  table: *required*,
  records: *required*.

- method: `upsert()` | options : Type- `Object` 
  schema:  *required*,
  table: *required*,
  records: *required*.

- method: `searchByHash()` | options: Type- `Object` 
  schema:*required*,
  table: *required*,
 hashValues:*required*,
 getAttributes: *required* (if not specified, will default to wildcard `["*"]``).

- method: `searchByValue()` | options: Type- `Object`  
  schema:*required*,
  table: *required*,
 searchValue:*required*,
  searchAttribute:*required*,
 getAttributes: *required* (if not specified, will default to wildcard `["*"]`).

- method: `searchByConditions()` | options: Type- `Object`  
  schema:*required*,
  table: *required*,
  operator: *optional* (will default to `"and"`)
 offset:*optional* (will default to `0`),
   limit:*optional* (will default to `null`),
 getAttributes: *required* (if not specified, will default to wildcard ["*"]);

- method: `csvUrlLoad()` | options : Type- `Object` 
  schema:  *required*,
  table: *required*,
  csvUrl: *required*.


## Future Versions.
 In future versions, **HarperManager** will include more methods and options.


## A little story.

During the hashnode-harperdb hackathon a while ago, i needed a simplified way to handle my harperdb instance but couldn't find any, i was stuck in repeating same code ( including authorization multiple times, etc), this made me lost interest on the hackathon, but then i still needed to use harperdb for other projects, this was when i thought about building a module to handle those request in a simplified way, the initial aim was for personal use but then i realized others maybe facing same challenge, which was why i decided to make it available to the public.