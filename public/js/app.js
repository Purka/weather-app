const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationField = document.querySelector('#message-1')
const summary = document.querySelector('#message-2')
const temperature = document.querySelector('#message-3')


weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    locationField.textContent = 'Loading...'
    summary.textContent = '';
    temperature.textContent = '';

    let url = '/weather?address=' + search.value

    try {
        let responce = await fetch(url)
        let data = await responce.json()

        if (data.forecast === undefined) {
            locationField.textContent = data.message
        } else {
            locationField.textContent = data.location
            summary.textContent = data.forecast.summary
            temperature.textContent = Math.round(data.forecast.temperature) + '°C'
            console.log(data.ip)
        }
    } catch (err) {
        console.log(err)
    }
})
