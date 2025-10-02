document.addEventListener('DOMContentLoaded', function() {
    // Controles de abas
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Ativar aba clicada
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Formatação do telefone
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', () => {
        let value = phoneInput.value.replace(/\D/g, '');
        value = value.substring(0, 13);

        if (value.length > 11) {
            value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
        } else if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{2})(\d{4})/, '+$1 ($2) $3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{2})/, '+$1 ($2)');
        } else if (value.length > 0) {
            value = value.replace(/(\d{2})/, '+$1');
        }

        phoneInput.value = value;
    });
    
    // Adicionar múltiplos itens de educação
    document.getElementById('add-education').addEventListener('click', () => {
        addMultiItem('education-container', createEducationItemHTML());
    });
    
    // Adicionar múltiplos idiomas
    document.getElementById('add-language').addEventListener('click', () => {
        addMultiItem('languages-container', createLanguageItemHTML());
    });
    
    // Adicionar múltiplos cursos
    document.getElementById('add-course').addEventListener('click', () => {
        addMultiItem('courses-container', createCourseItemHTML());
    });
    
    // Adicionar múltiplos projetos
    document.getElementById('add-project').addEventListener('click', () => {
        addMultiItem('projects-container', createProjectItemHTML());
    });

    // Adicionar multiplas experiencias
    document.getElementById('add-experiencia').addEventListener('click', () => {
        addMultiItem('experiencia-container', createExperienceItemHTML());
    });
    
    // Remover itens existentes
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
    
    // Gerar preview do currículo
    document.getElementById('generate-preview').addEventListener('click', generateResume);
    
    // Download PDF
    document.getElementById('download-pdf').addEventListener('click', downloadPDF);
    
    // Download TXT
    document.getElementById('download-txt').addEventListener('click', downloadTXT);

    // --- Upload Section Logic ---
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const messageArea = document.getElementById('messageArea');

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
                fillForm(data);
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

    function parseResumeContent(content) {
        const lines = content.split('\n');
        const data = {
            experiencia: [],
            formacao: []
        };

        lines.forEach(line => {
            if (line.trim() === '') return;
            
            const separatorIndex = line.indexOf(':');
            if (separatorIndex === -1) return;
            
            const key = line.substring(0, separatorIndex).trim().toLowerCase();
            let value = line.substring(separatorIndex + 1).trim();
            
            if (key && value) {
                if (key === 'experiência') {
                    const experiences = value.split(';').map(exp => exp.trim());
                    experiences.forEach(exp => {
                        const parts = exp.split('-').map(p => p.trim());
                        if(parts.length >= 4) {
                            data.experiencia.push({
                                empresa: parts[0],
                                funcao: parts[1],
                                periodo: parts[2],
                                descricao: parts.slice(3).join('-').trim()
                            });
                        }
                    });
                } else if (key === 'formação') {
                    const educations = value.split(';').map(edu => edu.trim());
                    educations.forEach(edu => {
                        const parts = edu.split('-').map(p => p.trim());
                        if(parts.length >= 3) {
                            data.formacao.push({
                                institution: parts[0],
                                course: parts[1],
                                period: parts.slice(2).join('-').trim()
                            });
                        }
                    });
                } else {
                    data[key] = value;
                }
            }
        });

        return data;
    }

    function fillForm(data) {
        // Simple fields
        if(data.nome) document.getElementById('name').value = data.nome;
        if(data.telefone) document.getElementById('phone').value = data.telefone;
        if(data.email) document.getElementById('email').value = data.email;
        if(data.endereço) document.getElementById('location').value = data.endereço;
        if(data.resumo) document.getElementById('objective').value = data.resumo;
        if(data.habilidades) document.getElementById('languages').value = data.habilidades;

        // Experience
        const experienceContainer = document.getElementById('experiencia-container');
        experienceContainer.innerHTML = ''; // Clear existing items
        data.experiencia.forEach(exp => {
            const newItem = addMultiItem('experiencia-container', createExperienceItemHTML());
            newItem.querySelector('.experiencia-empresa').value = exp.empresa || '';
            newItem.querySelector('.experiencia-funcao').value = exp.funcao || '';
            newItem.querySelector('.experiencia-periodo').value = exp.periodo || '';
            newItem.querySelector('.experiencia-descricao').value = exp.descricao || '';
        });

        // Education
        const educationContainer = document.getElementById('education-container');
        educationContainer.innerHTML = ''; // Clear existing items
        data.formacao.forEach(edu => {
            const newItem = addMultiItem('education-container', createEducationItemHTML());
            newItem.querySelector('.education-institution').value = edu.institution || '';
            newItem.querySelector('.education-course').value = edu.course || '';
            newItem.querySelector('.education-period').value = edu.period || '';
        });

        generateResume();
    }

    function showMessage(message, type) {
        messageArea.innerHTML = `<div class="message ${type}">${message}</div>`;
        
        setTimeout(() => {
            messageArea.innerHTML = '';
        }, 5000);
    }

    function addMultiItem(containerId, html) {
        const container = document.getElementById(containerId);
        const newItem = document.createElement('div');
        newItem.className = 'multi-item';
        newItem.innerHTML = html;
        container.appendChild(newItem);
        
        newItem.querySelector('.remove-btn').addEventListener('click', () => {
            newItem.remove();
        });
        return newItem;
    }

    function createEducationItemHTML() {
        return `
            <div class="form-group">
                <label>Curso</label>
                <input type="text" class="education-course" required>
            </div>
            <div class="form-group">
                <label>Instituição</label>
                <input type="text" class="education-institution" required>
            </div>
            <div class="form-group">
                <label>Período</label>
                <input type="text" class="education-period" placeholder="Ex: 2023 - Presente" required>
            </div>
            <button type="button" class="remove-btn">Remover</button>
        `;
    }

    function createExperienceItemHTML() {
        return `
            <div class="form-group">
                <label>Tipo de Vínculo</label>
                <select class="experiencia-tipo" required>
                    <option value="">Selecione o tipo</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Freelance">Freelance</option>
                    <option value="ONG">ONG</option>
                </select>
            </div>
            <div class="form-group">
                <label>Função</label>
                <input type="text" class="experiencia-funcao" required>
            </div>
            <div class="form-group">
                <label>Empresa/Projeto</label>
                <input type="text" class="experiencia-empresa" required>
            </div>
            <div class="form-group">
                <label>Período</label>
                <input type="text" class="experiencia-periodo" placeholder="Ex: 2022 - 2023" required>
            </div>
            <div class="form-group">
                <label>Descrição das Atividades</label>
                <textarea class="experiencia-descricao" required></textarea>
            </div>
            <button type="button" class="remove-btn">Remover</button>
        `;
    }

    function createLanguageItemHTML() {
        return `
            <div class="form-group">
                <label>Idioma</label>
                <select class="language-name" required>
                    <option value="">Selecione um idioma</option>
                    <optgroup label="Línguas Faladas">
                        <option value="pt">Português</option>
                        <option value="en">Inglês</option>
                        <option value="es">Espanhol</option>
                        <option value="fr">Francês</option>
                        <option value="de">Alemão</option>
                        <option value="zh">Chinês</option>
                        <option value="ja">Japonês</option>
                        <option value="ar">Árabe</option>
                        <option value="hi">Hindi</option>
                        <option value="ru">Russo</option>
                        <option value="bn">Bengali</option>
                        <option value="pa">Punjabi</option>
                        <option value="jv">Javanês</option>
                        <option value="ko">Coreano</option>
                        <option value="id">Indonésio</option>
                        <option value="te">Telugu</option>
                        <option value="tr">Turco</option>
                        <option value="vi">Vietnamita</option>
                        <option value="mr">Marathi</option>
                        <option value="ta">Tâmil</option>
                        <option value="it">Italiano</option>
                        <option value="nl">Holandês</option>
                        <option value="pl">Polonês</option>
                        <option value="uk">Ucraniano</option>
                    </optgroup>
                    <optgroup label="Línguas de Sinais">
                        <option value="ase">Língua de Sinais Americana (ASL)</option>
                        <option value="bfi">Língua de Sinais Britânica (BSL)</option>
                        <option value="fsl">Língua de Sinais Francesa (LSF)</option>
                        <option value="gsg">Língua de Sinais Alemã (DGS)</option>
                        <option value="jsl">Língua de Sinais Japonesa (JSL)</option>
                        <option value="csl">Língua de Sinais Chinesa (CSL)</option>
                        <option value="ssp">Língua de Sinais Espanhola (LSE)</option>
                        <option value="rsl">Língua de Sinais Russa (RSL)</option>
                        <option value="ins">Língua de Sinais Indiana (ISL)</option>
                        <option value="bfk">Língua de Sinais Ban Khor</option>
                        <option value="bog">Língua de Sinais de Bamako</option>
                        <option value="bqn">Língua de Sinais Búlgara</option>
                        <option value="dse">Língua de Sinais Holandesa</option>
                        <option value="sqk">Língua de Sinais Albanesa</option>
                        <option value="sgn">Línguas de Sinais</option>
                    </optgroup>
                </select>
            </div>
            <div class="form-group">
                <label>Nível de Proficiência</label>
                <select class="language-level" required>
                    <option value="">Selecione o nível</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                    <option value="Fluente">Fluente</option>
                    <option value="Nativo">Nativo</option>
                </select>
            </div>
            <button type="button" class="remove-btn">Remover</button>
        `;
    }

    function createCourseItemHTML() {
        return `
            <div class="form-group">
                <label>Nome do Curso</label>
                <input type="text" class="course-name" required>
            </div>
            <div class="form-group">
                <label>Instituição</label>
                <input type="text" class="course-institution" required>
            </div>
            <div class="form-group">
                <label>Período/Carga Horária</label>
                <input type="text" class="course-period" placeholder="Ex: 2025 - 12h" required>
            </div>
            <div class="form-group">
                <label>Descrição (opcional)</label>
                <textarea class="course-description"></textarea>
            </div>
            <button type="button" class="remove-btn">Remover</button>
        `;
    }

    function createProjectItemHTML() {
        return `
            <div class="form-group">
                <label>Nome do Projeto</label>
                <input type="text" class="project-name" required>
            </div>
            <div class="form-group">
                <label>Descrição</label>
                <textarea class="project-description" required></textarea>
            </div>
            <div class="form-group">
                <label>Link (opcional)</label>
                <input type="url" class="project-link">
            </div>
            <button type="button" class="remove-btn">Remover</button>
        `;
    }
});
