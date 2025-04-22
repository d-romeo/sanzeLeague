export default {
       template: `
  <div id="app">
      <v-app>
          <!-- HEADER -->
          <v-app-bar color="primary">
              <v-toolbar-title class="custom-title">Sanze League</v-toolbar-title>
          </v-app-bar>

          <v-container>
              <!-- CAROSELLO -->
                  <v-container fluid class="pa-2">
                      <!-- Carosello principale -->
                      <v-carousel
                      cycle
                      height=auto
                      hide-delimiter-background
                      show-arrows-on-hover
                      >
                      <!-- Prima immagine -->
                      <v-carousel-item>
                          <v-img
                          src="/image/sanze-remove.png"
                          class="responsive-image"
                          cover
                          ></v-img>
                      </v-carousel-item>

                      <!-- Seconda immagine -->
                      <v-carousel-item>
                          <v-img
                          src="/image/didit-remove.png"
                          class="responsive-image"
                          cover
                          ></v-img>
                      </v-carousel-item>
                      </v-carousel>
                  </v-container>
          
          <v-container>
              <v-row justify="center">
                  <v-col cols="12">
                      <v-card class="pa-2 clickable zoom-card" color="accent" @click="goToWhen" hover ripple>
                          <v-container> QUANDO </v-container>
                      </v-card>
                  </v-col>
              </v-row>

              <!-- REGOLAMENTO -->
              <v-row justify="center">
                  <v-col cols="12">
                      <v-card class="pa-16 clickable zoom-card" color="accent" @click="goToRegulation" hover ripple>
                          <v-container>
                             REGOLAMENTO
                          </v-container>
                          </v-card>
                  </v-col>
              </v-row>

               <!-- TEAM -->
              <v-row justify="center">
                  <v-col cols="12">
                      <v-card class="pa-16 clickable zoom-card" color="accent" @click="goToTeams" hover ripple>
                          <v-container>
                              TEAM
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
  </div>
  `,
    data() {
        return {};
    },
    methods: {
        handleClick() {
            alert("Hai cliccato sulla card!");
          }, 
          goToWhen() {
            this.$router.push('/when');
          },
          goToRegulation() {
            this.$router.push('/regulation');
          },
          goToTeams() {
            this.$router.push('/teams');
          }
    }
};