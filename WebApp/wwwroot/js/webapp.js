const uri = 'api/Virus';
let viruses = [];

function getViruses() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayViruses(data))
        .catch(error => console.error('Unable to get viruses.', error));
}

function addCategory() {
    const addNameTextbox = document.getElementById('add-name');
    const addInfoTextbox = document.getElementById('add-genome');
    const addInfoTextbox = document.getElementById('add-organism');

    const virus = {
        name: addNameTextbox.value.trim(),
        genome: addGenomeTextbox.value.trim(),
        organism: addOrganismTextbox.value.trim(),
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(virus)
    })
        .then(response => response.json())
        .then(() => {
            getViruses();
            addNameTextbox.value = '';
            addGenomeTextbox.value = '';
            addOrganismTextbox.value = '';
        })
        .catch(error => console.error('Unable to add virus.', error));
}

function deleteVirus(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getViruses())
        .catch(error => console.error('Unable to delete virus.', error));
}

function displayEditForm(id) {
    const virus = viruses.find(virus => virus.id === id);

    document.getElementById('edit-id').value = virus.id;
    document.getElementById('edit-name').value = virus.name;
    document.getElementById('edit-genome').value = virus.genome;
    document.getElementById('edit-orgamism').value = virus.organism;
    document.getElementById('editForm').style.display = 'block';
}

function updateVirus() {
    const virusId = document.getElementById('edit-id').value;
    const virus = {
        id: parseInt(virusId, 10),
        name: document.getElementById('edit-name').value.trim(),
        document.getElementById('edit-genome').value.trim(),
        document.getElementById('edit-orgamism').value.trim()
    };

    fetch(`${uri}/${virusId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(virus)
    })
        .then(() => getViruses())
        .catch(error => console.error('Unable to update virus.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}


function _displayViruses(data) {
    const tBody = document.getElementById('viruses');
    tBody.innerHTML = '';


    const button = document.createElement('button');

    data.forEach(category => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${virus.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteCategory(${virus.id})`);

        let tr = tBody.insertRow();


        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(virus.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeInfo = document.createTextNode(virus.info);
        td2.appendChild(textNodeInfo);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    viruses = data;
}
