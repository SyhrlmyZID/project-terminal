document.addEventListener('DOMContentLoaded', function () {
    const terminal = document.getElementById('terminal');
    const commandHistory = [];
    let historyIndex = -1;

    addCommandLine();

    // Event global untuk menangkap penekanan tombol
    document.addEventListener('keydown', function (event) {
        const activeInput = document.activeElement;
        if (activeInput.tagName !== 'INPUT') {
            const inputs = terminal.querySelectorAll('input');
            if (inputs.length > 0) {
                inputs[inputs.length - 1].focus();
            }
        }
    });

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
                    commandHistory.push(command);
                    historyIndex = commandHistory.length; // Reset index
                    const response = processCommand(command);
                    if (response) addAnimatedOutput(response);
                    input.disabled = true;
                    addCommandLine();
                }
            } else if (event.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex];
                }
            } else if (event.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    input.value = '';
                }
            }
        });

        commandLine.appendChild(input);
        terminal.appendChild(commandLine);
        input.focus();
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Function to animate output text
    function addAnimatedOutput(response) {
        const output = document.createElement('div');
        output.className = 'text-gray-400 whitespace-pre-wrap';

        terminal.appendChild(output);
        terminal.scrollTop = terminal.scrollHeight;

        let currentIndex = 0;
        const characters = response.split('');
        const typingInterval = 10; // Adjust speed of typing animation

        function typeCharacter() {
            if (currentIndex < characters.length) {
                output.innerHTML += characters[currentIndex++];
                terminal.scrollTop = terminal.scrollHeight; // Auto scroll
                setTimeout(typeCharacter, typingInterval);
            }
        }

        typeCharacter();
    }

    function processCommand(command) {
        const cmd = command.toLowerCase();

        switch (cmd) {
            case 'about':
                return `
Halo! Perkenalkan nama saya syahrul, saya seorang software engineering
dan untuk bidang yang di perdalam adalah sebagai web developer, prompt engineer, dan cyber security.`;
            case 'help':
                return `
Help Menu:
- help          : Menampilkan menu bantuan
- contact       : Informasi kontak
- socialmedia   : Tautan ke media sosial saya
- skills        : Skill yang saya kuasai
- clear         : Membersihkan layar terminal
- exit          : Menutup terminal`;
            case 'contact':
                return `
Jika ingin bertanya atau bisnis lain bisa hubungi saya:
- Email: syhrlmyz.id@gmail.com`;
            case 'socialmedia':
                return `
Sosial Media Saya:
- Instagram: [Click Disini](#)
- Youtube: [Click Disini](#)
- Github: [Click Disini](#)`;
            case 'skills':
                return `
Berikut skill yang saya kuasai:
- HTML5
- CSS3
- JavaScript
- Java
- Python
- MySQL
- Lua`;
            case 'clear':
                clearTerminal();
                return '';
            case 'exit':
                location.reload();
                return '';
            default:
                return `Perintah "${cmd}" tidak dikenali. Ketik "help" untuk daftar perintah.`;
        }
    }

    function clearTerminal() {
        terminal.innerHTML = '';
    }
});
