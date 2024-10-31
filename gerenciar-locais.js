const RESTDB_API_KEY = '6720196ed0ee287fb492c579'; // Substitua pela sua chave de API do RestDB
const RESTDB_URL = 'https://vestibular-ccd4.restdb.io/rest/locais?max=2'; // URL do seu banco de dados

async function fetchLocais() {
    const response = await fetch(RESTDB_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': RESTDB_API_KEY,
        },
    });
    const locais = await response.json();
    return locais;
}

async function displayLocais() {
    const locais = await fetchLocais();
    const tableBody = document.querySelector('#locais-table tbody');
    
    locais.forEach(local => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${local.nome}</td>
            <td>${local.numero}</td>
            <td>${local.curso}</td>
            <td>
                <button onclick="editLocal('${local._id}')">Editar</button>
                <button onclick="deleteLocal('${local._id}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function addLocal(event) {
    event.preventDefault(); // Previne o envio do formulário
    
    const nome = document.getElementById('nome-local').value;
    const numero = document.getElementById('numero-sala').value;
    const curso = document.getElementById('curso-candidato').value;

    await fetch(RESTDB_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': RESTDB_API_KEY,
        },
        body: JSON.stringify({ nome, numero, curso }),
    });

    document.getElementById('local-form').reset();
    displayLocais(); // Atualiza a lista de locais
}

async function editLocal(id) {
    const nome = prompt("Digite o novo nome do local:");
    const numero = prompt("Digite o novo número da sala:");
    const curso = prompt("Digite o novo curso do candidato:");

    await fetch(`${RESTDB_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': RESTDB_API_KEY,
        },
        body: JSON.stringify({ nome, numero, curso }),
    });

    location.reload();
}

async function deleteLocal(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este local?");
    if (confirmDelete) {
        await fetch(`${RESTDB_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': RESTDB_API_KEY,
            },
        });
        location.reload();
    }
}

// Adiciona evento de envio ao formulário
document.getElementById('local-form').addEventListener('submit', addLocal);

// Chama a função para exibir locais ao carregar a página
displayLocais();
