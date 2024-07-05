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
            const code = document.createElement('p')
            const codeText = document.createTextNode(key)
            code.classList.add('companyCode')
            code.appendChild(codeText)
            const name = document.createElement('p')
            const nameText = document.createTextNode(elements[key].Name)
            name.classList.add('companyName')
            name.appendChild(nameText)
            const esg = document.createElement('p')
            const esgText = document.createTextNode(elements[key].ESG)
            esg.classList.add('companyEsg')
            esg.appendChild(esgText)

            mainDiv.appendChild(code)
            mainDiv.appendChild(esg)
            mainDiv.appendChild(name)
            document.getElementById('exploreGrid').appendChild(mainDiv)
        }
    }
}

function buyStock(id,amount){
    fetch(`/buy?id=${id}&amount=${amount}`, {
        method:'GET'
    }).then(response => {
        return response.json()
    }).catch(error => {
        console.error(`Error during investment process: ${error}`)
    })
}

function sellStock(id,amount){
    fetch(`/sell?id=${id}&amount=${amount}`, {
        method:'POST',
    }).then(response => {
        return response.json()
    }).catch(error => {
        console.error(`Error during investment process: ${error}`)
    })
}