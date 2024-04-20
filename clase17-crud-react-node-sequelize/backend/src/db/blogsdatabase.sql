create database BlogDB;
use BlogDB;

create table blogs (
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    content VARCHAR(150),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into blogs (id, title, content) values
(1, 'Titulo 1', 'Contenido del primer blog'),
(2, 'Titulo 2', 'Contenido del segundo blog'),
(3, 'Titulo 3', 'Contenido del tercer blog'),
(4, 'Titulo 4', 'Contenido del cuarto blog'),
(5, 'Titulo 5', 'Contenido del quinto blog'),
(6, 'Titulo 6', 'Contenido del sexto blog');

drop table blogs;

select * from blogs;



