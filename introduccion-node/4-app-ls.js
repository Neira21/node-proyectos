const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  }catch {
    console.error('Error al leer el directorio: ', folder)
    return
  }
  
  const filesPromises = files.map( async file => {
    const filePath = path.join(folder, file)
    let stats
    try{
      stats = await fs.stat(filePath)
    } catch {
      console.error('Error al leer el archivo: ', filePath)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'DIR' : 'FILE'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleDateString()
    
    return `${fileType}\t${fileSize}\t${fileModified}\t${file}`	
  })

  const filesInfo = await Promise.all(filesPromises)
  filesInfo.forEach( file => console.log(file))
}

ls(folder)
