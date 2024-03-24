//import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/utils.js'
const movies = readJSON('../movies.json')

//import fs from 'node:fs'
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
import connection from '../bd/bd.js'

export class MovieModel {
  //Todo los demas metodos
  static async getAll ({genre}){
    if(genre){
      const lowerCaseGenre = genre.toLowerCase()

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        'select id, name from genres where name = ?',
        [lowerCaseGenre]
      );
      
      if(!genres) return []

      const [{id}] = genres
      const [results] = await connection.query(
        `
          select BIN_TO_UUID(id) AS 'id-user', title, year, director, duration, poster, rate  
          from movies
          inner join movies_genres mg on mg.movie_id = movies.id
          where genre_id = ?`,
          [id]
      );
      console.log("id", id)
      console.log(results)
      return results
    }
    
    const [results, fields] = await connection.query(
      `
      select
        BIN_TO_UUID(id) as 'id_user',
        title,
        year,
        director,
        poster,
        rate
      from movies
      `
    );
    // users = Result [{ name: "Walter", age: 80 }, { name: 'Murray', age: 68 }, ...]
    return results
  }

  static async getById({id}){
    // 81006afd-e8b5-11ee-81fa-0c9d92056e6e
    const [results] = await connection.query(
      `
        select BIN_TO_UUID(id) as 'id', title, year, director, duration, poster, rate
        from movies
        where id = UUID_TO_BIN(?)`,
        [id]
    )
    console.log(id)
    if (results.length === 0) return null
    return results[0]
  }

  static async create({input}){
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input
    console.log(input)

    // todo: crear la conexión de genre

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    // get genre ids from database table using genre names
    const [genres] = await connection.query(
      'select id, name from genres where name in (?)',
      [genreInput]
    );

    // destructuring the id from the object
    const genreIds = genres.map(({ id }) => id)
    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
      // insert into movies_genres table
      for (const genreId of genreIds) {
        await connection.query(
          `INSERT INTO movies_genres (movie_id, genre_id)
            VALUES (UUID_TO_BIN("${uuid}"), ?);`,
          [genreId]
        )
      }
    } catch (e) {
      // puede enviarle información sensible
      console.log(e)
      throw new Error('Error creating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movies WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )
    return movies
  }

  static async delete({id}){
    try {
      // Eliminar registros de movies_genres que corresponden a la película
      await connection.query(
        `DELETE FROM movies_genres WHERE movie_id = UUID_TO_BIN(?);`,
        [id]
      );
  
      // Luego, eliminar la película de la tabla movies
      const [results] = await connection.query(
        `DELETE FROM movies WHERE id = UUID_TO_BIN(?);`,
        [id]
      );
  
      // Si affectedRows es 0, no se eliminó nada porque no existe
      return results.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw new Error("Error deleting movie");
    }
  }

  // FALTA REVISAR ACTUALIZACIÓN
  
  static async update({ id, input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input;
  
    try {
      let updateFields = []; // Almacenar los campos que se actualizarán
      let params = []; // Almacenar los valores de los parámetros
  
      // Construir la consulta de actualización según los campos proporcionados
      if (title !== undefined) {
        updateFields.push("title = ?");
        params.push(title);
      }
      if (year !== undefined) {
        updateFields.push("year = ?");
        params.push(year);
      }
      if (duration !== undefined) {
        updateFields.push("duration = ?");
        params.push(duration);
      }
      if (director !== undefined) {
        updateFields.push("director = ?");
        params.push(director);
      }
      if (rate !== undefined) {
        updateFields.push("rate = ?");
        params.push(rate);
      }
      if (poster !== undefined) {
        updateFields.push("poster = ?");
        params.push(poster);
      }

      // Actualizar los géneros de la película si es que existe la propiedad genre con datos
      if (genreInput) {
        // Obtener los IDs de los géneros
        const [genres] = await connection.query(
          'SELECT id FROM genres WHERE name IN (?);',
          [genreInput]
        );
        const genreIds = genres.map(({ id }) => id);
  
        // Eliminar los registros de movies_genres que corresponden a la película
        await connection.query(
          'DELETE FROM movies_genres WHERE movie_id = UUID_TO_BIN(?);',
          [id]
        );
  
        // Insertar los nuevos registros en movies_genres
        for (const genreId of genreIds) {
          await connection.query(
            'INSERT INTO movies_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);',
            [id, genreId]
          );
        }
      }

      // Construir y ejecutar la consulta de actualización solo si hay campos para actualizar
      if (updateFields.length > 0) {
        params.push(id); // Agregar el ID como último parámetro
        const query = `UPDATE movies SET ${updateFields.join(", ")} WHERE id = UUID_TO_BIN(?);`;
        await connection.query(query, params);
      }
  
      return true;
      // Resto del código...
    } catch (error) {
      console.error("Error updating movie:", error);
      throw new Error("Error updating movie");
    }
  }
  
}