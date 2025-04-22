// components
import Rank from '/components/rank.js';
import When from '/components/when.js'; 
import Teams from '/components/teams.js';
import Rules from '/components/regulation.js';

//templates 
import Prima from '/templates/prima.js';
import Classificone from '/templates/classificone.js';

// Funzione per recuperare il parametro dal database
function getTemplateId() {
    return 2; 
}

// Configurazione delle rotte dinamiche
function configureRoutes() {
    const templateId = getTemplateId(); // Recupera il parametro dal database
    const templates = {
        1: Prima,
        2: Classificone,
    };

    // Seleziona il template principale in base all'ID
    const mainTemplate = templates[templateId] || Prima; // Usa Prima come fallback

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
    return routes;
}
console.log('Configurazione delle rotte...');
const routes =  configureRoutes(); // Configura le rotte dinamicamente
console.log('Creazione del router...');
        const router = new VueRouter({
            routes,
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