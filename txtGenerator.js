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
        textContent += `------- \n`;
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
