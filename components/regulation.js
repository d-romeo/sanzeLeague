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

            <!-- Regola 1 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Formato del Torneo</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                Il torneo è composto da 16 squadre, ciascuna con:<br>- 7 giocatori almeno<br>- 1 presidente<br>- 1 allenatore<br><br>Girone unico composto da 16 squadre.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 2 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Durata della Partita</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                Ogni partita dura 26 minuti, suddivisi in:<br>- 3 minuti di tempo effettivo (3 shootout) all'inizio<br>- 20 minuti di partita 7 vs 7 con utilizzo carte<br>- 3 minuti di tempo effettivo (5 shootout) alla fine
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 3 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Calcio d’Inizio</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                I giocatori iniziano schierati sulla propria linea di porta. La palla è al centro del campo. Al fischio dell’arbitro, chi arriva per primo al pallone ottiene il primo possesso.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 4 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Regole del Campo</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                Si gioca secondo le regole classiche del calcio a 7:<br>- Rimesse laterali con le mani<br>- Nessun fuorigioco<br><br>I calci di rigore sono eseguiti in modalità shootout.<br><br>Attenzione: Se il portiere commette fallo durante lo shootout, verrà assegnato un calcio di rigore tradizionale.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 5 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Espulsione a Tempo</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                L’arbitro può assegnare cartellini gialli e rossi.<br>- In caso di doppio giallo, il giocatore sconta 3 minuti fuori dal campo, lasciando la squadra in inferiorità numerica.<br><br>Attenzione: Comportamenti antisportivi o violenti possono portare all’espulsione definitiva e all’allontanamento dal campo.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 6 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Vantaggio di 3 o più Gol</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                Se una squadra va in vantaggio di 3 o più gol, dovrà giocare con uno o più giocatori in meno. Esempi:<br>- 3-0 → 6 vs 7<br>- 4-0 → 5 vs 7<br><br>Se la differenza si riduce a 2 gol, la parità numerica viene ripristinata.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 7 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Carte</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                Le carte da gioco sono illustrate sulla pagina Instagram @sanzeleague. Ogni squadra ha a disposizione diverse carte speciali:<br>
                                - <strong>Rigore Presidenziale:</strong> Ogni squadra avrà a disposizione un rigore presidenziale. Shootout del presidente.<br>
                                - <strong>Cambio Portiere:</strong> Il portiere verrà scambiato con un giocatore di movimento. Durata: 3 minuti o un gol.<br>
                                - <strong>Doppia Espulsione:</strong> Vengono selezionati due giocatori della squadra avversaria da espellere per 3 minuti oppure al concretizzarsi di un gol.<br>
                                - <strong>Rigore Casuale:</strong> Shootout in cui il tiratore verrà scelto dalla squadra avversaria. Compreso l'allenatore ma non il presidente.<br>
                                - <strong>Bomber:</strong> Il gol del giocatore indicato varrà doppio. Valido fino al gol del giocatore selezionato, senza alcun limite di tempo.<br>
                                L’allenatore deve richiedere l’attivazione della carta allo stand principale. Non è possibile attivare contemporaneamente due carte della stessa squadra.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 8 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Quarti di Finale</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                Le prime due squadre del girone unico e le squadre qualificate dai playoff accedono ai quarti di finale. Le partite dei quarti di finale si svolgono in modalità a eliminazione diretta.
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 9 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Ruota delle Modalità</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                La ruota decide le modalità di gioco per i primi e ultimi 3 minuti di tempo effettivo. Le modalità includono:<br>- 4 vs 4<br>- Gol x2<br>- Shootout<br>- 1 vs 1<br>- 3 vs 3<br>- 2 vs 2
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 10 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Playoff</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                I playoff si svolgono tra le squadre classificate dal 3° al 14° posto. Le partite dei playoff sono:<br>- 3° vs 14°<br>- 4° vs 13°<br>- 5° vs 12°<br>- 6° vs 11°<br>- 7° vs 10°<br>- 8° vs 9°
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- Regola 11 -->
            <v-card class="mb-4" color="rgba(0, 0, 0, 0.7)" dark>
                <v-card-title class="custom-title justify-center">Costi e Premi</v-card-title>
                <v-list dark>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-subtitle class="text-center regolamento-text">
                                Costo di iscrizione:<br>- 20€ per i giocatori<br>- 10€ per presidenti e allenatori<br><br>Montepremi:<br>- La squadra vincitrice riceve 300€<br>- Cena gratuita alla 'Trattoria del Volt' di San Zenone al Lambro
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
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
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1); // Torna alla pagina precedente
        }
    }
}
