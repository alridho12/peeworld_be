const pool = require('../config/db')

const selectAllExperience = (limit, offset, sortby, sort) => {
    return pool.query(`SELECT * FROM pengalaman_kerja ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const searchExperience = (search, limit, offset, sortby, sort) => {
    return pool.query(
        `SELECT * FROM Pengalaman_kerja WHERE Pengalaman_kerja ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    )
}

const showExperienceByUserId = (id) => {
    return pool.query(`SELECT * FROM pengalaman_kerja WHERE worker_id = '${id}'`);
}

const selectExperience = (id) => {
    return pool.query(`SELECT * FROM pengalaman_kerja WHERE experience_id ='${id}'`);
}

const insertExperience = (data) => {
    const { id, posisi, nama_perusahaan, tanggal_mulai, tanggal_selesai, deskripsi_kerja, worker_id } = data;
    return pool.query(`INSERT INTO pengalaman_kerja (experience_id, posisi, nama_perusahaan, tanggal_mulai, tanggal_selesai, deskripsi_kerja, worker_id) VALUES('${id}','${posisi}','${nama_perusahaan}','${tanggal_mulai}','${tanggal_selesai}','${deskripsi_kerja}','${worker_id}')`);
}

const updateExperience = (data) => {
    const { id, posisi, nama_perusahaan, tanggal_mulai, tanggal_selesai, deskripsi_kerja } = data;
    return pool.query(`UPDATE pengalaman_kerja SET posisi = '${posisi}', nama_perusahaan = '${nama_perusahaan}', tanggal_mulai = ${tanggal_mulai}, tanggal_selesai = ${tanggal_selesai}, deskripsi_kerja = '${deskripsi_kerja}' WHERE experience_id ='${id}'`);
}

const deleteExperience = (id) =>{
    return pool.query(`DELETE FROM pengalaman_kerja WHERE experience_id='${id}'`);
}

const countData = () => {
    return pool.query('SELECT COUNT(*) pengalaman_kerja')
}

const findId = (id) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT experience_id FROM pengalaman_kerja WHERE experience_id='${id}'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

const findName = (posisi, worker_id) => {
    return new Promise((resolve, reject) =>
        pool.query(`SELECT posisi FROM pengalaman_kerja where worker_id='${worker_id}' and posisi ILIKE '%${posisi}%'`, (error, result) => {
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    )
}

module.exports = {
    selectAllExperience,
    searchExperience,
    showExperienceByUserId,
    findName,
    selectExperience,
    insertExperience,
    updateExperience,
    deleteExperience,
    countData,
    findId
}