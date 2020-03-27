const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', ()=> {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a now ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      // .set('Authorization', 'e10ef4b4') Enviar Header
      .send({
        name:"PAE",
        email:"teste@teste.com",
        whatsapp:"51989275201",
        city:"Gravatai",
        uf:"RS"   
      })
      
  expect(response.body).toHaveProperty('id');
  expect(response.body.id).toHaveLength(8);
  });
});