function generateResume() {
    const name = document.getElementById('name').value || 'Seu Nome';
    const phone = document.getElementById('phone').value || '(00) 0 0000-0000';
    const email = document.getElementById('email').value || 'seu.email@exemplo.com';
    const location = document.getElementById('location').value || 'Sua Cidade - Estado';
    const github = document.getElementById('github').value;
    const linkedin = document.getElementById('linkedin').value;
    const objective = document.getElementById('objective').value || 'Seu objetivo profissional';
    
    // Coletar formações
    const educationItems = Array.from(document.querySelectorAll('#education-container .multi-item')).map(item => ({
        course: item.querySelector('.education-course').value,
        institution: item.querySelector('.education-institution').value,
        period: item.querySelector('.education-period').value
    }));
    
    // Coletar habilidades
    const languages = document.getElementById('languages').value;
    const tools = document.getElementById('tools').value;
    const knowledge = document.getElementById('knowledge').value;

    // Coletar idiomas
    const languageItems = Array.from(document.querySelectorAll('#language-container .multi-item')).map(item => ({
        name: item.querySelector('.language-name').value,
        proficiency: item.querySelector('.language-proficiency').value
    }));
    
    // Coletar cursos
    const courseItems = Array.from(document.querySelectorAll('#courses-container .multi-item')).map(item => ({
        name: item.querySelector('.course-name').value,
        institution: item.querySelector('.course-institution').value,
        period: item.querySelector('.course-period').value,
        description: item.querySelector('.course-description').value
    }));
    
    // Coletar projetos
    const projectItems = Array.from(document.querySelectorAll('#projects-container .multi-item')).map(item => ({
        name: item.querySelector('.project-name').value,
        description: item.querySelector('.project-description').value,
        link: item.querySelector('.project-link').value
    }));
    
    // Construir HTML do currículo
    let resumeHTML = `
        <div class="resume-header">
            <h1>${name}</h1>
            <div class="resume-contact">
                ${phone} | ${email} | ${location}
                ${github ? `| <a href="${github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
                ${linkedin ? `| <a href="${linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
            </div>
        </div>
        
        <div class="resume-section">
            <h2>Objetivo</h2>
            <p>${objective}</p>
        </div>
    `;
    
    if (educationItems.length > 0 && educationItems.some(e => e.course)) {
        resumeHTML += `<div class="resume-section"><h2>Formação Acadêmica</h2>`;
        educationItems.forEach(edu => {
            if (edu.course) {
                resumeHTML += `<div class="resume-item"><h3>${edu.course}</h3><div class="date">${edu.institution} - ${edu.period}</div></div>`;
            }
        });
        resumeHTML += `</div>`;
    }
    
    if (languages || tools || knowledge) {
        resumeHTML += `<div class="resume-section"><h2>Habilidades</h2>`;
        if (languages) resumeHTML += `<div class="resume-item"><h3>Linguagens</h3><p>${languages}</p></div>`;
        if (tools) resumeHTML += `<div class="resume-item"><h3>Ferramentas</h3><p>${tools}</p></div>`;
        if (knowledge) resumeHTML += `<div class="resume-item"><h3>Conhecimentos</h3><p>${knowledge}</p></div>`;
        resumeHTML += `</div>`;
    }

    if (languageItems.length > 0 && languageItems.some(l => l.name)) {
        resumeHTML += `<div class="resume-section"><h2>Idiomas</h2>`;
        languageItems.forEach(lang => {
            if (lang.name) {
                resumeHTML += `<div class="resume-item"><p><strong>${lang.name}:</strong> ${lang.proficiency}</p></div>`;
            }
        });
        resumeHTML += `</div>`;
    }
    
    if (courseItems.length > 0 && courseItems.some(c => c.name)) {
        resumeHTML += `<div class="resume-section"><h2>Cursos Livres</h2>`;
        courseItems.forEach(course => {
            if (course.name) {
                resumeHTML += `<div class="resume-item"><h3>${course.name}</h3><div class="date">${course.institution} - ${course.period}</div>${course.description ? `<p>${course.description}</p>` : ''}</div>`;
            }
        });
        resumeHTML += `</div>`;
    }
    
    if (projectItems.length > 0 && projectItems.some(p => p.name)) {
        resumeHTML += `<div class="resume-section"><h2>Projetos</h2>`;
        projectItems.forEach(project => {
            if (project.name) {
                resumeHTML += `<div class="resume-item"><h3>${project.name}</h3><p>${project.description}</p>${project.link ? `<p>Link: <a href="${project.link}" target="_blank" rel="noopener noreferrer">${project.link}</a></p>` : ''}</div>`;
            }
        });
        resumeHTML += `</div>`;
    }
    
    document.getElementById('resume-preview').innerHTML = resumeHTML;
    document.getElementById('download-pdf').classList.remove('hidden');
}

// --- TEMPLATES for dynamic items ---
const educationItemTemplate = `
<div class="multi-item">
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
</div>`;

const courseItemTemplate = `
<div class="multi-item">
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
</div>`;

const projectItemTemplate = `
<div class="multi-item">
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
</div>`;

const languageItemTemplate = `
<div class="multi-item">
    <div class="form-group">
        <label>Idioma</label>
        <select class="language-name" required>
            <option value="" disabled selected>Selecione um idioma</option>
            <option value="Alemão">Alemão</option>
            <option value="Árabe">Árabe</option>
            <option value="Chinês (Mandarim)">Chinês (Mandarim)</option>
            <option value="Coreano">Coreano</option>
            <option value="Espanhol">Espanhol</option>
            <option value="Francês">Francês</option>
            <option value="Hebraico">Hebraico</option>
            <option value="Hindi">Hindi</option>
            <option value="Holandês">Holandês</option>
            <option value="Inglês">Inglês</option>
            <option value="Italiano">Italiano</option>
            <option value="Japonês">Japonês</option>
            <option value="LIBRAS (Língua Brasileira de Sinais)">LIBRAS (Língua Brasileira de Sinais)</option>
            <option value="ASL (Língua de Sinais Americana)">ASL (Língua de Sinais Americana)</option>
            <option value="Português">Português</option>
            <option value="Russo">Russo</option>
            <option value="Sueco">Sueco</option>
        </select>
    </div>
    <div class="form-group">
        <label>Proficiência</label>
        <select class="language-proficiency" required>
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
            <option value="Fluente">Fluente</option>
            <option value="Nativo">Nativo</option>
        </select>
    </div>
    <button type="button" class="remove-btn">Remover</button>
</div>`;

function downloadPDF() {
    // Garante que o conteúdo do currículo está atualizado com os dados mais recentes do formulário
    generateResume();

    const element = document.getElementById('resume-preview');
    const opt = {
        margin:       10,
        filename:     'curriculo.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        enableLinks:  true
    };

    html2pdf().set(opt).from(element).save();
}

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching logic
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Generic function to add a new item from a template
    function createAndAppendItem(containerId, template) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = template.trim();
        const newItem = tempDiv.firstElementChild;

        if (newItem) {
            container.appendChild(newItem);
            newItem.querySelector('.remove-btn')?.addEventListener('click', () => newItem.remove());
        }
    }

    // Event listeners for "Add" buttons
    document.getElementById('add-education')?.addEventListener('click', () => createAndAppendItem('education-container', educationItemTemplate));
    document.getElementById('add-course')?.addEventListener('click', () => createAndAppendItem('courses-container', courseItemTemplate));
    document.getElementById('add-project')?.addEventListener('click', () => createAndAppendItem('projects-container', projectItemTemplate));
    document.getElementById('add-language')?.addEventListener('click', () => createAndAppendItem('language-container', languageItemTemplate));

    // Event listeners for initial "Remove" buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.multi-item')?.remove();
        });
    });

    // Main action buttons
    document.getElementById('generate-preview').addEventListener('click', generateResume);
    document.getElementById('download-pdf').addEventListener('click', downloadPDF);
});
