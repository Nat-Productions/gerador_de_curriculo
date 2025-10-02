function initializeUploadSection() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const messageArea = document.getElementById('messageArea');

    // Event listeners para upload de arquivo
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#3498db';
        uploadArea.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.backgroundColor = '';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#e0e0e0';
        uploadArea.style.backgroundColor = '';
        
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    // Função para processar o arquivo
    function handleFile(file) {
        if (file.type !== 'text/plain') {
            showMessage('Por favor, selecione um arquivo de texto (.txt).', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const content = e.target.result;
                const data = parseResumeContent(content);
                
                // Dispatch custom event with parsed data
                const event = new CustomEvent('resumeParsed', { detail: data });
                document.dispatchEvent(event);

                showMessage('Currículo carregado com sucesso!', 'success');
            } catch (error) {
                showMessage('Erro ao processar o arquivo. Verifique o formato.', 'error');
                console.error(error);
            }
        };
        reader.onerror = function() {
            showMessage('Erro ao ler o arquivo.', 'error');
        };
        reader.readAsText(file);
    }

    // Função para analisar o conteúdo do currículo
    function parseResumeContent(content) {
        const lines = content.split('\n');
        const data = {};

        lines.forEach(line => {
            if (line.trim() === '') return;
            
            const separatorIndex = line.indexOf(':');
            if (separatorIndex === -1) return;
            
            const key = line.substring(0, separatorIndex).trim().toLowerCase();
            const value = line.substring(separatorIndex + 1).trim();
            
            if (key && value) {
                data[key] = value;
            }
        });

        return data;
    }

    // Função para exibir mensagens
    function showMessage(message, type) {
        messageArea.innerHTML = `<div class="message ${type}">${message}</div>`;
        
        // Remover a mensagem após 5 segundos
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 5000);
    }
}