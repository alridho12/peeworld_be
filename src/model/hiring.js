const pool = require('../config/db');

//GET ALL
const selectAllHire = ({limit, offset, sort, sortby}) => {
  return pool.query(`SELECT * FROM hire ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

//GET SELECT HIRE
const selectHireWorker = (worker_id) => {
  return pool.query(`SELECT * FROM hire WHERE worker_id = '${worker_id}'`);
};

const selectHireRecruiter = (recruiter_id) => {
  return pool.query(`SELECT * FROM hire WHERE recruiter_id = '${recruiter_id}'`);
};

//DELETE SELECT HIRE
const deleteHire = (id) => {
  return pool.query(`DELETE FROM hire WHERE hiring_id  = '${id}'`);
};

//POST HIRE
const createHire = (data) => {
  const {hiring_id, offering, description, worker_id, recruiter_id, worker_name, worker_email, company_name, recruiter_email} = data;
  return pool.query(`INSERT INTO hire(hiring_id, offering, description,worker_id, recruiter_id, worker_name, worker_email, company_name, recruiter_email)  
    VALUES ('${hiring_id}','${offering}','${description}','${worker_id}','${recruiter_id}','${worker_name}','${worker_email}','${company_name}','${recruiter_email}')`);
};

//FIND EMAIL
const findID = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM hire WHERE hiring_id= '${id}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

//COUNT DATA
const countData = () => {
  return pool.query(`SELECT COUNT(*) FROM hire`);
};

module.exports = {
  selectAllHire,
  selectHireWorker,
  selectHireRecruiter,
  deleteHire,
  createHire,
  findID,
  countData,
};