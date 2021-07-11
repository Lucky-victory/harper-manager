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
   schema: "dog" /* this is optional, you can skip it. */
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
- search by hash using the `searchByHash(options)` method.
- search by values using the `searchByValues(options)` method.
- search by conditions using the `searchByConditions(options)` method.
- upload data using `.csvUrlLoad(options)` method.

## What you should know about HarperManager.

> **HarperManager** is not an extension to [harperdb](https://harperdb.io), you can only perform operations that are available by Harperdb.

- Every method returns a `Promise`, this means you will need to use `.then()` and `.catch()` to get the response or errors.
- the methods that requires options must be passed in as an Object `{}`.
- you can insert data into a table not yet created, **HarperManager** will automatically create the table and insert the data for you.

## Available methods and their options. 



## Future Versions 
 In future versions, **HarperManager** will include more methods and options.


