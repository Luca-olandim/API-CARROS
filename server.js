import { fastify } from 'fastify'
import cors from '@fastify/cors'
import { DatabaseCarros } from './database-postgres.js'

const server = fastify();
const databasePostgres = new DatabaseCarros;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// ENDPOINTS (CRUD):

// CREATE
server.post('/carros', async (request, reply) => {
    const body = request.body;

    let error = {};

    if(!body.marca){
      error.marca = 'O valor marca não foi informado'
    }
    if (!body.modelo){
      error.modelo = 'O valor modelo não foi informado'
    }
    if (!body.placa){
      error.placa = 'O valor placa não foi informado'
    }  

    if(body.marca && body.modelo && body.placa){
      await databasePostgres.createCarro(body);
      return reply.status(201).send
    }
    else{
      return reply.status(400).send(error)
    }
  });

// READE
server.get('/carros', async () => {
  const carros = await databasePostgres.listCarros();
  return carros;
});

// UPDATE
server.put('/carros/:id', async (request, reply) => {
  const carroID = request.params.id;
  const body = request.body;

  let error = {};

    if(!body.carroID){
      error.carroID = 'O valor id não foi informado'
    }
    if(!body.marca){
      error.marca = 'O valor marca não foi informado'
    }
    if (!body.modelo){
      error.modelo = 'O valor modelo não foi informado'
    }
    if (!body.placa){
      error.placa = 'O valor placa não foi informado'
    }  

    if(body.carroID && body.marca && body.modelo && body.placa){
      await databasePostgres.updateCarro(carroID, body);
      return reply.status(204).send
    }
    else{
      return reply.status(400).send(error)
    }
})

// DELETE
server.delete('/carros/:id', async (request, reply) => {
  const carroID = request.params.id;

  if(carroID){
    await databasePostgres.deleteCarro(carroID);
    return reply.status(204).send
  }
  else{
    return reply.status(400).send('O valor id não foi informado')
  }
})


server.listen({
    port: 3333
});
