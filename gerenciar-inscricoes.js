const API_URL = 'https://vestibular-ccd4.restdb.io/rest/inscricoes?max=2'; // Substitua pelo seu ID do RestDB
const API_KEY = '6720196ed0ee287fb492c579'; // Substitua pela sua chave de API do RestDB

async function fetchInscricoes() {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY,
                'Cache-Control': 'no-cache'
            }
        });

        const inscricoes = response.data;
        const inscricaoBody = document.getElementById('inscricao-body');

        inscricoes.forEach(inscricao => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${inscricao._id}</td>
                <td>${inscricao.nome}</td>
                <td>
                    <select id="status-${inscricao._id}">
                        <option value="Em andamento" ${inscricao.status === 'Em andamento' ? 'selected' : ''}>Em andamento</option>
                        <option value="Homologada" ${inscricao.status === 'Homologada' ? 'selected' : ''}>Homologada</option>
                        <option value="Negada" ${inscricao.status === 'Negada' ? 'selected' : ''}>Negada</option>
                    </select>
                </td>
                <td>
                    <button onclick="updateStatus('${inscricao._id}')">Atualizar</button>
                </td>
            `;
            inscricaoBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar inscrições:', error);
    }
}

async function updateStatus(id) {
    const statusSelect = document.getElementById(`status-${id}`);
    const newStatus = statusSelect.value;

    try {
        await axios.patch(`${API_URL}/${id}`, { status: newStatus }, {
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': API_KEY
            }
        });
        alert('Status atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        alert('Erro ao atualizar status.');
    }
}

// Chama a função para buscar as inscrições quando a página é carregada
fetchInscricoes();
