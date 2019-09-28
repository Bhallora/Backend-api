const express = require('express');
let employees = require('./data/employees.json');
const _ = require('lodash');
const PORT = 3002;
const server = express();
const buildUrl = (version, path) => `/api/${version}/${path}`;
const EMPLOYEES_BASE_URL = buildUrl('v1', 'employees');
server.get(EMPLOYEES_BASE_URL, (req, res) => {
    res.json(employees);
});
server.get(`${EMPLOYEES_BASE_URL}/:id`, (req, res) => {

    const employee = _.find(employees, employee => employee.id === parseInt(req.params.id));
    if (employee) {
        res.json(employee);
    }
    else {
        res.sendStatus(404);
    }

});
server.listen(3002, () => {
    console.log(` server listening in ${PORT} `);
});