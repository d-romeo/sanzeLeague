export default {
  name: 'RosaSquadra',
  template: `
<v-app>
  <v-main>
    <v-container>
      <v-btn color="primary" class="mb-4" @click="$router.go(-1)">
        <v-icon left>mdi-arrow-left</v-icon> Torna Indietro
      </v-btn>

      <v-card class="pa-4" outlined>
        <v-row align="center">
          <v-col cols="12" md="4" class="text-center">
            <v-img :src="team.logo_path" contain height="100"></v-img>
            <h2>{{ team.name }}</h2>
          </v-col>
          <v-col cols="12" md="8">
            <p><strong>Presidente:</strong> {{ team.president }}</p>
            <p><strong>Allenatore:</strong> {{ team.coach }}</p>
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <h3 class="text-center mb-4">Rosa Giocatori</h3>

        <v-row class="text-center" justify="center">
          <v-col cols="6" sm="3" v-for="giocatore in giocatori" :key="giocatore.id">
            <v-card class="pa-2" outlined>
              <v-icon size="36" color="green">mdi-account</v-icon>
              <div>{{ giocatore.name }}</div>
              <small>{{ giocatore.role }}</small>
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
      team: {},
      giocatori: []
    }
  },
  methods: {
    caricaDati() {
      const id = this.$route.params.id;

      try {
        fetch('/api/getTeams.php?action=details&id=' + this.$route.params.id)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.squadra = data.squadra;
            } else {
                console.error(data.error);
            }
        });

        fetch('/api/getTeams.php?action=players&id=' + this.$route.params.id)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.giocatori = data.players;
            } else {
                console.error(data.error);
            }
        });
      } catch (e) {
        console.error('Errore caricamento rosa:', e);
      }
    }
  },
  created() {
    this.caricaDati();
  }
}
