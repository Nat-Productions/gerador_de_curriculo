function downloadPDF() {
    // Garante que o conteúdo do currículo está atualizado com os dados mais recentes do formulário
    generateResume();

    const element = document.getElementById('resume-preview');
    const opt = {
        margin:       10,
        filename:     'curriculo.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}