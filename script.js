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
            
            function generateResume() {
                const name = document.getElementById('name').value || 'Seu Nome';
                const phone = document.getElementById('phone').value || '(00) 0 0000-0000';
                const email = document.getElementById('email').value || 'seu.email@exemplo.com';
                const location = document.getElementById('location').value || 'Sua Cidade - Estado';
                const github = document.getElementById('github').value;
                const linkedin = document.getElementById('linkedin').value;
                const objective = document.getElementById('objective').value || 'Seu objetivo profissional';
                
                // Coletar formações
                const educationItems = [];
                document.querySelectorAll('#education-container .multi-item').forEach(item => {
                    educationItems.push({
                        course: item.querySelector('.education-course').value,
                        institution: item.querySelector('.education-institution').value,
                        period: item.querySelector('.education-period').value
                    });
                });
                
                // Coletar habilidades
                const languages = document.getElementById('languages').value;
                const tools = document.getElementById('tools').value;
                const knowledge = document.getElementById('knowledge').value;
                
                // Coletar idiomas
                const languageItems = [];
                document.querySelectorAll('#languages-container .multi-item').forEach(item => {
                    languageItems.push({
                        name: item.querySelector('.language-name').value,
                        level: item.querySelector('.language-level').value
                    });
                });
                
                // Coletar cursos
                const courseItems = [];
                document.querySelectorAll('#courses-container .multi-item').forEach(item => {
                    courseItems.push({
                        name: item.querySelector('.course-name').value,
                        institution: item.querySelector('.course-institution').value,
                        period: item.querySelector('.course-period').value,
                        description: item.querySelector('.course-description').value
                    });
                });
                
                // Coletar projetos
                const projectItems = [];
                document.querySelectorAll('#projects-container .multi-item').forEach(item => {
                    projectItems.push({
                        name: item.querySelector('.project-name').value,
                        description: item.querySelector('.project-description').value,
                        link: item.querySelector('.project-link').value
                    });
                });
                
                // Construir HTML do currículo
                let resumeHTML = `
                    <div class="resume-header">
                        <h1>${name}</h1>
                        <div class="resume-contact">
                            ${phone} | ${email} | ${location}
                            ${github ? `| GitHub: ${github}` : ''}
                            ${linkedin ? `| LinkedIn: ${linkedin}` : ''}
                        </div>
                    </div>
                    
                    <div class="resume-section">
                        <h2>Objetivo</h2>
                        <p>${objective}</p>
                    </div>
                `;
                
                // Adicionar formação acadêmica
                if (educationItems.length > 0) {
                    resumeHTML += `<div class="resume-section"><h2>Formação Acadêmica</h2>`;
                    educationItems.forEach(edu => {
                        resumeHTML += `
                            <div class="resume-item">
                                <h3>${edu.course}</h3>
                                <div class="date">${edu.institution} - ${edu.period}</div>
                            </div>
                        `;
                    });
                    resumeHTML += `</div>`;
                }
                
                // Adicionar habilidades
                if (languages || tools || knowledge) {
                    resumeHTML += `<div class="resume-section"><h2>Habilidades</h2>`;
                    
                    if (languages) {
                        resumeHTML += `
                            <div class="resume-item">
                                <h3>Linguagens</h3>
                                <p>${languages}</p>
                            </div>
                        `;
                    }
                    
                    if (tools) {
                        resumeHTML += `
                            <div class="resume-item">
                                <h3>Ferramentas</h3>
                                <p>${tools}</p>
                            </div>
                        `;
                    }
                    
                    if (knowledge) {
                        resumeHTML += `
                            <div class="resume-item">
                                <h3>Conhecimentos</h3>
                                <p>${knowledge}</p>
                            </div>
                        `;
                    }
                    
                    resumeHTML += `</div>`;
                }
                
                // Adicionar idiomas
                if (languageItems.length > 0) {
                    resumeHTML += `<div class="resume-section"><h2>Idiomas</h2>`;
                    languageItems.forEach(lang => {
                        resumeHTML += `
                            <div class="resume-item">
                                <h3>${lang.name} - ${lang.level}</h3>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${getProficiencyWidth(lang.level)}%"></div>
                                </div>
                            </div>
                        `;
                    });
                    resumeHTML += `</div>`;
                }
                
                // Adicionar cursos
                if (courseItems.length > 0) {
                    resumeHTML += `<div class="resume-section"><h2>Cursos Livres</h2>`;
                    courseItems.forEach(course => {
                        resumeHTML += `
                            <div class="resume-item">
                                <h3>${course.name}</h3>
                                <div class="date">${course.institution} - ${course.period}</div>
                                ${course.description ? `<p>${course.description}</p>` : ''}
                            </div>
                        `;
                    });
                    resumeHTML += `</div>`;
                }
                
                // Adicionar projetos
                if (projectItems.length > 0) {
                    resumeHTML += `<div class="resume-section"><h2>Projetos</h2>`;
                    projectItems.forEach(project => {
                        resumeHTML += `
                            <div class="resume-item">
                                <h3>${project.name}</h3>
                                <p>${project.description}</p>
                                ${project.link ? `<p>Link: <a href="${project.link}">${project.link}</a></p>` : ''}
                            </div>
                        `;
                    });
                    resumeHTML += `</div>`;
                }
                
                // Atualizar preview
                document.getElementById('resume-preview').innerHTML = resumeHTML;
                document.getElementById('download-pdf').classList.remove('hidden');
                document.getElementById('download-txt').classList.remove('hidden');
            }
            
            function getProficiencyWidth(level) {
                switch(level) {
                    case 'Básico': return 25;
                    case 'Intermediário': return 50;
                    case 'Avançado': return 75;
                    case 'Fluente': return 90;
                    case 'Nativo': return 100;
                    default: return 0;
                }
            }
            
            function downloadPDF() {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'mm', 'a4');
                
                // Coletar dados do formulário
                const name = document.getElementById('name').value || 'Seu Nome';
                const phone = document.getElementById('phone').value || '(00) 0 0000-0000';
                const email = document.getElementById('email').value || 'seu.email@exemplo.com';
                const location = document.getElementById('location').value || 'Sua Cidade - Estado';
                const github = document.getElementById('github').value;
                const linkedin = document.getElementById('linkedin').value;
                const objective = document.getElementById('objective').value || 'Seu objetivo profissional';
                
                // Coletar formações
                const educationItems = [];
                document.querySelectorAll('#education-container .multi-item').forEach(item => {
                    educationItems.push({
                        course: item.querySelector('.education-course').value,
                        institution: item.querySelector('.education-institution').value,
                        period: item.querySelector('.education-period').value
                    });
                });
                
                // Coletar habilidades
                const languages = document.getElementById('languages').value;
                const tools = document.getElementById('tools').value;
                const knowledge = document.getElementById('knowledge').value;
                
                // Coletar idiomas
                const languageItems = [];
                document.querySelectorAll('#languages-container .multi-item').forEach(item => {
                    languageItems.push({
                        name: item.querySelector('.language-name').value,
                        level: item.querySelector('.language-level').value
                    });
                });
                
                // Coletar cursos
                const courseItems = [];
                document.querySelectorAll('#courses-container .multi-item').forEach(item => {
                    courseItems.push({
                        name: item.querySelector('.course-name').value,
                        institution: item.querySelector('.course-institution').value,
                        period: item.querySelector('.course-period').value,
                        description: item.querySelector('.course-description').value
                    });
                });
                
                // Coletar projetos
                const projectItems = [];
                document.querySelectorAll('#projects-container .multi-item').forEach(item => {
                    projectItems.push({
                        name: item.querySelector('.project-name').value,
                        description: item.querySelector('.project-description').value,
                        link: item.querySelector('.project-link').value
                    });
                });
                
                // Configurações do PDF
                const margin = 10;
                const lineHeight = 7;
                let y = margin;
                
                // Adicionar cabeçalho
                doc.setFontSize(20);
                doc.setFont(undefined, 'bold');
                doc.text(name, margin, y);
                y += lineHeight;
                
                doc.setFontSize(12);
                doc.setFont(undefined, 'normal');

                if (phone) {
                    doc.text(`Telefone: ${phone}`, margin, y);
                    y += lineHeight;
                }
                if (email) {
                    doc.text(`E-mail: ${email}`, margin, y);
                    y += lineHeight;
                }
                if (location) {
                    doc.text(`Localização: ${location}`, margin, y);
                    y += lineHeight;
                }
                if (github) {
                    doc.text(`GitHub: ${github}`, margin, y);
                    y += lineHeight;
                }
                if (linkedin) {
                    doc.text(`LinkedIn: ${linkedin}`, margin, y);
                    y += lineHeight;
                }

                y += lineHeight; // Extra space after contact info
                
                // Adicionar objetivo
                doc.setFontSize(16);
                doc.setFont(undefined, 'bold');
                doc.text("OBJETIVO", margin, y);
                y += lineHeight;
                
                doc.setFontSize(12);
                doc.setFont(undefined, 'normal');
                const objectiveLines = doc.splitTextToSize(objective, 180);
                doc.text(objectiveLines, margin, y);
                y += (objectiveLines.length * lineHeight) + lineHeight;
                
                // Adicionar formação acadêmica
                if (educationItems.length > 0) {
                    doc.setFontSize(16);
                    doc.setFont(undefined, 'bold');
                    doc.text("FORMAÇÃO ACADÊMICA", margin, y);
                    y += lineHeight;
                    
                    doc.setFontSize(12);
                    doc.setFont(undefined, 'normal');
                    
                    educationItems.forEach(edu => {
                        if (y > 270) {
                            doc.addPage();
                            y = margin;
                        }
                        
                        doc.setFont(undefined, 'bold');
                        doc.text(edu.course, margin, y);
                        y += lineHeight;
                        
                        doc.setFont(undefined, 'normal');
                        doc.text(`${edu.institution} - ${edu.period}`, margin, y);
                        y += lineHeight * 2;
                    });
                }
                
                // Adicionar habilidades
                if (languages || tools || knowledge) {
                    if (y > 250) {
                        doc.addPage();
                        y = margin;
                    }
                    
                    doc.setFontSize(16);
                    doc.setFont(undefined, 'bold');
                    doc.text("HABILIDADES", margin, y);
                    y += lineHeight;
                    
                    doc.setFontSize(12);
                    doc.setFont(undefined, 'normal');
                    
                    if (languages) {
                        doc.setFont(undefined, 'bold');
                        doc.text("Linguagens:", margin, y);
                        y += lineHeight;
                        
                        doc.setFont(undefined, 'normal');
                        const langLines = doc.splitTextToSize(languages, 180);
                        doc.text(langLines, margin, y);
                        y += (langLines.length * lineHeight) + lineHeight;
                    }
                    
                    if (tools) {
                        doc.setFont(undefined, 'bold');
                        doc.text("Ferramentas:", margin, y);
                        y += lineHeight;
                        
                        doc.setFont(undefined, 'normal');
                        const toolsLines = doc.splitTextToSize(tools, 180);
                        doc.text(toolsLines, margin, y);
                        y += (toolsLines.length * lineHeight) + lineHeight;
                    }
                    
                    if (knowledge) {
                        doc.setFont(undefined, 'bold');
                        doc.text("Conhecimentos:", margin, y);
                        y += lineHeight;
                        
                        doc.setFont(undefined, 'normal');
                        const knowledgeLines = doc.splitTextToSize(knowledge, 180);
                        doc.text(knowledgeLines, margin, y);
                        y += (knowledgeLines.length * lineHeight) + lineHeight;
                    }
                }
                
                // Adicionar idiomas
                if (languageItems.length > 0) {
                    if (y > 250) {
                        doc.addPage();
                        y = margin;
                    }
                    
                    doc.setFontSize(16);
                    doc.setFont(undefined, 'bold');
                    doc.text("IDIOMAS", margin, y);
                    y += lineHeight;
                    
                    doc.setFontSize(12);
                    
                    languageItems.forEach(lang => {
                        if (y > 270) {
                            doc.addPage();
                            y = margin;
                        }
                        
                        doc.text(`${lang.name}: ${lang.level}`, margin, y);
                        y += lineHeight * 2;
                    });
                }
                
                // Adicionar cursos
                if (courseItems.length > 0) {
                    if (y > 250) {
                        doc.addPage();
                        y = margin;
                    }
                    
                    doc.setFontSize(16);
                    doc.setFont(undefined, 'bold');
                    doc.text("CURSOS LIVRES", margin, y);
                    y += lineHeight;
                    
                    doc.setFontSize(12);
                    
                    courseItems.forEach(course => {
                        if (y > 270) {
                            doc.addPage();
                            y = margin;
                        }
                        
                        doc.setFont(undefined, 'bold');
                        doc.text(course.name, margin, y);
                        y += lineHeight;
                        
                        doc.setFont(undefined, 'normal');
                        doc.text(`${course.institution} - ${course.period}`, margin, y);
                        y += lineHeight;
                        
                        if (course.description) {
                            const descLines = doc.splitTextToSize(course.description, 180);
                            doc.text(descLines, margin, y);
                            y += (descLines.length * lineHeight);
                        }
                        
                        y += lineHeight;
                    });
                }
                
                // Adicionar projetos
                if (projectItems.length > 0) {
                    if (y > 250) {
                        doc.addPage();
                        y = margin;
                    }
                    
                    doc.setFontSize(16);
                    doc.setFont(undefined, 'bold');
                    doc.text("PROJETOS", margin, y);
                    y += lineHeight;
                    
                    doc.setFontSize(12);
                    
                    projectItems.forEach(project => {
                        if (y > 270) {
                            doc.addPage();
                            y = margin;
                        }
                        
                        doc.setFont(undefined, 'bold');
                        doc.text(project.name, margin, y);
                        y += lineHeight;
                        
                        doc.setFont(undefined, 'normal');
                        const descLines = doc.splitTextToSize(project.description, 180);
                        doc.text(descLines, margin, y);
                        y += (descLines.length * lineHeight);
                        
                        if (project.link) {
                            doc.text(`Link: ${project.link}`, margin, y);
                            y += lineHeight;
                        }
                        
                        y += lineHeight;
                    });
                }
                
                // Salvar o PDF
                doc.save('curriculo.pdf');
            }
            
            function downloadTXT() {
                // Coletar dados do formulário
                const name = document.getElementById('name').value || 'Seu Nome';
                const phone = document.getElementById('phone').value || '(00) 0 0000-0000';
                const email = document.getElementById('email').value || 'seu.email@exemplo.com';
                const location = document.getElementById('location').value || 'Sua Cidade - Estado';
                const github = document.getElementById('github').value;
                const linkedin = document.getElementById('linkedin').value;
                const objective = document.getElementById('objective').value || 'Seu objetivo profissional';
                
                // Coletar formações
                const educationItems = [];
                document.querySelectorAll('#education-container .multi-item').forEach(item => {
                    educationItems.push({
                        course: item.querySelector('.education-course').value,
                        institution: item.querySelector('.education-institution').value,
                        period: item.querySelector('.education-period').value
                    });
                });
                
                // Coletar habilidades
                const languages = document.getElementById('languages').value;
                const tools = document.getElementById('tools').value;
                const knowledge = document.getElementById('knowledge').value;
                
                // Coletar idiomas
                const languageItems = [];
                document.querySelectorAll('#languages-container .multi-item').forEach(item => {
                    languageItems.push({
                        name: item.querySelector('.language-name').value,
                        level: item.querySelector('.language-level').value
                    });
                });
                
                // Coletar cursos
                const courseItems = [];
                document.querySelectorAll('#courses-container .multi-item').forEach(item => {
                    courseItems.push({
                        name: item.querySelector('.course-name').value,
                        institution: item.querySelector('.course-institution').value,
                        period: item.querySelector('.course-period').value,
                        description: item.querySelector('.course-description').value
                    });
                });
                
                // Coletar projetos
                const projectItems = [];
                document.querySelectorAll('#projects-container .multi-item').forEach(item => {
                    projectItems.push({
                        name: item.querySelector('.project-name').value,
                        description: item.querySelector('.project-description').value,
                        link: item.querySelector('.project-link').value
                    });
                });
                
                // Construir texto do currículo
                let textContent = `CURRÍCULO\n`;
                textContent += `=========\n\n`;
                
                textContent += `${name}\n`;
                textContent += `${phone} | ${email} | ${location}\n`;
                if (github) textContent += `GitHub: ${github}\n`;
                if (linkedin) textContent += `LinkedIn: ${linkedin}\n`;
                textContent += `\n`;
                
                textContent += `OBJETIVO\n`;
                textContent += `--------\n`;
                textContent += `${objective}\n\n`;
                
                if (educationItems.length > 0) {
                    textContent += `FORMAÇÃO ACADÊMICA\n`;
                    textContent += `------------------\n`;
                    educationItems.forEach(edu => {
                        textContent += `${edu.course}\n`;
                        textContent += `${edu.institution} - ${edu.period}\n\n`;
                    });
                }
                
                if (languages || tools || knowledge) {
                    textContent += `HABILIDADES\n`;
                    textContent += `-----------\n`;
                    
                    if (languages) {
                        textContent += `Linguagens: ${languages}\n`;
                    }
                    
                    if (tools) {
                        textContent += `Ferramentas: ${tools}\n`;
                    }
                    
                    if (knowledge) {
                        textContent += `Conhecimentos: ${knowledge}\n`;
                    }
                    
                    textContent += `\n`;
                }
                
                if (languageItems.length > 0) {
                    textContent += `IDIOMAS\n`;
                    textContent += `-------\n`;
                    languageItems.forEach(lang => {
                        textContent += `${lang.name}: ${lang.level}\n`;
                    });
                    textContent += `\n`;
                }
                
                if (courseItems.length > 0) {
                    textContent += `CURSOS LIVRES\n`;
                    textContent += `-------------\n`;
                    courseItems.forEach(course => {
                        textContent += `${course.name}\n`;
                        textContent += `${course.institution} - ${course.period}\n`;
                        if (course.description) {
                            textContent += `${course.description}\n`;
                        }
                        textContent += `\n`;
                    });
                }
                
                if (projectItems.length > 0) {
                    textContent += `PROJETOS\n`;
                    textContent += `--------\n`;
                    projectItems.forEach(project => {
                        textContent += `${project.name}\n`;
                        textContent += `${project.description}\n`;
                        if (project.link) {
                            textContent += `Link: ${project.link}\n`;
                        }
                        textContent += `\n`;
                    });
                }
                
                // Criar e baixar arquivo de texto
                const blob = new Blob([textContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'curriculo.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        });