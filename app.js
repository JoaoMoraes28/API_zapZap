'use strict'

/**************************************************************************************
 * Objetivo: Endpoints referentes a API Zap Zap
 * Data: 30/09/2025
 * Nome: João Victor Santos de Moraes
 * Versão: 1.0
 * 
 * Observações: Instalação do Express, Cors, Body-Parser
 * npm install express --save
 * npm install cors --save
 * npm install body-parser --save
**************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const funcoes = require('./modulo/funcoes.js')

const PORT = process.PORT || 8080

const app = express()

//Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET')

    app.use(cors())
    next()
})

//Endpoints
app.listen(PORT, () => {
    console.log('API aguardando requisições...')
})

app.get('/v1/users', (request, response) => {
    let users = funcoes.getAllDados()

    response.status(users.status_code)
    response.json(users)
})

app.get('/v1/user/:number', (request, response) => {
    let number = request.params.number
    let user = funcoes.getAllDadosProfile(number)

    response.status(user.status_code)
    response.json(user)
})

app.get('/v1/contacts/:number', (request, response) => {
    let number = request.params.number
    let contacts = funcoes.getAllContacts(number)

    response.status(contacts.status_code)
    response.json(contacts)
})

app.get('/v1/messages/:number', (request, response) => {
    let number = request.params.number
    let messages = funcoes.getAllDatasMessage(number)

    response.status(messages.status_code)
    response.json(messages)
})

app.get('/v1/message', (request, response) => {
    let numberUser = request.query.user
    let numberContact = request.query.contact

    let message = funcoes.getMessage(numberUser, numberContact)

    response.status(message.status_code)
    response.json(message)
})

app.get('/v1/message_find', (request, response) => {
    let numberUser = request.query.user
    let numberContact = request.query.contact
    let word = request.query.keyword

    let messageFind = funcoes.getWordMessage(numberUser, numberContact, word)

    response.status(messageFind.status_code)
    response.json(messageFind)
})