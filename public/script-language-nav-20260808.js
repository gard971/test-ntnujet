const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const norwegian = {
  'Jet NTNU, Built to Ignite':'Jet NTNU, Norges første studentdrevne jetmotororganisasjon',
  'Project: Jotun, Jet NTNU':'Prosjekt: Jotun, Jet NTNU','About Jet, Jet NTNU':'Om Jet, Jet NTNU','Team, Jet NTNU':'Team, Jet NTNU','Apply Now, Jet NTNU':'Søk nå, Jet NTNU','Contact, Jet NTNU':'Kontakt, Jet NTNU','Partners, Jet NTNU':'Partnere, Jet NTNU',
  'Menu':'Meny','Project: Jotun':'Prosjekt: Jotun','About Jet':'Om Jet','Team':'Team','Apply Now':'Søk nå','Contact':'Kontakt','Contact us':'Kontakt oss','Partners':'Partnere','Trondheim · Norway':'Trondheim · Norge',
  'Norway’s first':'Norges første','student-run':'studentdrevne','jet engine':'jetmotor-','organization':'organisasjon',
  'We are NTNU students designing, manufacturing, and testing our own turbojet engine.':'Vi er NTNU-studenter som designer, produserer og tester vår egen turbojetmotor.',
  'First project':'Første prosjekt','Coming soon · Explore the project':'Kommer snart · Utforsk prosjektet','Org. no. 937 996 179':'Org. nr. 937 996 179',
  'First project · Student-built turbojet':'Første prosjekt · Studentbygget turbojet','Meet':'Møt','Our first student-designed afterburning turbojet.':'Vår første studentdesignede turbojetmotor med etterbrenner.','Explore the system':'Utforsk systemet',
  'I · THE OBJECTIVE':'I · MÅLET','What is Jotun?':'Hva er Jotun?','A complete gas turbine.':'En komplett gassturbin.','From a':'Fra et','blank page.':'blankt ark.',
  'Jotun is Jet NTNU’s first engine project. It is a compact turbojet with an afterburner, divided into six stations: inlet, compressor, combustor, turbine, afterburner, and nozzle. Building it brings thermodynamics, aerodynamics, structures, manufacturing, controls, and testing into one project.':'Jotun er Jet NTNUs første motorprosjekt. Det er en kompakt turbojet med etterbrenner, delt inn i seks stasjoner: inntak, kompressor, forbrenningskammer, turbin, etterbrenner og dyse. Arbeidet samler termodynamikk, aerodynamikk, konstruksjon, produksjon, styring og testing i ett prosjekt.',
  'The flowpath':'Strømningsbanen','Six stations.':'Seks stasjoner.','One':'Ett','system.':'system.','Inlet':'Inntak','Delivers controlled airflow to the compressor.':'Leverer kontrollert luftstrøm til kompressoren.','Compressor':'Kompressor','Adds stagnation enthalpy and raises total pressure.':'Tilfører stagnasjonsentalpi og øker totaltrykket.','Combustor':'Forbrenningskammer','Adds heat through four parallel flame cans.':'Tilfører varme gjennom fire parallelle flammerør.','Turbine':'Turbin','Extracts the work required to drive compression.':'Henter ut arbeidet som kreves for å drive kompressoren.','Afterburner':'Etterbrenner','Provides a dedicated reheat section downstream of the turbine.':'Gir en egen etterbrenningsseksjon nedstrøms for turbinen.','Nozzle':'Dyse','Converts the remaining pressure and heat into thrust.':'Omdanner gjenværende trykk og varme til skyvekraft.',
  '02 · Compression':'02 · Kompresjon','Making pressure':'Skaper trykk','from':'fra','motion.':'bevegelse.',
  'The compressor converts shaft work into pressure. Jotun’s compressor work uses Euler work, velocity triangles, loading, flow coefficient, reaction, diffusion limits, and slip to connect blade speed to pressure rise.':'Kompressoren omdanner akselarbeid til trykk. Kompressorarbeidet i Jotun bruker Eulerarbeid, hastighetstrekanter, belastning, strømningskoeffisient, reaksjon, diffusjonsgrenser og slip for å knytte bladhastighet til trykkøkning.',
  'Euler work and velocity-triangle development':'Utvikling av Eulerarbeid og hastighetstrekanter','Diffusion, slip, and loading checks':'Kontroll av diffusjon, slip og belastning','Geometry and performance will be published after design review':'Geometri og ytelse publiseres etter designgjennomgang',
  '03 · Combustion':'03 · Forbrenning','Four flames.':'Fire flammer.','purpose.':'formål.',
  'Four can combustors operate in parallel. Flow is distributed through primary, secondary, and dilution zones to support flame stability, combustion, and a controlled turbine inlet profile.':'Fire separate forbrenningskamre arbeider parallelt. Strømningen fordeles gjennom primær-, sekundær- og fortynningssoner for å støtte flammestabilitet, forbrenning og en kontrollert innløpsprofil til turbinen.',
  'Primary, secondary, and dilution-zone development':'Utvikling av primær-, sekundær- og fortynningssoner','Fuel delivery and flame-stability work':'Arbeid med drivstofftilførsel og flammestabilitet','Pressure-loss and liner-durability assessment':'Vurdering av trykktap og linerens holdbarhet',
  '4 · Turbine':'4 · Turbin','The critical':'Den kritiske','balance.':'balansen.','The turbine must extract exactly enough work to drive the compressor while surviving the engine’s most demanding combination of temperature, rotational speed, and centrifugal load. Work matching ties both machines to the same shaft.':'Turbinen må hente ut akkurat nok arbeid til å drive kompressoren, samtidig som den tåler motorens mest krevende kombinasjon av temperatur, turtall og sentrifugallast. Arbeidsbalansen knytter begge maskinene til samme aksel.',
  'Blade-root stress governed by material, geometry, and speed':'Spenning i bladroten styres av materiale, geometri og hastighet','Reaction, loading, and flow coefficient shape the stage':'Reaksjon, belastning og strømningskoeffisient former trinnet','Thermal and mechanical limits require verification before operation':'Termiske og mekaniske grenser må verifiseres før drift',
  '05–06 · Reheat and exhaust':'05–06 · Etterbrenning og eksos','Verification':'Verifisering','before figures.':'før tall.','Afterburner development':'Utvikling av etterbrenner','The afterburner remains in development. Its operating point and measured effect will be published only after the core engine state has been verified.':'Etterbrenneren er fortsatt under utvikling. Driftspunkt og målt effekt publiseres først etter at kjernemotorens tilstand er verifisert.','Nozzle development':'Utvikling av dyse','The nozzle geometry will be matched to verified mass flow, pressure, temperature, and test data before performance figures are published.':'Dysegeometrien tilpasses verifisert massestrøm, trykk, temperatur og testdata før ytelsestall publiseres.',
  'How we build':'Slik bygger vi','Design what matters.':'Design det som betyr noe.','Buy what':'Kjøp det som','must work.':'må virke.','Static first':'Statisk først','Controlled spool-up, a limited operating hold, and spool-down create a disciplined first test envelope.':'Kontrollert oppspoling, en begrenset driftsperiode og nedspoling gir en disiplinert første testramme.','Evidence before claims':'Dokumentasjon før påstander','Materials, temperatures, operating limits, and performance figures remain provisional until analysis and testing support them.':'Materialer, temperaturer, driftsgrenser og ytelsestall forblir foreløpige til analyser og testing underbygger dem.','The work continues':'Arbeidet fortsetter','Analysis. Manufacture.':'Analyse. Produksjon.','Ignition.':'Tenning.','Meet the team':'Møt teamet',
  'Student-built propulsion · Trondheim':'Studentbygget fremdrift · Trondheim','Student-built propulsion · NTNU':'Studentbygget fremdrift · NTNU',
  'CURIOUS':'NYSGJERRIG','BY DESIGN.':'AV NATUR.','We are building a place where ambitious students can take an engine from first principles to first fire.':'Vi bygger et miljø der ambisiøse studenter kan ta en motor fra første prinsipper til første tenning.','I · ABOUT JET':'I · OM JET','Engineering becomes real when the system has to':'Ingeniørfaget blir virkelig når systemet må','work.':'virke.',
  'Jet NTNU is a student-led technical organisation in Trondheim. We unite people across mechanical engineering, electronics, controls, finance, partnerships, and communication around one unusually demanding objective: designing, manufacturing, and testing complete propulsion systems.':'Jet NTNU er en studentdrevet teknisk organisasjon i Trondheim. Vi samler mennesker fra maskinteknikk, elektronikk, styring, økonomi, partnerskap og kommunikasjon rundt ett uvanlig krevende mål: å designe, produsere og teste komplette fremdriftssystemer.',
  'Own the system':'Ta eierskap til systemet','Every component is connected. We learn to make decisions across interfaces, not only inside disciplines.':'Alle komponenter henger sammen. Vi lærer å ta beslutninger på tvers av grensesnitt, ikke bare innenfor fagområder.','Build evidence':'Bygg kunnskap','Calculations guide us. Manufacturing challenges us. Instrumented tests tell us what is true.':'Beregninger veileder oss. Produksjon utfordrer oss. Instrumenterte tester forteller oss hva som er sant.','Grow together':'Voks sammen','Responsibility is shared early, knowledge is documented, and each generation leaves the next a stronger platform.':'Ansvar deles tidlig, kunnskap dokumenteres, og hver generasjon etterlater et sterkere fundament til den neste.',
  'Our first programme':'Vårt første program','Project:':'Prosjekt:','Jotun is our first complete turbojet project. It gives students from different fields one real system to design, manufacture, instrument, and test together.':'Jotun er vårt første komplette turbojetprosjekt. Her får studenter fra ulike fagområder ett virkelig system som de designer, produserer, instrumenterer og tester sammen.','Explore Jotun':'Utforsk Jotun','Find your place in the system':'Finn din plass i systemet','Different disciplines.':'Ulike fagområder.','engine.':'motor.','Explore teams':'Utforsk teamene',
  'Jet NTNU was founded in June 2026 by five mechanical engineers. Jet is currently the first and only student-run jet engine organisation in Norway, and perhaps in Europe, or even the world? That is difficult to verify, but Jet is venturing into uncharted territory.':'Jet NTNU ble stiftet i juni 2026 av fem maskiningeniører. Jet er foreløpig den første og eneste studentdrevne jetmotororganisasjonen i Norge, og kanskje i Europa, eller verden? Det er vanskelig å verifisere, men Jet brer seg inn i ukjent farvann.','One organisation.':'Én organisasjon.','Eight departments.':'Åtte avdelinger.','To keep the development of the jet engine and the organisation around it structured, Jet is divided into technical and organisational departments.':'For å holde utviklingen av jetmotoren og organisasjonen rundt den strukturert, er Jet delt inn i tekniske og organisatoriske avdelinger.','The group responsible for Jet NTNUs direction, governance, continuity, and overall priorities.':'Gruppen som har ansvar for Jet NTNUs retning, styring, kontinuitet og overordnede prioriteringer.','The department responsible for finances, procurement, funding, and relationships with the partners who make the project possible.':'Avdelingen som har ansvar for økonomi, innkjøp, finansiering og relasjonene til partnerne som gjør prosjektet mulig.','The department that communicates the engineering, develops Jet NTNUs public presence, and supports recruitment.':'Avdelingen som formidler ingeniørarbeidet, utvikler Jet NTNUs synlighet og støtter rekrutteringen.',
  'About Jet NTNU.':'Om Jet NTNU.','Jet NTNU was founded in June 2026 by five mechanical engineering students. For now, Jet is the first student-run jet engine organisation in Norway, and perhaps in Europe. That is difficult to verify, but one thing is certain: Jet is moving into uncharted territory.':'Jet NTNU ble stiftet i juni 2026 av fem maskiningeniørstudenter. Jet er foreløpig den første studentdrevne jetmotororganisasjonen i Norge, og kanskje i Europa. Det er vanskelig å verifisere, men én ting er sikkert: Jet beveger seg inn i ukjent farvann.',
  'How we are organised':'Slik er vi organisert','One engine.':'Én motor.','Five technical departments.':'Fem tekniske avdelinger.','To keep the development of the jet engine organised, Jet is divided into several technical departments.':'For å holde utviklingen av jetmotoren organisert, er Jet delt inn i flere tekniske avdelinger.',
  'The system that increases total pressure and stagnation enthalpy.':'Systemet som øker totaltrykket og stagnasjonsentalpien.','The system that adds energy, which later drives the compressor and is converted into velocity.':'Systemet som tilfører energi som senere driver kompressoren og omdannes til fart.','The system that extracts part of the energy in the flow to drive the compressor.':'Systemet som henter ut noe av energien i strømningen for å drive kompressoren.','The system that increases exhaust velocity and enables high thrust.':'Systemet som øker eksoshastigheten og muliggjør høy skyvekraft.','The department responsible for accurate data acquisition and the setup of the electronic system.':'Avdelingen som sørger for nøyaktig datainnhenting og oppsett av det elektroniske systemet.',
  'Separate disciplines.':'Separate fagområder.','A shared system.':'Ett felles system.','In Project: Jotun, every department develops its own subsystem while working toward a common engine. Defined interfaces between the subsystems establish what each department delivers and receives, from geometry and mass flow to loads, temperatures, signals, and test data. This lets the teams work independently without losing sight of the complete system.':'I Prosjekt: Jotun utvikler hver avdeling sitt eget delsystem, samtidig som alle arbeider mot én felles motor. Definerte grensesnitt mellom delsystemene fastsetter hva hver avdeling leverer og mottar, fra geometri og massestrøm til laster, temperaturer, signaler og testdata. Slik kan teamene arbeide selvstendig uten å miste helheten av syne.',
  'Responsibility first':'Ansvar først','Safety is part of the engineering.':'Sikkerhet er en del av ingeniørarbeidet.','A jet engine combines fuel, high temperatures, pressure, and rotating machinery. Safety therefore shapes the design, manufacturing, procedures, instrumentation, and testing from the beginning. Reviews, documented limits, controlled test plans, and clear ownership are essential before the engine is operated.':'En jetmotor kombinerer drivstoff, høye temperaturer, trykk og roterende maskineri. Sikkerhet former derfor design, produksjon, prosedyrer, instrumentering og testing helt fra starten. Gjennomganger, dokumenterte grenser, kontrollerte testplaner og tydelig ansvar er avgjørende før motoren settes i drift.','Members gain practical experience that is difficult to find in ordinary coursework. They work with real requirements, technical interfaces, manufacturing, testing, documentation, and decisions that affect an entire system. The result is not only an engine, but engineers who understand how complex technology is developed safely and together.':'Medlemmene får praktisk erfaring som er vanskelig å finne i vanlig undervisning. De arbeider med reelle krav, tekniske grensesnitt, produksjon, testing, dokumentasjon og beslutninger som påvirker et helt system. Resultatet er ikke bare en motor, men ingeniører som forstår hvordan kompleks teknologi utvikles trygt og i fellesskap.',
  'The organisation behind Jotun':'Organisasjonen bak Jotun','ONE ENGINE.':'ÉN MOTOR.','MANY MINDS.':'MANGE HODER.','Open a team to meet its members and understand where it sits in the system.':'Åpne et team for å møte medlemmene og se hvor det hører hjemme i systemet.','Member overview':'Medlemsoversikt','Members of Jet NTNU':'Medlemmer av Jet NTNU','Expand all':'Utvid alle','Collapse all':'Lukk alle','Choose a':'Velg et','discipline.':'fagområde.','Each group owns a part of Jet NTNU, and the groups work together wherever their systems meet.':'Hver gruppe har ansvar for en del av Jet NTNU, og gruppene samarbeider der systemene deres møtes.','Board':'Styret','The Board holds responsibility for Jet NTNU’s direction, governance, and continuity.':'Styret har ansvar for Jet NTNUs retning, styring og kontinuitet.','Chairman of the Board · CEO · Compressor Lead':'Styreleder · Daglig leder · Kompressorleder','Board Member · Combustion Lead':'Styremedlem · Forbrenningsleder','Board Member · Turbine Lead':'Styremedlem · Turbinleder','Board Member · Joint Nozzle Lead':'Styremedlem · Felles dyseleder',
  'Finance & Partnership':'Økonomi & partnerskap','DAQ & Electronics':'DAQ & elektronikk','Marketing':'Markedsføring','Mentors':'Mentorer','Finance and Partnership':'Økonomi og partnerskap','For hire':'Vi søker','Builds the financial runway, partner relationships, procurement structure, and long-term sustainability behind the engineering programme.':'Bygger det økonomiske handlingsrommet, partnerrelasjonene, innkjøpsstrukturen og den langsiktige bærekraften bak ingeniørprogrammet.','Join this team':'Bli med i teamet','DAQ and Electronics':'DAQ og elektronikk','Owns sensors, data acquisition, wiring, signal integrity, controls interfaces, and the evidence needed to understand every test.':'Eier sensorer, datainnsamling, kabling, signalintegritet, styringsgrensesnitt og datagrunnlaget som trengs for å forstå hver test.','Mentors support the technical teams with specialist experience, review, and practical guidance.':'Mentorer støtter de tekniske teamene med spesialkompetanse, faglige gjennomganger og praktisk veiledning.','CFD Mentor':'CFD-mentor','Raises inlet-air pressure and couples aerodynamic design to the engine cycle and rotating assembly.':'Øker trykket i innløpsluften og kobler aerodynamisk design til motorsyklusen og den roterende enheten.','CEO · Compressor Lead · Chairman of the Board':'Daglig leder · Kompressorleder · Styreleder','Combustion':'Forbrenning','Develops stable heat release, fuel delivery, liner architecture, pressure-loss control, and temperature distribution.':'Utvikler stabil varmefrigjøring, drivstofftilførsel, linerarkitektur, kontroll av trykktap og temperaturfordeling.','Combustion Lead · Board Member':'Forbrenningsleder · Styremedlem','Extracts the work needed by the compressor while confronting the engine’s most demanding thermal and mechanical environment.':'Henter ut arbeidet kompressoren trenger, i motorens mest krevende termiske og mekaniske miljø.','Turbine Lead · Board Member':'Turbinleder · Styremedlem','Converts the core’s remaining pressure and heat into exhaust velocity and integrates the afterburning flowpath.':'Omdanner kjernens gjenværende trykk og varme til eksoshastighet og integrerer strømningsbanen gjennom etterbrenneren.','Joint Nozzle Lead · Board Member':'Felles dyseleder · Styremedlem','Marketing and Digital Presence':'Markedsføring og digital tilstedeværelse','Turns complex engineering into a clear public story across brand, media, recruitment, documentation, and digital experiences.':'Gjør kompleks ingeniørkunst til en tydelig offentlig fortelling gjennom merkevare, medier, rekruttering, dokumentasjon og digitale opplevelser.','A missing name can be yours':'Det manglende navnet kan være ditt','Bring your discipline.':'Ta med fagområdet ditt.','Build the':'Bygg','whole.':'helheten.','Apply now':'Søk nå',
  'Do you wish to join the development and testing of a jet engine?':'Vil du være med å utvikle og teste en jetmotor?',
  'Start a conversation':'Start en samtale','LET’S MAKE':'LA OSS TA','CONTACT.':'KONTAKT.','Have a question, an idea, or an opportunity to work together? Send us a message.':'Har du et spørsmål, en idé eller en mulighet for samarbeid? Send oss en melding.','General':'Generelt','Partnership?':'Partnerskap?','First name':'Fornavn','Last name':'Etternavn','Email':'E-post','Subject':'Emne','Message':'Melding','Prepare email':'Klargjør e-post','Opens your email app with the message addressed to contact@jetntnu.no.':'Åpner e-postprogrammet ditt med meldingen adressert til contact@jetntnu.no.','Your name':'Navnet ditt','Organisation':'Organisasjon','Work email':'Jobb-e-post','Partnership idea':'Idé for partnerskap','Technical collaboration':'Teknisk samarbeid','Financial partnership':'Finansielt partnerskap','Manufacturing or materials':'Produksjon eller materialer','Testing and facilities':'Testing og fasiliteter','Other partnership':'Annet partnerskap','Tell us more':'Fortell oss mer','Prepare partnership email':'Klargjør partner-e-post','Opens your email app with the message addressed to partner@jetntnu.no.':'Åpner e-postprogrammet ditt med meldingen adressert til partner@jetntnu.no.',
  "Norway's first student-run jet engine organization.":'Norges første studentdrevne jetmotororganisasjon.','Navigate':'Naviger','Take part':'Bli med','Follow the build':'Følg utviklingen',
  'Chief Financial Officer (CFO)':'Økonomiansvarlig (CFO)','Chief Partnerships Officer (CPO)':'Partnerskapsansvarlig (CPO)','DAQ Lead':'DAQ-leder','Electronics Lead':'Elektronikkleder','CFD Analyst':'CFD-analytiker','Marketing Manager':'Markedsansvarlig','Open position':'Ledig rolle',
  'Build Jotun with us.':'Bygg Jotun med oss.','Would you like to help Jet develop Project Jotun and build a strong student community for aviation?':'Ønsker du å hjelpe Jet med å utvikle prosjekt Jotun og bygge et sterkt studentmiljø for luftfart?','Become a partner':'Bli partner','Partnerships will be presented here as Jet NTNU grows.':'Partnerne våre vil presenteres her etter hvert som Jet NTNU vokser.',
  'Interactive preliminary centrifugal compressor model':'Interaktiv foreløpig sentrifugalkompressormodell','Loading 3D model…':'Laster 3D-modell…','Fullscreen':'Fullskjerm','View model fullscreen':'Vis modellen i fullskjerm','Drag to rotate':'Dra for å rotere','Scroll to zoom':'Rull for å zoome'
};

const params = new URLSearchParams(window.location.search);
const requestedLanguage = params.get('lang');
if (requestedLanguage === 'en' || requestedLanguage === 'no') {
  localStorage.setItem('jet-language', requestedLanguage);
}
const language = requestedLanguage === 'en'
  ? 'en'
  : requestedLanguage === 'no'
    ? 'no'
    : localStorage.getItem('jet-language') === 'en' ? 'en' : 'no';

['site', 'confirmed', 'revision', 'apply', 'refinement', 'lang'].forEach((key) => params.delete(key));
const cleanLocation = `${window.location.pathname}${params.size ? `?${params}` : ''}${window.location.hash}`;
if (cleanLocation !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
  window.history.replaceState({}, '', cleanLocation);
}
document.documentElement.lang = language;

if (language === 'no') {
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (['SCRIPT','STYLE'].includes(node.parentElement?.tagName)) return;
    const value = node.nodeValue.trim();
    if (!norwegian[value]) return;
    node.nodeValue = node.nodeValue.replace(value, norwegian[value]);
  });
}

const languageToggle = document.createElement('div');
languageToggle.className = 'language-toggle';
languageToggle.setAttribute('aria-label', language === 'no' ? 'Velg språk' : 'Choose language');
languageToggle.innerHTML = `
  <button type="button" data-language="no" aria-label="Norsk" title="Norsk" class="${language === 'no' ? 'active' : ''}">
    <img src="/assets/flag-norway-official.png" alt="" />
    <span>Norsk</span>
  </button>
  <button type="button" data-language="en" aria-label="English" title="English" class="${language === 'en' ? 'active' : ''}">
    <img src="/assets/flag-great-britain-official.png" alt="" />
    <span>English</span>
  </button>`;
const headerUtilities = document.createElement('div');
headerUtilities.className = 'header-utilities';
headerUtilities.append(languageToggle);
const headerContactLink = document.createElement('a');
headerContactLink.className = 'header-contact-link';
headerContactLink.href = '/contact';
headerContactLink.textContent = language === 'no' ? 'Kontakt oss' : 'Contact us';
if (window.location.pathname.endsWith('/contact.html') || window.location.pathname.endsWith('/contact')) headerContactLink.classList.add('active');
headerUtilities.append(headerContactLink);
document.querySelector('.site-header')?.append(headerUtilities);

const headerUtilityStyles = document.createElement('style');
headerUtilityStyles.textContent = `
  .header-utilities{display:flex;flex-direction:column;align-items:flex-end;gap:5px;margin-left:24px;padding-left:20px;border-left:1px solid rgba(255,255,255,.24)}
  .site-header .header-utilities .language-toggle{width:auto;margin:0;padding:0;border-left:0;justify-content:flex-end}
  .header-contact-link{padding-right:8px;color:inherit;font:600 .5rem/1.2 "Manrope",sans-serif;letter-spacing:.15em;text-transform:uppercase;opacity:.68;transition:.2s ease}
  .header-contact-link:hover,.header-contact-link.active{opacity:1;color:#85b1ff}
  .contact-page .header-utilities{border-left-color:rgba(0,17,61,.18)}
  .contact-page .header-contact-link{color:#00113d}.contact-page .header-contact-link:hover,.contact-page .header-contact-link.active{color:#004fff}
  @media(max-width:1120px){.header-utilities{order:3;width:100%;margin:6px 0 0;padding:0;border-left:0}.site-header .header-utilities .language-toggle{width:auto}.header-contact-link{padding-right:7px}}
  @media(max-width:600px){.header-contact-link{font-size:.45rem;padding-right:5px}}
`;
document.head.append(headerUtilityStyles);

languageToggle.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => {
  localStorage.setItem('jet-language', button.dataset.language);
  window.location.reload();
}));

const teamGroups = [...document.querySelectorAll('.team-group')];
const teamGroupsToggle = document.querySelector('.team-groups-toggle');

if (teamGroupsToggle && teamGroups.length) {
  const updateTeamGroupsToggle = () => {
    const allOpen = teamGroups.every((group) => group.open);
    teamGroupsToggle.textContent = allOpen
      ? (language === 'no' ? 'Lukk alle' : 'Collapse all')
      : (language === 'no' ? 'Utvid alle' : 'Expand all');
    teamGroupsToggle.setAttribute('aria-expanded', String(allOpen));
  };

  teamGroupsToggle.addEventListener('click', () => {
    const shouldOpen = !teamGroups.every((group) => group.open);
    teamGroups.forEach((group) => { group.open = shouldOpen; });
    updateTeamGroupsToggle();
  });

  teamGroups.forEach((group) => group.addEventListener('toggle', updateTeamGroupsToggle));
  updateTeamGroupsToggle();
}

const modelFullscreenButton = document.querySelector('.model-fullscreen');
const compressorModelShell = document.querySelector('.compressor-model-shell');
if (modelFullscreenButton && compressorModelShell) {
  modelFullscreenButton.setAttribute('aria-label', language === 'no' ? 'Vis modellen i fullskjerm' : 'View model fullscreen');
  modelFullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else compressorModelShell.requestFullscreen?.();
  });
}

const formTabs = document.querySelectorAll('.form-tab');
const contactForms = document.querySelectorAll('.contact-form');

formTabs.forEach((tab) => tab.addEventListener('click', () => {
  formTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  contactForms.forEach((form) => form.classList.toggle('active', form.id === tab.dataset.formTarget));
}));

contactForms.forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const sender = [data.get('firstName'), data.get('lastName')].filter(Boolean).join(' ');
  const organisation = data.get('organisation');
  const subject = data.get('subject') || (language === 'no' ? 'Henvendelse fra nettsiden' : 'Website enquiry');
  const body = [
    data.get('message'),
    '',
    language === 'no' ? 'Kontaktdetaljer:' : 'Contact details:',
    `${language === 'no' ? 'Fra' : 'From'}: ${sender}`,
    organisation ? `${language === 'no' ? 'Organisasjon' : 'Organisation'}: ${organisation}` : null,
    `${language === 'no' ? 'Svar til' : 'Reply to'}: ${data.get('email')}`,
  ].filter(Boolean).join('\n');
  window.location.href = `mailto:${form.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}));
