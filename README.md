# Harper Manager
An Unofficial node-js module to manage your [haperdb](https://haperdb.io) database in a simplified way.

## Usage
Using **Harper Manager** is very easy,

install the package using `npm install harper-manager` or `yarn add harper-manager`.

require it in your app , and instantiate it using `new` keyword, 
```
var HarperManager=require("harper-manager");

var options={
   host:process.env.db_host  /* your host url, ex: http://localhost:3000 or https://xxxxxx.harperdbcloud.com */,
   key:process.env.db_key  // your Basic auth token,
   schema: "dog" /* this is optional. */
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
- createSchema using the `.createSchema(schema)` method.
- dropSchema using the `.dropSchema(schema)` method.
- createTable using the `.createTable(options)` method.
- dropTable using the `.dropTable(options)` method.
- insert data using the `.insert(options)` method.
- upsert data using the `.upsert(options)` method.
- update data using the `.update(options)` method.
- delete data using the `.delete(options)` method.
- search by hash using the `.searchByHash(options)` method.
- search by values using the `.searchByValues(options)` method.
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

- method: `createTable()` | options : Type- `Object` 
 schema:  *required*,
  table: *required*
  hashAttribute: *required* (if not specified, will default to id).

- method: `dropTable()` | options : Type- `Object` 
 schema:  *required*,
  table: *required*.

- method: `insert()` | options : Type- `Object` 
  schema:  *required*
  table: *required*
  records:  *required* `

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
 getAttributes: *required* (if not specified, will default to wildcard `["*"]`).

- method: `searchByValues()` | options: Type- `Object`  
  schema:*required*,
  table: *required*,
 searchValue:*required*,
  searchAttribute:*required*,
 getAttributes: *required* (if not specified, will default to wildcard `["*"]`).

- method: `searchByConditions()` | options: Type- `Object`  
  schema:*required*,
  table: *required*,
  operand: *optional* (will default to `"and"`)
  offset:*optional* (will default to `0`),
   limit:*optional* (will default to `null`),
  getAttributes: *required* (if not specified, will  default to wildcard `["*"]`);

- method: `csvUrlLoad()` | options : Type- `Object` 
  schema:  *required*,
  table: *required*,
  csvUrl: *required*.


## Future Versions 
 In future versions, **HarperManager** will include more methods and options.


