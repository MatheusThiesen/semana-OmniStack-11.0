const crypto = require('crypto')
const connection = require('../database/connection')

//Arquivo ExampleController
//Funcoes index, show, store, destroy, update
//Index: Lista de Devs, Show: Mostrar apenas um Dev, Store: Criar um Dev, Update: Alterar Dev, Detroy: Deletar Dev. 

module.exports = {  
  async index(req, res) {
    const ongs = await connection('ongs').select('*');    
    
    
    res.json(ongs)
  }, 
  async store(req, res) {
    const {name, email, whatsapp, city, uf} = req.body;
    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    res.json({id});
  }
}