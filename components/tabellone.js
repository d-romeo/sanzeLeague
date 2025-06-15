// tabellone.js
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

            <!-- Contenitore principale per le partite -->
            <v-container fluid class="px-0" style="overflow-x: auto;">
                <v-row no-gutters justify="center">
                    <!-- Colonna: Playoff -->
                    <v-col cols="6" class="d-flex flex-column align-center pa-1">
                    <v-card-title class="text-center" style="color: white !important; font-size: 0.9rem;">
                        Playoff
                    </v-card-title>
                    <v-card
                        v-for="match in partite"
                        :key="match.id_match"
                        class="mt-3 pa-2 text-white text-center"
                        color="rgba(0, 0, 0, 0.7)"
                        dark
                        style="width: 100%; font-size: 0.7rem;"
                    >
                        <div class="d-flex justify-center align-center">
                        <v-img :src="getTeamLogo(match.cod_team1)" max-width="15" max-height="15" class="mr-1" />
                        <span :class="{'font-weight-bold': isWinner(match, match.cod_team1), 'winner-text': isWinner(match, match.cod_team1)}">
                            {{ getTeamName(match.cod_team1) }}
                        </span>
                        <span class="mx-1 grey--text">vs</span>
                        <span :class="{'font-weight-bold': isWinner(match, match.cod_team2), 'winner-text': isWinner(match, match.cod_team2)}">
                            {{ getTeamName(match.cod_team2) }}
                        </span>
                        <v-img :src="getTeamLogo(match.cod_team2)" max-width="15" max-height="15" class="ml-1" />
                        </div>
                        <div v-if="match.ended == 1" class="mt-1">
                        {{ getScore(match.id_match, match.cod_team1) }} - {{ getScore(match.id_match, match.cod_team2) }}
                        </div>
                        <div v-else class="grey--text mt-1">
                        Ore: {{ match.time }}
                        </div>
                    </v-card>
                    </v-col>

                    <!-- Colonna: Quarti di finale -->
                    <v-col cols="6" class="d-flex flex-column align-center pa-1" style="margin-top: 70px;">
                    <v-card-title class="text-center" style="color: white !important; font-size: 0.9rem;">
                        Quarti
                    </v-card-title>
                    <v-card
                        v-for="(quarto, index) in quarti"
                        :key="'quarto-' + index"
                        class="mt-3 pa-2 text-white text-center"
                        color="rgba(0, 0, 0, 0.7)"
                        dark
                        style="width: 100%; font-size: 0.7rem;"
                    >
                        <div class="d-flex justify-center align-center">
                        <template v-if="quarto.team1 && quarto.team2">
                            <v-img :src="quarto.team1.logo_path" max-width="15" max-height="15" class="mr-1" />
                            <span :class="{'font-weight-bold': isWinnerQuarto(quarto, quarto.team1)}">
                            {{ quarto.team1.name }}
                            </span>
                            <span class="mx-1 grey--text">vs</span>
                            <span :class="{'font-weight-bold': isWinnerQuarto(quarto, quarto.team2)}">
                            {{ quarto.team2.name }}
                            </span>
                            <v-img :src="quarto.team2.logo_path" max-width="15" max-height="15" class="ml-1" />
                        </template>
                        <template v-else>
                            <span class="grey--text">In attesa risultati</span>
                        </template>
                        </div>
                        <div class="mt-1 grey--text">
                        Ore: {{ formatTime(quarto.data) }}
                        </div>
                    </v-card>
                    </v-col>
                </v-row>
                </v-container>
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
            squadreDirette: [],
        };
    },
    computed: {
        vincitoriPlayoff() {
            return this.partite
                .filter(p => p.ended == 1)
                .map(p => {
                    const score1 = this.getScore(p.id_match, p.cod_team1);
                    const score2 = this.getScore(p.id_match, p.cod_team2);
                    return score1 > score2
                        ? this.squadre.find(t => t.id_team === p.cod_team1)
                        : this.squadre.find(t => t.id_team === p.cod_team2);
                });
        },
        quarti() {
            const v = this.vincitoriPlayoff;
            const d = this.squadreDirette;
            return [
                { team1: v[0], team2: v[1], data: "2025-06-29T17:30:00" }, // vincitori partite 0 e 1
                { team1: v[2], team2: v[3], data: "2025-06-29T18:15:00" }, // vincitori partite 2 e 3
                { team1: v[4], team2: d[1], data: "2025-06-29T19:00:00" }, // vincitore partita 4 vs seconda classificata
                { team1: v[5], team2: d[0], data: "2025-06-29T19:45:00" }  // vincitore partita 5 vs prima classificata
            ];
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        caricaSquadreDB() {
            fetch('/api/getTeams.php?action=load')
                .then(response => response.json())
                .then(json => {
                    if (json.success) {
                        this.squadre = json.squadre;
                        this.squadreByName = {};
                        this.squadre.forEach(team => {
                            this.squadreByName[team.name] = team;
                        });
                        console.log('Squadre caricate:', this.squadre);
                        this.caricaPartiteDB();
                    } else {
                        console.error('Errore caricamento squadre:', json);
                    }
                })
                .catch(err => {
                    console.error('Errore fetch squadre:', err);
                });
        },
        formatTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        },
        caricaPartiteDB() {
            fetch('/api/getMatches.php')
                .then(response => response.json())
                .then(data => {
                    this.partite = data
                        .filter(match => match.stato === '3')
                        .map(match => {
                            const dateObj = new Date(match.date);
                            const day = dateObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
                            const time = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                            return {
                                id_match: match.id_match,
                                day,
                                time,
                                cod_team1: match.cod_team1,
                                cod_team2: match.cod_team2,
                                team1: match.team1,
                                team2: match.team2,
                                ended: match.ended,
                                dateObj
                            };
                        });
                })
                .catch(err => {
                    console.error('Errore caricamento partite:', err);
                });
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
                            const partita = this.partite.find(partita => partita.cod_match === p.cod_match);
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
        getScore(matchId, teamId) {
            const goalsMatch = this.goal.filter(g => g.cod_match === matchId);
            return goalsMatch
                .filter(g => g.cod_team === teamId)
                .reduce((score, g) => score + (g.doubleScore == 1 ? 2 : 1), 0);
        },
        getWinner(match) {
            const score1 = this.getScore(match.id_match, match.cod_team1);
            const score2 = this.getScore(match.id_match, match.cod_team2);

            if (score1 > score2) return match.cod_team1;
            if (score2 > score1) return match.cod_team2;
            return null; // pareggio o errore
        },
        isWinner(match, teamId) {
            return this.getWinner(match) === teamId;
        },
        isWinnerQuarto(quarto, team) {
            // Implementa la logica per determinare il vincitore nei quarti
            // Questo è un placeholder, dovrai implementare la logica specifica
            return false;
        },
        caricaClassificaDB() {
            fetch('/api/getRank.php?action=load')
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.squadreDirette = data.classifica.filter(squadra => squadra.id_rank <= 2);
                        console.log('Prime due squadre caricate con successo:', this.squadreDirette);
                    } else {
                        console.error('Errore dal server:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Errore nella richiesta classifica:', error);
                });
        },
    },
    mounted() {
        this.caricaSquadreDB();
        this.caricaGoal();
        this.caricaClassificaDB();
    }
};
  
