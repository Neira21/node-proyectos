Para levantar el docker-compose con el servicio de node y mongodb, ejecutar el siguiente comando:

```bash
docker compose up -d
```

Para detener el docker-compose con el servicio de node y mongodb, ejecutar el siguiente comando:
```bash
docker compose down
```
o de la misma aplicación de docker desktop.

Para ver los logs de los servicios, ejecutar el siguiente comando:
```bash
docker compose logs -f
```

Para conectarse a la base de datos de mongodb, ejecutar el siguiente comando:
```bash
docker exec -it clase9-node-mongodb_mongo_1 mongo -u root -p root --authenticationDatabase admin
```

Para conectarse al contenedor de node, ejecutar el siguiente comando:
```bash
docker exec -it clase9-node-mongodb_node_1 sh
```

Para conectarse al contenedor de mongodb, ejecutar el siguiente comando:
```bash
docker exec -it clase9-node-mongodb_mongo_1 sh
```


