'use strict'

/**************************************************************************************
 * Objetivo: Arquivos de funções para gerenciar a API do WhatsApp  
 * Data: 24/09/2025
 * Nome: João Victor Santos de Moraes
 * Versão: 1.0
**************************************************************************************/

var dados = require('./contatos.js')

const MESSAGE_ERROR = {
    status: false,
    status_code: 500,
    development: "João Victor Santos de Moraes"
}

const MESSAGE_SUCCESS = {
    status: true,
    status_code: 200,
    development: "João Victor Santos de Moraes"
}

function getAllDados() {
    let success = JSON.parse(JSON.stringify(MESSAGE_SUCCESS))

    if (dados == null) {
        return MESSAGE_ERROR
    } else {
        success.contatos = []
        success.contatos.push(dados.contatos)
        return success
    }
}

function getAllDadosProfile(number) {
    let success = JSON.parse(JSON.stringify(MESSAGE_SUCCESS))
    let dadosFuncao = JSON.parse(JSON.stringify(dados))
    let profile = dadosFuncao.contatos["whats-users"].find(item => item.number == number)

    if (profile == undefined) {
        return MESSAGE_ERROR

    } else {
        delete profile.contacts
        success.usuario = []
        success.usuario.push(profile)
        return success

    }
}

function getAllContacts(number) {
    let success = JSON.parse(JSON.stringify(MESSAGE_SUCCESS))
    let allContacts = []
    let profile = dados.contatos['whats-users'].find(item => item.number == number)

    if (profile != undefined) {
        let contacts = profile.contacts

        for (let i = 0; i < contacts.length; i++) {
            let contact = {
                name: contacts[i].name,
                number: contacts[i].number,
                description: contacts[i].description,
                image: contacts[i].image
            }

            allContacts.push(contact)
        }
    }

    if (allContacts.length <= 0) {
        return MESSAGE_ERROR

    } else {
        success.contacts = []
        success.contacts.push(allContacts)
        return success

    }
}

function getAllDatasMessage(number) {
    let success = JSON.parse(JSON.stringify(MESSAGE_SUCCESS))
    let profile = dados.contatos['whats-users'].find(item => item.number == number)
    let contacts

    if (profile != undefined) {
        contacts = profile.contacts
    }

    if (contacts == null) {
        return MESSAGE_ERROR

    } else {
        success.messages = []
        success.messages.push(contacts)
        return success

    }
}

function getMessage(numberUser, numberContact) {
    let success = JSON.parse(JSON.stringify(MESSAGE_SUCCESS))
    let profile = dados.contatos['whats-users'].find(item => item.number == numberUser)
    let contact

    if (profile != undefined) {
        contact = profile.contacts.find(item => item.number == numberContact)
    }

    if (contact == undefined || profile == undefined) {
        return MESSAGE_ERROR

    } else {
        let datasContact = {
            name: contact.name,
            number: contact.number,
            messages: [contact.messages]
        }

        success.message = []
        success.message.push(datasContact)
        return success
    }
}

function getWordMessage(numberUser, numberContact, word) {
    let success = JSON.parse(JSON.stringify(MESSAGE_SUCCESS))
    let profile = dados.contatos['whats-users'].find(item => item.number == numberUser)
    let contact
    let messageFind

    if (profile != undefined) {
        contact = profile.contacts.find(item => item.number == numberContact)

        if (contact != undefined) {
            messageFind = contact.messages.find(item => item.content.includes(word))

        }
    }

    if (messageFind == null) {
        return MESSAGE_ERROR

    } else {
        success.messageFind = []
        success.messageFind.push(messageFind)
        return success
    }
}

module.exports = {
    getAllDados,
    getAllDadosProfile,
    getAllContacts,
    getAllDatasMessage,
    getMessage,
    getWordMessage
}