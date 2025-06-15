export default {
    template: `
<div id="app" style="display: flex; flex-direction: column; min-height: 100vh;">
<v-app>            
    <v-container>
        <!-- CAROSELLO -->
        <v-container fluid class="pa-2">
          <v-carousel cycle height ="auto" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item>
              <v-img src="/image/didit-remove.png" class="responsive-image" cover></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img src="/image/sanze-remove.png" class="responsive-image" cover></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-container>

        <!-- LIVE -->
     <v-row justify="center" v-if="liveMatchData">
        <v-col cols="12">
              <v-card
                class="pa-2 clickable zoom-card"
                style="background-color: rgba(0, 0, 0, 0.7);"
                @click="goToLive"
                hover
                ripple
                dark
              >
            <v-container>
                <!-- RIGA LIVE ICON -->
                <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4" class="d-flex justify-center align-center">
                    <v-icon color="red" size="40">mdi-play-circle</v-icon>
                    <span class="ml-2 font-weight-bold">LIVE</span>
                </v-col>
                <v-col cols="4"></v-col>
                </v-row>

                <!-- RIGA SCORE -->
                <v-row>
                <v-col class="d-flex justify-end align-center">
                    <img :src="liveMatchData.team1.logo" class="player-img" />
                </v-col>

                <v-col cols="2.4" class="d-flex justify-center align-center score-text">
                    {{ liveMatchData.score.team1_goals }}
                </v-col>

                <v-col cols="2.4" class="d-flex justify-center align-center score-text">
                    -
                </v-col>

                <v-col cols="2.4" class="d-flex justify-center align-center score-text">
                    {{ liveMatchData.score.team2_goals }}
                </v-col>

                <v-col class="d-flex justify-start align-center">
                    <img :src="liveMatchData.team2.logo" class="player-img" />
                </v-col>
                </v-row>

                <!-- FOOTER -->
                <v-row no-gutters>
                <v-col cols="12" class="text-center mt-4">
                    <span class="text-caption font-italic" style="color: #333;">
                    Clicca per seguire la partita
                    </span>
                </v-col>
                </v-row>
            </v-container>
            </v-card>
        </v-col>
        </v-row>



        <!-- tabellone -->
        <v-row justify="center">
            <v-col cols="12">
                <v-card class="pa-6 zoom-card" style="background-color: rgba(0, 0, 0, 0.7);" @click="goToTabellone"  hover ripple dark>
                <v-container class="pa-0">

                <!-- TITOLO -->
                <v-row no-gutters class="mb-4">
                    <v-col cols="12" class="text-center text-h6 font-weight-bold">
                    Tabellone Quarti di Finale
                    </v-col>
                </v-row>
                    
                    <!-- FOOTER -->
                <v-row no-gutters>
                <v-col cols="12" class="text-center mt-4">
                    <span class="text-caption font-italic" style="color: #333;">
                    Clicca per guardare la classifica completa
                    </span>
                </v-col>
                </v-row>

                </v-container>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-card class="pa-6 zoom-card" style="background-color: rgba(0, 0, 0, 0.7);" @click="goToMatches" hover ripple dark>
              <v-container class="pa-0">
                <!-- TITOLO -->
                <v-row no-gutters class="mb-4">
                  <v-col cols="12" class="text-center text-h6 font-weight-bold">
                    Prossimi Incontri
                  </v-col>
                </v-row>

                <!-- MATCHES (solo i prossimi 2) -->
                <v-row
                  v-for="(match, index) in nextMatches.slice(0, 2)"
                  :key="match.id_match"
                  class="align-center mb-4"
                  no-gutters
                >
                  <v-col cols="12" class="text-center text-subtitle-2 font-weight-medium mb-2">
                    {{ match.day }} - {{ match.time }}
                  </v-col>

                  <v-col cols="12" class="d-flex justify-center align-center">
                    <v-img
                      :src="squadreByName[match.team1]?.logo_path || ''"
                      max-width="36"
                      max-height="36"
                      class="mr-2"
                    />
                    <span class="text-subtitle-1 font-weight-medium mr-2">
                      {{ squadreByName[match.team1]?.name || match.team1 }}
                    </span>
                    <span class="mx-2 font-weight-bold">vs</span>
                    <span class="text-subtitle-1 font-weight-medium ml-2">
                      {{ squadreByName[match.team2]?.name || match.team2 }}
                    </span>
                    <v-img
                      :src="squadreByName[match.team2]?.logo_path || ''"
                      max-width="36"
                      max-height="36"
                      class="ml-2"
                    />
                  </v-col>
                </v-row>

                <!-- FOOTER -->
                <v-row no-gutters>
                  <v-col cols="12" class="text-center mt-4">
                    <span class="text-caption font-italic" style="color: #333;">
                      Clicca per scoprire il programma
                    </span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <v-card class="pa-6 zoom-card" style="background-color: rgba(0, 0, 0, 0.7);" @click="goToStats"  hover ripple dark>
                    <v-container class="pa-0">
                        <v-row no-gutters class="mb-4">
                            <v-col cols="12" class="text-center text-h6 font-weight-bold">
                            Le Statistiche
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                        <v-col cols="12" class="text-center mt-4">
                            <span class="text-caption font-italic" style="color: #333;">
                            Clicca per visualizzare le statistiche del torneo
                            </span>
                        </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col cols="12">
                <v-card class="pa-6 zoom-card" style="background-color: rgba(0, 0, 0, 0.7);" @click="goToTabellone"  hover ripple dark>
                <v-container class="pa-0">

                <!-- TITOLO -->
                <v-row no-gutters class="mb-4">
                    <v-col cols="12" class="text-center text-h6 font-weight-bold">
                    Le Squadre
                    </v-col>
                </v-row>
                    
                    <!-- FOOTER -->
                <v-row no-gutters>
                <v-col cols="12" class="text-center mt-4">
                    <span class="text-caption font-italic" style="color: #333;">
                    Clicca per visualizzare le squadre
                    </span>
                </v-col>
                </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
<router-view></router-view> 
</v-container>
</v-app>
</div>
    `,
    data() {
        return {
          classificaDB: [],
          squadreByName: {},
          nextMatches: [],

          liveMatchData: null,
          loadingLive: false,
          errorLive: null,
        }
      },       
    methods: {
        caricaClassificaDB() {
            fetch('/api/getRank.php?action=load')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                this.classificaDB = data.classifica;
                } else {
                console.error('Errore dal server:', data.error);
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta classifica:', error);
            });
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
                this.nextMatches = data.map(match => {
                const dateObj = new Date(match.date);
                const day = dateObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
                const time = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                return {
                    id_match: match.id_match,
                    day,
                    time,
                    team1: match.team1,
                    team2: match.team2,
                    ended: match.ended,
                    dateObj,
                    stato:match.stato
                };
                });

                this.nextMatches = this.nextMatches.filter(match => match.dateObj > now && match.stato === '4');
            })
            .catch(err => {
                console.error('Errore caricamento partite:', err);
            });
        },

        loadLiveMatch() {
            this.loadingLive = true;
            fetch('/dashboard/api/live.php?action=getLiveMatchData')
            .then(res => res.json())
            .then(data => {
                this.loadingLive = false;
                if (data.success) {
                this.liveMatchData = data.liveMatch;
                } else {
                this.errorLive = data.error;
                }
            })
            .catch(err => {
                this.loadingLive = false;
                this.errorLive = err.message;
            });
        },
        goToRank() {
            this.$router.push('/rank');
        }, 
        goToTeams() {
            this.$router.push('/teams');
        },
        goToLive() {
            this.$router.push('/live');
        },
        goToTabellone() {
            this.$router.push('/tabellonequarti');
        },
        goToRegulation() {
            this.$router.push('/regulation');
        },
        goToMatches() {
            this.$router.push('/matches');
        },
        goToStats() {
            this.$router.push('/stats');
        }
    }, 
    mounted() {
        this.loadLiveMatch();
        this.caricaClassificaDB();
        this.caricaSquadreDB();
        setInterval(this.caricaClassificaDB, 20000);
        setInterval(this.loadLiveMatch, 20000);
        setInterval(this.caricaSquadreDB, 20000);
    }
};