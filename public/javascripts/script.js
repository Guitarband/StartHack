async function getCookie() {
    try {
        let response = await fetch('/getcookie')
        return await response.text();
    } catch (error){
        return undefined;
    }
}

function getUser(userId){
    fetch(`/user`, {
        method:'GET',
        headers:{
            'Authorization': userId
        }
    }).then(response => {
        return response.json()
    }).then( data => {
        document.getElementById('name').innerText = data.username;
    }).catch(error => {
        console.error(`Error retrieving UserInfo: ${error}`)
    })
}

function trial(){
    fetch(`/api/v1/accounts/me`, {
        method: 'GET',
        headers:{
            'Authorization':'Guitarband'
        }
    }).then(response => {
        return response.json()
    })
}