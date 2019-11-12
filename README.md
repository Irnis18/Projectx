# Velkommen til Retro

## Informasjon om prosjektet

Prosjektet ble delt i to delprosjekt der utgangspunktet var at utviklingen av spillet og nettsiden ikke skulle være avhengig av hverandre. Denne beslutningen ble basert på at nettsiden og spillet ville kunne brukes, selv om de ble separert. Dermed bestemte vi oss for å dele prosjektet i to der de har forskjellige konfigurasjoner. Etter at vi hadde ferdigutviklet spillet og nettsiden integrerte vi en produksjonsklar versjon av spillet inn i nettsiden, noe som vil bli forklart i detalj under. Dette valget førte til at vi hadde en ryddigere kildekode og et mer oversiktlig prosjekt. Både spillet og nettsiden er i dette prosjektet. For å videreutvikle på nettsiden så er det inn på mappen _nettside_ og for å videreutvikle på spillet så er det inn på mappen _spill_ .

## Før du starter - Node.js og NPM

Du må ha Node.js og NPM installert på PC-en din. Node.js blir blant annet brukt når vi vil kjøre JavaScript kode i en server. NPM er en pakkebehandler, denne gjør det enklere å installere programvarebiblioteker som vi kan benytte oss av når vi programmer. NPM (Node Package Manager) bruker vi både på nettsiden og spillet.

Utviklingen av nettsiden og spillet er satt opp til å kjøre lokalt på en server. Nettsiden bruker live-server og spillet bruker webpack-dev-server. Disse er blitt lastet ned ved å nytte NPM. 

### Installasjon av Node.js fra leksjon 9 i Grunnleggende programmering NTNU DIFTCST1003

    _Windows_
    Last ned og installer anbefalt versjon av Node.js fra https://nodejs.org/en/.
    I denne leksjonen benytter vi også versjonskontrollsystemet git for å laste ned eksempler. Windows brukere kan laste ned git her: https://git-scm.com/download/win.
    Dere har nå tilgang til en terminal git Bash. Åpne denne.
    (Eidheim, 2019)
    _MacOS_
    Oppdater først operativsystemet ditt.
    Installer deretter MacOS pakkebehandleren Homebrew. Kopier og lim inn i en terminal (applikasjonen Terminal):
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    Installer til slutt Node.js fra terminalen:
    brew install node. (Eidheim, 2019)


## Kjøring a Nettside og spill lokalt.

**1. Nettside**
For å kjøre nettsiden lokalt må en gjøre følgende etter at en har enten clonet ned prosjektet eller lastet det ned:

    1.`cd Projectx`
    2 `cd nettside`
    3. `npm install`
    4. `npm start`


**2. Spill**
For å kjøre spillet lokalt må en gjøre følgende etter at en har enten clonet net prosjektet ellter lastet det ned:

    1.`cd Projectx`
    2 `cd spill`
    3. `npm install`
    4. `npm start`

## Produksjons versjon a spillet integrert i nettsiden
for at nettsiden skal ha en integrert versjon av spillet er en nødt til å produsere en produksjonsklar versjon av spillet som en overfører inn på nettsiden. Dette gjør en ved noen kommandoer som lager en mappe som heter _dist_ som en da kan bare overføre inn i mappen nettside. og dermed laste opp nettside mappen som vil da ha en integrert versjon av spillet. for å skape denne mappen gjør følgende

    1.`cd Projectx`
    2 `cd spill`
    3. `npm install`
    4. `npm run-script build`
