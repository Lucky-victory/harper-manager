import axios from "axios";

export interface HarperManager {
   host: string;
   key: string;
   schema ? : string;
}

export class HarperManager {


   constructor(_options: object) {
      interface Options {
         host: string;
         key: string;
         schema: string;
      }
      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an object");
      }

      this.host = options.host;
      this.key = options.key;
      this.schema = options.schema;

      if (!this.host && this.key) {
         throw new Error('host is required')
      }
      if (this.host && !this.key) {
         throw new Error('key is required')
      }
      if (!this.host && !this.key) {
         throw new Error('host and key are required')
      }
if(this.key && this.key.includes('Basic')){
   this.key=this.key.split('Basic ').join('')
}
      if (this.schema && this.schema !== "") {
         this.init();
      }
      
   }
   private headers(): object {
      return {
         "Content-Type": "application/json",
         Authorization: `Basic ${this.key}`
      }
   }
   private async init() {
      await this.describeDB().then((data) => {
         if (!Object.keys(data).includes(`${this.schema}`)) {
            this.createSchema(`${this.schema}`);
         }
      });
   }

   async describeDB() {
      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "describe_all",
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }
   async describeSchema(_schema: string) {
      const schema = _schema;
      if (schema === null || schema === undefined || schema === "") {
         throw new Error("no schema was found in options, please include it");
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "describe_schema",
               schema: `${schema}`,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }
   async createSchema(_schema: string) {
      const schema = _schema;
      let schemaExists: boolean = false;
      if (schema === null || schema === undefined || schema === "") {
         throw new Error("no schema was found in options, please include it");
      }

      await this.describeDB().then((data) => {
         if (Object.keys(data).includes(schema)) {
            schemaExists = !schemaExists;

            return;
         }
      });
      if (schemaExists) {
         return;
      }
      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "create_schema",
               schema: `${schema}`,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }
   async dropSchema(_schema: string) {
      const schema = _schema;

      if (schema === null || schema === undefined || schema === "") {
         throw new Error("please enter the schema you want to drop");
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "drop_schema",
               schema: `${schema}`,
            }),
         });

         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async createTable(_options: object) {
      interface Options {
         table: string;
         schema: string;
         hashAttribute: string;
      }
      const options = _options as Options;
      const table = options.table;
      const schema = options.schema ? options.schema : this.schema;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === null ||
         table === "" ||
         table === undefined
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let tableExists: boolean = false;
      let schemaExists: boolean = true;
      await this.describeDB().then((data) => {
         if (!Object.keys(data).includes(schema)) {
            schemaExists = !schemaExists;

            return;
         }

         if (data[schema].hasOwnProperty(table)) {
            tableExists = !tableExists;
            return;
         }
      });
      if (!schemaExists) {
         throw new Error(`schema '${schema}' was not found in your database`);
      }
      if (tableExists) {
         return;
      }
      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "create_table",
               schema: `${schema}`,
               table: `${table}`,
               hash_attribute: `${
            options.hashAttribute ? options.hashAttribute : "id"
          }`,
            }),
         });

         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async dropTable(_options: object) {
      interface Options {
         schema: string;
         table: string;
      }
      const options = _options as Options;
      const table = options.table;
      const schema = options.schema;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === null ||
         table === "" ||
         table === undefined
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "drop_table",
               schema: `${schema}`,
               table: `${table}`,
            }),
         });

         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async describeTable(_options: object) {
      interface Options {
         schema: string;
         table: string;
      }
      const options = _options as Options;
      const table = options.table;
      const schema = options.schema;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === null ||
         table === "" ||
         table === undefined
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "describe_table",
               schema: `${schema}`,
               table: `${table}`,
            }),
         });

         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async insert(_options: object) {
      interface Options {
         table: string;
         schema: string;
         records: object[];
      }
      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }

      if (!Array.isArray(options.records)) {
         throw new TypeError("records must be an array");
      }
      if (
         Object.prototype.toString.call(options.records[0]) !== "[object Object]"
      ) {
         throw new TypeError("The records Array must contain only Objects ");
      }
      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;

      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === null ||
         table === "" ||
         table === undefined
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let schemaExists: boolean = true;
      let tableExists: boolean = true;
      await this.describeDB().then((data) => {
         // check if schema exists
         if (!Object.keys(data).includes(schema)) {
            schemaExists = !schemaExists;

            return;
         }
         // check if table exist
         if (!data[schema].hasOwnProperty(table)) {
            tableExists = !tableExists;
         }
      });

      if (!tableExists && schemaExists) {
         await this.createTable({ table, schema });
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "insert",
               schema: `${schema}`,
               table: `${table}`,
               records: options.records,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async delete(_options: object) {
      interface Options {
         table: string;
         schema: string;
         hashValues: (string | number)[];
      }

      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }

      if (!Array.isArray(options.hashValues)) {
         throw new TypeError("hashValues must be an array");
      }

      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === undefined ||
         table === ""
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "delete",
               schema: `${schema}`,
               table: `${table}`,
               hash_values: options.hashValues,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async upsert(_options: object) {
      interface Options {
         table: string;
         schema: string;
         records: object[];
      }

      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }
      if (!Array.isArray(options.records)) {
         throw new TypeError("records must be an array");
      }
      if (
         Object.prototype.toString.call(options.records[0]) !== "[object Object]"
      ) {
         throw new TypeError("The records Array must contain only Objects ");
      }

      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === undefined ||
         table === ""
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "upsert",
               schema: `${schema}`,
               table: `${table}`,
               records: options.records,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }
   async update(_options: object) {
      interface Options {
         table: string;
         schema: string;
         records: object[];
      }
      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }

      if (!Array.isArray(options.records)) {
         throw new TypeError("records must be an array");
      }
      if (
         Object.prototype.toString.call(options.records[0]) !== "[object Object]"
      ) {
         throw new TypeError("The records Array must contain only Objects ");
      }

      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === undefined ||
         table === ""
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers:this.headers(),
            data: JSON.stringify({
               operation: "update",
               schema: `${schema}`,
               table: `${table}`,
               records: options.records,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async searchByHash(_options: object) {
      interface Options {
         table: string;
         schema: string;
         hashValues: (string | number)[];
         getAttributes: string[];
      }

      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }

      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === undefined ||
         table === ""
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers:this.headers(),
            data: JSON.stringify({
               operation: "search_by_hash",
               schema: `${schema}`,
               table: `${table}`,
               hash_values: options.hashValues,
               get_attributes: options.getAttributes ? options.getAttributes : ["*"],
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }

   async searchByValue(_options: object) {
      interface Options {
         table: string;
         schema: string;
         hashValues: (string | number)[];
         getAttributes: string[];
         searchValue: string;
         searchAttribute: string;
      }

      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }
      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === undefined ||
         table === ""
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "search_by_value",
               schema: `${schema}`,
               table: `${table}`,
               serach_value: `${options.searchValue}`,
               search_attribute: `${options.searchAttribute}`,
               get_attributes: options.getAttributes ? options.getAttributes : ["*"],
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }
   async searchByConditions(_options: object) {
      interface Options {
         schema: string;
         table: string;
         operator: string;
         limit: number;
         offset: number;
         conditions: object[];
         getAttributes: string[];
      }

      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }

      if (!Array.isArray(options.conditions)) {
         throw new TypeError("conditions must be an array");
      }

      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;
      if (
         schema === null ||
         schema === undefined ||
         schema === "" ||
         table === undefined ||
         table === ""
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers: this.headers(),
            data: JSON.stringify({
               operation: "search_by_conditions",
               schema: `${schema}`,
               table: `${table}`,
               operator: `${options.operator ? options.operator : "and"}`,
               offset: +options.offset ? +options.offset : 0,
               limit: +options.limit ? +options.limit : null,
               get_attributes: options.getAttributes ? options.getAttributes : ["*"],
               conditions: options.conditions,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }
   async csvUrlLoad(_options: object) {
      interface Options {
         schema: string;
         table: string;
         csvUrl: string;
      }
      const options = _options as Options;
      if (Object.prototype.toString.call(options) !== "[object Object]") {
         throw new TypeError("options must be an Object ");
      }
      const schema = options.schema ? options.schema : this.schema;
      const table = options.table;
      if (schema === null || schema === undefined ||
         schema === "" ||
         table === undefined ||
         table === ""
      ) {
         throw new Error(
            "no schema or table was found in options, please include them"
         );
      }

      let result = null;
      try {
         let res = await axios(`${this.host}`, {
            method: "post",
            headers:this.headers(),
            data: JSON.stringify({
               operation: "csv_url_load",
               schema: `${schema}`,
               table: `${table}`,
               csv_url: `${options.csvUrl}`,
            }),
         });
         result = res.data;
      } catch (err) {
         throw err;
      }
      return result;
   }
}
