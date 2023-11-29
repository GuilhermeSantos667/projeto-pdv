const request = require('supertest')
const app = require('./src/index')

describe('cadastro e login', () =>{
	
    it('cadastrar conta sem nada no body', async () =>{
    
        const response = await request(app).post('/usuarios').send({})
    
    }),
    it('fazer login sem informar senha', async() =>{

        const response = await request(app).post('/login').send({email: "guilhherme10@outlook.com"})

    }),
    it('fazer login sem informar email', async() =>{

        const response = await request(app).post('/login').send({senha: "1234567"})

    })
    
    })

    describe('usuarios', () =>{

        it('atualizar com body vazio', async ()=>{
            const response = await request(app).put('/usuario').send({})
        }),
        it('atualizar usuario sem informar nome', async () =>{
            const response = await request(app).put('/usuario').send({email: "guilhherme10@outlook.com", senha: "1234567"} )
        }),
        it('atualizar usuario sem informar email', async () =>{
            const response = await request(app).put('/usuario').send({nome: "guilherme", senha: "1234567"} )
        })
        it('atualizar usuario sem informar senha', async () =>{
            const response = await request(app).put('/usuario').send({nome: "guilherme", email: "guilhherme10@outlook.com",} )
        })

    })
       describe('clientes', () =>{

        it('cadastrar com body vazio', async ()=>{
            const response = await request(app).post('/cliente').send({})
        }),
        it('cadastrar cliente sem informar nome', async () =>{
            const response = await request(app).post('/cliente').send({email: "guilhherme10@outlook.com", senha: "1234567"} )
        }),
        it('cadastrar cliente sem informar email', async () =>{
            const response = await request(app).post('/cliente').send({nome: "guilherme", senha: "1234567"} )
        })
        it('cadastrar cliente sem informar senha', async () =>{
            const response = await request(app).post('/cliente').send({nome: "guilherme", email: "guilhherme10@outlook.com",} )
        })

    })
    