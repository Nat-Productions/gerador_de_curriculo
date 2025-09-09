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

    // Coletar experiências
    const experienceItems = [];
    document.querySelectorAll('#experiencia-container .multi-item').forEach(item => {
        experienceItems.push({
            tipo: item.querySelector('.experiencia-tipo').value,
            funcao: item.querySelector('.experiencia-funcao').value,
            empresa: item.querySelector('.experiencia-empresa').value,
            periodo: item.querySelector('.experiencia-periodo').value,
            descricao: item.querySelector('.experiencia-descricao').value
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

    // Adicionar experiência profissional
    if (experienceItems.length > 0) {
        resumeHTML += `<div class="resume-section"><h2>Experiência Profissional</h2>`;
        experienceItems.forEach(exp => {
            resumeHTML += `
                <div class="resume-item">
                    <h3>${exp.funcao} - ${exp.tipo}</h3>
                    <div class="date">${exp.empresa} - ${exp.periodo}</div>
                    <p>${exp.descricao}</p>
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
