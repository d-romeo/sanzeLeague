export default {
    template: `
<div id="app" style="display: flex; flex-direction: column; min-height: 100vh;">
    <v-app style="flex: 1 0 auto;">
      <v-container> 
        <v-container fluid class="pa-2">
          <v-carousel cycle height ="auto" hide-delimiter-background show-arrows-on-hover>
            <v-carousel-item>
              <v-img src="/sanze/image/didit-remove.png" class="responsive-image" cover></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img src="/sanze/image/sanze-remove.png" class="responsive-image" cover></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-container>

        <!-- Cards -->
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <v-card class="pa-6 clickable zoom-card" style="background-color:rgba(255, 255, 255, 0.5); " @click="goToWhen" hover ripple>
                <v-container class="text-center">
                  <v-row justify="center" align="center">
                    <v-col cols="12">
                      <v-img
                        src="/sanze/image/banner/desk-banner-quando1.png"
                        max-width="400"
                        max-height="150"
                        class="mx-auto"
                        contain
                        ></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12">
              <v-card class="pa-6 clickable zoom-card" style="background-color: rgba(255, 255, 255, 0.5); " @click="goToRegulation" hover ripple>
                <v-container class="text-center">
                  <v-row justify="center" align="center">
                    <v-col cols="12">
                      <v-img
                        src="/sanze/image/banner/desk-banner-regole.png"
                        max-width="400"
                        max-height="150"
                        class="mx-auto"
                        contain
                        ></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12">
              <v-card class="pa-6 clickable zoom-card" style="background-color: rgba(255, 255, 255, 0.5); " @click="goToTeams" hover ripple>
                <v-container class="text-center">
                  <v-row justify="center" align="center">
                    <v-col cols="12">
                      <v-img
                        src="/sanze/image/banner/desk-banner-teams.png"
                        max-width="400"
                        max-height="150"
                        class="mx-auto"
                        contain
                        ></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container> 
    
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