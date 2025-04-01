new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data() {
        return {
            menuVisibile: false
        };
    },
    template: `
        <v-app>
            <!-- HEADER -->
            <v-app-bar color="primary" dark>
                <v-toolbar-title>Sanze League</v-toolbar-title>
            </v-app-bar>

            <!-- CONTENUTO PRINCIPALE -->
            <v-container>
                <v-row justify="center">
                    <v-col cols="12">
                        <p>Questo è un esempio di layout responsive con Vuetify.</p>
                        <v-btn color="primary" @click="menuVisibile = !menuVisibile">
                            Mostra/Nascondi Menu
                        </v-btn>
                    </v-col>
                </v-row>

                <!-- MENU NAVIGAZIONE -->
                <v-expand-transition>
                    <v-row v-if="menuVisibile">
                        <v-col cols="12" sm="6" md="4">
                            <v-card>
                                <v-list>
                                    <v-list-item-group>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title><a href="#">Home</a></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title><a href="#">Chi Siamo</a></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title><a href="#">Contatti</a></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-expand-transition>
            </v-container>

            <!-- FOOTER -->
            <v-footer color="primary" dark>
                <v-container class="text-center">
                    <span>&copy; 2025 - Il tuo sito</span>
                </v-container>
            </v-footer>
        </v-app>
    `
});
