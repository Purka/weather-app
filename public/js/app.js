const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const host = 'localhost';
// git push heroku master

function main() {
    weatherForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = '';

        let url = '/weather?address=' + search.value

        try {
            let responce = await fetch(url)
            let data = await responce.json()

            if (data.forecast === undefined) {
                messageOne.textContent = data.message
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        } catch (err) {
            console.log(err)
        }
    })
}

main()
