(() => {
  if (new URLSearchParams(window.location.search).get('lang') === 'en') return;

  const translations = {
    'About Jet NTNU.': 'Om Jet NTNU.',
    'Jet NTNU was founded in June 2026 by five mechanical engineers. Jet is currently the first and only student-run jet engine organisation in Norway, and perhaps in Europe, or even the world? That is difficult to verify, but Jet is venturing into uncharted territory.': 'Jet NTNU ble stiftet i juni 2026 av fem maskiningeniører. Jet er foreløpig den første og eneste studentdrevne jetmotororganisasjonen i Norge, og kanskje i Europa, eller verden? Det er vanskelig å verifisere, men Jet brer seg inn i ukjent farvann.',
    'How we are organised': 'Slik er vi organisert',
    'One organisation.': 'Én organisasjon.',
    'Eight departments.': 'Åtte avdelinger.',
    'To keep the development of the jet engine and the organisation around it structured, Jet is divided into technical and organisational departments.': 'For å holde utviklingen av jetmotoren og organisasjonen rundt den strukturert, er Jet delt inn i tekniske og organisatoriske avdelinger.',
    'Board': 'Styret',
    'Compressor': 'Kompressor',
    'Combustion': 'Forbrenning',
    'Turbine': 'Turbin',
    'Nozzle': 'Dyse',
    'DAQ & Electronics': 'DAQ & elektronikk',
    'The system that increases total pressure and stagnation enthalpy.': 'Systemet som øker totaltrykket og stagnasjonsentalpien.',
    'The system that adds energy, which later drives the compressor and is converted into velocity.': 'Systemet som tilfører energi som senere driver kompressoren og omdannes til fart.',
    'The system that extracts part of the energy in the flow to drive the compressor.': 'Systemet som henter ut noe av energien i strømningen for å drive kompressoren.',
    'The system that increases exhaust velocity and enables high thrust.': 'Systemet som øker eksoshastigheten og muliggjør høy skyvekraft.',
    'The department responsible for accurate data acquisition and the setup of the electronic system.': 'Avdelingen som sørger for nøyaktig datainnhenting og oppsett av det elektroniske systemet.',
    'Finance & Partnership': 'Økonomi & partnerskap',
    'Marketing': 'Markedsføring',
    'The group responsible for Jet NTNUs direction, governance, continuity, and overall priorities.': 'Gruppen som har ansvar for Jet NTNUs retning, styring, kontinuitet og overordnede prioriteringer.',
    'The department responsible for finances, procurement, funding, and relationships with the partners who make the project possible.': 'Avdelingen som har ansvar for økonomi, innkjøp, finansiering og relasjonene til partnerne som gjør prosjektet mulig.',
    'The department that communicates the engineering, develops Jet NTNUs public presence, and supports recruitment.': 'Avdelingen som formidler ingeniørarbeidet, utvikler Jet NTNUs synlighet og støtter rekrutteringen.',
    'Separate disciplines.': 'Separate fagområder.',
    'A shared system.': 'Ett felles system.',
    'In Project: Jotun, every department develops its own subsystem while working toward a common engine. Defined interfaces between the subsystems establish what each department delivers and receives, from geometry and mass flow to loads, temperatures, signals, and test data. This lets the teams work independently without losing sight of the complete system.': 'I Prosjekt: Jotun utvikler hver avdeling sitt eget delsystem, samtidig som alle arbeider mot én felles motor. Definerte grensesnitt mellom delsystemene fastsetter hva hver avdeling leverer og mottar, fra geometri og massestrøm til laster, temperaturer, signaler og testdata. Slik kan teamene arbeide selvstendig uten å miste helheten av syne.',
    'Responsibility first': 'Ansvar først',
    'Safety is part of the engineering.': 'Sikkerhet er en del av ingeniørarbeidet.',
    'A jet engine combines fuel, high temperatures, pressure, and rotating machinery. Safety therefore shapes the design, manufacturing, procedures, instrumentation, and testing from the beginning. Reviews, documented limits, controlled test plans, and clear ownership are essential before the engine is operated.': 'En jetmotor kombinerer drivstoff, høye temperaturer, trykk og roterende maskineri. Sikkerhet former derfor design, produksjon, prosedyrer, instrumentering og testing helt fra starten. Gjennomganger, dokumenterte grenser, kontrollerte testplaner og tydelig ansvar er avgjørende før motoren settes i drift.',
    'Members gain practical experience that is difficult to find in ordinary coursework. They work with real requirements, technical interfaces, manufacturing, testing, documentation, and decisions that affect an entire system. The result is not only an engine, but engineers who understand how complex technology is developed safely and together.': 'Medlemmene får praktisk erfaring som er vanskelig å finne i vanlig undervisning. De arbeider med reelle krav, tekniske grensesnitt, produksjon, testing, dokumentasjon og beslutninger som påvirker et helt system. Resultatet er ikke bare en motor, men ingeniører som forstår hvordan kompleks teknologi utvikles trygt og i fellesskap.',
    'Meet the team': 'Møt teamet'
  };

  const walker = document.createTreeWalker(document.querySelector('.about-new'), NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const text = node.nodeValue.trim();
    if (translations[text]) node.nodeValue = node.nodeValue.replace(text, translations[text]);
  });
})();
