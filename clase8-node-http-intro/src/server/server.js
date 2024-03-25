// const express = require('express')
import express from 'express'

//const path = require('path')}
import path from 'path'

export const startServer = (options) =>{
  const {port, public_path = 'public' } = options;
  const app = express()
  app.use(express.static(public_path))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + `../../../${public_path}`, 'index.html'))
  })

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}