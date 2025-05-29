export default {
    template: `
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
                            <v-card class="mb-4 custom-card" dark>
                                <v-card-title class="custom-card-title">{{ squadra.name }}</v-card-title>
                                <v-card-text class="custom-card-text">
                                    <v-img
                                        :src="squadra.logo_path"
                                        contain
                                        max-width="100"
                                        class="mx-auto"
                                    ></v-img>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

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

    `,
    data() {
        return {
            squadre: [] // Array per memorizzare le squadre
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
        },
        caricaSquadre() {
            fetch('/sanze/api/getTeams.php?action=load')
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
