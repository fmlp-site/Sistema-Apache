document.addEventListener('DOMContentLoaded', async function () {
    const idCandidato = localStorage.getItem('idCandidato');

    // Se o ID não estiver presente, redirecionar para a página de login
    if (!idCandidato) {
        window.location.href = 'login.html';
    }

    // Realizar uma solicitação para buscar os dados do candidato no RestDB.io
    const response = await fetch(`https://vestibular-ccd4.restdb.io/rest/inscricoes?max=2?q={"id":"${idCandidato}"}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': '6720196ed0ee287fb492c579' // Substitua pela sua chave de API
        }
    });

    if (response.ok) {
        const candidates = await response.json();

        // Verifique se o candidato foi encontrado
        if (candidates.length > 0) {
            const candidate = candidates[0];
            document.getElementById('candidateInfo').innerHTML = `
                <p><strong>ID:</strong> ${candidate.id}</p>
                <p><strong>Nome:</strong> ${candidate.nomeCompleto}</p>
                <p><strong>Data de Nascimento:</strong> ${candidate.dataNascimento}</p>
                <p><strong>Curso:</strong> ${candidate.curso}</p>
                <p><strong>Modalidade:</strong> ${candidate.modalidade}</p>
                <p><strong>Nome do Pai:</strong> ${candidate.nomePai}</p>
                <p><strong>Nome da Mãe:</strong> ${candidate.nomeMae}</p>
                <p><strong>Nome dos Irmãos:</strong> ${candidate.nomeIrmao}</p>
                <p><strong>Escola:</strong> ${candidate.escola}</p>
                <p><strong>CPF:</strong> ${candidate.cpf}</p>
            `;
        } else {
            document.getElementById('candidateInfo').textContent = 'Candidato não encontrado.';
        }
    } else {
        document.getElementById('candidateInfo').textContent = 'Erro ao buscar informações do candidato.';
    }

    // Logout
    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('idCandidato');
        window.location.href = 'login.html'; // Redirecionar para a página de login
    });
});
