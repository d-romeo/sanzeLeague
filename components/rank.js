// rank.js
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
                    <v-card-title class="custom-title justify-center">Classifica Completa</v-card-title>

                    <template>
                        <v-row class="align-center font-weight-bold text-caption grey--text text--lighten-2 mb-2 justify-center" no-gutters>
                        <v-col cols="1" class="text-center px-1">#</v-col>
                        <v-col cols="1" class="text-center px-1"></v-col>
                        <v-col cols="5" class="px-1">Squadra</v-col>
                        <v-col cols="1" class="text-center px-1">Pt</v-col>
                        <v-col cols="1" class="text-center px-1">GF</v-col>
                        <v-col cols="1" class="text-center px-1">GS</v-col>
                        <v-col cols="2" class="text-center px-1">DR</v-col>
                        </v-row>

                        <!-- CLASSIFICA -->
                        <v-row
                        v-for="(team, index) in classificaDB"
                        :key="team.id_rank"
                        class="align-center mb-1 justify-center"
                        no-gutters
                        :class="getClassColor(index)"
                        style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding: 6px 0;"
                        >
                        <v-col cols="1" class="text-center px-1 text-caption font-weight-bold">{{ team.id_rank }}</v-col>
                        <v-col cols="1" class="d-flex justify-center px-1">
                            <v-img :src="team.logo_path" max-width="24" max-height="24" contain />
                        </v-col>
                        <v-col cols="5" class="px-1 text-caption font-weight-medium" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            {{ team.name }}
                        </v-col>
                        <v-col cols="1" class="text-center px-1 text-caption">{{ team.punti }}</v-col>
                        <v-col cols="1" class="text-center px-1 text-caption">{{ team.gol_fatti }}</v-col>
                        <v-col cols="1" class="text-center px-1 text-caption">{{ team.gol_subiti }}</v-col>
                        <v-col cols="2" class="text-center px-1 text-caption">{{ team.df_reti }}</v-col>
                        </v-row>
                        </template>

                    <v-container class="pa-2 pt-0">
                        <v-row class="justify-center align-center text-caption grey--text text--lighten-1" no-gutters>
                            <v-col cols="12" class="d-flex flex-column align-center mt-2" style="font-size: 0.75rem;">
                            <div class="mb-1">
                                <span style="border-left: 4px solid rgba(0, 255, 0, 0.4); padding-left: 8px;">Verde: accede direttamente ai quarti di finale</span>
                            </div>
                            <div class="mb-1">
                                <span style="border-left: 4px solid rgba(255, 165, 0, 0.3); padding-left: 8px;">Arancione: accede alla fase playoff</span>
                            </div>
                            <div>
                                <span style="border-left: 4px solid rgba(255, 0, 0, 0.4); padding-left: 8px;">Rosso: eliminazione diretta</span>
                            </div>
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
        classificaDB: []
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
        }, 

        getClassColor(index) {
            const n = this.classificaDB.length;
            if (index <= 1) return 'classifica-verde';      // prime due
            if (index >= n - 2) return 'classifica-rossa';  // ultime due
            return 'classifica-arancione';                 // centrali
        }, 

        caricaClassificaDB() {
            fetch('/api/getRank.php?action=load')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                this.classificaDB = data.classifica;
                console.log('Classifica caricata con successo:', this.classificaDB);
                } else {
                console.error('Errore dal server:', data.error);
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta classifica:', error);
            });
        },  
  }, 
   mounted() {
        this.caricaClassificaDB();
    }
}
  
