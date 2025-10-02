function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // Coletar dados do formulário
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

    // Configurações do PDF
    const margin = 10;
    const lineHeight = 7;
    let y = margin;

    function checkPageBreak(y) {
        if (y > 280) {
            doc.addPage();
            return margin;
        }
        return y;
    }

    // Adicionar cabeçalho
    if (name) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(name, margin, y);
        y += lineHeight;
    }

    doc.setFontSize(8);
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

    if (phone || email || location || github || linkedin) {
        y += lineHeight; // Extra space after contact info
    }


    // Adicionar objetivo
    if (objective) {
        y = checkPageBreak(y);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("OBJETIVO", margin, y);
        y += lineHeight;

        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        const objectiveLines = doc.splitTextToSize(objective, 180);
        doc.text(objectiveLines, margin, y);
        y += (objectiveLines.length * lineHeight) + lineHeight;
    }


    // Adicionar formação acadêmica
    const validEducationItems = educationItems.filter(edu => edu.course || edu.institution || edu.period);
    if (validEducationItems.length > 0) {
        y = checkPageBreak(y);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("FORMAÇÃO ACADÊMICA", margin, y);
        y += lineHeight;

        doc.setFontSize(8);

        validEducationItems.forEach(edu => {
            y = checkPageBreak(y);
            if (edu.course) {
                doc.setFont(undefined, 'bold');
                doc.text(edu.course, margin, y);
                y += lineHeight;
            }

            if (edu.institution || edu.period) {
                doc.setFont(undefined, 'normal');
                doc.text(`${[edu.institution, edu.period].filter(Boolean).join(' - ')}`, margin, y);
                y += lineHeight;
            }
            y += lineHeight;
        });
    }

    // Adicionar experiência profissional
    const validExperienceItems = experienceItems.filter(exp => exp.funcao || exp.tipo || exp.empresa || exp.periodo || exp.descricao);
    if (validExperienceItems.length > 0) {
        y = checkPageBreak(y);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("EXPERIÊNCIA PROFISSIONAL", margin, y);
        y += lineHeight;

        doc.setFontSize(8);

        validExperienceItems.forEach(exp => {
            y = checkPageBreak(y);
            if (exp.funcao || exp.tipo) {
                doc.setFont(undefined, 'bold');
                doc.text(`${[exp.funcao, exp.tipo].filter(Boolean).join(' - ')}`, margin, y);
                y += lineHeight;
            }

            if (exp.empresa || exp.periodo) {
                doc.setFont(undefined, 'normal');
                doc.text(`${[exp.empresa, exp.periodo].filter(Boolean).join(' - ')}`, margin, y);
                y += lineHeight;
            }

            if (exp.descricao) {
                const descLines = doc.splitTextToSize(exp.descricao, 180);
                doc.text(descLines, margin, y);
                y += (descLines.length * lineHeight);
            }
            y += lineHeight;
        });
    }

    // Adicionar habilidades
    if (languages || tools || knowledge) {
        y = checkPageBreak(y);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("HABILIDADES", margin, y);
        y += lineHeight;

        doc.setFontSize(8);

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
    const validLanguageItems = languageItems.filter(lang => lang.name || lang.level);
    if (validLanguageItems.length > 0) {
        y = checkPageBreak(y);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("IDIOMAS", margin, y);
        y += lineHeight;

        doc.setFontSize(8);

        validLanguageItems.forEach(lang => {
            y = checkPageBreak(y);
            doc.text(`${[lang.name, lang.level].filter(Boolean).join(': ')}`, margin, y);
            y += lineHeight * 2;
        });
    }

    // Adicionar cursos
    const validCourseItems = courseItems.filter(course => course.name || course.institution || course.period || course.description);
    if (validCourseItems.length > 0) {
        y = checkPageBreak(y);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("CURSOS LIVRES", margin, y);
        y += lineHeight;

        doc.setFontSize(8);

        validCourseItems.forEach(course => {
            y = checkPageBreak(y);
            if (course.name) {
                doc.setFont(undefined, 'bold');
                doc.text(course.name, margin, y);
                y += lineHeight;
            }

            if (course.institution || course.period) {
                doc.setFont(undefined, 'normal');
                doc.text(`${[course.institution, course.period].filter(Boolean).join(' - ')}`, margin, y);
                y += lineHeight;
            }

            if (course.description) {
                const descLines = doc.splitTextToSize(course.description, 180);
                doc.text(descLines, margin, y);
                y += (descLines.length * lineHeight);
            }

            y += lineHeight;
        });
    }

    // Adicionar projetos
    const validProjectItems = projectItems.filter(project => project.name || project.description || project.link);
    if (validProjectItems.length > 0) {
        y = checkPageBreak(y);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("PROJETOS", margin, y);
        y += lineHeight;

        doc.setFontSize(8);

        validProjectItems.forEach(project => {
            y = checkPageBreak(y);
            if (project.name) {
                doc.setFont(undefined, 'bold');
                doc.text(project.name, margin, y);
                y += lineHeight;
            }

            if (project.description) {
                doc.setFont(undefined, 'normal');
                const descLines = doc.splitTextToSize(project.description, 180);
                doc.text(descLines, margin, y);
                y += (descLines.length * lineHeight);
            }

            if (project.link) {
                doc.text(`Link: ${project.link}`, margin, y, { link: project.link });
                y += lineHeight;
            }

            y += lineHeight;
        });
    }

    // Salvar o PDF
    doc.save('curriculo.pdf');
}