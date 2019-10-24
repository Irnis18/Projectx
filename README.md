# Velkommen til Retro

Prosjektet er delt i to "del" prosjekt.

DU må ha nodejs installert på pc'n din. Dette har blitt gjort i leksjon 9 i grunnleggende programmering. Dersom en ikkje har fått installert Node.js og pakkebehndleren npm. Så er det anbefalt å lese gjennom leksjon 9 i grunnleggende programmering der en får viktig informasjon om pakkebehandlere og Node.js. [LES LEKSJON 9 HER FØR DU FORTSETTER](https://ntnu.blackboard.com/webapps/blackboard/execute/content/blankPage?cmd=view&content_id=_808534_1&course_id=_19845_1)
_eventuelt: 
  For å starte spillet og nettsiden er en nødt til å ha installert Nodejs og NPM, [Nodejs](https://nodejs.org/en/download/),
  WINDOWS: [Her](https://blog.teamtreehouse.com/install-node-js-npm-windows) er en toturial for hvordan du kan laste ned node   og npm.
  MAC: [Her](https://treehouse.github.io/installation-guides/mac/node-mac.html) er en toturial for hvordan du kan laste ned     node og npm._
  
**1. Nettside**

- under mappen nettsider finner du alle sidene som bygger på informasjons sidene. utenfor mappene er det en index.html fil, dette er startsiden for nettsiden med alle informasjons sidene og link til spill siden. For å starte opp prosjektet lokalt må en komme seg til mappen `projectx` i terminalen dette gjør en ved å opne terminalen eller bash og gjøre følgende kommando: 
`cd projectx` --> OBS! når du opner terminal vinduet så må du komme deg til mappen der du har lagt prosjektet ditt. La oss ta for oss et scenario: du har projectx mappen i webteknikker mappen din som ligger i dokument mappen din for å komme til denne mappen må du gjøre følgende: `cd dokument/webteknikker/projectx`, Det er viktig at du gjør dette basert på kor på pcn du har lagra projectx mappen. 

når du er inn på mappen `Irniss-MacBook-Pro:projectx irnis$ ` så må du gjøre følgende i terminalen/bash:
  1. `npm install`
  2. `npm start`

Dette vil da opne opp nettsiden i en nettleser og du kan gjøre endringer i koden i mappen nettside og oppdatering av nettsida vil skje automatisk. --> Dersom det er spørsmål så er det bare å stille. 

**2. Spill**

- Under mappen spill finner du alt som har med selve spillet å gjøre. Siden prosjektet er to delt så vil nettsiden og spillet være separert, dette vil dermed medføre at vi må "sy" sammen spillet helt til slutt slik at det henger sammen med nettsiden. For å få tilgang til spillet må en gjøre følgende når er er i `projectx` mappen i terminalen, dette står mer detaljert ovenfor om hvordan du skal gjøre dette. Så når en er i mappen projectx(_Irniss-MacBook-Pro:projectx irnis$_) må en gjøre følgende: 
  1. `cd spill`
  2. `npm install`
  3. `npm start`
  
dette vil dermed opne en nettleser der spillet vil kjøre. Gjør dere litt mer kjent med koden også er det bare å stille spørsmål til ting og eventuelt google dersom det er noe som dere prøver å gjøre men ikke får til. Helst spørr dersom det er noe angående koden som allerede er der: Det som kan ignorerast følgende filer:
![bilde av filer](/nettside/assets/img/ignorer.png) (_dette er bare litt konfigurasjon for spillet_)

Etter at en har sett litt mer på koden kan det være mulig å teste ut litt på gameScene.js: dette er under mappen `/spill/src/scenes/gameScene.js` --> dersom det er spørsmål angående dette er det bare å ta kontakt --> her er all logikken for sjølve spillet. 

# Start serveren - ekstra info om node og npm, kort versjon (_ikke nødvendig å lese dersom en forstår det ovenfor_)

For å starte serveren/prosjektet må en bruke terminalen/bash for å komme seg til riktig mappe. så den mappen en vil være i er altså `projectx`
**Projectx**

Eksempel:

![Bilde av terminalen/consollen på mac der vi ser at vi er i riktig mappe](/nettside/assets/img/terminal.png)

**Inn på terminalen/bash gjør følgende for å få opp 1.nettsiden eller 2. spillet **

1. Nettsiden _inn på mappen projectx_

- npm install
- npm start

2. Spillet _inn på mappen spill inn på projectx_
- npm install
- npm start

Nå skal det poppe opp eit vindu der du ser nettsiden
