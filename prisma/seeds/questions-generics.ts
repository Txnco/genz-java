import { QuestionType, Difficulty } from '@prisma/client'

export const genericsQuestions = {
  lectureSlug: 'generics',
  questions: [
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je glavna svrha i prednost korištenja Generics-a u Javi?",
    "explanation": "Generics omogućavaju type safety u compile-time - greške se otkrivaju prije izvođenja programa, ne tijekom izvođenja. Eliminiraju potrebu za eksplicitnim castingom, omogućavaju reusability koda (jedna klasa/metoda radi s više tipova), i čine kod čitljivijim jer je jasno s kojim tipovima radimo. Bez Generics-a (pre-Java 5) sve se radilo s Object tipom što je bilo opasno i dovodilo do ClassCastException u runtime-u.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Type safety u compile-time - greške se otkrivaju prije izvođenja programa", "isCorrect": true },
      { "text": "Brže izvršavanje programa u runtime-u", "isCorrect": false },
      { "text": "Automatsko sortiranje kolekcija", "isCorrect": false },
      { "text": "Smanjenje veličine bytecode-a", "isCorrect": false },
      { "text": "Omogućavanje rada s primitivnim tipovima u kolekcijama", "isCorrect": false },
      { "text": "Automatsko upravljanje memorijom", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su prednosti korištenja Generics-a u odnosu na stari način (pre-Java 5)?",
    "explanation": "Generics donose: (1) Type safety u compile-time - kompajler provjerava tipove odmah, ne u runtime-u, (2) Eliminacija eksplicitnog castinga - ne treba više pisati (String) lista.get(0), (3) Reusability koda - jedna generička klasa može raditi s bilo kojim tipom, (4) Čitljiviji kod - jasno se vidi List<String> što lista sadrži. Bez Generics-a sve je bilo Object tip što je dovodilo do ClassCastException.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Type safety u compile-time - greške se hvataju odmah", "isCorrect": true },
      { "text": "Eliminacija castinga - čitljiviji kod bez (Type) cast", "isCorrect": true },
      { "text": "Reusability - jedna klasa radi s više tipova", "isCorrect": true },
      { "text": "Automatska paralelizacija koda", "isCorrect": false },
      { "text": "Brže izvršavanje u runtime-u", "isCorrect": false },
      { "text": "Mogućnost korištenja primitivnih tipova direktno", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su konvencionalna imena za type parameters u Generics-u?",
    "explanation": "Java konvencija koristi velika jednoslovna imena: T (Type) za opći tip, E (Element) za element u kolekciji, K (Key) i V (Value) za Map strukture, N (Number) za numeričke tipove. Ovo su univerzalne konvencije koje razumije svaki Java developer. Primjer: List<E>, Map<K,V>, Box<T>. Nikad ne koristite cijele riječi kao type parametre.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "T (Type), E (Element), K (Key), V (Value), N (Number)", "isCorrect": true },
      { "text": "Type, Element, Key, Value - cijele riječi", "isCorrect": false },
      { "text": "A, B, C, D - abecednim redom", "isCorrect": false },
      { "text": "X, Y, Z - koordinatni sistem", "isCorrect": false },
      { "text": "G, H, I, J - proizvoljno", "isCorrect": false },
      { "text": "Generic, Param, Arg - opisna imena", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je bounded type parameter i kako se koristi?",
    "explanation": "Bounded type parameter ograničava koje tipove generic može prihvatiti koristeći 'extends' keyword. Primjer: <T extends Number> znači da T može biti Number ili bilo koja klasa koja nasljeđuje Number (Integer, Double, Float...). Ovo omogućava pozivanje metoda iz Number klase na T objektima. Koristi se kada trebamo pristupiti određenim metodama/svojstvima tipa. Sintaksa: <T extends ClassName>.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Ograničava tipove koje generic može prihvatiti koristeći 'extends' keyword", "isCorrect": true },
      { "text": "Definira maksimalni broj parametara koje metoda može imati", "isCorrect": false },
      { "text": "Limitira broj elemenata u generičkoj kolekciji", "isCorrect": false },
      { "text": "Sprječava nasljeđivanje generičke klase", "isCorrect": false },
      { "text": "Postavlja defaultnu vrijednost za type parameter", "isCorrect": false },
      { "text": "Određuje je li tip immutable", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što označava wildcard ? u Generics-u?",
    "explanation": "Wildcard ? označava 'nepoznati tip' i koristi se kada ne znamo ili ne brinemo o konkretnom tipu. List<?> može biti lista bilo kojeg tipa - List<String>, List<Integer>, itd. Koristi se u situacijama gdje metoda samo čita elemente ili ne ovisi o konkretnom tipu. Omogućava maksimalnu fleksibilnost. Primjer: void printList(List<?> list) - radi za sve tipove.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Označava 'nepoznati tip' - može biti bilo koji tip", "isCorrect": true },
      { "text": "Označava null vrijednost u generičkoj kolekciji", "isCorrect": false },
      { "text": "Označava opcioni parametar tipa", "isCorrect": false },
      { "text": "Koristi se za označavanje grešaka u tipu", "isCorrect": false },
      { "text": "Zamjenjuje sve type parametre", "isCorrect": false },
      { "text": "Koristi se samo za primitivne tipove", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što znači <? extends Type> u Generics-u?",
    "explanation": "Upper bounded wildcard <? extends Type> znači 'bilo koji tip koji JE ili NASLJEĐUJE Type'. Primjer: List<? extends Number> može biti List<Integer>, List<Double>, List<Long>, ali NE List<String>. Koristi se kada želimo ČITATI podatke iz kolekcije. PECS princip: Producer Extends - koristi extends kada je kolekcija proizvođač/izvor podataka. Ne možemo pisati u takvu kolekciju (osim null).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Bilo koji tip koji JE ili NASLJEĐUJE Type - koristi se za čitanje (Producer)", "isCorrect": true },
      { "text": "Samo Type, ne podklase", "isCorrect": false },
      { "text": "Bilo koji tip osim Type", "isCorrect": false },
      { "text": "Type i njegove nadklase", "isCorrect": false },
      { "text": "Type koji se može ekstendirati", "isCorrect": false },
      { "text": "Type koji implementira Extendable interface", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što znači <? super Type> u Generics-u?",
    "explanation": "Lower bounded wildcard <? super Type> znači 'bilo koji tip koji JE ili NADKLASA od Type'. Primjer: List<? super Integer> može biti List<Integer>, List<Number>, List<Object>, ali NE List<Double>. Koristi se kada želimo PISATI podatke u kolekciju. PECS princip: Consumer Super - koristi super kada je kolekcija potrošač/odredište podataka. Možemo sigurno dodavati Type objekte u takvu kolekciju.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Bilo koji tip koji JE ili NADKLASA od Type - koristi se za pisanje (Consumer)", "isCorrect": true },
      { "text": "Samo Type, ne nadklase", "isCorrect": false },
      { "text": "Type i njegove podklase", "isCorrect": false },
      { "text": "Bilo koji tip osim Type", "isCorrect": false },
      { "text": "Type koji je superior u hijerarhiji", "isCorrect": false },
      { "text": "Type koji implementira Super interface", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je PECS princip u Generics-u?",
    "explanation": "PECS = Producer Extends, Consumer Super - zlatno pravilo za wildcards. Producer Extends: ako ČITAŠ/DOBAVLJAŠ iz kolekcije, koristi <? extends T>. Consumer Super: ako PIŠEŠ/DODAJEŠ u kolekciju, koristi <? super T>. Primjer iz Java Collections API: Collections.copy(List<? super T> dest, List<? extends T> src) - čitamo iz src (producer), pišemo u dest (consumer). Ovo osigurava type safety.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Producer Extends, Consumer Super - pravilo za korištenje wildcards", "isCorrect": true },
      { "text": "Performance Enhancement for Collections System", "isCorrect": false },
      { "text": "Private Extends Class System", "isCorrect": false },
      { "text": "Parallel Execution Control System", "isCorrect": false },
      { "text": "Pattern Extension Code Standard", "isCorrect": false },
      { "text": "Public Encapsulation Class Specification", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je type erasure u Java Generics-u?",
    "explanation": "Type erasure je proces kojim Java kompajler UKLANJA sve informacije o generičkim tipovima tijekom kompilacije zbog backward kompatibilnosti. List<String> postaje List, <T> postaje Object, <T extends Number> postaje Number. Type parametri ne postoje u runtime-u - sve informacije o tipovima se brišu. Posljedice: ne možemo new T(), new T[], instanceof T, ili pristupiti type info u runtime-u.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Proces kojim kompajler uklanja informacije o generičkim tipovima u bytecode-u", "isCorrect": true },
      { "text": "Automatsko brisanje nepotrebnih tipova iz koda", "isCorrect": false },
      { "text": "Funkcija za brisanje podataka iz generičkih kolekcija", "isCorrect": false },
      { "text": "Mehanizam za čišćenje memorije generičkih objekata", "isCorrect": false },
      { "text": "Optimizacija koja uklanja generičke klase iz programa", "isCorrect": false },
      { "text": "Tool za uklanjanje type parametara iz koda", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Što NE možete raditi zbog type erasure-a?",
    "explanation": "Zbog type erasure-a NE možete: (1) Kreirati instancu generičkog tipa: new T() - tip ne postoji u runtime-u, (2) Kreirati array generičkog tipa: new T[10] - Java ne dopušta, (3) Koristiti instanceof s type parametrom: obj instanceof T - tip se briše, (4) Pristupati static članovima s type parametrom - static ne može ovisiti o instanci. Type informacije ne postoje u runtime-u zbog backward kompatibilnosti.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Kreirati instancu generičkog tipa: new T()", "isCorrect": true },
      { "text": "Kreirati array generičkog tipa: new T[10]", "isCorrect": true },
      { "text": "Koristiti instanceof s type parametrom", "isCorrect": true },
      { "text": "Koristiti List<T> u metodi", "isCorrect": false },
      { "text": "Deklarirati generičku klasu", "isCorrect": false },
      { "text": "Kreirati više instanci generičke klase", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su raw types u Javi i zašto ih treba izbjegavati?",
    "explanation": "Raw type je korištenje generičke klase BEZ type parametara (npr. List umjesto List<String>). Postoji samo zbog backward kompatibilnosti s pre-Java 5 kodom. Raw types su OPASNI: nema type safety, potreban je casting, kompajler samo daje warning (ne error), i mogu uzrokovati ClassCastException u runtime-u. NIKAD ne koristite raw types u modernom kodu - uvijek specificirajte type parameter.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Korištenje generičke klase bez type parametara - opasno i treba izbjegavati", "isCorrect": true },
      { "text": "Primitivni tipovi u Generics-u", "isCorrect": false },
      { "text": "Tipovi koji se ne mogu nasljeđivati", "isCorrect": false },
      { "text": "Original definicija tipa prije kompilacije", "isCorrect": false },
      { "text": "Tipovi bez enkapsulacije", "isCorrect": false },
      { "text": "Neformatirani tipovi podataka", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Možete koristiti primitivne tipove direktno kao type parametre u Generics-u (npr. List<int>).",
    "explanation": "FALSE. Generics NE podržavaju primitivne tipove direktno. Ne možete pisati List<int>, List<double>, itd. Razlog: Generics rade samo s objektima (referentnim tipovima), a primitivni tipovi nisu objekti. Morate koristiti wrapper klase: List<Integer>, List<Double>, List<Boolean>. Java automatski vrši autoboxing/unboxing za konverziju int ↔ Integer.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": false },
      { "text": "False", "isCorrect": true }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Gdje se deklarira type parameter <T> u generičkoj metodi?",
    "explanation": "Type parameter <T> se deklarira PRIJE povratnog tipa metode. Sintaksa: public <T> T methodName(T param). <T> mora biti prvo, pa onda povratni tip (koji može biti i T), pa ime metode. Primjer: public static <T extends Comparable<T>> T maximum(T x, T y). Ovo je često mjesto grešaka - ne zaboravite staviti <T> prije povratnog tipa!",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Prije povratnog tipa metode: public <T> T methodName()", "isCorrect": true },
      { "text": "Nakon povratnog tipa: public T <T> methodName()", "isCorrect": false },
      { "text": "Prije modifikatora pristupa: <T> public T methodName()", "isCorrect": false },
      { "text": "Unutar zagrada parametara: public T methodName(<T> param)", "isCorrect": false },
      { "text": "Na kraju potpisa metode: public T methodName() <T>", "isCorrect": false },
      { "text": "Ne deklarira se, Java ga automatski zaključuje", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su dobre prakse (best practices) za korištenje Generics-a?",
    "explanation": "Best practices: (1) Eliminirajte raw types - uvijek koristite type parametre, (2) Koristite diamond operator <> (Java 7+) - List<String> list = new ArrayList<>();, (3) Preferirajte liste nad arrayima za Generics - lista je type-safe, array ne, (4) Koristite PECS princip za wildcards, (5) Bounded types kada je potrebno ograničenje. Izbjegavajte casting i instanceof s Generics.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Eliminirajte raw types - uvijek specificirajte tip", "isCorrect": true },
      { "text": "Koristite diamond operator <> za kraći kod", "isCorrect": true },
      { "text": "Preferirajte liste nad arrayima za type safety", "isCorrect": true },
      { "text": "Koristite instanceof za provjeru generičkih tipova", "isCorrect": false },
      { "text": "Kreirajte array-e generičkih tipova: new T[10]", "isCorrect": false },
      { "text": "Izbjegavajte bounded types zbog kompleksnosti", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Generics-om kompilirati?",
    "codeSnippet": "List<String> lista = new ArrayList<>();\nlista.add(\"Java\");\nlista.add(\"Generics\");\nlista.add(123);\n\nString prvi = lista.get(0);",
    "explanation": "Kod se NEĆE kompilirati. Greška je na liniji lista.add(123) - pokušaj dodavanja Integer-a (123) u List<String>. Ovo je upravo prednost Generics-a - compile-time type safety! Kompajler hvata grešku odmah i javlja: 'incompatible types: int cannot be converted to String'. Bez Generics-a (raw type List), ovo bi se kompiliralo ali bi palo u runtime-u s ClassCastException.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - ne možete dodati Integer u List<String>", "isCorrect": true },
      { "text": "Kompilira se i izvršava uspješno", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u", "isCorrect": false },
      { "text": "Neće se kompilirati - List ne može biti String", "isCorrect": false },
      { "text": "Kompilira se jer 123 se automatski konvertira u String", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje diamond operator", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeća generička metoda?",
    "codeSnippet": "public static <T> void printArray(T[] array) {\n    for (T element : array) {\n        System.out.print(element + \" \");\n    }\n    System.out.println();\n}\n\npublic static void main(String[] args) {\n    Integer[] brojevi = {1, 2, 3, 4, 5};\n    printArray(brojevi);\n    \n    String[] imena = {\"Ana\", \"Marko\"};\n    printArray(imena);\n}",
    "explanation": "Kod će se kompilirati i ispisati '1 2 3 4 5' u prvom redu i 'Ana Marko' u drugom redu. printArray() je generička metoda koja radi s bilo kojim tipom. <T> prije void označava da metoda koristi generički tip. printArray(brojevi) zaključuje T=Integer, printArray(imena) zaključuje T=String. Ovo demonstrira reusability Generics-a - jedna metoda radi za sve tipove.",
    "difficulty": "HARD",
    "options": [
      { "text": "1 2 3 4 5 u prvom redu, Ana Marko u drugom redu", "isCorrect": true },
      { "text": "Neće se kompilirati - T je nepoznat tip", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException", "isCorrect": false },
      { "text": "Ispisuje samo brojeve, imena ne", "isCorrect": false },
      { "text": "Neće se kompilirati - array ne može biti generički", "isCorrect": false },
      { "text": "Ispisuje hashcode objеkata", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećem kodu s bounded type:",
    "codeSnippet": "public static <T> double sum(List<T> list) {\n    double total = 0;\n    for (T element : list) {\n        total += element.doubleValue();\n    }\n    return total;\n}",
    "explanation": "Greška je što T nije bounded - ne možemo pozvati doubleValue() na T jer ne znamo da je to Number. Rješenje: dodati bound <T extends Number>. Ispravan kod: public static <T extends Number> double sum(List<T> list). Tek tada kompajler zna da T ima doubleValue() metodu jer Number je bounded type. Bez bounded type, T je tretiran kao Object koji nema doubleValue().",
    "difficulty": "HARD",
    "options": [
      { "text": "T mora biti bounded: <T extends Number> jer doubleValue() nije u Object", "isCorrect": true },
      { "text": "List<T> ne može biti parametar metode", "isCorrect": false },
      { "text": "doubleValue() ne postoji - treba koristiti intValue()", "isCorrect": false },
      { "text": "Metoda mora biti void, ne double", "isCorrect": false },
      { "text": "Nema greške - kod je ispravan", "isCorrect": false },
      { "text": "total mora biti T tip, ne double", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s wildcard-om?",
    "codeSnippet": "public static void printList(List<?> list) {\n    for (Object element : list) {\n        System.out.println(element);\n    }\n}\n\npublic static void main(String[] args) {\n    List<Integer> brojevi = List.of(1, 2, 3);\n    List<String> rijeci = List.of(\"Java\", \"Generics\");\n    \n    printList(brojevi);\n    printList(rijeci);\n}",
    "explanation": "Kod će se kompilirati i ispisati: 1, 2, 3 (svaki u svom redu), pa Java, Generics (svaki u svom redu). List<?> je unbounded wildcard - metoda prihvaća listu BILO KOJEG tipa. Unutar metode možemo čitati elemente samo kao Object (najopćenitiji tip). Wildcard ? omogućava maksimalnu fleksibilnost - ista metoda radi za List<Integer>, List<String>, List<Any>.",
    "difficulty": "HARD",
    "options": [
      { "text": "1, 2, 3, Java, Generics - svaki u svom redu", "isCorrect": true },
      { "text": "Neće se kompilirati - wildcard ne može biti u for petlji", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException", "isCorrect": false },
      { "text": "Ispisuje samo brojeve, ne stringove", "isCorrect": false },
      { "text": "Neće se kompilirati - List<?> nije valjan tip", "isCorrect": false },
      { "text": "Ispisuje hashcode umjesto vrijednosti", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećoj generičkoj klasi?",
    "codeSnippet": "public class Box<T> {\n    private T content;\n    \n    public void setContent(T content) {\n        this.content = content;\n    }\n    \n    public T getContent() {\n        return content;\n    }\n    \n    public T createNewContent() {\n        return new T();\n    }\n}",
    "explanation": "Greška je u metodi createNewContent() - NE možete kreirati instancu generičkog tipa s new T(). Razlog je type erasure - T ne postoji u runtime-u, briše se u Object. Java ne zna kako kreirati instancu nepoznatog tipa. Rješenja: (1) Prosljediti Class<T> objekt i koristiti reflection, (2) Prosljediti Supplier<T> factory, ili (3) Ne pokušavati kreirati instance T.",
    "difficulty": "HARD",
    "options": [
      { "text": "Ne može se kreirati instanca T s new T() zbog type erasure", "isCorrect": true },
      { "text": "Nedostaje konstruktor u Box klasi", "isCorrect": false },
      { "text": "T mora biti bounded type", "isCorrect": false },
      { "text": "getContent() mora biti static", "isCorrect": false },
      { "text": "Nema greške - kod je ispravan", "isCorrect": false },
      { "text": "content mora biti public", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s upper bounded wildcard kompilirati?",
    "codeSnippet": "public static double sumNumbers(List<? extends Number> list) {\n    double total = 0;\n    for (Number num : list) {\n        total += num.doubleValue();\n    }\n    return total;\n}\n\npublic static void main(String[] args) {\n    List<Integer> ints = List.of(1, 2, 3);\n    List<Double> doubles = List.of(1.5, 2.5);\n    \n    System.out.println(sumNumbers(ints));\n    System.out.println(sumNumbers(doubles));\n}",
    "explanation": "Kod će se kompilirati i ispisati 6.0 i 4.0. List<? extends Number> prihvaća listu bilo kojeg tipa koji JE ili NASLJEĐUJE Number (Integer, Double, Long, Float...). Ovo je PECS princip - Producer Extends: čitamo iz liste (producer). Možemo sigurno čitati elemente kao Number. sumNumbers(ints) radi jer Integer extends Number, sumNumbers(doubles) radi jer Double extends Number.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 6.0 i 4.0", "isCorrect": true },
      { "text": "Neće se kompilirati - Integer nije Number", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException", "isCorrect": false },
      { "text": "Neće se kompilirati - wildcard ne može biti bounded", "isCorrect": false },
      { "text": "Ispisuje samo prvi rezultat", "isCorrect": false },
      { "text": "Neće se kompilirati - doubleValue() ne postoji", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se događa u sljedećem kodu s lower bounded wildcard?",
    "codeSnippet": "public static void addNumbers(List<? super Integer> list) {\n    list.add(1);\n    list.add(2);\n    list.add(3);\n}\n\npublic static void main(String[] args) {\n    List<Integer> intList = new ArrayList<>();\n    List<Number> numList = new ArrayList<>();\n    List<Object> objList = new ArrayList<>();\n    \n    addNumbers(intList);\n    addNumbers(numList);\n    addNumbers(objList);\n    \n    System.out.println(intList.size() + \" \" + numList.size() + \" \" + objList.size());\n}",
    "explanation": "Ispisat će '3 3 3'. List<? super Integer> prihvaća listu tipa koji JE ili NADKLASA od Integer (Integer, Number, Object). Ovo je PECS princip - Consumer Super: pišemo u listu (consumer). Možemo sigurno dodati Integer objekte u sve tri liste jer: Integer je Integer, Integer je Number, Integer je Object. Svaka lista dobiva 3 elementa.",
    "difficulty": "HARD",
    "options": [
      { "text": "3 3 3", "isCorrect": true },
      { "text": "Neće se kompilirati - ne možete dodati u wildcard listu", "isCorrect": false },
      { "text": "9 0 0", "isCorrect": false },
      { "text": "Kompilira se ali baca UnsupportedOperationException", "isCorrect": false },
      { "text": "Neće se kompilirati - Object nije super od Integer", "isCorrect": false },
      { "text": "0 0 0", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećem kodu s raw type-om:",
    "codeSnippet": "public static void main(String[] args) {\n    List users = new ArrayList();\n    users.add(\"Ana\");\n    users.add(123);\n    users.add(new Object());\n    \n    for (Object obj : users) {\n        String user = (String) obj;\n        System.out.println(user.toUpperCase());\n    }\n}",
    "explanation": "Kod će se kompilirati (s compiler warning o raw type-u), ali PADA u runtime-u s ClassCastException. Problem je raw type List - nema type safety. Lista prihvaća SVE (String, Integer, Object). Casting (String) obj radi za 'Ana', ali pada za 123 i new Object(). Rješenje: koristiti List<String> - tada kompajler ne bi dozvolio dodavanje 123. Ovo je razlog zašto NIKAD ne koristimo raw types!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se ali pada u runtime-u s ClassCastException - raw type je opasan", "isCorrect": true },
      { "text": "Neće se kompilirati - raw types nisu dozvoljeni", "isCorrect": false },
      { "text": "Kompilira se i izvršava uspješno", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje type parameter", "isCorrect": false },
      { "text": "Kompilira se ali ispisuje samo 'Ana'", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će vratiti sljedeća generička metoda s multiple bounds?",
    "codeSnippet": "public static <T extends Number & Comparable<T>> T maximum(T x, T y) {\n    if (x.compareTo(y) > 0) {\n        return x;\n    }\n    return y;\n}\n\npublic static void main(String[] args) {\n    System.out.println(maximum(10, 20));\n    System.out.println(maximum(5.5, 2.2));\n}",
    "explanation": "Ispisat će 20 i 5.5. <T extends Number & Comparable<T>> znači da T mora biti Number I implementirati Comparable - multiple bounds. Integer i Double zadovoljavaju oba uvjeta. maximum(10, 20): x=10, y=20, 10.compareTo(20) < 0, vraća y=20. maximum(5.5, 2.2): x=5.5, y=2.2, 5.5.compareTo(2.2) > 0, vraća x=5.5. Multiple bounds omogućavaju korištenje metoda iz oba tipa.",
    "difficulty": "HARD",
    "options": [
      { "text": "20 i 5.5", "isCorrect": true },
      { "text": "10 i 2.2", "isCorrect": false },
      { "text": "Neće se kompilirati - ne možete imati dva bounds", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException", "isCorrect": false },
      { "text": "Neće se kompilirati - Integer ne implementira Comparable", "isCorrect": false },
      { "text": "20 i 2.2", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s generičkim Stack-om kompilirati?",
    "codeSnippet": "public class Stack<T> {\n    private List<T> elements = new ArrayList<>();\n    \n    public void push(T element) {\n        elements.add(element);\n    }\n    \n    public T pop() {\n        if (elements.isEmpty()) {\n            throw new RuntimeException(\"Stack je prazan\");\n        }\n        return elements.remove(elements.size() - 1);\n    }\n}\n\npublic static void main(String[] args) {\n    Stack<String> stringStack = new Stack<>();\n    stringStack.push(\"Java\");\n    stringStack.push(\"Generics\");\n    System.out.println(stringStack.pop());\n}",
    "explanation": "Kod će se kompilirati i ispisati 'Generics'. Stack<T> je pravilno napisana generička klasa. Stack<String> specificira T=String. push() dodaje elemente na kraj liste. pop() uklanja i vraća zadnji element (LIFO - Last In First Out). Dodajemo 'Java', pa 'Generics'. pop() uklanja i vraća 'Generics' (zadnji dodan). Ovo demonstrira kako jedna generička klasa može raditi s bilo kojim tipom.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 'Generics'", "isCorrect": true },
      { "text": "Neće se kompilirati - Stack ne može biti generički", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 'Java'", "isCorrect": false },
      { "text": "Baca EmptyStackException", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje type parameter u new ArrayList()", "isCorrect": false },
      { "text": "Kompilira se ali vraća null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se događa u sljedećem kodu nakon type erasure?",
    "codeSnippet": "// Source kod\npublic class Calculator<T extends Number> {\n    private T value;\n    \n    public double getValue() {\n        return value.doubleValue();\n    }\n}\n\n// Što postaje nakon type erasure?",
    "explanation": "Nakon type erasure, T se zamjenjuje s Number (ne s Object!). Bounded type <T extends Number> se briše u svoj bound - Number. Kod postaje: public class Calculator { private Number value; public double getValue() { return value.doubleValue(); } }. Ovo je razlog zašto bounded types omogućavaju pozivanje metoda - Number ima doubleValue(). Unbounded <T> bi se zamijenio s Object.",
    "difficulty": "HARD",
    "options": [
      { "text": "T se zamjenjuje s Number (bounded type se briše u svoj bound)", "isCorrect": true },
      { "text": "T se zamjenjuje s Object uvijek", "isCorrect": false },
      { "text": "Cijela klasa se briše", "isCorrect": false },
      { "text": "T ostaje kao T u bytecode-u", "isCorrect": false },
      { "text": "Type erasure ne utječe na klase", "isCorrect": false },
      { "text": "T se zamjenjuje s Calculator", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s diamond operatorom (Java 7+)?",
    "codeSnippet": "public static void main(String[] args) {\n    List<String> lista1 = new ArrayList<String>();\n    List<String> lista2 = new ArrayList<>();\n    \n    lista1.add(\"Java\");\n    lista2.add(\"Generics\");\n    \n    System.out.println(lista1.getClass() == lista2.getClass());\n    System.out.println(lista1.get(0) + \" \" + lista2.get(0));\n}",
    "explanation": "Ispisat će true i 'Java Generics'. Diamond operator <> (Java 7+) je shorthand koji omogućava da ne pišete redundantno tip s desne strane. Kompajler automatski zaključuje tip iz lijeve strane. new ArrayList<>() je isto kao new ArrayList<String>(). lista1.getClass() == lista2.getClass() vraća true jer su oba ArrayList. Obje liste rade identično - diamond operator je samo sintaksni šećer.",
    "difficulty": "HARD",
    "options": [
      { "text": "true i 'Java Generics'", "isCorrect": true },
      { "text": "false i 'Java Generics'", "isCorrect": false },
      { "text": "Neće se kompilirati - diamond operator ne radi tako", "isCorrect": false },
      { "text": "true i null", "isCorrect": false },
      { "text": "Baca ClassCastException", "isCorrect": false },
      { "text": "Neće se kompilirati - lista2 nema tip", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedećih dviju deklaracija?",
    "codeSnippet": "// Deklaracija 1\npublic static void printList1(List<Object> list) {\n    for (Object obj : list) {\n        System.out.println(obj);\n    }\n}\n\n// Deklaracija 2\npublic static void printList2(List<?> list) {\n    for (Object obj : list) {\n        System.out.println(obj);\n    }\n}\n\n// Korištenje\nList<String> stringList = List.of(\"A\", \"B\");\nprintList1(stringList);\nprintList2(stringList);",
    "explanation": "printList1(stringList) NEĆE se kompilirati jer List<String> NIJE List<Object> u Javi - generici nisu kovarijantni! List<Object> prihvaća SAMO List<Object>, ne List<String>. printList2(stringList) HOĆE se kompilirati jer List<?> prihvaća listu BILO KOJEG tipa - List<String>, List<Integer>, itd. Wildcard ? omogućava fleksibilnost. Ovo je česta zamka - List<Object> nije isto što i List<?>!",
    "difficulty": "HARD",
    "options": [
      { "text": "printList1 ne radi s List<String> - List<Object> nije supertip, printList2 radi - wildcard prihvaća sve", "isCorrect": true },
      { "text": "Nema razlike, obje rade isto", "isCorrect": false },
      { "text": "printList1 je brža od printList2", "isCorrect": false },
      { "text": "printList2 ne može čitati elemente", "isCorrect": false },
      { "text": "Obje metode ne rade s List<String>", "isCorrect": false },
      { "text": "printList1 može pisati u listu, printList2 ne može", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s varargs i Generics kompilirati?",
    "codeSnippet": "@SafeVarargs\npublic static <T> List<T> createList(T... elements) {\n    List<T> list = new ArrayList<>();\n    for (T element : elements) {\n        list.add(element);\n    }\n    return list;\n}\n\npublic static void main(String[] args) {\n    List<Integer> brojevi = createList(1, 2, 3, 4, 5);\n    List<String> imena = createList(\"Ana\", \"Marko\", \"Petra\");\n    \n    System.out.println(brojevi.size() + \" \" + imena.size());\n}",
    "explanation": "Kod će se kompilirati i ispisati '5 3'. @SafeVarargs anotacija označava da metoda sigurno koristi varargs s generičkim tipom. T... elements omogućava proizvoljan broj argumenata istog tipa. createList(1, 2, 3, 4, 5) kreira listu od 5 Integer-a. createList('Ana', 'Marko', 'Petra') kreira listu od 3 String-a. Varargs s Generics može uzrokovati 'heap pollution' upozorenja, pa koristimo @SafeVarargs.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje '5 3'", "isCorrect": true },
      { "text": "Neće se kompilirati - varargs ne radi s Generics", "isCorrect": false },
      { "text": "Kompilira se ali daje upozorenje bez @SafeVarargs", "isCorrect": false },
      { "text": "Baca HeapPollutionException", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje @SuppressWarnings", "isCorrect": false },
      { "text": "Ispisuje '0 0'", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedeća dva pristupa?",
    "codeSnippet": "// Pristup 1 - Generička metoda\npublic static <T> void swap(T[] array, int i, int j) {\n    T temp = array[i];\n    array[i] = array[j];\n    array[j] = temp;\n}\n\n// Pristup 2 - Generička klasa\npublic class ArrayUtils<T> {\n    public void swap(T[] array, int i, int j) {\n        T temp = array[i];\n        array[i] = array[j];\n        array[j] = temp;\n    }\n}",
    "explanation": "Pristup 1 (generička metoda) je BOLJI za utility metode - poziva se direktno: swap(array, 0, 1). Ne treba kreirati instancu. Pristup 2 (generička klasa) zahtijeva kreiranje instance: new ArrayUtils<Integer>().swap(array, 0, 1). Generičke metode su preferirane za statičke utility funkcije koje ne drže stanje. Generičke klase koriste se kada trebate držati stanje (npr. Box<T>, Stack<T>).",
    "difficulty": "HARD",
    "options": [
      { "text": "Pristup 1 je bolji za utility metode - ne treba instanca, Pristup 2 zahtijeva instancu klase", "isCorrect": true },
      { "text": "Pristup 2 je brži u izvođenju", "isCorrect": false },
      { "text": "Pristup 1 ne može raditi s arrayima", "isCorrect": false },
      { "text": "Nema razlike, oba rade isto", "isCorrect": false },
      { "text": "Pristup 1 zahtijeva više memorije", "isCorrect": false },
      { "text": "Pristup 2 omogućava multiple bounds, Pristup 1 ne", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje metode možemo kreirati immutable listu u Java 9+ s type inferenceom?",
    "codeSnippet": "// Kako kreirati immutable listu stringova?",
    "explanation": "U Java 9+: List<String> lista = List.of('A', 'B', 'C'). List.of() je factory metoda koja kreira immutable listu. Type inference automatski zaključuje List<String>. S var keywordom (Java 10+): var lista = List.of('A', 'B', 'C') - još kraće! Lista se ne može mijenjati (add, remove bacaju UnsupportedOperationException). List.of() je moderniji način od Arrays.asList() i kreira pravilno immutable kolekcije.",
    "difficulty": "HARD",
    "options": [
      { "text": "List.of(\"A\", \"B\", \"C\") ili var lista = List.of(\"A\", \"B\", \"C\")", "isCorrect": true },
      { "text": "new ImmutableList<>(\"A\", \"B\", \"C\")", "isCorrect": false },
      { "text": "Collections.immutableList(\"A\", \"B\", \"C\")", "isCorrect": false },
      { "text": "List.create(\"A\", \"B\", \"C\")", "isCorrect": false },
      { "text": "ArrayList.of(\"A\", \"B\", \"C\")", "isCorrect": false },
      { "text": "List<String> lista = {\"A\", \"B\", \"C\"}", "isCorrect": false }
    ]
  }
]
}
