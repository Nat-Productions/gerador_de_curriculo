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

    // Adicionar experiência profissional
    if (experienceItems.length > 0) {
        if (y > 250) {
            doc.addPage();
            y = margin;
        }

        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text("EXPERIÊNCIA PROFISSIONAL", margin, y);
        y += lineHeight;
        
        doc.setFontSize(12);
        
        experienceItems.forEach(exp => {
            if (y > 270) {
                doc.addPage();
                y = margin;
            }
            
            doc.setFont(undefined, 'bold');
            doc.text(`${exp.funcao} - ${exp.tipo}`, margin, y);
            y += lineHeight;
            
            doc.setFont(undefined, 'normal');
            doc.text(`${exp.empresa} - ${exp.periodo}`, margin, y);
            y += lineHeight;

            const descLines = doc.splitTextToSize(exp.descricao, 180);
            doc.text(descLines, margin, y);
            y += (descLines.length * lineHeight) + lineHeight;
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
