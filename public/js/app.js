// const { response } = require("express")
//  const e = require("express")

const baseUrl = '/whether?'


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    msgOne.textContent = ''
    msgTwo.textContent = ''

    const location = ('address=' + search.value)

    fetch(baseUrl + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.data[0]
                msgTwo.textContent = data.location
                document.getElementById("img").src = data.data[1]
            }

        })
    })
})