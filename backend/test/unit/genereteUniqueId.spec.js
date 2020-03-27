//Teste unitario e para testar algo exclusivo da aplicação sem "efeitos colaterais"
const genereteUniqueId = require('../../src/utils/genereteUniqueId')

describe('Genetate Unique ID', () => {
  it('shuld generete an unique ID', () => {
    const id = genereteUniqueId();

    expect(id).toHaveLength(8);
  })
})