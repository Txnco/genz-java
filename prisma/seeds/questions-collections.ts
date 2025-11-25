import { QuestionType, Difficulty } from '@prisma/client'

export const collectionsQuestions = {
  lectureSlug: 'collections',
  questions: [
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je glavna razlika između ArrayList i LinkedList implementacija?",
    "explanation": "ArrayList koristi dinamički polje (array) u pozadini - brzo dohvaćanje po indeksu O(1) ali sporije umetanje/brisanje O(n) jer treba pomicati elemente. LinkedList koristi dvostruko povezanu listu - sporije dohvaćanje O(n) (mora proći kroz elemente) ali brzo umetanje/brisanje O(1) na početku/kraju. ArrayList je najbolji za čitanje i pristup po indeksu, LinkedList za česte izmjene strukture.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "ArrayList brzo dohvaća po indeksu, LinkedList brzo umеće/briše elemente", "isCorrect": true },
      { "text": "ArrayList ne dopušta duplikate, LinkedList dopušta", "isCorrect": false },
      { "text": "ArrayList je thread-safe, LinkedList nije", "isCorrect": false },
      { "text": "LinkedList brže dohvaća po indeksu od ArrayList", "isCorrect": false },
      { "text": "ArrayList je immutable, LinkedList je mutable", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su glavne karakteristike Set sučelja u Javi?",
    "explanation": "Set sučelje karakterizira: (1) Ne dopušta duplikate - svaki element može biti samo jednom, dodavanje duplikata se ignoriše, (2) Ne garantira redoslijed elemenata (osim specifičnih implementacija kao LinkedHashSet ili TreeSet), (3) Brza provjera postoji li element pomoću contains() metode - O(1) za HashSet. Koristi se kada trebamo osigurati jedinstvenost elemenata.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Ne dopušta duplikate - svaki element može biti samo jednom", "isCorrect": true },
      { "text": "Brza provjera postoji li element (contains() metoda)", "isCorrect": true },
      { "text": "Ne garantira redoslijed elemenata (osim TreeSet/LinkedHashSet)", "isCorrect": true },
      { "text": "Dopušta pristup po indeksu kao List", "isCorrect": false },
      { "text": "Čuva parove ključ-vrijednost", "isCorrect": false },
      { "text": "Uvijek je sortiran", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su Map kolekcije i kako se razlikuju od Collection sučelja?",
    "explanation": "Map kolekcije pohranjuju parove 'ključ-vrijednost' (key-value pairs) i NE nasljeđuju Collection sučelje. Svaki ključ je jedinstven i mapira se na točno jednu vrijednost. Glavne implementacije: HashMap (nesortirana), TreeMap (sortirana po ključu), LinkedHashMap (čuva redoslijed umetanja). Koristi se za brzo dohvaćanje vrijednosti prema ključu - O(1) za HashMap.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Pohranjuju parove ključ-vrijednost i NE nasljeđuju Collection sučelje", "isCorrect": true },
      { "text": "Nasljeđuju Collection sučelje i pohranjuju samo vrijednosti", "isCorrect": false },
      { "text": "To su isti koncept, samo različiti nazivi", "isCorrect": false },
      { "text": "Map dopušta duplikate, Collection ne dopušta", "isCorrect": false },
      { "text": "Map je thread-safe, Collection nije", "isCorrect": false },
      { "text": "Map ne može sadržavati null vrijednosti", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto zbirke ne mogu sadržavati primitivne tipove direktno?",
    "explanation": "Java Collections Framework radi samo s objektima (referentnim tipovima), ne primitivnim tipovima (int, double, char...). Razlog je što Collection koristi generics koji zahtijevaju objekte. Java koristi autoboxing za automatsku konverziju primitiva u wrapper klase: int → Integer, double → Double, boolean → Boolean. Primjer: List<Integer> lista sadrži Integer objekte, ne primitivne int-ove.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Collections rade samo s objektima, koristi se autoboxing (int → Integer)", "isCorrect": true },
      { "text": "Primitivni tipovi su preveliki za kolekcije", "isCorrect": false },
      { "text": "To je greška u dizajnu Jave", "isCorrect": false },
      { "text": "Collections mogu sadržavati primitivne tipove od Java 10+", "isCorrect": false },
      { "text": "Primitivni tipovi nemaju equals() metodu", "isCorrect": false },
      { "text": "Nema razloga - to je mit", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje metode nudi Collections utility klasa za rad sa zbirkama?",
    "explanation": "Collections utility klasa sadrži statičke metode za rad sa zbirkama: sort() sortira listu, shuffle() miješa redoslijed, reverse() okreće redoslijed, binarySearch() pronalazi element, min()/max() pronalaze najmanju/najveću vrijednost, frequency() broji pojavljivanja, copy() kopira elemente, fill() popunjava kolekciju. Sve metode su statičke i rade na Collection objektima.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "sort() - sortiranje liste", "isCorrect": true },
      { "text": "reverse() - okretanje redoslijeda", "isCorrect": true },
      { "text": "min(), max() - pronalaženje minimuma i maksimuma", "isCorrect": true },
      { "text": "add() - dodavanje elemenata", "isCorrect": false },
      { "text": "get() - dohvaćanje po indeksu", "isCorrect": false },
      { "text": "stream() - kreiranje streama", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su enumeracije (Enum) u Javi i koje su njihove prednosti?",
    "explanation": "Enum je poseban tip klase koji predstavlja fiksni skup konstanti. Enumeracije mogu imati atribute, metode i konstruktore. Prednosti: type-safe (kompajler provjerava valjanost), čitljiviji kod od konstanti, mogu imati dodatnu logiku i podatke, podržavaju switch izraze. Primjer: enum GodisnjeDoba { PROLJECE, LJETO, JESEN, ZIMA }. Svaka enum vrijednost je singleton instanca.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Poseban tip klase koji predstavlja fiksni skup konstanti s type-safety", "isCorrect": true },
      { "text": "Numerički tip podatka za brojanje", "isCorrect": false },
      { "text": "Lista koja se ne može mijenjati", "isCorrect": false },
      { "text": "Tip Integer sa ograničenim vrijednostima", "isCorrect": false },
      { "text": "Interface za definiranje konstanti", "isCorrect": false },
      { "text": "Final klasa bez metoda", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su karakteristike Stream API-ja uvedenog u Java 8?",
    "explanation": "Stream API omogućava: (1) Funkcionalno programiranje u Javi - deklarativni pristup ('što' ne 'kako'), (2) Lazy evaluation - operacije se ne izvršavaju dok ne naiđu na terminal operaciju, (3) Paralelno procesiranje s parallelStream(), (4) Ulančavanje operacija (filter, map, reduce), (5) Ne modificira originalnu kolekciju. Streamovi nisu struktura podataka već tok podataka kroz operacije.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Funkcionalno programiranje - deklarativni pristup", "isCorrect": true },
      { "text": "Lazy evaluation - operacije se izvršavaju samo kad treba", "isCorrect": true },
      { "text": "Podržava paralelno procesiranje", "isCorrect": true },
      { "text": "Modificira originalnu kolekciju", "isCorrect": false },
      { "text": "Može se koristiti više puta", "isCorrect": false },
      { "text": "Brži od klasičnih petlji uvijek", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između intermediate i terminal operacija u Stream API-ju?",
    "explanation": "Intermediate operacije (filter, map, sorted, distinct, limit) vraćaju novi stream i omogućavaju ulančavanje - izvršavaju se lijenije (lazy). Terminal operacije (forEach, collect, count, reduce, findFirst) završavaju stream i vraćaju rezultat ili void - pokreću izvršavanje svih intermediate operacija. Nakon terminal operacije stream je konzumiran i ne može se ponovno koristiti.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Intermediate vraćaju stream i lijen su, terminal završavaju stream i pokreću izvršavanje", "isCorrect": true },
      { "text": "Intermediate su brže, terminal su sporije", "isCorrect": false },
      { "text": "Intermediate mijenjaju kolekciju, terminal ne mijenjaju", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "Intermediate rade na listama, terminal na setovima", "isCorrect": false },
      { "text": "Terminal se može koristiti više puta", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kako se kreiraju immutable (nepromjenjive) kolekcije u Java 9+?",
    "explanation": "Java 9 je uvela factory metode List.of(), Set.of(), Map.of() za jednostavno kreiranje immutable kolekcija. Ove kolekcije ne mogu se mijenjati - svaki pokušaj dodavanja/brisanja baca UnsupportedOperationException. Ne mogu sadržavati null vrijednosti. Koriste manje memorije od običnih kolekcija. Primjer: List<String> lista = List.of('A', 'B', 'C');",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Pomoću List.of(), Set.of(), Map.of() factory metoda (Java 9+)", "isCorrect": true },
      { "text": "Pomoću Collections.immutable() metode", "isCorrect": false },
      { "text": "Dodavanjem final ključne riječi", "isCorrect": false },
      { "text": "Korištenjem ImmutableList klase", "isCorrect": false },
      { "text": "Svaka kolekcija je automatski immutable", "isCorrect": false },
      { "text": "Pomoću @Immutable anotacije", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja moderna metoda u Java 17 zamjenjuje Collectors.toList() za lakše kreiranje liste iz streama?",
    "explanation": "Java 17 je uvela Stream.toList() kao kraću i čitljiviju alternativu za collect(Collectors.toList()). Obje metode kreiraju listu iz stream rezultata, ali toList() je konciznija. Važna razlika: toList() vraća immutable listu (ne može se mijenjati), dok collect(Collectors.toList()) vraća mutable ArrayList. Primjer: lista.stream().filter(...).toList();",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Stream.toList() - kraća alternativa, vraća immutable listu", "isCorrect": true },
      { "text": "Stream.asList() - konverzija u listu", "isCorrect": false },
      { "text": "Stream.toArrayList() - direktna konverzija", "isCorrect": false },
      { "text": "Collectors.toList() je i dalje jedini način", "isCorrect": false },
      { "text": "Stream.collect() bez argumenta", "isCorrect": false },
      { "text": "List.from() metoda", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Što su Sequenced Collections uvedene u Java 21 i koje nove metode nude?",
    "explanation": "Sequenced Collections (Java 21) su najveća novost u Collections Frameworku - dodaju konzistentan način pristupa prvom/zadnjem elementu. Nove metode: addFirst()/addLast() (dodaj na početak/kraj), getFirst()/getLast() (dohvati prvi/zadnji), removeFirst()/removeLast() (ukloni prvi/zadnji), reversed() (obrnuti redoslijed). Implementiraju List, Deque, SortedSet. Rješavaju dosadašnji problem nekonzistentnog API-ja.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "addFirst()/addLast() - dodavanje na početak/kraj", "isCorrect": true },
      { "text": "getFirst()/getLast() - dohvaćanje prvog/zadnjeg elementa", "isCorrect": true },
      { "text": "reversed() - vraća kolekciju s obrnutim redoslijedom", "isCorrect": true },
      { "text": "sort() - sortiranje kolekcije", "isCorrect": false },
      { "text": "shuffle() - miješanje elemenata", "isCorrect": false },
      { "text": "clear() - brisanje svih elemenata", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su Stream Gatherers uvedeni u Java 24?",
    "explanation": "Stream Gatherers (Java 24) omogućavaju custom intermediate operacije za Stream API. Prije Gatherers nije bilo moguće lako implementirati operacije kao što su batching, windowing, složena akumulacija. Ugrađeni Gatherers: windowFixed(n) (fiksni prozori), windowSliding(n) (klizni prozori), fold() (složena redukcija), scan() (akumulacija s međurezultatima), mapConcurrent() (paralelna obrada). Primjer: stream.gather(Gatherers.windowFixed(3))",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Custom intermediate operacije za Stream - omogućavaju batching, windowing i složenu akumulaciju", "isCorrect": true },
      { "text": "Novi tip kolekcije za prikupljanje podataka", "isCorrect": false },
      { "text": "Zamjena za Collectors klasu", "isCorrect": false },
      { "text": "Terminal operacije za skupljanje rezultata", "isCorrect": false },
      { "text": "Način za paralelizaciju bilo kojeg koda", "isCorrect": false },
      { "text": "Alternativa za lambda izraze", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je Comparator sučelje i kada se koristi?",
    "explanation": "Comparator je funkcionalno sučelje za definiranje custom kriterija sortiranja objekata. Ima jednu apstraktnu metodu compare(T o1, T o2) koja vraća negativan broj (o1<o2), 0 (jednaki), ili pozitivan broj (o1>o2). Idealno za lambda izraze. Omogućava više različitih načina sortiranja iste klase. Koristi se s Collections.sort(), List.sort(), Stream.sorted(), TreeSet. Primjer: Comparator.comparingDouble(Student::getProsjek)",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Funkcionalno sučelje za definiranje custom kriterija sortiranja objekata", "isCorrect": true },
      { "text": "Klasa za automatsko sortiranje svih kolekcija", "isCorrect": false },
      { "text": "Interface za usporedbu primitivnih tipova", "isCorrect": false },
      { "text": "Zamjena za equals() metodu", "isCorrect": false },
      { "text": "Tool za pronalaženje razlika između objekata", "isCorrect": false },
      { "text": "API za comparing JSON objekata", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje moderne metode nudi Comparator sučelje (Java 8+) za kreiranje i kombiniranje komparatora?",
    "explanation": "Comparator nudi moderne metode: comparing() (kreira komparator po property-u), comparingInt/Double/Long() (za primitive), thenComparing() (drugi kriterij sortiranja), reversed() (obrnuti redoslijed), nullsFirst()/nullsLast() (gdje staviti null vrijednosti), naturalOrder()/reverseOrder() (prirodni redoslijed). Omogućavaju elegantno i čitljivo višekriterijsko sortiranje.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "comparing() - kreira komparator po property-u", "isCorrect": true },
      { "text": "thenComparing() - dodaje dodatni kriterij sortiranja", "isCorrect": true },
      { "text": "reversed() - obrće redoslijed sortiranja", "isCorrect": true },
      { "text": "filter() - filtrira elemente prije sortiranja", "isCorrect": false },
      { "text": "map() - transformira elemente", "isCorrect": false },
      { "text": "collect() - prikuplja rezultate", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Immutable kolekcije kreirane s List.of() mogu sadržavati null vrijednosti.",
    "explanation": "FALSE. Immutable kolekcije kreirane factory metodama List.of(), Set.of(), Map.of() NE MOGU sadržavati null vrijednosti - pokušaj dodavanja null-a baca NullPointerException pri kreiranju. Ovo je namjerna design odluka za izbjegavanje NullPointerException problema kasnije. Također, pokušaj modificiranja (add, remove) baca UnsupportedOperationException jer su nepromjenjive.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": false },
      { "text": "False", "isCorrect": true }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s ArrayList?",
    "codeSnippet": "List<String> lista = new ArrayList<>();\nlista.add(\"Java\");\nlista.add(\"Python\");\nlista.add(\"JavaScript\");\n\nlista.remove(1);\nlista.add(1, \"C++\");\n\nSystem.out.println(lista.get(1));",
    "explanation": "Ispisat će 'C++'. Inicijalno lista sadrži [Java, Python, JavaScript]. lista.remove(1) uklanja element na indeksu 1 ('Python'), lista postaje [Java, JavaScript]. lista.add(1, 'C++') umеće 'C++' na indeks 1, pomičući 'JavaScript' na indeks 2, lista postaje [Java, C++, JavaScript]. lista.get(1) vraća element na indeksu 1 što je 'C++'.",
    "difficulty": "HARD",
    "options": [
      { "text": "C++", "isCorrect": true },
      { "text": "Python", "isCorrect": false },
      { "text": "JavaScript", "isCorrect": false },
      { "text": "Java", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "Baca IndexOutOfBoundsException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s HashSet?",
    "codeSnippet": "Set<Integer> brojevi = new HashSet<>();\nbrojevi.add(5);\nbrojevi.add(3);\nbrojevi.add(5);\nbrojevi.add(1);\nbrojevi.add(3);\n\nSystem.out.println(brojevi.size());\nSystem.out.println(brojevi.contains(3));",
    "explanation": "Ispisat će: 3 i true. HashSet NE DOPUŠTA duplikate. Dodavanja: 5 (dodan), 3 (dodan), 5 (duplikat, ignoriše se), 1 (dodan), 3 (duplikat, ignoriše se). Konačan set sadrži {1, 3, 5} - 3 jedinstvena elementa. brojevi.size() vraća 3. brojevi.contains(3) vraća true jer 3 postoji u setu. Redoslijed elemenata u HashSet nije garantiran.",
    "difficulty": "HARD",
    "options": [
      { "text": "3 i true", "isCorrect": true },
      { "text": "5 i true", "isCorrect": false },
      { "text": "3 i false", "isCorrect": false },
      { "text": "5 i false", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "Baca DuplicateElementException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Map kompilirati i izvršiti?",
    "codeSnippet": "Map<String, Integer> mapa = new HashMap<>();\nmapa.put(\"Ana\", 25);\nmapa.put(\"Marko\", 30);\nmapa.put(\"Ana\", 28);\n\nSystem.out.println(mapa.get(\"Ana\"));\nSystem.out.println(mapa.size());",
    "explanation": "Ispisat će: 28 i 2. HashMap dopušta JEDNO NULL ključ i više null vrijednosti, ali NE dopušta duplikate ključeva. mapa.put('Ana', 25) dodaje par. mapa.put('Marko', 30) dodaje par. mapa.put('Ana', 28) ZAMJENJUJE staru vrijednost 25 s novom 28 jer je ključ 'Ana' već postojao. Konačna mapa: {'Ana'→28, 'Marko'→30}. get('Ana') vraća 28, size() vraća 2.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 28 i 2", "isCorrect": true },
      { "text": "Neće se kompilirati - duplikat ključa", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 25 i 3", "isCorrect": false },
      { "text": "Baca DuplicateKeyException", "isCorrect": false },
      { "text": "Ispisuje 28 i 3", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje type", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći Stream kod?",
    "codeSnippet": "List<Integer> brojevi = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\nList<Integer> rezultat = brojevi.stream()\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * 2)\n    .limit(3)\n    .toList();\n\nSystem.out.println(rezultat);",
    "explanation": "Ispisat će [4, 8, 12]. Stream operacije redom: filter(n -> n % 2 == 0) propušta samo parne brojeve: [2, 4, 6, 8, 10], map(n -> n * 2) množi svaki element s 2: [4, 8, 12, 16, 20], limit(3) uzima samo prva 3 elementa: [4, 8, 12], toList() kreira immutable listu. Rezultat je lista [4, 8, 12]. Lazy evaluation znači da se operacije izvršavaju samo dok ne prikupe 3 elementa.",
    "difficulty": "HARD",
    "options": [
      { "text": "[4, 8, 12]", "isCorrect": true },
      { "text": "[2, 4, 6]", "isCorrect": false },
      { "text": "[2, 4, 6, 8, 10]", "isCorrect": false },
      { "text": "[1, 2, 3]", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "[4, 8, 12, 16, 20]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećem kodu s immutable listom:",
    "codeSnippet": "List<String> imena = List.of(\"Ana\", \"Marko\", \"Petra\");\nimena.add(\"Ivan\");\n\nSystem.out.println(imena);",
    "explanation": "Kod će baciti UnsupportedOperationException pri izvođenju na liniji imena.add('Ivan'). List.of() kreira IMMUTABLE (nepromjenjivu) listu koja se ne može modificirati. Bilo koja operacija modifikacije (add, remove, set, clear) baca UnsupportedOperationException. Kod se kompilira jer add() metoda postoji u List interfaceu, ali runtime iznimka se baca jer je implementacija immutable.",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca UnsupportedOperationException - List.of() kreira immutable listu", "isCorrect": true },
      { "text": "Neće se kompilirati - List.of() ne postoji", "isCorrect": false },
      { "text": "Kompilira se i izvršava uspješno", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "Neće se kompilirati - add() ne postoji za List", "isCorrect": false },
      { "text": "Ispisuje [Ana, Marko, Petra, Ivan]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu da bi se kompilirao?",
    "codeSnippet": "List<Student> studenti = List.of(\n    new Student(\"Ana\", 4.5),\n    new Student(\"Marko\", 3.8),\n    new Student(\"Petra\", 4.9)\n);\n\nstudenti.sort(Comparator.comparingDouble(Student::getProsjek));\n\nSystem.out.println(studenti);",
    "explanation": "Kod će baciti UnsupportedOperationException pri izvođenju na liniji sort(). List.of() kreira IMMUTABLE listu koja se ne može sortirati 'in-place'. Rješenje: kreirati mutable kopiju: List<Student> studenti = new ArrayList<>(List.of(...)); ili koristiti stream: studenti.stream().sorted(...).toList(). Immutable liste su česte zamke - izgledaju kao obične liste ali ne podržavaju modifikacijske operacije.",
    "difficulty": "HARD",
    "options": [
      { "text": "Treba kreirati mutable listu - List.of() kreira immutable listu koja se ne može sortirati", "isCorrect": true },
      { "text": "Nedostaje import za Comparator", "isCorrect": false },
      { "text": "Student mora implementirati Comparable", "isCorrect": false },
      { "text": "getProsjek() metoda mora biti static", "isCorrect": false },
      { "text": "Nema greške - kod radi ispravno", "isCorrect": false },
      { "text": "sort() metoda ne postoji za List", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s Collections.frequency()?",
    "codeSnippet": "List<String> riječi = Arrays.asList(\"Java\", \"Python\", \"Java\", \"C++\", \"Java\", \"JavaScript\");\n\nint brojJava = Collections.frequency(riječi, \"Java\");\nint brojPython = Collections.frequency(riječi, \"Python\");\n\nSystem.out.println(brojJava + \" \" + brojPython);",
    "explanation": "Ispisat će '3 1'. Collections.frequency(kolekcija, element) broji koliko puta se određeni element pojavljuje u kolekciji. U listi riječi: 'Java' se pojavljuje 3 puta (indeksi 0, 2, 4), 'Python' se pojavljuje 1 put (indeks 1). Collections utility klasa nudi mnoge statičke helper metode za rad sa kolekcijama: sort, reverse, shuffle, binarySearch, min, max, frequency.",
    "difficulty": "HARD",
    "options": [
      { "text": "3 1", "isCorrect": true },
      { "text": "2 1", "isCorrect": false },
      { "text": "6 1", "isCorrect": false },
      { "text": "Neće se kompilirati - frequency() ne postoji", "isCorrect": false },
      { "text": "1 3", "isCorrect": false },
      { "text": "3 0", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s TreeSet i Comparatorom?",
    "codeSnippet": "class Osoba {\n    String ime;\n    int godine;\n    \n    Osoba(String ime, int godine) {\n        this.ime = ime;\n        this.godine = godine;\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Set<Osoba> set = new TreeSet<>(Comparator.comparingInt(o -> o.godine));\n        set.add(new Osoba(\"Ana\", 25));\n        set.add(new Osoba(\"Marko\", 30));\n        set.add(new Osoba(\"Petra\", 25));\n        \n        System.out.println(set.size());\n    }\n}",
    "explanation": "Ispisat će 2. TreeSet koristi Comparator za sortiranje ALI I za određivanje jedinstvenosti elemenata. Comparator uspoređuje samo po godinama. Ana (25) i Petra (25) se smatraju ISTIMA jer imaju iste godine, pa se Petra ne dodaje (TreeSet ne dopušta duplikate po kriteriju komparatora). Konačan set sadrži 2 elementa: Ana (25) i Marko (30). Ovo je česta zamka - TreeSet ne koristi equals() već Comparator.",
    "difficulty": "HARD",
    "options": [
      { "text": "2", "isCorrect": true },
      { "text": "3", "isCorrect": false },
      { "text": "1", "isCorrect": false },
      { "text": "Neće se kompilirati - Osoba mora implementirati Comparable", "isCorrect": false },
      { "text": "Baca ClassCastException", "isCorrect": false },
      { "text": "0", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s višekriterijskim sortiranjem?",
    "codeSnippet": "class Student {\n    String ime;\n    double prosjek;\n    \n    Student(String ime, double prosjek) {\n        this.ime = ime;\n        this.prosjek = prosjek;\n    }\n}\n\nList<Student> studenti = Arrays.asList(\n    new Student(\"Ana\", 4.5),\n    new Student(\"Marko\", 4.5),\n    new Student(\"Petra\", 3.8)\n);\n\nstudenti.sort(Comparator.comparingDouble((Student s) -> s.prosjek)\n                        .reversed()\n                        .thenComparing(s -> s.ime));\n\nSystem.out.println(studenti.get(0).ime);",
    "explanation": "Ispisat će 'Ana'. Sortiranje: comparingDouble(s -> s.prosjek).reversed() sortira silazno po prosjeku: [Ana(4.5), Marko(4.5), Petra(3.8)], thenComparing(s -> s.ime) kao drugi kriterij sortira uzlazno po imenu za iste prosjeke: [Ana(4.5), Marko(4.5), Petra(3.8)]. Ana dolazi prije Marka jer je 'Ana' < 'Marko' leksikografski. Prvi element (index 0) je Ana.",
    "difficulty": "HARD",
    "options": [
      { "text": "Ana", "isCorrect": true },
      { "text": "Marko", "isCorrect": false },
      { "text": "Petra", "isCorrect": false },
      { "text": "Neće se kompilirati - reversed() ne postoji", "isCorrect": false },
      { "text": "Neće se kompilirati - thenComparing() ne postoji", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Java 17 toList() metodom?",
    "codeSnippet": "List<Integer> brojevi = List.of(1, 2, 3, 4, 5);\n\nList<Integer> rezultat = brojevi.stream()\n    .map(n -> n * 2)\n    .toList();\n\nrezultat.add(100);\nSystem.out.println(rezultat);",
    "explanation": "Kod će baciti UnsupportedOperationException na liniji rezultat.add(100). Stream.toList() (Java 17+) vraća IMMUTABLE listu - ne može se mijenjati nakon kreiranja. Razlika od collect(Collectors.toList()): toList() vraća immutable, Collectors.toList() vraća mutable ArrayList. Ova razlika je važna i često je zamka. Za mutable listu treba: collect(Collectors.toCollection(ArrayList::new)).",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca UnsupportedOperationException - toList() vraća immutable listu", "isCorrect": true },
      { "text": "Ispisuje [2, 4, 6, 8, 10, 100]", "isCorrect": false },
      { "text": "Neće se kompilirati - toList() ne postoji", "isCorrect": false },
      { "text": "Ispisuje [2, 4, 6, 8, 10]", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "Neće se kompilirati - add() ne radi s toList()", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Java 21 Sequenced Collections kompilirati?",
    "codeSnippet": "List<String> lista = new ArrayList<>();\nlista.addFirst(\"Prvi\");\nlista.addLast(\"Zadnji\");\nlista.add(\"Srednji\");\n\nString prvi = lista.getFirst();\nString zadnji = lista.getLast();\n\nSystem.out.println(prvi + \" \" + zadnji);",
    "explanation": "Kod će se kompilirati i ispisati 'Prvi Zadnji' (ako se izvršava na Java 21+). Sequenced Collections (Java 21) dodaju nove metode u List interface: addFirst(), addLast(), getFirst(), getLast(), removeFirst(), removeLast(), reversed(). ArrayList implementira ove metode. Lista nakon dodavanja: ['Prvi', 'Zadnji', 'Srednji'] (add() dodaje na kraj). getFirst() vraća 'Prvi', getLast() vraća 'Srednji' ali u ovom slučaju 'Zadnji' je zadnji.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 'Prvi Srednji' - addFirst/addLast/getFirst/getLast su iz Java 21", "isCorrect": true },
      { "text": "Neće se kompilirati - ove metode ne postoje u List", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 'Prvi Zadnji'", "isCorrect": false },
      { "text": "Baca IndexOutOfBoundsException", "isCorrect": false },
      { "text": "Neće se kompilirati - ArrayList ne podržava ove metode", "isCorrect": false },
      { "text": "Ispisuje null null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s Stream Gatherers (Java 24)?",
    "codeSnippet": "List<Integer> brojevi = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);\n\nList<List<Integer>> grupe = brojevi.stream()\n    .gather(Gatherers.windowFixed(3))\n    .toList();\n\nSystem.out.println(grupe.size());\nSystem.out.println(grupe.get(0));",
    "explanation": "Ispisat će 3 i [1, 2, 3]. Gatherers.windowFixed(3) dijeli stream u grupe fiksne veličine 3. Brojevi [1,2,3,4,5,6,7,8,9] se dijele na: [[1,2,3], [4,5,6], [7,8,9]]. grupe.size() vraća 3 (tri grupe). grupe.get(0) vraća prvu grupu [1,2,3]. Gatherers su nova Java 24 značajka za custom intermediate operacije koje omogućavaju batching, windowing i druge složene transformacije.",
    "difficulty": "HARD",
    "options": [
      { "text": "3 i [1, 2, 3]", "isCorrect": true },
      { "text": "9 i [1]", "isCorrect": false },
      { "text": "Neće se kompilirati - Gatherers ne postoje", "isCorrect": false },
      { "text": "3 i [7, 8, 9]", "isCorrect": false },
      { "text": "1 i [1, 2, 3, 4, 5, 6, 7, 8, 9]", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collectors.groupingBy()?",
    "codeSnippet": "List<String> rijeci = Arrays.asList(\"Ana\", \"Marko\", \"Ante\", \"Maja\", \"Iva\");\n\nMap<Integer, List<String>> poduljini = rijeci.stream()\n    .collect(Collectors.groupingBy(String::length));\n\nSystem.out.println(poduljini.get(3));\nSystem.out.println(poduljini.get(5));",
    "explanation": "Ispisat će [Ana, Iva] i [Marko, Ante, Maja]. Collectors.groupingBy(String::length) grupira riječi po duljini u Map<Integer, List<String>>. Riječi: Ana(3), Marko(5), Ante(4), Maja(4), Iva(3). Mapa: {3→[Ana, Iva], 4→[Ante, Maja], 5→[Marko]}. Međutim, 'Ante' i 'Maja' imaju 4 slova, 'Marko' ima 5. Dakle: get(3)→[Ana, Iva], get(5)→[Marko]. Primijetite: get(5) vraća samo [Marko], ne [Marko, Ante, Maja].",
    "difficulty": "HARD",
    "options": [
      { "text": "[Ana, Iva] i [Marko]", "isCorrect": true },
      { "text": "[Ana] i [Marko, Ante, Maja]", "isCorrect": false },
      { "text": "[Ana, Iva] i null", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "[Ana, Marko, Iva] i [Ante, Maja]", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s Collectors.partitioningBy()?",
    "codeSnippet": "List<Integer> brojevi = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\nMap<Boolean, List<Integer>> particionirano = brojevi.stream()\n    .collect(Collectors.partitioningBy(n -> n % 2 == 0));\n\nSystem.out.println(particionirano.get(true).size());\nSystem.out.println(particionirano.get(false).size());",
    "explanation": "Ispisat će 5 i 5. Collectors.partitioningBy() dijeli stream u DVE grupe prema boolean predikatu - vraća Map<Boolean, List<T>>. Predikat n -> n % 2 == 0 dijeli na parne i neparne. Parni brojevi (true): [2,4,6,8,10] - 5 elemenata. Neparni brojevi (false): [1,3,5,7,9] - 5 elemenata. partitioningBy() je specijalizirani slučaj groupingBy() za binary particioniranje.",
    "difficulty": "HARD",
    "options": [
      { "text": "5 i 5", "isCorrect": true },
      { "text": "10 i 0", "isCorrect": false },
      { "text": "4 i 6", "isCorrect": false },
      { "text": "Neće se kompilirati - partitioningBy() ne postoji", "isCorrect": false },
      { "text": "6 i 4", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje metode možemo dobiti obrnuti poredak liste u Java 21?",
    "codeSnippet": "List<Integer> brojevi = new ArrayList<>(List.of(1, 2, 3, 4, 5));\n\n// Kako dobiti obrnuti poredak?",
    "explanation": "U Java 21 s Sequenced Collections: List<Integer> obrnuto = brojevi.reversed(). Ova metoda vraća VIEW na listu s obrnutim redoslijedom - ne kreira novu kopiju. Promjene u originalnoj listi se vide u view-u i obrnuto. Stariji način: Collections.reverse(brojevi) - modificira originalnu listu in-place. Ili: brojevi.stream().sorted(Comparator.reverseOrder()).toList() - kreira novu listu.",
    "difficulty": "HARD",
    "options": [
      { "text": "brojevi.reversed() - Java 21 Sequenced Collections metoda", "isCorrect": true },
      { "text": "Collections.reverse(brojevi) - modificira in-place", "isCorrect": false },
      { "text": "brojevi.reverse() - instance metoda", "isCorrect": false },
      { "text": "List.reverse(brojevi) - statička metoda", "isCorrect": false },
      { "text": "brojevi.sort(Comparator.reversed())", "isCorrect": false },
      { "text": "Ne postoji metoda za obrtanje liste", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s reduce() operacijom?",
    "codeSnippet": "List<Integer> brojevi = List.of(1, 2, 3, 4, 5);\n\nint rezultat = brojevi.stream()\n    .reduce(1, (a, b) -> a * b);\n\nSystem.out.println(rezultat);",
    "explanation": "Ispisat će 120. reduce(1, (a, b) -> a * b) izvodi redukciju s početnom vrijednošću (identity) 1 i operacijom množenja. Izračun: 1*1=1, 1*2=2, 2*3=6, 6*4=24, 24*5=120. reduce() akumulira sve elemente u jednu vrijednost primjenjujući binary operator. Identity 1 je neutralni element za množenje. Za zbrajanje bi bio 0: reduce(0, (a,b) -> a+b).",
    "difficulty": "HARD",
    "options": [
      { "text": "120", "isCorrect": true },
      { "text": "15", "isCorrect": false },
      { "text": "5", "isCorrect": false },
      { "text": "1", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "Baca ArithmeticException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedeća dva načina kreiranja liste?",
    "codeSnippet": "// Način 1\nList<String> lista1 = List.of(\"A\", \"B\", \"C\");\n\n// Način 2\nList<String> lista2 = new ArrayList<>(Arrays.asList(\"A\", \"B\", \"C\"));\n\n// Koja je razlika?",
    "explanation": "Način 1 (List.of()) kreira IMMUTABLE listu - ne može se mijenjati (add, remove bacaju UnsupportedOperationException), ne može sadržavati null, koristi manje memorije, thread-safe jer je nepromjenjiva. Način 2 kreira MUTABLE ArrayList - može se slobodno mijenjati (add, remove rade), može sadržavati null, zauzima više memorije. List.of() je za finalne podatke, ArrayList za podatke koji se mijenjaju.",
    "difficulty": "HARD",
    "options": [
      { "text": "Način 1 kreira immutable listu, Način 2 kreira mutable ArrayList", "isCorrect": true },
      { "text": "Nema razlike, oba kreiraju istu listu", "isCorrect": false },
      { "text": "Način 1 je brži pri dodavanju elemenata", "isCorrect": false },
      { "text": "Način 2 ne dopušta null vrijednosti", "isCorrect": false },
      { "text": "Način 1 je thread-safe, Način 2 nije", "isCorrect": false },
      { "text": "Način 2 kreira immutable listu", "isCorrect": false }
    ]
  }
]
}
