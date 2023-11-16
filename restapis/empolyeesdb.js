const mysql = require('mysql2');

const mysqlConnection = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    database: "ems",
    user: "root",
    password: "instrutel_iot"
}).promise();

/**
 * @description "Get All Employees Data from DB"
 * @returns "All Employees Data"
 */
async function getAllEmployees() {
    const _GET_QUERY = "SELECT *from employees;";
    const[output] = await mysqlConnection.query(_GET_QUERY);
    return output;
}

/**
 * @description "Get Requested Employee Data from DB"
 * @param {*} _empId "Requested Employee ID"
 * @returns "Requested Employee Data"
 */
async function getParticularEmployeeData(_empId) {
    const _GET_QUERY = "SELECT *from employees where idEmployee = ?";
    const _SEL_EMP_ID = [_empId];

    const [output]= await mysqlConnection.query(_GET_QUERY, _SEL_EMP_ID);
    return output;
}

/**
 * @description "Insert New Employee Data into DB"
 * @param {*} eName "New Employee Name"
 * @param {*} eAge "New Employee Age"
 * @param {*} eGender "New Employee Gender"
 * @returns "Response Data"
 */
async function addNewEmployeeData(eName, eAge, eGender) {
    const _ADD_EMP_QUERY = "INSERT INTO employees(name, age, gender) VALUES (?,?,?);";
    const _NEW_EMP_DATA = [eName, eAge, eGender];

    const [output] = await mysqlConnection.query(_ADD_EMP_QUERY, _NEW_EMP_DATA);
    return output;
}

/**
 * @description "Update Employee Data in DB"
 * @param {*} eId "Update Employee ID"
 * @param {*} eName "Update Employee Name"
 * @param {*} eAge "Update Employee Age"
 * @param {*} eGender "Update Employee Gender"
 * @returns "Response Data"
 */
async function updateEmployeeData(eId, eName, eAge, eGender) {
    const _UPDATE_EMP_QUERY = "UPDATE employees SET name = ?, age = ?, gender = ? where idEmployee = ?";
    const _UPDATE_EMP_DATA = [eName, eAge, eGender, eId];

    const [output] = await mysqlConnection.query(_UPDATE_EMP_QUERY, _UPDATE_EMP_DATA);
    return output;
}

/**
 * @description "Delete Employee Data in DB"
 * @param {*} eId "Deleted Employee ID"
 * @returns "Response Data"
 */
async function deleteEmployeeData(eId){
    const _DELETE_EMP_QUERY = "DELETE FROM employees where idEmployee = ?";
    const _DELETE_EMP_ID = [eId];

    const[output] = await mysqlConnection.query(_DELETE_EMP_QUERY ,_DELETE_EMP_ID);
    return output;
}


module.exports = {getAllEmployees, getParticularEmployeeData, addNewEmployeeData, updateEmployeeData, deleteEmployeeData};