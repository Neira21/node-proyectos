--base de datos MYSQL

-- borrar database workout si es que existe
DROP DATABASE IF EXISTS workout;

-- Crear database workout
CREATE DATABASE workout;

-- Usar database workout
USE workout;

-- Crear tabla workouts
CREATE TABLE workouts (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  name VARCHAR(255) NOT NULL,
  mode VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Crear tabla exercises
CREATE TABLE exercises (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  name VARCHAR(255) NOT NULL,
  reps INT NOT NULL,
  sets INT NOT NULL,
  workoutId BINARY(16) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (workoutId) REFERENCES workouts(id)
);

-- Crear tabla users
CREATE TABLE users (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
);

-- Crear tabla workouts_users
CREATE TABLE workouts_users (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  workoutId BINARY(16) NOT NULL,
  userId BINARY(16) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (workoutId) REFERENCES workouts(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Crear tabla exercises_users
CREATE TABLE exercises_users (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  exerciseId BINARY(16) NOT NULL,
  userId BINARY(16) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (exerciseId) REFERENCES exercises(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Crear tabla tokens
CREATE TABLE tokens (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  token VARCHAR(255) NOT NULL,
  userId BINARY(16) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Crear tabla exercises_workouts
CREATE TABLE exercises_workouts (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  exerciseId BINARY(16) NOT NULL,
  workoutId BINARY(16) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (exerciseId) REFERENCES exercises(id),
  FOREIGN KEY (workoutId) REFERENCES workouts(id)
);

-- Crear tabla exercises_workouts_users
CREATE TABLE exercises_workouts_users (

  id BINARY(16) primary key default (UUID_TO_BIN(UUID())),
  exerciseId BINARY(16) NOT NULL,
  workoutId BINARY(16) NOT NULL,
  userId BINARY(16) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (exerciseId) REFERENCES exercises(id),
  FOREIGN KEY (workoutId) REFERENCES workouts(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

