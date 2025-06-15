// rank.js
export default {
    template: `
<div id="app" style="display: flex; flex-direction: column; min-height: 100vh;">
<v-app>
   <v-main>
        <v-container>
        <v-row justify="center">
                <v-col cols="12">
                    <!-- Pulsante di Ritorno -->
                    <v-btn color="primary" @click="goBack" class="mb-4">
                        <v-icon left>mdi-arrow-left</v-icon>
                        BACK
                    </v-btn>
            <!-- CLASSIFICA MARCATORI -->
            <v-card class="mb-6 px-2 py-3" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Classifica Marcatori</v-card-title>

                <v-row class="mb-2" style="justify-content: flex-end;">
                <v-col cols="auto" class="text-right text-caption" style="font-weight: 600;">Goal fatti</v-col>
                </v-row>

                <v-container fluid class="px-0">
                <template v-if="classificaMarcatori.length > 0">
                    <v-row
                    v-for="(player, index) in classificaMarcatori.slice(0, 5)"
                    :key="player.cod_user"
                    class="align-center mb-1 py-1"
                    :class="getTopStyle(index)"
                    style="border: 1px solid transparent; border-radius: 8px;"
                    >
                    <v-col cols="2" class="text-center font-weight-bold text-caption">{{ index + 1 }}</v-col>
                    <v-col cols="7" class="text-caption text-left">{{ player.player_name || (player.first_name + ' ' + player.last_name) || player.cod_user }}</v-col>
                    <v-col cols="3" class="text-right font-weight-bold text-caption">{{ player.goals }}</v-col>
                    </v-row>
                </template>
                <template v-else>
                    <v-row class="justify-center py-4">
                    <v-col class="text-center text-caption">Nessun marcatore registrato al momento</v-col>
                    </v-row>
                </template>
                </v-container>
            </v-card>

            <!-- MIGLIOR ATTACCO -->
            <v-card class="mb-6 px-2 py-3" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Miglior Attacco</v-card-title>

                <v-row class="mb-2" style="justify-content: flex-end;">
                <v-col cols="auto" class="text-right text-caption" style="font-weight: 600;">Goal fatti</v-col>
                </v-row>

                <v-container fluid class="px-0">
                <v-row
                    v-for="(team, index) in migliorAttacco().slice(0, 5)"
                    :key="team.id_team"
                    class="align-center mb-1 py-1"
                    :class="getTopStyle(index)"
                    style="border: 1px solid transparent; border-radius: 8px;"
                >
                    <v-col cols="1" class="text-center font-weight-bold text-caption">{{ index + 1 }}</v-col>
                    <v-col cols="1" class="d-flex justify-center">
                    <v-img :src="team.logo_path" max-width="24" max-height="24" contain />
                    </v-col>
                    <v-col cols="8" class="text-caption text-left">{{ team.name }}</v-col>
                    <v-col cols="2" class="text-right font-weight-bold text-caption">{{ team.gol_fatti }}</v-col>
                </v-row>
                </v-container>
            </v-card>

            <!-- MIGLIOR DIFESA -->
            <v-card class="mb-6 px-2 py-3" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Miglior Difesa</v-card-title>

                <v-row class="mb-2" style="justify-content: flex-end;">
                <v-col cols="auto" class="text-right text-caption" style="font-weight: 600;">Goal subiti</v-col>
                </v-row>

                <v-container fluid class="px-0">
                <v-row
                    v-for="(team, index) in migliorDifesa().slice(0, 5)"
                    :key="team.id_team"
                    class="align-center mb-1 py-1"
                    :class="getTopStyle(index)"
                    style="border: 1px solid transparent; border-radius: 8px;"
                >
                    <v-col cols="1" class="text-center font-weight-bold text-caption">{{ index + 1 }}</v-col>
                    <v-col cols="1" class="d-flex justify-center">
                    <v-img :src="team.logo_path" max-width="24" max-height="24" contain />
                    </v-col>
                    <v-col cols="8" class="text-caption text-left">{{ team.name }}</v-col>
                    <v-col cols="2" class="text-right font-weight-bold text-caption">{{ team.gol_subiti }}</v-col>
                </v-row>
                </v-container>
            </v-card>
            </v-container>
    </v-main>
</v-app>
</div>
    `,
data() {
        return {
        classificaDB: [],
        goal: [],
        squadre: [],
        classificaMarcatori: [],
        giocatori: [],
        partite: [],
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
        }, 

        getClassColor(index) {
            const n = this.classificaDB.length;
            if (index <= 1) return 'classifica-verde';      // prime due
            if (index >= n - 2) return 'classifica-rossa';  // ultime due
            return 'classifica-arancione';                 // centrali
        }, 

        caricaClassificaDB() {
            fetch('/api/getRank.php?action=load')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                this.classificaDB = data.classifica;
                console.log('Classifica caricata con successo:', this.classificaDB);
                } else {
                console.error('Errore dal server:', data.error);
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta classifica:', error);
            });
        },
        
        caricaGoal() {
            fetch('/dashboard/api/goal.php?action=load')
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.goal) {
                        this.goal = data.goal;
                        console.log('Goal caricati dal DB:', this.goal);
                        this.getClassificaMarcatori();
                    } else {
                        console.warn('Nessun goal trovato o struttura dati errata.');
                        this.goal = [];
                    }
                })
                .catch(error => {
                    console.error('Errore nel caricamento dei goal:', error);
                    this.goal = [];
                });
        },

        caricaPartite() {
            fetch('/api/getMatches.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('partite ricevute:', data); // Log per debug
                    this.partite = data; 
                })
                .catch(error => {
                    console.error('Errore nel recupero dei dati:', error);
                });
        },
        
        caricaSquadre() {
            fetch('/api/getTeams.php?action=load')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success && data.squadre) {
                        this.squadre = data.squadre;
                        console.log('Squadre caricate dal DB:', this.squadre);
                    } else {
                        console.error('Errore nel caricamento delle squadre:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Errore nel caricamento delle squadre:', error);
                });
        },

        getClassificaMarcatori() {
            const marcatori = {};

            console.log("GOAL:", this.goal); // DEBUG

            // Conta i goal per ogni giocatore (cod_user)
            this.goal.forEach(goal => {
                if (!marcatori[goal.cod_user]) {
                marcatori[goal.cod_user] = 1;
                } else {
                marcatori[goal.cod_user]++;
                }
            });

            // Trasforma in array con nome completo
            this.classificaMarcatori = Object.keys(marcatori).map(cod_user => {
                const giocatore = this.giocatori.find(g => String(g.id_user) === String(cod_user));
                return {
                cod_user,
                player_name: giocatore ? `${giocatore.name} ${giocatore.surname}` : `ID ${cod_user}`,
                goals: marcatori[cod_user]
                };
            });

            // Ordina per numero di goal decrescente
            this.classificaMarcatori.sort((a, b) => b.goals - a.goals);

            console.log("Classifica marcatori:", this.classificaMarcatori); // DEBUG

            return this.classificaMarcatori;
        },

        caricaGiocatori() {
            this.giocatori = [];
            fetch('/dashboard/api/giocatori.php?action=load')
                .then(response => response.json())
                .then(data => {
                if (data.success && data.giocatori) {
                    this.giocatori = data.giocatori;
                    console.log('Giocatori caricati dal DB:', this.giocatori);
                }
                })
                .catch(error => {
                console.error('Errore nel caricamento dei giocatori:', error);
                });
        },
         migliorAttacco() {
            console.log("calcolo miglior attacco..."); // DEBUG
            if (!this.squadre.length || !this.goal.length) return [];

            const attacco = this.squadre.map(squadra => {
            const golFatti = this.goal.filter(g => g.cod_team === squadra.id_team).length;
            return {
                ...squadra,
                gol_fatti: golFatti
            };
            });

            console.log("ATTACCO:", attacco); // DEBUG
            return attacco.sort((a, b) => b.gol_fatti - a.gol_fatti); // dal più forte
        },

        migliorDifesa() {
            console.log("calcolo miglior difesa..."); // DEBUG
            if (!this.squadre.length || !this.partite.length || !this.goal.length) return [];

            const difesa = this.squadre.map(squadra => {
            const matchIds = this.partite
                .filter(p => p.cod_team1 === squadra.id_team || p.cod_team2 === squadra.id_team)
                .map(p => p.id_match);

            const golSubiti = this.goal.filter(g =>
                matchIds.includes(g.cod_match) && g.cod_team !== squadra.id_team
            ).length;

            return {
                ...squadra,
                gol_subiti: golSubiti
            };
            });
            console.log("DIFESA:", difesa); // DEBUG
            return difesa.sort((a, b) => a.gol_subiti - b.gol_subiti); // dal migliore
        },

        getTopStyle(index) {
            if (index === 0) {
                return 'border-gold';
            } else if (index === 1) {
                return 'border-silver';
            } else if (index === 2) {
                return 'border-bronze';
            } else {
                return '';
            }
        }
  }, 

   mounted() {
        Promise.all([
    this.caricaSquadre(),
    this.caricaGiocatori(),
    this.caricaPartite()
  ]).then(() => {
    this.caricaGoal();
  }); 
   }
}
