import { QuestionType, Difficulty } from '@prisma/client'

export const lambdaExpressionsQuestions = {
  lectureSlug: 'lambda-expressions',
  questions: [
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su lambda izrazi u Javi i kada su uvedeni?",
    "explanation": "Lambda izrazi su anonimne funkcije uvedene u Java 8 koje omogućavaju pisanje kraćeg i čitljivijeg koda. Lambda je funkcija bez imena koja se može prosljeđivati kao parametar. Revolucionirali su način programiranja u Javi uvođenjem funkcionalnog programskog stila. Sintaksa: (parametri) -> { tijelo }. Primjer: (x, y) -> x + y. Lambda izrazi mogu se koristiti samo s funkcionalnim sučeljima.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Anonimne funkcije uvedene u Java 8 koje omogućavaju kraći i čitljiviji kod", "isCorrect": true },
      { "text": "Nove klase uvedene u Java 11 za rad s podacima", "isCorrect": false },
      { "text": "Specijalni operatori za matematičke operacije", "isCorrect": false },
      { "text": "Nove kolekcije uvedene u Java 7", "isCorrect": false },
      { "text": "Zamjena za Generics uvedena u Java 5", "isCorrect": false },
      { "text": "Tip podataka za funkcionalno programiranje", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su glavne prednosti korištenja lambda izraza u odnosu na tradicionalni pristup?",
    "explanation": "Lambda izrazi donose: (1) Kraći kod - manje linija za napisati i održavati (75% manje koda), (2) Čitljiviji kod - fokus na ŠTO radiš, ne KAKO, (3) Moderniji kod - funkcionalni stil programiranja, (4) Eliminacija boilerplate koda - nema potrebe za anonimnim klasama. Primjer: umjesto 9 linija s anonimnom klasom za Comparator, lambda izraz u 1 liniji: (u1, u2) -> Integer.compare(u1.getFollowers(), u2.getFollowers()).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Kraći kod - manje koda za pisanje i održavanje", "isCorrect": true },
      { "text": "Čitljiviji kod - fokus na što radiš, ne kako", "isCorrect": true },
      { "text": "Funkcionalni stil programiranja - moderniji pristup", "isCorrect": true },
      { "text": "Brže izvršavanje u runtime-u automatski", "isCorrect": false },
      { "text": "Automatska paralelizacija svih operacija", "isCorrect": false },
      { "text": "Zamjena za sve vrste petlji", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je osnovna sintaksa lambda izraza u Javi?",
    "explanation": "Osnovna sintaksa lambda izraza: (parametri) -> { tijelo lambda izraza }. Arrow operator (->) odvaja parametre od tijela funkcije. Zagrade oko parametara su opcijske za jedan parametar, obavezne za 0 ili više parametara. Vitičaste zagrade su opcijske za jedno-linijski kod, obavezne za više linija. Primjeri: () -> System.out.println('Hello'), name -> System.out.println(name), (x, y) -> x + y.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "(parametri) -> { tijelo } - arrow operator povezuje parametre s tijelom", "isCorrect": true },
      { "text": "lambda(parametri) { tijelo } - ključna riječ lambda", "isCorrect": false },
      { "text": "function(parametri) => { tijelo } - function keyword", "isCorrect": false },
      { "text": "[parametri] : { tijelo } - colon operator", "isCorrect": false },
      { "text": "def(parametri) { tijelo } - Python sintaksa", "isCorrect": false },
      { "text": "@Lambda(parametri) { tijelo } - anotacija", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je funkcionalno sučelje u Javi?",
    "explanation": "Funkcionalno sučelje je interface s točno JEDNOM apstraktnom metodom. Lambda izrazi mogu se koristiti SAMO s funkcionalnim sučeljima! @FunctionalInterface anotacija osigurava da imamo samo jednu metodu (kompajler provjerava). Primjer: interface ContentModerator { boolean isAppropriate(String content); }. Java ima ugrađena funkcionalna sučelja u java.util.function paketu: Predicate, Function, Consumer, Supplier.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Interface s točno jednom apstraktnom metodom - lambda se može koristiti samo s njim", "isCorrect": true },
      { "text": "Interface koji implementira funkcije za rad s podacima", "isCorrect": false },
      { "text": "Klasa koja omogućava funkcionalno programiranje", "isCorrect": false },
      { "text": "Interface s više metoda za kompleksne operacije", "isCorrect": false },
      { "text": "Special tip sučelja uvedenog u Java 11", "isCorrect": false },
      { "text": "Interface bez ikakvih metoda", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koja su glavna ugrađena funkcionalna sučelja u java.util.function paketu?",
    "explanation": "Glavna ugrađena sučelja: (1) Predicate<T> - prima argument, vraća boolean (primjer: story -> story.getHoursOld() < 24), (2) Function<T,R> - prima T, vraća R (primjer: name -> '@' + name.toLowerCase()), (3) Consumer<T> - prima argument, ne vraća ništa (primjer: user -> sendNotification(user)), (4) Supplier<T> - ne prima argumente, vraća rezultat (primjer: () -> randomQuote()). Ne trebate uvijek praviti svoje funkcionalno sučelje!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Predicate<T> - prima argument, vraća boolean", "isCorrect": true },
      { "text": "Function<T,R> - prima T, vraća R", "isCorrect": true },
      { "text": "Consumer<T> - prima argument, ne vraća ništa", "isCorrect": true },
      { "text": "Supplier<T> - ne prima argumente, vraća rezultat", "isCorrect": true },
      { "text": "Iterator<T> - iterira kroz elemente", "isCorrect": false },
      { "text": "Comparator<T> - uspoređuje dva elementa", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su method references u Javi?",
    "explanation": "Method reference je još kraći način pisanja lambda izraza kada lambda samo poziva postojeću metodu. Sintaksa: Class::method. Primjer: umjesto users.forEach(user -> System.out.println(user)) pišemo users.forEach(System.out::println). Vrste: statička metoda (Integer::parseInt), instance metoda (String::isEmpty), konstruktor (User::new). Method reference je uvijek preferirani način jer je kraći i čitljiviji.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Kraći način pisanja lambda izraza kada lambda samo poziva postojeću metodu", "isCorrect": true },
      { "text": "Nova vrsta varijable uvedena u Java 8", "isCorrect": false },
      { "text": "Način kopiranja metoda između klasa", "isCorrect": false },
      { "text": "Alat za dokumentiranje metoda", "isCorrect": false },
      { "text": "Pointer na metodu kao u C++", "isCorrect": false },
      { "text": "Anotacija za označavanje metoda", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su vrste method references u Javi?",
    "explanation": "Tri vrste method references: (1) Referenca na statičku metodu: List.of('1','2','3').stream().map(Integer::parseInt) - poziva static metodu, (2) Referenca na instance metodu: hashtags.stream().filter(String::isEmpty) - poziva metodu na instance, (3) Referenca na konstruktor: usernames.stream().map(User::new) - poziva konstruktor za kreiranje objekata. Svi ovi su kraći i čitljiviji od lambda izraza.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Referenca na statičku metodu: Integer::parseInt", "isCorrect": true },
      { "text": "Referenca na instance metodu: String::isEmpty", "isCorrect": true },
      { "text": "Referenca na konstruktor: User::new", "isCorrect": true },
      { "text": "Referenca na privatne metode: Private::method", "isCorrect": false },
      { "text": "Referenca na anotacije: Annotation::value", "isCorrect": false },
      { "text": "Referenca na polja: Field::get", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je Stream API i kako se povezuje s lambda izrazima?",
    "explanation": "Stream API omogućava funkcionalno procesiranje kolekcija uvedeno u Java 8. Stream je tok podataka kroz operacije. Lambda izrazi čine Stream API moćnim i lakim za korištenje. Operacije: filter (filtriranje), map (transformacija), sorted (sortiranje), limit (ograničenje), collect (prikupljanje). Stream API koristi lazy evaluation - operacije se ne izvršavaju dok ne naiđe terminal operacija. Primjer: posts.stream().filter(...).map(...).collect(Collectors.toList()).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "API za funkcionalno procesiranje kolekcija - lambda izrazi ga čine moćnim", "isCorrect": true },
      { "text": "Nova vrsta kolekcije za brže izvršavanje", "isCorrect": false },
      { "text": "API za streaming video sadržaja", "isCorrect": false },
      { "text": "Alat za networking i komunikaciju", "isCorrect": false },
      { "text": "Zamjena za Iterator pattern", "isCorrect": false },
      { "text": "API za rad s file stream-ovima", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što radi filter() operacija u Stream API-ju?",
    "explanation": "filter() filtrira elemente prema zadanim kriterijima i vraća novi Stream samo s elementima koji zadovoljavaju uvjet. Prima Predicate (lambda koja vraća boolean). Primjer: users.stream().filter(user -> user.getAge() > 18) - vraća stream samo s korisnicima starijim od 18. Filter je intermediate operacija (lazy) - ne izvršava se dok ne naiđe terminal operacija kao collect() ili forEach().",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Filtrira elemente prema predikatu i vraća stream samo s elementima koji zadovoljavaju uvjet", "isCorrect": true },
      { "text": "Transformira svaki element u novi tip", "isCorrect": false },
      { "text": "Sortira elemente po zadanom kriteriju", "isCorrect": false },
      { "text": "Briše elemente iz originalne kolekcije", "isCorrect": false },
      { "text": "Mijenja vrijednosti elemenata", "isCorrect": false },
      { "text": "Grupira elemente po kategorijama", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između map() i flatMap() operacija?",
    "explanation": "map() transformira svaki element u stream-u 1:1 - prima jedan tip, vraća drugi tip (stream.map(String::length) - svaki String postaje Integer). flatMap() se koristi za 'spljoštavanje' ugniježđenih kolekcija - kada imaš kolekciju kolekcija i želiš jednu ravnu kolekciju. map() vraća Stream<List<T>>, flatMap() vraća Stream<T>. Primjer: users.stream().flatMap(user -> user.getFriends().stream()) - sve prijatelje svih korisnika u jednu listu.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "map() transformira 1:1, flatMap() 'spljoštava' ugniježđene kolekcije u jednu", "isCorrect": true },
      { "text": "map() je za brojeve, flatMap() za stringove", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "map() radi samo s List, flatMap() s Set", "isCorrect": false },
      { "text": "flatMap() je brži od map()", "isCorrect": false },
      { "text": "map() mijenja originalnu kolekciju, flatMap() ne", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što radi reduce() operacija u Stream API-ju?",
    "explanation": "reduce() se koristi kada iz zbirke vrijednosti trebamo odrediti jednu vrijednost. Prima početnu vrijednost (identity) i akumulator funkciju. Primjer: Stream.of(1,2,3).reduce(0, (acc, element) -> acc + element) vraća 6 (0+1+2+3). Koristi se za agregaciju: sum, product, max, min. reduce() je terminal operacija koja vraća jednu vrijednost. Može se koristiti i bez identitya - tada vraća Optional.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Koristi se za agregaciju - iz zbirke vrijednosti odrediti jednu vrijednost", "isCorrect": true },
      { "text": "Smanjuje broj elemenata u kolekciji za pola", "isCorrect": false },
      { "text": "Uklanja duplikate iz stream-a", "isCorrect": false },
      { "text": "Filtrira elemente prema kriteriju", "isCorrect": false },
      { "text": "Sortira elemente u rastućem redoslijedu", "isCorrect": false },
      { "text": "Transformira elemente u jednostavniji oblik", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Collectors metode se koriste za prikupljanje rezultata stream-a?",
    "explanation": "Collectors pretvaraju stream u različite strukture: (1) toList()/toSet() - u listu ili set, (2) joining() - spaja stringove s delimiterom, (3) groupingBy() - grupira elemente po ključu u Map<K, List<V>>, (4) partitioningBy() - dijeli u dvije grupe (true/false) u Map<Boolean, List<T>>, (5) counting() - broji elemente, (6) averagingInt/Double() - prosječna vrijednost. Primjer: songs.stream().collect(Collectors.groupingBy(Song::getGenre)).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "toList()/toSet() - u listu ili set", "isCorrect": true },
      { "text": "groupingBy() - grupira po ključu u Map", "isCorrect": true },
      { "text": "partitioningBy() - dijeli u dvije grupe (true/false)", "isCorrect": true },
      { "text": "filter() - filtrira rezultate", "isCorrect": false },
      { "text": "map() - transformira rezultate", "isCorrect": false },
      { "text": "sorted() - sortira rezultate", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je lazy evaluation u Stream API-ju?",
    "explanation": "Lazy evaluation znači da se stream operacije NE izvršavaju odmah - izvršavaju se tek kad pozoveš terminal operaciju! Intermediate operacije (filter, map, sorted) su lazy - samo grade pipeline. Terminal operacije (collect, forEach, count) pokreću izvršavanje. Ovo je odlično za performanse - ne procesira sve podatke ako koristiš findFirst() ili limit(). Primjer: stream.filter(...).map(...) se NE izvršava dok ne pozoveš .collect().",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Stream operacije se ne izvršavaju dok ne naiđe terminal operacija", "isCorrect": true },
      { "text": "Stream automatski optimizira izvršavanje", "isCorrect": false },
      { "text": "Stream čeka određeno vrijeme prije izvršavanja", "isCorrect": false },
      { "text": "Operacije se izvršavaju samo ako su nužne", "isCorrect": false },
      { "text": "Stream evaluira samo parne elemente", "isCorrect": false },
      { "text": "Lazy evaluation je za Java 11+ verzije", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su česte greške pri korištenju lambda izraza?",
    "explanation": "Česte greške: (1) Mutiranje vanjskih varijabli - lambda mora biti effectively final, ne može mijenjati varijable izvan nje (kompajler error), (2) Presložene lambde - previše logike u lambdi čini kod nečitljivim, bolje izdvojiti u zasebnu metodu, (3) Zanemarivanje null vrijednosti - može uzrokovati NullPointerException, treba filtrirati null-ove s filter(Objects::nonNull) ili koristiti Optional. Lambda izrazi trebaju biti pure functions bez side effects.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Mutiranje vanjskih varijabli - lambda mora biti effectively final", "isCorrect": true },
      { "text": "Presložene lambde - previše logike čini kod nečitljivim", "isCorrect": true },
      { "text": "Zanemarivanje null vrijednosti - može uzrokovati NullPointerException", "isCorrect": true },
      { "text": "Korištenje lambda izraza u bilo kojem kontekstu", "isCorrect": false },
      { "text": "Miješanje lambda i tradicionalnih pristupa", "isCorrect": false },
      { "text": "Korištenje više od 3 parametra u lambdi", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Paralelni stream (parallelStream()) je uvijek brži od običnog sekvencijalnog stream-a.",
    "explanation": "FALSE. Paralelni stream NIJE uvijek brži - često je čak sporiji za male količine podataka zbog overheada paralelizacije! Paralelni stream je brži samo za: (1) Velike količine podataka (>10,000 elemenata), (2) CPU-intenzivne operacije, (3) Operacije bez side effects i shared state. Za male kolekcije (<1000 elemenata) overhead paralelizacije je veći od dobiti. Golden rule: nemoj prerano optimizirati - prvo napiši čitljiv kod, pa optimiziraj ako je potrebno.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": false },
      { "text": "False", "isCorrect": true }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s lambda izrazom?",
    "codeSnippet": "List<String> names = List.of(\"Ana\", \"Marko\", \"Ivana\");\n\nList<String> result = names.stream()\n    .map(name -> \"@\" + name.toLowerCase())\n    .collect(Collectors.toList());\n\nSystem.out.println(result);",
    "explanation": "Ispisat će [@ana, @marko, @ivana]. Lambda izraz name -> '@' + name.toLowerCase() transformira svaki element: dodaje '@' prefix i pretvara u lowercase. map() operacija transformira svaki String - Ana postaje @ana, Marko postaje @marko, Ivana postaje @ivana. collect(Collectors.toList()) prikuplja rezultate u listu. Ovo je primjer map() transformacije 1:1 - svaki input postaje jedan output.",
    "difficulty": "HARD",
    "options": [
      { "text": "[@ana, @marko, @ivana]", "isCorrect": true },
      { "text": "[Ana, Marko, Ivana]", "isCorrect": false },
      { "text": "[@ANA, @MARKO, @IVANA]", "isCorrect": false },
      { "text": "Neće se kompilirati - greška u lambda sintaksi", "isCorrect": false },
      { "text": "[ana, marko, ivana]", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s lambda izrazom kompilirati?",
    "codeSnippet": "int sum = 0;\nList<Integer> numbers = List.of(1, 2, 3, 4, 5);\n\nnumbers.forEach(n -> {\n    sum += n;\n});\n\nSystem.out.println(sum);",
    "explanation": "Kod se NEĆE kompilirati. Greška: 'Variable used in lambda expression should be final or effectively final'. Lambda izraz pokušava mutirati vanjsku varijablu 'sum', što Java ne dopušta - varijable korištene u lambdi moraju biti effectively final. Rješenje: koristiti reduce() za agregaciju: int sum = numbers.stream().reduce(0, Integer::sum) ili sum() metodu: int sum = numbers.stream().mapToInt(Integer::intValue).sum(). Ovo je česta greška - lambda mora biti pure function bez side effects.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - varijabla u lambdi mora biti effectively final", "isCorrect": true },
      { "text": "Kompilira se i ispisuje 15", "isCorrect": false },
      { "text": "Kompilira se ali ispisuje 0", "isCorrect": false },
      { "text": "Baca ConcurrentModificationException", "isCorrect": false },
      { "text": "Neće se kompilirati - forEach ne postoji", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 5", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s filter() operacijom?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\nList<Integer> result = numbers.stream()\n    .filter(n -> n % 2 == 0)\n    .filter(n -> n > 5)\n    .collect(Collectors.toList());\n\nSystem.out.println(result);",
    "explanation": "Ispisat će [6, 8, 10]. Prvi filter n -> n % 2 == 0 propušta samo parne brojeve: [2,4,6,8,10]. Drugi filter n -> n > 5 propušta samo brojeve veće od 5: [6,8,10]. Možete ulančavati više filter() operacija - svaki dodatno filtrira rezultat. Alternativno se može pisati u jednom filteru: filter(n -> n % 2 == 0 && n > 5). Filter je intermediate operacija (lazy) - izvršava se tek kad naiđe terminal operacija collect().",
    "difficulty": "HARD",
    "options": [
      { "text": "[6, 8, 10]", "isCorrect": true },
      { "text": "[2, 4, 6, 8, 10]", "isCorrect": false },
      { "text": "[6, 7, 8, 9, 10]", "isCorrect": false },
      { "text": "[5, 6, 7, 8, 9, 10]", "isCorrect": false },
      { "text": "Neće se kompilirati - ne možete imati dva filtera", "isCorrect": false },
      { "text": "[]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s map() i collect() operacijama?",
    "codeSnippet": "List<String> words = List.of(\"Java\", \"Python\", \"C++\", \"JavaScript\");\n\nList<Integer> lengths = words.stream()\n    .map(String::length)\n    .collect(Collectors.toList());\n\nSystem.out.println(lengths);",
    "explanation": "Ispisat će [4, 6, 3, 10]. map(String::length) transformira svaki String u njegovu duljinu (Integer). Java ima 4 slova, Python 6, C++ 3, JavaScript 10. String::length je method reference - kraći način pisanja lambda izraza word -> word.length(). map() je 1:1 transformacija - svaki input postaje jedan output. collect(Collectors.toList()) prikuplja rezultate u mutable ArrayList.",
    "difficulty": "HARD",
    "options": [
      { "text": "[4, 6, 3, 10]", "isCorrect": true },
      { "text": "[Java, Python, C++, JavaScript]", "isCorrect": false },
      { "text": "[10, 6, 4, 3]", "isCorrect": false },
      { "text": "Neće se kompilirati - String::length ne postoji", "isCorrect": false },
      { "text": "[4, 6, 2, 10]", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećem kodu s method reference:",
    "codeSnippet": "List<String> names = List.of(\"Ana\", \"Marko\", \"Ivana\");\n\nnames.stream()\n    .forEach(name -> System.out.println(name));\n\n// vs\n\nnames.stream()\n    .forEach(System.out::println);",
    "explanation": "Nema greške - oba koda rade isto! Ali DRUGI način (System.out::println) je BOLJI i preferiran. System.out::println je method reference - kraći i čitljiviji način pisanja lambda izraza name -> System.out.println(name). Kad lambda samo poziva postojeću metodu, uvijek koristite method reference. Best practice: preferirajte method references gdje god je to moguće jer je kod koncizniji i jasnije pokazuje namjeru.",
    "difficulty": "HARD",
    "options": [
      { "text": "Nema greške - drugi način (method reference) je preferirani jer je kraći", "isCorrect": true },
      { "text": "Prva verzija je kriva - lambda ne može imati jedan parametar", "isCorrect": false },
      { "text": "Druga verzija je kriva - method reference ne radi s forEach", "isCorrect": false },
      { "text": "Obje verzije su krive - nedostaje collect()", "isCorrect": false },
      { "text": "Prva verzija je brža od druge", "isCorrect": false },
      { "text": "Neće se kompilirati - forEach ne prima lambdu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu s flatMap() operacijom?",
    "codeSnippet": "List<List<Integer>> numbers = List.of(\n    List.of(1, 2, 3),\n    List.of(4, 5, 6),\n    List.of(7, 8, 9)\n);\n\nList<Integer> flattened = numbers.stream()\n    .flatMap(list -> list.stream())\n    .collect(Collectors.toList());\n\nSystem.out.println(flattened);",
    "explanation": "Nema greške - kod je ispravan i ispisat će [1, 2, 3, 4, 5, 6, 7, 8, 9]. flatMap() 'spljoštava' ugniježđenu strukturu List<List<Integer>> u jednu ravnu List<Integer>. flatMap(list -> list.stream()) pretvara svaku unutarnju listu u stream, a flatMap automatski spaja sve stream-ove u jedan. Bez flatMap-a bi dobili Stream<List<Integer>>, s flatMap-om dobivamo Stream<Integer>. Ovo je klasična upotreba flatMap-a za ravnanje ugniježđenih kolekcija.",
    "difficulty": "HARD",
    "options": [
      { "text": "Nema greške - kod je ispravan i spljoštava ugniježđene liste", "isCorrect": true },
      { "text": "Nedostaje map() prije flatMap()", "isCorrect": false },
      { "text": "flatMap() ne može raditi s List<List<Integer>>", "isCorrect": false },
      { "text": "Treba koristiti map() umjesto flatMap()", "isCorrect": false },
      { "text": "Nedostaje filter() prije collect()", "isCorrect": false },
      { "text": "list.stream() treba biti Collections.stream(list)", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s reduce() operacijom?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5);\n\nint result = numbers.stream()\n    .reduce(10, (acc, n) -> acc + n);\n\nSystem.out.println(result);",
    "explanation": "Ispisat će 25. reduce(10, (acc, n) -> acc + n) počinje s identity vrijednosti 10, pa zbrajа sve elemente. Računanje: 10+1=11, 11+2=13, 13+3=16, 16+4=20, 20+5=25. Identity je početna vrijednost akumulatora. Bez identity-a bi rezultat bio 15 (1+2+3+4+5). reduce() akumulira sve elemente u jednu vrijednost primjenjujući binary operator. Za zbrajanje može se koristiti i kraće: reduce(10, Integer::sum).",
    "difficulty": "HARD",
    "options": [
      { "text": "25", "isCorrect": true },
      { "text": "15", "isCorrect": false },
      { "text": "10", "isCorrect": false },
      { "text": "5", "isCorrect": false },
      { "text": "Neće se kompilirati - reduce ne prima dva parametra", "isCorrect": false },
      { "text": "Baca ArithmeticException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Collectors.groupingBy() kompilirati?",
    "codeSnippet": "record Student(String name, String major) {}\n\nList<Student> students = List.of(\n    new Student(\"Ana\", \"CS\"),\n    new Student(\"Marko\", \"Math\"),\n    new Student(\"Petra\", \"CS\")\n);\n\nMap<String, List<Student>> byMajor = students.stream()\n    .collect(Collectors.groupingBy(Student::major));\n\nSystem.out.println(byMajor.get(\"CS\").size());",
    "explanation": "Kompilira se i ispisuje 2. Collectors.groupingBy(Student::major) grupira studente po major-u u Map<String, List<Student>>. Ključ je major (CS, Math), vrijednost je lista studenata s tim major-om. Ana i Petra su CS, Marko je Math. byMajor.get('CS') vraća listu [Ana, Petra], size() vraća 2. groupingBy() je moćan collector za grupiranje elemenata po bilo kojem kriteriju. Student::major je method reference na getter.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 2", "isCorrect": true },
      { "text": "Neće se kompilirati - groupingBy ne postoji", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 3", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "Neće se kompilirati - Student::major ne radi s records", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 1", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s sorted() i limit() operacijama?",
    "codeSnippet": "List<Integer> numbers = List.of(5, 2, 8, 1, 9, 3, 7);\n\nList<Integer> result = numbers.stream()\n    .sorted()\n    .limit(3)\n    .collect(Collectors.toList());\n\nSystem.out.println(result);",
    "explanation": "Ispisat će [1, 2, 3]. sorted() sortira elemente uzlazno (default natural order). limit(3) uzima samo prva 3 elementa. Sortirani stream je [1,2,3,5,7,8,9], limit(3) uzima [1,2,3]. limit() je short-circuiting operacija - ne procesira sve elemente ako ne treba. Kombinacija sorted() i limit() je čest pattern za 'top N' rezultate. Za silazni redoslijed: sorted(Comparator.reverseOrder()).",
    "difficulty": "HARD",
    "options": [
      { "text": "[1, 2, 3]", "isCorrect": true },
      { "text": "[5, 2, 8]", "isCorrect": false },
      { "text": "[9, 8, 7]", "isCorrect": false },
      { "text": "[1, 2, 3, 5, 7, 8, 9]", "isCorrect": false },
      { "text": "Neće se kompilirati - sorted() ne postoji", "isCorrect": false },
      { "text": "[7, 8, 9]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se događa u sljedećem kodu s Collectors.partitioningBy()?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\nMap<Boolean, List<Integer>> partitioned = numbers.stream()\n    .collect(Collectors.partitioningBy(n -> n > 5));\n\nSystem.out.println(partitioned.get(true).size());\nSystem.out.println(partitioned.get(false).size());",
    "explanation": "Ispisat će 5 i 5. partitioningBy() dijeli stream u DVE grupe prema boolean predikatu u Map<Boolean, List<T>>. Predikat n -> n > 5 dijeli na: true (veće od 5): [6,7,8,9,10] - 5 elemenata, false (5 ili manje): [1,2,3,4,5] - 5 elemenata. partitioningBy() je specijalizirani slučaj groupingBy() za binary particioniranje. Uvijek vraća map s dva ključa (true i false), čak i ako je jedna lista prazna.",
    "difficulty": "HARD",
    "options": [
      { "text": "5 i 5", "isCorrect": true },
      { "text": "10 i 0", "isCorrect": false },
      { "text": "6 i 4", "isCorrect": false },
      { "text": "4 i 6", "isCorrect": false },
      { "text": "Neće se kompilirati - partitioningBy ne postoji", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedećih dvaju pristupa?",
    "codeSnippet": "List<String> names = List.of(\"Ana\", \"Marko\", \"Ivana\");\n\n// Pristup 1\nList<String> result1 = names.stream()\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());\n\n// Pristup 2 (Java 16+)\nList<String> result2 = names.stream()\n    .map(String::toUpperCase)\n    .toList();",
    "explanation": "Oba pristupa rade isto - transformiraju imena u uppercase - ali Pristup 2 (toList()) je KRAĆI i MODERNIJI (Java 16+). Razlika: Collectors.toList() vraća MUTABLE ArrayList (može se mijenjati), toList() vraća IMMUTABLE listu (ne može se mijenjati). toList() je konciznija sintaksa bez potrebe za Collectors klasom. Best practice: koristite toList() u Java 16+ osim ako eksplicitno trebate mutable listu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Pristup 2 je kraći i moderniji (Java 16+), toList() vraća immutable listu", "isCorrect": true },
      { "text": "Pristup 1 je brži od Pristupa 2", "isCorrect": false },
      { "text": "Pristup 2 ne radi s map() operacijom", "isCorrect": false },
      { "text": "Nema razlike, oba rade identično", "isCorrect": false },
      { "text": "Pristup 1 vraća immutable listu, Pristup 2 mutable", "isCorrect": false },
      { "text": "Pristup 2 ne postoji u Java 16", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s min() operacijom i Optional?",
    "codeSnippet": "record Track(String name, int length) {}\n\nList<Track> tracks = List.of(\n    new Track(\"Song A\", 180),\n    new Track(\"Song B\", 240),\n    new Track(\"Song C\", 120)\n);\n\nTrack shortest = tracks.stream()\n    .min(Comparator.comparing(Track::length))\n    .orElse(null);\n\nSystem.out.println(shortest.name());",
    "explanation": "Ispisat će 'Song C'. min(Comparator.comparing(Track::length)) pronalazi track s najmanjom duljinom. Track::length je method reference na getter. min() vraća Optional<Track> jer stream može biti prazan. orElse(null) vraća track ili null ako je prazan. Song C ima duljinu 120 (najmanji), Song A 180, Song B 240. shortest.name() pristupa imenu najkraćeg tracka. Bolje od orElse(null) je koristiti orElseThrow() ili ifPresent().",
    "difficulty": "HARD",
    "options": [
      { "text": "Song C", "isCorrect": true },
      { "text": "Song A", "isCorrect": false },
      { "text": "Song B", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "Neće se kompilirati - min() ne postoji", "isCorrect": false },
      { "text": "null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s paralelnim stream-om kompilirati?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\nint sum = numbers.parallelStream()\n    .filter(n -> n % 2 == 0)\n    .mapToInt(Integer::intValue)\n    .sum();\n\nSystem.out.println(sum);",
    "explanation": "Kompilira se i ispisuje 30. parallelStream() koristi više CPU cores za paralelnu obradu. filter(n -> n % 2 == 0) propušta parne brojeve [2,4,6,8,10]. mapToInt(Integer::intValue) pretvara u IntStream. sum() zbraja sve elemente: 2+4+6+8+10=30. Paralelni stream je siguran ovdje jer nema shared state. PAŽNJA: paralelni stream NIJE uvijek brži - overhead je veći za male kolekcije. Koristite samo za velike podatke (>10,000) i CPU-intenzivne operacije.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 30", "isCorrect": true },
      { "text": "Neće se kompilirati - parallelStream() ne postoji", "isCorrect": false },
      { "text": "Kompilira se ali daje krivi rezultat zbog paralelizma", "isCorrect": false },
      { "text": "Baca ConcurrentModificationException", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 55", "isCorrect": false },
      { "text": "Neće se kompilirati - sum() ne radi s paralelnim streamom", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu s null vrijednostima?",
    "codeSnippet": "record User(String name) {}\n\nList<User> users = List.of(\n    new User(\"Ana\"),\n    new User(null),\n    new User(\"Marko\")\n);\n\nList<String> names = users.stream()\n    .map(User::name)\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());\n\nSystem.out.println(names);",
    "explanation": "Kod će baciti NullPointerException na drugom map-u! User::name vraća null za drugog usera, a String::toUpperCase ne može raditi s null-om. Rješenje: filtrirati null-ove s filter(Objects::nonNull) prije toUpperCase: users.stream().map(User::name).filter(Objects::nonNull).map(String::toUpperCase).collect(...). Ili koristiti Optional: map(name -> Optional.ofNullable(name)).flatMap(Optional::stream). Zanemarivanje null-a je česta greška s lambda izrazima!",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca NullPointerException - treba filter(Objects::nonNull) prije toUpperCase", "isCorrect": true },
      { "text": "Ispisuje [ANA, null, MARKO]", "isCorrect": false },
      { "text": "Neće se kompilirati - null nije dozvoljen u List.of()", "isCorrect": false },
      { "text": "Ispisuje [ANA, MARKO] - automatski preskače null", "isCorrect": false },
      { "text": "Kompilira se i radi ispravno", "isCorrect": false },
      { "text": "Neće se kompilirati - User::name ne radi s records", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedećih konstruktora references?",
    "codeSnippet": "List<String> names = List.of(\"Ana\", \"Marko\", \"Petra\");\n\n// Pristup 1 - lambda\nList<User> users1 = names.stream()\n    .map(name -> new User(name))\n    .collect(Collectors.toList());\n\n// Pristup 2 - constructor reference\nList<User> users2 = names.stream()\n    .map(User::new)\n    .collect(Collectors.toList());",
    "explanation": "Oba pristupa rade isto - kreiraju User objekte iz imena - ali Pristup 2 (User::new) je BOLJI i preferirani. User::new je constructor reference - kraći i čitljiviji način pisanja lambda izraza name -> new User(name). Constructor reference poziva konstruktor koji prima jedan parametar (String). Best practice: preferirajte constructor references gdje god je to moguće jer kod jasnije pokazuje namjeru (kreira objekte).",
    "difficulty": "HARD",
    "options": [
      { "text": "Nema razlike - Pristup 2 (User::new) je preferirani jer je kraći i čitljiviji", "isCorrect": true },
      { "text": "Pristup 1 je brži od Pristupa 2", "isCorrect": false },
      { "text": "Pristup 2 ne radi s custom konstruktorima", "isCorrect": false },
      { "text": "Pristup 1 kreira prazne objekte, Pristup 2 s parametrima", "isCorrect": false },
      { "text": "Pristup 2 ne radi ako User ima više konstruktora", "isCorrect": false },
      { "text": "Pristup 1 je jedini ispravan način", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s anyMatch() operacijom?",
    "codeSnippet": "List<String> words = List.of(\"Java\", \"Python\", \"C++\", \"JavaScript\", \"Ruby\");\n\nboolean hasLongWord = words.stream()\n    .peek(w -> System.out.println(\"Checking: \" + w))\n    .anyMatch(w -> w.length() > 8);\n\nSystem.out.println(hasLongWord);",
    "explanation": "Ispisat će: 'Checking: Java', 'Checking: Python', 'Checking: C++', 'Checking: JavaScript', 'true'. anyMatch() je short-circuiting operacija - ZAUSTAVLJA se čim nađe prvi match! Provjerava Java (4), Python (6), C++ (3), JavaScript (10) - tu se zaustavlja jer 10>8. anyMatch() vraća true jer je pronašao riječ dužu od 8. peek() omogućava debug - ispisuje svaki element koji se procesira. Ne procesira Ruby jer se stream već zaustavio.",
    "difficulty": "HARD",
    "options": [
      { "text": "true - anyMatch() je short-circuiting, zaustavlja se na prvom matchu (JavaScript)", "isCorrect": true },
      { "text": "false - nijedna riječ nije duža od 8", "isCorrect": false },
      { "text": "Neće se kompilirati - anyMatch() ne postoji", "isCorrect": false },
      { "text": "true - provjerava sve riječi", "isCorrect": false },
      { "text": "Baca IllegalStateException", "isCorrect": false },
      { "text": "false - peek() mijenja logiku", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje moderne Java značajke (Java 16+) možemo kraće napisati collect(Collectors.toList())?",
    "codeSnippet": "List<String> names = List.of(\"Ana\", \"Marko\", \"Petra\");\n\n// Stari način\nList<String> upper1 = names.stream()\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());\n\n// Novi način (Java 16+)",
    "explanation": "U Java 16+ koristimo toList() umjesto collect(Collectors.toList()): names.stream().map(String::toUpperCase).toList(). toList() je kraća i čitljivija sintaksa. VAŽNA razlika: toList() vraća IMMUTABLE listu (ne može se mijenjati), dok Collectors.toList() vraća mutable ArrayList. Best practice: koristite toList() u Java 16+ osim ako eksplicitno trebate mutable listu. Slično postoje: toSet(), toMap() za Java 16+.",
    "difficulty": "HARD",
    "options": [
      { "text": ".toList() - kraća sintaksa u Java 16+, vraća immutable listu", "isCorrect": true },
      { "text": ".asList() - alternativa za Collectors.toList()", "isCorrect": false },
      { "text": ".collectList() - nova metoda", "isCorrect": false },
      { "text": ".toCollection() - kraći način", "isCorrect": false },
      { "text": "Nema kraćeg načina", "isCorrect": false },
      { "text": ".list() - Java 16 sintaksa", "isCorrect": false }
    ]
  }
]
}
