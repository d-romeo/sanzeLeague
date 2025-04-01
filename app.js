new Vue({
    el: "#app",
    vuetify: new Vuetify({
      theme: {
        themes: {
          light: {
            primary: "#000000",  // 
            secondary: "#d0a349", // 
            accent: "#7f8185",    // 
            error: "#FF5252",     // Rosso
            info: "#2196F3",      // Azzurro
            success: "#4CAF50",   // Verde
            warning: "#FB8C00"    // Arancione
          },
          dark: {
            primary: "#90CAF9",
            secondary: "#F48FB1",
            accent: "#FFD54F",
            error: "#EF5350",
            info: "#64B5F6",
            success: "#81C784",
            warning: "#FFB74D"
          }
        }, 
        options: { customProperties: true } // Per usare i CSS Vars di Vuetify
      }
    }),
    methods: {
        handleClick() {
          alert("Hai cliccato sulla card!");
        }
    },
    template: `
        <v-app>
            <!-- HEADER -->
            <v-app-bar color="primary">
                <v-toolbar-title class="custom-title">Sanze League</v-toolbar-title>
            </v-app-bar>

            <!-- CONTENUTO PRINCIPALE -->
            <v-container>

                <!-- LIVE -->
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card class="pa-16 clickable zoom-card" color="accent" @click="handleClick" hover ripple>
                        <v-container>
                            <v-row>
                            <v-col cols="4">1</v-col>
                            <v-col cols="4">2</v-col>
                            <v-col cols="4">3</v-col>
                            </v-row>
                            <v-row>
                            <v-col cols="4">4</v-col>
                            <v-col cols="4">5</v-col>
                            <v-col cols="4">6</v-col>
                            </v-row>
                        </v-container>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- CLASSIFICA -->
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card class="pa-16 clickable zoom-card" color="accent" @click="handleClick" hover ripple>
                            <v-container>
                                <v-row>
                                <v-col cols="4">1</v-col>
                                <v-col cols="4">2</v-col>
                                <v-col cols="4">3</v-col>
                                </v-row>
                                <v-row>
                                <v-col cols="4">4</v-col>
                                <v-col cols="4">5</v-col>
                                <v-col cols="4">6</v-col>
                                </v-row>
                            </v-container>
                            </v-card>
                    </v-col>
                </v-row>

                 <!-- INCONTRI -->
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card class="pa-16 clickable zoom-card" color="accent" @click="handleClick" hover ripple>
                            <v-container>
                                <v-row>
                                <v-col cols="4">1</v-col>
                                <v-col cols="4">2</v-col>
                                <v-col cols="4">3</v-col>
                                </v-row>
                                <v-row>
                                <v-col cols="4">4</v-col>
                                <v-col cols="4">5</v-col>
                                <v-col cols="4">6</v-col>
                                </v-row>
                            </v-container>
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
    `
});
