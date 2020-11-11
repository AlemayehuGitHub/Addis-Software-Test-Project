const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = express.Router();
const PORT = process.env.PORT || 4000;

let Employee = require('./employee.model');

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employee', { useNewUrlParser: true });
// const connection = mongoose.connection;

// const mongoose = require('mongoose');

const connection = ""mongodb+srv://alex:<password>@cluster0.q9gu4.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));


connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

employeeRoutes.route('/').get(function(req, res) {
    Employee.find(function(err, employees) {
        if (err) {
            console.log(err);
        } else {
            res.json(employees);
        }
    });
});

employeeRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Employee.findById(id, function(err, employee) {
        res.json(employee);
    });
});

employeeRoutes.route('/edit/:id').post(function(req, res) {
    Employee.findById(req.params.id, function(err, employee) {
        if (!employee) {
            res.status(404).send("data is not found");
        }   
        else
        {
            employee_name = req.body.employee_name;
            employee_dofb = req.body.employee_dofb;
            employee_gender = req.body.employee_gender;
            employee_salary = req.body.employee_salary;

            employee.save().then(employee => {
                res.json('Employee updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

employeeRoutes.route('/delete/:id').post(function(req, res) {
    Employee.findByIdAndRemove(req.params.id, function(err, employee) {
        if(!employee)
            res.status(404).send("data is not found");
        else
            res.status(200).json({'employee': 'employee deleted successfully'});
        })
        .catch(err => {
            res.status(400).send('deleting employee failed');
    });
});

employeeRoutes.route('/add').post(function(req, res) {
    
    let employee = new Employee(req.body);
    employee.save()
        .then(employee => {
            res.status(200).json({'employee': 'employee added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new employee failed');
        });
});

app.use('/employee', employeeRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});