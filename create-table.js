import { sql } from './db.js'

sql`
  CREATE TABLE carros (
      id text PRIMARY KEY,
      marca character varying(255),
      modelo character varying(255),
      placa character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})