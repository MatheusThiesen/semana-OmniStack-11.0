const connection = require('../database/connection');

//Arquivo ExampleController
//Funcoes index, show, store, destroy, update
//Index: Lista de Devs, Show: Mostrar apenas um Dev, Store: Criar um Dev, Update: Alterar Dev, Detroy: Deletar Dev. 

module.exports = {
  async store (req, res) {
    const {title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value, 
      ong_id
    })

    res.json({id})
  },
  async index (req, res){
    const response = await connection('incidents').select('*');
    res.json(response)
  }, 
  async detroy (req, res){
    const {id} = req.params
    const ong_id = req.headers.authorization;

    const incidents = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    console.log(incidents.ong_id, ong_id);
    

    if (incidents.ong_id !== ong_id) 
      return res.status(401).json({error: "not permited"});
    

    await connection('incidents').where('id', id).delete();
    return res.status(204).send();
  }
}