# 🏆 SZ League – Sistema Web per la Gestione e Visualizzazione del Torneo Sportivo

**SZ League** è una piattaforma web completa per la **gestione e la visualizzazione in tempo reale di tornei sportivi**.

Il progetto include:

* Un **sito pubblico** che mostra partite in corso, prossime partite, risultati, classifiche aggiornate, classifica marcatori e statistiche generali.
* Una **dashboard amministrativa** per la gestione completa di squadre, partite, goal, giocatori e momenti del torneo.

---

## 🎯 Obiettivi del progetto

* Fornire un'interfaccia utente moderna e responsive per **seguire l’andamento del torneo in tempo reale**.
* Consentire agli organizzatori di **gestire dinamicamente ogni aspetto del torneo** tramite una dashboard accessibile da browser.
* Rendere l’esperienza utente intuitiva per **partecipanti, spettatori e organizzatori**.

---

## 🚀 Funzionalità principali

### 👥 Frontend pubblico

* Visualizzazione **partita live** con aggiornamenti in tempo reale (goal, marcatori)
* Elenco **prossime partite** e **partita attuale**
* **Classifica** aggiornata con ordinamento intelligente:

  * Punti
  * Differenza reti
  * Scontri diretti
* **Classifica marcatori**
* **Statistiche generali** del torneo
* Design responsive e tema scuro

### 🛠️ Dashboard amministrativa

* Gestione completa di:

  * Squadre
  * Giocatori
  * Partite (inclusi playoff, quarti, semifinali e finale)
  * Goal
  * Fasi del torneo (momenti)
* Aggiunta, modifica e cancellazione di ogni entità
* Visualizzazione in tempo reale degli aggiornamenti
* Interfaccia Vue.js con Vuetify (via CDN)
* Comunicazione con backend PHP per operazioni CRUD

---

## 🧱 Struttura del progetto

```
index.html            # Sito pubblico (visualizzazione torneo)
dashboard.html        # Dashboard amministrativa
/js/app.js            # Logica Vue + Vuetify
/api/*.php        # API PHP per la gestione dei dati
/style.css        # Stili personalizzati
/image/              # Loghi, immagini
/favicon/
```

---

## 🛠️ Tecnologie utilizzate

* **Frontend**: Vue.js 2 (CDN), Vuetify 2.6, HTML5, CSS3
* **Backend**: PHP (API REST semplificate)
* **Database**: MySQL
* **UI/UX Design**: Vuetify con tema scuro e layout responsive
* **Hosting**: Compatibile con server condivisi o Raspberry Pi

## 📦 Installazione (manuale)

1. Clona il repository:

   ```
   git clone https://github.com/tuonomeutente/sz-league.git
   ```

2. Configura il database MySQL importando il file `database.sql` (da creare se non presente).

3. Configura il backend PHP per connettersi al tuo database.

4. Apri `index.html` per la visualizzazione pubblica e `dashboard.html` per la gestione.

---

## 🔐 Autenticazione

Attualmente l’accesso alla dashboard **non è protetto** (funzionalità in fase di sviluppo).
Si consiglia di implementare un sistema di login per l'uso in produzione.

---

## 👤 Destinatari

* Tornei amatoriali o competitivi (calcio, basket, ecc.)
* Associazioni sportive dilettantistiche
* Scuole, università e organizzatori di eventi sportivi
* Qualsiasi evento con partite, fasi a gironi e playoff

---

## 📝 Licenza

Questo progetto è distribuito sotto licenza **MIT**

---

## 📬 Contatti

Per suggerimenti o segnalazioni: `danieleromeo.ele@email.com`
Oppure apri una issue nel repository.

---
