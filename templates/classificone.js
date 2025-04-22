export default {
    template: `
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
                  
              <!-- LIVE -->
              <v-row justify="center">
                  <v-col cols="12">
                      <v-card
                          class="pa-2 clickable zoom-card"
                          style="background-color: rgba(255, 255, 255, 0.5);"
                          @click="handleClick"
                          hover
                          ripple
                      >
                          <v-container>
                              <v-row>
                                  <v-col cols="4"></v-col>
                                  <v-col cols="4" class="d-flex justify-center align-center">
                                      <v-icon color="red" size="40">mdi-play-circle</v-icon> LIVE
                                  </v-col>
                                  <v-col cols="4"></v-col>
                              </v-row>

                              <v-row>
                                  <v-col class="d-flex justify-end align-center">
                                      <img src="/image/fig02.png" class="player-img" />
                                  </v-col>
                                  <v-col cols="2.4" class="d-flex justify-center align-center score-text">1</v-col>
                                  <v-col cols="2.4" class="d-flex justify-center align-center score-text">-</v-col>
                                  <v-col cols="2.4" class="d-flex justify-center align-center score-text">3</v-col>
                                  <v-col class="d-flex justify-start align-center">
                                      <img src="/image/fig02.png" class="player-img" />
                                  </v-col>
                              </v-row>

                              <v-row>
                                  <v-col cols="2.4"></v-col>
                                  <v-col cols="2.4" class="d-flex justify-center align-center text-subtitle-1 font-italic">Gianni</v-col>
                                  <v-col cols="2.4"></v-col>
                                  <v-col cols="2.4" class="d-flex justify-center align-center text-subtitle-1 font-italic">Lorenzo</v-col>
                                  <v-col cols="2.4"></v-col>
                              </v-row>
                          </v-container>
                      </v-card>
                  </v-col>
              </v-row>

            <!-- CLASSIFICA -->
            <v-row justify="center">
                <v-col cols="12">
                    <v-card 
                    class="pa-6 clickable zoom-card"
                    style="background-color: rgba(255, 255, 255, 0.5);"
                    hover
                    ripple
                    @click="goToRank"
                    >
                    <v-container class="pa-0">

                    <!-- INTESTAZIONE -->
                    <v-row class="align-center font-weight-bold text-h6 mb-3" no-gutters>
                    <v-col cols="1" class="text-center">#</v-col>
                    <v-col cols="2"></v-col> <!-- Logo -->
                    <v-col cols="5">Squadra</v-col>
                    <v-col cols="2" class="text-center">Pt</v-col>
                    <v-col cols="2" class="text-center">DR</v-col>
                    </v-row>

                    <!-- DATI SQUADRE -->
                    <v-row 
                    v-for="(team, index) in topTeams" 
                    :key="index" 
                    class="align-center"
                    no-gutters
                    style="margin-bottom: 8px;"
                    >
                    <v-col cols="1" class="text-center text-subtitle-1 font-weight-bold">{{ index + 1 }}</v-col>
                    <v-col cols="2">
                        <v-img :src="team.logo" contain max-width="36" max-height="36"></v-img>
                    </v-col>
                    <v-col cols="5" class="text-subtitle-1 font-weight-medium">{{ team.name }}</v-col>
                    <v-col cols="2" class="text-center text-subtitle-1">{{ team.points }}</v-col>
                    <v-col cols="2" class="text-center text-subtitle-1">{{ team.goalDiff }}</v-col>
                    </v-row>

                    </v-container>
                    </v-card>
                </v-col>
            </v-row>

            <!-- PROSSIMI INCONTRI -->
            <v-row justify="center">
                <v-col cols="12">
                    <v-card
                    class="pa-6 clickable zoom-card"
                    style="background-color: rgba(255, 255, 255, 0.5);"
                    hover
                    ripple
                    @click="goToRank"
                    >
                    <v-container class="pa-0">

                        <!-- TITOLO -->
                        <v-row no-gutters class="mb-4">
                        <v-col cols="12" class="text-center text-h6 font-weight-bold">
                            Prossimi Incontri
                        </v-col>
                        </v-row>

                        <!-- MATCHES -->
                        <v-row
                        v-for="(match, index) in nextMatches.slice(0, 4)"
                        :key="index"
                        class="align-center mb-4"
                        no-gutters
                        >
                        <!-- Giorno e Orario -->
                        <v-col cols="12" class="text-center text-subtitle-2 font-weight-medium mb-2">
                            {{ match.day }} - {{ match.time }}
                        </v-col>

                        <!-- Squadre -->
                        <v-col cols="12" class="d-flex justify-center align-center">
                            <v-img :src="match.teamA.logo" max-width="36" max-height="36" class="mr-2"></v-img>
                            <span class="text-subtitle-1 font-weight-medium mr-2">{{ match.teamA.name }}</span>

                            <span class="mx-2 font-weight-bold">vs</span>

                            <span class="text-subtitle-1 font-weight-medium ml-2">{{ match.teamB.name }}</span>
                            <v-img :src="match.teamB.logo" max-width="36" max-height="36" class="ml-2"></v-img>
                        </v-col>
                        </v-row>

                    </v-container>
                    </v-card>
                </v-col>
            </v-row>


            <router-view></router-view> 
        </v-container>
    </v-app>
    `,
    data() {
        return {
          topTeams: [
            {
              name: 'Squadra A',
              logo: '/image/fig02.png',
              points: 75,
              goalDiff: 40,
            },
            {
              name: 'Squadra B',
              logo: '/image/fig02.png',
              points: 72,
              goalDiff: 35,
            },
            {
              name: 'Squadra C',
              logo: '/image/fig02.png',
              points: 70,
              goalDiff: 30,
            },
            {
                name: 'Squadra D',
                logo: '/image/fig02.png',
                points: 70,
                goalDiff: 30,
              }
          ], 
          nextMatches: [
            {
              day: "Sabato 27 Apr",
              time: "15:00",
              teamA: { name: "Napoli", logo: "/image/fig02.png" },
              teamB: { name: "Milan", logo: "/image/fig02.png" }
            },
            {
              day: "Domenica 28 Apr",
              time: "18:30",
              teamA: { name: "Juventus", logo: "/image/fig02.png" },
              teamB: { name: "Roma", logo: "/image/fig02.png" }
            }
          ]
        }
      },       
    methods: {
        handleClick() {
                alert("Hai cliccato sulla card!");
        },
        goToRank() {
            this.$router.push('/rank');
          }
    }
};