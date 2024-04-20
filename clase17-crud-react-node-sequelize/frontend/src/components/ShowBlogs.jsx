import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CreateBlog from './CreateBlog'

const ShowBlogs = () => {
  //Ejecutar el backend para que funcione la aplicación
  const url = 'http://localhost:3000/blogs'

  const [blogs, setBlogs] = useState([])
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [blogToEdit, setBlogToEdit] = useState({})
  
  const getBlogs = async () => {
    await axios.get(url)
    .then((res) => {
      console.log(res.data)
      setBlogs(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteBlog = async (id) => {
    await axios.delete(`${url}/${id}`) 
    .then((res) => {
      console.log(res.data)
      getBlogs()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const editModal = (blog) => {
    setBlogToEdit(blog)
    setIsEdit(true)
    setShowModalCreate(true)
  }


  useEffect(()=> {
    getBlogs()
  },[blogs])

  const changeShowModalCreate = () => {
    setIsEdit(false)
    setShowModalCreate(!showModalCreate)
  }

  return (
    <>
    <h1>Blogs</h1>
    <div className='crear'>
      <button className="btn btn-success" onClick={changeShowModalCreate}>
        <i className="fa-solid fa-plus"></i>  
      </button>
    </div>
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th scope="colSpan">#</th>
          <th scope="colSpan">Title</th>
          <th scope="colSpan">Contenido</th>
          <th scope="colSpan">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          blogs.map((blog) => (
            <tr key={blog.id}>
              <th scope="row">{blog.id}</th>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>editModal(blog)} >Edit</button>
                <button className="btn btn-danger" onClick={()=>deleteBlog(blog.id)} >Delete</button>
              </td>
            </tr>
          ))
        }        
      </tbody>
    </table>
        {
          showModalCreate 
            ? <CreateBlog 
              getBlogs={getBlogs}
              changeShowModalCreate={changeShowModalCreate} 
              blogToEdit={blogToEdit}
              isEdit={isEdit}
              /*Si isedit es true pasar 'editar' sino 'crear' */
              titulo={isEdit ? 'Editar' : 'Crear'}
             /> : null
        }
    </>
  )
}

export default ShowBlogs