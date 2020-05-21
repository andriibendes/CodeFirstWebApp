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
    document.getElementById('add-gn').innerHTML = "";
    document.getElementById('add-gs').innerHTML = "";
    document.getElementById('add-gss').innerHTML = "";
    const genome = {
        Name: addNameTextbox.value.trim(),
        Strand: addStrandTextbox.value.trim(),
        Sense: addSenseTextbox.value.trim(),
    };

    let regex = /[A-Z][a-z]+/;
    if (!regex.test(genome.Name) || !regex.test(genome.Strand) || !regex.test(genome.Sense)) {
        if (!regex.test(genome.Name)) {
            document.getElementById('add-gn').innerHTML = "Name is not correct!";
        }
        if (!regex.test(genome.Strand)) {
            document.getElementById('add-gs').innerHTML = "Strand is not correct!";
        }
        if (!regex.test(genome.Sense)) {
            document.getElementById('add-gss').innerHTML = "Sense is not correct!";
        }
    }
    else {
        document.getElementById('add-gn').innerHTML = "";
        document.getElementById('add-gs').innerHTML = "";
        document.getElementById('add-gss').innerHTML = "";

        fetch(genomes)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == genome.Name) {
                        return true;
                    }
                }
                return false;
            })
            .then(boole => {
                if (boole) {
                    document.getElementById('add-gn').innerHTML = "Name is taken!";
                }
                else {
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
            })
    
    }
}

function deleteGenome(id) {
    document.getElementById('ed-gn').innerHTML = "";
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].genomeId === id)
                    return data[i].id;
            }
        })
        .then(data => {
            if (data === undefined) {
                fetch(`${genomes}/${id}`, {
                    method: 'DELETE'
                })
                    .then(() => getGenomes())
                    .catch(error => console.error('Unable to delete genome.', error));
            }
            else {
                document.getElementById('ed-gn').innerHTML = "There are viruses with this genome!";
            }
        })

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
        Id: parseInt(genomeId, 10),
        Name: document.getElementById('edit-nameGen').value.trim(),
        Strand: document.getElementById('edit-strand').value.trim(),
        Sense: document.getElementById('edit-sense').value.trim()
    };
    document.getElementById('ed-gn').innerHTML = "";
    document.getElementById('ed-gs').innerHTML = "";
    document.getElementById('ed-gss').innerHTML = "";
    let regex = /[A-Z][a-z]+/;

    if (!regex.test(genome.Name) || !regex.test(genome.Strand) || !regex.test(genome.Sense)) {
        if (!regex.test(genome.Name)) {
            document.getElementById('ed-gn').innerHTML = "Name is not correct!";
        }
        if (!regex.test(genome.Strand)) {
            document.getElementById('ed-gs').innerHTML = "Strand is not correct!";
        }
        if (!regex.test(genome.Sense)) {
            document.getElementById('ed-gss').innerHTML = "Sense is not correct!";
        }
    }
    else {
        fetch(genomes)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name == genome.Name) {
                        return true;
                    }
                }
                return false;
            })
            .then(boole => {
                if (boole) {
                    document.getElementById('ed-gn').innerHTML = "Name is taken!";
                }
                else {
                    document.getElementById('ed-gn').innerHTML = "";
                    document.getElementById('ed-gs').innerHTML = "";
                    document.getElementById('ed-gss').innerHTML = "";
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
            })
    }
}


function _displayGenomes(data) {
    const tBody = document.getElementById('genomes');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(genome => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.classList.add("btn-warning");
        editButton.classList.add("btn");
        editButton.setAttribute('onclick', `displayEditFormGen(${genome.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add("btn-danger");
        deleteButton.classList.add("btn");
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
                    console.log(genome);
                    const addNameTextbox = document.getElementById('add-name');
                    const addGenomeTextbox = document.getElementById('add-genome');
                    const addOrganismTextbox = document.getElementById('add-organism');
                    document.getElementById('add-vn').innerHTML = "";
                    document.getElementById('add-vg').innerHTML = "";
                    document.getElementById('add-vo').innerHTML = "";
                    const virus = {
                        name: document.getElementById('add-name').value.trim(),
                        genomeId: genome,
                        organismId: organism
                    };
                    let regex = /[A-Z][a-z]+/;
                    if (genome == undefined || organism == undefined || !regex.test(virus.name)) {
                        if (!regex.test(virus.name)) {
                            document.getElementById('add-vn').innerHTML = "Name is not correct!";
                        }
                        if (genome == undefined) {
                            document.getElementById('add-vg').innerHTML = "Genome is not correct!";
                        }
                        if (organism == undefined) {
                            document.getElementById('add-vo').innerHTML = "Organism is not correct!";
                        }
                    }
                    else {
                        fetch(uri)
                            .then(response => response.json())
                            .then(data => {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].name == virus.name) {
                                        return true;
                                    }
                                }
                                return false;
                            })
                            .then(boole => {
                                if (boole) {
                                    document.getElementById('add-vn').innerHTML = "Name is taken!";
                                }
                                else {
                                    document.getElementById('add-vn').innerHTML = "";
                                    document.getElementById('add-vg').innerHTML = "";
                                    document.getElementById('add-vo').innerHTML = "";

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
                                }
                            })
                    }
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
    document.getElementById('ed-vn').innerHTML = "";
    document.getElementById('ed-vg').innerHTML = "";
    document.getElementById('ed-vo').innerHTML = "";
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
                    let regex = /[A-Z][a-z]+/;
                    if (genome == undefined || organism == undefined || !regex.test(virus.name)) {
                        if (!regex.test(virus.name)) {
                            document.getElementById('ed-vn').innerHTML = "Name is not correct!";
                        }
                        if (genome == undefined) {
                            document.getElementById('ed-vg').innerHTML = "Genome is not correct!";
                        }
                        if (organism == undefined) {
                            document.getElementById('ed-vo').innerHTML = "Organism is not correct!";
                        }
                    }
                    else {
                        fetch(uri)
                            .then(response => response.json())
                            .then(data => {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].name == virus.name) {
                                        return true;
                                    }
                                }
                                return false;
                            })
                            .then(boole => {
                                if (boole) {
                                    document.getElementById('ed-vn').innerHTML = "Name is taken!";
                                }
                                else {
                                    document.getElementById('ed-vn').innerHTML = "";
                                    document.getElementById('ed-vg').innerHTML = "";
                                    document.getElementById('ed-vo').innerHTML = "";
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
                                }
                            })
                    }
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
                        editButton.classList.add("btn");
                        editButton.setAttribute('onclick', `displayEditForm(${virus.id})`);

                        let deleteButton = button.cloneNode(false);
                        deleteButton.innerText = 'Delete';
                        deleteButton.classList.add("btn-danger");
                        deleteButton.classList.add("btn");
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
