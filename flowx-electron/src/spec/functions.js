export default {
    split_csv: {
        input: [["csv"]],
        output: ["i4","f4","str","bool"],
        type: "split"
    },
    add: {
        input: [["i4","i4"],["f4","f4"]],
        output: ["i4","f4"],
        type: "calculation"
    },
    sub: {
        input: [["i4","i4"],["f4","f4"]],
        output: ["i4","f4"],
        type: "calculation"
    },
    mult: {
        input: [["i4","i4"],["f4","f4"]],
        output: ["i4","f4"],
        type: "calculation"
    },
    div: {
        input: [["i4","i4"],["f4","f4"]],
        output: ["i4","f4"],
        type: "calculation"
    },
    mod: {
        input: [["i4","i4"],["f4","f4"]],
        output: ["i4","f4"],
        type: "calculation"
    },
    max: {
        input: [["i4","i4"],["f4","f4"]],
        output: ["i4","f4"],
        type: "calculation"
    },
    min: {
        input: [["i4","i4"],["f4","f4"]],
        output: ["i4","f4"],
        type: "calculation"
    },
    assemble_csv: {
        input: ["i4","f4","str","bool"],
        output: [["csv"]],
        type: "assemble"
    }
}