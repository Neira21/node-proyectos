import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState('')
  const [messageObject, setMessageObject] = useState({
    recipient: '',
    subject: '',
    text: ''
  })

  const getHelloService = async () => {
    const response = await fetch('http://localhost:3000/')
    const data = await response.text()
    setText(data)
  }

  const sendEmailService = async () => {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageObject)
    })
    const data = await response.text()
    setMessageObject({
      recipient: '',
      subject: '',
      text: ''
    })
    alert(data)
  }

  useEffect(()=>{
    getHelloService()
  },[])

  return (
    <>
      <h1>{text}</h1>

      <form action="">
        <div className="form-group">
          <label htmlFor="">Remitente</label>
          <input type="text" value={messageObject.recipient} onChange={(e) => setMessageObject({ ...messageObject, recipient: e.target.value })} />
        </div>

        <div className='form-group'>
          <label htmlFor="">Asunto</label>
          <input type="text" value={messageObject.subject} onChange={(e) => setMessageObject({ ...messageObject, subject: e.target.value })}  />
        </div>

        <div className='form-group'>
          <label htmlFor="">Mensaje</label>
          <textarea name="" id="" cols={30} rows={10} value={messageObject.text} onChange={(e) => setMessageObject({ ...messageObject, text: e.target.value })}></textarea>
        </div>

        <button type='button' onClick={sendEmailService}>Enviar</button>

      </form>
    </>
  )
}

export default App
