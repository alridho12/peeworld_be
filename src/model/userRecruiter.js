const pool = require("../config/db");

const create = (data) => {
  const { nama, email, nama_perusahaan, jabatan, passwordHash, handphone, id, role,verify } = data;
  return pool.query(
    `INSERT INTO user_recruiter(recruiter_id,nama,nama_perusahaan,email,jabatan,handphone,password,role,verify) VALUES('${id}','${nama}','${nama_perusahaan}','${email}','${jabatan}','${handphone}','${passwordHash}','${role}','${verify}')`
  );
};

const updateRecruiter = (data) => {
  const { email_perusahaan, nama_perusahaan, jabatan, handphone, id,deskripsi_perusahaan,photo_profile,domisili  } = data;
  return pool.query(
    `UPDATE user_recruiter SET email_perusahaan='${email_perusahaan}',nama_perusahaan='${nama_perusahaan}',jabatan='${jabatan}',deskripsi_perusahaan='${deskripsi_perusahaan}',handphone='${handphone}',photo_profile='${photo_profile}',domisili='${domisili}'  WHERE recruiter_id='${id}'`
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT * FROM user_recruiter WHERE email = '${email}'`,
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
  return pool.query("SELECT COUNT(*) user_recruiter");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT recruiter_id FROM user_recruiter WHERE recruiter_id='${id}'`,
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


const createUsersVerification = (users_verification_id, users_id, token) => {
  return pool.query(`insert into users_verification ( id , users_id , token ) values ( '${users_verification_id}' , '${users_id}' , '${token}' )`);
};

const checkUsersVerification = (queryUsersId, queryToken) => {
  return pool.query(`select * from users_verification where users_id='${queryUsersId}' and token = '${queryToken}' `);
};

const cekUser = (email) => {
  return pool.query(`select verify from user_recruiter where email = '${email}' `);
};

const deleteUsersVerification = (queryUsersId, queryToken) => {
  return pool.query(`delete from users_verification  where users_id='${queryUsersId}' and token = '${queryToken}' `);
};

const updateAccountVerification = (queryUsersId) => {
  return pool.query(`update user_recruiter set verify='true' where recruiter_id='${queryUsersId}' `);
}


const selectAllRecruiter = (limit, offset, sortby, sort) => {
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
    array_agg(sw.skill_name ORDER BY sw.skill_name) AS skills
FROM user_worker uw
LEFT JOIN skill_worker sw ON uw.worker_id = sw.worker_id
GROUP BY uw.worker_id, uw.nama, uw.domisili, uw.jobdesk
ORDER BY ${sortby} ${sort}
LIMIT ${limit} OFFSET ${offset}`
  );
};

const searchRecruiter = (search, limit, offset, sortby, sort) => {
  return pool.query(
    `SELECT * FROM user_recruiter WHERE nama ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectRecuiter = (id) => {
  return pool.query(`SELECT * FROM user_recruiter WHERE recruiter_id='${id}'`);
};

module.exports = {
  findEmail,
  findId,
  create,
  selectAllRecruiter,
  selectRecuiter,
  updateRecruiter,
  searchRecruiter,
  countData,
  createUsersVerification,
  checkUsersVerification,
  cekUser,
  deleteUsersVerification,
  updateAccountVerification,
};
