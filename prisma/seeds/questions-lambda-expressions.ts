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
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je KLJUČNA razlika između lambda izraza i anonimne klase u kontekstu 'this' reference?",
    "explanation": "U lambda izrazu, 'this' referira na ENCLOSING klasu (klasu koja sadrži lambdu) - lambda NEMA vlastiti 'this'! U anonimnoj klasi, 'this' referira na SAMU anonimnu klasu. Primjer: class Outer { void method() { Runnable lambda = () -> System.out.println(this.getClass()); // ispisuje 'Outer', Runnable anon = new Runnable() { public void run() { System.out.println(this.getClass()); } }; // ispisuje 'Outer$1' } }. Lambda je CLOSURE preko enclosing scope-a, ne samostalni objekt! Ovo je VAŽNO za event handlere i callback-e gdje želite pristupiti outer klasi.",
    "difficulty": "HARD",
    "options": [
      { "text": "U lambdi 'this' referira na enclosing klasu, u anonimnoj na samu instancu", "isCorrect": true },
      { "text": "U lambdi 'this' referira na lambda objekt, u anonimnoj na enclosing klasu", "isCorrect": false },
      { "text": "Nema razlike - 'this' uvijek referira na trenutni objekt", "isCorrect": false },
      { "text": "Lambda ne može koristiti 'this' keyword, samo anonimna klasa može", "isCorrect": false },
      { "text": "'this' u lambdi referira na Thread koji izvršava lambdu", "isCorrect": false },
      { "text": "Lambda i anonimna klasa imaju svoj 'this' koji pokazuje na istu referencu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s lambda izrazom i checked exception kompilirati?",
    "codeSnippet": "import java.io.*;\nimport java.util.*;\n\npublic class LambdaExceptionTest {\n    public static void main(String[] args) {\n        List<String> files = List.of(\"file1.txt\", \"file2.txt\");\n        \n        files.forEach(file -> {\n            BufferedReader reader = new BufferedReader(new FileReader(file));\n            String line = reader.readLine();\n            System.out.println(line);\n            reader.close();\n        });\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Problem: FileReader i readLine() bacaju IOException (CHECKED exception), ali forEach prima Consumer<T> čija accept() metoda NE deklarira throws! Lambda mora biti kompatibilna s funkcionalnim sučeljem - ne možete bacati checked exception ako sučelje to ne dopušta. Kompajler greška: 'unhandled exception: java.io.IOException'. Rješenja: (1) wrap u try-catch UNUTAR lambde, (2) wrap u unchecked exception (RuntimeException), (3) koristiti custom funkcionalno sučelje s throws, (4) koristiti method reference s checked exception wrapper metodom. Lambda MOŽE bacati unchecked exceptions bez problema!",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - lambda ne može bacati checked exception koju Consumer ne deklarira", "isCorrect": true },
      { "text": "Kompilira se - forEach automatski hendla IOException", "isCorrect": false },
      { "text": "Kompilira se - lambda izrazi mogu bacati bilo koju exception", "isCorrect": false },
      { "text": "Neće se kompilirati - BufferedReader ne može se koristiti u lambdi", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u s UncheckedIOException", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje varijable IZ ENCLOSING SCOPE-a lambda izraz MOŽE koristiti? (Odaberite sve točne)",
    "explanation": "Lambda može koristiti: (1) Final varijable - eksplicitno deklarirane kao final. (2) Effectively final varijable - varijable koje se NE mijenjaju nakon inicijalizacije iako nisu deklarirane final. (3) Instance varijable (fields) - lambda može čitati I MIJENJATI polja enclosing klase! (4) Static varijable - lambda može pristupiti i mijenjati static polja. NE MOŽE: lokalne varijable koje se mijenjaju nakon što lambda koristi - kompajler detektira da nisu effectively final i javlja grešku. Lambda COPY-a vrijednosti lokalnih varijabli (captured variables mora biti final/effectively final), ali ima REFERENCE na instance/static varijable!",
    "difficulty": "HARD",
    "options": [
      { "text": "Final varijable", "isCorrect": true },
      { "text": "Effectively final varijable (ne mijenjaju se nakon inicijalizacije)", "isCorrect": true },
      { "text": "Instance varijable (fields) klase", "isCorrect": true },
      { "text": "Static varijable", "isCorrect": true },
      { "text": "Lokalne varijable koje se mijenjaju nakon što lambda koristi", "isCorrect": false },
      { "text": "Parametri metoda koji se reassign-aju", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što se događa kada lambda izraz pokušava mutirati captured effectively final varijablu?",
    "explanation": "Lambda NE MOŽE mutirati lokalne effectively final varijable iz enclosing scope-a! Pokušaj promjene uzrokuje compile error: 'local variables referenced from a lambda expression must be final or effectively final'. Lambda MOŽE: (1) čitati effectively final lokalne varijable, (2) MIJENJATI instance/static varijable enclosing klase, (3) mijenjati SADRŽAJ objekta (list.add()) ako je referenca effectively final. NE MOŽE: mijenjati VRIJEDNOST lokalne varijable (counter++, value = newValue). Razlog: lambda može biti izvršena kasnije/drugdje pa kopira vrijednosti lokalnih varijabli - ne može trackati promjene!",
    "difficulty": "HARD",
    "options": [
      { "text": "Compile error - lokalne varijable moraju biti final ili effectively final", "isCorrect": true },
      { "text": "Radi OK - lambda može mijenjati sve captured varijable", "isCorrect": false },
      { "text": "Runtime exception - IllegalStateException pri pokušaju promjene", "isCorrect": false },
      { "text": "Promjena se ignorira - lambda radi s kopijom varijable", "isCorrect": false },
      { "text": "Compile warning ali kod radi", "isCorrect": false },
      { "text": "Automatski konvertira varijablu u AtomicInteger", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s method reference i instance metodom?",
    "codeSnippet": "class Printer {\n    private String prefix;\n    \n    Printer(String prefix) {\n        this.prefix = prefix;\n    }\n    \n    public void print(String message) {\n        System.out.println(prefix + \": \" + message);\n    }\n}\n\npublic class MethodRefTest {\n    public static void main(String[] args) {\n        List<String> messages = List.of(\"Hello\", \"World\");\n        Printer printer = new Printer(\"LOG\");\n        \n        messages.forEach(printer::print);\n        \n        printer = new Printer(\"ERROR\");\n        \n        messages.forEach(printer::print);\n    }\n}",
    "explanation": "Ispisat će: 'LOG: Hello', 'LOG: World', 'ERROR: Hello', 'ERROR: World'. Method reference printer::print KREIRA novi lambda izraz pri SVAKOM pozivu forEach! printer::print je ekvivalentno (msg) -> printer.print(msg) - lambda CAPTURES trenutnu referencu printer. Prvi forEach koristi printer s prefix='LOG', drugi forEach koristi NOVU printer instancu s prefix='ERROR'. Method reference nije 'compile-time binding' - vrednuje se u RUNTIME-u! Ako bi printer bio final i ne bi se mijenjao, oboje bi ispisalo isto. KLJUČNO: method reference captures REFERENCE, ne vrijednost u trenutku kreiranja!",
    "difficulty": "HARD",
    "options": [
      { "text": "LOG: Hello, LOG: World, ERROR: Hello, ERROR: World", "isCorrect": true },
      { "text": "LOG: Hello, LOG: World, LOG: Hello, LOG: World", "isCorrect": false },
      { "text": "ERROR: Hello, ERROR: World, ERROR: Hello, ERROR: World", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može se reassign printer", "isCorrect": false },
      { "text": "Baca NullPointerException na drugom forEach", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih su VALIDNE metode za kreiranje method reference? (Odaberite sve točne)",
    "explanation": "VALIDNI method references: (1) String::toUpperCase - instance metoda na tipu (bounded). (2) System.out::println - instance metoda na konkretnom objektu (unbounded). (3) Integer::parseInt - statička metoda. (4) ArrayList::new - constructor reference. (5) String::length - instance metoda koja vraća int, koristi se kao Function<String, Integer>. NEVALIDAN: Integer::new(String) - ne možete specificirati PARAMETRE u constructor reference! Sintaksa je Class::new, kompajler inferira parametre iz konteksta (funkcionalno sučelje). Integer::new može biti IntFunction<Integer> (prima int) ili Function<String, Integer> (prima String) ovisno o kontekstu!",
    "difficulty": "HARD",
    "options": [
      { "text": "String::toUpperCase", "isCorrect": true },
      { "text": "System.out::println", "isCorrect": true },
      { "text": "Integer::parseInt", "isCorrect": true },
      { "text": "ArrayList::new", "isCorrect": true },
      { "text": "String::length", "isCorrect": true },
      { "text": "Integer::new(String)", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između list.forEach() i list.stream().forEach()?",
    "explanation": "list.forEach() je DIREKTNA iteracija preko Collection-a - DETERMINISTIČKI redoslijed (insertion order za List). list.stream().forEach() također iterira redoslijedom ali može biti NEPREDVIDIV s parallel stream-om! KLJUČNA razlika: (1) forEach je na Collection, stream().forEach() je terminal operacija Stream-a. (2) list.stream().parallel().forEach() može izvršavati PARALELNO pa redoslijed nije garantiran! (3) stream().forEach() može biti LAZY (nakon intermediate operacija), Collection.forEach() je EAGER. (4) Za GARANTIRAN redoslijed s parallel stream koristiti forEachOrdered()! Collection.forEach() = jednostavno i brzo, Stream.forEach() = fleksibilno ali kompleksnije.",
    "difficulty": "HARD",
    "options": [
      { "text": "forEach je direktna iteracija s garantiranim redom, stream().forEach() može biti parallel", "isCorrect": true },
      { "text": "Nema razlike - identične su operacije", "isCorrect": false },
      { "text": "list.forEach() je deprecated, treba koristiti stream().forEach()", "isCorrect": false },
      { "text": "stream().forEach() je brži od list.forEach()", "isCorrect": false },
      { "text": "list.forEach() ne može primati method references", "isCorrect": false },
      { "text": "stream().forEach() automatski radi paralelno, forEach() ne", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite SVE greške u sljedećem kodu s lambda izrazima i variable scope:",
    "codeSnippet": "public class ScopeTest {\n    private int instanceVar = 10;\n    private static int staticVar = 20;\n    \n    public void process() {\n        int localVar = 30;\n        \n        Runnable r1 = () -> {\n            System.out.println(instanceVar);\n            instanceVar++;\n        };\n        \n        Runnable r2 = () -> {\n            System.out.println(staticVar);\n            staticVar++;\n        };\n        \n        Runnable r3 = () -> {\n            System.out.println(localVar);\n            localVar++;\n        };\n        \n        r1.run();\n        r2.run();\n        r3.run();\n    }\n}",
    "explanation": "Kod ima 1 GREŠKU: r3 lambda pokušava MIJENJATI localVar što nije dozvoljeno! localVar mora biti effectively final. Kompajler greška: 'local variables referenced from a lambda expression must be final or effectively final'. r1 i r2 su ISPRAVNI: (1) instanceVar je INSTANCE polje - lambda može čitati I MIJENJATI instance varijable! (2) staticVar je STATIC polje - također može se mijenjati! Lambda ima COPY lokalnih varijabli (pa moraju biti final) ali ima REFERENCE na instance/static polja (pa ih može mijenjati). localVar++ čini localVar NON-effectively-final pa je greška!",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - localVar++ krši effectively final pravilo", "isCorrect": true },
      { "text": "3 greške - lambda ne može mijenjati nijednu varijablu", "isCorrect": false },
      { "text": "2 greške - može mijenjati samo staticVar", "isCorrect": false },
      { "text": "0 grešaka - sve je ispravno", "isCorrect": false },
      { "text": "2 greške - ne može mijenjati instanceVar ni staticVar", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kada se lambda izraz EVALUIRA - u trenutku kreiranja ili u trenutku poziva?",
    "explanation": "Lambda se evaluira (izvršava) u trenutku POZIVA, NE kreiranja! Lambda je ODGOĐENA operacija - kreira se 'recept' za kasnije izvršavanje. Primjer: Supplier<Integer> random = () -> new Random().nextInt(); - svaki poziv random.get() generira NOVI broj, ne isti! Lambda CAPTURES varijable u trenutku kreiranja (snapshot vrijednosti/referenci), ali SE IZVRŠAVA kasnije. Ovo omogućava lazy evaluation, callback-e, event handling. VAŽNO: intermediate Stream operacije su LAZY (filter, map) - kreiraju pipeline ali se ne izvršavaju dok ne naiđe terminal operacija (forEach, collect)!",
    "difficulty": "HARD",
    "options": [
      { "text": "Evaluira se u trenutku poziva (lazy evaluation), ne kreiranja", "isCorrect": true },
      { "text": "Evaluira se u trenutku kreiranja i cachira rezultat", "isCorrect": false },
      { "text": "Evaluira se compile-time za optimizaciju", "isCorrect": false },
      { "text": "Ovisi o tipu funkcionalnog sučelja", "isCorrect": false },
      { "text": "Lambda s return statement se evaluira odmah, bez return kasnije", "isCorrect": false },
      { "text": "Evaluira se pri kreiranju ali se ponovo izvršava pri svakom pozivu", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koja funkcionalna sučelja iz java.util.function primaju DVA ARGUMENTA? (Odaberite sve točna)",
    "explanation": "DVA argumenta primaju: (1) BiFunction<T, U, R> - prima T i U, vraća R. (2) BiPredicate<T, U> - prima T i U, vraća boolean. (3) BiConsumer<T, U> - prima T i U, ne vraća ništa (void). JEDAN argument: Predicate<T> - prima T, vraća boolean. Function<T, R> - prima T, vraća R. Consumer<T> - prima T, void. Supplier<T> - NE prima ništa, vraća T! Postoje i specijalizirane verzije: ToIntBiFunction<T, U>, ObjIntConsumer<T>, etc. 'Bi' prefix označava DVA argumenta, 'Obj' prefix označava Object + primitiv.",
    "difficulty": "HARD",
    "options": [
      { "text": "BiFunction<T, U, R>", "isCorrect": true },
      { "text": "BiPredicate<T, U>", "isCorrect": true },
      { "text": "BiConsumer<T, U>", "isCorrect": true },
      { "text": "Predicate<T>", "isCorrect": false },
      { "text": "Function<T, R>", "isCorrect": false },
      { "text": "Supplier<T>", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s lazy evaluation i peek() operacijom?",
    "codeSnippet": "public class LazyEvalTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(1, 2, 3, 4, 5);\n        \n        Stream<Integer> stream = numbers.stream()\n            .filter(n -> {\n                System.out.println(\"Filter: \" + n);\n                return n % 2 == 0;\n            })\n            .peek(n -> System.out.println(\"Peek: \" + n))\n            .map(n -> {\n                System.out.println(\"Map: \" + n);\n                return n * 10;\n            });\n        \n        System.out.println(\"Stream created\");\n        \n        List<Integer> result = stream.limit(1).toList();\n        \n        System.out.println(\"Result: \" + result);\n    }\n}",
    "explanation": "Ispisat će: 'Stream created' (PRVO!), zatim 'Filter: 1', 'Filter: 2', 'Peek: 2', 'Map: 2', 'Result: [20]'. LAZY EVALUATION: filter, peek, map NE izvršavaju se dok se stream ne kreira - samo GRADE pipeline! 'Stream created' se ispisuje PRIJE bilo koje obrade. limit(1) + toList() su TERMINAL operacije koje POKREĆU izvršavanje. Short-circuit: limit(1) znači da se obrađuju elementi DOK ne dobijemo 1 rezultat! Filter 1 (fail, odd), Filter 2 (pass, even), Peek 2, Map 2 → STOP jer imamo 1 element! 3,4,5 se NE obrađuju jer limit(1) zaustavlja stream! peek() se izvršava samo za elemente koji PROLAZE kroz filter!",
    "difficulty": "HARD",
    "options": [
      { "text": "Stream created, Filter 1-2, Peek 2, Map 2, Result: [20] - lazy + short-circuit", "isCorrect": true },
      { "text": "Svi Filter/Peek/Map prvo, pa Stream created, pa Result", "isCorrect": false },
      { "text": "Stream created, sve Filter 1-5, Peek za sve parne, Map, Result", "isCorrect": false },
      { "text": "Result prvo jer je terminal operacija, pa se izvršava stream", "isCorrect": false },
      { "text": "peek() se ne izvršava jer je lazy operacija", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto je sljedeći lambda izraz s side effect LOŠA praksa?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5);\nint sum = 0;\n\nnumbers.stream()\n    .forEach(n -> sum += n);",
    "explanation": "Ovo je LOŠA praksa iz VIŠE razloga: (1) COMPILE ERROR! sum mora biti effectively final, ali sum += n ga mijenja. Kod se NEĆE kompilirati! (2) Čak i da se kompilira (npr. s AtomicInteger), SIDE EFFECTS u lambdi su opasni s PARALELNIM streamovima - race condition! Više threadova može mijenjati sum istovremeno bez sinkronizacije. (3) Lambda izrazi bi trebali biti PURE FUNCTIONS bez side effects. PRAVILNO rješenje: int sum = numbers.stream().reduce(0, Integer::sum) ili mapToInt().sum(). Stream operacije dizajnirane za DEKLARATIVAN stil bez mutiranja vanjskog stanja!",
    "difficulty": "HARD",
    "options": [
      { "text": "Compile error (effectively final) + race condition s parallel stream + anti-pattern", "isCorrect": true },
      { "text": "Samo malo sporije nego reduce() ali funkcionalno identično", "isCorrect": false },
      { "text": "forEach() ne podržava matematičke operacije", "isCorrect": false },
      { "text": "sum nije thread-safe ali nije compile error", "isCorrect": false },
      { "text": "Nema problema - ovo je standardni način računanja suma", "isCorrect": false },
      { "text": "forEach() ne može pristupiti vanjskim varijablama", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su razlike između lambda izraza i anonimne klase? (Odaberite sve točne)",
    "explanation": "RAZLIKE: (1) Lambda nema vlastiti 'this' (koristi enclosing), anonimna ima svoj 'this'. (2) Lambda može implementirati SAMO funkcionalna sučelja (jedno metoda), anonimna može bilo koji interface/klasu. (3) Lambda se kompilira u invokedynamic (bytecode optimizacija), anonimna u zasebnu .class datoteku. (4) Lambda ne može imati instance varijable/fields, anonimna može. (5) Lambda ne može overloadati metode, anonimna može imati više metoda. Lambda je LAKŠA i EFIKASNIJA za funkcionalna sučelja, anonimna je FLEKSIBILNIJA za complex behaviour. Lambda je NAJBOLJI izbor za simple callbacks!",
    "difficulty": "HARD",
    "options": [
      { "text": "Lambda nema vlastiti 'this', anonimna ima", "isCorrect": true },
      { "text": "Lambda samo za funkcionalna sučelja, anonimna za bilo što", "isCorrect": true },
      { "text": "Lambda kompilira u invokedynamic, anonimna u .class file", "isCorrect": true },
      { "text": "Lambda ne može imati fields, anonimna može", "isCorrect": true },
      { "text": "Lambda je brža u runtime-u od anonimne klase", "isCorrect": false },
      { "text": "Anonimna klasa ne može pristupiti enclosing scope varijablama", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Comparator.thenComparing i method references?",
    "codeSnippet": "record Person(String name, Integer age, String city) {}\n\npublic class ComparatorChainTest {\n    public static void main(String[] args) {\n        List<Person> people = List.of(\n            new Person(\"Ana\", 25, \"Zagreb\"),\n            new Person(\"Ana\", 25, \"Split\"),\n            new Person(\"Ana\", 30, \"Zagreb\"),\n            new Person(\"Marko\", 25, \"Zagreb\")\n        );\n        \n        people.stream()\n              .sorted(Comparator.comparing(Person::name)\n                                .thenComparing(Person::age)\n                                .thenComparing(Person::city))\n              .forEach(p -> System.out.println(p.name() + \" \" + \n                                               p.age() + \" \" + \n                                               p.city()));\n    }\n}",
    "explanation": "Ispisat će: 'Ana 25 Split', 'Ana 25 Zagreb', 'Ana 30 Zagreb', 'Marko 25 Zagreb'. Višekriterijsko sortiranje: (1) Prvo po name (Ana < Marko abecedno). (2) Unutar istih imena po age (25 < 30). (3) Unutar istih imena i godina po city (Split < Zagreb abecedno). Method reference Person::name je ekvivalentan lambdi p -> p.name(). Comparator.comparing() KREIRA Comparator, thenComparing() DODAJE dodatne kriterije. Ana(25, Split) dolazi prije Ana(25, Zagreb) jer je 'Split' < 'Zagreb' leksikografski. Chaining omogućava ČITLJIVO višestruko sortiranje!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ana 25 Split, Ana 25 Zagreb, Ana 30 Zagreb, Marko 25 Zagreb", "isCorrect": true },
      { "text": "Ana 25 Zagreb, Ana 25 Split, Ana 30 Zagreb, Marko 25 Zagreb", "isCorrect": false },
      { "text": "Marko 25 Zagreb, Ana 25 Split, Ana 25 Zagreb, Ana 30 Zagreb", "isCorrect": false },
      { "text": "Neće se kompilirati - thenComparing ne može više puta", "isCorrect": false },
      { "text": "Ana 30 Zagreb, Ana 25 Split, Ana 25 Zagreb, Marko 25 Zagreb", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'target typing' u kontekstu lambda izraza?",
    "explanation": "Target typing znači da TIP lambda izraza se ZAKLJUČUJE iz KONTEKSTA (gdje se lambda koristi), ne iz lambde same! Lambda () -> 42 može biti Supplier<Integer>, Callable<Integer>, IntSupplier - ovisno gdje se koristi. Kompajler gleda funkcionalno sučelje na koje se lambda assigna ili prima kao parametar. Primjer: Supplier<String> s = () -> \"Java\" - kompajler zna da lambda mora vratiti String jer Supplier<String> zahtijeva String. BEZ target typing, lambda bi bila AMBIGUOUS! Target typing omogućava FLEKSIBILNOST - ista lambda može biti različitih tipova. Type inference + target typing = moć lambda izraza!",
    "difficulty": "HARD",
    "options": [
      { "text": "Tip lambde se zaključuje iz konteksta (funkcionalno sučelje), ne iz lambde same", "isCorrect": true },
      { "text": "Lambda automatski targetira najbliži tip u scope-u", "isCorrect": false },
      { "text": "Kompajler pretvara lambdu u target bytecode optimizaciju", "isCorrect": false },
      { "text": "Target typing je deprecated način deklariranja lambda tipova", "isCorrect": false },
      { "text": "Lambda eksplicitno deklarira svoj target tip s :: operatorom", "isCorrect": false },
      { "text": "Type inference za parametre lambde, ne za return type", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s parallel streamom i mutable reduction?",
    "codeSnippet": "public class MutableReductionTest {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"Java\", \"Lambda\", \"Stream\", \"API\");\n        \n        List<String> result1 = new ArrayList<>();\n        words.stream()\n             .forEach(w -> result1.add(w.toUpperCase()));\n        \n        List<String> result2 = new ArrayList<>();\n        words.parallelStream()\n             .forEach(w -> result2.add(w.toUpperCase()));\n        \n        List<String> result3 = words.parallelStream()\n             .map(String::toUpperCase)\n             .collect(Collectors.toCollection(ArrayList::new));\n        \n        System.out.println(result1.size() + \" \" + \n                          result2.size() + \" \" + \n                          result3.size());\n    }\n}",
    "explanation": "result1 je OK (ali loša praksa) - sequential stream s forEach, result1 se puni pravilno. result2 ima RACE CONDITION! parallelStream().forEach() izvršava se na više threadova, ArrayList NIJE thread-safe! Može rezultirati: (1) ConcurrentModificationException, (2) izgubljeni elementi (size < 4), (3) ArrayIndexOutOfBoundsException. result3 je ISPRAVAN način - collect(Collectors.toCollection()) je THREAD-SAFE mutable reduction! Ispisat će '4 ?' ?' gdje ? je nepredvidiv (vjerojatno < 4 ili exception). LEKCIJA: NE mutirati vanjske kolekcije s parallelStream, koristiti COLLECTORS!",
    "difficulty": "HARD",
    "options": [
      { "text": "result2 ima race condition - ArrayList nije thread-safe s parallelStream", "isCorrect": true },
      { "text": "0 grešaka - svi pristupi su thread-safe", "isCorrect": false },
      { "text": "result1 i result2 su problematični, result3 je OK", "isCorrect": false },
      { "text": "Sve tri metode su OK - forEach automatski sinkronizira", "isCorrect": false },
      { "text": "Neće se kompilirati - parallelStream() ne može s ArrayList", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Kada biste trebali koristiti PARALELNI stream? (Odaberite sve točne uvjete)",
    "explanation": "Koristite parallel stream kada: (1) Imate VELIKU količinu podataka (>10,000 elemenata) - mali skup ne opravdava overhead. (2) Operacije su RAČUNSKI INTENZIVNE - paralelizam pomaže kod CPU-bound taskova, ne I/O. (3) Operacije su STATELESS i BEZ SIDE EFFECTS - pure functions bez mutiranja stanja. (4) Redoslijed NIJE BITAN ili koristite forEachOrdered() - parallel može promijeniti redoslijed. NE KORISTITE: mali dataset (<1000 elemenata), I/O operacije (blocking), operacije koje zahtijevaju order, side effects na shared state. UVIJEK testirajte performance - parallel može biti SPORIJI ako je overhead veći od koristi!",
    "difficulty": "HARD",
    "options": [
      { "text": "Velika količina podataka (>10,000 elemenata)", "isCorrect": true },
      { "text": "Računski intenzivne operacije (CPU-bound)", "isCorrect": true },
      { "text": "Stateless operacije bez side effects", "isCorrect": true },
      { "text": "Redoslijed nije bitan ili koristite forEachOrdered()", "isCorrect": true },
      { "text": "Uvijek kada koristite Stream API - brže je", "isCorrect": false },
      { "text": "Kada radite s IO operacijama (čitanje fileova)", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između map() i flatMap() operacija?",
    "explanation": "map() radi 1:1 transformaciju - svaki element pretvara u JEDAN novi element. map(s -> s.toUpperCase()) pretvara Stream<String> u Stream<String>. flatMap() radi 1:N transformaciju - svaki element pretvara u STREAM novih elemenata PA IH SPLJOŠTA (flatten) u jedan stream. flatMap(s -> Arrays.stream(s.split(' '))) pretvara Stream<String> u Stream<String> gdje se svaka rečenica splituje u riječi. KLJUČNO: map() - Stream<T> → Stream<R>, flatMap() - Stream<T> → Stream<Stream<R>> → Stream<R> (flatten!). flatMap() za nested kolekcije, map() za simple transformacije!",
    "difficulty": "HARD",
    "options": [
      { "text": "map() je 1:1 transformacija, flatMap() je 1:N sa spljoštavanjem nested stream-ova", "isCorrect": true },
      { "text": "map() radi s primitivima, flatMap() s objektima", "isCorrect": false },
      { "text": "flatMap() je sporija verzija map() za velike kolekcije", "isCorrect": false },
      { "text": "map() kreira novu listu, flatMap() modificira originalnu", "isCorrect": false },
      { "text": "Nema razlike - to su sinonimi", "isCorrect": false },
      { "text": "flatMap() ne može raditi s null vrijednostima za razliku od map()", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collectors.groupingBy i downstream collector?",
    "codeSnippet": "record Student(String major, int grade) {}\n\npublic class GroupingTest {\n    public static void main(String[] args) {\n        List<Student> students = List.of(\n            new Student(\"CS\", 85),\n            new Student(\"CS\", 92),\n            new Student(\"Math\", 78),\n            new Student(\"Math\", 88),\n            new Student(\"CS\", 90)\n        );\n        \n        Map<String, Double> avgByMajor = students.stream()\n            .collect(Collectors.groupingBy(\n                Student::major,\n                Collectors.averagingInt(Student::grade)\n            ));\n        \n        avgByMajor.forEach((major, avg) -> \n            System.out.println(major + \": \" + avg));\n    }\n}",
    "explanation": "Ispisat će: 'CS: 89.0' i 'Math: 83.0' (ili obrnuto - Map redoslijed nije garantiran). groupingBy(Student::major) grupira studente po major-u. Collectors.averagingInt(Student::grade) je DOWNSTREAM COLLECTOR koji računa PROSJEK ocjena za svaku grupu! CS studenti: (85+92+90)/3 = 89.0, Math studenti: (78+88)/2 = 83.0. groupingBy bez downstream collectora vraća Map<String, List<Student>>, s averagingInt vraća Map<String, Double>! Downstream collector TRANSFORMIRA vrijednosti grupa. Drugi primjeri: counting() (Map<K, Long>), mapping() (Map<K, List<R>>), summingInt() (Map<K, Integer>).",
    "difficulty": "HARD",
    "options": [
      { "text": "CS: 89.0, Math: 83.0 - groupingBy s averagingInt downstream collector", "isCorrect": true },
      { "text": "CS: [85, 92, 90], Math: [78, 88] - vraća liste", "isCorrect": false },
      { "text": "Neće se kompilirati - averagingInt ne može biti downstream", "isCorrect": false },
      { "text": "CS: 267, Math: 166 - vraća sumu umjesto prosjeka", "isCorrect": false },
      { "text": "Baca ClassCastException - incompatible types", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto je Supplier<T> funkcionalno sučelje korisno za LAZY inicijalizaciju?",
    "explanation": "Supplier<T> omogućava LAZY inicijalizaciju jer get() metoda se poziva KAD JE POTREBNO, ne odmah! Supplier ne prima argumente (Supplier<T> { T get(); }) ali VRAĆA vrijednost. Primjer: Supplier<ExpensiveObject> supplier = () -> new ExpensiveObject() - objekt se NE kreira dok se ne pozove supplier.get()! Koristi se za: (1) Lazy initialization - odgođeno kreiranje skupih objekata, (2) Optional.orElseGet(Supplier) - lazy default vrijednost, (3) Logger API - lazy message evaluation. Za razliku od direct constructora (ExpensiveObject obj = new ExpensiveObject() - eager), Supplier omogućava kontrolu KADA će se kreirati!",
    "difficulty": "HARD",
    "options": [
      { "text": "get() se poziva kad je potrebno, ne odmah - odgođena evaluacija", "isCorrect": true },
      { "text": "Supplier automatski cachira rezultat za performance", "isCorrect": false },
      { "text": "Supplier kreira singleton instance koje se dijele", "isCorrect": false },
      { "text": "get() metoda je thread-safe za lazy initialization", "isCorrect": false },
      { "text": "Supplier prima argumente za lazy initialization parametara", "isCorrect": false },
      { "text": "Nema razloga - direct constructor je uvijek bolji", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Stream operacije su SHORT-CIRCUITING? (Odaberite sve točne)",
    "explanation": "Short-circuiting operacije ZAUSTAVLJAJU procesiranje čim dobiju rezultat: (1) anyMatch() - vraća true čim nađe jedan element koji zadovoljava, (2) allMatch() - vraća false čim nađe jedan koji NE zadovoljava, (3) noneMatch() - vraća false čim nađe jedan koji zadovoljava, (4) findFirst() - vraća prvi element i zaustavlja se, (5) findAny() - vraća bilo koji element (optimiziran za parallel), (6) limit(n) - uzima samo n elemenata. NE short-circuit: forEach() (procesira sve), count() (broji sve), reduce() (kombinira sve). Short-circuit je BITAN za infinite stream-e i performance - ne procesira nepotrebno!",
    "difficulty": "HARD",
    "options": [
      { "text": "anyMatch()", "isCorrect": true },
      { "text": "allMatch()", "isCorrect": true },
      { "text": "findFirst()", "isCorrect": true },
      { "text": "limit(n)", "isCorrect": true },
      { "text": "forEach()", "isCorrect": false },
      { "text": "count()", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite problem u sljedećem kodu s constructor reference:",
    "codeSnippet": "class Box<T> {\n    private T content;\n    \n    public Box(T content) {\n        this.content = content;\n    }\n    \n    public T getContent() {\n        return content;\n    }\n}\n\npublic class ConstructorRefTest {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"Java\", \"Lambda\", \"Stream\");\n        \n        List<Box<String>> boxes = words.stream()\n            .map(Box::new)\n            .toList();\n        \n        boxes.forEach(box -> System.out.println(box.getContent()));\n    }\n}",
    "explanation": "Kod se kompilira i radi ISPRAVNO! Ispisuje: 'Java', 'Lambda', 'Stream'. Box::new je GENERIC CONSTRUCTOR REFERENCE - kompajler inferira tip! map(Box::new) je ekvivalentno map(word -> new Box<>(word)). Type inference: words je Stream<String>, Box::new kreira Function<String, Box<String>>. Box<T> konstruktor prima T, kompajler zaključuje T=String iz konteksta! Generic constructor references SU PODRŽANI i rade savršeno s type inference. Diamond operator (<>) u new Box<>(word) NIJE potreban u constructor reference - :: operator handla type inference!",
    "difficulty": "HARD",
    "options": [
      { "text": "Nema problema - kompilira se i radi, generic constructor reference radi", "isCorrect": true },
      { "text": "Neće se kompilirati - ne može se koristiti generic constructor reference", "isCorrect": false },
      { "text": "Kompilira se ali Box<String> gubi tip kroz type erasure", "isCorrect": false },
      { "text": "Box::new ne može inferirati generički tip T", "isCorrect": false },
      { "text": "Mora biti Box<String>::new eksplicitno", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je razlika između Predicate.and() i Predicate.or() metoda?",
    "explanation": "Predicate.and() i or() omogućavaju KOMPOZICIJU predikata! and() vraća novi Predicate koji je TRUE samo ako su OBA predikata true (logical AND). or() vraća Predicate koji je TRUE ako je BAREM JEDAN true (logical OR). Primjer: Predicate<Integer> positive = n -> n > 0; Predicate<Integer> even = n -> n % 2 == 0; Predicate<Integer> positiveEven = positive.and(even); - TRUE samo za parne pozitivne brojeve! negate() vraća negaciju: positive.negate() za negativne brojeve. SHORT-CIRCUIT: and() ne evaluira drugi predikat ako je prvi false! or() ne evaluira drugi ako je prvi true! Kompozicija omogućava ČITLJIVE složene uvjete!",
    "difficulty": "HARD",
    "options": [
      { "text": "and() je logical AND (oba true), or() je logical OR (barem jedan true)", "isCorrect": true },
      { "text": "and() kombinira rezultate, or() bira prvi koji radi", "isCorrect": false },
      { "text": "Nema razlike - sinonimi su", "isCorrect": false },
      { "text": "and() radi s brojevima, or() sa stringovima", "isCorrect": false },
      { "text": "and() je brži od or() zbog optimizacije", "isCorrect": false },
      { "text": "or() može primiti više predikata, and() samo dva", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Optional.map() i flatMap()?",
    "codeSnippet": "class Address {\n    private String city;\n    \n    Address(String city) {\n        this.city = city;\n    }\n    \n    public Optional<String> getCity() {\n        return Optional.ofNullable(city);\n    }\n}\n\nclass Person {\n    private Address address;\n    \n    Person(Address address) {\n        this.address = address;\n    }\n    \n    public Optional<Address> getAddress() {\n        return Optional.ofNullable(address);\n    }\n}\n\npublic class OptionalMapTest {\n    public static void main(String[] args) {\n        Person person = new Person(new Address(\"Zagreb\"));\n        \n        Optional<Optional<String>> city1 = person.getAddress()\n            .map(Address::getCity);\n        \n        Optional<String> city2 = person.getAddress()\n            .flatMap(Address::getCity);\n        \n        System.out.println(city1.get().get());\n        System.out.println(city2.get());\n    }\n}",
    "explanation": "Ispisat će: 'Zagreb' i 'Zagreb'. KLJUČNA RAZLIKA: map() stvara Optional<Optional<String>> (nested Optional!) jer Address::getCity već vraća Optional. flatMap() SPLJOŠTAVA (flatten) nested Optional u Optional<String>! map() radi R -> Optional<R>, flatMap() radi R -> Optional<S> i flatten-a na Optional<S>. city1.get().get() potreban DVOSTRUKI get() (nested), city2.get() samo JEDAN get()! flatMap() je za CHAINING optional operacija - izbjegava Optional<Optional<...>>. map() za simple transformacije, flatMap() kad transformacija vraća Optional!",
    "difficulty": "HARD",
    "options": [
      { "text": "Zagreb i Zagreb - map stvara nested Optional, flatMap flatten-a", "isCorrect": true },
      { "text": "Neće se kompilirati - nested Optional nije dozvoljen", "isCorrect": false },
      { "text": "Baca NoSuchElementException na city1.get()", "isCorrect": false },
      { "text": "city1 i city2 su istog tipa", "isCorrect": false },
      { "text": "flatMap() ne može raditi s Optional<Address>", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su PREDNOSTI korištenja method references umjesto lambda izraza? (Odaberite sve točne)",
    "explanation": "Prednosti method references: (1) KRAĆI kod - String::toUpperCase umjesto s -> s.toUpperCase(). (2) ČITLJIVIJI - jasnije pokazuje namjeru. (3) MANJE grešaka - ne možete fulati parametre. (4) REUSABILITY - metoda već postoji, ne duplicirate logiku. (5) BOLJE za DEBUGGING - stack trace pokazuje pravu metodu, ne lambda$0. NIJE prednost: performance je ISTA - kompajler ih kompilira na isti način! Method reference NE znači automatski thread-safe ili type-safe više nego lambda. Koristite method reference KADA POSTOJI metoda koja radi TOČNO što treba - ne forsirajte ako lambda je čitljivija!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kraći i čitljiviji kod", "isCorrect": true },
      { "text": "Manje mogućnosti za greške", "isCorrect": true },
      { "text": "Reusability postojećih metoda", "isCorrect": true },
      { "text": "Bolji stack trace za debugging", "isCorrect": true },
      { "text": "Značajno brži u runtime-u od lambde", "isCorrect": false },
      { "text": "Automatski thread-safe za razliku od lambde", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto sljedeća lambda s recursion NE RADI?",
    "codeSnippet": "IntUnaryOperator factorial = n -> \n    n == 0 ? 1 : n * factorial.apply(n - 1);",
    "explanation": "Ovo NEĆE raditi jer 'factorial' još NIJE INICIJALIZIRANO u trenutku kada lambda pokušava pozvati factorial.apply()! Lambda se evaluira KASNIJE, ali REFERENCA factorial nije effectively final jer se tek assigna. Kompajler greška: 'variable factorial might not have been initialized'. Lambda pokušava CAPTURE varijablu koja se još postavlja! Rješenje: (1) koristiti ANONIMNU KLASU koja se može self-reference-ati, (2) napraviti zasebnu metodu, (3) koristiti Y-combinator pattern. Lambda NIJE dizajnirana za rekurziju - koristi LOOP ili zasebnu metodu!",
    "difficulty": "HARD",
    "options": [
      { "text": "factorial još nije inicijalizirano kad lambda pokušava capture-ati referencu", "isCorrect": true },
      { "text": "Lambda izrazi ne podržavaju rekurziju po dizajnu", "isCorrect": false },
      { "text": "IntUnaryOperator ne može biti rekurzivan tip", "isCorrect": false },
      { "text": "apply() metoda ne može pozivati samu sebe", "isCorrect": false },
      { "text": "Rekurzija uzrokuje StackOverflowError pri kreiranju lambde", "isCorrect": false },
      { "text": "factorial mora biti static za rekurziju", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collectors.partitioningBy?",
    "codeSnippet": "public class PartitionTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n        \n        Map<Boolean, List<Integer>> partitioned = numbers.stream()\n            .collect(Collectors.partitioningBy(n -> n % 2 == 0));\n        \n        System.out.println(\"Even: \" + partitioned.get(true).size());\n        System.out.println(\"Odd: \" + partitioned.get(false).size());\n        System.out.println(\"Keys: \" + partitioned.keySet().size());\n    }\n}",
    "explanation": "Ispisat će: 'Even: 5', 'Odd: 5', 'Keys: 2'. partitioningBy() UVIJEK vraća Map s DVA ključa: true i false! Even brojevi (2,4,6,8,10) = 5, Odd brojevi (1,3,5,7,9) = 5. partitioningBy() je specijalizirana verzija groupingBy() za BINARY particioniranje (Boolean key). VAŽNO: Map UVIJEK ima oba ključa čak i ako je jedna grupa prazna! Ako nema even brojeva, get(true) vraća PRAZNU listu [], ne null! Razlika od groupingBy(): partitioningBy garantira 2 ključa, groupingBy() može imati N ključeva. Koristite partitioningBy() za boolean predikate!",
    "difficulty": "HARD",
    "options": [
      { "text": "Even: 5, Odd: 5, Keys: 2", "isCorrect": true },
      { "text": "Even: 5, Odd: 5, Keys: 10", "isCorrect": false },
      { "text": "Neće se kompilirati - partitioningBy vraća Set", "isCorrect": false },
      { "text": "Baca NullPointerException ako nema jedne grupe", "isCorrect": false },
      { "text": "Keys može biti 1 ako svi brojevi idu u istu grupu", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kada lambda izraz MOŽE bacati checked exception?",
    "explanation": "Lambda MOŽE bacati checked exception SAMO AKO funkcionalno sučelje to DEKLARIRA u throws clause! Standard funkcionalna sučelja (Consumer, Function, Predicate) NE deklariraju checked exceptions pa lambda ne može. Rješenja: (1) WRAP u try-catch unutar lambde i konvertirati u unchecked (RuntimeException), (2) kreirati VLASTITO funkcionalno sučelje s throws: @FunctionalInterface interface ThrowingFunction<T, R> { R apply(T t) throws Exception; }, (3) koristiti library kao Vavr ili Stream-Ex koji imaju throwing verzije. Lambda MOŽE bacati UNCHECKED exceptions bez problema! Checked exceptions zahtijevaju special handling jer većina API-ja ne očekuje ih!",
    "difficulty": "HARD",
    "options": [
      { "text": "Samo ako funkcionalno sučelje deklarira exception u throws clause", "isCorrect": true },
      { "text": "Uvijek može bacati bilo koju exception", "isCorrect": false },
      { "text": "Nikad ne može bacati checked exception", "isCorrect": false },
      { "text": "Može bacati checked ali samo RuntimeException podklase", "isCorrect": false },
      { "text": "Samo ako lambda ima eksplicitni throws block", "isCorrect": false },
      { "text": "Samo u main() metodi, ne u drugim metodama", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Java 17+ moderne značajke se MOGU kombinirati s lambda izrazima? (Odaberite sve točne)",
    "explanation": "Moderne značajke s lambdama: (1) RECORDS (Java 16+) - lambda može raditi s record-ima, method references na record getters. (2) TEXT BLOCKS (Java 15+) - lambda može formatirati/procesirati text blocks. (3) SWITCH EXPRESSIONS (Java 14+) - lambda tijelo može koristiti switch expression s return. (4) PATTERN MATCHING (Java 21+) - lambda može koristiti instanceof pattern matching, switch pattern matching. (5) VAR (Java 10+) - lambda parametri mogu koristiti var (implicitly typed lambda). NE MOGU direktno: Sealed classes (ne utječu na lambde), Virtual Threads (ne mijenja lambda sintaksu). Lambda sintaksa NIJE mijenjana, ali se može kombinirati s modernim značajkama!",
    "difficulty": "HARD",
    "options": [
      { "text": "Records (Java 16+)", "isCorrect": true },
      { "text": "Text Blocks (Java 15+)", "isCorrect": true },
      { "text": "Switch Expressions (Java 14+)", "isCorrect": true },
      { "text": "Pattern Matching (Java 21+)", "isCorrect": true },
      { "text": "var keyword (Java 10+)", "isCorrect": true },
      { "text": "Sealed classes direktno mijenjaju lambda sintaksu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.iterate i limit?",
    "codeSnippet": "public class IterateTest {\n    public static void main(String[] args) {\n        List<Integer> result = Stream.iterate(1, n -> n < 100, n -> n * 2)\n            .toList();\n        \n        System.out.println(result);\n        \n        List<Integer> result2 = Stream.iterate(1, n -> n * 2)\n            .limit(10)\n            .toList();\n        \n        System.out.println(result2.get(result2.size() - 1));\n    }\n}",
    "explanation": "Ispisat će: '[1, 2, 4, 8, 16, 32, 64]' i '512'. JAVA 9+: Stream.iterate() ima DVE verzije! (1) iterate(seed, hasNext, next) - Java 9+ s TERMINACIJSKIM uvjetom n < 100: 1, 2, 4, 8, 16, 32, 64 (128 > 100 pa staje). (2) iterate(seed, next) - INFINITE stream bez terminacije! Mora koristiti limit(10) za zaustavljanje: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512. result2.get(9) = 512 (2^9). Java 9 verzija je SIGURNIJA - eksplicitan termination uvjet! Bez limit() ili termination, infinite stream nikad ne staje!",
    "difficulty": "HARD",
    "options": [
      { "text": "[1, 2, 4, 8, 16, 32, 64] i 512 - Java 9+ iterate s terminacijom", "isCorrect": true },
      { "text": "Oba vraćaju isti rezultat", "isCorrect": false },
      { "text": "Neće se kompilirati - iterate ne prima 3 argumenta", "isCorrect": false },
      { "text": "Program se nikad ne zaustavlja - infinite loop", "isCorrect": false },
      { "text": "[1, 2, 4, 8, 16, 32, 64, 128] i 1024", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto je sljedeći kod s lambda i serialization PROBLEMATIČAN?",
    "codeSnippet": "Comparator<String> comp = (Comparator<String> & Serializable) \n    (s1, s2) -> s1.compareToIgnoreCase(s2);\n\nObjectOutputStream out = new ObjectOutputStream(...);\nout.writeObject(comp);",
    "explanation": "Lambda izrazi NISU automatski Serializable! Mogu biti serializable SAMO AKO: (1) cast-ujete na funkcionalno sučelje koje extends Serializable (kao u kodu), (2) SVE captured varijable su serializable, (3) target tip je serializable interface. PROBLEMI: (1) Serialization lambdi je FRAGILE - internal representation može se promijeniti, (2) SecurityException ako lambda pristupa private članovima, (3) Class compatibility problemi između JVM verzija. PREPORUKA: NE serializirati lambde! Koristite ANONYMOUS CLASS ili NAMED CLASS za serialization. Lambda serialization je RISKY i ne treba se koristiti u produkciji!",
    "difficulty": "HARD",
    "options": [
      { "text": "Lambda serialization je fragile, može failati između JVM verzija, risky za produkciju", "isCorrect": true },
      { "text": "Lambda se ne može cast-ovati na Serializable", "isCorrect": false },
      { "text": "Comparator ne može biti serializable", "isCorrect": false },
      { "text": "String nije serializable pa lambda ne može biti", "isCorrect": false },
      { "text": "Nema problema - ovo je standardan način", "isCorrect": false },
      { "text": "Lambda automatski postaje serializable s castom", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko različitih lambda objekata će biti kreirano u sljedećem kodu?",
    "codeSnippet": "public class LambdaInstanceTest {\n    public static void main(String[] args) {\n        for (int i = 0; i < 5; i++) {\n            Runnable r1 = () -> System.out.println(\"Hello\");\n        }\n        \n        int x = 10;\n        for (int i = 0; i < 5; i++) {\n            Runnable r2 = () -> System.out.println(x);\n        }\n        \n        for (int i = 0; i < 5; i++) {\n            final int j = i;\n            Runnable r3 = () -> System.out.println(j);\n        }\n    }\n}",
    "explanation": "Odgovor ovisi o JVM optimizacijama, ali GENERALNO: r1 lambde mogu biti ISTA instanca (5 puta) - JVM može CACHIRATI non-capturing lambde (ne capture-ira varijable)! r2 lambde su RAZLIČITE jer capture-aju x (capturing lambda). r3 lambde su RAZLIČITE jer svaka capture-a DRUGAČIJI j. PRAVILO: non-capturing lambde mogu biti SINGLETONS (JVM optimizacija), capturing lambde su UVIJEK nove instance jer imaju RAZLIČITO stanje! Specifično: r1 = 1 ili 5 instanci (JVM opciono), r2 = 5 instanci, r3 = 5 instanci. UKUPNO: minimum 11, maksimum 15 instanci! invokedynamic omogućava ove optimizacije!",
    "difficulty": "HARD",
    "options": [
      { "text": "11-15 - non-capturing mogu biti cached, capturing su uvijek nove", "isCorrect": true },
      { "text": "15 - svaki lambda izraz kreira novu instancu", "isCorrect": false },
      { "text": "3 - samo 3 različita lambda izraza u kodu", "isCorrect": false },
      { "text": "5 - po jedna za svaku iteraciju", "isCorrect": false },
      { "text": "0 - lambda se ne kreira dok se ne pozove", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su DOBRE prakse pri korištenju lambda izraza? (Odaberite sve točne)",
    "explanation": "DOBRE prakse: (1) Držite lambde KRATKIM (1-3 linije) - ako je duža, izdvojiti u metodu. (2) Izbjegavajte SIDE EFFECTS - ne mutirajte vanjsko stanje, pure functions. (3) Koristite METHOD REFERENCES kad je moguće - čitljivije. (4) Preferirajte toList() od collect(Collectors.toList()) u Java 16+. (5) Izbjegavajte NESTED lambde (lambda u lambdi) - teško čitljivo. (6) Koristite MEANINGFUL imena parametara (student umjesto s). LOŠE: ignorirati effectively final, pretjerivati s ulančavanjem (readability!), koristiti parallelStream bez testiranja. Lambda je za ČITLJIV funkcionalni stil, ne za code golf!",
    "difficulty": "HARD",
    "options": [
      { "text": "Držite lambde kratkim (1-3 linije)", "isCorrect": true },
      { "text": "Izbjegavajte side effects - pure functions", "isCorrect": true },
      { "text": "Koristite method references gdje je moguće", "isCorrect": true },
      { "text": "Preferirajte toList() u Java 16+", "isCorrect": true },
      { "text": "Uvijek koristite parallelStream() za performance", "isCorrect": false },
      { "text": "Što više nested lambdi - kompaktniji kod", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što znači termin 'SAM type' u kontekstu funkcionalnih sučelja?",
    "explanation": "SAM = Single Abstract Method - sučelje s TOČNO JEDNOM apstraktnom metodom! Ovo je DEFINICIJA funkcionalnog sučelja. Lambda izraz može implementirati SAMO SAM type sučelje. Primjer: Runnable (run()), Comparator (compare()), Function (apply()). Sučelje MOŽE imati: (1) jednu apstraktnu metodu, (2) VIŠE default metoda (nisu apstraktne), (3) VIŠE static metoda, (4) metode iz Object (equals, hashCode, toString) - ne računaju se! @FunctionalInterface anotacija (opciona) PROVJERAVA da je sučelje SAM type. Pre-Java 8 SAM types postojali ali bez lambda podrške (koristili anonimne klase). SAM = KLJUČNI koncept za lambde!",
    "difficulty": "HARD",
    "options": [
      { "text": "Single Abstract Method - sučelje s točno jednom apstraktnom metodom", "isCorrect": true },
      { "text": "Synchronized Access Method za thread-safe lambde", "isCorrect": false },
      { "text": "Static And Mutable tip za lambda state", "isCorrect": false },
      { "text": "Simple Argument Mapping za type inference", "isCorrect": false },
      { "text": "Serializable Anonymous Method za persistence", "isCorrect": false },
      { "text": "Stream API Method za pipeline operacije", "isCorrect": false }
    ]
  }

]
}
