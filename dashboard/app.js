new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      squadre: [],
      utenti: [],
      partite: [],
      giocatori: [],
      score: [],

      // Dati per la gestione delle TAB 
      tab: 0,
      momentoTorneoAperto: true,
      gestioneSquadreAperta: true,
      gestioneLiveAperta: true,
      gestioneGiocatoriAperta: true,
      gestionePartiteAperta: true,
      momentoTorneoAperto: false,

      // Dati per la tab GOAL
      goalConNomiSquadre: [],
      goalsFiltrati : [],
      temp_goal: null,
      isDoubleGoal: false,
      goalDaEliminare:'',
      searchGiocatoreGoal: '',
      searchSquadraGoal: '',
      goals: [],
      partiteFiltrate: [],
      giocatoriFiltratiPerGoal: [],
      headersGoal: [
        { text: "Partita", value: "partita" },
        { text: "Squadra", value: "squadra" },
        { text: "Giocatore", value: "giocatore" },
        { text: 'Doppio?', value: 'doubleScore', align: 'center' },
        { text: 'Stato', value: 'stato' },
        { text: "Azioni", value: "actions", sortable: false }
      ],
      goal: {
        cod_user: null,
        cod_team: null,
        cod_match: null
      },
      squadraSelezionataGoal: null,
      partitaSelezionataGoal: null,
      giocatoreSelezionatoPerGol: null,
      
      
      // Dati per la tab PARTITE
      partitaDaEliminare: null,
      partitaSelezionata: null,
      dialogTitoloPartita: '',
      searchQueryPartite: '',
      searchQuery: '',
      dialogAggiungiPartita: false,
      dialogModificaPartita: false,
      headersPartite: [
        { text: 'Squadra 1', value: 'squadra1' },
        { text: 'Squadra 2', value: 'squadra2' },
        { text: 'Data', value: 'date' },
        { text: 'Conclusa', value: 'ended', sortable: false },
        { text: 'Stato', value: 'stato', sortable: false },
        { text: 'Azioni', value: 'actions', sortable: false }
      ],
      partitaInModifica: {
        id_match: null,
        cod_team1: null,
        cod_team2: null,
        date: null,
        time: null,
        stato: '2',
      },

      // dati per tab GIOCATORI
      filtroRuolo: null,
      filtroSquadra: null,
      dialogAggiungiGiocatore: false,
      dialogModificaGiocatore: false,
      giocatoriFiltrati: [],
      giocatoreSelezionato: null,
      nuovoGiocatore: {
        name: '',
        surname: '',
        cod_team: null,
        type: null
      },
      giocatoreInModifica: {
        id_user: null,
        name: '',
        surname: '',
        cod_team: null,
        type: null
      },
      tipiUtente: [
        { value: 1, label: 'President' },
        { value: 2, label: 'Player' },
        { value: 3, label: 'Coach' }
      ],
      headersGiocatori: [
      { text: 'Nome', value: 'name' },
      { text: 'Ruolo', value: 'type' },
      { text: 'Squadra', value: 'cod_team' },
      { text: 'Azioni', value: 'actions', sortable: false }
    ],
      

      // Dati per tab SQUADRE
      squadraSelezionata: null,
      dialogModifica: false,
      squadraInModifica: {
        id_team: null,
        name: '',
        cod_actual_state: null
      },
      statiPossibili: [
        { value: 2, label: 'Classifica' },
        { value: 3, label: 'Playoff' },
        { value: 4, label: 'Quarti' },
        { value: 5, label: 'Semi' },
        { value: 6, label: 'Finali' }
      ],
      

      // Dati per tab MOMENTO TORNEO
      momentiTorneo:[
         'prima',
        'classifica',
        'playoff',
        'quarti',
        'semi' ,
        'finali'],
      momentoSalvato: null,
      classificaFinale: [], 
      headersClassifica: [
        { text: 'Nome Squadra', value: 'nome' },
        { text: 'Punti', value: 'punti' },
        { text: 'Goal Fatti', value: 'goalFatti' },
        { text: 'Goal Subiti', value: 'goalSubiti' },
        { text: 'Diff. Reti', value: 'differenzaReti' },
        { text: 'Azioni', value: 'azioni', sortable: false }
      ],

      // Dati per tab live
      matchesLive:[],
      infoMatchLive: null,
      selectedMatchLive: null,
      matchInLive: null, 
    
    
    // dati playoff
      accoppiamenti: [
        [3, 14],
        [4, 13],
        [5, 12],
        [6, 11],
        [7, 10],
        [8, 9],
      ],
      playoffMatches: [],
      squadrePlayoff: [],
        partitePlayoff: [],
        datePlayoff: [
      '2025-06-28 20:45:00',
      '2025-06-28 21:30:00',
      '2025-06-28 22:15:00',
      '2025-06-29 15:00:00',
      '2025-06-29 15:45:00',
      '2025-06-29 16:30:00',
    ],


    // dati quarti
    squadreQuarti: [],
    vincitoriPlayoff:[],
    quartiMatches: [],
    dateQuarti: [
      '2025-06-29 17:30:00',
      '2025-06-29 18:15:00',
      '2025-06-29 19:00:00',
      '2025-06-29 19:45:00',
    ],

    // dati semifinali
    squadreSemifinali: [],
    semifinali:[],
    semifinaliMatches: [],
    dateSemifinali: [
      '2025-06-29 20:45:00',
      '2025-06-29 21:30:00',
    ],

    // dati finale
    squadreFinale: [],
    finale:[],
    finaleMatches: [],
    dateFinale: [
      '2025-06-29 22:30:00',
    ],

    };
  },
  methods: {
    selezionaMomento(momento) {
      this.momentoSalvato = momento;
      console.log('Momento selezionato:', momento);

      fetch('/dashboard/api/dashboard.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'save', momento: momento })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Momento aggiornato con successo!");
           this.aggiornaValoriDB()
        } else {
          alert("Errore durante il salvataggio: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        alert("Errore nella richiesta: " + error);
      });
    },

    caricaMomento() {
      fetch('/dashboard/api/dashboard.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.momento) {
            if (this.momentiTorneo.includes(data.momento)) {
              this.momentoSalvato = data.momento;
            } else {
              // Fallback se il momento dal DB non è valido
              this.momentoSalvato = this.momentiTorneo[0];
            }
          }
        })
        .catch(error => {
          console.error('Errore nel caricamento del momento:', error);
        });
    },

    aggiornaValoriDB(){
      this.caricaSquadre(); 
      this.caricaGiocatori();
      this.caricaPartite();
      this.loadMatchesLive();
      this.caricaGoal(); 
      if (this.momentoSalvato == 'classifica'){
        this.calcolaClassifica();
      }
      if (this.momentoSalvato == 'playoff'){
        this.inizializzaPlayoff();
      }
       if (this.momentoSalvato == 'quarti'){
        this.inizializzaQuarti();
      }
      if (this.momentoSalvato == 'semi'){
        this.inizializzaSemifinali();
      }
      if (this.momentoSalvato == 'finale'){
        this.inizializzaFinali();
      }
    },

    formattaData(dataStr) {
      const data = new Date(dataStr);
      
      const giorni = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
      const mesi = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];

      const giornoSettimana = giorni[data.getDay()];
      const giorno = String(data.getDate()).padStart(2, '0');
      const mese = mesi[data.getMonth()];
      const ore = String(data.getHours()).padStart(2, '0');
      const minuti = String(data.getMinutes()).padStart(2, '0');

      return `🗓️ ${giornoSettimana} ${giorno} ${mese}, 🕒 ore ${ore}:${minuti}`;
    },


    // <-- Giocarori -->
    caricaGiocatori() {
      this.giocatori = [];
      fetch('/dashboard/api/giocatori.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.giocatori) {
            this.giocatori = data.giocatori;
            console.log('Giocatori caricati dal DB:', this.giocatori);
          }
        })
        .catch(error => {
          console.error('Errore nel caricamento dei giocatori:', error);
        });
    },

    giocatoreFullName(giocatoreId) {
      const giocatore = this.giocatori.find(g => g.id_user === giocatoreId);
      if (!giocatore) return 'Giocatore non trovato';
      const nome = giocatore.name || '';
      const cognome = giocatore.surname || '';
      return `${nome} ${cognome}`.trim();
    },

    selezionaGiocatore(index) {
      this.giocatoreSelezionato = index;
    },

    eliminaGiocatore(index) {
      const giocatoreDaEliminare = this.giocatoriFiltrati[index];
      fetch('/dashboard/api/giocatori.php?action=delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'delete', id: giocatoreDaEliminare.id_user })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.aggiornaValoriDB();
          alert("Giocatore eliminato con successo!");
        } else {
          alert("Errore durante l'eliminazione: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    modificaGiocatore(index) {
      const giocatore = this.giocatoriFiltrati[index];
      this.giocatoreInModifica = { ...giocatore };
      this.giocatoreInModifica.index = index;
      this.dialogModificaGiocatore = true;
    },

    salvaModificaGiocatore() {
      fetch('/dashboard/api/giocatori.php?action=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.giocatoreInModifica.id_user,
          name: this.giocatoreInModifica.name,
          surname: this.giocatoreInModifica.surname,
          cod_team: this.giocatoreInModifica.cod_team,
          type: parseInt(this.giocatoreInModifica.type)
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const i = this.giocatoreInModifica.index;
          this.giocatori[i] = { ...this.giocatoreInModifica };
          this.dialogModificaGiocatore = false;
          alert("Giocatore modificato con successo!");
          this.aggiornaValoriDB();
        } else {
          alert("Errore durante la modifica: " + data.error);
        }
      })
      .catch(err => {
        alert("Errore di rete: " + err);
      });
    },

    salvaNuovoGiocatore() {
      fetch('/dashboard/api/giocatori.php?action=save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'save', giocatore: this.nuovoGiocatore })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella risposta del server');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert("Giocatore aggiunto con successo!");
          this.dialogAggiungiGiocatore = false;
          this.nuovoGiocatore = { name: '', surname: '', cod_team: null, type: null };
          this.caricaGiocatori();
        } else {
          alert("Errore durante l'aggiunta: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    aggiungiGiocatore() {
      this.dialogAggiungiGiocatore = true;
    },

    // <-- Squadra -->
    caricaSquadre() {
      this.squadre = [];
      fetch('/dashboard/api/squadre.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.squadre) {
            this.squadre = data.squadre;
            console.log("Squadre caricate:", this.squadre);
            this.caricaPartite(); // solo dopo aver caricato le squadre
          }
        })
        .catch(error => {
          console.error('Errore nel caricamento delle squadre:', error);
        });
    },

    selezionaSquadra(index) {
      this.squadraSelezionata = index;
    },

    eliminaSquadra(index) {
      const squadraDaEliminare = this.squadre[index];
      fetch('/dashboard/api/squadre.php?action=delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'delete', id: squadraDaEliminare.id_team })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.aggiornaValoriDB();
          alert("Squadra eliminata con successo!");
        } else {
          alert("Errore durante l'eliminazione: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    modificaSquadra(index) {
      const squadra = this.squadre[index];
      this.squadraInModifica = { ...squadra };
      this.squadraInModifica.index = index;
      this.dialogModifica = true;
    },

    filtraGiocatori() {
        this.giocatoriFiltrati = this.giocatori.filter(giocatore => {
            const nomeCompleto = `${giocatore.name} ${giocatore.surname}`.toLowerCase();
            const searchMatch = nomeCompleto.includes(this.searchQuery.toLowerCase());
            const ruoloMatch = this.filtroRuolo ? giocatore.type == this.filtroRuolo : true;
            const squadraMatch = this.filtroSquadra ? giocatore.cod_team == this.filtroSquadra : true;
            return searchMatch && ruoloMatch && squadraMatch;
        });
    },

    aggiungiSquadra() {
      const nuovaSquadra = { name: 'Nuova Squadra', cod_actual_state: 'default_state' };
      this.squadre.push(nuovaSquadra);

      fetch('/dashboard/api/squadre.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'save', squadre: this.squadre })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Squadra aggiunta con successo!");
          this.aggiornaValoriDB();
        } else {
          alert("Errore durante l'aggiunta: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    salvaModifica() {
      fetch('/dashboard/api/squadre.php?action=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.squadraInModifica.id_team,
          name: this.squadraInModifica.name,
          cod_actual_state: parseInt(this.squadraInModifica.cod_actual_state)
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const i = this.squadraInModifica.index;
          this.squadre[i] = { ...this.squadraInModifica };
          this.dialogModifica = false;
          alert("Squadra modificata con successo!");
          this.aggiornaValoriDB();
        } else {
          alert("Errore durante la modifica: " + data.error);
        }
      })
      .catch(err => {
        alert("Errore di rete: " + err);
      });
    },

    getNomeSquadra(cod_team) {
      const squadra = this.squadre.find(s => s.id_team === cod_team);
      return squadra ? squadra.name : 'Nessuna Squadra';
    },

    // <-- Partite -->
    selezionaPartita(index) {
      this.partitaSelezionata = index;
    },

    selezionaPartitaGoal(id_match) {
      const partita = this.partite.find(p => p.id_match === id_match);
      if (!partita) {
        console.warn("Partita non trovata per id_match:", id_match);
        return;
      }
      this.partitaSelezionataGoal = partita;
      this.goal.cod_match = id_match;
    },

    selezionaSquadraGoal(squadra) {
      this.squadraSelezionataGoal = squadra;
      this.goal.cod_team = squadra.id_team;
    },

    salvaNuovaPartita() {
      // Combina la data e l'orario in un unico campo nel formato corretto
      const dateTime = `${this.partitaInModifica.date} ${this.partitaInModifica.time}`;

      const payload = {
        cod_team1: this.partitaInModifica.cod_team1,
        cod_team2: this.partitaInModifica.cod_team2,
        date: dateTime,
        stato: this.partitaInModifica.stato,
      };

      fetch('/dashboard/api/partite.php?action=save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Partita aggiunta con successo!");
          this.dialogAggiungiPartita = false;
          this.aggiornaValoriDB(); 
        } else {
          alert("Errore durante il salvataggio: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    aggiungiPartita() {
      this.dialogTitoloPartita = 'Aggiungi Partita';
      this.partitaInModifica = { id_match: null, cod_team1: null, cod_team2: null, date: null, time: null };
      this.dialogAggiungiPartita = true;
    },

    modificaPartita(index) {
      this.dialogTitoloPartita = 'Modifica Partita';
      this.partitaInModifica = { ...this.partiteFiltrate[index] };
      this.dialogModificaPartita = true;
    },

    salvaModificaPartita() {
      // Combina la data e l'orario in un unico campo nel formato corretto
      const dateTime = `${this.partitaInModifica.date} ${this.partitaInModifica.time}`;

      const payload = {
        id_match: this.partitaInModifica.id_match,
        cod_team1: this.partitaInModifica.cod_team1,
        cod_team2: this.partitaInModifica.cod_team2,
        date: dateTime,
        stato: this.partitaInModifica.stato,
      };

      fetch('/dashboard/api/partite.php?action=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Partita modificata con successo!");
          this.dialogModificaPartita = false;
          this.aggiornaValoriDB(); // Ricarica le partite per aggiornare la lista
        } else {
          alert("Errore durante la modifica: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    caricaPartite() {
      this.partite = [];  
      fetch('/dashboard/api/partite.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.partite) {
            // Arricchiamo ogni partita con il campo `nome_partita`
            const partiteConNomi = data.partite.map(p => {
              const nome1 = this.getNomeSquadra(p.cod_team1);
              const nome2 = this.getNomeSquadra(p.cod_team2);
              return {
                ...p,
                ended: Number(p.ended) === 1,
                nome_partita: `${nome1} - ${nome2}`
              };
            });

            this.partite = partiteConNomi;
            this.filtraPartite();
            console.log('Partite caricate dal DB:', this.partite);
          }
        })
        .catch(error => {
          alert('Errore nel caricamento delle partite:' + error);
        });
    },

    filtraPartite() {
        const mapValueToLabel = {};
        this.statiPossibili.forEach(s => {
        mapValueToLabel[s.value] = s.label.toLowerCase();
        });

        // Nel filtro:
        this.partiteFiltrate = this.partite.filter(partita => {
        const squadra1 = this.getNomeSquadra(partita.cod_team1).toLowerCase();
        const squadra2 = this.getNomeSquadra(partita.cod_team2).toLowerCase();
        const searchMatch = squadra1.includes(this.searchQueryPartite.toLowerCase()) ||
                            squadra2.includes(this.searchQueryPartite.toLowerCase());

        // Confronto lo stato mappato con momentoSalvato (tutti in minuscolo)
        const matchStato = mapValueToLabel[parseInt(partita.stato)] === this.momentoSalvato.toLowerCase();

        return searchMatch && matchStato;
        });
    },

    getTipoUtente(typeId) {
      const tipo = this.tipiUtente.find(t => t.value === parseInt(typeId));
      return tipo ? tipo.label : 'Unknown';
    },

    eliminaPartita(index) {
        const partitaDaEliminare = this.partiteFiltrate[index];
        // Prima recupera gli ID dei gol associati alla partita
        fetch('/dashboard/api/goal.php?action=get_goals_by_match', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'get_goals_by_match', id_match: partitaDaEliminare.id_match })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.goals && data.goals.length > 0) {
            // Elimina ogni gol uno per uno
            const deletePromises = data.goals.map(goal =>
                fetch('/dashboard/api/goal.php?action=delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'delete', id_goal: goal.id_goal })
                })
            );

            return Promise.all(deletePromises);
            } else {
            return Promise.resolve();
            }
        })
        .then(() => {
            // Poi elimina la partita
            return fetch('/dashboard/api/partite.php?action=delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'delete', id: partitaDaEliminare.id_match })
            });
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            this.aggiornaValoriDB();
            alert("Partita eliminata con successo!");
            } else {
            alert("Errore durante l'eliminazione della partita: " + data.error);
            }
        })
        .catch(error => {
            alert("Errore nella richiesta: " + error);
        });
    },

    aggiornaEnded(item){
      const payload = {
        id_match: item.id_match,
        ended: item.ended ? 1 : 0,
      };
      console.log('Payload per aggiornamento ended:', payload);
      fetch('/dashboard/api/partite.php?action=updateEnded', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Stato partita aggiornato con successo!"); 
          this.aggiornaValoriDB(); 
        } else {
          alert("'Errore nel salvataggio:', data.message"); 
        }
      })
      .catch(error => {
        alert('Errore nella richiesta:', error);
      });
    },

    deleteAllMatches(){
      if (!confirm("Sei sicuro di voler eliminare **tutte** le partite e i goal associati?")) {
          return;
        }
        fetch('/dashboard/api/partite.php?action=deleteAll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert("Eliminazione completata con successo!");
            this.aggiornaValoriDB(); 
          } else {
            alert("Errore durante l'eliminazione: " + data.error);
          }
        })
        .catch(error => {
          alert("Errore nella comunicazione con il server." + data.error);
        });
    },


    // <-- Goals -->
    modificaGoal(index){},

    eliminaGoal(goal) {
      if (!goal || !goal.id_goal) {
        console.error("Goal non valido", goal);
        return;
      }

      fetch('/dashboard/api/goal.php?action=delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_goal: goal.id_goal })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Goal eliminato dal DB');
            // Rimuovilo da goals
            this.goals = this.goals.filter(g => g.id_goal !== goal.id_goal);
            alert("Goal eliminato con successo!");
            this.aggiornaValoriDB();
          } else {
            alert("Errore durante l'eliminazione: " + data.error);
          }
        })
        .catch(error => {
          alert("Errore nella richiesta: " + error);
        });
    },

    giocatoriPerGol() {
      return this.giocatori.filter(g => g.cod_team === this.squadraSelezionata);
    },

    filtraGiocatoriPerGol(cod_squadra) {
      this.giocatoriPerGol = this.giocatori
        .filter(g => g.cod_team === cod_squadra)
        .map(g => ({
          ...g,
          nomeCompleto: `${g.name} ${g.surname}`
        }));
    },

    salvaGoal() {
      const payload = {
        cod_match: this.partitaSelezionata.id_match,
        cod_team: this.squadraSelezionata,
        cod_user: this.giocatoreSelezionatoPerGol,
        doubleScore: this.isDoubleGoal ? 1 : 0  
      };

      fetch('/dashboard/api/goal.php?action=save', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log("Gol salvato!");
            alert("Gol salvato con successo!");
            this.aggiornaValoriDB();
            this.isDoubleGoal = false; // reset switch
          } else {
            alert("Errore durante il salvataggio: " + data.error);
          }
        });
    },

    caricaGoal() {
      this.goalConNomiSquadre = [];
      this.goalsFiltrati = [];
      this.goals = [];
      fetch('/dashboard/api/goal.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.goal) {
            const goalConNomi = data.goal.map(p => {
              // Cerca la partita corrispondente nell'array partite[]
              const partita = this.partite.find(partita => partita.cod_match === p.cod_match);

              // Estrai i nomi delle squadre dalla partita trovata
              const nome1 = partita ? this.getNomeSquadra(partita.cod_team1) : 'Sconosciuto';
              const nome2 = partita ? this.getNomeSquadra(partita.cod_team2) : 'Sconosciuto';

              return {
                ...p,
                nome_partita: `${nome1} - ${nome2}`
              };
            });

            this.goalConNomiSquadre = goalConNomi;
            this.goalsFiltrati =  goalConNomi; // Inizializza goalsFiltrati con tutti i goal caricati
            this.goals = goalConNomi; 
            this.filtraPartitePerGoal(); // Applica il filtro iniziale
            console.log('Gol caricati dal DB:', this.goalConNomiSquadre);
          }
        })
        .catch(error => {
          alert('Errore nel caricamento dei goal:'+ error);
        });
    },

    filtraPartitePerGoal() {
        const searchGiocatoreGoal = this.searchGiocatoreGoal.toLowerCase();
        const searchSquadraGoal = this.searchSquadraGoal.toLowerCase();

        // Trova il valore numerico corrispondente al momentoSalvato
        const statoCorrispondente = this.statiPossibili.find(
        s => s.label.toLowerCase() === this.momentoSalvato.toLowerCase()
        )?.value;

        this.goalsFiltrati = this.goalConNomiSquadre.filter(goal => {
        const nomeGiocatore = this.giocatoreFullName(goal.cod_user).toLowerCase();
        const nomeSquadra = this.getNomeSquadra(goal.cod_team).toLowerCase();

        const matchGiocatore = !searchGiocatoreGoal || nomeGiocatore.includes(searchGiocatoreGoal);
        const matchSquadra = !searchSquadraGoal || nomeSquadra.includes(searchSquadraGoal);
        const matchStato = statoCorrispondente === undefined || parseInt(goal.stato) === statoCorrispondente;

        return matchGiocatore && matchSquadra && matchStato;
        });
    },

    descrizionePartitaById(id_match){
      const partita = this.partite.find(partita => Number(partita.id_match) === Number(id_match));
      const nome1 = partita ? this.getNomeSquadra(partita.cod_team1) : 'Sconosciuto';
      const nome2 = partita ? this.getNomeSquadra(partita.cod_team2) : 'Sconosciuto';
      return `${nome1} - ${nome2}`;
    }, 

    getStatoLabel(value) {
        const stato = this.statiPossibili.find(s => s.value === parseInt(value));
        return stato ? stato.label : 'Sconosciuto';
    },

    deleteAllGoals(){
      if (!confirm("Sei sicuro di voler eliminare **tutti** i goal?")) {
          return;
        }

        fetch('/dashboard/api/goal.php?action=deleteAll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Tutti i goal sono stati eliminati.');
            alert("Eliminazione completata con successo!");
            this.aggiornaValoriDB(); 
          } else {
            alert("Errore durante l'eliminazione: " + data.error);
          }
        })
        .catch(error => {
          alert("Errore nella comunicazione con il server" + data.error);
        });
    },

    // <-- CLASSIFICA -->
    caricaClassifica() {
      this.classificaFinale = [];
      fetch('/dashboard/api/classifica.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.classifica) {
            this.classificaFinale = data.classifica;
          }
        })
        .catch(error => {
          alert('Errore nel caricamento della classifica:'+ error);
        });
    },

    caricaPunti(){
      this.score = [];
      fetch('/dashboard/api/punti.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.score) {
            this.score = data.score;
            console.log("Punti caricati:", this.score);
          }
        })
        .catch(error => {
          alert('Errore nel caricamento dei punti' + error);
        });
    },

    calcolaClassifica() {
      this.caricaPunti();

      setTimeout(() => {
        const classifica = {};

        // Inizializza la classifica con tutte le squadre
        this.squadre.forEach(squadra => {
          classifica[squadra.id_team] = {
            id_team: squadra.id_team,
            nome: squadra.name,
            punti: 0,
            goalFatti: 0,
            goalSubiti: 0,
            vittorie: 0, // aggiunto campo vittorie
          };
        });

          // Verifica se nessuna partita è stata conclusa
        const nessunaPartitaConclusa = this.partite.every(partita => !partita.ended)

        // Calcola i punti dalle partite solo se sono concluse (ended === true)
        this.partite.forEach(partita => {
          if (partita.ended !== true) {
            return;
          }

          const goalPartita = this.goals.filter(goal => goal.cod_match === partita.id_match);

          // Somma dei goal considerando doubleScore
          const goalSquadra1 = goalPartita
            .filter(goal => goal.cod_team === partita.cod_team1)
            .reduce((sum, goal) => sum + (goal.doubleScore == 1 ? 2 : 1), 0);

          const goalSquadra2 = goalPartita
            .filter(goal => goal.cod_team === partita.cod_team2)
            .reduce((sum, goal) => sum + (goal.doubleScore == 1 ? 2 : 1), 0);

          // Aggiorna goal fatti/subiti
          classifica[partita.cod_team1].goalFatti += goalSquadra1;
          classifica[partita.cod_team1].goalSubiti += goalSquadra2;
          classifica[partita.cod_team2].goalFatti += goalSquadra2;
          classifica[partita.cod_team2].goalSubiti += goalSquadra1;

          // Assegna i punti in base al risultato
          if (goalSquadra1 > goalSquadra2) {
            classifica[partita.cod_team1].punti += 3;
            classifica[partita.cod_team1].vittorie += 1; // registra vittoria
          } else if (goalSquadra1 < goalSquadra2) {
            classifica[partita.cod_team2].punti += 3;
            classifica[partita.cod_team2].vittorie += 1; // registra vittoria
          } else {
            classifica[partita.cod_team1].punti += 1;
            classifica[partita.cod_team2].punti += 1;
          }
        });

        // Aggiungi i punti extra (score manuali)
        this.score.forEach(scoreEntry => {
          const id = scoreEntry.id_team;
          const extra = parseInt(scoreEntry.value || scoreEntry.punti, 10);
          if (classifica[id]) {
            classifica[id].punti += isNaN(extra) ? 0 : Number(extra);
          }
        });

        // Calcola classifica finale
    
        this.classificaFinale = Object.values(classifica)
        .map(item => ({
            ...item,
            differenzaReti: item.goalFatti - item.goalSubiti
        }))
        .sort((a, b) => {
            if (nessunaPartitaConclusa) {
            // Ordina per nome se nessuna partita è stata conclusa
            return a.nome.localeCompare(b.nome);
            } else {
            // Altrimenti, usa la logica di ordinamento standard
            if (b.punti !== a.punti) return b.punti - a.punti;
            const diffA = a.differenzaReti;
            const diffB = b.differenzaReti;
            if (diffB !== diffA) return diffB - diffA;
            if (b.vittorie !== a.vittorie) return b.vittorie - a.vittorie;
            return b.goalFatti - a.goalFatti;
            }
        });
          
          this.classificaFinale.forEach((squadra, index) => { squadra.id_rank = index + 1;}); 
          this.salvaClassificaSuDB();
      }, 1000);
    },

    salvaClassificaSuDB() {
      if (!this.classificaFinale || this.classificaFinale.length === 0) {
        alert("Classifica vuota, niente da salvare.");
        return;
      }

      // Prepara solo i campi necessari da inviare (opzionale ma consigliato)
      const payloadClassifica = this.classificaFinale.map((squadra, index) => ({
        id_rank: index + 1,       // posizione in classifica
        id_team: squadra.id_team,
        punti: squadra.punti,
        nome: squadra.nome,
        gol_fatti: squadra.goalFatti,
        gol_subiti: squadra.goalSubiti,
        df_reti: squadra.differenzaReti
      }));

      fetch('/dashboard/api/classifica.php?action=save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ classifica: payloadClassifica })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Classifica salvata con successo!");
        } else {
          alert("Errore durante il salvataggio della classifica: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    aggiungiPunto(item) {
      console.log(`id_team ${item.id_team}`);
      fetch(`/dashboard/api/punti.php?action=add&id_team=${item.id_team}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.calcolaClassifica(); // Ricalcola la classifica dopo l'aggiunta del punto
          } else {
            alert('Errore nell\'aggiunta punto:' + data.error);
          }
        })
        .catch(error => {
          alert('Errore nel fetch aggiunta punto:' + error);
        });
    },

    togliPunto(item) {
      fetch(`/dashboard/api/punti.php?action=min&id_team=${item.id_team}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.calcolaClassifica(); 
          } else {
            alert('Errore nella rimozione punto:'+ data.error);
          }
        })
        .catch(error => {
          alert('Errore nel fetch rimozione punto:' + error);
        });
    },

    // <-- Live Matches -->
    loadMatchesLive() {
        this.matchesLive = [];
        fetch('/dashboard/api/live.php?action=loadMatchesLive')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            this.matchesLive = data.matches.map(m => ({
                ...m,
                label: `${m.team1_name} vs ${m.team2_name} - ${new Date(m.date).toLocaleString()} - ${this.getStatoLabel(m.stato)}`,
            }));
             const statoCorrispondente = this.statiPossibili.find(
                s => s.label.toLowerCase() === this.momentoSalvato.toLowerCase()
            )?.value;

            if (statoCorrispondente !== undefined) {
                this.matchesLive = this.matchesLive.filter(
                m => parseInt(m.stato) === statoCorrispondente
                );
                this.loadInfoLive();
            }
            } else {
            alert('Errore caricamento partite live');
            }
        })
        .catch(error => {
            alert('Errore di rete'+ error);
        });
    },

    goLive() {
        if (!this.selectedMatchLive) return;
        fetch('/dashboard/api/live.php?action=setLiveMatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_match: this.selectedMatchLive.id_match })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            alert('Partita impostata in live');
            this.matchInLive = true;
            this.loadInfoLive(); // Ricarica le informazioni della partita live
            } else {
              this.matchInLive = false;
            alert('Errore nel settare partita live: ' + (data.error || ''));
            }
        })
        .catch(error => {
            alert('Errore di rete' + error);
        });
    },

    loadInfoLive() {
        this.infoMatchLive = '';
        fetch('/dashboard/api/live.php?action=getMatchInfo')
          .then(res => res.json())
          .then(data => {
            if (data.success && Array.isArray(data.matches) && data.matches.length > 0) {
              const data1 = data.matches[0]; // prima (e unica) partita live
              this.infoMatchLive = `${data1.team1_name} vs ${data1.team2_name} - ${new Date(data1.date).toLocaleString()} - ${this.getStatoLabel(data1.stato)}`;
              this.matchInLive = true;
            } else {
              this.infoMatchLive = 'Nessuna partita attualmente in live.';
              this.matchInLive = false;
            }
          })
          .catch(error => {
            alert('Errore nel recupero dei dati info live:' + error);
            this.infoMatchLive = 'Errore nel recupero delle partite.';
          });
    },

    //<-- Playoff -->
    generaPartite() {
      const partitePlayoff = this.playoffMatches.map((p, i) => ({
        cod_team1: p.team1,
        cod_team2: p.team2,
        stato: '3',            
        ended: '0',           
        date: this.datePlayoff[i], 
        }));
      fetch('/dashboard/api/partite.php?action=savePlayoff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partite: partitePlayoff })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Partite salvate con successo!");
          this.aggiornaValoriDB(); // Ricarica le partite per aggiornare la lista
        } else {
          alert("Errore durante il salvataggio della partite: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    inizializzaPlayoff() {
      this.squadrePlayoff = this.classificaFinale.filter(s => s.id_rank >= 3 && s.id_rank <= 14);
        this.playoffMatches = this.accoppiamenti.map(([pos1, pos2]) => {
        const team1 = this.classificaFinale.find(s => Number(s.id_rank) === pos1);
        const team2 = this.classificaFinale.find(s => Number(s.id_rank) === pos2);

        return {
          label: `${pos1} vs ${pos2}`,
          team1: team1 ? team1.id_team : null,
          team2: team2 ? team2.id_team : null,
        };
      });
    },

    //<-- Quarti -->
  
    getVincitoriPlayoff() {
    return this.vincitoriPlayoff
        .filter(p => p.ended == 1 && p.stato == 3) 
        .sort((a, b) => a.id_match - b.id_match)   
        .map(p => {
            const score1 = this.getScore(p.id_match, p.cod_team1);
            const score2 = this.getScore(p.id_match, p.cod_team2);
            return score1 > score2
                ? this.squadre.find(t => t.id_team === p.cod_team1)
                : this.squadre.find(t => t.id_team === p.cod_team2);
        });
    },

    getScore(matchId, teamId) {
        const goalsMatch = this.goals.filter(g => g.cod_match === matchId);
        return goalsMatch
            .filter(g => g.cod_team === teamId)
            .reduce((score, g) => score + (g.doubleScore == 1 ? 2 : 1), 0);
    },

    inizializzaQuarti() {
        this.vincitoriPlayoff = this.partite;  
        const vincitoriPlayoff = this.getVincitoriPlayoff();
        const squadreDirette = this.classificaFinale.filter(s => s.id_rank <= 2);
        this.squadreQuarti = [
            ...vincitoriPlayoff.map(s => ({
                ...s,
                name: s.name || s.nome || 'Senza nome'
            })),
            ...squadreDirette.map(s => ({
                ...s,
                name: s.name || s.nome || 'Senza nome'
            }))
            ];
        // Crea gli accoppiamenti per i quarti di finale
        this.quartiMatches = [
            { team1: vincitoriPlayoff[0], team2: vincitoriPlayoff[1], label: `Prima Partita - ${this.formattaData(this.dateQuarti[0])} - Vincitrice 3-14 vs 4-13`}, // vincitori partite 1 e 2
            { team1: vincitoriPlayoff[2], team2: vincitoriPlayoff[3], label: `Seconda Partita - ${this.formattaData(this.dateQuarti[1])} - Vincitrice 5-12 vs 6-11`}, // vincitori partite 3 e 4
            { team1: vincitoriPlayoff[4], team2: squadreDirette[1], label: `Terza Partita - ${this.formattaData(this.dateQuarti[2])} - 2° Classificata vs Vincitrice 7-10` }, // vincitore partita 5 vs seconda classificata
            { team1: vincitoriPlayoff[5], team2: squadreDirette[0], label: `Quarta Partita - ${this.formattaData(this.dateQuarti[3])} - 1° Classificata vs Vincitrice 8-9`}  // vincitore partita 6 vs prima classificata
        ];
    },

    generaPartiteQuarti() {
      const partiteQuarti = this.quartiMatches.map((p, i) => ({
        cod_team1: p.team1.id_team,
        cod_team2: p.team2.id_team,
        stato: '4',            // playoffS
        ended: '0',            // ancora da giocare
        date: this.dateQuarti[i], // assegna data corrispondente
        }));

      fetch('/dashboard/api/partite.php?action=saveQuarti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partite: partiteQuarti })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Partite salvate con successo!");
          this.aggiornaValoriDB(); 
        } else {
          alert("Errore durante il salvataggio della partite: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    //<-- Semifinali -->
  
    getVincitoriSemifinali() {
    return this.vincitoriSemifinali
        .filter(p => p.ended == 1 && p.stato == 4) 
        .sort((a, b) => a.id_match - b.id_match)   
        .map(p => {
            const score1 = this.getScore(p.id_match, p.cod_team1);
            const score2 = this.getScore(p.id_match, p.cod_team2);
            return score1 > score2
                ? this.squadre.find(t => t.id_team === p.cod_team1)
                : this.squadre.find(t => t.id_team === p.cod_team2);
        });
    },

    getScore(matchId, teamId) {
        const goalsMatch = this.goals.filter(g => g.cod_match === matchId);
        return goalsMatch
            .filter(g => g.cod_team === teamId)
            .reduce((score, g) => score + (g.doubleScore == 1 ? 2 : 1), 0);
    },

    inizializzaSemifinali() {
        this.vincitoriSemifinali = this.partite;  
        const vincitoriSemifinali = this.getVincitoriSemifinali();
        this.squadreSemifinali = vincitoriSemifinali;
        
        this.semifinaliMatches = [
            { team1: vincitoriSemifinali[0], team2: vincitoriSemifinali[1],  label: `Prima Partita - ${this.formattaData(this.dateSemifinali[0])} - Vincitrice Prima Quarti vs Seconda Quarti` }, // vincitori partite 1 e 2
            { team1: vincitoriSemifinali[2], team2: vincitoriSemifinali[3], label: `Seconda Partita - ${this.formattaData(this.dateSemifinali[1])} - Vincitrice Terza Quarti vs Quarta Quarti` }, // vincitori partite 3 e 4
        ];
    },

    generaPartiteSemifinali() {
      const partiteSemifinali = this.semifinaliMatches.map((p, i) => ({
        cod_team1: p.team1.id_team,
        cod_team2: p.team2.id_team,
        stato: '5',           
        ended: '0',            
        date: this.dateSemifinali[i],

        }));
      fetch('/dashboard/api/partite.php?action=saveSemifinali', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partite: partiteSemifinali })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Partite salvate con successo!");
            this.aggiornaValoriDB(); // Ricarica le partite per aggiornare la lista
        } else {
          alert("Errore durante il salvataggio della partite: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

    //<-- Finali -->
  
    getVincitoriFinale() {
    return this.vincitoriFinale
        .filter(p => p.ended == 1 && p.stato == 5)
        .sort((a, b) => a.id_match - b.id_match)  
        .map(p => {
            const score1 = this.getScore(p.id_match, p.cod_team1);
            const score2 = this.getScore(p.id_match, p.cod_team2);
            return score1 > score2
                ? this.squadre.find(t => t.id_team === p.cod_team1)
                : this.squadre.find(t => t.id_team === p.cod_team2);
        });
    },

    getScore(matchId, teamId) {
        const goalsMatch = this.goals.filter(g => g.cod_match === matchId);
        return goalsMatch
            .filter(g => g.cod_team === teamId)
            .reduce((score, g) => score + (g.doubleScore == 1 ? 2 : 1), 0);
    },

    inizializzaFinale() {
        this.vincitoriFinale = this.partite;  
        const vincitoriFinale = this.getVincitoriFinale();
        this.squadreFinale = vincitoriFinale;

        console.log("Vincitori Finale:", this.squadreFinale);
        this.finaleMatches = [
            { team1: vincitoriFinale[0], team2: vincitoriFinale[1], label: `Finale delle - ${this.formattaData(this.dateFinale[0])} - Vincitrice Prima Semifinali vs Seconda Semifinali` }, // vincitori partite 1 e 2
        ];
    },

    generaPartiteFinale() {
      const partiteFinale = this.finaleMatches.map((p, i) => ({
        cod_team1: p.team1.id_team,
        cod_team2: p.team2.id_team,
        stato: '6',           
        ended: '0',            
        date: this.dateFinale[i], 
        }));
      fetch('/dashboard/api/partite.php?action=saveFinale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partite: partiteFinale })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {  
          alert("Partite salvate con successo!");
          this.aggiornaValoriDB(); // Ricarica le partite per aggiornare la lista
        } else {
          alert("Errore durante il salvataggio della partite: " + data.error);
        }
      })
      .catch(error => {
        alert("Errore nella richiesta: " + error);
      });
    },

},

  created() {
    this.caricaMomento(),
    this.caricaSquadre(),
    this.caricaGiocatori(),
    this.caricaPartite(),
    this.loadMatchesLive(),
    this.caricaGoal(),
    this.caricaPunti(),
    this.caricaClassifica(),
    setTimeout(() => {
    if (this.momentoSalvato === 'classifica'){this.calcolaClassifica()}
    }, 500),
    setTimeout(() => {
        if (this.momentoSalvato === 'playoff') {this.inizializzaPlayoff()}
      }, 500),
    setTimeout(() => {
        if (this.momentoSalvato === 'quarti') {this.inizializzaQuarti()}
      }, 500);
    setTimeout(() => {
        if (this.momentoSalvato === 'semi') {this.inizializzaSemifinali()}
      }, 500);
    setTimeout(() => {
        if (this.momentoSalvato === 'finali') {this.inizializzaFinale()}
      }, 500);
    
    
  },
  watch: {
    squadraSelezionata(nuovoId) {
      if (nuovoId) {
        this.filtraGiocatoriPerGol(nuovoId);
      }
    },
    giocatori: {
      handler: function() {
        this.filtraGiocatori();
      },
      deep: true
    }
  }
});
