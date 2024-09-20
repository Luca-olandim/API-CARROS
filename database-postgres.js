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

  async listCarros() {
    const carros = await sql`select * from carros`;
    return carros;
  }
  
  async updateCarro(id, carro) {
    const marca = carro.marca;
    const modelo = carro.modelo;
    const placa = carro.placa;

    await sql`update carros set 
        marca = ${marca},
        modelo = ${modelo},
        placa = ${placa}
        where id = ${id}
    `;
  }

  async deleteCarro(id) {
    await sql`delete from carros where id = ${id}`
  }
  
}