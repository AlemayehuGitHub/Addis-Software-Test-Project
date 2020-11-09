const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employee = new Schema({
    employee_name: {
        type: String
    },
    employee_dofb: {
        type: Date
    },
    employee_gender: {
        type: String
    },
    employee_salary: {
        type: Number
    }
});

module.exports = mongoose.model('employee', employee);