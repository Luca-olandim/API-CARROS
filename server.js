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
    await databasePostgres.createCarro(body);
    return 201
  });


// READ
server.get('/carros', async (request, reply) => {
    const body = request.body;
    await databasePostgres.get(body);
    return 201
  });

// UPDATE


// DELETE


server.listen({
    port: 3333
});
