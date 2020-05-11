const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    console.log(location)

    fetch('http://localhost:3002/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            messageThree.textContent = ''
        } else {
            // console.log(data.location)
            // console.log(data.Description)
            // console.log(data.Temperature)
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = 'Description: ' + data.Description
            messageThree.textContent = 'Temperature: ' + data.Temperature
        }
    })
})
})