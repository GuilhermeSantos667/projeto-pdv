const Joi = require('joi');
const date = new Date()
const schemaUsuario = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'o campo nome é obrigatorio'
  }),
  senha: Joi.string().min(5).required().messages({
    'any.required': 'o campo senha é obrigatorio',
    "string.min": "a senha deve ser de no minimo 5 caracteres"
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'o campo email é obrigatorio',
    "string.email": "o email deve ter um formato valido"
  }),


});
const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'o campo email é obrigatorio',
    "string.email": "o email deve ter um formato valido"
  }),
  senha: Joi.string().min(5).required().messages({
    'any.required': 'o campo senha é obrigatorio',
    "string.min": "a senha deve ser de no minimo 5 caracteres"
  }),

})
const validarReq = joiSchema => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

const schemaCliente = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório'
  }),
  cpf: Joi.string().min(11).max(11).required().messages({
    'any.required': 'O campo CPF é obrigatório',
    'string.min': 'O CPF deve ter no mínimo 11 caracteres',
    'string.max': 'O CPF deve ter no máximo 11 caracteres'
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'O campo email é obrigatório',
    'string.email': 'O email deve ter um formato válido'
  }),
  cep: Joi.string().allow(null).messages({}),
  rua: Joi.string().allow(null).messages({}),
  numero: Joi.string().allow(null).messages({}),
  bairro: Joi.string().allow(null).messages({}),
  cidade: Joi.string().allow(null).messages({}),
  estado: Joi.string().allow(null).messages({}),
  telefone: Joi.string().allow(null).messages({}),
  endereco: Joi.string().allow(null).messages({})

});




module.exports = {
  schemaUsuario,
  validarReq,
  schemaLogin,
  schemaCliente
};