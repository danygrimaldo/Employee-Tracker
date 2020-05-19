DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE Department(
    id INTEGER NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INTEGER NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY(position)
);

CREATE TABLE employee(
    id INTEGER NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id VARCHAR(200),
    manager_id INTEGER NOT NULL,
    PRIMARY KEY(id)
);

select * from TopAlbums;

select artist, count(*)
	from top5000
    group by artist
	having count(*) > 1;
    
SELECT TopAlbums.year, TopAlbums.position, TopAlbums.artist, Top5000.title as Song, TopAlbums.title as Album
FROM TopAlbums
JOIN Top5000
ON TopAlbums.artist = Top5000.artist
where TopAlbums.year = Top5000.year AND TopAlbums.artist = "Eminem";