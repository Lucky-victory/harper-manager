"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarperManager = void 0;
var axios_1 = __importDefault(require("axios"));
var HarperManager = /** @class */ (function () {
    function HarperManager(_options) {
        var options = _options;
        if (Object.prototype.toString.call(options) !== "[object Object]") {
            throw new TypeError("options must be an object");
        }
        this.host = options.host;
        this.key = options.key;
        this.schema = options.schema;
        if (!this.host && this.key) {
            throw new Error('host is required');
        }
        if (this.host && !this.key) {
            throw new Error('key is required');
        }
        if (!this.host && !this.key) {
            throw new Error('host and key are required');
        }
        if (this.key && this.key.includes('Basic')) {
            this.key = this.key.split('Basic ').join('');
        }
        if (this.schema && this.schema !== "") {
            this.init();
        }
    }
    HarperManager.prototype.headers = function () {
        return {
            "Content-Type": "application/json",
            Authorization: "Basic " + this.key
        };
    };
    HarperManager.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.describeDB().then(function (data) {
                            if (!Object.keys(data).includes("" + _this.schema)) {
                                _this.createSchema("" + _this.schema);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HarperManager.prototype.describeDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "describe_all",
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.describeSchema = function (_schema) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, result, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = _schema;
                        if (schema === null || schema === undefined || schema === "") {
                            throw new Error("no schema was found in options, please include it");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "describe_schema",
                                    schema: "" + schema,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.createSchema = function (_schema) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, schemaExists, result, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = _schema;
                        schemaExists = false;
                        if (schema === null || schema === undefined || schema === "") {
                            throw new Error("no schema was found in options, please include it");
                        }
                        return [4 /*yield*/, this.describeDB().then(function (data) {
                                if (Object.keys(data).includes(schema)) {
                                    schemaExists = !schemaExists;
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (schemaExists) {
                            return [2 /*return*/];
                        }
                        result = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "create_schema",
                                    schema: "" + schema,
                                }),
                            })];
                    case 3:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        throw err_3;
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.dropSchema = function (_schema) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, result, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = _schema;
                        if (schema === null || schema === undefined || schema === "") {
                            throw new Error("please enter the schema you want to drop");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "drop_schema",
                                    schema: "" + schema,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw err_4;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.createTable = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, table, schema, tableExists, schemaExists, result, res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        table = options.table;
                        schema = options.schema ? options.schema : this.schema;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === null ||
                            table === "" ||
                            table === undefined) {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        tableExists = false;
                        schemaExists = true;
                        return [4 /*yield*/, this.describeDB().then(function (data) {
                                if (!Object.keys(data).includes(schema)) {
                                    schemaExists = !schemaExists;
                                    return;
                                }
                                if (data[schema].hasOwnProperty(table)) {
                                    tableExists = !tableExists;
                                    return;
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (!schemaExists) {
                            throw new Error("schema '" + schema + "' was not found in your database");
                        }
                        if (tableExists) {
                            return [2 /*return*/];
                        }
                        result = null;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "create_table",
                                    schema: "" + schema,
                                    table: "" + table,
                                    hash_attribute: "" + (options.hashAttribute ? options.hashAttribute : "id"),
                                }),
                            })];
                    case 3:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        throw err_5;
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.dropTable = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, table, schema, result, res, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        table = options.table;
                        schema = options.schema;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === null ||
                            table === "" ||
                            table === undefined) {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "drop_table",
                                    schema: "" + schema,
                                    table: "" + table,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        throw err_6;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.describeTable = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, table, schema, result, res, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        table = options.table;
                        schema = options.schema;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === null ||
                            table === "" ||
                            table === undefined) {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "describe_table",
                                    schema: "" + schema,
                                    table: "" + table,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _a.sent();
                        throw err_7;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.insert = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, schemaExists, tableExists, result, res, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (!Array.isArray(options.records)) {
                            throw new TypeError("records must be an array");
                        }
                        if (Object.prototype.toString.call(options.records[0]) !== "[object Object]") {
                            throw new TypeError("The records Array must contain only Objects ");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === null ||
                            table === "" ||
                            table === undefined) {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        schemaExists = true;
                        tableExists = true;
                        return [4 /*yield*/, this.describeDB().then(function (data) {
                                // check if schema exists
                                if (!Object.keys(data).includes(schema)) {
                                    schemaExists = !schemaExists;
                                    return;
                                }
                                // check if table exist
                                if (!data[schema].hasOwnProperty(table)) {
                                    tableExists = !tableExists;
                                }
                            })];
                    case 1:
                        _a.sent();
                        if (!(!tableExists && schemaExists)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createTable({ table: table, schema: schema })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        result = null;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "insert",
                                    schema: "" + schema,
                                    table: "" + table,
                                    records: options.records,
                                }),
                            })];
                    case 5:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 7];
                    case 6:
                        err_8 = _a.sent();
                        throw err_8;
                    case 7: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.delete = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, result, res, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (!Array.isArray(options.hashValues)) {
                            throw new TypeError("hashValues must be an array");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === undefined ||
                            table === "") {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "delete",
                                    schema: "" + schema,
                                    table: "" + table,
                                    hash_values: options.hashValues,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_9 = _a.sent();
                        throw err_9;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.upsert = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, result, res, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (!Array.isArray(options.records)) {
                            throw new TypeError("records must be an array");
                        }
                        if (Object.prototype.toString.call(options.records[0]) !== "[object Object]") {
                            throw new TypeError("The records Array must contain only Objects ");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === undefined ||
                            table === "") {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "upsert",
                                    schema: "" + schema,
                                    table: "" + table,
                                    records: options.records,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_10 = _a.sent();
                        throw err_10;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.update = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, result, res, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (!Array.isArray(options.records)) {
                            throw new TypeError("records must be an array");
                        }
                        if (Object.prototype.toString.call(options.records[0]) !== "[object Object]") {
                            throw new TypeError("The records Array must contain only Objects ");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === undefined ||
                            table === "") {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "update",
                                    schema: "" + schema,
                                    table: "" + table,
                                    records: options.records,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_11 = _a.sent();
                        throw err_11;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.searchByHash = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, result, res, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === undefined ||
                            table === "") {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "search_by_hash",
                                    schema: "" + schema,
                                    table: "" + table,
                                    hash_values: options.hashValues,
                                    get_attributes: options.getAttributes ? options.getAttributes : ["*"],
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_12 = _a.sent();
                        throw err_12;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.searchByValue = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, result, res, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === undefined ||
                            table === "") {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "search_by_value",
                                    schema: "" + schema,
                                    table: "" + table,
                                    serach_value: "" + options.searchValue,
                                    search_attribute: "" + options.searchAttribute,
                                    get_attributes: options.getAttributes ? options.getAttributes : ["*"],
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_13 = _a.sent();
                        throw err_13;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.searchByConditions = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, result, res, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        if (!Array.isArray(options.conditions)) {
                            throw new TypeError("conditions must be an array");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null ||
                            schema === undefined ||
                            schema === "" ||
                            table === undefined ||
                            table === "") {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "search_by_conditions",
                                    schema: "" + schema,
                                    table: "" + table,
                                    operator: "" + (options.operator ? options.operator : "and"),
                                    offset: +options.offset ? +options.offset : 0,
                                    limit: +options.limit ? +options.limit : null,
                                    get_attributes: options.getAttributes ? options.getAttributes : ["*"],
                                    conditions: options.conditions,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_14 = _a.sent();
                        throw err_14;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    HarperManager.prototype.csvUrlLoad = function (_options) {
        return __awaiter(this, void 0, void 0, function () {
            var options, schema, table, result, res, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = _options;
                        if (Object.prototype.toString.call(options) !== "[object Object]") {
                            throw new TypeError("options must be an Object ");
                        }
                        schema = options.schema ? options.schema : this.schema;
                        table = options.table;
                        if (schema === null || schema === undefined ||
                            schema === "" ||
                            table === undefined ||
                            table === "") {
                            throw new Error("no schema or table was found in options, please include them");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: this.headers(),
                                data: JSON.stringify({
                                    operation: "csv_url_load",
                                    schema: "" + schema,
                                    table: "" + table,
                                    csv_url: "" + options.csvUrl,
                                }),
                            })];
                    case 2:
                        res = _a.sent();
                        result = res.data;
                        return [3 /*break*/, 4];
                    case 3:
                        err_15 = _a.sent();
                        throw err_15;
                    case 4: return [2 /*return*/, result];
                }
            });
        });
    };
    return HarperManager;
}());
exports.HarperManager = HarperManager;
//# sourceMappingURL=harper-manager.js.map