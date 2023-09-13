CREATE Table user_worker (
    worker_id VARCHAR NOT NULL PRIMARY KEY,
    nama VARCHAR,
    email VARCHAR,
    handphone VARCHAR,
    password VARCHAR,
    role VARCHAR,
    jobdesk VARCHAR,
    domisili VARCHAR,
    tempatkerja VARCHAR,
    deskripsidiri VARCHAR,
    photo_profile VARCHAR
);

CREATE TABLE skill_worker(
    skill_worker_id VARCHAR NOT NULL,
    skill_name VARCHAR NULL,
    worker_id VARCHAR NULL,
    PRIMARY KEY (skill_worker_id)
);

CREATE TABLE pengalaman_kerja (
    experience_id VARCHAR NOT NULL,
    posisi VARCHAR NULL,
    nama_perusahaan VARCHAR NULL,
    tanggal_mulai DATE,
    tanggal_selesai DATE,
    deskripsi_kerja VARCHAR,
    worker_id VARCHAR NULL,
    PRIMARY KEY (experience_id),
    lamanya_bulan INT GENERATED ALWAYS AS (DATE_PART('year', tanggal_selesai) * 12 + DATE_PART('month', tanggal_selesai) - DATE_PART('year', tanggal_mulai) * 12 - DATE_PART('month', tanggal_mulai)) STORED
);

CREATE TABLE portofolio (
    portofolio_id VARCHAR NOT NULL,
    nama_aplikasi VARCHAR NULL,
    link_repository VARCHAR NULL,
    photo_porto VARCHAR NULL,
    worker_id VARCHAR NULL,
    PRIMARY KEY (portofolio_id),
);





//perekrut

CREATE OR REPLACE FUNCTION update_updated_on_user_recruiter()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_on = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_recruiter_updated_on
BEFORE UPDATE ON user_recruiter
FOR EACH ROW
EXECUTE FUNCTION update_updated_on_user_recruiter();



create table users_verification (
        id text not null,
        users_id text,
        token text,
        created_on timestamp default CURRENT_TIMESTAMP not null,
        constraint user_recruiter foreign key(users_id) references user_recruiter(recruiter_id) ON DELETE CASCADE,
        primary key (id)
    )
    
CREATE Table user_recruiter (
    recruiter_id VARCHAR NOT NULL PRIMARY KEY,
    nama VARCHAR,
    nama_perusahaan VARCHAR,
    domisili VARCHAR,
    jabatan VARCHAR,
    email VARCHAR,
    email_perusahaan VARCHAR,
    deskripsi_perusahaan VARCHAR,
    handphone VARCHAR,
    password VARCHAR,
    role VARCHAR,
    photo_profile VARCHAR,
    verify text not null,
    updated_on timestamp default CURRENT_TIMESTAMP not null
);
create table hire(
    hiring_id VARCHAR not null,
    offering VARCHAR,
    description TEXT,
    worker_id VARCHAR,
    worker_name VARCHAR,
    worker_email VARCHAR,
    recruiter_id VARCHAR,
    recruiter_email VARCHAR,
    company_name VARCHAR
);