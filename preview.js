function generateResume() {
    const name = document.getElementById('name').value || '';
    const phone = document.getElementById('phone').value || '';
    const email = document.getElementById('email').value || '';
    const location = document.getElementById('location').value || '';
    const github = document.getElementById('github').value;
    const linkedin = document.getElementById('linkedin').value;
    const objective = document.getElementById('objective').value || '';

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
    let resumeHTML = '';

    if (name) {
        resumeHTML += `<div class="resume-header"><h1>${name}</h1></div>`;
    }

    const contactInfo = [phone, email, location, github ? `GitHub: ${github}` : '', linkedin ? `LinkedIn: ${linkedin}` : ''].filter(Boolean).join(' | ');
    if (contactInfo) {
        resumeHTML += `<div class="resume-contact">${contactInfo}</div>`;
    }

    if (objective) {
        resumeHTML += `
        <div class="resume-section">
            <h2>Objetivo</h2>
            <p>${objective}</p>
        </div>`;
    }

    // Adicionar formação acadêmica
    const educationContent = educationItems.map(edu => {
        if (edu.course || edu.institution || edu.period) {
            return `
                <div class="resume-item">
                    ${edu.course ? `<h3>${edu.course}</h3>` : ''}
                    ${edu.institution || edu.period ? `<div class="date">${[edu.institution, edu.period].filter(Boolean).join(' - ')}</div>` : ''}
                </div>
            `;
        }
        return '';
    }).join('');

    if (educationContent.trim()) {
        resumeHTML += `<div class="resume-section"><h2>Formação Acadêmica</h2>${educationContent}</div>`;
    }


    // Adicionar experiência profissional
    const experienceContent = experienceItems.map(exp => {
        if (exp.funcao || exp.tipo || exp.empresa || exp.periodo || exp.descricao) {
            return `
                <div class="resume-item">
                    ${exp.funcao || exp.tipo ? `<h3>${[exp.funcao, exp.tipo].filter(Boolean).join(' - ')}</h3>` : ''}
                    ${exp.empresa || exp.periodo ? `<div class="date">${[exp.empresa, exp.periodo].filter(Boolean).join(' - ')}</div>` : ''}
                    ${exp.descricao ? `<p>${exp.descricao}</p>` : ''}
                </div>
            `;
        }
        return '';
    }).join('');

    if (experienceContent.trim()) {
        resumeHTML += `<div class="resume-section"><h2>Experiência Profissional</h2>${experienceContent}</div>`;
    }

    // Adicionar habilidades
    let skillsHTML = '';
    if (languages) {
        skillsHTML += `
            <div class="resume-item">
                <h3>Linguagens</h3>
                <p>${languages}</p>
            </div>
        `;
    }
    if (tools) {
        skillsHTML += `
            <div class="resume-item">
                <h3>Ferramentas</h3>
                <p>${tools}</p>
            </div>
        `;
    }
    if (knowledge) {
        skillsHTML += `
            <div class="resume-item">
                <h3>Conhecimentos</h3>
                <p>${knowledge}</p>
            </div>
        `;
    }

    if (skillsHTML) {
        resumeHTML += `<div class="resume-section"><h2>Habilidades</h2>${skillsHTML}</div>`;
    }


    // Adicionar idiomas
    const languageContent = languageItems.map(lang => {
        if (lang.name || lang.level) {
            return `
                <div class="resume-item">
                    <h3>${[lang.name, lang.level].filter(Boolean).join(' - ')}</h3>
                </div>
            `;
        }
        return '';
    }).join('');

    if (languageContent.trim()) {
        resumeHTML += `<div class="resume-section"><h2>Idiomas</h2>${languageContent}</div>`;
    }

    // Adicionar cursos
    const courseContent = courseItems.map(course => {
        if (course.name || course.institution || course.period || course.description) {
            return `
                <div class="resume-item">
                    ${course.name ? `<h3>${course.name}</h3>` : ''}
                    ${course.institution || course.period ? `<div class="date">${[course.institution, course.period].filter(Boolean).join(' - ')}</div>` : ''}
                    ${course.description ? `<p>${course.description}</p>` : ''}
                </div>
            `;
        }
        return '';
    }).join('');

    if (courseContent.trim()) {
        resumeHTML += `<div class="resume-section"><h2>Cursos Livres</h2>${courseContent}</div>`;
    }

    // Adicionar projetos
    const projectContent = projectItems.map(project => {
        if (project.name || project.description || project.link) {
            return `
                <div class="resume-item">
                    ${project.name ? `<h3>${project.name}</h3>` : ''}
                    ${project.description ? `<p>${project.description}</p>` : ''}
                    ${project.link ? `<p>Link: <a href="${project.link}">${project.link}</a></p>` : ''}
                </div>
            `;
        }
        return '';
    }).join('');

    if (projectContent.trim()) {
        resumeHTML += `<div class="resume-section"><h2>Projetos</h2>${projectContent}</div>`;
    }

    // Atualizar preview
    document.getElementById('resume-preview').innerHTML = resumeHTML;

    if (resumeHTML.trim()) {
        document.getElementById('download-pdf').classList.remove('hidden');
        document.getElementById('download-txt').classList.remove('hidden');
    } else {
        document.getElementById('download-pdf').classList.add('hidden');
        document.getElementById('download-txt').classList.add('hidden');
    }
}