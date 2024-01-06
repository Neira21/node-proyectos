// Info del sistema

const os = require('node:os');

console.log('Información del sistema operativo:')

console.log('========================--------========================')

console.log('Nombre del sistema operativo', os.platform());
console.log('Versión del sistema operativo', os.release());
console.log('Arquitectura del sistema', os.arch());

console.log('Memoria libre del sistema', os.freemem() / 1024 / 1024 / 1024 );
console.log('Memoria total del sistema', os.totalmem() / 1024 / 1024 / 1024 )  ;




console.log('Información del CPU', os.cpus());
console.log('Directorio raíz del usuario', os.homedir());
console.log('Directorio temporal del sistema', os.tmpdir());
console.log('Nombre del host de la máquina', os.hostname());

console.log('Interfaces de red activas', os.networkInterfaces());

console.log('CPUS', os.cpus().length) // para escalar procesos en Node



console.log('========================--------========================')

