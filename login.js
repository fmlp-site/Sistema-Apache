document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const idCandidato = document.getElementById('idCandidato').value;

    // Realizar uma solicitação para buscar os dados do candidato no RestDB.io
    const response = await fetch(`https://YOUR_RESTDB_URL/rest/YOUR_COLLECTION_NAME?q={"id":"${idCandidato}"}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'YOUR_API_KEY' // Substitua pela sua chave de API
        }
    });

    if (response.ok) {
        const candidates = await response.json();

        // Verifique se o candidato foi encontrado
        if (candidates.length > 0) {
            // Redirecionar para a página inicial do candidato
            localStorage.setItem('idCandidato', idCandidato); // Armazenar o ID no armazenamento local
            window.location.href = 'candidato.html'; // Redirecionar para a página inicial do candidato
        } else {
            document.getElementById('error').textContent = 'ID do candidato não encontrado.';
        }
    } else {
        document.getElementById('error').textContent = 'Erro ao realizar o login.';
    }
});
