## Introduktion (redovisningstext krav 1)

Det här är en backend-server för en trading-plattform som tillhandahåller posters. Frontend-repot är `proj-frontend`. Användare kan registrera sig, logga in, fylla på sitt konto samt köpa och sälja posters med varierande värde. Prisvariationer simuleras med en socket-server (repot heter `proj-socket-server`).

Projektet är byggt med node.js, ramverket Express, pakethanteraren npm och som databas används SQLite. Valet föll naturligt på Express för att jag har använt det kursen igenom och känner mig bekväm med det. Routes är smidiga att hantera och dokumentationen för Express är väl utformad. Jag stod i valet och kvalet mellan SQLite och MongoDB men känner personligen att jag har bättre översikt och tillgänglighet till data vid användandet av en relationsdatabas, nackdelen är något sämre flexibilitet. Databasen består av tre tabeller (users, posters, tradings) som hanterar all dynamisk data bortsett från de varierande priserna.

Jag använder JSON Web Tokens för att autentisera användare mot servern, ett token returneras och sparas i localStorage med giltighet på en timme. För att detta ska fungera krävs att en environmentvariabel sätts i terminalen genom `export JWT_SECRET='yourrandomlongsecret'`. För att kryptera användares lösenord för säker databashantering av lösenord används bcrypt med saltrounds 10.

JSON och modulen bodyparser används för att kommunicera data mellan backend och frontend på ett lättläst och smidigt sätt och cors (Cross-Origin Resource Sharing) tillåter klienten att hämta information från mina API:er.

Jag använder socket.io för realtidsuppdatering av priser för mina posters, en mikroserver är skapad i detta syfte (se README för `proj-socket-server`).


## Klona repot

`git clone https://github.com/hellemarck/proj-backend.git`


## Kom igång

`npm install`

`npm start`

Sätt en environmentvariabel i terminalen genom

`export JWT_SECRET='yourrandomlongsecret'`

Installera `SQLite3` och läs in filen `db/migrate.sql`

Snurrar på http://localhost:3002/
