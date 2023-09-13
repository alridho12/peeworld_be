const pool = require('../config/db')

const selectAllPortofolio = (limit, offset, sortby, sort) => {
    return pool.query(`SELECT * FROM portofolio ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const searchPortofolio = (search, limit, offset, sortby, sort) => {
    return pool.query(
      `SELECT * FROM portofolio WHERE portofolio ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    )
  }

const showPortofolioByUserId = (id) => {
    return pool.query(`SELECT * FROM portofolio WHERE worker_id = '${id}'`);
}

const selectPortofolio = (id) => {
    return pool.query(`SELECT * FROM portofolio WHERE portofolio_id ='${id}'`);
}

const insertPortofolio = (data) => {
    const { id,nama_aplikasi,link_repository,photo_porto,worker_id  } = data;
    return pool.query(`INSERT INTO portofolio (portofolio_id,nama_aplikasi,link_repository,photo_porto,worker_id) VALUES ('${id}','${nama_aplikasi}','${link_repository}','${photo_porto}','${worker_id}')`);
}

const updatePortofolio = (data) =>{
    const { id,skill_name, worker_id} = data;
    return pool.query(`UPDATE portofolio SET skill_name='${skill_name}' WHERE worker_id='${worker_id}' and skill_worker_id='${id}'`);
}

const deletePortofolio = (id) =>{
    return pool.query(`DELETE FROM portofolio WHERE portofolio_id='${id}'`);
}

const countData = () => {
  return pool.query('SELECT COUNT (*) portofolio')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT portofolio_id FROM portofolio WHERE portofolio_id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

const findName = (nama_aplikasi, worker_id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT nama_aplikasi FROM portofolio where worker_id='${worker_id}' and nama_aplikasi ILIKE '%${nama_aplikasi}%'`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
}

module.exports = {
    selectAllPortofolio,
    searchPortofolio,
    showPortofolioByUserId,
    findName,
    selectPortofolio,
    insertPortofolio,
    updatePortofolio,
    deletePortofolio,
    countData,
    findId
  }