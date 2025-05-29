// components
import Rank from '/sanze/components/rank.js';
import When from '/sanze/components/when.js'; 
import Teams from '/sanze/components/teams.js';
import Rules from '/sanze/components/regulation.js';

//templates 
import Prima from '/sanze/templates/prima.js';
import Classificone from '/sanze/templates/classificone.js';

// Funzione per recuperare il parametro dal database
function getTemplateId() {
    return fetch('/sanze/api/getTemplate.php')
        .then(response => {
            // Controlliamo se la risposta è OK
            if (!response.ok) {
                throw new Error('Errore nella risposta HTTP: ' + response.status);
            }
            // Restituiamo il corpo della risposta come JSON
            return response.json();
        })
        .then(data => {
            console.log('Dati JSON ricevuti:', data);
            if (data.success) {
                console.log('Dati JSON ricevuti:', data.template.actual_state);
                return data.template.actual_state; 
            } else {
                console.error('Risposta non valida:', data);
                return null;
            }
        })
        .catch(error => {
            console.error('Errore nella chiamata API:', error);
            return null; 
        });
}



// Configurazione delle rotte dinamiche
function configureRoutes() {
    return getTemplateId().then(templateId => {
        const templates = {
            1: Prima,
            2: Classificone,
        };

        // Seleziona il template principale in base all'ID
        const mainTemplate = templates[Number(templateId)] || Prima; // Usa Prima come fallback
        
        // Configurazione delle rotte
        const routes = [
            {
                path: '/',
                component: mainTemplate,  // Carica il template principale
            },
            {
                path: '/rank',
                component: Rank,
            },
            {
                path: '/when',
                component: When,  
            },
            {
                path: '/teams',
                component: Teams,  
            },
            {
                path: '/regulation',
                component: Rules,  
            }
        ];    

        return routes; // Ritorniamo le routes dal .then
    });
}

configureRoutes().then(routes => {
    console.log('Rotte ricevute:', routes);

    console.log('Creazione del router...');
    const router = new VueRouter({
        routes, // Ora routes è corretto
    });
    

console.log('Inizializzazione di Vue...');
new Vue({
    el: '#app',
    vuetify: new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: "#000000",
                    secondary: "#d0a349",
                    accent: "#7f8185",
                    error: "#FF5252",
                    info: "#2196F3",
                    success: "#4CAF50",
                    warning: "#FB8C00",
                },
                dark: {
                    primary: "#90CAF9",
                    secondary: "#F48FB1",
                    accent: "#FFD54F",
                    error: "#EF5350",
                    info: "#64B5F6",
                    success: "#81C784",
                    warning: "#FFB74D",
                },
            },
            options: { customProperties: true },
        },
    }),
    router,
    render: h => h('router-view'),
});
});