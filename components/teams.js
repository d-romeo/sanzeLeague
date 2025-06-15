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

                    <!-- Card per ogni squadra -->
                    <v-row>
                        <v-col cols="12" md="4" v-for="(squadra, index) in squadre" :key="index">
                            <v-card class="mb-4 custom-card" dark @click="$router.push('/teams/' + squadra.id_team)" style="cursor: pointer;">
                                <v-card-title class="custom-card-title">{{ squadra.name }}</v-card-title>
                                <v-card-text class="custom-card-text">
                                    <v-img
                                        :src="squadra.logo_path"
                                        contain
                                        max-width="100"
                                        class="mx-auto"
                                    ></v-img>
                                    <v-row no-gutters>
                                        <v-col cols="12" class="text-center mt-4">
                                            <span class="text-caption font-italic" style="color: #333;">
                                            Clicca e scopri la Rosa
                                            </span>
                                        </v-col>
                                </v-card-text>

                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</v-app>
</div>
    `,
    data() {
        return {
            squadre: [] // Array per memorizzare le squadre
        };
    },
    methods: {
        vaiARosa(id_squadra) {
                this.$router.push(`/team/${id_squadra}`);
            },
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
        },
        caricaSquadre() {
            fetch('/api/getTeams.php?action=load')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success && data.squadre) {
                        this.squadre = data.squadre;
                        console.log('Squadre caricate dal DB:', this.squadre);
                    } else {
                        console.error('Errore nel caricamento delle squadre:', data.error);
                    }
                })
                .catch(error => {
                    console.error('Errore nel caricamento delle squadre:', error);
                });
        }
    },
    created() {
        this.caricaSquadre(); // Carica le squadre al creazione dell'istanza Vue
    }
}
