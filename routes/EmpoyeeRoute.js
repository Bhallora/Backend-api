const express = require('express');

//use of express.Router()//
const router = express.Router();
/* *** */

let employees = require('../data/employees.json');
const _ = require('lodash');

/* use of morgan logger middleware */
var morgan = require('morgan');
router.use(morgan('tiny'));
/* *** */

/* use of body-parser middleware */
var bodyParser = require('body-parser');
router.use(bodyParser.json());
/* *** */

let employeesArray= employees;


//get request
router.get('/', (req, res) => {
    res.json(employeesArray);
});
router.get('/:id', (req, res) => {

    const employee = _.find(employeesArray, employee => employee.id === parseInt(req.params.id));
    if (employee) {
        res.json(employee);
    }
    else {
        res.sendStatus(404);
    }

});

//post request
router.post('/', (req,res)=>{
    console.log("handling POST request");
    console.log(req.body);
    //validation can be done while pushing
    employeesArray.push(req.body);
    res.sendStatus(200);
});

//advantage of using router, param method used below helps in validation //
router.param('id', (req,res, next, id)=>{
    if(isNaN(id)){
        next(`The id: '${id}' that you have entered is not in the correct format. `);
    } next();

});
module.exports= router;