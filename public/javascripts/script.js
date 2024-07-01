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

function fetchCompanyData(query){
    return fetch(`/api/v1/company?name=${query}`).then(response => {
        return response.json()
    })
}

function populateExplore(elements){
    for(let key in elements){
        if(elements.hasOwnProperty(key)) {
            const mainDiv = document.createElement('div')
            mainDiv.classList.add('companyCards')
            const text = document.createTextNode(key)
            mainDiv.appendChild(text)
            document.getElementById('exploreGrid').appendChild(mainDiv)
        }
    }
}