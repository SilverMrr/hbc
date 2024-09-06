function showOptions() {
    const mainServiceSelect = document.getElementById('main-service-select');
    const step2 = document.getElementById('step-2');
    const optionSelect = document.getElementById('option-select');
    const totalContainer = document.getElementById('total-container');
    const selectedService = mainServiceSelect.value;

    // Toujours réinitialiser l'option select avec "Aucune"
    optionSelect.innerHTML = '<option value="0">Aucune</option>';

    // Si une prestation est sélectionnée (valeur différente de 0)
    if (selectedService !== '0') {
        // Afficher l'étape 2 (options supplémentaires) et le total
        step2.style.display = 'block';
        totalContainer.style.display = 'block';

        // Ajouter les options spécifiques à la coupe sélectionnée
        let options;
        switch (selectedService) {
            case '20': // Coupe standard (dégradés) ou Buzz Cut Classique
                options = [
                    {text: 'Contour complet sans barbe - +5€', value: 5},
                    {text: 'Contour complet avec barbe - +8€', value: 8},
                    {text: 'Shampoing/Coiffage - +10€', value: 10}
                ];
                break;
            case '25': // Coupe + Barbe
                options = [
                    {text: 'Shampoing/Soin/Coiffage - +10€', value: 10},
                    {text: 'Entretien de la barbe - +5€', value: 5}
                ];
                break;
            case '15': // Coupe enfants/adolescents
                options = [
                    {text: 'Design simple - +3€', value: 3},
                    {text: 'Design complexe - +8€', value: 8}
                ];
                break;
            case '30': // Big Chop
                options = [
                    {text: 'Soin hydratant profond - +10€', value: 10},
                    {text: 'Coupe des pointes ou longueur - +10€', value: 10}
                ];
                break;
            case '55': // Buzz Cut Coloration
                options = [
                    {text: 'Patine pour un effet argenté - +25€', value: 25},
                    {text: 'Blond Polaire - +95€', value: 95}
                ];
                break;
            default:
                // Si aucun service valide n'est sélectionné, masquer les options
                step2.style.display = 'none';
                totalContainer.style.display = 'none';
                return;
        }

        // Ajout des options au menu déroulant
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.text = option.text;
            optionSelect.add(opt);
        });
    } else {
        // Si aucune prestation de base n'est sélectionnée, masquer le menu d'options
        step2.style.display = 'none';
        totalContainer.style.display = 'none';
    }

    // Mise à jour du total dès qu'une nouvelle option est sélectionnée
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
