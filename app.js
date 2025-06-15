// components
import Rank from '/components/rank.js';
import When from '/components/when.js'; 
import Teams from '/components/teams.js';
import Rules from '/components/regulation.js';
import Live from '/components/live.js';
import Matches from '/components/matches.js';
import Tabellone from '/components/tabellone.js';
import Tabellone_Quarti from '/components/tabellone_quarti.js';
import Tabellone_Semi from '/components/tabellone_semi.js';
import Stats from '/components/stats.js';
import teamDetail from './components/teamDetails.js';


//templates 
import Prima from '/templates/prima.js';
import Classificone from '/templates/classificone.js';
import Playoff from '/templates/playoff.js';
import Quarti from '/templates/quarti.js';
import Semi from '/templates/semi.js';
import Finale from '/templates/finale.js';

// Funzione per recuperare il parametro dal database
function getTemplateId() {
    return fetch('/api/getTemplate.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella risposta HTTP: ' + response.status);
            }
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
            3: Playoff,
            4: Quarti,
            5: Semi,
            6: Finale,
        };
        const mainTemplate = templates[Number(templateId)] || Prima; 
        
        // Configurazione delle rotte
        const routes = [
            {
                path: '/',
                component: mainTemplate,
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
                path: '/live',
                component: Live,  
            },
            {
                path: '/regulation',
                component: Rules,  
            }, 
            {
                path: '/matches',
                component: Matches,  
            }, 
            {
                path: '/tabellone',
                component: Tabellone,  
            },
            {
                path: '/tabellonequarti',
                component: Tabellone_Quarti,  
            },
            {
                path: '/tabellonesemi',
                component: Tabellone_Semi,  
            }, 
            {
                path: '/stats',
                component: Stats, 
            },
            {
            path: '/teams/:id',
            component: teamDetail,
            }
        ];    

        return routes;
    });
}

configureRoutes().then(routes => {
    const router = new VueRouter({
        routes, 
    });
    
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