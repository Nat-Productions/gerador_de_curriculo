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
                const container = document.getElementById('education-container');
                const newItem = document.createElement('div');
                newItem.className = 'multi-item';
                newItem.innerHTML = `
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
                container.appendChild(newItem);
                
                // Adicionar evento de remoção
                newItem.querySelector('.remove-btn').addEventListener('click', () => {
                    newItem.remove();
                });
            });
            
            // Adicionar múltiplos idiomas
            document.getElementById('add-language').addEventListener('click', () => {
                const container = document.getElementById('languages-container');
                const newItem = document.createElement('div');
                newItem.className = 'multi-item';
                newItem.innerHTML = `
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
                container.appendChild(newItem);
                
                // Adicionar evento de remoção
                newItem.querySelector('.remove-btn').addEventListener('click', () => {
                    newItem.remove();
                });
            });
            
            // Adicionar múltiplos cursos
            document.getElementById('add-course').addEventListener('click', () => {
                const container = document.getElementById('courses-container');
                const newItem = document.createElement('div');
                newItem.className = 'multi-item';
                newItem.innerHTML = `
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
                container.appendChild(newItem);
                
                // Adicionar evento de remoção
                newItem.querySelector('.remove-btn').addEventListener('click', () => {
                    newItem.remove();
                });
            });
            
            // Adicionar múltiplos projetos
            document.getElementById('add-project').addEventListener('click', () => {
                const container = document.getElementById('projects-container');
                const newItem = document.createElement('div');
                newItem.className = 'multi-item';
                newItem.innerHTML = `
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
                container.appendChild(newItem);
                
                // Adicionar evento de remoção
                newItem.querySelector('.remove-btn').addEventListener('click', () => {
                    newItem.remove();
                });
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
        });