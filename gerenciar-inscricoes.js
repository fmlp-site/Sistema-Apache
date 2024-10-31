const apiKey = '6720196ed0ee287fb492c579';
const inscricoesUrl = 'https://vestibular-ccd4.restdb.io/rest/inscricoes?max=2';
const locaisUrl = 'https://vestibular-ccd4.restdb.io/rest/locais';

// Função para buscar inscrições
async function fetchInscricoes() {
    const response = await fetch(inscricoesUrl, {
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        }
    });
    const data = await response.json();
    displayInscricoes(data);
}

// Função para exibir inscrições na tabela
function displayInscricoes(inscricoes) {
    const tbody = document.querySelector('#inscricoes-table tbody');
    tbody.innerHTML = '';
    inscricoes.forEach(inscricao => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${inscricao.nome}</td>
            <td>${inscricao._id}</td>
            <td>
                <select onchange="updateStatus('${inscricao._id}', this.value)">
                    <option value="Homologada" ${inscricao.status === 'Homologada' ? 'selected' : ''}>Homologada</option>
                    <option value="Não Homologada" ${inscricao.status === 'Não Homologada' ? 'selected' : ''}>Não Homologada</option>
                    <option value="Aguardando" ${inscricao.status === 'Aguardando' ? 'selected' : ''}>Aguardando</option>
                </select>
            </td>
            <td>
                <select onchange="alocarLocal('${inscricao._id}', this.value)">
                    <option value="">Selecionar Local</option>
                    ${localOptions().join('')}
                </select>
            </td>
            <td>
                <button onclick="deleteInscricao('${inscricao._id}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para criar opções de locais
async function localOptions() {
    const response = await fetch(locaisUrl, {
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        }
    });
    const locais = await response.json();
    return locais.map(local => `<option value="${local._id}">${local.nome} - Sala ${local.numero_sala}</option>`);
}

// Função para atualizar o status da inscrição
async function updateStatus(id, status) {
    await fetch(`${inscricoesUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        },
        body: JSON.stringify({ status })
    });
    fetchInscricoes(); // Atualiza a lista após a alteração
}

// Função para alocar um local de prova
async function alocarLocal(id, localId) {
    if (localId) {
        await fetch(`${inscricoesUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': apiKey
            },
            body: JSON.stringify({ local_prova: localId })
        });
        fetchInscricoes(); // Atualiza a lista após a alocação
    }
}

// Função para excluir uma inscrição
async function deleteInscricao(id) {
    await fetch(`${inscricoesUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'x-apikey': apiKey
        }
    });
    fetchInscricoes(); // Atualiza a lista após a exclusão
}

// Inicializa a página
fetchInscricoes();
