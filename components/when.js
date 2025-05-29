// rank.js
export default {
    template: `
<v-app>
    <v-main>
        <v-container>
            <v-row justify="center">
                <v-col cols="12">
                    <v-btn color="primary" @click="goBack" class="mb-4">
                        <v-icon left>mdi-arrow-left</v-icon>
                        Back
                    </v-btn>

                    <!-- Giornate -->
                    <v-card v-for="(giornata, index) in giornate" :key="index" class="mb-4" color="rgba(0, 0, 0, 0.7)">
                        <v-card-title class="custom-title justify-center">{{ giornata.titolo }}</v-card-title>
                        <v-list dark>
                            <v-list-item v-for="(scontro, sindex) in giornata.scontri" :key="sindex">
                                <v-list-item-content>
                                    <v-list-item-title class="text-center">
                                        {{ scontro.team1 }} vs {{ scontro.team2 }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="text-center">{{ formatDate(scontro.date) }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>

                    <!-- Fasi Finali -->
                    <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)">
                        <v-card-title class="custom-title justify-center">FASE FINALI</v-card-title>
                        <v-list dark>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center">PLAYOFF</v-list-item-title>
                                    <v-list-item-subtitle class="text-center">Sabato 20:45 - Domenica 16:30</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center">QUARTI DI FINALE</v-list-item-title>
                                    <v-list-item-subtitle class="text-center">Domenica 17:30 - 19:45</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center">SEMIFINALI</v-list-item-title>
                                    <v-list-item-subtitle class="text-center">Domenica 20:45 - 21:30</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center">FINALE</v-list-item-title>
                                    <v-list-item-subtitle class="text-center">Domenica 22:30</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="primary" dark padless>
        <v-container class="text-center">
            <v-img
                src="/sanze/image/title.png"
                contain
                max-width="160"
                class="mx-auto"
            ></v-img>
        </v-container>
    </v-footer>
</v-app>

    `,
 data() {
        return {
            giornate: []
        };
    },
    methods: {
        formatDate(dateString) {
            const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
            const date = new Date(dateString);
            return date.toLocaleDateString('it-IT', options);
        },
        fetchMatches() {
            fetch('/sanze/api/getMatches.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dati ricevuti:', data); // Log per debug
                    this.giornate = this.groupMatchesByDay(data);
                })
                .catch(error => {
                    console.error('Errore nel recupero dei dati:', error);
                });
        },
        groupMatchesByDay(matches) {
          const giornateMap = {};

          matches.forEach(match => {
              const date = new Date(match.date);
              const dayKey = date.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

              if (!giornateMap[dayKey]) {
                  giornateMap[dayKey] = {
                      titolo: dayKey.toUpperCase(), // Converti il titolo in maiuscolo
                      scontri: []
                  };
              }

              giornateMap[dayKey].scontri.push(match);
          });

          return Object.values(giornateMap);
          },
          goBack() {
            this.$router.go(-1); 
            }
        },
         
    mounted() {
        this.fetchMatches();
    }
}
      