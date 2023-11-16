/**
 * @description "Import 'express' module/library"
 */
const express = require('express');
const empApi = express();
empApi.use(express.json());

/**
 * @description "Import EmployeeDB methods from 'employeesdb.js'"
 */
const {getAllEmployees, getParticularEmployeeData, addNewEmployeeData, updateEmployeeData, deleteEmployeeData} = require('./empolyeesdb');

/**
 * @description "Get All Employeess Data using 'GET' Method"
 */
empApi.get('/employeess', async(req, res) => {
    const employess = await getAllEmployees();
    res.send(employess);
});

/**
 * @description "Get particular employee data using 'GET' Method"
 */
empApi.get('/employee/:_empId', async(req, res) => {
    const _EMP_ID = req.params._empId;
    const _REQ_EMP_DATA = await getParticularEmployeeData(_EMP_ID);
    res.send(_REQ_EMP_DATA);
});

/**
 * @description "Add New Employee Data using 'POST' Method"
 */
empApi.post('/newEmployee', async(req, res) => {
    // console.log(req.body);
    const { name, age, gender } = req.body;

    // console.log(name, age, gender);
    const _NEW_EMP_DB_RES = await addNewEmployeeData(name, age, gender);
    res.send(_NEW_EMP_DB_RES);
});

/**
 * @description "Update Existing Employee Data using 'PUT' Method"
 */
empApi.put('/updateEmployee', async(req, res) => {
    const {idEmployee, name, age, gender } = req.body;

    const _UPDATE_EMP_DB_RES = await updateEmployeeData(idEmployee, name, age, gender);
    res.send(_UPDATE_EMP_DB_RES);
});

/**
 * @description "Delete Existing Employee using 'DELETE' Method"
 */
empApi.delete('/deleteEmployee/:_eId', async(req, res) => {
    const _DELETE_EMP_ID = req.params._eId;

    const _DELETE_EMP_DB_RES = await deleteEmployeeData(_DELETE_EMP_ID);
    res.send(_DELETE_EMP_DB_RES);
});

/**
 * @description "Server Listen"
 */
empApi.listen(3900, () => {
    console.log("Server Running")
});