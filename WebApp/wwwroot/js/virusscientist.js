const viruss = 'api/Virus';
const scientists = "api/Scientist";
const discov = "api/VirusScientist";

let arr = [];


function getDisc() {
    fetch(discov)
        .then(response => response.json())
        .then(data => _displayDisc(data))
        .catch(error => console.error('Unable to get discoveries.', error));
}

function addDisc() {
    fetch(viruss)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === document.getElementById('add-vir').value.trim())
                    return data[i].id;
            }
        })
        .then(virus => {
            fetch(scientists)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name === document.getElementById('add-sci').value.trim())
                            return data[i].id;
                    }
                })
                .then(scientist => {
                    const addVirTextbox = document.getElementById('add-vir');
                    const addSciTextbox = document.getElementById('add-sci');
                    const addYearTextbox = document.getElementById('add-yea');
                    document.getElementById('add-v').innerHTML = "";
                    document.getElementById('add-s').innerHTML = "";
                    document.getElementById('add-y').innerHTML = "";
                    let year = document.getElementById('add-yea').value.trim(); 
                    let regex = /[1-9][0-9]+/;
                    if (virus == undefined || scientist == undefined || !regex.test(year) || year < 1000 || year > 2020) {
                        if (!regex.test(year) || year < 1000 || year > 2020) {
                            document.getElementById('add-y').innerHTML = "Year is not correct!";
                        }
                        if (virus == undefined) {
                            document.getElementById('add-v').innerHTML = "Virus is not correct!";
                        }
                        if (scientist == undefined) {
                            document.getElementById('add-s').innerHTML = "Scientist is not correct!";
                        }
                    }
                    else {
                        fetch(discov)
                            .then(response => response.json())
                            .then(data => {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].virusId == virus && data[i].scientistId == scientist) {
                                        return true;
                                    }
                                }
                                return false;
                            })
                            .then(boole => {
                                if (boole) {
                                    document.getElementById('add-v').innerHTML = "Discovery is exist!";
                                }
                                else {
                                    document.getElementById('add-v').innerHTML = "";
                                    document.getElementById('add-s').innerHTML = "";
                                    document.getElementById('add-y').innerHTML = "";

                                    const disc = {
                                        virusId: virus,
                                        scientistId: scientist,
                                        year: parseInt(year, 10),
                                    };

                                    fetch(discov, {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(disc)
                                    })
                                        .then(response => response.json())
                                        .then(() => {
                                            getDisc();
                                            addVirTextbox.value = '';
                                            addSciTextbox.value = '';
                                            addYearTextbox.value = '';
                                        })
                                }
                            })
                    }
                })
        })
}

function deleteDisc(id) {
    fetch(`${discov}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getDisc())
        .catch(error => console.error('Unable to delete discovery.', error));
}

function displayEditForm(id) {
    const disc = arr.find(d => d.id === id);

    document.getElementById('edit-i').value = disc.id;
    document.getElementById('edit-v').value = disc.virus;
    document.getElementById('edit-s').value = disc.scientist;
    document.getElementById('edit-y').value = disc.year;
}

function updateDisc() {
    document.getElementById('ed-v').innerHTML = "";
    document.getElementById('ed-s').innerHTML = "";
    document.getElementById('ed-y').innerHTML = "";
    fetch(viruss)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === document.getElementById('edit-v').value.trim())
                    return data[i].id;
            }
        })
        .then(virus => {
            fetch(scientists)
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name === document.getElementById('edit-s').value.trim())
                            return data[i].id;
                    }
                })
                .then(scientist => {
                    const dId = document.getElementById('edit-i').value;
                    let year = document.getElementById('edit-y').value.trim();
                    let regex = /[1-9][0-9]+/;
                    if (virus == undefined || scientist == undefined || !regex.test(year) || year < 1000 || year > 2020) {
                        if (!regex.test(year) || year < 1000 || year > 2020) {
                            document.getElementById('ed-y').innerHTML = "Year is not correct!";
                        }
                        if (virus == undefined) {
                            document.getElementById('ed-v').innerHTML = "Virus is not correct!";
                        }
                        if (scientist == undefined) {
                            document.getElementById('ed-s').innerHTML = "Scientist is not correct!";
                        }
                    }
                    else {
                        fetch(discov)
                            .then(response => response.json())
                            .then(data => {
                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].virusId == virus && data[i].scientistId == scientist) {
                                        return true;
                                    }
                                }
                                return false;
                            })
                            .then(boole => {
                                if (boole) {
                                    document.getElementById('ed-v').innerHTML = "Discovery is exist!";
                                }
                                else {
                                    document.getElementById('ed-v').innerHTML = "";
                                    document.getElementById('ed-s').innerHTML = "";
                                    document.getElementById('ed-y').innerHTML = "";

                                    const disc = {
                                        virusId: dId,
                                        scientistId: scientist,
                                        year: parseInt(year, 10),
                                    };

                                    fetch(discov, {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(disc)
                                    })
                                }
                            })
                    }
                })
        })
}


function _displayDisc(data) {
    const tBody = document.getElementById('discs');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(disc => {
        fetch(viruss)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === disc.virusId)
                        return data[i].name;
                }
            })
            .then(virus => {
                fetch(scientists)
                    .then(response => response.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].id === disc.scientistId)
                                return data[i].name;
                        }
                    })
                    .then(scientist => {
                        let editButton = button.cloneNode(false);
                        editButton.innerText = 'Edit';
                        editButton.classList.add("btn-warning");
                        editButton.classList.add("btn");
                        editButton.setAttribute('onclick', `displayEditForm(${disc.id})`);

                        let deleteButton = button.cloneNode(false);
                        deleteButton.innerText = 'Delete';
                        deleteButton.classList.add("btn-danger");
                        deleteButton.classList.add("btn");
                        deleteButton.setAttribute('onclick', `deleteDisc(${disc.id})`);

                        let tr = tBody.insertRow();

                        let td1 = tr.insertCell(0);
                        let textNode = document.createTextNode(virus);
                        td1.appendChild(textNode);

                        let td2 = tr.insertCell(1);
                        let textNodeGenome = document.createTextNode(scientist);
                        td2.appendChild(textNodeGenome);

                        let td3 = tr.insertCell(2);
                        let textNodeOrganism = document.createTextNode(disc.year);
                        td3.appendChild(textNodeOrganism);

                        let td4 = tr.insertCell(3);
                        td4.appendChild(editButton);

                        let td5 = tr.insertCell(4);
                        td5.appendChild(deleteButton);
                    })
            })
    });

    arr = data;
}
