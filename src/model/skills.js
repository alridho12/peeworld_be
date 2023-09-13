const pool = require('../config/db')

const selectAllSkills = (limit, offset, sortby, sort) => {
    return pool.query(`SELECT * FROM skill_worker ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const searchSkills = (search, limit, offset, sortby, sort) => {
    return pool.query(
      `SELECT * FROM skill_worker WHERE skill_worker ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    )
  }

const showSkillByUserId = (id) => {
    return pool.query(`SELECT * FROM skill_worker WHERE worker_id = '${id}'`);
}

const selectSkills = (id) => {
    return pool.query(`SELECT * FROM skill_worker WHERE skill_worker_id ='${id}'`);
}

const insertSkills = (data) => {
    const { id, skill_name, worker_id } = data;
    return pool.query(`INSERT INTO skill_worker (skill_worker_id,skill_name,worker_id) VALUES('${id}','${skill_name}','${worker_id}')`);
}

const updateSkills = (data) =>{
    const { skill_worker_id,skill_name, worker_id} = data;
    return pool.query(`UPDATE skill_worker SET skill_name='${skill_name}' WHERE worker_id='${worker_id}' and skill_worker_id='${id}'`);
}

const deleteSkills = (id) =>{
    return pool.query(`DELETE FROM skill_worker WHERE skill_worker_id='${id}'`);
}

const countData = () => {
  return pool.query('SELECT COUNT(*) skill_worker')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT skill_worker_id FROM skill_worker WHERE skill_worker_id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

const findName = (skill_name, worker_id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT skill_name FROM skill_worker where worker_id='${worker_id}' and skill_name ILIKE '%${skill_name}%'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

module.exports = {
    selectAllSkills,
    searchSkills,
    showSkillByUserId,
    findName,
    selectSkills,
    insertSkills,
    updateSkills,
    deleteSkills,
    countData,
    findId
  }