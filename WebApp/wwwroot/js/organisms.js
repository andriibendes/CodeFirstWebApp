const uri = 'api/Virus';
const organisms = 'api/Organism';
let viruses = [];
let organismsArr = [];

function getOrganisms() {
    fetch(organisms)
        .then(response => response.json())
        .then(data => _displayOrganisms(data))
        .catch(error => console.error('Unable to get organisms.', error));
}

function addOrganism() {
    const addNameTextbox = document.getElementById('add-nameOrg');
    document.getElementById('add-on').innerHTML = "";

    const organism = {
        Name: addNameTextbox.value.trim(),
    };

    let regex = /[A-Z][a-z]+/;
    if (!regex.test(organism.Name)) {
        document.getElementById('add-on').innerHTML = "Name is not correct!";
    }
    else {
        document.getElementById('add-on').innerHTML = "";

        fetch(organisms)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == organism.Name) {
                        return true;
                    }
                }
                return false;
            })
            .then(boole => {
                if (boole) {
                    document.getElementById('add-on').innerHTML = "Name is taken!";
                }
                else {
                    fetch(organisms, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(organism)
                    })
                        .then(response => response.json())
                        .then(() => {
                            getOrganisms();
                            addNameTextbox.value = '';
                        })
                        .catch(error => console.error('Unable to add genome.', error));
                }
            })

    }
}

function deleteOrganism(id) {
    document.getElementById('ed-onv').innerHTML = "";
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].organismId === id)
                    return data[i].id;
            }
        })
        .then(data => {
            if (data === undefined) {
                fetch(`${organisms}/${id}`, {
                    method: 'DELETE'
                })
                    .then(() => getOrganisms())
                    .catch(error => console.error('Unable to delete organism.', error));
            }
            else {
                document.getElementById('ed-onv').innerHTML = "There are viruses with this organism!";
            }
        })

}

function displayEditForm(id) {
    const organism = organismsArr.find(organism => organism.id === id);

    document.getElementById('edit-oi').value = organism.id;
    document.getElementById('edit-on').value = organism.name;
}

function updateOrganism() {
    const organismId = document.getElementById('edit-oi').value;
    const organism = {
        Id: parseInt(organismId, 10),
        Name: document.getElementById('edit-on').value.trim(),

    };
    document.getElementById('ed-onv').innerHTML = "";

    let regex = /[A-Z][a-z]+/;

    if (!regex.test(organism.Name)) {
            document.getElementById('ed-onv').innerHTML = "Name is not correct!";
    }
    else {
        fetch(organisms)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == organism.Name) {
                        return true;
                    }
                }
                return false;
            })
            .then(boole => {
                if (boole) {
                    document.getElementById('ed-onv').innerHTML = "Name is taken!";
                }
                else {
                    document.getElementById('ed-onv').innerHTML = "";

                    fetch(`${organisms}/${organismId}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(organism)
                    })
                        .then(() => getOrganisms())
                        .catch(error => console.error('Unable to update organism.', error));

                    return false;
                }
            })
    }
}


function _displayOrganisms(data) {
    const tBody = document.getElementById('organisms');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(organism => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.classList.add("btn-warning");
        editButton.classList.add("btn");
        editButton.setAttribute('onclick', `displayEditForm(${organism.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("btn");
        deleteButton.setAttribute('onclick', `deleteOrganism(${organism.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(organism.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        td2.appendChild(editButton);

        let td3 = tr.insertCell(2);
        td3.appendChild(deleteButton);

    });

    organismsArr = data;
}
