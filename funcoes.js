'use strict'

/**************************************************************************************
 * Objetivo: Arquivos de funções para gerenciar a API do WhatsApp  
 * Data: 24/09/2025
 * Nome: João Victor Santos de Moraes
 * Versão: 1.0
**************************************************************************************/

var dados = require('./contatos.js')

function getAllDados() {
    return dados
}

function getAllDadosProfile(number) {
    let dadosFuncao = dados
    let profile = dadosFuncao.contatos["whats-users"].find(item => item.number == number)
    delete profile.contacts
    return profile   

}

function getAllContacts(number) {
    let dadosFuncao = {}
    let message = {item: []}
    dadosFuncao = dados.contatos['whats-users'].slice()
    //let profile = dadosFuncao['whats-users'].find(item => item.number == number)
//console.log(dadosFuncao)

    dadosFuncao.forEach(function(item){
        if(item.number == number){
            let contacts = item.contacts
            contacts.forEach(function(itemContacts){
                //delete itemContacts.messages
                let json = {}
                json.nome = item.contacts.nome
                json.messages = itemContacts.messages
                message.item.push(json)
            })
        }
    })
    // // let contacts = profile.contacts
    // // contacts.forEach((item) => {
        //delete item.messages
    
    // // })

    console.log(message)
    //  console.log(dados.contatos['whats-users'][0].contacts[0].messages)
}


function getTeste() {
    //console.log(dados.contatos['whats-users'][0].contacts[0].messages)
}
getAllContacts("11987876567")

getTeste()
