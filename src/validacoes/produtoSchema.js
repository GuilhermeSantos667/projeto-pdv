const Joi = require('joi');
const schemaProduto = Joi.object({
    descricao: Joi.string().required().messages({
        'any.required': 'o campo descrição é obrigatorio'
    }),

    quantidade_estoque: Joi.number().required().messages({
        'any.required': 'o campo quantidade em estoque é obrigatorio'
    }),

    valor: Joi.number().required().messages({
        'any.required': 'o campo valor é obrigatorio'
    }),

    categoria_id: Joi.number().required().messages({
        'any.required': 'o campo categoria é obrigatorio'
    })
});


module.exports = schemaProduto