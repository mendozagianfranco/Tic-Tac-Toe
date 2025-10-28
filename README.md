# Tic-Tac-Toe

[Gioca ora](https://mendozagianfranco.github.io/Tic-Tac-Toe)

## Descrizione
Progetto front-end sviluppato per esercitarmi con **HTML, CSS e JavaScript**, creando una versione digitale del classico gioco **Tris**.  
Il gioco è **interattivo**, con una griglia 3x3 dove due giocatori si alternano.

Questo progetto utilizza una **struttura modulare** per organizzare il codice in maniera chiara e leggibile.

---

## Struttura a moduli
- **`player` (Factory Function)**  
  Funzione factory che crea oggetti giocatore con proprietà `name` e `mark`.

- **`displayController` (Module Pattern / IIFE)**  
  Modulo che gestisce **la visualizzazione e l’interfaccia utente**:  
  - Mostra/nasconde la griglia e i modali  
  - Inserisce i nomi dei giocatori  
  - Mostra messaggi di errore, vincitore o pareggio  
  - Gestisce start, reset e play again  
  - Espone solo funzioni pubbliche `showModalWinner` e `showDrawMessage`.

- **`gameBoard` (Module Pattern / IIFE)**  
  Modulo che gestisce **la logica di gioco**:  
  - Creazione della griglia (`createBoard`)  
  - Alternanza dei turni dei giocatori e aggiunta dei simboli (`addMark`)  
  - Rilevamento del vincitore (`checkWinner`)  
  - Reset del gioco (`resetBoard`)  
  - Gestione dei giocatori (`getPlayer`)  
  - Mantiene stato privato (`board`, `players`, `playerTurn`, `totalX`, `totalO`)  
  - Espone solo le funzioni necessarie a `displayController`.

Vantaggi:
- Separazione chiara tra **logica di gioco** e **UI**
- Encapsulation delle variabili private
- Codice modulare e leggibile

---

## Caratteristiche
- Gioco interattivo con griglia 3x3
- Alternanza tra giocatore X e giocatore O
- Rilevamento automatico della vittoria o del pareggio
- Pulsante per **riavviare** la partita
- Design semplice e funzionale

## Tecnologie utilizzate
- HTML5
- CSS3
- JavaScript (vanilla)

## Come giocare
1. Clona la repository:
```bash
git clone https://github.com/mendozagianfranco/Tic-Tac-Toe.git
```
2. Entra nella cartella del progetto:
```bash
cd Tic-Tac-Toe
```
3. Apri `index.html` nel browser
   
