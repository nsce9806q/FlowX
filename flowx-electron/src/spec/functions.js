/** @format */

const functions = {
  calculation: {
    add: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["int", "float"],
    },
    sub: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["int", "float"],
    },
    mult: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["int", "float"],
    },
    div: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["int!", "float!"],
    },
    mod: {
      input: [["int", "int"]],
      output: ["int", "float"],
    },
    max: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["int", "float"],
    },
    min: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["int", "float"],
    },
    negate: {
      input: [["int"], ["float"]],
      output: ["int", "float"],
    },
    avg: {
      input: [["int"],["float"]],
      output:["float","float"]
    },
    avgNull:{
      input: [["int?"],["float?"]],
      output: ["float!","float!"]
    },
    pow:{
      input:[["int","int"],["float","float"]],
      output:["int!","float!"]
    }
  },
  compare: {
    equal: {
      input: [
        ["int", "int"],
        ["float", "float"],
        ["string", "string"],
        ["bool", "bool"],
      ],
      output: ["bool", "bool", "bool", "bool"],
    },
    notEqual: {
      input: [
        ["int", "int"],
        ["float", "float"],
        ["string", "string"],
        ["bool", "bool"],
      ],
      output: ["bool", "bool", "bool", "bool"],
    },
    greaterThan: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["bool", "bool"],
    },
    greaterThanOrEqual: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["bool", "bool"],
    },
    lessThan: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["bool", "bool"],
    },
    lessThanOrEqual: {
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["bool", "bool"],
    },
  },
  bitOperation: {
    and: {
      input: [
        ["int", "int"],
        ["bool", "bool"],
      ],
      output: ["int", "bool"],
    },
    or: {
      input: [
        ["int", "int"],
        ["bool", "bool"],
      ],
      output: ["int", "bool"],
    },
    xor: {
      input: [
        ["int", "int"],
        ["bool", "bool"],
      ],
      output: ["int", "bool"],
    },
    not: {
      input: [
        ["int", "int"],
        ["bool", "bool"],
      ],
      output: ["int", "bool"],
    },
    pow:{
      input: [
        ["int", "int"],
        ["float", "float"],
      ],
      output: ["int!", "float!"],
    }
  },
  stringOperation: {
    concat: {
      input: [["string", "string"]],
      output: ["string"],
    },
    length: {
      input: [["string"]],
      output: ["int"],
    },
    includes: {
      input: [
        ["string", "string"]
      ],
      output: ["bool"],
    },
    regexTest: {
      input: [
        ["string", "string"],
      ],
      output: ["bool"],
    },
    label: {
      input:[["string"]],
      output:["int"]
    }
  },
  typeConversion: {
    toInt: {
      input: [["float"], ["string"]],
      output: ["int", "int!"],
    },
    toFloat: {
      input: [["int"], ["string"]],
      output: ["float", "float!"],
    },
    toString: {
      input: [["int"], ["float"]],
      output: ["string", "string"],
    },
  },
  branch: {
    select: {
      input: [
        ["bool", "int", "int"],
        ["bool", "float", "float"],
        ["bool", "string", "string"],
        ["bool", "bool", "bool"],
      ],
      output: ["int", "float", "string", "bool"],
    },
    falseToNull: {
      input: [
        ["bool", "int"],
        ["bool", "float"],
        ["bool", "string"],
        ["bool", "bool"],
      ],
      output: ["int?", "float?", "string?", "bool?"],
    },
    falseToError: {
      input: [
        ["bool", "int"],
        ["bool", "float"],
        ["bool", "string"],
        ["bool", "bool"],
      ],
      output: ["int!", "float!", "string!", "bool!"],
    },
  },
  "null/errorHandling": {
    errorToValue: {
      input: [
        ["int!", "int"],
        ["float!", "float"],
        ["string!", "string"],
        ["bool!", "bool"],
      ],
      output: ["int", "float", "string", "bool"],
    },
    errorToNull: {
      input: [["int!"], ["float!"], ["string!"], ["bool!"]],
      output: ["int?", "float?", "string?", "bool?"],
    },
    nullToError: {
      input: [["int?"], ["float?"], ["string?"], ["bool?"]],
      output: ["int!", "float!", "string!", "bool!"],
    },
    nullToValue: {
      input: [
        ["int?", "int"],
        ["float?", "float"],
        ["string?", "string"],
        ["bool?", "bool"],
      ],
      output: ["int", "float", "string", "bool"],
    },
    panic: {
      input: [["int!"], ["float!"], ["string!"], ["bool!"]],
      output: ["int", "float", "string", "bool"],
    },
  },
  constant: {
    int: {
      input: [],
      output: ["int"],
    },
    float: {
      input: [],
      output: ["float"],
    },
    string: {
      input: [],
      output: ["string"],
    },
    bool: {
      input: [],
      output: ["bool"],
    }
  },
};

//export {funcs:{input:[type],output:[type],category}} -> ok..
export default Object.entries(functions).reduce(
  (acc, [category, funcs]) => {
    Object.entries(funcs).forEach(([funcName, e]) => {
      acc[funcName] = { ...e, type: category };
    });
    return acc;
  },
  {}
);
