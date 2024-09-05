function showOptions() {
    const mainServiceSelect = document.getElementById('main-service-select');
    const step2 = document.getElementById('step-2');
    const optionSelect = document.getElementById('option-select');
    const totalContainer = document.getElementById('total-container');
    const selectedService = mainServiceSelect.value;

    // Réinitialiser l'option select avec "Aucune"
    optionSelect.innerHTML = '<option value="0">Aucune</option>';

    if (selectedService !== '0') {
        // Afficher l'étape 2 et le total
        step2.style.display = 'block';
        totalContainer.style.display = 'block';

        // Ajouter des options spécifiques à la coupe sélectionnée
        let options;
        switch (selectedService) {
            case '20': // Dégradés Hommes
                options = [
                    {text: 'Contours & Finitions sans barbe - +5€', value: 5},
                    {text: 'Rasage à l\'ancienne - +10€', value: 10},
                    {text: 'Coloration temporaire des cheveux - +15€', value: 15}
                ];
                break;
            case '25': // Coupe + Barbe
                options = [
                    {text: 'Shampoing nourrissant - +5€', value: 5},
                    {text: 'Soin de la barbe - +8€', value: 8},
                    {text: 'Hydratation du cuir chevelu - +10€', value: 10}
                ];
                break;
            case '15': // Dégradés Enfants et Adolescents
                options = [
                    {text: 'Designs simples sur les cheveux - +5€', value: 5},
                    {text: 'Designs complexes sur les cheveux - +10€', value: 10}
                ];
                break;
            case '40': // Big Chop Femmes Afro Antillaise
                options = [
                    {text: 'Soin hydratant profond - +10€', value: 10},
                    {text: 'Torsades ou twists - +15€', value: 15},
                    {text: 'Coupe des pointes après le big chop - +5€', value: 5}
                ];
                break;
            case '30': // Buzz Cut Classique
                options = [
                    {text: 'Coloration complète - +20€', value: 20},
                    {text: 'Patine pour un effet argenté - +25€', value: 25},
                    {text: 'Rasage à blanc - +10€', value: 10}
                ];
                break;
        }

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.text = option.text;
            optionSelect.add(opt);
        });
    } else {
        // Si aucune coupe n'est sélectionnée, cacher l'étape 2 et le total
        step2.style.display = 'none';
        totalContainer.style.display = 'none';
    }

    updateTotal();
}

function updateTotal() {
    const mainServicePrice = parseInt(document.getElementById('main-service-select').value, 10);
    const optionPrice = parseInt(document.getElementById('option-select').value, 10);
    const total = mainServicePrice + (isNaN(optionPrice) ? 0 : optionPrice);
    document.getElementById('total-price').innerText = `${total}€`;
}

function bookAppointment() {
    const modal = document.getElementById('appointment-modal');
    const summary = document.getElementById('summary');
    const finalPrice = document.getElementById('final-price');
    
    // Récupération du service principal sélectionné
    const mainService = document.getElementById('main-service-select');
    const mainServiceText = mainService.options[mainService.selectedIndex].text.split('-')[0].trim();

    // Initialise les services avec la prestation principale
    let services = `<strong>Prestation principale:</strong> ${mainServiceText}<br>`;

    // Ajout des options supplémentaires sélectionnées
    const option = document.getElementById('option-select');
    if (option.selectedIndex > 0) {
        const optionText = option.options[option.selectedIndex].text.split('-')[0].trim();
        services += `<strong>Option supplémentaire:</strong> ${optionText}<br>`;
    }
    
    // Mise à jour du texte du résumé dans le modal
    summary.innerHTML = services;
    finalPrice.textContent = document.getElementById('total-price').textContent;
    modal.style.display = "block";
}

// Pour fermer le modal
document.getElementsByClassName('close')[0].onclick = function() {
    const modal = document.getElementById('appointment-modal');
    modal.style.display = "none";
}

// Fermer le modal si l'utilisateur clique en dehors de celui-ci
window.onclick = function(event) {
    const modal = document.getElementById('appointment-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
