import { QuestionType, Difficulty } from '@prisma/client'

export const sortingQuestions = {
  lectureSlug: 'sorting',
  questions: [
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što radi Collections.sort() metoda i kako mijenja listu?",
    "explanation": "Collections.sort() sortira listu IN-PLACE - modificira originalnu listu direktno i ne vraća novu listu. Metoda vraća void jer modificira postojeću kolekciju. Koristi stabilni sort algoritam (Timsort) - elementi s jednakim vrijednostima zadržavaju originalni redoslijed. Primjer: List<Integer> list = new ArrayList<>(Arrays.asList(3,1,2)); Collections.sort(list); // list je sada [1,2,3]. Lista mora biti mutable (ArrayList), ne može biti immutable (List.of()).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Sortira listu in-place (modificira originalnu) i vraća void", "isCorrect": true },
      { "text": "Vraća novu sortiranu listu, ne mijenja original", "isCorrect": false },
      { "text": "Sortira samo kopiju liste", "isCorrect": false },
      { "text": "Kreira Set od sortiranih elemenata", "isCorrect": false },
      { "text": "Vraća sortiran array", "isCorrect": false },
      { "text": "Mijenja samo prvih 10 elemenata", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između Collections.sort() i List.sort() metoda?",
    "explanation": "Collections.sort(list) je statička utility metoda iz Collections klase (prije Java 8). List.sort(comparator) je instance metoda na List interfaceu (od Java 8). Funkcionalnost: ISTA - obje sortiraju in-place. Razlika u sintaksi: Collections.sort(list, comparator) vs list.sort(comparator). List.sort() je MODERNIJI pristup (Java 8+) i preferiran jer je čitljiviji. List.sort(null) sortira po natural order, što je ekvivalentno Collections.sort(list).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "List.sort() je instance metoda (Java 8+), Collections.sort() statička - ista funkcionalnost", "isCorrect": true },
      { "text": "Collections.sort() je brža od List.sort()", "isCorrect": false },
      { "text": "List.sort() kreira novu listu, Collections.sort() modificira", "isCorrect": false },
      { "text": "Collections.sort() radi samo s ArrayList, List.sort() sa svim", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "List.sort() ne može sortirati primitive", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'natural order' sortiranje u Collections.sort()?",
    "explanation": "Natural order je defaultno sortiranje koje koristi Comparable sučelje - Collections.sort(list) bez Comparatora. Za brojeve: uzlazni redoslijed (1,2,3), za String: leksikografski (abecedni: 'a','b','c'), za Date: kronološki (starije → novije). Klasa mora implementirati Comparable<T> s compareTo() metodom. Primjer: Integer, String, Date već imaju natural order. Za custom klase morate implementirati Comparable ili koristiti Comparator.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Defaultno sortiranje koristeći Comparable.compareTo() - brojevi uzlazno, String abecedno", "isCorrect": true },
      { "text": "Sortiranje po redoslijedu dodavanja u listu", "isCorrect": false },
      { "text": "Random sortiranje elemenata", "isCorrect": false },
      { "text": "Sortiranje po hashCode() vrijednosti", "isCorrect": false },
      { "text": "Sortiranje po memorijskoj adresi objekta", "isCorrect": false },
      { "text": "Sortiranje koje ne mijenja redoslijed", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između Comparable i Comparator sučelja?",
    "explanation": "Comparable<T> definira NATURAL ORDER - klasa sama implementira compareTo() metodu (jedan način sortiranja). Primjer: class Student implements Comparable<Student> { compareTo(Student other) }. Comparator<T> je EKSTERNO sučelje - možete imati VIŠE različitih načina sortiranja. Primjer: Comparator.comparing(Student::getName), Comparator.comparing(Student::getAge). Comparable = 'kako se objekti sortiraju prirodno', Comparator = 'custom sortiranje po potrebi'.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Comparable definira natural order (u klasi), Comparator eksterno (više načina)", "isCorrect": true },
      { "text": "Comparable je brži od Comparatora", "isCorrect": false },
      { "text": "Comparator radi samo s primitivnim tipovima", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "Comparable je za brojeve, Comparator za objekte", "isCorrect": false },
      { "text": "Comparator se ne može koristiti s Collections.sort()", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kako Collections.sort() sortira null vrijednosti?",
    "explanation": "Collections.sort() s natural order (bez Comparatora) baca NullPointerException ako lista sadrži null! Razlog: compareTo() metoda ne može raditi s null-om. Rješenje: koristiti Comparator.nullsFirst() ili nullsLast() koji stavljaju null vrijednosti na početak/kraj. Primjer: list.sort(Comparator.nullsLast(Comparator.naturalOrder())). Ili filtrirati null-ove prije sortiranja: list.removeIf(Objects::isNull).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Baca NullPointerException s natural order - treba Comparator.nullsFirst/Last()", "isCorrect": true },
      { "text": "Automatski stavlja null na kraj liste", "isCorrect": false },
      { "text": "Automatski stavlja null na početak liste", "isCorrect": false },
      { "text": "Ignoriše null vrijednosti", "isCorrect": false },
      { "text": "Zamjenjuje null s default vrijednostima", "isCorrect": false },
      { "text": "null vrijednosti se ne mogu sortirati", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što znači da Collections.sort() koristi 'stable sort' algoritam?",
    "explanation": "Stable sort znači da elementi s JEDNAKIM vrijednostima zadržavaju svoj originalni relativni redoslijed nakon sortiranja. Primjer: [(Ana,5), (Marko,3), (Petra,5)] sortirano po broju → [(Marko,3), (Ana,5), (Petra,5)] - Ana ostaje prije Petre jer je bila prije u originalnoj listi. Java koristi Timsort algoritam koji je stabilan. Nestabilni sort bi mogao zamijeniti Ana i Petra. Stabilnost je važna za višekriterijsko sortiranje.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Elementi s jednakim vrijednostima zadržavaju originalni redoslijed", "isCorrect": true },
      { "text": "Sortiranje ne pada nikad - uvijek uspijeva", "isCorrect": false },
      { "text": "Brzina sortiranja je konstantna O(n)", "isCorrect": false },
      { "text": "Ne mijenja originalnu listu", "isCorrect": false },
      { "text": "Uvijek vraća isti rezultat", "isCorrect": false },
      { "text": "Može sortirati bilo koji tip podataka", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koji algoritam koristi Collections.sort() u Java 7+ verzijama?",
    "explanation": "Java 7+ koristi Timsort algoritam (hibrid merge sort i insertion sort) za Collections.sort(). Timsort ima: O(n log n) worst-case kompleksnost, STABILAN je (čuva redoslijed jednakih elemenata), adaptivan (brži za već sortirane ili skoro sortirane podatke), optimiziran za realne podatke. Prije Java 7 koristio se modificirani merge sort. Arrays.sort() za primitive koristi Dual-Pivot Quicksort (nestabilan ali brži).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Timsort - hibrid merge/insertion sort, stabilan, O(n log n)", "isCorrect": true },
      { "text": "Quicksort - najbrži algoritam", "isCorrect": false },
      { "text": "Bubble sort - jednostavan algoritam", "isCorrect": false },
      { "text": "Heap sort - uvijek O(n log n)", "isCorrect": false },
      { "text": "Selection sort - O(n²)", "isCorrect": false },
      { "text": "Insertion sort - O(n²)", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kako sortirati listu u silaznom (descending) redoslijedu s Collections.sort()?",
    "explanation": "Tri načina za silazno sortiranje: (1) Collections.sort(list, Collections.reverseOrder()) - natural order obrnuto, (2) Collections.sort(list, Comparator.reverseOrder()) - isto (Java 8+), (3) list.sort(Comparator.reverseOrder()) - moderna sintaksa. Za custom Comparator: Comparator.comparing(Student::getAge).reversed(). Collections.reverse(list) NIJE dobro - to samo obrće listu, ne sortira! Pravilno: sortiraj pa obrni ili koristi reverseOrder().",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Collections.sort(list, Collections.reverseOrder()) ili Comparator.reverseOrder()", "isCorrect": true },
      { "text": "Collections.sort(list, true) - boolean parametar", "isCorrect": false },
      { "text": "Collections.sortDescending(list) - posebna metoda", "isCorrect": false },
      { "text": "Collections.reverse(list) - obrće listu", "isCorrect": false },
      { "text": "list.sort(-1) - negativan argument", "isCorrect": false },
      { "text": "Collections.sort(list, DESC) - konstanta", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što radi Comparator.comparing() metoda?",
    "explanation": "Comparator.comparing() kreira Comparator koji ekstraktira vrijednost (key) iz objekta i sortira po njoj. Prima Function<T,U> koja izvlači property. Primjer: Comparator.comparing(Student::getName) - sortira studente po imenu, Comparator.comparing(Student::getAge) - po godinama. Method reference (Student::getName) je kraći od lambda izraza (s -> s.getName()). Postoje varijante: comparingInt(), comparingDouble(), comparingLong() za primitive - efikasnije.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Kreira Comparator koji ekstraktira property i sortira po njemu", "isCorrect": true },
      { "text": "Uspoređuje dvije liste", "isCorrect": false },
      { "text": "Kombinira više Comparatora u jedan", "isCorrect": false },
      { "text": "Provjerava jesu li objekti jednaki", "isCorrect": false },
      { "text": "Sortira samo po imenu", "isCorrect": false },
      { "text": "Zamjenjuje Collections.sort() metodu", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kako sortirati listu po više kriterija s Comparator.thenComparing()?",
    "explanation": "thenComparing() omogućava višekriterijsko sortiranje - dodaje drugi (treći, četvrti...) kriterij ako su elementi jednaki po prvom. Sintaksa: Comparator.comparing(prvo).thenComparing(drugo).thenComparing(treće). Primjer: Comparator.comparing(Student::getAge).thenComparing(Student::getName) - prvo po godinama, unutar istih godina po imenu. Može se ulančavati beskonačno. Postoje varijante: thenComparingInt/Double/Long za primitive.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Dodaje dodatni kriterij sortiranja ako su elementi jednaki po prvom", "isCorrect": true },
      { "text": "Sortira dvije liste paralelno", "isCorrect": false },
      { "text": "Uspoređuje trenutno sortiranje s prethodnim", "isCorrect": false },
      { "text": "Kombinira rezultate dvaju sortiranja", "isCorrect": false },
      { "text": "Sortira samo ako prvi kriterij nije dovoljan", "isCorrect": false },
      { "text": "Radi prosječno sortiranje dva kriterija", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što se događa ako pokušate sortirati immutable listu s Collections.sort()?",
    "explanation": "Collections.sort() na immutable listi (List.of(), Arrays.asList() s fiksnom veličinom) baca UnsupportedOperationException! Razlog: sort() mora modificirati listu in-place, a immutable liste ne dozvoljavaju modifikacije. Rješenje: koristiti mutable listu (ArrayList): new ArrayList<>(List.of(...)).sort() ili Stream: list.stream().sorted().toList() (kreira novu listu). List.of() i Arrays.asList() nisu mutable!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Baca UnsupportedOperationException - immutable liste se ne mogu modificirati", "isCorrect": true },
      { "text": "Automatski kreira novu sortiranu listu", "isCorrect": false },
      { "text": "Sortira uspješno bez greške", "isCorrect": false },
      { "text": "Ignorira poziv i ne radi ništa", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false },
      { "text": "Vraća null", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između Comparator.naturalOrder() i Comparator.reverseOrder()?",
    "explanation": "Comparator.naturalOrder() sortira UZLAZNO po natural order (implementacija Comparable) - brojevi 1→10, stringovi a→z. Comparator.reverseOrder() sortira SILAZNO (obrnuto) - brojevi 10→1, stringovi z→a. Korištenje: list.sort(Comparator.naturalOrder()) ili list.sort(Comparator.reverseOrder()). naturalOrder() je ekvivalentan list.sort(null) za klase s Comparable. Oba vraćaju Comparator<T> objekt.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "naturalOrder() sortira uzlazno (1→10, a→z), reverseOrder() silazno (10→1, z→a)", "isCorrect": true },
      { "text": "naturalOrder() je brži od reverseOrder()", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "naturalOrder() radi samo s brojevima", "isCorrect": false },
      { "text": "reverseOrder() obrće listu nakon sortiranja", "isCorrect": false },
      { "text": "naturalOrder() ne mijenja redoslijed", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kako se Collections.sort() odnosi prema kopiranju liste?",
    "explanation": "Collections.sort() NE KREIRA kopiju liste - sortira IN-PLACE (na mjestu), modificira originalnu listu direktno! Ako trebate zadržati originalnu listu, morate RUČNO kreirati kopiju prije sortiranja: List<T> sorted = new ArrayList<>(original); Collections.sort(sorted). Ili koristiti Stream: List<T> sorted = original.stream().sorted().toList() - ovo vraća novu sortiranu listu bez mijenjanja originala. In-place sortiranje je efikasnije (O(1) memorija).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Ne kreira kopiju - sortira in-place i modificira originalnu listu", "isCorrect": true },
      { "text": "Automatski kreira kopiju prije sortiranja", "isCorrect": false },
      { "text": "Vraća novu sortiranu listu, čuva original", "isCorrect": false },
      { "text": "Kreira privremenu kopiju koja se briše", "isCorrect": false },
      { "text": "Kopira samo reference, ne objekte", "isCorrect": false },
      { "text": "Shallow copy prije sortiranja", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je vremenska kompleksnost Collections.sort() metode?",
    "explanation": "Collections.sort() ima O(n log n) worst-case vremensku kompleksnost koristeći Timsort algoritam. Best case: O(n) za već sortirane ili skoro sortirane podatke (adaptivnost Timsort-a). Average case: O(n log n). Prostorna kompleksnost: O(n) zbog privremenog array-a. Timsort je optimiziran za realne podatke koji često imaju već sortirane sekcije. Za n=1000 elemenata: ~10,000 operacija. Stabilan je i efikasan algoritam.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "O(n log n) worst-case, O(n) best-case za sortirane podatke", "isCorrect": true },
      { "text": "O(n²) uvijek", "isCorrect": false },
      { "text": "O(n) uvijek", "isCorrect": false },
      { "text": "O(log n) prosječno", "isCorrect": false },
      { "text": "O(1) za male liste", "isCorrect": false },
      { "text": "Zavisi od tipa podataka", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Collections.sort() može sortirati liste s null vrijednostima bez dodatne konfiguracije.",
    "explanation": "FALSE. Collections.sort() s natural order (bez custom Comparatora) baca NullPointerException ako lista sadrži null vrijednosti! Razlog: compareTo() metoda na null objektu pada. Rješenje: koristiti Comparator s null handling: Comparator.nullsFirst(Comparator.naturalOrder()) stavlja null-ove na početak, nullsLast() na kraj. Ili filtrirati null-ove prije sortiranja. Custom Comparator može ručno hendlati null-ove.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": false },
      { "text": "False", "isCorrect": true }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.sort()?",
    "codeSnippet": "List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));\nCollections.sort(numbers);\n\nSystem.out.println(numbers);",
    "explanation": "Ispisat će [1, 2, 5, 8, 9]. Collections.sort(numbers) sortira listu IN-PLACE po natural order (uzlazno za brojeve). Integer implementira Comparable tako da compareTo() sortira brojeve od najmanjeg ka najvećem. Lista je ArrayList (mutable) pa se može modificirati. Collections.sort() ne vraća ništa (void) - modificira originalnu listu direktno. Ovo je najjednostavniji način sortiranja liste.",
    "difficulty": "HARD",
    "options": [
      { "text": "[1, 2, 5, 8, 9]", "isCorrect": true },
      { "text": "[9, 8, 5, 2, 1]", "isCorrect": false },
      { "text": "[5, 2, 8, 1, 9]", "isCorrect": false },
      { "text": "Neće se kompilirati - sort() ne postoji", "isCorrect": false },
      { "text": "Baca UnsupportedOperationException", "isCorrect": false },
      { "text": "null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod kompilirati i izvršiti?",
    "codeSnippet": "List<String> words = List.of(\"Java\", \"Python\", \"C++\");\nCollections.sort(words);\n\nSystem.out.println(words);",
    "explanation": "Kod se kompilira ali PADA u runtime-u s UnsupportedOperationException! List.of() kreira IMMUTABLE listu koja se ne može modificirati. Collections.sort() pokušava sortirati in-place (modificirati listu), što nije dozvoljeno za immutable liste. Rješenje: (1) koristiti mutable listu: new ArrayList<>(List.of(...)), ili (2) koristiti Stream: List.of(...).stream().sorted().toList(). List.of() je immutable po dizajnu!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se ali pada u runtime-u s UnsupportedOperationException", "isCorrect": true },
      { "text": "Neće se kompilirati - List.of() nije kompatibilan s sort()", "isCorrect": false },
      { "text": "Kompilira se i ispisuje sortiranu listu", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "Automatski kreira novu sortiranu listu", "isCorrect": false },
      { "text": "Neće se kompilirati - Collections.sort() ne prima immutable liste", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.reverseOrder()?",
    "codeSnippet": "List<Integer> numbers = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));\nCollections.sort(numbers, Collections.reverseOrder());\n\nSystem.out.println(numbers);",
    "explanation": "Ispisat će [9, 8, 5, 2, 1]. Collections.reverseOrder() kreira Comparator koji sortira u SILAZNOM (descending) redoslijedu - obrnuto od natural order. Collections.sort(numbers, Collections.reverseOrder()) sortira brojeve od najvećeg ka najmanjem: 9→8→5→2→1. reverseOrder() je Comparator<T> koji obrće natural order comparison. Ekvivalentno: list.sort(Comparator.reverseOrder()).",
    "difficulty": "HARD",
    "options": [
      { "text": "[9, 8, 5, 2, 1]", "isCorrect": true },
      { "text": "[1, 2, 5, 8, 9]", "isCorrect": false },
      { "text": "[5, 2, 8, 1, 9]", "isCorrect": false },
      { "text": "Neće se kompilirati - reverseOrder() ne postoji", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false },
      { "text": "[9, 1, 8, 2, 5]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećem kodu s custom objektima:",
    "codeSnippet": "class Student {\n    String name;\n    int age;\n    \n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}\n\nList<Student> students = new ArrayList<>();\nstudents.add(new Student(\"Ana\", 20));\nstudents.add(new Student(\"Marko\", 22));\n\nCollections.sort(students);\nSystem.out.println(students);",
    "explanation": "Kod se NEĆE kompilirati! Greška: Student klasa ne implementira Comparable<Student> niti je providat Comparator. Collections.sort(list) bez Comparatora zahtijeva da elementi implementiraju Comparable. Rješenja: (1) Implementirati Comparable: class Student implements Comparable<Student> { compareTo(Student o) {...} }, ili (2) Providati Comparator: Collections.sort(students, Comparator.comparing(s -> s.age)). Kompajler error: 'no suitable method found for sort(List<Student>)'.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - Student ne implementira Comparable niti ima Comparator", "isCorrect": true },
      { "text": "Kompilira se i sortira po imenu", "isCorrect": false },
      { "text": "Kompilira se i sortira po dobi", "isCorrect": false },
      { "text": "Baca ClassCastException u runtime-u", "isCorrect": false },
      { "text": "Kompilira se ali ne sortira ništa", "isCorrect": false },
      { "text": "Neće se kompilirati - Collections.sort() ne radi s custom klasama", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Comparator lambda izrazom?",
    "codeSnippet": "record Person(String name, int age) {}\n\nList<Person> people = new ArrayList<>();\npeople.add(new Person(\"Ana\", 25));\npeople.add(new Person(\"Marko\", 20));\npeople.add(new Person(\"Petra\", 30));\n\nCollections.sort(people, (p1, p2) -> Integer.compare(p1.age(), p2.age()));\n\nSystem.out.println(people.get(0).name());",
    "explanation": "Ispisat će 'Marko'. Lambda (p1, p2) -> Integer.compare(p1.age(), p2.age()) kreira Comparator koji sortira osobe po dobi uzlazno. Integer.compare(a, b) vraća -1 (a<b), 0 (a==b), +1 (a>b). Sortiranje: Marko(20), Ana(25), Petra(30). people.get(0) vraća prvi element nakon sortiranja što je Marko. Records automatski generiraju getters (age(), name()). Moderniji način: Comparator.comparingInt(Person::age).",
    "difficulty": "HARD",
    "options": [
      { "text": "Marko", "isCorrect": true },
      { "text": "Ana", "isCorrect": false },
      { "text": "Petra", "isCorrect": false },
      { "text": "Neće se kompilirati - lambda ne radi s Collections.sort()", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu s null vrijednostima?",
    "codeSnippet": "List<String> words = new ArrayList<>();\nwords.add(\"Java\");\nwords.add(null);\nwords.add(\"Python\");\n\nCollections.sort(words);\nSystem.out.println(words);",
    "explanation": "Kod će baciti NullPointerException! Collections.sort() s natural order ne može sortirati null vrijednosti jer poziva compareTo() na elementima, a null.compareTo() pada. Rješenje: koristiti Comparator koji hendla null-ove: Collections.sort(words, Comparator.nullsLast(Comparator.naturalOrder())) stavlja null na kraj. Ili nullsFirst() za null na početak. Ili filtrirati null-ove prije sortiranja: words.removeIf(Objects::isNull).",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca NullPointerException - treba Comparator.nullsFirst/Last()", "isCorrect": true },
      { "text": "Kompilira se i automatski stavlja null na kraj", "isCorrect": false },
      { "text": "Neće se kompilirati - null nije dozvoljen u listi", "isCorrect": false },
      { "text": "Ispisuje [Java, Python, null]", "isCorrect": false },
      { "text": "Automatski preskače null vrijednosti", "isCorrect": false },
      { "text": "Zamjenjuje null s praznim stringom", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Comparator.comparing() kompilirati?",
    "codeSnippet": "record Student(String name, int points) {}\n\nList<Student> students = new ArrayList<>();\nstudents.add(new Student(\"Ana\", 95));\nstudents.add(new Student(\"Marko\", 85));\nstudents.add(new Student(\"Petra\", 90));\n\nCollections.sort(students, Comparator.comparing(Student::points));\n\nSystem.out.println(students.get(0).name());",
    "explanation": "Kompilira se i ispisuje 'Marko'. Comparator.comparing(Student::points) kreira Comparator koji sortira studente po bodovima uzlazno. Student::points je method reference na getter - kraće od lambda s -> s.points(). Sortiranje: Marko(85), Petra(90), Ana(95). students.get(0) vraća prvog (najmanje bodova) što je Marko. Za silazno: Comparator.comparing(Student::points).reversed(). comparingInt() bi bio efikasniji za int.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 'Marko' - sortira po bodovima uzlazno", "isCorrect": true },
      { "text": "Neće se kompilirati - comparing() ne postoji", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 'Ana'", "isCorrect": false },
      { "text": "Baca ClassCastException", "isCorrect": false },
      { "text": "Neće se kompilirati - Student::points ne radi", "isCorrect": false },
      { "text": "Ispisuje 'Petra'", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s višekriterijskim sortiranjem?",
    "codeSnippet": "record Person(String name, int age) {}\n\nList<Person> people = new ArrayList<>();\npeople.add(new Person(\"Ana\", 25));\npeople.add(new Person(\"Marko\", 25));\npeople.add(new Person(\"Petra\", 20));\n\nComparator<Person> comp = Comparator\n    .comparingInt(Person::age)\n    .thenComparing(Person::name);\n    \nCollections.sort(people, comp);\n\nSystem.out.println(people.get(0).name() + \" \" + people.get(1).name());",
    "explanation": "Ispisat će 'Petra Ana'. Višekriterijsko sortiranje: prvo po age uzlazno (20, 25, 25), zatim za iste godine po name abecednim redom (Ana < Marko). Konačan redoslijed: Petra(20), Ana(25), Marko(25). people.get(0) je Petra, get(1) je Ana. thenComparing() dodaje drugi kriterij za razrješavanje tie-ova (jednakih vrijednosti po prvom kriteriju). comparingInt() je efikasniji od comparing() za int tipove.",
    "difficulty": "HARD",
    "options": [
      { "text": "Petra Ana", "isCorrect": true },
      { "text": "Ana Marko", "isCorrect": false },
      { "text": "Marko Petra", "isCorrect": false },
      { "text": "Neće se kompilirati - thenComparing() ne postoji", "isCorrect": false },
      { "text": "Ana Petra", "isCorrect": false },
      { "text": "Petra Marko", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite razliku u rezultatu sljedećih dvaju pristupa:",
    "codeSnippet": "List<Integer> numbers1 = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));\nCollections.sort(numbers1);\n\nList<Integer> numbers2 = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));\nList<Integer> sorted2 = numbers2.stream().sorted().toList();\n\nSystem.out.println(numbers1 == numbers2);\nSystem.out.println(numbers1.equals(sorted2));",
    "explanation": "Ispisat će false i true. Collections.sort(numbers1) sortira IN-PLACE - modificira numbers1 direktno na [1,2,5,8,9]. stream().sorted().toList() kreira NOVU sortiranu listu - numbers2 ostaje [5,2,8,1,9], sorted2 je [1,2,5,8,9]. numbers1 == numbers2 je false (različiti objekti). numbers1.equals(sorted2) je true (obje sortirane liste imaju iste elemente [1,2,5,8,9]). Stream pristup čuva original!",
    "difficulty": "HARD",
    "options": [
      { "text": "false i true - Collections.sort() mijenja original, Stream ne", "isCorrect": true },
      { "text": "true i true", "isCorrect": false },
      { "text": "false i false", "isCorrect": false },
      { "text": "true i false", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "Baca ConcurrentModificationException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Comparator.nullsLast()?",
    "codeSnippet": "List<String> words = new ArrayList<>();\nwords.add(\"Java\");\nwords.add(null);\nwords.add(\"Python\");\nwords.add(\"C++\");\n\nCollections.sort(words, Comparator.nullsLast(Comparator.naturalOrder()));\n\nSystem.out.println(words);",
    "explanation": "Ispisat će [C++, Java, Python, null]. Comparator.nullsLast() stavlja null vrijednosti NA KRAJ liste. Comparator.naturalOrder() sortira non-null elemente abecednim redom: C++ < Java < Python. null ide na kraj. nullsLast() wrap-a drugi Comparator i hendla null-ove prije delegiranja sortiranja. Za null na početak koristite nullsFirst(). Ovo je JEDINI siguran način sortiranja lista s null-ovima.",
    "difficulty": "HARD",
    "options": [
      { "text": "[C++, Java, Python, null]", "isCorrect": true },
      { "text": "[null, C++, Java, Python]", "isCorrect": false },
      { "text": "[Java, Python, C++, null]", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "[Java, Python, null, C++]", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s List.sort() kompilirati?",
    "codeSnippet": "List<String> words = new ArrayList<>(Arrays.asList(\"Java\", \"Python\", \"C++\"));\nwords.sort(null);\n\nSystem.out.println(words);",
    "explanation": "Kompilira se i ispisuje [C++, Java, Python]. List.sort(null) sortira po NATURAL ORDER - null Comparator znači 'koristi Comparable.compareTo()'. Ekvivalentno Collections.sort(words) ili words.sort(Comparator.naturalOrder()). String implementira Comparable pa se sortira abecednim (leksikografskim) redom. List.sort(null) je validna sintaksa i često se koristi. Moderniji od Collections.sort(words).",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje [C++, Java, Python] - null znači natural order", "isCorrect": true },
      { "text": "Neće se kompilirati - ne može biti null", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "Ne sortira ništa", "isCorrect": false },
      { "text": "Ispisuje [Java, Python, C++]", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu s komparacijom Stringova?",
    "codeSnippet": "List<String> words = new ArrayList<>();\nwords.add(\"apple\");\nwords.add(\"Apple\");\nwords.add(\"APPLE\");\n\nCollections.sort(words);\nSystem.out.println(words);",
    "explanation": "Ispisat će [APPLE, Apple, apple]. String.compareTo() je CASE-SENSITIVE - sortira po ASCII/Unicode vrijednostima: velika slova (A=65) dolaze PRIJE malih (a=97). Redoslijed: APPLE < Apple < apple. Za case-insensitive sortiranje koristite: Collections.sort(words, String.CASE_INSENSITIVE_ORDER) ili words.sort(String::compareToIgnoreCase). Ovo je česta zamka - natural order za String je case-sensitive!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ispisuje [APPLE, Apple, apple] - String sortiranje je case-sensitive", "isCorrect": true },
      { "text": "Ispisuje [apple, Apple, APPLE]", "isCorrect": false },
      { "text": "Neće se kompilirati - duplikati nisu dozvoljeni", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false },
      { "text": "Ispisuje [Apple, apple, APPLE]", "isCorrect": false },
      { "text": "Automatski sortira case-insensitive", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeći kod s Comparator.reversed()?",
    "codeSnippet": "record Product(String name, double price) {}\n\nList<Product> products = new ArrayList<>();\nproducts.add(new Product(\"A\", 100.0));\nproducts.add(new Product(\"B\", 50.0));\nproducts.add(new Product(\"C\", 150.0));\n\nCollections.sort(products, \n    Comparator.comparingDouble(Product::price).reversed());\n\nSystem.out.println(products.get(0).name());",
    "explanation": "Ispisat će 'C'. Comparator.comparingDouble(Product::price) sortira po cijeni uzlazno, .reversed() OBRĆE sortiranje na silazno (highest first). Sortiranje: C(150.0), A(100.0), B(50.0). products.get(0) vraća prvi element (najskupljiji) što je C. reversed() MORA biti na kraju lanca - obrće finalni Comparator. Za obratno: Comparator.comparingDouble(Product::price) bi dao B(50.0) prvog.",
    "difficulty": "HARD",
    "options": [
      { "text": "C", "isCorrect": true },
      { "text": "A", "isCorrect": false },
      { "text": "B", "isCorrect": false },
      { "text": "Neće se kompilirati - reversed() ne postoji", "isCorrect": false },
      { "text": "Baca ClassCastException", "isCorrect": false },
      { "text": "null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedećih dvaju pristupa za case-insensitive sortiranje?",
    "codeSnippet": "List<String> words1 = new ArrayList<>(Arrays.asList(\"Java\", \"python\", \"C++\"));\nCollections.sort(words1, String.CASE_INSENSITIVE_ORDER);\n\nList<String> words2 = new ArrayList<>(Arrays.asList(\"Java\", \"python\", \"C++\"));\nCollections.sort(words2, (s1, s2) -> s1.compareToIgnoreCase(s2));",
    "explanation": "Nema razlike - oba pristupa daju isti rezultat [C++, Java, python] (case-insensitive sortiranje). String.CASE_INSENSITIVE_ORDER je predefiniran Comparator koji ignorira velika/mala slova. Lambda (s1, s2) -> s1.compareToIgnoreCase(s2) radi isto ručno. String.CASE_INSENSITIVE_ORDER je PREFERIRANO - kraće, čitljivije, optimizirano. Oba sortiraju: C++ < Java < python (ignorirajući case).",
    "difficulty": "HARD",
    "options": [
      { "text": "Nema razlike - oba daju isti rezultat, String.CASE_INSENSITIVE_ORDER je preferirano", "isCorrect": true },
      { "text": "Pristup 1 je brži od Pristupa 2", "isCorrect": false },
      { "text": "Pristup 2 je case-sensitive, Pristup 1 nije", "isCorrect": false },
      { "text": "Pristup 1 sortira silazno, Pristup 2 uzlazno", "isCorrect": false },
      { "text": "Neće se kompilirati - CASE_INSENSITIVE_ORDER ne postoji", "isCorrect": false },
      { "text": "Pristup 1 modificira original, Pristup 2 kreira kopiju", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se događa u sljedećem kodu s stabilnim sortiranjem?",
    "codeSnippet": "record Person(String name, int age) {}\n\nList<Person> people = new ArrayList<>();\npeople.add(new Person(\"Ana\", 25));\npeople.add(new Person(\"Marko\", 25));\npeople.add(new Person(\"Petra\", 25));\n\nCollections.sort(people, Comparator.comparingInt(Person::age));\n\nSystem.out.println(people.get(0).name() + \" \" + \n                   people.get(1).name() + \" \" + \n                   people.get(2).name());",
    "explanation": "Ispisat će 'Ana Marko Petra'. Svi imaju istu dob (25), pa comparingInt(Person::age) ih smatra JEDNAKIMA. Collections.sort() koristi STABILNI algoritam (Timsort) - elementi s jednakim vrijednostima zadržavaju ORIGINALNI redoslijed. Ana je bila prva, Marko drugi, Petra treća - taj redoslijed ostaje nakon sortiranja. Nestabilni sort bi mogao zamijeniti redoslijed. Stabilnost je ključna za višekriterijsko sortiranje!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ana Marko Petra - stabilno sortiranje čuva originalni redoslijed jednakih", "isCorrect": true },
      { "text": "Petra Marko Ana - obrće redoslijed", "isCorrect": false },
      { "text": "Random redoslijed - nestabilno sortiranje", "isCorrect": false },
      { "text": "Neće se kompilirati - svi imaju istu dob", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false },
      { "text": "Marko Ana Petra", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje moderne Java sintakse možemo zamijeniti Collections.sort()?",
    "codeSnippet": "List<String> words = new ArrayList<>(Arrays.asList(\"Java\", \"Python\", \"C++\"));\nCollections.sort(words);\n\n// Modernije alternative?",
    "explanation": "Moderne alternative: (1) List.sort(null) ili list.sort(Comparator.naturalOrder()) - instance metoda (Java 8+), (2) list.stream().sorted().toList() - kreira novu listu (Java 16+ s toList()), (3) list.sort() je NAJMODERNIJI za in-place sortiranje. Collections.sort() je legacy (pre-Java 8). Best practice: koristite list.sort() za in-place ili stream().sorted().toList() ako trebate zadržati original. List.sort() je čitljiviji i idiomatskiji.",
    "difficulty": "HARD",
    "options": [
      { "text": "list.sort(null) ili list.sort(Comparator.naturalOrder()) - moderniji (Java 8+)", "isCorrect": true },
      { "text": "list.sortNatural() - nova metoda", "isCorrect": false },
      { "text": "Collections.modernSort(list)", "isCorrect": false },
      { "text": "list.autoSort()", "isCorrect": false },
      { "text": "Nema modernije alternative", "isCorrect": false },
      { "text": "Arrays.sort(list) - zamjena", "isCorrect": false }
    ]
  }
]
}
