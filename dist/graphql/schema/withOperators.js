"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withOperators = void 0;
const graphql_1 = require("graphql");
const graphql_type_json_1 = require("graphql-type-json");
const graphql_scalars_1 = require("graphql-scalars");
const types_1 = require("../../fields/config/types");
const combineParentName_1 = __importDefault(require("../utilities/combineParentName"));
const formatName_1 = __importDefault(require("../utilities/formatName"));
const operators_1 = __importDefault(require("./operators"));
const defaults = {
    number: {
        type: graphql_1.GraphQLFloat,
        operators: [...operators_1.default.equality, ...operators_1.default.comparison],
    },
    text: {
        type: graphql_1.GraphQLString,
        operators: [...operators_1.default.equality, ...operators_1.default.partial, ...operators_1.default.contains],
    },
    email: {
        type: graphql_scalars_1.EmailAddressResolver,
        operators: [...operators_1.default.equality, ...operators_1.default.partial, ...operators_1.default.contains],
    },
    textarea: {
        type: graphql_1.GraphQLString,
        operators: [...operators_1.default.equality, ...operators_1.default.partial],
    },
    richText: {
        type: graphql_type_json_1.GraphQLJSON,
        operators: [...operators_1.default.equality, ...operators_1.default.partial],
    },
    json: {
        type: graphql_type_json_1.GraphQLJSON,
        operators: [...operators_1.default.equality, ...operators_1.default.partial],
    },
    code: {
        type: graphql_1.GraphQLString,
        operators: [...operators_1.default.equality, ...operators_1.default.partial],
    },
    radio: {
        type: (field, parentName) => new graphql_1.GraphQLEnumType({
            name: `${(0, combineParentName_1.default)(parentName, field.name)}_Input`,
            values: field.options.reduce((values, option) => {
                if ((0, types_1.optionIsObject)(option)) {
                    return {
                        ...values,
                        [(0, formatName_1.default)(option.value)]: {
                            value: option.value,
                        },
                    };
                }
                return {
                    ...values,
                    [(0, formatName_1.default)(option)]: {
                        value: option,
                    },
                };
            }, {}),
        }),
        operators: [...operators_1.default.equality, ...operators_1.default.contains],
    },
    date: {
        type: graphql_scalars_1.DateTimeResolver,
        operators: [...operators_1.default.equality, ...operators_1.default.comparison, 'like'],
    },
    point: {
        type: new graphql_1.GraphQLList(graphql_1.GraphQLFloat),
        operators: [...operators_1.default.equality, ...operators_1.default.comparison, ...operators_1.default.geo],
    },
    relationship: {
        type: graphql_1.GraphQLString,
        operators: [...operators_1.default.equality, ...operators_1.default.contains],
    },
    upload: {
        type: graphql_1.GraphQLString,
        operators: [...operators_1.default.equality],
    },
    checkbox: {
        type: graphql_1.GraphQLBoolean,
        operators: [...operators_1.default.equality],
    },
    select: {
        type: (field, parentName) => new graphql_1.GraphQLEnumType({
            name: `${(0, combineParentName_1.default)(parentName, field.name)}_Input`,
            values: field.options.reduce((values, option) => {
                if (typeof option === 'object' && option.value) {
                    return {
                        ...values,
                        [(0, formatName_1.default)(option.value)]: {
                            value: option.value,
                        },
                    };
                }
                if (typeof option === 'string') {
                    return {
                        ...values,
                        [option]: {
                            value: option,
                        },
                    };
                }
                return values;
            }, {}),
        }),
        operators: [...operators_1.default.equality, ...operators_1.default.contains],
    },
    // array: n/a
    // group: n/a
    // row: n/a
    // collapsible: n/a
    // tabs: n/a
};
const listOperators = ['in', 'not_in', 'all'];
const withOperators = (field, parentName) => {
    if (!(defaults === null || defaults === void 0 ? void 0 : defaults[field.type]))
        throw new Error(`Error: ${field.type} has no defaults configured.`);
    const name = `${(0, combineParentName_1.default)(parentName, field.name)}_operator`;
    const fieldOperators = [...defaults[field.type].operators];
    if (!('required' in field) || !field.required)
        fieldOperators.push('exists');
    let gqlType = typeof defaults[field.type].type === 'function'
        ? defaults[field.type].type(field, parentName)
        : defaults === null || defaults === void 0 ? void 0 : defaults[field.type].type;
    return new graphql_1.GraphQLInputObjectType({
        name,
        fields: fieldOperators.reduce((objectTypeFields, operator) => {
            if (listOperators.includes(operator)) {
                gqlType = new graphql_1.GraphQLList(gqlType);
            }
            else if (operator === 'exists') {
                gqlType = graphql_1.GraphQLBoolean;
            }
            return {
                ...objectTypeFields,
                [operator]: {
                    type: gqlType,
                },
            };
        }, {}),
    });
};
exports.withOperators = withOperators;
//# sourceMappingURL=withOperators.js.map