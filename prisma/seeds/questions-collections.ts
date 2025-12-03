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
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je KLJUČNA razlika između List.of() (Java 9+) i Arrays.asList()?",
    "explanation": "List.of() kreira POTPUNO IMMUTABLE listu - ne možete ni add(), ni remove(), ni set()! Arrays.asList() kreira FIXED-SIZE ali MUTABLE listu - možete set() (mijenjati postojeće elemente) ali NE možete add/remove! Primjer: List<String> list1 = List.of(\"A\", \"B\"); list1.set(0, \"C\") baca UnsupportedOperationException. List<String> list2 = Arrays.asList(\"A\", \"B\"); list2.set(0, \"C\") RADI! Također, List.of() NE DOZVOLJAVA null elemente (baca NullPointerException), Arrays.asList() DOZVOLJAVA null! List.of() vraća optimizirani immutable tip, Arrays.asList() vraća ArrayList wrapper preko arraya.",
    "difficulty": "HARD",
    "options": [
      { "text": "List.of() je potpuno immutable (ni set), Arrays.asList() je fixed-size ali može set()", "isCorrect": true },
      { "text": "List.of() je mutable, Arrays.asList() je immutable", "isCorrect": false },
      { "text": "Oboje su potpuno immutable - identične su", "isCorrect": false },
      { "text": "List.of() dozvoljava null, Arrays.asList() ne dozvoljava", "isCorrect": false },
      { "text": "Arrays.asList() je brži jer koristi array interno", "isCorrect": false },
      { "text": "List.of() može se proširiti, Arrays.asList() ne može", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Java 21 Sequenced Collections kompilirati i izvršiti?",
    "codeSnippet": "public class SequencedTest {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"A\");\n        list.add(\"B\");\n        list.add(\"C\");\n        \n        String first = list.getFirst();\n        String last = list.getLast();\n        \n        list.addFirst(\"Z\");\n        list.addLast(\"Y\");\n        \n        List<String> reversed = list.reversed();\n        \n        System.out.println(first + \" \" + last);\n        System.out.println(list);\n        System.out.println(reversed);\n    }\n}",
    "explanation": "Kod se kompilira i izvršava (JAVA 21+)! Ispisuje: 'A C', '[Z, A, B, C, Y]', '[Y, C, B, A, Z]'. Java 21 uvodi SEQUENCED COLLECTIONS - nove metode na List interfaceu! getFirst()/getLast() direktno pristupaju prvom/zadnjem elementu (umjesto get(0)/get(size()-1)). addFirst()/addLast() dodaju na početak/kraj (umjesto add(0, el)/add(el)). reversed() vraća REVERSED VIEW (ne kopiju!) - promjene na reversed listi reflektiraju se na original! reversed() je lazy view, ne eager kopija. SequencedCollection, SequencedSet, SequencedMap su nova sučelja u Java 21. NAJVEĆA promjena Collections Frameworka od Java 5!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se (Java 21+) i ispisuje 'A C', '[Z, A, B, C, Y]', '[Y, C, B, A, Z]'", "isCorrect": true },
      { "text": "Neće se kompilirati - getFirst/getLast ne postoje na List", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u - reversed() nije podržan", "isCorrect": false },
      { "text": "Neće se kompilirati - addFirst/addLast su samo za LinkedList", "isCorrect": false },
      { "text": "Kompilira se ali reversed vraća null", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih kolekcija DOZVOLJAVAJU null elemente? (Odaberite sve točne)",
    "explanation": "DOZVOLJAVAJU null: (1) ArrayList - može imati više null elemenata. (2) LinkedList - također dozvoljava null. (3) HashMap - dozvoljava JEDAN null key i VIŠE null values! (4) TreeMap - NE dozvoljava null key (baca NPE zbog compareTo()), ali DOZVOLJAVA null values. NE DOZVOLJAVAJU null: (5) List.of() - baca NullPointerException pri kreiranju! (6) Set.of() - također NPE. (7) Map.of() - NPE za null key ili value. (8) HashSet - dozvoljava JEDAN null element. TreeSet - NE dozvoljava null (NPE zbog compareTo()). Java 9+ factory metode (of()) su STRICT - null nije dozvoljen!",
    "difficulty": "HARD",
    "options": [
      { "text": "ArrayList", "isCorrect": true },
      { "text": "LinkedList", "isCorrect": true },
      { "text": "HashMap (values i jedan null key)", "isCorrect": true },
      { "text": "HashSet (jedan null element)", "isCorrect": true },
      { "text": "List.of()", "isCorrect": false },
      { "text": "TreeSet", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'fail-fast' behaviour kod Iterator-a?",
    "explanation": "Fail-fast znači da Iterator ODMAH baca ConcurrentModificationException ako se kolekcija MODIFICIRA tokom iteracije (osim kroz sam iterator)! Primjer: Iterator<String> it = list.iterator(); while(it.hasNext()) { list.add(\"X\"); } baca exception! Iterator detektira strukturalne izmjene (add, remove) kroz internal 'modCount' counter. Svaka modifikacija povećava modCount, iterator provjerava ima li se promijenio. VAŽNO: fail-fast je BEST-EFFORT, ne garantiran! U konkurentnim scenarijima može ne detektirati promjenu. Za thread-safe iteraciju koristiti: ConcurrentHashMap, CopyOnWriteArrayList ili synchronized kolekcije. Fail-fast ŠTITI od nepredvidivih rezultata!",
    "difficulty": "HARD",
    "options": [
      { "text": "Iterator baca ConcurrentModificationException pri detekciji izmjene kolekcije tokom iteracije", "isCorrect": true },
      { "text": "Iterator automatski zaustavlja iteraciju pri prvoj grešci", "isCorrect": false },
      { "text": "Iterator se automatski refreshira kada se kolekcija mijenja", "isCorrect": false },
      { "text": "Iterator baca exception ako nema više elemenata", "isCorrect": false },
      { "text": "Iterator preskače elemente dodane tokom iteracije", "isCorrect": false },
      { "text": "Iterator radi samo s immutable kolekcijama", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.frequency() i List?",
    "codeSnippet": "public class FrequencyTest {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"A\");\n        list.add(\"B\");\n        list.add(\"A\");\n        list.add(\"C\");\n        list.add(\"A\");\n        list.add(null);\n        list.add(null);\n        \n        int freqA = Collections.frequency(list, \"A\");\n        int freqNull = Collections.frequency(list, null);\n        int freqD = Collections.frequency(list, \"D\");\n        \n        System.out.println(freqA + \" \" + freqNull + \" \" + freqD);\n    }\n}",
    "explanation": "Ispisat će '3 2 0'. Collections.frequency(collection, object) broji KOLIKO PUTA se element pojavljuje u kolekciji! Koristi equals() za usporedbu (za null koristi == provjeru). 'A' se pojavljuje 3 puta, null 2 puta, 'D' se ne pojavljuje (0). Collections.frequency() je UTILITY metoda koja radi s bilo kojom Collection. EFIKASNOST: O(n) jer mora iterirati kroz sve elemente. Za česte upite, bolje koristiti Map<T, Integer> za brzo lookup! frequency() podržava null elemente ako kolekcija to dozvoljava. Koristi se za ANALYTICS i STATISTIKU nad kolekcijama.",
    "difficulty": "HARD",
    "options": [
      { "text": "3 2 0", "isCorrect": true },
      { "text": "3 0 0 - frequency ne može brojiti null", "isCorrect": false },
      { "text": "Baca NullPointerException zbog null elemenata", "isCorrect": false },
      { "text": "7 7 7 - broji sve elemente", "isCorrect": false },
      { "text": "Neće se kompilirati - frequency ne prima null", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su razlike između HashMap i TreeMap? (Odaberite sve točne)",
    "explanation": "RAZLIKE: (1) HashMap je O(1) za get/put, TreeMap je O(log n) - HashMap brži! (2) HashMap nema GARANTIRAN redoslijed, TreeMap je SORTIRANO po ključu (natural order ili Comparator). (3) HashMap dozvoljava JEDAN null key, TreeMap NE dozvoljava null key (NPE). (4) TreeMap implementira NavigableMap (firstKey, lastKey, subMap), HashMap ne. (5) HashMap koristi hash function, TreeMap koristi Red-Black tree. Koristite HashMap za BRZO lookup, TreeMap za SORTIRANO iteriranje. LinkedHashMap čuva insertion order. TreeMap je za operacije kao 'sve ključeve između X i Y'.",
    "difficulty": "HARD",
    "options": [
      { "text": "HashMap je O(1), TreeMap je O(log n)", "isCorrect": true },
      { "text": "TreeMap je sortiran po ključu, HashMap nema garantiran redoslijed", "isCorrect": true },
      { "text": "HashMap dozvoljava null key, TreeMap ne", "isCorrect": true },
      { "text": "TreeMap implementira NavigableMap, HashMap ne", "isCorrect": true },
      { "text": "TreeMap je brži od HashMap za sve operacije", "isCorrect": false },
      { "text": "HashMap je thread-safe, TreeMap nije", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto TreeSet zahtijeva da elementi implementiraju Comparable ili da se provjdi Comparator?",
    "explanation": "TreeSet koristi Red-Black TREE strukturu koja zahtijeva SORTIRANJE - elementi moraju biti međusobno USPOREDIVI! Bez Comparable ili Comparator, TreeSet ne zna kako sortirati elemente. Ako dodajete element koji ne implementira Comparable i niste dali Comparator, dobijete ClassCastException! TreeSet poziva compareTo() ili compare() za SVAKU add operaciju da pronađe pravu poziciju u tree-u. VAŽNO: TreeSet koristi Comparator/Comparable za JEDNAKOST (compareTo() == 0), NE equals()! Dva objekta s istim compareTo() rezultatom se smatraju duplikatima! HashSet koristi equals/hashCode, TreeSet koristi Comparator/Comparable!",
    "difficulty": "HARD",
    "options": [
      { "text": "TreeSet koristi tree strukturu koja zahtijeva sortiranje za održavanje balansa", "isCorrect": true },
      { "text": "TreeSet automatski sortira sve tipove bez Comparable", "isCorrect": false },
      { "text": "Comparable je potreban za hashCode() u TreeSet", "isCorrect": false },
      { "text": "TreeSet ne može raditi s primitivnim tipovima bez Comparator", "isCorrect": false },
      { "text": "Java specifikacija zabranjuje TreeSet bez Comparable", "isCorrect": false },
      { "text": "TreeSet koristi Comparable za thread-safety", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s Set.of() factory metodom?",
    "codeSnippet": "public class SetOfTest {\n    public static void main(String[] args) {\n        Set<String> set1 = Set.of(\"A\", \"B\", \"C\", \"A\");\n        \n        Set<Integer> set2 = Set.of(1, 2, 3);\n        set2.add(4);\n        \n        Set<String> set3 = Set.of(\"X\", null, \"Y\");\n        \n        Set<String> set4 = Set.of(\"P\", \"Q\");\n        set4.clear();\n        \n        System.out.println(set1.size() + \" \" + set2.size());\n    }\n}",
    "explanation": "Kod ima 4 GREŠKE i pada u runtime-u: (1) Set.of(\"A\", \"B\", \"C\", \"A\") baca IllegalArgumentException - DUPLIKAT 'A'! Set.of() detektira duplikate i pada. (2) set2.add(4) baca UnsupportedOperationException - Set.of() je IMMUTABLE! (3) Set.of(\"X\", null, \"Y\") baca NullPointerException - Set.of() NE DOZVOLJAVA null! (4) set4.clear() također UnsupportedOperationException - immutable! Set.of() je STRICT: no duplicates, no null, no modifications! Kod pada na PRVOM set1 kreiranju s IllegalArgumentException. Factory metode (of()) su za SIGURNE immutable kolekcije s compile-time deklariranim sadržajem!",
    "difficulty": "HARD",
    "options": [
      { "text": "4 greške - duplikat baca exception, add/clear ne rade, null nije dozvoljen", "isCorrect": true },
      { "text": "2 greške - samo add i clear su problematični", "isCorrect": false },
      { "text": "0 grešaka - Set.of() automatski uklanja duplikate", "isCorrect": false },
      { "text": "1 greška - samo null nije dozvoljen", "isCorrect": false },
      { "text": "3 greške - duplikat nije greška", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je razlika između Collections.unmodifiableList() i List.copyOf() (Java 10+)?",
    "explanation": "Collections.unmodifiableList() kreira READ-ONLY VIEW originalne liste - promjene na ORIGINALNOJ listi se VIDE kroz unmodifiable wrapper! List.copyOf() kreira PRAVU IMMUTABLE KOPIJU - promjene na originalnoj listi se NE reflektiraju! Primjer: List<String> orig = new ArrayList<>(List.of(\"A\")); List<String> unmodi = Collections.unmodifiableList(orig); List<String> copy = List.copyOf(orig); orig.add(\"B\"); unmodi.size() je 2 (vidi 'B'), copy.size() je 1 (ne vidi 'B')! unmodifiableList() je LAZY wrapper (O(1) kreiranje), copyOf() je EAGER kopija (O(n)). copyOf() je SIGURNIJA za true immutability!",
    "difficulty": "HARD",
    "options": [
      { "text": "unmodifiableList() je view koji vidi izmjene originala, copyOf() je prava kopija", "isCorrect": true },
      { "text": "Nema razlike - oboje su immutable kopije", "isCorrect": false },
      { "text": "copyOf() je view, unmodifiableList() je kopija", "isCorrect": false },
      { "text": "unmodifiableList() je thread-safe, copyOf() nije", "isCorrect": false },
      { "text": "copyOf() dozvoljava null, unmodifiableList() ne", "isCorrect": false },
      { "text": "unmodifiableList() je brži u svim scenarijima", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje operacije su O(1) (konstantno vrijeme) na ArrayList? (Odaberite sve točne)",
    "explanation": "O(1) na ArrayList: (1) get(index) - direktan pristup array elementu. (2) set(index, element) - zamjena postojećeg elementa. (3) add(element) - dodavanje na kraj (amortized O(1), može biti O(n) pri resizingu). (4) size() - vraća cached vrijednost. NISU O(1): add(0, element) je O(n) jer mora shiftati sve elemente! remove(index) je O(n) jer mora shiftati. contains() je O(n) jer mora iterirati. ArrayList je OPTIMIZIRAN za random access (get/set) i dodavanje na kraj! Za česte insert/remove na početku koristiti LinkedList ili ArrayDeque.",
    "difficulty": "HARD",
    "options": [
      { "text": "get(index)", "isCorrect": true },
      { "text": "set(index, element)", "isCorrect": true },
      { "text": "add(element) na kraj (amortized)", "isCorrect": true },
      { "text": "size()", "isCorrect": true },
      { "text": "add(0, element)", "isCorrect": false },
      { "text": "contains(element)", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.disjoint() metodom?",
    "codeSnippet": "public class DisjointTest {\n    public static void main(String[] args) {\n        Set<Integer> set1 = Set.of(1, 2, 3, 4);\n        Set<Integer> set2 = Set.of(5, 6, 7, 8);\n        Set<Integer> set3 = Set.of(3, 5, 7, 9);\n        \n        boolean disjoint12 = Collections.disjoint(set1, set2);\n        boolean disjoint13 = Collections.disjoint(set1, set3);\n        boolean disjoint23 = Collections.disjoint(set2, set3);\n        \n        System.out.println(disjoint12 + \" \" + disjoint13 + \" \" + disjoint23);\n    }\n}",
    "explanation": "Ispisat će 'true false false'. Collections.disjoint(c1, c2) vraća TRUE ako kolekcije NEMAJU ZAJEDNIČKIH elemenata (disjoint = razdvojeni)! set1 i set2 nemaju zajedničkih (1-4 vs 5-8) → true. set1 i set3 dijele element '3' → false (NISU disjoint). set2 i set3 dijele elemente '5' i '7' → false. disjoint() koristi contains() metodu - efikasnost ovisi o tipu kolekcije! Za Set je O(n) gdje je n veličina manje kolekcije. Koristi se za provjeru preklapanja setova u set theory operacijama!",
    "difficulty": "HARD",
    "options": [
      { "text": "true false false", "isCorrect": true },
      { "text": "false false false", "isCorrect": false },
      { "text": "true true true", "isCorrect": false },
      { "text": "false true false", "isCorrect": false },
      { "text": "Neće se kompilirati - disjoint ne postoji", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kako LinkedHashMap održava insertion order?",
    "explanation": "LinkedHashMap koristi DOUBLY-LINKED LIST koji povezuje sve entries u insertion order! Svaki Entry ima 'before' i 'after' reference na prethodnu/sljedeću entry. HashMap dio handla hash-based lookup (O(1)), linked list dio održava order za iteraciju. LinkedHashMap može raditi u DVA moda: (1) INSERTION ORDER (default) - order u kojem su dodani, (2) ACCESS ORDER (konstruktor parameter) - order pristupa, najrecentniji na kraju! Access order se koristi za LRU (Least Recently Used) cache implementacije. Trade-off: malo više memorije (2 extra reference po entry) za order preservation. Iteracija je O(n) po insertion/access order!",
    "difficulty": "HARD",
    "options": [
      { "text": "Koristi doubly-linked list koji povezuje entries u insertion order", "isCorrect": true },
      { "text": "Sortira ključeve abecednim redom automatski", "isCorrect": false },
      { "text": "Čuva timestamp za svaki entry i sortira po tome", "isCorrect": false },
      { "text": "Koristi TreeMap interno za sortiranje", "isCorrect": false },
      { "text": "Array index automatski čuva insertion order", "isCorrect": false },
      { "text": "Ne održava order - to je mana LinkedHashMap-a", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite SVE probleme u sljedećem kodu s Map.of() factory metodom:",
    "codeSnippet": "public class MapOfTest {\n    public static void main(String[] args) {\n        Map<String, Integer> map1 = Map.of(\n            \"A\", 1,\n            \"B\", 2,\n            \"A\", 3\n        );\n        \n        Map<String, Integer> map2 = Map.of(\n            \"X\", 10,\n            \"Y\", 20\n        );\n        map2.put(\"Z\", 30);\n        \n        Map<String, String> map3 = Map.of(\n            \"key1\", \"value1\",\n            null, \"value2\"\n        );\n        \n        Map<String, String> map4 = Map.of(\n            \"key1\", \"value1\",\n            \"key2\", null\n        );\n    }\n}",
    "explanation": "Kod ima 4 GREŠKE: (1) map1 ima DUPLIKAT key 'A' - Map.of() baca IllegalArgumentException! (2) map2.put(\"Z\", 30) baca UnsupportedOperationException - Map.of() je IMMUTABLE! (3) map3 ima null KEY - Map.of() baca NullPointerException! (4) map4 ima null VALUE - također NullPointerException! Map.of() je ULTRA-STRICT: no duplicate keys, no modifications, no null keys, no null values! Kod pada na map1 kreiranju s IllegalArgumentException za duplikat. Za null values koristiti HashMap. Map.of() je za compile-time konstante bez null-ova!",
    "difficulty": "HARD",
    "options": [
      { "text": "4 greške - duplikat key, put() ne radi, null key i value nisu dozvoljeni", "isCorrect": true },
      { "text": "2 greške - samo null key i value", "isCorrect": false },
      { "text": "1 greška - samo duplikat key", "isCorrect": false },
      { "text": "0 grešaka - Map.of() automatski handla duplikate", "isCorrect": false },
      { "text": "3 greške - null value je dozvoljen", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Collections NEMAJU garantiran iteration order? (Odaberite sve točne)",
    "explanation": "NEMAJU garantiran order: (1) HashSet - hash-based, order ovisi o hash funkciji i bucketima. (2) HashMap - isto, order nije predvidiv. (3) Hashtable (legacy) - također hash-based bez order-a. IMAJU guarantiran order: (4) ArrayList - insertion order (index-based). (5) LinkedList - insertion order (linked structure). (6) TreeSet - sorted order (natural ili Comparator). (7) TreeMap - sorted po ključu. (8) LinkedHashSet - insertion order (linked list). (9) LinkedHashMap - insertion/access order. Koristite Hash* za PERFORMANCE, Linked* za ORDER preservation, Tree* za SORTING!",
    "difficulty": "HARD",
    "options": [
      { "text": "HashSet", "isCorrect": true },
      { "text": "HashMap", "isCorrect": true },
      { "text": "Hashtable", "isCorrect": true },
      { "text": "ArrayList", "isCorrect": false },
      { "text": "TreeSet", "isCorrect": false },
      { "text": "LinkedHashSet", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što će se dogoditi ako pokušate dodati duplikat u TreeSet s Comparatorom?",
    "explanation": "TreeSet koristi Comparator.compare() (ili Comparable.compareTo()) za određivanje JEDNAKOSTI, NE equals()! Ako compare() vraća 0, TreeSet smatra elemente DUPLIKATIMA i NE dodaje drugi element! Element se TIHO ignorira (add() vraća false). Primjer: TreeSet<Person> set = new TreeSet<>(Comparator.comparing(Person::age)); Person p1 = new Person(\"Ana\", 20); Person p2 = new Person(\"Marko\", 20); set.add(p1); set.add(p2); - set ima SAMO JEDAN element jer oba imaju age=20! p2 se ne dodaje. Ovo je ČESTA zamka - TreeSet jednakost != equals()! HashSet bi dodao OBA jer koristi equals().",
    "difficulty": "HARD",
    "options": [
      { "text": "Element se tiho ignorira - add() vraća false jer Comparator određuje jednakost", "isCorrect": true },
      { "text": "Baca DuplicateKeyException", "isCorrect": false },
      { "text": "TreeSet zamjenjuje stari element s novim", "isCorrect": false },
      { "text": "TreeSet čuva oba elementa jer koristi equals() za duplikate", "isCorrect": false },
      { "text": "Program pada s IllegalStateException", "isCorrect": false },
      { "text": "TreeSet automatski sortira duplikate u podskupinu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.rotate() metodom?",
    "codeSnippet": "public class RotateTest {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>(List.of(1, 2, 3, 4, 5));\n        \n        Collections.rotate(list, 2);\n        System.out.println(list);\n        \n        Collections.rotate(list, -3);\n        System.out.println(list);\n        \n        Collections.rotate(list, 0);\n        System.out.println(list);\n    }\n}",
    "explanation": "Ispisat će: '[4, 5, 1, 2, 3]', '[2, 3, 4, 5, 1]', '[2, 3, 4, 5, 1]'. Collections.rotate(list, distance) rotira elemente za distance pozicija! Pozitivan distance rotira DESNO (elementi s kraja idu na početak), negativan LIJEVO (elementi s početka idu na kraj). rotate(list, 2): [1,2,3,4,5] → [4,5,1,2,3] (zadnja 2 idu naprijed). rotate(list, -3): [4,5,1,2,3] → [2,3,4,5,1] (prva 3 idu nazad). rotate(list, 0): bez promjene. rotate() modificira listu IN-PLACE! Koristi se za circular buffer implementacije i sliding window algoritme.",
    "difficulty": "HARD",
    "options": [
      { "text": "[4, 5, 1, 2, 3], [2, 3, 4, 5, 1], [2, 3, 4, 5, 1]", "isCorrect": true },
      { "text": "[2, 3, 4, 5, 1], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]", "isCorrect": false },
      { "text": "[5, 4, 3, 2, 1], [3, 2, 1, 5, 4], [3, 2, 1, 5, 4]", "isCorrect": false },
      { "text": "Neće se kompilirati - rotate() ne postoji", "isCorrect": false },
      { "text": "[1, 2, 3, 4, 5] - rotate ne mijenja listu", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto je HashMap.putIfAbsent() bolja od provjere s containsKey()?",
    "explanation": "putIfAbsent(key, value) je ATOMIČNA operacija - provjerava i dodaje u JEDNOM koraku! containsKey() + put() zahtijeva DVA lookup-a što je: (1) SPORIJE - dvije hash operacije, (2) NIJE THREAD-SAFE - između containsKey() i put() drugi thread može dodati key! putIfAbsent() vraća STARU vrijednost ako key postoji ili null ako je dodana nova vrijednost. Primjer: V oldValue = map.putIfAbsent(\"key\", \"value\"); if (oldValue == null) { /* nova vrijednost */ }. Slično: computeIfAbsent(key, mappingFunction) za lazy computation! computeIfPresent(), merge() su također atomične operacije. Java 8+ concurrent-friendly metode za HashMap!",
    "difficulty": "HARD",
    "options": [
      { "text": "putIfAbsent() je atomična operacija (jedan lookup), thread-safe, brža", "isCorrect": true },
      { "text": "containsKey() je brži jer samo provjerava bez dodavanja", "isCorrect": false },
      { "text": "Nema razlike - semantički su identični", "isCorrect": false },
      { "text": "putIfAbsent() ne radi s null vrijednostima", "isCorrect": false },
      { "text": "containsKey() je thread-safe, putIfAbsent() nije", "isCorrect": false },
      { "text": "putIfAbsent() je deprecated u Java 25", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su NOVOSTI u Java 21 Sequenced Collections? (Odaberite sve točne)",
    "explanation": "Java 21 Sequenced Collections novosti: (1) getFirst()/getLast() - direktan pristup prvom/zadnjem elementu. (2) addFirst()/addLast() - dodavanje na početak/kraj. (3) removeFirst()/removeLast() - uklanjanje s početka/kraja. (4) reversed() - vraća reversed view (ne kopiju!). (5) Nova sučelja: SequencedCollection, SequencedSet, SequencedMap. NISU novosti: (6) sort() je postojao prije, (7) stream() je iz Java 8, (8) iterator() je uvijek postojao. Sequenced Collections su NAJVEĆA promjena Collections API-ja od Java 5 Generics-a! Konzistentan API za pristup prvom/zadnjem elementu svih sequential kolekcija!",
    "difficulty": "HARD",
    "options": [
      { "text": "getFirst()/getLast()", "isCorrect": true },
      { "text": "addFirst()/addLast()", "isCorrect": true },
      { "text": "removeFirst()/removeLast()", "isCorrect": true },
      { "text": "reversed() - reversed view", "isCorrect": true },
      { "text": "sort() metoda", "isCorrect": false },
      { "text": "stream() metoda", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.max() i Comparator?",
    "codeSnippet": "record Student(String name, int grade) {}\n\npublic class MaxTest {\n    public static void main(String[] args) {\n        List<Student> students = List.of(\n            new Student(\"Ana\", 85),\n            new Student(\"Marko\", 92),\n            new Student(\"Petra\", 78),\n            new Student(\"Ivan\", 92)\n        );\n        \n        Student maxByGrade = Collections.max(students, \n            Comparator.comparingInt(Student::grade));\n        \n        Student maxByName = Collections.max(students,\n            Comparator.comparing(Student::name));\n        \n        System.out.println(maxByGrade.name() + \" \" + maxByName.name());\n    }\n}",
    "explanation": "Ispisat će 'Marko Petra'. Collections.max(collection, comparator) vraća NAJVEĆI element prema Comparatoru! comparingInt(Student::grade) uspoređuje po ocjeni - Marko i Ivan imaju 92, ali max() vraća PRVI pronađeni maksimum (Marko jer je prije u listi). comparing(Student::name) uspoređuje po imenu leksikografski - 'Petra' je najveće ime (P > M > I > A abecedno). VAŽNO: Ako ima više maksimalnih elemenata, max() vraća PRVI pronađeni! min() radi slično za najmanji element. max/min bacaju NoSuchElementException za praznu kolekciju!",
    "difficulty": "HARD",
    "options": [
      { "text": "Marko Petra", "isCorrect": true },
      { "text": "Ivan Petra - Ivan je zadnji s 92", "isCorrect": false },
      { "text": "Marko Ana - Ana je prvo ime", "isCorrect": false },
      { "text": "Neće se kompilirati - max() ne prima Comparator", "isCorrect": false },
      { "text": "Baca exception jer ima 2 studenta s 92", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između Collection.removeIf() i Iterator.remove()?",
    "explanation": "removeIf(Predicate) je BULK operacija - uklanja SVE elemente koji zadovoljavaju predikat u JEDNOM prolazu! Iterator.remove() uklanja TRENUTNI element tokom iteracije - morate kontrolirati svaki element. removeIf() je: (1) KRAĆE - list.removeIf(s -> s.startsWith(\"A\")) umjesto petlje, (2) OPTIMIZIRANIJE - implementacije mogu biti efikasnije, (3) THREAD-SAFE za ConcurrentHashMap. Iterator.remove() daje CONTROL - možete odlučiti za svaki element zasebno. removeIf() dodaje u Java 8 kao dio functional style. Oboje su FAIL-SAFE za ConcurrentModificationException ako koristite pravilno!",
    "difficulty": "HARD",
    "options": [
      { "text": "removeIf() je bulk operacija za sve elemente, Iterator.remove() za trenutni", "isCorrect": true },
      { "text": "Iterator.remove() je brži jer radi element po element", "isCorrect": false },
      { "text": "removeIf() baca ConcurrentModificationException, Iterator.remove() ne", "isCorrect": false },
      { "text": "Nema razlike - iste su operacije", "isCorrect": false },
      { "text": "removeIf() ne može se koristiti s List", "isCorrect": false },
      { "text": "Iterator.remove() je deprecated u Java 25", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Collections.replaceAll() kompilirati?",
    "codeSnippet": "public class ReplaceAllTest {\n    public static void main(String[] args) {\n        List<String> list1 = new ArrayList<>(List.of(\"a\", \"b\", \"c\"));\n        Collections.replaceAll(list1, \"a\", \"A\");\n        System.out.println(list1);\n        \n        List<String> list2 = List.of(\"x\", \"y\", \"z\");\n        Collections.replaceAll(list2, \"x\", \"X\");\n        System.out.println(list2);\n        \n        List<Integer> list3 = new ArrayList<>(List.of(1, 2, 1, 3, 1));\n        Collections.replaceAll(list3, 1, 99);\n        System.out.println(list3);\n    }\n}",
    "explanation": "Kod pada na drugom replaceAll! list1 radi: [a, b, c] → [A, b, c]. list2 PADA s UnsupportedOperationException jer je List.of() IMMUTABLE! replaceAll() pokušava mijenjati listu in-place što nije dozvoljeno. list3 bi radilo da je došlo do njega: [1, 2, 1, 3, 1] → [99, 2, 99, 3, 99]. Collections.replaceAll(list, oldVal, newVal) zamjenjuje SVE pojave oldVal s newVal! Koristi set(index, newVal) interno pa zahtijeva MUTABLE listu. Za immutable liste koristiti Stream: list.stream().map(x -> x.equals(old) ? newVal : x).toList().",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se ali pada na list2 - List.of() je immutable", "isCorrect": true },
      { "text": "Kompilira se i sve radi ispravno", "isCorrect": false },
      { "text": "Neće se kompilirati - replaceAll() ne postoji", "isCorrect": false },
      { "text": "Pada na list3 jer Integer ne može se mijenjati", "isCorrect": false },
      { "text": "Sve tri liste padaju - replaceAll ne radi s factory metodama", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje operacije su THREAD-SAFE na ConcurrentHashMap? (Odaberite sve točne)",
    "explanation": "THREAD-SAFE na ConcurrentHashMap: (1) get(key) - uvijek thread-safe, no locking. (2) put(key, value) - atomična operacija. (3) putIfAbsent(key, value) - atomična check-and-put. (4) remove(key) - atomična. (5) computeIfAbsent(key, function) - atomična lazy computation. (6) merge(key, value, remappingFunction) - atomična combine operacija. NISU automatski thread-safe: (7) Dva odvojena put() poziva - nije atomično. (8) get() + put() - race condition između! ConcurrentHashMap koristi LOCK STRIPING - ne lockira cijelu mapu, samo segmente. Bolja concurrency od synchronized HashMap!",
    "difficulty": "HARD",
    "options": [
      { "text": "get(key)", "isCorrect": true },
      { "text": "put(key, value)", "isCorrect": true },
      { "text": "putIfAbsent(key, value)", "isCorrect": true },
      { "text": "computeIfAbsent(key, function)", "isCorrect": true },
      { "text": "Dva odvojena put() poziva", "isCorrect": false },
      { "text": "get() pa zatim put()", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto Arrays.asList() vraća fixed-size listu?",
    "explanation": "Arrays.asList() vraća WRAPPER oko postojećeg array-a, ne kreira novu kolekciju! Wrapper dijeli ISTU memoriju s original array-om - promjene na listi reflektiraju se u array-u i obrnuto! Fixed-size jer ARRAY ima fixed size - ne možete mijenjati duljinu array-a! add() i remove() mijenjaju SIZE pa bacaju UnsupportedOperationException. set() RADI jer ne mijenja size, samo zamjenjuje element. Primjer: String[] arr = {\"A\", \"B\"}; List<String> list = Arrays.asList(arr); list.set(0, \"X\"); → arr[0] je sad \"X\"! Za pravu kopiju: new ArrayList<>(Arrays.asList(...)) ili List.of().stream().collect(Collectors.toList()).",
    "difficulty": "HARD",
    "options": [
      { "text": "Vraća wrapper oko array-a koji dijeli memoriju - array je fixed size", "isCorrect": true },
      { "text": "Java specifikacija zabranjuje dynamically sized array lists", "isCorrect": false },
      { "text": "Performance optimizacija - fixed size je brži", "isCorrect": false },
      { "text": "Arrays.asList() je legacy metoda iz Java 1.2", "isCorrect": false },
      { "text": "Fixed size zbog thread-safety razloga", "isCorrect": false },
      { "text": "Bug u implementaciji koji nije popravljen zbog backward compatibility", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s NavigableSet operacijama?",
    "codeSnippet": "public class NavigableSetTest {\n    public static void main(String[] args) {\n        NavigableSet<Integer> set = new TreeSet<>(Set.of(10, 20, 30, 40, 50));\n        \n        Integer lower = set.lower(30);\n        Integer floor = set.floor(30);\n        Integer ceiling = set.ceiling(30);\n        Integer higher = set.higher(30);\n        \n        System.out.println(lower + \" \" + floor + \" \" + \n                          ceiling + \" \" + higher);\n        \n        NavigableSet<Integer> subset = set.subSet(20, true, 40, false);\n        System.out.println(subset);\n    }\n}",
    "explanation": "Ispisat će: '20 30 30 40' i '[20, 30]'. NavigableSet proširuje SortedSet s preciznim navigacijskim metodama! lower(30) vraća STRIKTNO MANJI (< 30) = 20. floor(30) vraća MANJI ILI JEDNAK (≤ 30) = 30 (ima 30 u setu). ceiling(30) vraća VEĆI ILI JEDNAK (≥ 30) = 30. higher(30) vraća STRIKTNO VEĆI (> 30) = 40. subSet(20, true, 40, false) vraća [20, 40) - INCLUSIVE početak, EXCLUSIVE kraj = [20, 30]. TreeSet implementira NavigableSet! Koristi se za range queries i ordered navigation. pollFirst()/pollLast() uklanjaju i vraćaju prvi/zadnji!",
    "difficulty": "HARD",
    "options": [
      { "text": "20 30 30 40 i [20, 30]", "isCorrect": true },
      { "text": "10 30 40 50 i [20, 30, 40]", "isCorrect": false },
      { "text": "20 20 40 40 i [20, 30, 40]", "isCorrect": false },
      { "text": "Neće se kompilirati - NavigableSet ne postoji", "isCorrect": false },
      { "text": "null null null null i []", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'view' u kontekstu Collections metoda kao subList()?",
    "explanation": "View je WINDOW u originalnu kolekciju - ne kreira KOPIJU već DIJELI istu memoriju! Promjene na view-u reflektiraju se u originalnoj kolekciji i obrnuto! Primjer: List<String> list = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\")); List<String> sublist = list.subList(1, 3); // [B, C] - VIEW! sublist.set(0, \"X\"); → list je sad [A, X, C, D]! list.add(\"E\"); → sublist može postati INVALIDAN (ConcurrentModificationException)! Views: subList(), subSet(), subMap(), headSet(), tailSet(), Collections.unmodifiableList(), synchronizedList(). PREDNOST: O(1) kreiranje, dijeljenje memorije. OPASNOST: strukturalne izmjene originala invalidiraju view!",
    "difficulty": "HARD",
    "options": [
      { "text": "Window u originalnu kolekciju - dijele memoriju, promjene su vidljive objema stranama", "isCorrect": true },
      { "text": "Read-only kopija koja se automatski refreshira", "isCorrect": false },
      { "text": "Snapshot kolekcije u trenutku poziva", "isCorrect": false },
      { "text": "Wrapper koji prevodi operacije ali ima svoju memoriju", "isCorrect": false },
      { "text": "Cache optimizacija za brže pristupe", "isCorrect": false },
      { "text": "Deprecated koncept iz Java 1.4", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Collections utility metode su DEPRECATED ili ne preporučuju se? (Odaberite sve točne)",
    "explanation": "NE preporučuju se (iako nisu deprecated): (1) Vector - legacy thread-safe lista, koristiti ArrayList + synchronization ili CopyOnWriteArrayList. (2) Hashtable - legacy thread-safe mapa, koristiti HashMap + sync ili ConcurrentHashMap. (3) Stack - legacy LIFO, koristiti ArrayDeque (brži). (4) Enumeration - stari iterator interface, koristiti Iterator. PREPORUČENI ZAMJENE: ArrayList/LinkedList umjesto Vector, HashMap umjesto Hashtable, ArrayDeque umjesto Stack, Iterator umjesto Enumeration. Collections.synchronizedList() radi ali je manje efikasno od concurrent kolekcija! Legacy klase postoje za backward compatibility ali se ne preporučuju u novom kodu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Vector - koristiti ArrayList", "isCorrect": true },
      { "text": "Hashtable - koristiti HashMap", "isCorrect": true },
      { "text": "Stack - koristiti ArrayDeque", "isCorrect": true },
      { "text": "Enumeration - koristiti Iterator", "isCorrect": true },
      { "text": "ArrayList", "isCorrect": false },
      { "text": "HashMap", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s EnumSet operacijama?",
    "codeSnippet": "enum Day {\n    MON, TUE, WED, THU, FRI, SAT, SUN\n}\n\npublic class EnumSetTest {\n    public static void main(String[] args) {\n        EnumSet<Day> weekdays = EnumSet.range(Day.MON, Day.FRI);\n        EnumSet<Day> weekend = EnumSet.of(Day.SAT, Day.SUN);\n        \n        EnumSet<Day> allDays = EnumSet.allOf(Day.class);\n        EnumSet<Day> noDays = EnumSet.noneOf(Day.class);\n        \n        EnumSet<Day> workingDays = EnumSet.complementOf(weekend);\n        \n        System.out.println(weekdays.size() + \" \" + \n                          weekend.size() + \" \" + \n                          workingDays.size());\n    }\n}",
    "explanation": "Ispisat će '5 2 5'. EnumSet je SPECIJALIZIRAN Set za enum tipove - EKSTREMNO EFIKASAN (koristi bit vector interno)! range(MON, FRI) kreira set od MON do FRI INCLUSIVE = 5 dana (MON, TUE, WED, THU, FRI). of(SAT, SUN) kreira set s 2 dana. complementOf(weekend) vraća SVE osim weekenda = 5 radnih dana (MON-FRI). allOf() kreira set sa SVIM enum vrijednostima, noneOf() prazan set. EnumSet je: O(1) za sve operacije, kompaktan (bit per element), type-safe! NAJBRŽA Set implementacija za enum tipove - uvijek koristiti za enum setove!",
    "difficulty": "HARD",
    "options": [
      { "text": "5 2 5", "isCorrect": true },
      { "text": "4 2 4 - range je exclusive", "isCorrect": false },
      { "text": "7 2 7 - allDays se računa", "isCorrect": false },
      { "text": "Neće se kompilirati - EnumSet ne postoji", "isCorrect": false },
      { "text": "5 2 0 - complementOf vraća prazan set", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto je ArrayDeque bolji od LinkedList za FIFO/LIFO operacije?",
    "explanation": "ArrayDeque (Array Double-Ended Queue) je BRŽI i KOMPAKTNIJI od LinkedList! Razlozi: (1) NO NODE OVERHEAD - LinkedList ima 2 reference po elementu (next/prev), ArrayDeque koristi circular array. (2) BOLJA CACHE LOCALITY - array elementi su u CONTIGUOUS memoriji, linked list nodovi razbacani. (3) NO NULL - ArrayDeque ne dozvoljava null elemente (olakšava implementaciju). (4) BRŽI - add/remove s oba kraja su O(1) ali s manjim konstantnim faktorom. LinkedList je bolji samo za FREQUENT INSERT/REMOVE u sredini liste (što je rijedak use case). Za Stack/Queue koristiti UVIJEK ArrayDeque! Collections Framework preporuka od Java 6.",
    "difficulty": "HARD",
    "options": [
      { "text": "Nema node overhead, bolja cache locality, brži s manjim konstantama", "isCorrect": true },
      { "text": "ArrayDeque je thread-safe, LinkedList nije", "isCorrect": false },
      { "text": "LinkedList je deprecated u Java 25", "isCorrect": false },
      { "text": "ArrayDeque koristi manje memorije zbog kompresije", "isCorrect": false },
      { "text": "Nema razlike - identične su performanse", "isCorrect": false },
      { "text": "ArrayDeque podržava null elemente, LinkedList ne", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su razlike između stream().toList() (Java 16+) i collect(Collectors.toList())? (Odaberite sve točne)",
    "explanation": "RAZLIKE: (1) toList() vraća IMMUTABLE listu, collect(Collectors.toList()) vraća MUTABLE (ArrayList). (2) toList() je KRAĆE - jedna metoda umjesto dvije. (3) toList() je BRŽE - optimizirana implementacija. (4) toList() je DEFAULT CHOICE od Java 16+ za converting stream to list. collect(Collectors.toList()) ima GARANTIJU da vraća ArrayList (mutable), toList() samo garantira List (može biti bilo koja immutable implementacija). Za mutable rezultat koristiti collect(Collectors.toCollection(ArrayList::new)). toList() je MODERNI način - jednostavniji i sigurniji!",
    "difficulty": "HARD",
    "options": [
      { "text": "toList() vraća immutable, collect() vraća mutable", "isCorrect": true },
      { "text": "toList() je kraće i čitljivije", "isCorrect": true },
      { "text": "toList() je optimizirano i brže", "isCorrect": true },
      { "text": "toList() je default choice od Java 16+", "isCorrect": true },
      { "text": "collect() je brži od toList()", "isCorrect": false },
      { "text": "Nema razlike - identični su", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite problem u sljedećem kodu s Collections.binarySearch():",
    "codeSnippet": "public class BinarySearchBugTest {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>();\n        list.add(50);\n        list.add(20);\n        list.add(80);\n        list.add(10);\n        list.add(40);\n        \n        int index = Collections.binarySearch(list, 40);\n        System.out.println(\"Index of 40: \" + index);\n        \n        Collections.sort(list);\n        index = Collections.binarySearch(list, 40);\n        System.out.println(\"Index of 40 after sort: \" + index);\n        \n        index = Collections.binarySearch(list, 60);\n        System.out.println(\"Index of 60: \" + index);\n    }\n}",
    "explanation": "Prvi binarySearch NEĆE raditi pravilno! binarySearch() ZAHTIJEVA SORTIRANU listu - ako lista nije sortirana, rezultat je UNPREDICTABLE (može vratiti krivi index ili -1)! Lista [50,20,80,10,40] nije sortirana. Prvi index može biti 4 (slučajno točno) ili bilo koji negativan broj. Nakon sort(): [10,20,40,50,80], index 40 je 2 (TOČNO). binarySearch(list, 60) vraća NEGATIVAN broj jer 60 ne postoji - vraća (-(insertion point) - 1) = -4 (60 bi trebao biti na index 3, pa -(3+1) = -4). PRAVILO: UVIJEK sort prije binarySearch! Inače nepredvidivi rezultati!",
    "difficulty": "HARD",
    "options": [
      { "text": "Prvi binarySearch ne radi jer lista nije sortirana - unpredictable rezultat", "isCorrect": true },
      { "text": "Nema problema - binarySearch automatski sortira", "isCorrect": false },
      { "text": "binarySearch() baca exception ako lista nije sortirana", "isCorrect": false },
      { "text": "Sve radi ispravno", "isCorrect": false },
      { "text": "binarySearch() ne radi s ArrayList", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je Java 24 Stream Gatherers i kako se koristi s kolekcijama?",
    "explanation": "Stream Gatherers (Java 24) su CUSTOM INTERMEDIATE operacije za Stream API! Omogućavaju kreiranje VLASTITIH stream transformacija koje prije nisu bile moguće bez collect(). Ugrađeni gatherers: windowFixed(n) - grupira u fiksne window-e od n elemenata, windowSliding(n) - sliding window, fold() - custom accumulation, scan() - running accumulation, mapConcurrent() - parallel mapping. Primjer: stream.gather(Gatherers.windowFixed(3)).toList() grupira elemente u liste od po 3. Gatherers POPUNJAVAJU prazninu između map/filter (simple) i collect (complex). API: stream.gather(gatherer). Ovo je PRVA velika ekspanzija intermediate operacija od Java 8!",
    "difficulty": "HARD",
    "options": [
      { "text": "Custom intermediate operacije za Stream - windowFixed, windowSliding, fold, scan", "isCorrect": true },
      { "text": "Novi način za thread-safe collection gathering", "isCorrect": false },
      { "text": "Replacement za Collectors.groupingBy()", "isCorrect": false },
      { "text": "Automatski parallel processing optimizacija", "isCorrect": false },
      { "text": "Deprecated naziv za Stream.collect()", "isCorrect": false },
      { "text": "Memory management API za velike kolekcije", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.addAll() i varargs?",
    "codeSnippet": "public class AddAllTest {\n    public static void main(String[] args) {\n        List<String> list1 = new ArrayList<>();\n        Collections.addAll(list1, \"A\", \"B\", \"C\");\n        System.out.println(list1.size());\n        \n        List<String> list2 = new ArrayList<>();\n        list2.addAll(List.of(\"X\", \"Y\", \"Z\"));\n        System.out.println(list2.size());\n        \n        List<String> list3 = List.of(\"P\");\n        Collections.addAll(list3, \"Q\", \"R\");\n        System.out.println(list3.size());\n    }\n}",
    "explanation": "Ispisuje '3', '3', zatim PADA s UnsupportedOperationException! Collections.addAll(collection, elements...) prima varargs i dodaje sve elemente. list1 je ArrayList (mutable) pa addAll radi → size 3. list2.addAll(collection) je INSTANCE metoda koja prima kolekciju, također radi → size 3. list3 je List.of() (IMMUTABLE) pa Collections.addAll() baca UnsupportedOperationException! Collections.addAll() je UTILITY metoda za dodavanje više elemenata odjednom - alternativa list.add(e1); list.add(e2);... KLJUČNO: zahtijeva mutable kolekciju!",
    "difficulty": "HARD",
    "options": [
      { "text": "3, 3, zatim UnsupportedOperationException - List.of() je immutable", "isCorrect": true },
      { "text": "3, 3, 3 - sve radi", "isCorrect": false },
      { "text": "Neće se kompilirati - addAll ne prima varargs", "isCorrect": false },
      { "text": "Pada na list1 - Collections.addAll() ne postoji", "isCorrect": false },
      { "text": "0, 0, 0 - addAll vraća novu listu", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto HashMap.compute() i computeIfAbsent() primaju Function umjesto samo value?",
    "explanation": "compute() prima Function<K, V> za LAZY i CONDITIONAL computing! Primaju funkciju umjesto vrijednosti jer: (1) LAZY EVALUATION - funkcija se poziva SAMO AKO je potrebno (npr. computeIfAbsent poziva function samo ako key ne postoji). (2) DEPENDENT ON KEY - funkcija može koristiti key za računanje value. (3) EXPENSIVE OPERATIONS - ako je kreiranje value skupo (DB query, computation), ne želite raditi to nepotrebno. (4) ATOMIC - funkcija se izvršava dok je entry locked (thread-safe). Primjer: map.computeIfAbsent(key, k -> expensiveComputation(k)) - expensiveComputation() se poziva SAMO ako key ne postoji! Za simple value koristiti putIfAbsent().",
    "difficulty": "HARD",
    "options": [
      { "text": "Lazy evaluation - funkcija se poziva samo ako je potrebno, može biti skupa operacija", "isCorrect": true },
      { "text": "Lambda izrazi su brži od direktnih vrijednosti", "isCorrect": false },
      { "text": "Function omogućava automatski type inference", "isCorrect": false },
      { "text": "Backwards compatibility s Java 7", "isCorrect": false },
      { "text": "Security razlozi - value se ne može direktno inject-ati", "isCorrect": false },
      { "text": "Bug u API dizajnu koji se ne može popraviti", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Java 25 Collections optimizacije su planirane/implementirane? (Odaberite sve točne)",
    "explanation": "Java 25 Collections optimizacije: (1) COMPACT OBJECT HEADERS (JEP 519) - objekti zauzimaju ~50% MANJE memorije! Utječe na ALL kolekcije jer svaki wrapper objekt (Integer, String) je manji. (2) GENERATIONAL SHENANDOAH GC (JEP 521) - bolji low-latency GC za large collections. (3) PERFORMANCE improvements na immutable collections (List.of, Set.of). (4) Stream API optimizacije za better pipeline execution. NISU u Java 25: reified generics (Project Valhalla - budućnost), automatski parallel streams (user mora odlučiti). Java 25 fokus je na MEMORY i PERFORMANCE, ne na nova API-ja!",
    "difficulty": "HARD",
    "options": [
      { "text": "Compact Object Headers - 50% manje memorije", "isCorrect": true },
      { "text": "Generational Shenandoah GC - bolji low-latency", "isCorrect": true },
      { "text": "Performance improvements na immutable collections", "isCorrect": true },
      { "text": "Stream API optimizacije", "isCorrect": true },
      { "text": "Reified generics - List<int> bez boxinga", "isCorrect": false },
      { "text": "Automatski parallel streams", "isCorrect": false }
    ]
  }

]
}
