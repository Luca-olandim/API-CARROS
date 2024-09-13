import { sql } from './db.js'
import { randomUUID } from "crypto";

export class DatabaseCarros {
    async createCarro(carro) {
        const id = randomUUID();
        const marca = carro.marca;
        const modelo = carro.modelo;
        const placa = carro.placa;

        await sql`insert into carros (id, marca, modelo, placa) 
            values (${id}, ${marca}, ${modelo}, ${placa})`;
    }

    async read(carros) {
      carros = await sql`select * from carros`;
    
    }
  
}