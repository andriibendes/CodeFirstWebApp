const uri = 'api/Virus';
const organisms = 'api/Organism';
const genomes = 'api/Genome';
let viruses = [];
let genomesArr = [];

function getGenomes() {
    fetch(genomes)
        .then(response => response.json())
        .then(data => _displayGenomes(data))
        .catch(error => console.error('Unable to get genomes.', error));
}

function addGenome() {
    const addNameTextbox = document.getElementById('add-nameGen');
    const addStrandTextbox = document.getElementById('add-strand');
    const addSenseTextbox = document.getElementById('add-sense');

    const genome = {
        Name: addNameTextbox.value.trim(),
        Strand: addStrandTextbox.value.trim(),
        Sense: addSenseTextbox.value.trim(),
    };


    fetch(genomes, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genome)
    })
        .then(response => response.json())
        .then(() => {
            getGenomes();
            addNameTextbox.value = '';
            addStrandTextbox.value = '';
            addSenseTextbox.value = '';
        })
        .catch(error => console.error('Unable to add genome.', error));
}

function deleteGenome(id) {
    fetch(`${genomes}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getViruses())
        .catch(error => console.error('Unable to delete genome.', error));
}

function displayEditFormGen(id) {
    const genome = genomesArr.find(genome => genome.id === id);

    document.getElementById('edit-idGen').value = genome.id;
    document.getElementById('edit-nameGen').value = genome.name;
    document.getElementById('edit-strand').value = genome.strand;
    document.getElementById('edit-sense').value = genome.sense;
}

function updateGenome() {
    const genomeId = document.getElementById('edit-idGen').value;
    const genome = {
        id: parseInt(genomeId, 10),
        name: document.getElementById('edit-nameGen').value.trim(),
        strand: document.getElementById('edit-strand').value.trim(),
        sense: document.getElementById('edit-sense').value.trim()
    };

    fetch(`${genomes}/${genomeId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genome)
    })
        .then(() => getGenomes())
        .catch(error => console.error('Unable to update genome.', error));

    return false;
}


function _displayGenomes(data) {
    const tBody = document.getElementById('genomes');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(genome => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormGen(${genome.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteGenome(${genome.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(genome.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNodeGenome = document.createTextNode(genome.strand);
        td2.appendChild(textNodeGenome);

        let td3 = tr.insertCell(2);
        let textNodeOrganism = document.createTextNode(genome.sense);
        td3.appendChild(textNodeOrganism);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);

    });

    genomesArr = data;
}



function getViruses() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayViruses(data))
        .catch(error => console.error('Unable to get viruses.', error));
}

function addVirus() {
    fetch(organisms)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === document.getElementById('add-organism').value.trim())
                    return data[i].id;
            }
        })
        .then(organism => {
            fetch(genomes)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name === document.getElementById('add-genome').value.trim())
                            return data[i].id;
                    }
                })
                .then(genome => {
                    const addNameTextbox = document.getElementById('add-name');
                    const addGenomeTextbox = document.getElementById('add-genome');
                    const addOrganismTextbox = document.getElementById('add-organism');
                    const virus = {
                        name: document.getElementById('add-name').value.trim(),
                        genomeId: genome,
                        organismId: organism
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


                })
        })
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
    document.getElementById('edit-organism').value = virus.organism;
}

function updateVirus() {
    fetch(organisms)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === document.getElementById('edit-organism').value.trim())
                    return data[i].id;
            }
        })
        .then(organism => {
            fetch(genomes)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name === document.getElementById('edit-genome').value.trim())
                            return data[i].id;
                    }
                })
                .then(genome => {
                    const virusId = document.getElementById('edit-id').value;
                    const virus = {
                        id: parseInt(virusId, 10),
                        name: document.getElementById('edit-name').value.trim(),
                        genomeId: genome,
                        organismId: organism
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

                    return false;
                })
        })
}


function _displayViruses(data) {
    const tBody = document.getElementById('viruses');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(virus => {
        fetch(organisms)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === virus.organismId)
                        return data[i].name;
                }
            })
            .then(organism => {
                fetch(genomes)
                    .then(response => response.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].id === virus.genomeId)
                                return data[i].name;
                        }
                    })
                    .then(genome => {
                        let editButton = button.cloneNode(false);
                        editButton.innerText = 'Edit';
                        editButton.classList.add("btn-warning");
                        editButton.setAttribute('onclick', `displayEditForm(${virus.id})`);

                        let deleteButton = button.cloneNode(false);
                        deleteButton.innerText = 'Delete';
                        deleteButton.classList.add("btn-danger");
                        deleteButton.setAttribute('onclick', `deleteVirus(${virus.id})`);

                        let tr = tBody.insertRow();

                        let td1 = tr.insertCell(0);
                        let textNode = document.createTextNode(virus.name);
                        td1.appendChild(textNode);

                        let td2 = tr.insertCell(1);
                        let textNodeGenome = document.createTextNode(genome);
                        td2.appendChild(textNodeGenome);

                        let td3 = tr.insertCell(2);
                        let textNodeOrganism = document.createTextNode(organism);
                        td3.appendChild(textNodeOrganism);

                        let td4 = tr.insertCell(3);
                        td4.appendChild(editButton);

                        let td5 = tr.insertCell(4);
                        td5.appendChild(deleteButton);
                    })
            })
    });        

    viruses = data;
}
