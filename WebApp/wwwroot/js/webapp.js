const uri = 'api/Virus';
const organisms = 'api/Organism';
let viruses = [];

function getViruses() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayViruses(data))
        .catch(error => console.error('Unable to get viruses.', error));
}

function addVirus() {
    const addNameTextbox = document.getElementById('add-name');
    const addGenomeTextbox = document.getElementById('add-genome');
    const addOrganismTextbox = document.getElementById('add-organism');

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
        genome: document.getElementById('edit-genome').value.trim(),
        organism: document.getElementById('edit-orgamism').value.trim()
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

    data.forEach(virus => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${virus.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteVirus(${virus.id})`);

        let tr = tBody.insertRow();

        let organ = fetch(organisms)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => console.error('Unable to get viruses.', error));

        organ.then(value => {
            for (let i = 0; i < value.length; ++i) {
                if (value[i].id === virus.organismId)
                    return value[i].name;
            }
        }).then(data => {
            let td1 = tr.insertCell(0);
            let textNode = document.createTextNode(virus.name);
            td1.appendChild(textNode);

            let td2 = tr.insertCell(1);
            let textNodeGenome = document.createTextNode(data);
            td2.appendChild(textNodeGenome);

            let td3 = tr.insertCell(2);
            let textNodeOrganism = document.createTextNode(virus.organism);
            td3.appendChild(textNodeOrganism);

            let td4 = tr.insertCell(3);
            td4.appendChild(editButton);

            let td5 = tr.insertCell(4);
            td5.appendChild(deleteButton);
        });
        
    });

    viruses = data;
}
