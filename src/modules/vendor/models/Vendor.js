const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'fornecedor'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const find = async fornecedorid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ fornecedorid }).first().then(row => row)
    if (!result) { throw new Error('Vendor not found') }
    return result
  }

  const update = async (fornecedorid, data) => {
    await find(fornecedorid)

    await knex.update(data).from(TABLE_NAME).where({ fornecedorid })
  }

  const remove = async fornecedorid => {
    await find(fornecedorid)

    await knex.del().from(TABLE_NAME).where({ fornecedorid })
  }

  const findin = async vendors => {
    const result = await knex.select('*').from(TABLE_NAME).whereIn('fornecedorid', vendors)
    console.log(result)
    if (!result) { throw new Error('Item not found') }

    return result
  }

  return { create, find, update, remove, list, findin }
}