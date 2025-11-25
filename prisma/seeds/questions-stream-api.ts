import { QuestionType, Difficulty } from '@prisma/client'

export const streamApiQuestions = {
  lectureSlug: 'stream-api',
  questions: [
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između intermediate i terminal operacija u Stream API-ju?",
    "explanation": "Intermediate operacije (filter, map, sorted, distinct, limit, flatMap) vraćaju novi Stream i omogućavaju ulančavanje - izvršavaju se lijenije (lazy evaluation). Terminal operacije (collect, forEach, count, reduce, findFirst, anyMatch) završavaju Stream i vraćaju rezultat ili void - pokreću izvršavanje SVIH intermediate operacija. Nakon terminal operacije Stream je konzumiran i ne može se ponovno koristiti. Stream se NE izvršava dok ne naiđe terminal operacija!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Intermediate vraćaju Stream i lazy su, terminal završavaju Stream i pokreću izvršavanje", "isCorrect": true },
      { "text": "Intermediate su brže, terminal su sporije", "isCorrect": false },
      { "text": "Intermediate mijenjaju originalnu kolekciju, terminal ne", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "Terminal operacije mogu se pozivati više puta", "isCorrect": false },
      { "text": "Intermediate se izvršavaju odmah, terminal čekaju", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih operacija su intermediate operacije u Stream API-ju?",
    "explanation": "Intermediate operacije vraćaju Stream i omogućavaju ulančavanje: filter() (filtriranje), map() (transformacija), flatMap() (spljoštavanje), sorted() (sortiranje), distinct() (uklanjanje duplikata), limit() (ograničavanje), skip() (preskakanje), peek() (debug inspekcija). Sve ove operacije su lazy - ne izvršavaju se dok ne naiđe terminal operacija. forEach(), collect(), reduce() su terminal operacije.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "filter() - filtriranje elemenata", "isCorrect": true },
      { "text": "map() - transformacija elemenata", "isCorrect": true },
      { "text": "sorted() - sortiranje elemenata", "isCorrect": true },
      { "text": "forEach() - iteracija kroz elemente", "isCorrect": false },
      { "text": "collect() - prikupljanje rezultata", "isCorrect": false },
      { "text": "reduce() - agregacija", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih operacija su terminal operacije u Stream API-ju?",
    "explanation": "Terminal operacije završavaju Stream i pokreću izvršavanje: collect() (prikupljanje u kolekciju), forEach() (iteracija), count() (brojanje), reduce() (agregacija), anyMatch/allMatch/noneMatch() (provjere), findFirst/findAny() (pronalaženje), min/max() (ekstremne vrijednosti), sum/average() (IntStream/DoubleStream/LongStream). Nakon terminal operacije Stream ne može se ponovno koristiti.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "collect() - prikupljanje rezultata u kolekciju", "isCorrect": true },
      { "text": "forEach() - iteracija kroz sve elemente", "isCorrect": true },
      { "text": "reduce() - agregacija u jednu vrijednost", "isCorrect": true },
      { "text": "filter() - filtriranje elemenata", "isCorrect": false },
      { "text": "map() - transformacija elemenata", "isCorrect": false },
      { "text": "sorted() - sortiranje", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što znači 'lazy evaluation' u kontekstu Stream API-ja?",
    "explanation": "Lazy evaluation znači da intermediate operacije (filter, map, sorted) se NE izvršavaju odmah kada ih pozovete - samo grade pipeline operacija. Izvršavanje se pokreće tek kada naiđe terminal operacija (collect, forEach, count). Ovo omogućava optimizacije - ako koristite findFirst() ili limit(), Stream ne procesira sve elemente. Primjer: stream.filter(...).map(...) se NE izvršava dok ne pozovete .collect() ili drugu terminal operaciju.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Intermediate operacije se ne izvršavaju dok ne naiđe terminal operacija", "isCorrect": true },
      { "text": "Stream čeka određeno vrijeme prije izvršavanja", "isCorrect": false },
      { "text": "Operacije se izvršavaju u pozadini paralelno", "isCorrect": false },
      { "text": "Stream evaluira samo dio elemenata", "isCorrect": false },
      { "text": "Lazy evaluation je za Java 17+ verzije", "isCorrect": false },
      { "text": "Stream izvršava operacije po potrebi korisnika", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što se događa kad pokušate ponovno koristiti isti Stream objekt?",
    "explanation": "Nakon što pozovete terminal operaciju (collect, forEach, count), Stream je KONZUMIRAN i ne može se ponovno koristiti. Pokušaj ponovnog korištenja baca IllegalStateException: 'stream has already been operated upon or closed'. Morate kreirati novi Stream ako trebate ponovno procesirati podatke. Stream je jednokratan! Primjer: Stream<String> s = list.stream(); s.collect(...); s.count(); // IllegalStateException!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Baca IllegalStateException - Stream je konzumiran nakon terminal operacije", "isCorrect": true },
      { "text": "Automatski se kreira novi Stream", "isCorrect": false },
      { "text": "Stream se resetira i počinje ispočetka", "isCorrect": false },
      { "text": "Radi normalno, Stream se može koristiti više puta", "isCorrect": false },
      { "text": "Vraća cached rezultate iz prošlog izvršavanja", "isCorrect": false },
      { "text": "Baca ConcurrentModificationException", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što radi distinct() operacija u Stream API-ju?",
    "explanation": "distinct() uklanja duplikate iz Stream-a i vraća Stream s jedinstvenim elementima. Koristi equals() metodu za usporedbu objekata. Primjer: Stream.of(1,2,2,3,3,3).distinct() vraća Stream s [1,2,3]. distinct() je intermediate operacija (lazy). Za custom objekte mora biti pravilno implementiran equals() i hashCode(). Ekvivalent Set-u ali u Stream pipeline-u.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Uklanja duplikate i vraća Stream s jedinstvenim elementima", "isCorrect": true },
      { "text": "Sortira elemente po razlikama", "isCorrect": false },
      { "text": "Razdvaja elemente u različite Stream-ove", "isCorrect": false },
      { "text": "Filtrira samo različite tipove podataka", "isCorrect": false },
      { "text": "Kreira Set od Stream-a", "isCorrect": false },
      { "text": "Pretvara Stream u distinct kolekciju", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između skip() i limit() operacija?",
    "explanation": "skip(n) preskače prvih n elemenata i vraća Stream s preostalim elementima. limit(n) ograničava Stream na prvih n elemenata. Primjer: Stream.of(1,2,3,4,5).skip(2) vraća [3,4,5], Stream.of(1,2,3,4,5).limit(2) vraća [1,2]. Mogu se kombinirati: stream.skip(2).limit(3) preskače prva 2, uzima sljedeća 3. Obje su intermediate operacije. Korisno za paginaciju.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "skip(n) preskače prvih n elemenata, limit(n) uzima samo prvih n elemenata", "isCorrect": true },
      { "text": "skip() je brži od limit()", "isCorrect": false },
      { "text": "limit() briše elemente, skip() ih čuva", "isCorrect": false },
      { "text": "skip() radi samo s brojevima, limit() sa svim tipovima", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "skip() je terminal operacija, limit() intermediate", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su short-circuiting operacije u Stream API-ju?",
    "explanation": "Short-circuiting operacije ZAUSTAVLJAJU procesiranje čim je rezultat poznat - ne moraju procesirati sve elemente. Terminal short-circuiting: anyMatch() (nalazi li se barem jedan), allMatch() (jesu li svi), noneMatch() (nema li nijednog), findFirst() (vraća prvi), findAny() (vraća bilo koji). Intermediate short-circuiting: limit() (ograničava broj). Primjer: stream.anyMatch(x -> x > 5) se zaustavlja čim nađe prvi element >5.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Operacije koje se zaustavljaju čim je rezultat poznat, ne procesiraju sve", "isCorrect": true },
      { "text": "Operacije koje se izvršavaju brže od ostalih", "isCorrect": false },
      { "text": "Operacije koje rade samo s malim kolekcijama", "isCorrect": false },
      { "text": "Skraćene verzije dugih operacija", "isCorrect": false },
      { "text": "Operacije koje se izvršavaju paralelno", "isCorrect": false },
      { "text": "Operacije koje preskakaju elemente", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između findFirst() i findAny() operacija?",
    "explanation": "findFirst() vraća PRVI element iz Stream-a (deterministički, uvijek isti rezultat). findAny() vraća BILO KOJI element (ne-deterministički, može biti različit). Obje vraćaju Optional<T> jer Stream može biti prazan. Za sekvencijalne Stream-ove obje vraćaju prvi element. Za paralelne Stream-ove findAny() može vratiti bilo koji - brže jer ne mora čekati prvi. Obje su short-circuiting terminal operacije.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "findFirst() vraća prvi element, findAny() bilo koji (brže za parallel stream)", "isCorrect": true },
      { "text": "findFirst() vraća Optional, findAny() vraća direktnu vrijednost", "isCorrect": false },
      { "text": "findAny() vraća random element, findFirst() prvi", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "findFirst() radi samo sa sortiranim Stream-ovima", "isCorrect": false },
      { "text": "findAny() je brži uvijek", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je peek() operacija i kada se koristi?",
    "explanation": "peek() omogućava inspekciju elemenata bez mijenjanja Stream-a - koristi se za DEBUGGING! Prima Consumer lambda izraz i izvršava ga za svaki element, ali ne mijenja Stream. Primjer: stream.peek(x -> System.out.println('Debug: ' + x)).filter(...). peek() je intermediate operacija (lazy) - izvršava se samo ako ima terminal operacija. VAŽNO: Nemojte koristiti peek() za side effects u production kodu - samo za debug!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Omogućava inspekciju/debugging elemenata bez mijenjanja Stream-a", "isCorrect": true },
      { "text": "Vraća prvi element bez uklanjanja", "isCorrect": false },
      { "text": "Gleda samo parne elemente", "isCorrect": false },
      { "text": "Brza alternativa za forEach()", "isCorrect": false },
      { "text": "Terminal operacija za pregled podataka", "isCorrect": false },
      { "text": "Operacija za dohvaćanje zadnjeg elementa", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što radi mapToInt() operacija i kada se koristi?",
    "explanation": "mapToInt() transformira Stream<T> u IntStream - specijalizirani Stream za int primitive. Koristi se za rad s brojevima gdje trebate sum(), average(), min(), max() metode. Primjer: users.stream().mapToInt(User::getAge).average(). Slično postoje: mapToLong() (LongStream), mapToDouble() (DoubleStream). IntStream je efikasniji od Stream<Integer> jer izbjegava autoboxing. Vraća IntStream, ne Stream<Integer>!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Transformira Stream<T> u IntStream za efikasnije numeričke operacije", "isCorrect": true },
      { "text": "Mapira sve elemente u Integer objekte", "isCorrect": false },
      { "text": "Pretvara stringove u brojeve", "isCorrect": false },
      { "text": "Konvertira sve tipove u int primitive", "isCorrect": false },
      { "text": "Operacija za rad samo s int array-ima", "isCorrect": false },
      { "text": "Zamjena za map() koja radi samo s brojevima", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između count() i sum() operacija?",
    "explanation": "count() broji BROJ elemenata u Stream-u i vraća long. Radi sa SVIM tipovima Stream-a. sum() zbraja VRIJEDNOSTI elemenata i vraća int/long/double. Radi SAMO s IntStream/LongStream/DoubleStream. Primjer: stream.count() vraća 5 (broj elemenata), intStream.sum() vraća 15 (zbir vrijednosti). Za sum() običnog Stream-a koristi mapToInt().sum() ili reduce(0, Integer::sum). Obje su terminal operacije.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "count() broji broj elemenata, sum() zbraja vrijednosti (samo IntStream/LongStream/DoubleStream)", "isCorrect": true },
      { "text": "count() je brži od sum()", "isCorrect": false },
      { "text": "sum() radi sa svim tipovima, count() samo s brojevima", "isCorrect": false },
      { "text": "Nema razlike, vraćaju istu vrijednost", "isCorrect": false },
      { "text": "count() je intermediate, sum() terminal operacija", "isCorrect": false },
      { "text": "sum() broji parne, count() sve elemente", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što vraća average() operacija na IntStream-u?",
    "explanation": "average() vraća OptionalDouble, NE double! Razlog: Stream može biti prazan pa ne postoji prosječna vrijednost. OptionalDouble.empty() ako je Stream prazan. Primjer: intStream.average().orElse(0.0) vraća prosijek ili 0.0 ako je prazan. average() radi SAMO na IntStream/LongStream/DoubleStream. Za obični Stream<Integer> koristi mapToInt() prvo. average() je terminal operacija.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "OptionalDouble - može biti prazno ako je Stream prazan", "isCorrect": true },
      { "text": "double - uvijek vraća broj", "isCorrect": false },
      { "text": "int - zaokruženu prosječnu vrijednost", "isCorrect": false },
      { "text": "Double - wrapper objekt", "isCorrect": false },
      { "text": "long - prosijek kao long", "isCorrect": false },
      { "text": "float - decimalna prosječna vrijednost", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što radi Collectors.joining() metoda?",
    "explanation": "Collectors.joining() spaja stringove iz Stream-a u jedan String. Ima tri varijante: joining() (bez separatora), joining(delimiter) (s delimiterom između), joining(delimiter, prefix, suffix) (s delimiterom i prefix/suffix). Primjer: Stream.of('A','B','C').collect(Collectors.joining(', ')) vraća 'A, B, C'. Stream.of('1','2','3').collect(Collectors.joining(',', '[', ']')) vraća '[1,2,3]'. Radi SAMO sa Stream<String>!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Spaja stringove iz Stream-a u jedan String s opcionalnim delimiterom/prefix/suffix", "isCorrect": true },
      { "text": "Kreira Join operaciju između dva Stream-a", "isCorrect": false },
      { "text": "Kombinira više Stream-ova u jedan", "isCorrect": false },
      { "text": "Povezuje elemente u LinkedList", "isCorrect": false },
      { "text": "Operacija za SQL JOIN upite", "isCorrect": false },
      { "text": "Spaja brojeve u matematičku sumu", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je svrha Collectors.toMap() metode?",
    "explanation": "Collectors.toMap() pretvara Stream u Map<K,V>. Prima 2-3 funkcije: keyMapper (kako ekstraktirati ključ), valueMapper (kako ekstraktirati vrijednost), opcijski mergeFunction (što raditi s duplikatima). Primjer: users.stream().collect(Collectors.toMap(User::getId, User::getName)) kreira Map s ID-jevima kao ključevima i imenima kao vrijednostima. Ako ima duplikata ključeva, baca IllegalStateException osim ako providate mergeFunction!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Pretvara Stream u Map s key/value ekstraktiranim iz elemenata", "isCorrect": true },
      { "text": "Mapira elemente u različite tipove", "isCorrect": false },
      { "text": "Kreira mapu parova (x,y) koordinata", "isCorrect": false },
      { "text": "Transformira Map u Stream", "isCorrect": false },
      { "text": "Grupira elemente u HashMap", "isCorrect": false },
      { "text": "Sortira elemente u TreeMap", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream pipeline-om?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5);\n\nStream<Integer> stream = numbers.stream()\n    .filter(n -> {\n        System.out.println(\"Filter: \" + n);\n        return n % 2 == 0;\n    })\n    .map(n -> {\n        System.out.println(\"Map: \" + n);\n        return n * 2;\n    });\n\nSystem.out.println(\"Stream created\");",
    "explanation": "Ispisat će SAMO 'Stream created'. NIŠTA DRUGO! Razlog je lazy evaluation - intermediate operacije (filter i map) se NE izvršavaju dok ne pozovete terminal operaciju. Stream samo gradi pipeline operacija ali ih ne izvršava. Kad bi dodali stream.collect(Collectors.toList()) na kraju, tek tada bi se ispisali 'Filter' i 'Map' outputi. Ovo demonstrira lazy nature Stream API-ja.",
    "difficulty": "HARD",
    "options": [
      { "text": "Samo 'Stream created' - intermediate operacije su lazy", "isCorrect": true },
      { "text": "Filter: 1-5, Map: 2,4, Stream created", "isCorrect": false },
      { "text": "Filter: 2,4, Map: 4,8, Stream created", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje terminal operacija", "isCorrect": false },
      { "text": "Sve Filter i Map outpute, pa Stream created", "isCorrect": false },
      { "text": "Baca IllegalStateException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s anyMatch() operacijom?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\nboolean result = numbers.stream()\n    .peek(n -> System.out.println(\"Checking: \" + n))\n    .anyMatch(n -> n > 7);\n\nSystem.out.println(\"Result: \" + result);",
    "explanation": "Ispisat će 'Checking: 1' do 'Checking: 8', pa 'Result: true'. anyMatch() je short-circuiting terminal operacija - ZAUSTAVLJA se čim nađe prvi element koji zadovoljava uvjet! Provjerava 1,2,3,4,5,6,7 (svi ≤7), pa 8 (>7) - tu se zaustavlja i vraća true. peek() pokazuje koje elemente je procesirao. Ne procesira 9 i 10 jer se stream već zaustavio. Ovo je optimizacija - ne procesira nepotrebne elemente.",
    "difficulty": "HARD",
    "options": [
      { "text": "Checking: 1-8, Result: true - anyMatch() je short-circuiting", "isCorrect": true },
      { "text": "Checking: 1-10, Result: true - procesira sve", "isCorrect": false },
      { "text": "Result: true - bez Checking outputa", "isCorrect": false },
      { "text": "Neće se kompilirati - peek() ne može s anyMatch()", "isCorrect": false },
      { "text": "Checking: 8-10, Result: true", "isCorrect": false },
      { "text": "Baca IllegalStateException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod kompilirati i što će vratiti?",
    "codeSnippet": "Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5);\n\nlong count = stream.count();\nlong sum = stream.mapToInt(Integer::intValue).sum();\n\nSystem.out.println(count + \" \" + sum);",
    "explanation": "Kod se NEĆE kompilirati u runtime-u - baca IllegalStateException: 'stream has already been operated upon or closed'. count() je terminal operacija koja konzumira Stream. Nakon count() Stream je zatvoren i ne može se ponovno koristiti. Pokušaj pozivanja mapToInt() na konzumiranom Stream-u baca iznimku. Rješenje: kreirati dva različita Stream-a ili koristiti summaryStatistics().",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca IllegalStateException - Stream je konzumiran nakon count()", "isCorrect": true },
      { "text": "Kompilira se i ispisuje '5 15'", "isCorrect": false },
      { "text": "Neće se kompilirati - count() i sum() ne mogu zajedno", "isCorrect": false },
      { "text": "Kompilira se i ispisuje '5 0'", "isCorrect": false },
      { "text": "Automatski kreira novi Stream za drugu operaciju", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s Collectors.groupingBy()?",
    "codeSnippet": "record Person(String name, int age) {}\n\nList<Person> people = List.of(\n    new Person(\"Ana\", 25),\n    new Person(\"Marko\", 30),\n    new Person(\"Petra\", 25),\n    new Person(\"Ivan\", 30)\n);\n\nMap<Integer, List<String>> byAge = people.stream()\n    .collect(Collectors.groupingBy(\n        Person::age,\n        Collectors.mapping(Person::name, Collectors.toList())\n    ));\n\nSystem.out.println(byAge.get(25));",
    "explanation": "Ispisat će [Ana, Petra]. groupingBy() grupira osobe po godinama (age) u Map<Integer, List<String>>. Collectors.mapping() dodatno transformira svaku osobu u ime prije dodavanja u listu. Konačna mapa: {25→[Ana, Petra], 30→[Marko, Ivan]}. byAge.get(25) vraća listu imena ljudi od 25 godina. Ovo je složeniji primjer groupingBy-a s downstream collectorom koji mapira elemente.",
    "difficulty": "HARD",
    "options": [
      { "text": "[Ana, Petra]", "isCorrect": true },
      { "text": "[Ana, Marko, Petra, Ivan]", "isCorrect": false },
      { "text": "[Person(Ana, 25), Person(Petra, 25)]", "isCorrect": false },
      { "text": "Neće se kompilirati - mapping() ne postoji", "isCorrect": false },
      { "text": "[25, 25]", "isCorrect": false },
      { "text": "null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu s toMap() collectorom?",
    "codeSnippet": "record User(int id, String name) {}\n\nList<User> users = List.of(\n    new User(1, \"Ana\"),\n    new User(2, \"Marko\"),\n    new User(1, \"Petra\")\n);\n\nMap<Integer, String> userMap = users.stream()\n    .collect(Collectors.toMap(User::id, User::name));\n\nSystem.out.println(userMap);",
    "explanation": "Kod će baciti IllegalStateException: 'Duplicate key 1'. toMap() ne dopušta duplikate ključeva! Ana i Petra imaju isti ID (1). Rješenje: dodati merge function: toMap(User::id, User::name, (existing, replacement) -> existing) ili (e, r) -> r za zadržavanje starog/novog. Ili koristiti groupingBy() ako očekujete duplikate. toMap() bez merge funkcije je strikt - duplikati = error!",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca IllegalStateException - duplikat ključa 1, treba merge function", "isCorrect": true },
      { "text": "Kompilira se i automatski prepisuje staru vrijednost", "isCorrect": false },
      { "text": "Neće se kompilirati - toMap() ne radi s records", "isCorrect": false },
      { "text": "Ispisuje {1=Ana, 2=Marko, 1=Petra}", "isCorrect": false },
      { "text": "Automatski ignorira duplikate", "isCorrect": false },
      { "text": "Kreira MultiMap umjesto Map", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s limit() i skip() operacijama?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n\nList<Integer> result = numbers.stream()\n    .skip(3)\n    .limit(4)\n    .collect(Collectors.toList());\n\nSystem.out.println(result);",
    "explanation": "Ispisat će [4, 5, 6, 7]. skip(3) preskače prva 3 elementa (1,2,3), ostaje [4,5,6,7,8,9,10]. limit(4) uzima samo prva 4 elementa od preostlih, što je [4,5,6,7]. Kombinacija skip() i limit() je korisna za paginaciju: skip(page * pageSize).limit(pageSize). Obje su intermediate operacije. Redoslijed je bitan: skip pa limit daje druge rezultate od limit pa skip!",
    "difficulty": "HARD",
    "options": [
      { "text": "[4, 5, 6, 7]", "isCorrect": true },
      { "text": "[1, 2, 3, 4]", "isCorrect": false },
      { "text": "[3, 4, 5, 6]", "isCorrect": false },
      { "text": "[7, 8, 9, 10]", "isCorrect": false },
      { "text": "Neće se kompilirati - ne mogu se kombinirati", "isCorrect": false },
      { "text": "[1, 2, 5, 6, 7, 8]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s distinct() operacijom?",
    "codeSnippet": "record Person(String name, int age) {}\n\nList<Person> people = List.of(\n    new Person(\"Ana\", 25),\n    new Person(\"Ana\", 25),\n    new Person(\"Marko\", 30)\n);\n\nList<Person> unique = people.stream()\n    .distinct()\n    .collect(Collectors.toList());\n\nSystem.out.println(unique.size());",
    "explanation": "Ispisat će 2. distinct() koristi equals() metodu za usporedbu. Record automatski generira equals() i hashCode() na temelju SVIH polja. Person('Ana', 25) i Person('Ana', 25) su ISTI prema equals() (isto ime i dob). distinct() uklanja drugi 'Ana' jer je duplikat. Ostaju 2 jedinstvena elementa: Ana(25) i Marko(30). Za obične klase morate implementirati equals() i hashCode() za ispravan rad distinct().",
    "difficulty": "HARD",
    "options": [
      { "text": "2", "isCorrect": true },
      { "text": "3", "isCorrect": false },
      { "text": "1", "isCorrect": false },
      { "text": "Neće se kompilirati - distinct() ne radi s records", "isCorrect": false },
      { "text": "Baca ClassCastException", "isCorrect": false },
      { "text": "0", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s IntStream.range() kompilirati?",
    "codeSnippet": "int sum = IntStream.range(1, 5)\n    .map(n -> n * 2)\n    .sum();\n\nSystem.out.println(sum);",
    "explanation": "Kompilira se i ispisuje 20. IntStream.range(1, 5) generira [1,2,3,4] - EKSKLUZIVAN gornji limit! map(n -> n * 2) transformira u [2,4,6,8]. sum() zbraja sve: 2+4+6+8=20. IntStream.range(1, 5) ne uključuje 5! Za inkluzivan limit koristite IntStream.rangeClosed(1, 5) što bi dalo [1,2,3,4,5]. IntStream.range() je zgodan za generiranje sekvenci brojeva bez petlji.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 20 - range() je ekskluzivan gornji limit", "isCorrect": true },
      { "text": "Kompilira se i ispisuje 30 - uključuje 5", "isCorrect": false },
      { "text": "Neće se kompilirati - IntStream.range() ne postoji", "isCorrect": false },
      { "text": "Ispisuje 10", "isCorrect": false },
      { "text": "Baca IndexOutOfBoundsException", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 0", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s allMatch() operacijom?",
    "codeSnippet": "List<Integer> numbers = List.of(2, 4, 6, 8, 10);\n\nboolean allEven = numbers.stream()\n    .peek(n -> System.out.println(\"Checking: \" + n))\n    .allMatch(n -> n % 2 == 0);\n\nSystem.out.println(\"All even: \" + allEven);",
    "explanation": "Ispisat će 'Checking: 2' do 'Checking: 10', pa 'All even: true'. allMatch() provjerava jesu li SVI elementi true za predikat. Provjerava SVE elemente jer svi moraju zadovoljavati uvjet. Kad bi jedan bio neparan, allMatch() bi se zaustavio na njemu (short-circuit) i vratio false. anyMatch() se zaustavlja na prvom true, allMatch() se zaustavlja na prvom false (ili procesira sve ako su svi true).",
    "difficulty": "HARD",
    "options": [
      { "text": "Checking: 2-10, All even: true - provjerava sve dok ne naiđe na false", "isCorrect": true },
      { "text": "Checking: 2, All even: true - short-circuit na prvom", "isCorrect": false },
      { "text": "All even: true - bez Checking outputa", "isCorrect": false },
      { "text": "Neće se kompilirati - allMatch() ne radi s peek()", "isCorrect": false },
      { "text": "All even: false", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s noneMatch() operacijom?",
    "codeSnippet": "List<String> words = List.of(\"Java\", \"Python\", \"C++\");\n\nboolean hasLongWord = words.stream()\n    .noneMatch(w -> w.length() > 10);\n\nSystem.out.println(hasLongWord);",
    "explanation": "Ispisat će true. noneMatch() vraća true ako NIJEDAN element ne zadovoljava uvjet. Provjerava ima li riječi duže od 10 slova. Java (4), Python (6), C++ (3) - nijedna nije >10, pa noneMatch() vraća true. noneMatch(predicate) je ekvivalentno !anyMatch(predicate). noneMatch() je short-circuiting - zaustavlja se čim nađe element koji zadovoljava uvjet (tada vraća false).",
    "difficulty": "HARD",
    "options": [
      { "text": "true", "isCorrect": true },
      { "text": "false", "isCorrect": false },
      { "text": "Neće se kompilirati - noneMatch() ne postoji", "isCorrect": false },
      { "text": "Baca IllegalStateException", "isCorrect": false },
      { "text": "null", "isCorrect": false },
      { "text": "Zavisi od redoslijeda elemenata", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu s Collectors.averagingInt()?",
    "codeSnippet": "record Student(String name, int points) {}\n\nList<Student> students = List.of(\n    new Student(\"Ana\", 90),\n    new Student(\"Marko\", 85),\n    new Student(\"Petra\", 95)\n);\n\nDouble avgPoints = students.stream()\n    .collect(Collectors.averagingInt(Student::points));\n\nSystem.out.println(avgPoints);",
    "explanation": "Nema greške - kod je ispravan i ispisat će 90.0. Collectors.averagingInt() vraća prosječnu vrijednost kao Double (ne OptionalDouble kao stream.average()!). Računa: (90+85+95)/3 = 270/3 = 90.0. Collectors.averagingInt() je downstream collector - često se koristi s groupingBy() za računanje prosječnih vrijednosti po grupama. Slično postoje: averagingLong(), averagingDouble().",
    "difficulty": "HARD",
    "options": [
      { "text": "Nema greške - ispisuje 90.0, averagingInt() vraća Double", "isCorrect": true },
      { "text": "Neće se kompilirati - averagingInt() ne postoji", "isCorrect": false },
      { "text": "Treba koristiti mapToInt().average()", "isCorrect": false },
      { "text": "Vraća OptionalDouble, ne Double", "isCorrect": false },
      { "text": "Baca ArithmeticException", "isCorrect": false },
      { "text": "Nedostaje orElse() za default vrijednost", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collectors.counting()?",
    "codeSnippet": "record Product(String category, double price) {}\n\nList<Product> products = List.of(\n    new Product(\"Electronics\", 500.0),\n    new Product(\"Electronics\", 300.0),\n    new Product(\"Books\", 20.0),\n    new Product(\"Books\", 15.0)\n);\n\nMap<String, Long> countByCategory = products.stream()\n    .collect(Collectors.groupingBy(\n        Product::category,\n        Collectors.counting()\n    ));\n\nSystem.out.println(countByCategory.get(\"Electronics\"));",
    "explanation": "Ispisat će 2. groupingBy() grupira proizvode po kategoriji. Collectors.counting() broji koliko elemenata ima u svakoj grupi - downstream collector. Konačna mapa: {'Electronics'→2L, 'Books'→2L}. countByCategory.get('Electronics') vraća 2L (Long). Collectors.counting() vraća Long, ne Integer! Korisno za prebrojavanje elemenata po grupama.",
    "difficulty": "HARD",
    "options": [
      { "text": "2", "isCorrect": true },
      { "text": "4", "isCorrect": false },
      { "text": "800.0", "isCorrect": false },
      { "text": "Neće se kompilirati - counting() ne postoji", "isCorrect": false },
      { "text": "1", "isCorrect": false },
      { "text": "null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s takeWhile() (Java 9+) kompilirati?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5, 3, 2, 1);\n\nList<Integer> result = numbers.stream()\n    .takeWhile(n -> n < 4)\n    .collect(Collectors.toList());\n\nSystem.out.println(result);",
    "explanation": "Kompilira se i ispisuje [1, 2, 3]. takeWhile() uzima elemente DOK je predikat true, ZAUSTAVLJA se na prvom false. Provjerava: 1(<4) ✓, 2(<4) ✓, 3(<4) ✓, 4(<4) ✗ - STOP! Ne gleda 5,3,2,1 jer se već zaustavio. takeWhile() nije isto što i filter()! filter() provjerava SVE elemente, takeWhile() se zaustavlja na prvom false. takeWhile() je za ordered stream-ove.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje [1, 2, 3] - zaustavlja se na prvom false", "isCorrect": true },
      { "text": "Ispisuje [1, 2, 3, 3, 2, 1] - sve elemente <4", "isCorrect": false },
      { "text": "Neće se kompilirati - takeWhile() ne postoji", "isCorrect": false },
      { "text": "Ispisuje [1, 2, 3, 4]", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false },
      { "text": "Ispisuje sve elemente", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s dropWhile() (Java 9+)?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);\n\nList<Integer> result = numbers.stream()\n    .dropWhile(n -> n < 4)\n    .collect(Collectors.toList());\n\nSystem.out.println(result);",
    "explanation": "Ispisat će [4, 5, 6]. dropWhile() PRESKAČE elemente DOK je predikat true, zadržava SVE nakon prvog false. Preskače: 1(<4) preskače, 2(<4) preskače, 3(<4) preskače, 4(<4) false - STOP preskakanja, uzima [4,5,6]. dropWhile() je suprotno od takeWhile(). Korisno za preskakanje početnih elemenata koji zadovoljavaju uvjet.",
    "difficulty": "HARD",
    "options": [
      { "text": "[4, 5, 6]", "isCorrect": true },
      { "text": "[1, 2, 3]", "isCorrect": false },
      { "text": "[4]", "isCorrect": false },
      { "text": "Neće se kompilirati - dropWhile() ne postoji", "isCorrect": false },
      { "text": "[]", "isCorrect": false },
      { "text": "[1, 2, 3, 4, 5, 6]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s sorted() i Comparator-om?",
    "codeSnippet": "record Person(String name, int age) {}\n\nList<Person> people = List.of(\n    new Person(\"Ana\", 30),\n    new Person(\"Marko\", 25),\n    new Person(\"Petra\", 30)\n);\n\nList<String> names = people.stream()\n    .sorted(Comparator.comparing(Person::age)\n                      .thenComparing(Person::name))\n    .map(Person::name)\n    .collect(Collectors.toList());\n\nSystem.out.println(names);",
    "explanation": "Ispisat će [Marko, Ana, Petra]. sorted() sortira prvo po age uzlazno: Marko(25), Ana(30), Petra(30). Za iste godine (Ana i Petra su obje 30), thenComparing() sortira po imenu abecednim redom: Ana < Petra. Konačan redoslijed: Marko, Ana, Petra. map(Person::name) ekstraktira samo imena. Višekriterijsko sortiranje s thenComparing() je čest pattern za složenije sortiranje.",
    "difficulty": "HARD",
    "options": [
      { "text": "[Marko, Ana, Petra]", "isCorrect": true },
      { "text": "[Ana, Marko, Petra]", "isCorrect": false },
      { "text": "[Petra, Ana, Marko]", "isCorrect": false },
      { "text": "Neće se kompilirati - thenComparing() ne postoji", "isCorrect": false },
      { "text": "[Marko, Petra, Ana]", "isCorrect": false },
      { "text": "[Ana, Petra, Marko]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedećih dvaju pristupa s Optional?",
    "codeSnippet": "List<Integer> numbers = List.of(1, 2, 3, 4, 5);\n\n// Pristup 1\nInteger max1 = numbers.stream()\n    .max(Comparator.naturalOrder())\n    .get();\n\n// Pristup 2\nInteger max2 = numbers.stream()\n    .max(Comparator.naturalOrder())\n    .orElse(0);",
    "explanation": "Pristup 2 je BOLJI i SIGURNIJI! Pristup 1 (get()) baca NoSuchElementException ako je Stream prazan. Pristup 2 (orElse(0)) vraća 0 ako je prazan - siguran fallback. get() je OPASAN - nikad nemojte koristiti bez provjere s isPresent()! Bolje alternative: orElse(), orElseGet(), orElseThrow(), ifPresent(). U ovom slučaju oba vraćaju 5 jer lista nije prazna, ali s praznom listom Pristup 1 pada!",
    "difficulty": "HARD",
    "options": [
      { "text": "Pristup 2 je sigurniji - orElse() ne baca iznimku, get() baca ako je prazan", "isCorrect": true },
      { "text": "Pristup 1 je brži od Pristupa 2", "isCorrect": false },
      { "text": "Nema razlike, oba rade isto", "isCorrect": false },
      { "text": "Pristup 1 vraća Optional, Pristup 2 Integer", "isCorrect": false },
      { "text": "Pristup 2 ne radi s max() operacijom", "isCorrect": false },
      { "text": "get() je preferiran način", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje Stream operacije možemo zamijeniti sljedeću petlju?",
    "codeSnippet": "List<String> names = List.of(\"Ana\", \"Marko\", \"Petra\");\nint totalLength = 0;\n\nfor (String name : names) {\n    totalLength += name.length();\n}\n\nSystem.out.println(totalLength);",
    "explanation": "Stream zamjena: int totalLength = names.stream().mapToInt(String::length).sum(). mapToInt() transformira Stream<String> u IntStream s duljinama. sum() zbraja sve vrijednosti. Ili s reduce(): names.stream().map(String::length).reduce(0, Integer::sum). Stream pristup je deklarativniji (kaže ŠTO, ne KAKO) i izbjegava mutable varijablu totalLength. Kod je koncizniji i funkcionalniji stil.",
    "difficulty": "HARD",
    "options": [
      { "text": "names.stream().mapToInt(String::length).sum()", "isCorrect": true },
      { "text": "names.stream().count()", "isCorrect": false },
      { "text": "names.stream().forEach(n -> total += n.length())", "isCorrect": false },
      { "text": "names.stream().collect(Collectors.summingInt())", "isCorrect": false },
      { "text": "names.stream().length().sum()", "isCorrect": false },
      { "text": "names.stream().totalLength()", "isCorrect": false }
    ]
  }
]
}
