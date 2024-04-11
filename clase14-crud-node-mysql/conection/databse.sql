create database usersdb;
use usersdb;

drop table if exists roles;
create table roles (
    id int primary key auto_increment,
    nombre varchar(255) not null unique
);

insert into roles (nombre) values ('admin'), ('user'), ('data-entry'), ('data-viewer');

drop table if exists users;
create table users (
    id int primary key auto_increment,
    usuario varchar(255) not null unique,
    password varchar(255) not null,
    rol_id int not null,
    foreign key (rol_id) references roles(id)
);

insert into users (usuario, password, rol_id) values ('admin', 'admin123', 1);
insert into users (usuario, password, rol_id) values ('alvaro21', '12345', 2);
insert into users (usuario, password, rol_id) values ('Martha19', '12345', 3);
insert into users (usuario, password, rol_id) values ('Juan12', '12345', 3);
insert into users (usuario, password, rol_id) values ('Miguel54', '12345', 4);
insert into users (usuario, password, rol_id) values ('Sam78', '12345', 4);
insert into users (usuario, password, rol_id) values ('Fina14', '12345', 4);
insert into users (usuario, password, rol_id) values ('Dan18', '12345', 4);

select * from users;

select u.id, u.usuario, r.id as roñ_id, r.nombre as role from users u inner join roles r on u.rol_id = r.id order by u.id;
