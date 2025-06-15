export default {
    template:`
<v-app>
  <v-main>
    <v-container>
      <v-btn color="primary" @click="$router.go(-1)" class="mb-4">
        <v-icon left>mdi-arrow-left</v-icon> BACK
      </v-btn>

      <v-card class="pa-4" elevation="10" dark>
        <v-row>
          <v-col cols="12" md="4" class="text-center">
            <v-img :src="squadra.logo_path" contain max-width="150" class="mb-2 mx-auto"></v-img>
            <h2>{{ squadra.name }}</h2>
          </v-col>

          <v-col cols="12" md="8">
            <v-list two-line>
              <v-list-item>
                <v-list-item-icon><v-icon>mdi-account-tie</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Presidente</v-list-item-title>
                  <v-list-item-subtitle>{{ presidente }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon><v-icon>mdi-whistle</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Allenatore</v-list-item-title>
                  <v-list-item-subtitle>{{ allenatore }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mt-6 pa-4" dark>
        <h3 class="mb-4">Rosa</h3>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="3"
            v-for="(giocatore, index) in giocatori"
            :key="giocatore.id_user"
          >
            <v-card outlined class="pa-4 d-flex align-center" style="min-height: 110px;">
              <div class="player-image-container">
                <v-img
                  :src="'/image/player/' + ((index % 6) + 1) + '.png'"
                  class="player-image"
                ></v-img>
              </div>
              <div>
                <div class="text-h6 mb-1">{{ giocatore.name }} {{ giocatore.surname }}</div>
                <div class="text-caption">#{{ giocatore.id_user }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-main>
</v-app>
  `,
  data() {
    return {
      squadra: {},
      presidente: '',
      allenatore: '',
      giocatori: []
    };
  },
  created() {
    const id = this.$route.params.id;

    // Carica dettagli squadra (nome/logo)
    fetch(`/api/getTeams.php?action=details&id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.squadra = data.squadra;
        }
      });

    // Carica giocatori, presidente e coach
    fetch(`/api/getTeams.php?action=players&id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const users = data.players;
          this.giocatori = users.filter(u => u.type == 2); // solo giocatori
          const pres = users.find(u => u.type == 1);
          const coach = users.find(u => u.type == 3);
          this.presidente = pres ? `${pres.name} ${pres.surname}` : 'Non disponibile';
          this.allenatore = coach ? `${coach.name} ${coach.surname}` : 'Non disponibile';
        }
      });
  }
};
