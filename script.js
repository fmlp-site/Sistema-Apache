document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Gerar um ID único para o candidato
    const idCandidato = `CANDIDATO-${Date.now()}`;

    // Coletar os dados do formulário
    const formData = new FormData(this);
    const data = {
        id: idCandidato,
        nomeCompleto: formData.get('nomeCompleto'),
        dataNascimento: formData.get('dataNascimento'),
        curso: formData.get('curso'),
        modalidade: formData.get('modalidade'),
        nomePai: formData.get('nomePai'),
        nomeMae: formData.get('nomeMae'),
        nomeIrmao: formData.get('nomeIrmao'),
        escola: formData.get('escola'),
        cpf: formData.get('cpf'),
        foto: formData.get('foto'),  // Para upload, pode precisar de lógica adicional
        historico: formData.get('historico') // Para upload, pode precisar de lógica adicional
    };

    // Enviar os dados para o RestDB.io
    const response = await fetch('https://YOUR_RESTDB_URL/rest/YOUR_COLLECTION_NAME', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'YOUR_API_KEY' // Coloque sua chave de API aqui
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Inscrição enviada com sucesso!');
        this.reset();
    } else {
        alert('Erro ao enviar a inscrição.');
    }
});
