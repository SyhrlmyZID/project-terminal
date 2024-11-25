document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');

    // Menambahkan prompt awal
    addCommandLine();

    // Fungsi untuk membuat baris input baru
    function addCommandLine() {
        const commandLine = document.createElement('div');
        commandLine.className = 'flex items-center space-x-2';

        const prompt = `
            <span class="text-red-500 font-bold">syhrlmyzid@kali</span>
            <span class="text-gray-100 font-bold">:</span>
            <span class="text-blue-400 font-bold">~</span>
            <span class="text-gray-100 font-bold">#</span>
        `;
        commandLine.innerHTML = prompt;

        const input = document.createElement('input');
        input.type = 'text';
        input.autocomplete = 'off';
        input.autofocus = true;
        input.className =
            'w-full bg-transparent border-none outline-none caret-green-500 text-gray-300 ml-2';

        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const command = input.value.trim();
                if (command) {
                    // Menambahkan output berdasarkan command
                    const response = processCommand(command);
                    if (response) addOutput(response);
                    input.disabled = true; // Mematikan input lama
                    addCommandLine(); // Menambahkan input baru
                }
            }
        });

        commandLine.appendChild(input);
        terminal.appendChild(commandLine);
        input.focus();
        terminal.scrollTop = terminal.scrollHeight; // Scroll otomatis ke bawah
    }

    // Fungsi untuk menambahkan output
    function addOutput(response) {
        const output = document.createElement('div');
        output.className = 'text-gray-400';

        // Tambahkan hanya respons tanpa mencetak ulang command input
        output.innerHTML = response;
        terminal.appendChild(output);
        terminal.scrollTop = terminal.scrollHeight; // Scroll otomatis ke bawah
    }

    // Fungsi untuk memproses perintah
    function processCommand(command) {
        const cmd = command.toLowerCase();

        switch (cmd) {
            case 'whois':
                return 'Hey there! My name is .... , and I am a developer!!!';
            case 'about':
                return 'This is a Terminal Website which functions like a terminal with its own commands.';
            case 'help':
                return `
                    <span>Help menu:</span>
                    <ul class="list-disc pl-5">
                        <li>whois</li>
                        <li>help</li>
                        <li>about</li>
                        <li>contact</li>
                        <li>clear</li>
                        <li>echo</li>
                        <li>problem</li>
                        <li>exit</li>
                    </ul>
                `;
            case 'contact':
                return 'You can reach me via email at "info@gmail.com".';
            case 'problem':
                return 'If you cannot see the input field, that is fine. Keep on writing.';
            case 'clear':
                clearTerminal();
                return '';
            case 'exit':
                location.reload(); // Me-reload halaman ketika perintah 'exit' dimasukkan
                return '';
            default:
                if (cmd.startsWith('echo ')) {
                    return cmd.substring(5); // Echo back the text after 'echo '
                }
                return `<span class="text-red-500">Command not found:</span> ${command}`;
        }
    }

    // Fungsi untuk membersihkan terminal
    function clearTerminal() {
        terminal.innerHTML = '';
    }
});
