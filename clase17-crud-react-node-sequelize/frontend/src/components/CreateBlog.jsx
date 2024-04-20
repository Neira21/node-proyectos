import {useState} from 'react'
import axios from 'axios'

const CreateBlog = ({getBlogs, changeShowModalCreate, isEdit, blogToEdit, titulo}) => {

  const [newValue, setNewValue] = useState((isEdit) ? blogToEdit : {title: '', content: ''})

  const saveChanges = (e) => {
    e.preventDefault()
    if(isEdit){
      editBlog(blogToEdit.id, newValue)
    } else {
      create(newValue)
    }
    changeShowModalCreate()
  }

  const onChange = (e) => {
    setNewValue({
      ...newValue,
      [e.target.id]: e.target.value
    })
  }

  const create = async (blog) => {
    await axios.post('http://localhost:3000/blogs', blog)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const editBlog = async (id, blog) => {
    await axios.put(`http://localhost:3000/blogs/${id}`, blog)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="main">
      <div className="modal-main">
        <div className="modal-encabezado">
          <h5 className="modal-titulo">{titulo} Blog</h5>
        </div>

        <div className="modal-formulario">
          <form onSubmit={saveChanges}>
            <label htmlFor="title">Title</label>
            <input id='title' type="text" className="form-control" onChange={onChange} value={newValue.title} />
            <label htmlFor="Content">Content</label>
            <input id='content' type='text' className="form-control" onChange={onChange} value={newValue.content} />
            <div className='acciones'>
              <a type="button" onClick={()=>changeShowModalCreate()} className="btn btn-secondary">Close</a>
              <button type="sub" className="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>

        
      
      </div>
      
    </div>
  )
}

export default CreateBlog