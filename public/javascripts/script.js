function getCookie() {
    fetch('/getcookie')
        .then(response => response.text())
        .then( data => {
            document.getElementById('name').innerText = data.split(':')[0];
        })
        .catch(error => {
            console.error('Error retrieving cookies')
        })
}