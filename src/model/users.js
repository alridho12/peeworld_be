const pool = require("../config/db");

const create = (data) => {
  const { nama, email, passwordHash, handphone, id, role } = data;
  return pool.query(
    `INSERT INTO user_worker(worker_id,nama,email,handphone,password,role) VALUES('${id}','${nama}','${email}','${handphone}','${passwordHash}','${role}')`
  );
};

const updateWorker = (data) => {
  const { id, nama, jobdesk, domisili, tempatkerja, deskripsidiri,photo_profile } = data;
  return pool.query(
    `UPDATE user_worker SET nama='${nama}',jobdesk='${jobdesk}',domisili='${domisili}',tempatkerja='${tempatkerja}',deskripsidiri='${deskripsidiri}',photo_profile='${photo_profile}'  WHERE worker_id='${id}'`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM user_worker WHERE email = '${email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const countData = () => {
  return pool.query("SELECT COUNT(*) user_worker");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT worker_id FROM user_worker WHERE worker_id='${id}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const selectAllWorker = (limit, offset, sortby, sort) => {
  return pool.query(
    // `SELECT user_worker.*, skill_worker.skill_name FROM user_worker LEFT JOIN skill_worker ON user_worker.worker_id = skill_worker.worker_id ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`

    // `SELECT * FROM user_worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
//     `SELECT user_worker.worker_id, 
//     user_worker.nama, 
//     string_agg(skill_worker.skill_name, ', ') AS skills
// FROM user_worker 
// LEFT JOIN skill_worker ON user_worker.worker_id = skill_worker.worker_id 
// GROUP BY user_worker.worker_id, user_worker.nama
// ORDER BY ${sortby} ${sort} 
// LIMIT ${limit} OFFSET ${offset};
// `
`SELECT
    uw.worker_id,
    uw.nama,
    uw.domisili,
    uw.jobdesk,
    uw.photo_profile,
    uw.deskripsidiri,
    array_agg(sw.skill_name ORDER BY sw.skill_name) AS skills
FROM user_worker uw
LEFT JOIN skill_worker sw ON uw.worker_id = sw.worker_id
GROUP BY uw.worker_id, uw.nama, uw.domisili, uw.jobdesk,uw.photo_profile,uw.deskripsidiri
ORDER BY ${sortby} ${sort}
LIMIT ${limit} OFFSET ${offset}`
  );
};

const searchWorker = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM user_worker WHERE nama ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectWorker = (id) => {
  return pool.query(`SELECT * FROM user_worker WHERE worker_id='${id}'`);
};

module.exports = {
  findEmail,
  findId,
  create,
  selectAllWorker,
  selectWorker,
  updateWorker,
  searchWorker,
  countData,
};
