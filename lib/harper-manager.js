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
        if (this.schema && this.schema !== "") {
            this.init();
        }
    }
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                        schema = _schema ? _schema : this.schema;
                        if (schema === null || schema === undefined || schema === "") {
                            throw new Error("no schema was found in options, please include it");
                        }
                        result = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default("" + this.host, {
                                method: "post",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                        schema = _schema ? _schema : this.schema;
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                        if (!schemaExists) {
                            throw new Error("schema  '" + schema + "' was not found in the database");
                        }
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "" + this.key,
                                },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFycGVyLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaGFycGVyLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTBCO0FBUTFCO0lBQ0UsdUJBQVksUUFBZ0I7UUFNMUIsSUFBTSxPQUFPLEdBQUcsUUFBbUIsQ0FBQztRQUNwQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxpQkFBaUIsRUFBRTtZQUNqRSxNQUFNLElBQUksU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDbEQ7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBQ2EsNEJBQUksR0FBbEI7Ozs7OzRCQUNFLHFCQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJOzRCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBRyxLQUFJLENBQUMsTUFBUSxDQUFDLEVBQUU7Z0NBQ2pELEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBRyxLQUFJLENBQUMsTUFBUSxDQUFDLENBQUM7NkJBQ3JDO3dCQUNILENBQUMsQ0FBQyxFQUFBOzt3QkFKRixTQUlFLENBQUM7Ozs7O0tBQ0o7SUFFSyxrQ0FBVSxHQUFoQjs7Ozs7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