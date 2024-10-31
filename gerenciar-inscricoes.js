document.getElementById("add-inscricao").addEventListener("click", function() {
    // Lógica para adicionar uma nova inscrição
    const newInscricao = {
        id: Date.now(), // Gerar um ID único usando timestamp
        nome: prompt("Digite o nome do candidato:"),
        status: "Aguardando"
    };
    addInscricaoToTable(newInscricao);
});

function addInscricaoToTable(inscricao) {
    const tableBody = document.querySelector("#inscricoes-table tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${inscricao.id}</td>
        <td>${inscricao.nome}</td>
        <td>${inscricao.status}</td>
        <td>
            <button onclick="editInscricao(${inscricao.id})">Editar</button>
            <button onclick="deleteInscricao(${inscricao.id})">Excluir</button>
        </td>
    `;
    tableBody.appendChild(row);
}

function editInscricao(id) {
    // Lógica para editar a inscrição
    const newStatus = prompt("Digite o novo status:");
    const row = document.querySelector(`#inscricoes-table tr:nth-child(${id})`);
    row.cells[2].textContent = newStatus;
}

function deleteInscricao(id) {
    const row = document.querySelector(`#inscricoes-table tr:nth-child(${id})`);
    row.remove();
}
