var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
define("scenario", ["require", "exports", "reflect-metadata"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ScenarioMetadataKey = Symbol("mongo-model:scenario");
    var ScenarioFilter = (function () {
        function ScenarioFilter(defaultInclude, include, exclude) {
            if (defaultInclude === void 0) { defaultInclude = true; }
            if (include === void 0) { include = []; }
            if (exclude === void 0) { exclude = []; }
            this.include = include;
            this.exclude = exclude;
            this.defaultInclude = defaultInclude;
        }
        ScenarioFilter.prototype.check = function (scenario) {
            if (this.include.indexOf(scenario) >= 0)
                return true;
            if (this.exclude.indexOf(scenario) >= 0)
                return false;
            return this.defaultInclude;
        };
        ScenarioFilter.NEVER = new ScenarioFilter(false);
        ScenarioFilter.ALWAYS = new ScenarioFilter(true);
        return ScenarioFilter;
    }());
    exports.ScenarioFilter = ScenarioFilter;
    function scenario(ScenarioFilter) {
        return Reflect.metadata(exports.ScenarioMetadataKey, ScenarioFilter);
    }
    exports.scenario = scenario;
    function Never() {
        return scenario(ScenarioFilter.NEVER);
    }
    exports.Never = Never;
    function Always() {
        return scenario(ScenarioFilter.ALWAYS);
    }
    exports.Always = Always;
});
define("validator", ["require", "exports", "model", "lodash", "reflect-metadata"], function (require, exports, model_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValidateMetadataKey = Symbol("mongo-model:validator");
    function validate() {
        var validators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            validators[_i] = arguments[_i];
        }
        if (validators.length > 1)
            return Reflect.metadata(exports.ValidateMetadataKey, new (ChainValidator.bind.apply(ChainValidator, [void 0].concat(validators)))());
        else
            return Reflect.metadata(exports.ValidateMetadataKey, validators[0]);
    }
    exports.validate = validate;
    var RegexValidator = (function () {
        function RegexValidator(regex, errorMessage) {
            if (errorMessage === void 0) { errorMessage = "Invalid Format"; }
            this.regex = regex;
            this.errorMessage = errorMessage;
        }
        RegexValidator.prototype.validate = function (obj) {
            if (typeof (obj) === "string")
                return (this.regex.test(obj)) ? null : this.errorMessage;
            else
                return null;
        };
        return RegexValidator;
    }());
    exports.RegexValidator = RegexValidator;
    var RangeValidator = (function () {
        function RangeValidator(min, max, errorMessage) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            if (errorMessage === void 0) { errorMessage = "Out of range"; }
            this.min = min;
            this.max = max;
            this.errorMessage = errorMessage;
        }
        RangeValidator.prototype.validate = function (obj) {
            if (typeof (obj) !== "number")
                return null;
            var _ = obj;
            return (_ >= this.min && _ <= this.max) ? null : this.errorMessage;
        };
        return RangeValidator;
    }());
    exports.RangeValidator = RangeValidator;
    var ArrayValidator = (function () {
        function ArrayValidator(itemValidator) {
            this.itemValidator = itemValidator;
        }
        ArrayValidator.prototype.validate = function (obj) {
            var _this = this;
            var errors = {};
            if (obj instanceof Array) {
                obj.forEach(function (item, index) {
                    var error = _this.itemValidator.validate(item);
                    if (error)
                        errors[index] = error;
                });
            }
            return (Object.keys(errors).length == 0) ? null : errors;
        };
        return ArrayValidator;
    }());
    exports.ArrayValidator = ArrayValidator;
    var NestedValidator = (function () {
        function NestedValidator() {
            var fields = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fields[_i] = arguments[_i];
            }
            this.fields = fields;
        }
        NestedValidator.prototype.validate = function (obj) {
            return (obj instanceof model_1.Model) ? obj.validate(this.fields) : null;
        };
        return NestedValidator;
    }());
    exports.NestedValidator = NestedValidator;
    var ChainValidator = (function () {
        function ChainValidator() {
            var validators = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                validators[_i] = arguments[_i];
            }
            this.validators = validators;
        }
        ChainValidator.prototype.validate = function (obj) {
            for (var _i = 0, _a = this.validators; _i < _a.length; _i++) {
                var validator = _a[_i];
                var error = validator.validate(obj);
                if (error)
                    return error;
            }
            return null;
        };
        return ChainValidator;
    }());
    exports.ChainValidator = ChainValidator;
    var PredicateValidator = (function () {
        function PredicateValidator(predicate, errorMessage) {
            if (errorMessage === void 0) { errorMessage = "Not Valid"; }
            this.predicate = predicate;
            this.errorMessage = errorMessage;
        }
        PredicateValidator.prototype.validate = function (obj) {
            var result = this.predicate(obj);
            if (typeof (result) === "boolean")
                return result ? null : this.errorMessage;
            else
                return result;
        };
        return PredicateValidator;
    }());
    exports.PredicateValidator = PredicateValidator;
    var NotEmptyValidator = (function () {
        function NotEmptyValidator(errorMessage) {
            if (errorMessage === void 0) { errorMessage = "Cannot be empty"; }
            this.errorMessage = errorMessage;
        }
        NotEmptyValidator.prototype.validate = function (obj) {
            return _.isEmpty(obj) ? this.errorMessage : null;
        };
        return NotEmptyValidator;
    }());
    exports.NotEmptyValidator = NotEmptyValidator;
});
define("model", ["require", "exports", "lodash", "scenario", "validator", "reflect-metadata"], function (require, exports, _, scenario_1, validator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Model = (function () {
        function Model() {
            this.scenario = 'default';
            this.scenarioDefaultInclude = true;
        }
        Model.prototype.isFieldAvailable = function (field) {
            if (!Reflect.has(this, field))
                return false;
            var scenarioFilter = Reflect.getMetadata(scenario_1.ScenarioMetadataKey, this, field);
            return scenarioFilter ? scenarioFilter.check(this.scenario) : this.scenarioDefaultInclude;
        };
        Model.prototype.load = function (obj, fields) {
            var _this = this;
            if (!fields)
                fields = Object.getOwnPropertyNames(obj);
            fields.forEach(function (field) {
                var value = Reflect.get(obj, field);
                if (!_.isNil(value) && _this.isFieldAvailable(field)) {
                    var oldValue = Reflect.get(_this, field);
                    if (oldValue instanceof Model)
                        oldValue.load(value);
                    else
                        Reflect.set(_this, field, value);
                }
            });
        };
        Model.prototype.toDocs = function (fields) {
            var _this = this;
            if (!fields)
                fields = Object.getOwnPropertyNames(this);
            var docs = {};
            fields.forEach(function (field) {
                var value = Reflect.get(_this, field);
                console.log("field ", field, " instanceOf Model: ", value instanceof Model);
                if (!_.isNil(value) && _this.isFieldAvailable(field))
                    Reflect.set(docs, field, (value instanceof Model) ? value.toDocs() : value);
            });
            return docs;
        };
        Model.prototype.validate = function (fields, defaultValidator) {
            var _this = this;
            var errors = {};
            if (!fields)
                fields = Object.getOwnPropertyNames(this);
            fields.forEach(function (field) {
                var value = Reflect.get(_this, field);
                var validator = defaultValidator || Reflect.getMetadata(validator_1.ValidateMetadataKey, _this, field);
                if (validator) {
                    var error = validator.validate(value);
                    if (error)
                        errors[field] = error;
                }
            });
            return errors;
        };
        __decorate([
            scenario_1.Never(),
            __metadata("design:type", String)
        ], Model.prototype, "scenario", void 0);
        __decorate([
            scenario_1.Never(),
            __metadata("design:type", Boolean)
        ], Model.prototype, "scenarioDefaultInclude", void 0);
        return Model;
    }());
    exports.Model = Model;
});
define("mongo-model", ["require", "exports", "model", "lodash"], function (require, exports, model_2, lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MongoModel = (function (_super) {
        __extends(MongoModel, _super);
        function MongoModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(MongoModel, "className", {
            get: function () {
                return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MongoModel, "collectionName", {
            get: function () {
                return lodash_1.kebabCase(this.className);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MongoModel, "collection", {
            get: function () {
                return this.database.collection(this.collectionName);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MongoModel, "col", {
            get: function () {
                return this.collection;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MongoModel.prototype, "locator", {
            get: function () {
                return { _id: this._id };
            },
            enumerable: true,
            configurable: true
        });
        MongoModel.prototype.insert = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MongoModel.col.insertOne(this.toDocs(), options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MongoModel.prototype.update = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MongoModel.col.updateOne(this.locator, { "$set": this.toDocs() }, options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MongoModel.prototype.updateByDocs = function (docs, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MongoModel.col.updateOne(this.locator, docs, options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MongoModel.prototype.delete = function (docs, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, MongoModel.col.deleteOne(this.locator, options)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return MongoModel;
    }(model_2.Model));
    exports.MongoModel = MongoModel;
});
//# sourceMappingURL=index.js.map