// live.js
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
                    <v-container class="pa-4 pt-2">
                    <!-- LIVE -->
                    <v-row justify="center" v-if="liveMatchData">
                        <v-col cols="12">
                        <v-container>
                            <!-- LIVE Icona -->
                            <v-row class="mb-2" justify="center" align="center">
                            <v-icon color="red" size="40">mdi-play-circle</v-icon>
                            <span class="ml-2 text-h6 font-weight-bold">LIVE</span>
                            </v-row>

                            <!-- SCOREBOARD -->
                            <v-row class="mb-2" align="center" justify="center">
                            <v-col cols="2" class="d-flex justify-end align-center">
                                <img :src="liveMatchData.team1.logo" class="player-img" />
                            </v-col>

                            <v-col cols="2" class="text-center">
                                <div class="score-text">{{ liveMatchData.score.team1_goals }}</div>
                                <div class="text-subtitle-1 font-weight-bold d-none d-md-flex justify-center text-center">
                                {{ liveMatchData.team1.name }}
                                </div>
                            </v-col>

                            <v-col cols="1" class="text-center score-text">-</v-col>

                            <v-col cols="2" class="text-center">
                                <div class="score-text">{{ liveMatchData.score.team2_goals }}</div>
                                <div class="text-subtitle-1 font-weight-bold d-none d-md-flex justify-center text-center">
                                    {{ liveMatchData.team2.name }}
                                </div>
                            </v-col>

                            <v-col cols="2" class="d-flex justify-start align-center">
                                <img :src="liveMatchData.team2.logo" class="player-img" />
                            </v-col>
                            </v-row>

                           <!-- MARCATORI -->
                            <v-row class="mt-3">
                                <v-col cols="6">
                                    <div class="text-subtitle-2 font-italic text-center">
                                    <strong>Marcatori {{ liveMatchData.team1.name }}:</strong><br>
                                    <div v-if="liveMatchData.scorersList.team1.length">
                                        <div
                                        v-for="(scorer, i) in liveMatchData.scorersList.team1"
                                        :key="i"
                                        >
                                        {{ scorer }}
                                        </div>
                                    </div>
                                    <div v-else>-</div>
                                    </div>
                                </v-col>

                                <v-col cols="6">
                                    <div class="text-subtitle-2 font-italic text-center">
                                    <strong>Marcatori {{ liveMatchData.team2.name }}:</strong><br>
                                    <div v-if="liveMatchData.scorersList.team2.length">
                                        <div
                                        v-for="(scorer, i) in liveMatchData.scorersList.team2"
                                        :key="i"
                                        >
                                        {{ scorer }}
                                        </div>
                                    </div>
                                    <div v-else>-</div>
                                    </div>
                                </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>

                    <!-- Nessuna live -->
                    <v-row justify="center" v-else>
                        <v-col cols="12" class="text-center">
                        <span v-if="loadingLive">Caricamento partita live...</span>
                        <span v-else>Non ci sono partite in live</span>
                        <span v-if="errorLive" class="error--text">Errore: {{ errorLive }}</span>
                        </v-col>
                    </v-row>
                    </v-container>
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
            liveMatchData: null,
            loadingLive: false,
            errorLive: null,
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
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
  }, 
   mounted() {
        this.loadLiveMatch();
    }
}
  
