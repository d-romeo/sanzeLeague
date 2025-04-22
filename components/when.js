// rank.js
export default {
    template: `
<v-app>
    <!-- HEADER -->
    <v-app-bar color="primary">
        <v-toolbar-title class="custom-title">Sanze League</v-toolbar-title>
    </v-app-bar>

  <v-container>
    <v-row>
      <v-col
        v-for="(player, index) in players"
        :key="index"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card class="pa-4" hover>
          <v-row>
            <v-col cols="12" class="text-left">
              <strong>{{ player.player }}</strong>
            </v-col>
            <v-col cols="12" class="text-right">
              {{ player.score }} pts
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- FOOTER -->
    <v-footer color="primary" dark>
        <v-container class="text-center">
            <span>&copy; 2025 - Sanze League</span>
        </v-container>
    </v-footer>
</v-app>
    `,
data() {
    return {
       players: [
        { position: 1, player: 'Player 1', score: 100 },
        { position: 2, player: 'Player 2', score: 90 },
        { position: 3, player: 'Player 3', score: 85 },
        { position: 4, player: 'Player 4', score: 80 },
        // Aggiungi altri giocatori
      ],
    };
  }
}
  
