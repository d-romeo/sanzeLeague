export default {
    template: `
<div id="app" style="display: flex; flex-direction: column; min-height: 100vh;">
    <v-app style="flex: 1 0 auto;">
      <v-container> 
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

        <!-- Cards -->
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
                <v-card class="pa-6 zoom-card" style="background-color: rgba(0, 0, 0, 0.7);" @click="goToWhen"  hover ripple dark>
                <v-container class="pa-0">

                <!-- TITOLO -->
                    <v-row no-gutters class="mb-4">
                        <v-col cols="12" class="text-center text-h5 font-weight-bold">
                            Quando
                        </v-col>
                        <v-col cols="12" class="text-center text-subtitle-1">
                            23 - 29 Giugno 2025
                        </v-col>
                    </v-row>
                    
                <!-- FOOTER -->
                <v-row no-gutters>
                <v-col cols="12" class="text-center mt-4">
                    <span class="text-caption font-italic" style="color: #333;">
                    Clicca per visualizzare il programma
                    </span>
                </v-col>
                </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12">
                <v-card class="pa-6 zoom-card" style="background-color: rgba(0, 0, 0, 0.7);" @click="goToRegulation"  hover ripple dark>
                <v-container class="pa-0">

                <!-- TITOLO -->
                <v-row no-gutters class="mb-4">
                    <v-col cols="12" class="text-center text-h6 font-weight-bold">
                    Le Regole
                    </v-col>
                </v-row>
                    
                    <!-- FOOTER -->
                <v-row no-gutters>
                <v-col cols="12" class="text-center mt-4">
                    <span class="text-caption font-italic" style="color: #333;">
                    Clicca per visualizzare le regole
                    </span>
                </v-col>
                </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12">
                <v-card class="pa-6 zoom-card" style="background-color: rgba(0, 0, 0, 0.7);" @click="goToTeams"  hover ripple dark>
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
      </v-container> 
    </v-app>
</div>
  `,
    data() {
        return {};
    },
    methods: {
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