const locaisUrl = 'https://vestibular-ccd4.restdb.io/rest/locais';

// Função para buscar locais
async function fetchLocais() {
    const response = await fetch(locaisUrl, {
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        }
    });
    const data = await response.json();
    displayLocais(data);
}

// Função para exibir locais na tabela
function displayLocais(locais) {
    const tbody = document.querySelector('#locais-table tbody');
    tbody.innerHTML = '';
    locais.forEach(local => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${local.nome}</td>
            <td>${local.numero_sala}</td>
            <td>
                <button onclick="editLocal('${local._id}')">Editar</button>
                <button onclick="deleteLocal('${local._id}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para adicionar local
async function addLocal(event) {
    event.preventDefault();
    const nome = document.getElementById('local-nome').value;
    const numero_sala = document.getElementById('numero-sala').value;

    await fetch(locaisUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        },
        body: JSON.stringify({ nome,numero_sala })
    });
    document.getElementById('local-form').reset(); // Limpa o formulário após a adição
    fetchLocais(); // Atualiza a lista após a adição
}

// Função para editar local
async function editLocal(id) {
    const localNome = prompt("Digite o novo nome do local:");
    const numeroSala = prompt("Digite o novo número da sala:");

    if (localNome && numeroSala) {
        await fetch(`${locaisUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey
            },
            body: JSON.stringify({ nome: localNome, numero_sala: numeroSala })
        });
        fetchLocais(); // Atualiza a lista após a edição
    }
}

// Função para excluir local
async function deleteLocal(id) {
    await fetch(`${locaisUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'x-apikey': apiKey
        }
    });
    fetchLocais(); // Atualiza a lista após a exclusão
}

// Inicializa a página
fetchLocais();
