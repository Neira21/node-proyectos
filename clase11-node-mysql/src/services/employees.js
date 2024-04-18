import db from '../database/db.js';

const getAllData = async () => {
  const [results, ] = await db.query('SELECT (BIN_TO_UUID(id)) as "idEmployee" , name, salary FROM employee');
  return results
}

const getByIdData = async ({id}) => {
  try {
    const [result, ] = await db.query
    (`SELECT (BIN_TO_UUID(id)) as "idEmployee" , name, salary 
      FROM employee WHERE id = UUID_TO_BIN(?)`
      ,[id]
    );
    return result[0];  
  } catch (error) {
    console.log(error)
    return null;
  }
}

const createData = async ({data}) => {
  const { name , salary } = data;
  
  const [uuidResult] = await db.query('SELECT UUID() uuid;')
  const [{ uuid }] = uuidResult
  
  try {
    await db.query(
      `INSERT INTO employee (id, name, salary)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?);`,
      [name, salary]
    )  
    const [result, ] = await db.query
    (`SELECT (BIN_TO_UUID(id)) as "idEmployee" , name, salary 
      FROM employee WHERE id = UUID_TO_BIN(?)`
      ,[uuid]
    );
    if(result.length === 0) {
      return null;
    }
    return result[0];

  } catch (error) {
    console.log(error)
    return null;
  }
  
}
const updateData = async ({ id, data }) => {
  const { name, salary } = data;

  try {
    await db.query(
      `UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id=UUID_TO_BIN(?)`, 
      [name, salary, id]
    )
    
    const [employee] = await db.query(
      `SELECT (BIN_TO_UUID(id)) as "idEmployee" , name, salary 
        FROM employee WHERE id = UUID_TO_BIN(?)`
      ,[id]
    );
    return employee;
  } catch (error) {
    console.log(error)
  }  
}
const deleteData = async ({ id }) => {
  try {
    await db.query(
      `DELETE FROM employee WHERE id = UUID_TO_BIN(?)`,
      [id]
    )
  }catch(e) {
    console.log(e)
    return null;
  }
}

export { getAllData, getByIdData, createData, updateData, deleteData };