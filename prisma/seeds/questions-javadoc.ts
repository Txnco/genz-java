import { QuestionType, Difficulty } from '@prisma/client'
import { createCompileOptions, createShuffledOptions } from './seed-utils'

export const javadocQuestions = {
  lectureSlug: 'javadoc',
  questions: [
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je glavna svrha Javadoc dokumentacije u Javi?",
    "explanation": "Javadoc je sustav za generiranje HTML dokumentacije iz posebno formatiranih komentara u Java kodu. Pomaže programerima razumjeti API bez čitanja implementacije, olakšava timski rad i suradnju, moderne IDE automatski prikazuju Javadoc tooltip-e, i predstavlja profesionalni standard u industriji. Javadoc dokumentira JAVNI API (što radi), ne implementaciju (kako radi).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Generiranje HTML dokumentacije iz posebno formatiranih komentara u kodu", "isCorrect": true },
      { "text": "Automatsko testiranje koda i pronalaženje bugova", "isCorrect": false },
      { "text": "Kompiliranje Java koda u bytecode", "isCorrect": false },
      { "text": "Optimizacija performansi programa", "isCorrect": false },
      { "text": "Kreiranje backup kopija koda", "isCorrect": false },
      { "text": "Debugging i praćenje izvođenja programa", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su tri vrste komentara u Javi?",
    "explanation": "Java ima tri vrste komentara: (1) Jednolinijski komentar sa // za kratke bilješke, (2) Višelinijski komentar sa /* */ za duža objašnjenja kroz više redaka, (3) Javadoc komentar sa /** */ koji služi za generiranje dokumentacije i koristi posebne @oznake. Javadoc komentari se pišu SAMO za public i protected članove.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Jednolinijski komentar sa //", "isCorrect": true },
      { "text": "Višelinijski komentar sa /* */", "isCorrect": true },
      { "text": "Javadoc komentar sa /** */", "isCorrect": true },
      { "text": "XML komentar sa <!-- -->", "isCorrect": false },
      { "text": "Inline komentar sa # (kao Python)", "isCorrect": false },
      { "text": "Block komentar sa {* *}", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Za koje članove klase se piše Javadoc dokumentacija?",
    "explanation": "Javadoc dokumentacija se piše SAMO za public i protected članove - klase, metode, konstruktore, atribute koji su dio javnog API-ja. Private članovi ne trebaju Javadoc jer nisu vidljivi izvana (osim ako su iznimno kompleksni). Cilj je dokumentirati javno sučelje klase, ne privatnu implementaciju. Package-private članovi također obično ne trebaju Javadoc.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Samo za public i protected članove", "isCorrect": true },
      { "text": "Za sve članove uključujući private", "isCorrect": false },
      { "text": "Samo za static metode", "isCorrect": false },
      { "text": "Samo za konstruktore", "isCorrect": false },
      { "text": "Samo za final varijable", "isCorrect": false },
      { "text": "Samo za apstraktne metode", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'zlatno pravilo' Javadoc dokumentacije vezano za prvu rečenicu?",
    "explanation": "Zlatno pravilo kaže da prva rečenica MORA biti samostalan sažetak koji se može čitati odvojeno. Javadoc alat koristi prvu rečenicu (do prve točke) za pregled metoda u dokumentaciji. Prva rečenica treba početi glagolom ('Izračunava...', 'Dohvaća...', 'Vraća...'), biti jasna i koncizna. Detalji dolaze u dodatnim rečenicama nakon prve točke.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Prva rečenica mora biti samostalan sažetak i završava prvom točkom - koristi se za pregled", "isCorrect": true },
      { "text": "Prva rečenica mora sadržavati ime autora", "isCorrect": false },
      { "text": "Prva rečenica mora biti duža od 50 znakova", "isCorrect": false },
      { "text": "Prva rečenica mora započeti velikim slovom i @ oznakom", "isCorrect": false },
      { "text": "Prva rečenica ne smije sadržavati HTML oznake", "isCorrect": false },
      { "text": "Prva rečenica mora biti upitna rečenica", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Javadoc oznake (@tags) su obavezne za klasu?",
    "explanation": "Za klase i sučelja obavezne su @author oznaka (tko je autor koda) i @version oznaka (trenutna verzija). Preporučuje se dodati i @since (od koje verzije postoji) i @see (reference na povezane klase). @param i @return se koriste samo za metode, ne za klase. @throws se koristi za metode koje bacaju iznimke.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "@author - autor koda", "isCorrect": true },
      { "text": "@version - verzija klase", "isCorrect": true },
      { "text": "@since - od koje verzije postoji (preporučeno)", "isCorrect": false },
      { "text": "@param - opis parametara", "isCorrect": false },
      { "text": "@return - povratna vrijednost", "isCorrect": false },
      { "text": "@constructor - opis konstruktora", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Javadoc oznake su obavezne za metode?",
    "explanation": "Za metode su obavezne: (1) @param za SVAKI parametar metode, (2) @return ako metoda NIJE void (opisuje povratnu vrijednost), (3) @throws ili @exception za SVAKU checked iznimku koju metoda baca. Preporučuju se i @see (reference), @since (verzija), @deprecated (ako je zastarjela). @author i @version se koriste samo za klase.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "@param - opis svakog parametra metode", "isCorrect": true },
      { "text": "@return - opis povratne vrijednosti (ako nije void)", "isCorrect": true },
      { "text": "@throws - opis svake iznimke koju metoda baca", "isCorrect": true },
      { "text": "@author - autor metode", "isCorrect": false },
      { "text": "@version - verzija metode", "isCorrect": false },
      { "text": "@constructor - za konstruktor metode", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "U kojem licu i stilu se piše Javadoc dokumentacija za metode?",
    "explanation": "Javadoc dokumentacija za metode piše se u trećem licu i počinje glagolom koji opisuje što metoda radi. Primjeri: 'Izračunava prosjek...', 'Dohvaća listu...', 'Vraća naziv...'. NE pišemo 'Ova metoda izračunava...' ili 'Ja dohvaćam...'. Stil je koncizan, profesionalan i fokusiran na ŠTO metoda radi, ne KAKO.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Treće lice, počinje glagolom ('Izračunava', 'Dohvaća', 'Vraća')", "isCorrect": true },
      { "text": "Prvo lice jednine ('Ja izračunavam', 'Dohvaćam')", "isCorrect": false },
      { "text": "Drugo lice ('Ti izračunavaš', 'Dohvaćaš')", "isCorrect": false },
      { "text": "Imperativ ('Izračunaj', 'Dohvati')", "isCorrect": false },
      { "text": "Pasiv ('Biti izračunat', 'Biti dohvaćen')", "isCorrect": false },
      { "text": "Prvo lice množine ('Mi izračunavamo')", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Javadoc dokumentacija se automatski nasljeđuje iz nadklasa i sučelja u podklase.",
    "explanation": "TRUE. Java automatski nasljeđuje Javadoc dokumentaciju. Kada podklasa @Override-a metodu ili implementira sučelje, ne treba ponovno pisati dokumentaciju - ona se automatski nasljeđuje i dodaju se oznake 'Overrides' ili 'Specified by'. Ovo smanjuje dupliciranje i održava konzistentnost. Dokumentaciju treba ponovno pisati samo ako se ponašanje razlikuje od originala.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": true },
      { "text": "False", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja Javadoc oznaka se koristi za označavanje zastarjelih metoda?",
    "explanation": "@deprecated oznaka označava da je metoda zastarjela i ne treba se više koristiti. Uz nju treba dodati objašnjenje zašto je zastarjela i što koristiti umjesto nje (često sa {@link} oznakom). U Javi postoji i @Deprecated anotacija koja se stavlja prije metode. Primjer: @deprecated Koristite {@link #novaMetoda()} za bolju performansu.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "@deprecated", "isCorrect": true },
      { "text": "@obsolete", "isCorrect": false },
      { "text": "@old", "isCorrect": false },
      { "text": "@legacy", "isCorrect": false },
      { "text": "@outdated", "isCorrect": false },
      { "text": "@removed", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje HTML oznake se mogu koristiti u Javadoc dokumentaciji?",
    "explanation": "Javadoc podržava osnovne HTML oznake za formatiranje: <p> za paragrafe, <ul> i <ol> za liste, <li> za stavke liste, <code> za inline kod, <pre> za blokove koda, <b> i <i> za bold/italic, <br> za novi red. Ove oznake omogućavaju bolju strukturu i čitljivost dokumentacije. Koriste se za liste značajki, primjere, naglašavanje važnih dijelova.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "<p> za paragrafe", "isCorrect": true },
      { "text": "<ul>, <ol>, <li> za liste", "isCorrect": true },
      { "text": "<code> i <pre> za kod", "isCorrect": true },
      { "text": "<script> za JavaScript", "isCorrect": false },
      { "text": "<style> za CSS", "isCorrect": false },
      { "text": "<div> i <span> za layout", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja moderna Javadoc oznaka (Java 18+) služi za uključivanje primjera koda?",
    "explanation": "{@snippet} tag (uveden u Java 18) služi za uključivanje primjera koda u dokumentaciju. Zamjena je za stariji stil s <pre> i <code> oznakama. Sintaksa: {@snippet : kod ovdje }. Omogućava ljepše formatiranje primjera koda i bolju integraciju s IDE-om. Stariji način je bio: <pre><code>primjer</code></pre>.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "{@snippet}", "isCorrect": true },
      { "text": "{@code}", "isCorrect": false },
      { "text": "{@example}", "isCorrect": false },
      { "text": "{@sample}", "isCorrect": false },
      { "text": "{@demo}", "isCorrect": false },
      { "text": "{@program}", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja Javadoc oznaka se koristi za kreiranje linka na drugu klasu ili metodu?",
    "explanation": "{@link} i {@linkplain} oznake kreiraju linkove na druge klase, metode ili članove u dokumentaciji. {@link} prikazuje link s monospace fontom (kao kod), dok {@linkplain} prikazuje običan tekst. Sintaksa: {@link ClassName#methodName()} ili {@linkplain Student}. Ovo omogućava navigaciju kroz dokumentaciju i povezivanje povezanih koncepata.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "{@link} i {@linkplain}", "isCorrect": true },
      { "text": "@see", "isCorrect": false },
      { "text": "{@ref}", "isCorrect": false },
      { "text": "{@href}", "isCorrect": false },
      { "text": "{@url}", "isCorrect": false },
      { "text": "@reference", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja Javadoc oznaka prikazuje vrijednost konstante u dokumentaciji?",
    "explanation": "{@value} oznaka automatski prikazuje vrijednost konstante (static final polja) u dokumentaciji. Ne treba ručno upisivati vrijednost - Javadoc alat je sam učita iz koda. Primjer: Maksimalni broj: {@value MAX_STUDENTS}. Ako se konstanta promijeni, dokumentacija se automatski ažurira pri sljedećem generiranju. Koristi se za dokumentiranje konstanti i defaultnih vrijednosti.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "{@value}", "isCorrect": true },
      { "text": "{@constant}", "isCorrect": false },
      { "text": "{@final}", "isCorrect": false },
      { "text": "{@static}", "isCorrect": false },
      { "text": "{@default}", "isCorrect": false },
      { "text": "@const", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Što su best practices za pisanje Javadoc dokumentacije?",
    "explanation": "Best practices: (1) Dokumentiraj SVE public metode i klase, (2) Objasni ŠTO metoda radi, NE KAKO (implementacija se može promijeniti), (3) Navedi sve parametre, povratne vrijednosti i iznimke, (4) Koristi primjere koda za kompleksne metode, (5) Ažuriraj dokumentaciju kad mijenjаš kod - zastarjela dokumentacija je gora od nedostatka dokumentacije, (6) Budi koncizan - ne piši romane.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Dokumentiraj SVE public metode i klase", "isCorrect": true },
      { "text": "Objasni ŠTO metoda radi, NE KAKO", "isCorrect": true },
      { "text": "Ažuriraj dokumentaciju kad mijenjаš kod", "isCorrect": true },
      { "text": "Dokumentiraj private metode uvijek", "isCorrect": false },
      { "text": "Kopiraj cijeli kod u dokumentaciju", "isCorrect": false },
      { "text": "Piši detaljne romane o svakoj metodi", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći Javadoc komentar pravilno kompilirati i generirati?",
    "codeSnippet": "/**\n * Izračunava prosjek ocjena studenta.\n * \n * @param ocjene lista ocjena (1-5)\n * @return prosjek ocjena kao double\n * @throws IllegalArgumentException ako je lista prazna\n */\npublic double izracunajProsjek(List<Integer> ocjene) {\n    if (ocjene.isEmpty()) {\n        throw new IllegalArgumentException(\"Lista ne smije biti prazna\");\n    }\n    return ocjene.stream().mapToInt(Integer::intValue).average().orElse(0.0);\n}",
    "explanation": "Javadoc će se pravilno generirati. Dokumentacija sadrži sve potrebne elemente: opisnu prvu rečenicu, @param za parametar ocjene, @return za povratnu vrijednost, i @throws za iznimku. Prva rečenica počinje glagolom ('Izračunava'), što je good practice. Formatirane je ispravno s /** */ oznakama. Metoda odgovara dokumentaciji - baca IllegalArgumentException za praznu listu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Da, Javadoc je pravilno napisan i bit će generiran", "isCorrect": true },
      { "text": "Ne, nedostaje @author oznaka", "isCorrect": false },
      { "text": "Ne, @throws mora biti prije @return", "isCorrect": false },
      { "text": "Ne, List<Integer> nije podržan tip u Javadoc", "isCorrect": false },
      { "text": "Ne, prva rečenica ne smije završavati točkom", "isCorrect": false },
      { "text": "Ne, mora biti @exception umjesto @throws", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećoj Javadoc dokumentaciji:",
    "codeSnippet": "/**\n * Ova metoda se koristi za dohvaćanje imena studenta.\n * Dohvaća ime studenta.\n * \n * @param student objekt studenta\n * @return ime studenta\n */\npublic String getIme(Student student) {\n    return student.getIme();\n}",
    "explanation": "Greška je u prvoj rečenici - krši 'zlatno pravilo'. Prva rečenica treba biti samostalan, jasan sažetak koji počinje glagolom. Ovdje prva rečenica je 'Ova metoda se koristi za dohvaćanje imena studenta' što je nejasno i preopširno. Trebalo bi: 'Dohvaća ime studenta.' kao prva rečenica. Dodatno, metoda prima parametar ali ne bi trebala - mogla bi biti jednostavno student.getIme() bez parametra.",
    "difficulty": "HARD",
    "options": [
      { "text": "Prva rečenica krši 'zlatno pravilo' - nije jasan sažetak i ne počinje glagolom", "isCorrect": true },
      { "text": "Nedostaje @author oznaka", "isCorrect": false },
      { "text": "Student nije valjan tip parametra", "isCorrect": false },
      { "text": "@return mora biti prije @param", "isCorrect": false },
      { "text": "Nema greške - dokumentacija je ispravna", "isCorrect": false },
      { "text": "Nedostaje @throws za NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećoj Javadoc dokumentaciji metode?",
    "codeSnippet": "/**\n * Sprema studenta u bazu podataka.\n * \n * @param student objekt studenta za spremanje\n */\npublic boolean saveStudent(Student student) throws SQLException {\n    // Spremanje u bazu...\n    return true;\n}",
    "explanation": "Nedostaju dvije obavezne Javadoc oznake: (1) @return - metoda vraća boolean pa mora imati opis povratne vrijednosti (npr. 'true ako je spremanje uspješno, false inače'), i (2) @throws SQLException - checked iznimka SQLException se baca pa mora biti dokumentirana. Svaka checked iznimka u throws potpisu MORA imati @throws oznaku u Javadoc-u.",
    "difficulty": "HARD",
    "options": [
      { "text": "Nedostaje @return za povratnu vrijednost i @throws za SQLException", "isCorrect": true },
      { "text": "Nedostaje samo @author oznaka", "isCorrect": false },
      { "text": "Nedostaje @version oznaka", "isCorrect": false },
      { "text": "Student tip nije dokumentiran", "isCorrect": false },
      { "text": "Nema greške - dokumentacija je potpuna", "isCorrect": false },
      { "text": "Nedostaje samo @since oznaka", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Je li sljedeća Javadoc dokumentacija klase pravilno napisana?",
    "codeSnippet": "/**\n * Student klasa.\n * \n * @author Marko Marić\n * @version 1.0\n */\npublic class Student {\n    private String ime;\n    private String prezime;\n    \n    public Student(String ime, String prezime) {\n        this.ime = ime;\n        this.prezime = prezime;\n    }\n}",
    "explanation": "Dokumentacija ima @author i @version što je dobro, ALI prva rečenica 'Student klasa.' je LOŠA PRAKSA. Prekriža i nejasna je. Trebalo bi: 'Predstavlja studenta na fakultetu.' ili 'Sadrži osnovne podatke o studentu.' Također, trebalo bi dodati detaljniji opis što klasa radi, koja svojstva ima, možda primjer korištenja. Konstruktor bi također trebao imati Javadoc sa @param oznakama.",
    "difficulty": "HARD",
    "options": [
      { "text": "Ne, prva rečenica je prekratka i nejasna - treba detaljniji opis što klasa predstavlja", "isCorrect": true },
      { "text": "Da, dokumentacija je potpuna i pravilna", "isCorrect": false },
      { "text": "Ne, nedostaje @since oznaka", "isCorrect": false },
      { "text": "Ne, private atributi moraju imati Javadoc", "isCorrect": false },
      { "text": "Ne, @version mora biti prije @author", "isCorrect": false },
      { "text": "Ne, konstruktor ne smije biti dokumentiran", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će se dogoditi s sljedećom Javadoc dokumentacijom pri generiranju?",
    "codeSnippet": "/**\n * Izračunava prosjek. Metoda uzima listu ocjena\n * i vraća prosjek kao decimalni broj.\n * \n * @param ocjene lista ocjena studenta\n * @return prosjek ocjena\n */\npublic double izracunajProsjek(List<Integer> ocjene) {\n    return ocjene.stream().mapToInt(Integer::intValue).average().orElse(0.0);\n}",
    "explanation": "Javadoc će se generirati, ALI prva rečenica će biti samo 'Izračunava prosjek.' - Javadoc alat uzima tekst do PRVE točke za sažetak. Ostatak teksta 'Metoda uzima listu ocjena i vraća prosjek kao decimalni broj.' će biti dio detaljnog opisa. To znači da će u overview pregledu metoda biti prikazan samo 'Izračunava prosjek.' što je dovoljno informativno. Ovo demonstrira važnost zlatnog pravila - prva rečenica do točke = sažetak.",
    "difficulty": "HARD",
    "options": [
      { "text": "Generirat će se, ali samo 'Izračunava prosjek.' bit će sažetak - Javadoc koristi tekst do prve točke", "isCorrect": true },
      { "text": "Neće se generirati - prva rečenica je prekratka", "isCorrect": false },
      { "text": "Neće se generirati - nedostaje HTML formatiranje", "isCorrect": false },
      { "text": "Cijeli tekst će biti sažetak", "isCorrect": false },
      { "text": "Neće se generirati - @param mora biti prije opisa", "isCorrect": false },
      { "text": "Generira se samo prva riječ kao sažetak", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Je li sljedeća upotreba HTML oznaka u Javadoc dokumentaciji pravilna?",
    "codeSnippet": "/**\n * Dohvaća listu aktivnih studenata.\n * <p>\n * Metoda filtrira studente prema sljedećim kriterijima:\n * <ul>\n *   <li>Status: aktivan</li>\n *   <li>Prosjek: veći od 2.0</li>\n *   <li>ECTS: minimalno 30</li>\n * </ul>\n * \n * @return lista Student objekata\n */\npublic List<Student> getAktivniStudenti() {\n    return studenti.stream()\n        .filter(s -> s.isAktivan() && s.getProsjek() > 2.0)\n        .collect(Collectors.toList());\n}",
    "explanation": "Upotreba HTML oznaka je PRAVILNA i predstavlja BEST PRACTICE. <p> tag odvaja paragrafe, <ul> kreira neuređenu listu, <li> označava stavke liste. Ovo čini dokumentaciju strukturiranom i čitljivom. Javadoc podržava osnovne HTML oznake za formatiranje. Lista jasno prikazuje kriterije filtriranja. Prva rečenica 'Dohvaća listu aktivnih studenata.' je dobar sažetak.",
    "difficulty": "HARD",
    "options": [
      { "text": "Da, upotreba <p>, <ul> i <li> oznaka je pravilna i predstavlja best practice", "isCorrect": true },
      { "text": "Ne, HTML oznake nisu dopuštene u Javadoc", "isCorrect": false },
      { "text": "Ne, mora se koristiti {@list} umjesto <ul>", "isCorrect": false },
      { "text": "Ne, <p> tag ne smije biti u Javadoc", "isCorrect": false },
      { "text": "Ne, liste moraju biti kreirane s @item oznakom", "isCorrect": false },
      { "text": "Ne, HTML mora biti escaped sa &lt; i &gt;", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će se dogoditi s {@link} oznakom u sljedećoj dokumentaciji?",
    "codeSnippet": "/**\n * Vraća student manager za upravljanje studentima.\n * <p>\n * Za spremanje studenta koristite {@link StudentManager#saveStudent(Student)}.\n * Za dohvaćanje koristite {@link #getStudent(String)}.\n * \n * @return StudentManager instanca\n * @see Student\n */\npublic StudentManager getManager() {\n    return new StudentManager();\n}",
    "explanation": "Javadoc će pravilno generirati linkove. {@link StudentManager#saveStudent(Student)} će kreirati link na saveStudent metodu u StudentManager klasi. {@link #getStudent(String)} bez naziva klase referira na getStudent metodu u trenutnoj klasi. U generiranoj HTML dokumentaciji, ove oznake postaju klikabilni linkovi koji vode na odgovarajuće metode. @see Student kreira 'See Also' sekciju s linkom na Student klasu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Generirat će klikabilne linkove na navedene metode u HTML dokumentaciji", "isCorrect": true },
      { "text": "Neće se kompilirati - {@link} nije podržan", "isCorrect": false },
      { "text": "Prikazat će običan tekst bez linkova", "isCorrect": false },
      { "text": "Neće se generirati jer nedostaje package ime", "isCorrect": false },
      { "text": "{@link} mora biti u @see oznaci", "isCorrect": false },
      { "text": "Baca grešku jer Student nije importan", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Je li sljedeća Javadoc dokumentacija za konstruktor pravilna?",
    "codeSnippet": "/**\n * Kreira novog studenta.\n * \n * @param ime ime studenta\n * @param prezime prezime studenta\n * @param jmbag matični broj (format: 10 znamenki)\n * @throws IllegalArgumentException ako je parametar null ili JMBAG neispravan\n */\npublic Student(String ime, String prezime, String jmbag) {\n    if (ime == null || prezime == null || jmbag == null) {\n        throw new IllegalArgumentException(\"Parametri ne smiju biti null\");\n    }\n    if (jmbag.length() != 10) {\n        throw new IllegalArgumentException(\"JMBAG mora imati 10 znamenki\");\n    }\n    this.ime = ime;\n    this.prezime = prezime;\n    this.jmbag = jmbag;\n}",
    "explanation": "Dokumentacija je PRAVILNA. Za konstruktore vrijede ista pravila kao za metode: prva rečenica sažetak ('Kreira novog studenta.'), @param za svaki parametar s opisom, @throws za iznimke. Konstruktori ne trebaju @return (jer ne vraćaju ništa eksplicitno). Dokumentacija opisuje što konstruktor radi i validacijska pravila. Dobra praksa je navesti format podataka (npr. 'format: 10 znamenki' za JMBAG).",
    "difficulty": "HARD",
    "options": [
      { "text": "Da, dokumentacija je pravilna - ima @param za sve parametre i @throws za iznimku", "isCorrect": true },
      { "text": "Ne, konstruktori ne smiju imati Javadoc", "isCorrect": false },
      { "text": "Ne, nedostaje @return oznaka", "isCorrect": false },
      { "text": "Ne, @throws mora biti prije @param", "isCorrect": false },
      { "text": "Ne, mora imati @constructor oznaku", "isCorrect": false },
      { "text": "Ne, prva rečenica mora sadržavati 'konstruktor'", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što je problem sa sljedećom Javadoc dokumentacijom?",
    "codeSnippet": "/**\n * Gets the student name.\n * \n * @return the student name\n */\npublic String getIme() {\n    return ime;\n}",
    "explanation": "Dokumentacija je na ENGLESKOM jeziku dok je kod (metoda 'getIme', atribut 'ime') na HRVATSKOM. Ovo je LOŠA PRAKSA - jezik dokumentacije i koda treba biti konzistentan. Ili sve na engleskom (getName, name, 'Gets the student name'), ili sve na hrvatskom (getIme, ime, 'Dohvaća ime studenta'). Miješanje jezika stvara konfuziju i otežava čitanje. U profesionalnim projektima obično se koristi engleski za sve.",
    "difficulty": "HARD",
    "options": [
      { "text": "Miješanje jezika - dokumentacija na engleskom, kod na hrvatskom - treba biti konzistentno", "isCorrect": true },
      { "text": "Nedostaje @param oznaka", "isCorrect": false },
      { "text": "Engleski nije dopušten u Javadoc", "isCorrect": false },
      { "text": "Getter metode ne smiju imati Javadoc", "isCorrect": false },
      { "text": "Nema problema - ovo je pravilno", "isCorrect": false },
      { "text": "Trebalo bi biti 'Returns' umjesto '@return'", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Kako se pravilno dokumentira zastarjela metoda u Javi?",
    "codeSnippet": "/**\n * Sprema studenta u bazu.\n * \n * @param student student za spremanje\n * @return true ako je uspješno\n * @deprecated Koristite {@link #saveStudentAsync(Student)} \n *             za bolju performansu od verzije 2.0\n */\n@Deprecated(since = \"2.0\", forRemoval = true)\npublic boolean saveStudent(Student student) {\n    return true;\n}",
    "explanation": "Ovo je PRAVILNA dokumentacija zastarjele metode. Koristi se: (1) @deprecated Javadoc oznaka s objašnjenjem zašto je zastarjela, (2) {@link} za upućivanje na novu metodu, (3) @Deprecated Java anotacija s 'since' verzijom i 'forRemoval' flagom. Best practice je uvijek ponuditi alternativu i razlog. IDE će pokazati upozorenje kod korištenja zastarjele metode i ponuditi zamjenu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Pravilno - ima @deprecated Javadoc oznaku i @Deprecated anotaciju s objašnjenjem i alternativom", "isCorrect": true },
      { "text": "Nepravilno - @deprecated i @Deprecated ne mogu se kombinirati", "isCorrect": false },
      { "text": "Nepravilno - nedostaje @obsolete oznaka", "isCorrect": false },
      { "text": "Nepravilno - {@link} ne smije biti u @deprecated", "isCorrect": false },
      { "text": "Nepravilno - zastarjele metode ne smiju imati Javadoc", "isCorrect": false },
      { "text": "Nepravilno - forRemoval ne postoji", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će biti rezultat generiranja Javadoc dokumentacije za sljedeću klasu?",
    "codeSnippet": "public class Student {\n    /**\n     * Ime studenta.\n     */\n    private String ime;\n    \n    /**\n     * Dohvaća ime studenta.\n     * \n     * @return ime studenta\n     */\n    public String getIme() {\n        return ime;\n    }\n    \n    // Private helper metoda\n    private void validate() {\n        // validacija\n    }\n}",
    "explanation": "Javadoc će generirati dokumentaciju SAMO za public metodu getIme(). Private atribut 'ime' i private metoda 'validate()' NEĆE biti u dokumentaciji jer Javadoc standardno dokumentira samo public i protected članove. Dokumentacija private članova je NEPOTREBNA jer nisu dio javnog API-ja. Ako se želi uključiti i private članove, mora se koristiti -private flag pri generiranju.",
    "difficulty": "HARD",
    "options": [
      { "text": "Generira se samo dokumentacija za getIme() - private članovi se ne dokumentiraju", "isCorrect": true },
      { "text": "Generira se dokumentacija za sve članove", "isCorrect": false },
      { "text": "Neće se generirati ništa jer nedostaje class-level Javadoc", "isCorrect": false },
      { "text": "Neće se generirati jer private atribut ima Javadoc", "isCorrect": false },
      { "text": "Baca grešku zbog dokumentiranog private atributa", "isCorrect": false },
      { "text": "Generirat će samo dokumentaciju za atribut ime", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između {@link} i @see oznaka?",
    "codeSnippet": "/**\n * Dohvaća studenta prema JMBAG-u.\n * <p>\n * Za spremanje studenta koristite {@link #saveStudent(Student)} metodu.\n * \n * @param jmbag jedinstveni matični broj\n * @return Student objekt ili null\n * @see Student\n * @see #saveStudent(Student)\n * @see StudentManager\n */\npublic Student getStudent(String jmbag) {\n    return database.get(jmbag);\n}",
    "explanation": "{@link} se koristi INLINE unutar teksta opisa i kreira klikabilan link direktno u rečenici. @see se koristi na kraju dokumentacije i kreira posebnu 'See Also' sekciju s listom povezanih elemenata. {@link} je za kontekstualne reference u tekstu, @see za dodatne reference. Oba kreiraju linkove, ali {@link} je dio teksta, @see je odvojena sekcija. Mogu se kombinirati kao u primjeru.",
    "difficulty": "HARD",
    "options": [
      { "text": "{@link} je inline u tekstu, @see kreira odvojenu 'See Also' sekciju na kraju", "isCorrect": true },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "{@link} je za klase, @see za metode", "isCorrect": false },
      { "text": "@see kreira link, {@link} samo tekst", "isCorrect": false },
      { "text": "{@link} radi samo s metodama", "isCorrect": false },
      { "text": "@see je zastarjela verzija {@link}", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Je li sljedeća dokumentacija s {@value} oznakom pravilna?",
    "codeSnippet": "/**\n * Maksimalni broj studenata po grupi: {@value MAX_STUDENTS_PER_GROUP}\n */\npublic static final int MAX_STUDENTS_PER_GROUP = 30;\n\n/**\n * Kreira novu grupu s ograničenjem od {@value MAX_STUDENTS_PER_GROUP} studenata.\n * \n * @param naziv naziv grupe\n */\npublic Grupa(String naziv) {\n    this.naziv = naziv;\n    this.maxStudenata = MAX_STUDENTS_PER_GROUP;\n}",
    "explanation": "Dokumentacija je PRAVILNA. {@value MAX_STUDENTS_PER_GROUP} automatski zamjenjuje se s '30' u generiranoj dokumentaciji. {@value} oznaka se koristi za prikazivanje vrijednosti konstanti (static final polja). Može se koristiti i unutar dokumentacije drugih metoda/klasa za referenciranje konstante. Prednost je što se automatski ažurira ako se konstanta promijeni - ne treba ručno mijenjati dokumentaciju.",
    "difficulty": "HARD",
    "options": [
      { "text": "Da, {@value} pravilno prikazuje vrijednost konstante (30) u dokumentaciji", "isCorrect": true },
      { "text": "Ne, {@value} radi samo za String konstante", "isCorrect": false },
      { "text": "Ne, {@value} mora biti u @param oznaci", "isCorrect": false },
      { "text": "Ne, mora biti {@constant} umjesto {@value}", "isCorrect": false },
      { "text": "Ne, {@value} ne može biti u konstruktoru", "isCorrect": false },
      { "text": "Ne, static final polja ne mogu imati Javadoc", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će se dogoditi kada podklasa nadjačava metodu s Javadoc dokumentacijom?",
    "codeSnippet": "public interface Osoba {\n    /**\n     * Vraća puno ime osobe.\n     * \n     * @return ime i prezime odvojeni razmakom\n     */\n    String getPunoIme();\n}\n\npublic class Student implements Osoba {\n    private String ime;\n    private String prezime;\n    \n    @Override\n    public String getPunoIme() {\n        return ime + \" \" + prezime;\n    }\n}",
    "explanation": "Javadoc dokumentacija će se AUTOMATSKI NASLIJEDITI iz sučelja Osoba. Student.getPunoIme() će imati istu dokumentaciju kao Osoba.getPunoIme() plus dodatnu oznaku 'Specified by: getPunoIme in interface Osoba'. NE TREBA ponovno pisati dokumentaciju u podklasi. Ovo smanjuje dupliciranje i održava konzistentnost. Dokumentaciju treba ponovno napisati SAMO ako se ponašanje razlikuje od originala.",
    "difficulty": "HARD",
    "options": [
      { "text": "Dokumentacija se automatski naslijeđuje iz sučelja - ne treba je ponovno pisati", "isCorrect": true },
      { "text": "Student.getPunoIme() neće imati nikakvu dokumentaciju", "isCorrect": false },
      { "text": "Baca grešku jer Student nema vlastitu dokumentaciju", "isCorrect": false },
      { "text": "Mora se kopirati dokumentacija iz sučelja", "isCorrect": false },
      { "text": "@Override sprječava nasljeđivanje dokumentacije", "isCorrect": false },
      { "text": "Automatsko nasljeđivanje radi samo za apstraktne klase", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je najbolja praksa za dokumentiranje parametara koji mogu biti null?",
    "codeSnippet": "/**\n * Postavlja email adresu studenta.\n * \n * @param email email adresa (može biti null za brisanje)\n */\npublic void setEmail(String email) {\n    this.email = email;\n}\n\n/**\n * Postavlja adresu studenta.\n * \n * @param adresa adresa stanovanja (ne smije biti null)\n * @throws IllegalArgumentException ako je adresa null\n */\npublic void setAdresa(String adresa) {\n    if (adresa == null) {\n        throw new IllegalArgumentException(\"Adresa ne smije biti null\");\n    }\n    this.adresa = adresa;\n}",
    "explanation": "Ovo je BEST PRACTICE za dokumentiranje null vrijednosti. UVIJEK eksplicitno navedi: (1) Ako parametar MOŽE biti null - objasni što to znači ('može biti null za brisanje'), (2) Ako parametar NE SMIJE biti null - navedi to jasno ('ne smije biti null') i dokumentiraj @throws IllegalArgumentException. Ovo sprječava NullPointerException i jasno komunicira ugovor metode. Moderne verzije Jave koriste @Nullable i @NonNull anotacije, ali Javadoc opis je i dalje važan.",
    "difficulty": "HARD",
    "options": [
      { "text": "Best practice - eksplicitno navodi može li parametar biti null ili ne i što se događa", "isCorrect": true },
      { "text": "Loše - ne smije se spominjati null u dokumentaciji", "isCorrect": false },
      { "text": "Loše - mora postojati @nullable oznaka", "isCorrect": false },
      { "text": "Loše - null se automatski podrazumijeva za sve parametre", "isCorrect": false },
      { "text": "Loše - IllegalArgumentException ne smije biti dokumentiran", "isCorrect": false },
      { "text": "Best practice samo za prvi primjer", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje naredbe se generira Javadoc dokumentacija iz komandne linije?",
    "codeSnippet": "// Struktura projekta:\n// src/\n//   hr/\n//     fer/\n//       oop/\n//         Student.java\n//         StudentManager.java\n\n// Želimo generirati dokumentaciju u docs/ direktorij",
    "explanation": "Osnovna naredba je: javadoc -d docs -sourcepath src -subpackages hr.fer.oop. Parametri: -d docs (output direktorij), -sourcepath src (gdje je source kod), -subpackages hr.fer.oop (koji package dokumentirati). Dodatni parametri: -author (uključi autore), -version (uključi verzije), -private (dokumentiraj i private članove), -link (link na eksterne API-je kao Java SE).",
    "difficulty": "HARD",
    "options": [
      { "text": "javadoc -d docs -sourcepath src -subpackages hr.fer.oop", "isCorrect": true },
      { "text": "java -doc docs src/hr/fer/oop/*.java", "isCorrect": false },
      { "text": "javac -docs -output docs src/**", "isCorrect": false },
      { "text": "mvn javadoc src docs", "isCorrect": false },
      { "text": "gradle docs --source src --output docs", "isCorrect": false },
      { "text": "javadoc --generate docs src/hr/fer/oop", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što je problem sa sljedećom Javadoc dokumentacijom?",
    "codeSnippet": "/**\n * @param ime ime studenta\n * @param prezime prezime studenta\n * @return Student objekt\n * \n * Kreira novog studenta s navedenim podacima.\n */\npublic Student(String ime, String prezime) {\n    this.ime = ime;\n    this.prezime = prezime;\n}",
    "explanation": "Problem je u REDOSLIJEDU - opis metode ('Kreira novog studenta...') mora biti NA POČETKU, prije svih @ oznaka. Pravilan format: prvo dolazi opisni tekst, PA ONDA @param, @return, @throws oznake. Trenutni redoslijed (@param pa opis) je kriv i Javadoc alat neće pravilno parsirati dokumentaciju. Također, konstruktori ne trebaju @return oznaku.",
    "difficulty": "HARD",
    "options": [
      { "text": "Opis mora biti na početku prije @ oznaka, ne nakon njih", "isCorrect": true },
      { "text": "Konstruktori ne smiju imati @param oznake", "isCorrect": false },
      { "text": "Nedostaje @author oznaka", "isCorrect": false },
      { "text": "@return je obavezan za konstruktore", "isCorrect": false },
      { "text": "Nema problema - dokumentacija je ispravna", "isCorrect": false },
      { "text": "@param mora biti abecednim redom", "isCorrect": false }
    ]
  }
]
}
