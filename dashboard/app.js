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
      gestioneGiocatoriAperta: true,
      gestionePartiteAperta: true,
      momentoTorneoAperto: false,

      // Dati per la tab GOAL
      goalConNomiSquadre: [],
      goalsFiltrati : [],
      temp_goal: null,
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
        { text: 'Azioni', value: 'actions', sortable: false }
      ],
      partitaInModifica: {
        id_match: null,
        cod_team1: null,
        cod_team2: null,
        date: null,
        time: null
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
    };
    
  },
  methods: {
    selezionaMomento(momento) {
      this.momentoSalvato = momento;
      console.log('Momento selezionato:', momento);

      fetch('/sanze/dashboard/api/dashboard.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'save', momento: momento })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Momento aggiornato nel database');
          alert("Momento aggiornato con successo!");
        } else {
          console.error('Errore durante il salvataggio:', data.error);
          alert("Errore durante il salvataggio: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        alert("Errore nella richiesta: " + error);
      });
    },

    caricaMomento() {
      fetch('/sanze/dashboard/api/dashboard.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.momento) {
            if (this.momentiTorneo.includes(data.momento)) {
              this.momentoSalvato = data.momento;
            } else {
              // Fallback se il momento dal DB non è valido
              this.momentoSalvato = this.momentiTorneo[0];
            }
            console.log('Momento caricato dal DB:', this.momentoSalvato);
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
      this.caricaGoal(); 
      if (this.momentoSalvato == 'classifica'){
        this.calcolaClassifica();
      }
    },

    // <-- Giocarori -->
    caricaGiocatori() {
      fetch('/sanze/dashboard/api/giocatori.php?action=load')
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
      const giocatoreDaEliminare = this.giocatori[index];
      fetch('/sanze/dashboard/api/giocatori.php?action=delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'delete', id: giocatoreDaEliminare.id_user })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Giocatore eliminato e salvato nel database');
          this.giocatori.splice(index, 1);
          alert("Giocatore eliminato con successo!");
        } else {
          console.error('Errore durante il salvataggio del giocatore:', data.error);
          alert("Errore durante l'eliminazione: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        alert("Errore nella richiesta: " + error);
      });
    },

    modificaGiocatore(index) {
      const giocatore = this.giocatori[index];
      this.giocatoreInModifica = { ...giocatore };
      this.giocatoreInModifica.index = index;
      this.dialogModificaGiocatore = true;
    },

    salvaModificaGiocatore() {
      fetch('/sanze/dashboard/api/giocatori.php?action=update', {
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
          console.log('Giocatore modificato correttamente');
          alert("Giocatore modificato con successo!");
        } else {
          console.error('Errore nella modifica:', data.error);
          alert("Errore durante la modifica: " + data.error);
        }
      })
      .catch(err => {
        console.error('Errore di rete:', err);
        alert("Errore di rete: " + err);
      });
    },

    salvaNuovoGiocatore() {
      fetch('/sanze/dashboard/api/giocatori.php?action=save', {
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
          console.log('Giocatore aggiunto e salvato nel database');
          alert("Giocatore aggiunto con successo!");
          this.dialogAggiungiGiocatore = false;
          this.nuovoGiocatore = { name: '', surname: '', cod_team: null, type: null };
          this.caricaGiocatori();
        } else {
          console.error('Errore durante il salvataggio del giocatore:', data.error);
          alert("Errore durante l'aggiunta: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        alert("Errore nella richiesta: " + error);
      });
    },

    aggiungiGiocatore() {
      this.dialogAggiungiGiocatore = true;
    },

    // <-- Squadra -->
    caricaSquadre() {
      fetch('/sanze/dashboard/api/squadre.php?action=load')
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
      fetch('/sanze/dashboard/api/squadre.php?action=delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'delete', id: squadraDaEliminare.id_team })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Squadra eliminata e salvata nel database');
          this.squadre.splice(index, 1);
          alert("Squadra eliminata con successo!");
        } else {
          console.error('Errore durante il salvataggio della squadra:', data.error);
          alert("Errore durante l'eliminazione: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
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

      fetch('/sanze/dashboard/api/squadre.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'save', squadre: this.squadre })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Squadra aggiunta e salvata nel database');
          alert("Squadra aggiunta con successo!");
        } else {
          console.error('Errore durante il salvataggio della squadra:', data.error);
          alert("Errore durante l'aggiunta: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        alert("Errore nella richiesta: " + error);
      });
    },

    salvaModifica() {
      fetch('/sanze/dashboard/api/squadre.php?action=update', {
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
          console.log('Squadra modificata correttamente');
          alert("Squadra modificata con successo!");
        } else {
          console.error('Errore nella modifica:', data.error);
          alert("Errore durante la modifica: " + data.error);
        }
      })
      .catch(err => {
        console.error('Errore di rete:', err);
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
        date: dateTime
      };

      fetch('/sanze/dashboard/api/partite.php?action=save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Nuova partita salvata nel database');
          alert("Partita aggiunta con successo!");
          this.dialogAggiungiPartita = false;
          this.aggiornaValoriDB(); 
        } else {
          console.error('Errore durante il salvataggio della nuova partita:', data.error);
          alert("Errore durante il salvataggio: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
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
        date: dateTime
      };

      fetch('/sanze/dashboard/api/partite.php?action=update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Partita modificata nel database');
          alert("Partita modificata con successo!");
          this.dialogModificaPartita = false;
          this.caricaPartite(); // Ricarica le partite per aggiornare la lista
        } else {
          console.error('Errore durante la modifica della partita:', data.error);
          alert("Errore durante la modifica: " + data.error);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
        alert("Errore nella richiesta: " + error);
      });
    },

    caricaPartite() {
      fetch('/sanze/dashboard/api/partite.php?action=load')
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
          console.error('Errore nel caricamento delle partite:', error);
        });
    },

    filtraPartite() {
      this.partiteFiltrate = this.partite.filter(partita => {
        const squadra1 = this.getNomeSquadra(partita.cod_team1).toLowerCase();
        const squadra2 = this.getNomeSquadra(partita.cod_team2).toLowerCase();
        const searchMatch = squadra1.includes(this.searchQueryPartite.toLowerCase()) ||
                           squadra2.includes(this.searchQueryPartite.toLowerCase());
        return searchMatch;
      });
    },

    getTipoUtente(typeId) {
      const tipo = this.tipiUtente.find(t => t.value === parseInt(typeId));
      return tipo ? tipo.label : 'Unknown';
    },

    eliminaPartita(index) {
        const partitaDaEliminare = this.partite[index];

        // Prima recupera gli ID dei gol associati alla partita
        fetch('/sanze/dashboard/api/goal.php?action=get_goals_by_match', {
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
                fetch('/sanze/dashboard/api/goal.php?action=delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'delete', id_goal: goal.id_goal })
                })
            );

            return Promise.all(deletePromises);
            } else {
            console.log('Nessun gol associato trovato, procedo con l\'eliminazione della partita');
            return Promise.resolve();
            }
        })
        .then(() => {
            // Poi elimina la partita
            return fetch('/sanze/dashboard/api/partite.php?action=delete', {
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
            console.log('Partita eliminata con successo');
            this.partite.splice(index, 1);
            this.aggiornaValoriDB();
            alert("Partita eliminata con successo!");
            } else {
            console.error('Errore durante eliminazione partita!', data.error);
            alert("Errore durante l'eliminazione della partita: " + data.error);
            }
        })
        .catch(error => {
            console.error('Errore nella richiesta:', error);
            alert("Errore nella richiesta: " + error);
        });
    },

    aggiornaEnded(item){
      const payload = {
        id_match: item.id_match,
        ended: item.ended ? 1 : 0,
      };
      console.log('Payload per aggiornamento ended:', payload);
      fetch('/sanze/dashboard/api/partite.php?action=updateEnded', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Stato ended aggiornato correttamente');
          alert("Stato partita aggiornato con successo!"); 
          this.aggiornaValoriDB(); 
        } else {
          console.error('Errore nel salvataggio:', data.message);
        }
      })
      .catch(error => {
        console.error('Errore nella richiesta:', error);
      });
    },


    // <-- Goals -->
    modificaGoal(index){},

    eliminaGoal(goal) {
      if (!goal || !goal.id_goal) {
        console.error("Goal non valido", goal);
        return;
      }

      fetch('/sanze/dashboard/api/goal.php?action=delete', {
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
            console.error('Errore durante l\'eliminazione:', data.error);
            alert("Errore durante l'eliminazione: " + data.error);
          }
        })
        .catch(error => {
          console.error('Errore nella richiesta:', error);
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

      console.log("Giocatori per goal:", this.giocatoriPerGol);
    },

    salvaGoal() {
      const payload = {
        cod_match: this.partitaSelezionata.id_match,
        cod_team: this.squadraSelezionata,
        cod_user: this.giocatoreSelezionatoPerGol
      };

      fetch('/sanze/dashboard/api/goal.php?action=save', {
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
            this.aggiornaValoriDB()
          } else {
            alert("Errore durante il salvataggio: " + data.error);
          }
        });
    },

    caricaGoal() {
      fetch('/sanze/dashboard/api/goal.php?action=load')
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
            this.goalsFiltrati = goalConNomi;
            this.goals = goalConNomi; 
            console.log('Gol caricati dal DB:', this.goalConNomiSquadre);
          }
        })
        .catch(error => {
          console.error('Errore nel caricamento dei goal:', error);
        });
    },

    filtraPartitePerGoal() {
      const searchGiocatoreGoal = this.searchGiocatoreGoal.toLowerCase();
      const searchSquadraGoal = this.searchSquadraGoal.toLowerCase();

      this.goalsFiltrati = this.goalConNomiSquadre.filter(goal => {
        const nomeGiocatore = this.giocatoreFullName(goal.cod_user).toLowerCase();
        const nomeSquadra = this.getNomeSquadra(goal.cod_team).toLowerCase();

        const matchGiocatore = !searchGiocatoreGoal || nomeGiocatore.includes(searchGiocatoreGoal);
        const matchSquadra = !searchSquadraGoal || nomeSquadra.includes(searchSquadraGoal);

        return matchGiocatore && matchSquadra;
      });
    },

    descrizionePartitaById(id_match){
      const partita = this.partite.find(partita => Number(partita.id_match) === Number(id_match));
      const nome1 = partita ? this.getNomeSquadra(partita.cod_team1) : 'Sconosciuto';
      const nome2 = partita ? this.getNomeSquadra(partita.cod_team2) : 'Sconosciuto';
      return `${nome1} - ${nome2}`;
    }, 

    // <-- CLASSIFICA -->
    caricaPunti(){
      fetch('/sanze/dashboard/api/punti.php?action=load')
        .then(response => response.json())
        .then(data => {
          if (data.success && data.score) {
            this.score = data.score;
            console.log("Punti caricati:", this.score);
          }
        })
        .catch(error => {
          console.error('Errore nel caricamento dei punti', error);
        });
    },

    calcolaClassifica() {
      this.caricaPunti();

      setTimeout(() => {
        console.log('Calcolando la classifica...');
        console.log('Goals:', this.goals);
        console.log('Partite:', this.partite);
        console.log('Squadre:', this.squadre);
        console.log('Punti extra:', this.score);

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

        // Calcola i punti dalle partite solo se sono concluse (ended === true)
        this.partite.forEach(partita => {
          if (partita.ended !== true) {
            console.log(`Partita non conclusa: ${partita.nome_partita} (ID: ${partita.id_match})`);
            return;
          }

          const goalPartita = this.goals.filter(goal => goal.cod_match === partita.id_match);
          const goalSquadra1 = goalPartita.filter(goal => goal.cod_team === partita.cod_team1).length;
          const goalSquadra2 = goalPartita.filter(goal => goal.cod_team === partita.cod_team2).length;

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
            if (b.punti !== a.punti) return b.punti - a.punti;

            const diffA = a.differenzaReti;
            const diffB = b.differenzaReti;
            if (diffB !== diffA) return diffB - diffA;

            if (b.vittorie !== a.vittorie) return b.vittorie - a.vittorie;

            return b.goalFatti - a.goalFatti; // fallback: più goal fatti
          });
      }, 1000);
    },

    aggiungiPunto(item) {
      console.log(`id_team ${item.id_team}`);
      fetch(`/sanze/dashboard/api/punti.php?action=add&id_team=${item.id_team}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log(`Punto aggiunto a squadra ${item.nome}`);
            this.calcolaClassifica(); // Ricalcola la classifica dopo l'aggiunta del punto
          } else {
            console.error('Errore nell\'aggiunta punto:', data.error);
          }
        })
        .catch(error => {
          console.error('Errore nel fetch aggiunta punto:', error);
        });
    },

    togliPunto(item) {
      fetch(`/sanze/dashboard/api/punti.php?action=min&id_team=${item.id_team}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log(`Punto rimosso da squadra ${item.nome}`);
            this.calcolaClassifica(); 
          } else {
            console.error('Errore nella rimozione punto:', data.error);
          }
        })
        .catch(error => {
          console.error('Errore nel fetch rimozione punto:', error);
        });
    },

  },
  created() {
    this.caricaMomento(),
    this.caricaSquadre(),
    this.caricaGiocatori(),
    this.caricaPartite(),
    this.caricaGoal()
    this.caricaPunti();
    setTimeout(() => {
      this.calcolaClassifica();
    }, 2000);
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
