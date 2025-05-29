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

                    <v-card v-for="(regola, index) in regolamento" :key="index" class="mb-4 " color="rgba(0, 0, 0, 0.7)" dark>
                        <v-card-title class="custom-title justify-center">{{ regola.titolo }}</v-card-title>
                        <v-list dark>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-subtitle class="text-center regolamento-text">{{ regola.descrizione }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
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
            regolamento: [
                {
                    titolo: "Durata della Partita",
                    descrizione: "Ogni partita è formata da un tempo unico di 20 minuti. All’inizio e alla fine dei 20 minuti di gioco verranno giocati 3 minuti di TEMPO EFFETTIVO (il timer si ferma ogni volta che il gioco si interrompe) secondo la modalità “scelta dalla ruota”."
                },
                {
                    titolo: "Calcio d’Inizio",
                    descrizione: "Calcio d’inizio con giocatori schierati sulla linea di porta e palla posizionata al centro di centrocampo. Al fischio dell’arbitro chi per primo arriverà sulla palla otterrà il primo possesso."
                },
                {
                    titolo: "Regole del Campo",
                    descrizione: "Le regole del campo rimangono quelle del calcio a 7 classico: rimesse laterali con le mani, niente fuorigioco. Il calcio di rigore è sempre da considerarsi come SHOOTOUT. \n ATTENZIONE: In caso di fallo del portiere durante la battuta di uno shootout verrà assegnato un calcio di rigore."
                },
                {
                    titolo: "Espulsione a Tempo",
                    descrizione: "L’arbitro, come di consueto, avrà la possibilità di estrarre cartellini gialli e rossi. In caso di doppio cartellino giallo non vi sarebbe l’espulsione definitiva dal campo di gioco, bensì il giocatore verrà punito con tre minuti di fermo fuori dal campo e conseguente inferiorità numerica della propria squadra. \n ATTENZIONE!! Comportamenti antisportivi e di violenza possono essere puniti con espulsione definitiva e conseguente allontanamento dal campo di gioco."
                },
                {
                    titolo: "Vantaggio di 3 o più Gol",
                    descrizione: "In caso di vantaggio di 3 o più gol la squadra in vantaggio dovrà giocare rispettivamente con uno o più giocatori in meno. ES: 3-0 —> 6vs7; 4-0 —> 5vs7 e così via. Naturalmente se la squadra in svantaggio dovesse ritornare a due gol di distanza verrà ripristinata la parità numerica."
                },
                {
                    titolo: "Carte da Gioco",
                    descrizione: "Per quanto riguarda le carte da gioco disponibili potete trovare tutto sulla pagina Instagram @sanzeleague. Di seguito verranno riportate solamente le poche regole per l’utilizzo di tali carte da parte degli allenatori."
                },
                {
                    titolo: "Carta Bonus e Rigore Presidenziale",
                    descrizione: "Ogni squadra avrà a disposizione una carta bonus e un rigore presidenziale."
                },
                {
                    titolo: "Attivazione delle Carte",
                    descrizione: "L’allenatore di ogni squadra dovrà richiedere allo stand principale di attivare la propria carta. Alla prima interruzione di gioco la carta verrà attivata. Il gioco riprenderà da dove era stato interrotto."
                },
                {
                    titolo: "Attivazione Contemporanea",
                    descrizione: "NON è possibile attivare contemporaneamente due carte (della stessa squadra)."
                },
                {
                    titolo: "Limitazioni delle Carte",
                    descrizione: "Le carte “DOPPIA ESPULSIONE” e “CAMBIO PORTIERE” non possono essere applicate a giocatori con qualche bonus attivato. Es. se un giocatore della squadra A è stato scelto come “BOMBER” non sarà possibile per la squadra B o mandarlo in porta. Nel caso della sola “DOPPIA ESPULSIONE” non sarà possibile espellere il portiere avversario."
                }
            ]
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
        }
    }
}
