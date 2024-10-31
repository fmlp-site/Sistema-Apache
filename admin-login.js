document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtendo os valores dos campos de entrada
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Verificando as credenciais
    if (username === "admin" && password === "123") {
        // Redirecionar para o portal do administrador
        window.location.href = "admin-portal.html"; // Crie esta página
    } else {
        // Exibir mensagem de erro
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Usuário ou senha incorretos.";
        errorMessage.style.display = "block";
    }
});
