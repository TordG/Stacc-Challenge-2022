# Stacc-Challenge-2022
Besvarelse teknisk kodeoppgave

## Oppgavebeskrivelse
Laget en web-applikasjon som lar brukeren sjekke om et navn tilhører en PEP og/eller sjekke om nøkkelpersoner i et foretak er PEP'er via søk på organisasjonsnummer.


## Hvordan kjøre prosjektet
Åpne index.html i PepChecker-mappen og bruk som vanlig nettside :)
Jeg testet/kjørte selv prosjektet fortløpende ved bruk av Open Live Server-utvidelsen på VS Code.

## Kommentarer
Den største utfordringen var begrenset tid til å jobbe med prosjektet. 

Opplevde flere ganger problemer med CORS policy ved bruk av Stacc's KYC API og JS' fetch-metode, det kunne variere fra tid til tid om spørringene gikk gjennom.

Prosjektet var et første møte med mange nye teknologiløsninger og utfordringer jeg ikke hadde vært borti før (bygge nettside med JS + html, kontakt med API'er ved bruk av fetch-metoden på JS, jeg har liten erfaring med CSS, for å nevne noen ting). Veldig lærerikt!

Ting jeg ønsker å legge til/fikse på i fremtiden:

1. Gjøre fremvisningen av PEP'ene penere, mer oversiktelig, og mer omfattende.

2. Vise bilder av PEP'ene med Wikipedia-sider ved hjelp av MediaWiki API

3. Generell effektivisering og simplifisering av koden

4. Komme til bunns i hva som førte til CORS policy problemet

Jeg fikk heller ikke mulighet til å teste om applikasjonen ville vise flere enn ett navn-sjekk-resultat ved søk på orgNr (som den i teorien skal).
Dette rett og slett fordi jeg ikke fant noen foretak med fler enn én PEP.
