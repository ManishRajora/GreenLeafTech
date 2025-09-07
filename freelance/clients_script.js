function showPasswordPrompt(client) {
    const password = prompt('Enter password to view apps for ' + client.replace('client', 'Client '));
    if (!password) return;
    // Example passwords, replace with secure check or backend validation
    const passwords = {
        clientA: '@deveshKumar98'
    };
    if (password === passwords[client]) {
        window.location.href = `apps_${client}.html`;
    } else {
        alert('Incorrect password!');
    }
}
