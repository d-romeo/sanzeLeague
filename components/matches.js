// matches.js
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

                  <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                    <v-card-title class="custom-title justify-center">Partite Concluse</v-card-title>
                    <v-container class="pa-4 pt-2">
                        <!-- Intestazione solo da sm in su -->
                        <v-row class="font-weight-bold text-subtitle-1 mb-3 d-none d-sm-flex" no-gutters>
                        <v-col cols="4" class="text-center">Squadra 1</v-col>
                        <v-col cols="4" class="text-center">Risultato</v-col>
                        <v-col cols="4" class="text-center">Squadra 2</v-col>
                        </v-row>

                        <v-row
                        v-for="(match, index) in matchesConcluse"
                        :key="match.id_match"
                        class="align-center mb-3"
                        no-gutters
                        >
                        <v-col cols="4" class="d-flex align-center justify-center">
                            <v-img :src="match.logo1" max-width="24" max-height="24" class="mr-1" contain></v-img>
                            <span class="text-caption text-sm-subtitle-2">{{ match.team1 }}</span>
                        </v-col>

                        <v-col cols="4" class="text-center text-sm-subtitle-1 text-caption">
                            {{ match.score1 }} - {{ match.score2 }}
                        </v-col>

                        <v-col cols="4" class="d-flex align-center justify-center">
                            <span class="mr-1 text-caption text-sm-subtitle-2">{{ match.team2 }}</span>
                            <v-img :src="match.logo2" max-width="24" max-height="24" contain></v-img>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-card>

                    <!-- PARTITE NON CONCLUSE -->
                    <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                        <v-card-title class="custom-title justify-center">Prossime Partite</v-card-title>
                        <v-container class="pa-4 pt-2">
                            <v-row
                            v-for="(match, index) in matchesNonConcluse"
                            :key="match.id_match"
                            class="mb-4"
                            no-gutters
                            >
                            <!-- Riga 1: Data e ora -->
                            <v-col cols="12" class="text-center text-subtitle-2 mb-1">
                                 {{ match.date }} &nbsp;  {{ match.time }}
                            </v-col>

                            <!-- Riga 2: Squadre -->
                            <v-col cols="5" class="d-flex align-center justify-end">
                                <v-img :src="match.logo1" max-width="24" max-height="24" class="mr-1" contain></v-img>
                                <span class="text-caption text-sm-subtitle-2">{{ match.team1 }}</span>
                            </v-col>

                            <v-col cols="2" class="text-center text-caption font-weight-bold">vs</v-col>

                            <v-col cols="5" class="d-flex align-center justify-start">
                                <span class="text-caption text-sm-subtitle-2 mr-1">{{ match.team2 }}</span>
                                <v-img :src="match.logo2" max-width="24" max-height="24" contain></v-img>
                            </v-col>
                            </v-row>
                        </v-container>
                        </v-card>

                        <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                            <v-card-title class="custom-title justify-center">Fasi Finali</v-card-title>

                            <v-list dense dark class="py-2" style="background-color: rgba(0, 0, 0, 0.2);">
                                <v-list-item  v-if="momentoSalvato === 'classifica' || momentoSalvato === 'prima'">
                                <v-list-item-content>
                                    <v-list-item-title class="text-center text-caption grey--text text--lighten-3">PLAYOFF</v-list-item-title>
                                    <v-list-item-subtitle class="text-center text-caption grey--text text--lighten-1">Sabato 20:45 - Domenica 16:30</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="momentoSalvato === 'classifica' || momentoSalvato === 'playoff' || momentoSalvato === 'prima'">
                                <v-list-item-content>
                                    <v-list-item-title class="text-center text-caption grey--text text--lighten-3">QUARTI DI FINALE</v-list-item-title>
                                    <v-list-item-subtitle class="text-center text-caption grey--text text--lighten-1">Domenica 17:30 - 19:45</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="momentoSalvato === 'playoff' || momentoSalvato === 'quarti' || momentoSalvato === 'classifica' || momentoSalvato === 'prima'">
                                <v-list-item-content>
                                    <v-list-item-title class="text-center text-caption grey--text text--lighten-3">SEMIFINALI</v-list-item-title>
                                    <v-list-item-subtitle class="text-center text-caption grey--text text--lighten-1">Domenica 20:45 - 21:30</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="momentoSalvato !== 'finale'">
                                <v-list-item-content>
                                    <v-list-item-title class="text-center text-caption grey--text text--lighten-3">FINALE</v-list-item-title>
                                    <v-list-item-subtitle class="text-center text-caption grey--text text--lighten-1">Domenica 22:30</v-list-item-subtitle>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</div>
    `,
data() {
        return {
        partite: [],
        goal: [],
        squadreByName: {},
        squadre: [],
        matchesConcluse: [],
        matchesNonConcluse: [],
        momentoSalvato: '',
        partiteFiltrate : [],
        // Definisci i momenti del
        momentiTorneo:[
            '0',
         'prima',
        'classifica',
        'playoff',
        'quarti',
        'semi' ,
        'finali'],
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
        }, 

        caricaSquadreDB() {
            fetch('/api/getTeams.php?action=load')
                .then(response => response.json())
                .then(json => {
                if(json.success) {
                    this.squadre = json.squadre;
                    this.squadreByName = {};
                    this.squadre.forEach(team => {
                    this.squadreByName[team.name] = team;
                    });
                    console.log('Squadre caricate:', this.squadre);
                    // Dopo aver caricato le squadre carico le partite
                    this.caricaPartiteDB();
                } else {
                    console.error('Errore caricamento squadre:', json);
                }
                })
                .catch(err => {
                console.error('Errore fetch squadre:', err);
                });
        },

        caricaPartiteDB() {
            fetch('/api/getMatches.php')
                .then(response => response.json())
                .then(data => {
                    const now = new Date();
                    this.partite = data.map(match => {
                    const dateObj = new Date(match.date);
                    const day = dateObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
                    const time = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                    return {
                        id_match: match.id_match,
                        day,
                        time,
                        cod_team1: match.cod_team1,  // mantieni "team1"
                        cod_team2: match.cod_team2, 
                        team1: match.team1,  // mantieni "team1"
                        team2: match.team2,   // mantieni "team2"
                        ended: match.ended,
                        dateObj,
                        stato: match.stato // aggiungi l'oggetto Date per il confronto
                    };
                    
                });
                
            })
            .catch(err => {
                console.error('Errore caricamento partite:', err);
            });
        },

        getNomeSquadra(cod_team) {
            const squadra = this.squadre.find(s => s.id_team === cod_team);
            return squadra ? squadra.name : 'Nessuna Squadra';
        },

        elaboraPartite() {
            console.log('Elaborazione partite...');
            console.log('Partite:', this.partite);
            console.log('Squadre:', this.squadre);
            console.log('Goal:', this.goal);

            this.partiteFiltrate  = this.partite.filter(match => this.momentiTorneo[match.stato] === this.momentoSalvato);
            
            this.matchesConcluse = [];
            this.matchesNonConcluse = [];

            this.partiteFiltrate .forEach(match => {
                const date = match.dateObj;
                const isEnded = Number(match.ended);
                const team1 = match.cod_team1;
                const team2 = match.cod_team2;
                console.log(`Elaborando partita: ${match.id_match}, Squadra 1: ${team1}, Squadra 2: ${team2}, Data: ${date}, Conclusa: ${isEnded}`);
                if (isEnded === 1) {
                    const goalsMatch = this.goal.filter(g => g.cod_match === match.id_match);

                    let scoreTeam1 = 0;
                    let scoreTeam2 = 0;

                    goalsMatch.forEach(g => {
                        const double = String(g.doubleScore) === "1"; // confronto esplicito
                        const score = double ? 2 : 1;

                        if (g.cod_team === team1) {
                            scoreTeam1 += score;
                        } else if (g.cod_team === team2) {
                            scoreTeam2 += score;
                        }
                    });

                    this.matchesConcluse.push({
                        id_match: match.id_match,
                        team1: this.getTeamName(team1),
                        team2: this.getTeamName(team2),
                        logo1: this.getTeamLogo(team1),
                        logo2: this.getTeamLogo(team2),
                        score1: scoreTeam1,
                        score2: scoreTeam2,
                    });
                } else {
                    this.matchesNonConcluse.push({
                        id_match: match.id_match,
                        team1: this.getTeamName(team1),
                        team2: this.getTeamName(team2),
                        logo1: this.getTeamLogo(team1),
                        logo2: this.getTeamLogo(team2),
                        date: date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }),
                        time: date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
                    });
                }
            });
            console.log('Partite concluse:', this.matchesConcluse);
            console.log('Partite non concluse:', this.matchesNonConcluse);
        },

        getTeamName(cod_team) {
            const team = this.squadre.find(t => t.id_team === cod_team);
            return team ? team.name : '???';
        },

        getTeamLogo(cod_team) {
            const team = this.squadre.find(t => t.id_team === cod_team);
            return team ? team.logo_path : '';
        },

        caricaGoal() {
        fetch('/dashboard/api/goal.php?action=load')
            .then(response => response.json())
            .then(data => {
            if (data.success && data.goal) {
                const goalConNomi = data.goal.map(p => {
                // Cerca la partita corrispondente nell'array partite[]
                const partita = this.partite.find(partita => partita.cod_match === p.cod_match);

                // Estrai i nomi delle squadre dalla partita trovata
                const nome1 = partita ? this.getNomeSquadra(partita.cod_team1) : 'Sconosciuto';
                const nome2 = partita ? this.getNomeSquadra(partita.cod_team2) : 'Sconosciuto';

                return {
                    ...p,
                    nome_partita: `${nome1} - ${nome2}`
                };
                });

                this.goal = goalConNomi;
                console.log('Gol caricati dal DB:', this.goal);
            }
            })
            .catch(error => {
            console.error('Errore nel caricamento dei goal:', error);
            });
        },

        caricaMomento() {
            fetch('/dashboard/api/dashboard.php?action=load')
                .then(response => response.json())
                .then(data => {
                if (data.success && data.momento) {
                    if (this.momentiTorneo.includes(data.momento)) {
                    this.momentoSalvato = data.momento;
                    } else {
                    // Fallback se il momento dal DB non è valido
                    this.momentoSalvato = this.momentiTorneo[0]; // Imposta il primo momento come default
                    }
                    console.log('Momento caricato dal DB:', this.momentoSalvato);
                }
                })
                .catch(error => {
                console.error('Errore nel caricamento del momento:', error);
                });
        },
  }, 
   mounted() {
        this.caricaMomento();
        this.caricaSquadreDB();
        this.caricaGoal();
       setTimeout(() => {
        this.elaboraPartite();
        }, 300);
    }
}
  
