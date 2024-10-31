const RESTDB_API_KEY = '6720196ed0ee287fb492c579'; // Substitua pela sua chave de API do RestDB
const RESTDB_URL = 'https://vestibular-ccd4.restdb.io/rest/inscricoes?max=2'; // URL do seu banco de dados

async function fetchInscricoes() {
    const response = await fetch(RESTDB_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': RESTDB_API_KEY,
        },
    });
    const inscricoes = await response.json();
    return inscricoes;
}

async function displayInscricoes() {
    const inscricoes = await fetchInscricoes();
    const tableBody = document.querySelector('#inscricoes-table tbody');
    
    inscricoes.forEach(inscricao => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${inscricao.nome}</td>
            <td>${inscricao._id}</td>
            <td>${inscricao.status}</td>
            <td>
                <button onclick="editInscricao('${inscricao._id}')">Editar</button>
                <button onclick="deleteInscricao('${inscricao._id}')">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function editInscricao(id) {
    const status = prompt("Digite o novo status para a inscrição:");
    if (status) {
        await fetch(`${RESTDB_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': RESTDB_API_KEY,
            },
            body: JSON.stringify({ status }),
        });
        location.reload();
    }
}

async function deleteInscricao(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir esta inscrição?");
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

// Chama a função para exibir inscrições ao carregar a página
displayInscricoes();
