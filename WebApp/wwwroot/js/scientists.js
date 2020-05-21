const viruses = 'api/Virus';
const scientists = "api/Scientist";
const virusscientis = "api/VirusScientist";

let scientistsArr = [];

function getScientists() {
    fetch(scientists)
        .then(response => response.json())
        .then(data => _displayScientists(data))
        .catch(error => console.error('Unable to get scientists.', error));
}

function addScientist() {
    const addNameTextbox = document.getElementById('add-na');
    const addCountryTextbox = document.getElementById('add-co');
    document.getElementById('add-ns').innerHTML = "";
    document.getElementById('add-cs').innerHTML = "";
    const scientist = {
        Name: addNameTextbox.value.trim(),
        Country: addCountryTextbox.value.trim(),
    };

    let nameRegex = /^[a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/;
    let regex = /[A-Z][a-z]+/;
    if (!nameRegex.test(scientist.Name) || !regex.test(scientist.Country)) {
        if (!nameRegex.test(scientist.Name)) {
            document.getElementById('add-ns').innerHTML = "Name is not correct!";
        }
        if (!regex.test(scientist.Country)) {
            document.getElementById('add-cs').innerHTML = "Country is not correct!";
        }
    }
    else {
        document.getElementById('add-ns').innerHTML = "";
        document.getElementById('add-cs').innerHTML = "";

        fetch(scientists)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == scientist.Name) {
                        return true;
                    }
                }
                return false;
            })
            .then(boole => {
                if (boole) {
                    document.getElementById('add-ns').innerHTML = "Name is taken!";
                }
                else {
                    fetch(scientists, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(scientist)
                    })
                        .then(response => response.json())
                        .then(() => {
                            getScientists();
                            addNameTextbox.value = '';
                            addCountryTextbox.value = '';
                        })
                        .catch(error => console.error('Unable to add scientist.', error));
                }
            })

    }
}

function deleteScientist(id) {
    document.getElementById('ed-ns').innerHTML = "";
    fetch(virusscientis)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].scientisId === id)
                    return data[i].id;
            }
        })
        .then(data => {
            if (data === undefined) {
                fetch(`${scientists}/${id}`, {
                    method: 'DELETE'
                })
                    .then(() => getScientists())
                    .catch(error => console.error('Unable to delete scientist.', error));
            }
            else {
                document.getElementById('ed-ns').innerHTML = "There are disoveries with this scientist!";
            }
        })

}

function displayEditForm(id) {
    const scientist = scientistsArr.find(scientist => scientist.id === id);

    document.getElementById('edit-id').value = scientist.id;
    document.getElementById('edit-na').value = scientist.name;
    document.getElementById('edit-co').value = scientist.country;
}

function updateScientist() {
    const sciId = document.getElementById('edit-id').value;
    const scientist = {
        Id: parseInt(sciId, 10),
        Name: document.getElementById('edit-na').value.trim(),
        Country: document.getElementById('edit-co').value.trim(),
    };
    document.getElementById('ed-ns').innerHTML = "";
    document.getElementById('ed-cs').innerHTML = "";
    let nameRegex = /^[a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/;
    let regex = /[A-Z][a-z]+/;
    if (!nameRegex.test(scientist.Name) || !regex.test(scientist.Country)) {
        if (!nameRegex.test(scientist.Name)) {
            document.getElementById('ed-ns').innerHTML = "Name is not correct!";
        }
        if (!regex.test(scientist.Country)) {
            document.getElementById('ed-cs').innerHTML = "Country is not correct!";
        }
    }
    else {
        document.getElementById('ed-ns').innerHTML = "";
        document.getElementById('ed-cs').innerHTML = "";

        fetch(scientists)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == scientist.Name) {
                        return true;
                    }
                }
                return false;
            })
            .then(boole => {
                if (boole) {
                    document.getElementById('ed-ns').innerHTML = "Name is taken!";
                }
                else {
                    fetch(`${scientists}/${sciId}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(scientist)
                    })
                        .then(() => getScientists())
                        .catch(error => console.error('Unable to update scientist.', error));
                }
            })
    }
}


function _displayScientists(data) {
    const tBody = document.getElementById('scientists');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(scientist => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.classList.add("btn-warning");
        editButton.classList.add("btn");
        editButton.setAttribute('onclick', `displayEditForm(${scientist.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("btn");
        deleteButton.setAttribute('onclick', `deleteScientist(${scientist.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(scientist.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeCountry = document.createTextNode(scientist.country);
        td2.appendChild(textNodeCountry);

        let td4 = tr.insertCell(2);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(3);
        td5.appendChild(deleteButton);

    });

    scientistsArr = data;
}
