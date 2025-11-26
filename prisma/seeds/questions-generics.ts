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
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je JEDINA ispravna izjava o Type Erasure u Javi?",
    "explanation": "Type erasure pretvara List<String> u List (raw type), <T> u Object, a <T extends Number> u Number (prvi bound). Type erasure se događa SAMO u compile-time, ne u runtime-u! Nakon kompilacije, ALL generički tipovi su obrisani iz bytecode-a. Ne možete koristiti instanceof s parametriziranim tipovima jer informacija o tipu ne postoji u runtime-u: if (obj instanceof List<String>) NE RADI. Možete instanceof List (raw), ali ne List<String>. Type parameter informacija je dostupna kroz reflection (getGenericSuperclass), ali to su compile-time informacije sačuvane u meta-podacima, ne runtime tipovi.",
    "difficulty": "HARD",
    "options": [
      { "text": "List<String> se pretvara u List, <T> u Object, <T extends Number> u Number", "isCorrect": true },
      { "text": "List<String> se pretvara u List<Object>, <T> u null, <T extends Number> u Integer", "isCorrect": false },
      { "text": "Type erasure se događa u runtime-u i uklanja sve generičke informacije", "isCorrect": false },
      { "text": "Nakon type erasure možete koristiti instanceof s List<String>", "isCorrect": false },
      { "text": "Type erasure pretvara sve generičke tipove u java.lang.Generic klasu", "isCorrect": false },
      { "text": "List<String> ostaje List<String> u bytecode-u zbog backward compatibility", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih izjava o bounded type parameters su TOČNE? (Odaberite sve točne)",
    "explanation": "TOČNE izjave: (1) Možete imati multiple bounds: <T extends Number & Comparable<T>> je validno. (2) Klasa (ako postoji) MORA biti prva: <T extends String & Serializable> je OK, ali <T extends Serializable & String> NE radi jer String je klasa. (3) Možete koristiti metode iz svih boundova: ako je <T extends Number & Comparable<T>>, možete pozvati i doubleValue() (iz Number) i compareTo() (iz Comparable). NETOČNE: Ne možete imati više klasa jer Java ne podržava multiple inheritance (<T extends Number & Integer> je GREŠKA). Redoslijed interface-a NIJE BITAN: <T extends Number & Serializable & Cloneable> i <T extends Number & Cloneable & Serializable> su EKVIVALENTNI.",
    "difficulty": "HARD",
    "options": [
      { "text": "Možete imati multiple bounds: <T extends Number & Comparable<T>>", "isCorrect": true },
      { "text": "Klasa (ako postoji) mora biti prva u listi bounds", "isCorrect": true },
      { "text": "Možete koristiti metode iz svih boundova u tijelu metode", "isCorrect": true },
      { "text": "Možete imati više klasa u bounds: <T extends Number & Integer>", "isCorrect": false },
      { "text": "Redoslijed interface-a u bounds je bitan i ne može se mijenjati", "isCorrect": false },
      { "text": "Bounded types automatski implementiraju sve metode iz boundova", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s recursive type bounds kompilirati i izvršiti?",
    "codeSnippet": "interface Comparable<T> {\n    int compareTo(T other);\n}\n\nclass Node<T extends Comparable<T>> {\n    T value;\n    \n    Node(T value) {\n        this.value = value;\n    }\n    \n    boolean isGreaterThan(Node<T> other) {\n        return value.compareTo(other.value) > 0;\n    }\n}\n\nclass MyNumber implements Comparable<MyNumber> {\n    int val;\n    \n    MyNumber(int val) {\n        this.val = val;\n    }\n    \n    public int compareTo(MyNumber other) {\n        return Integer.compare(val, other.val);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Node<MyNumber> node1 = new Node<>(new MyNumber(10));\n        Node<MyNumber> node2 = new Node<>(new MyNumber(5));\n        \n        System.out.println(node1.isGreaterThan(node2));\n    }\n}",
    "explanation": "Kod se kompilira i ispisuje 'true'! Ovo je RECURSIVE TYPE BOUND: <T extends Comparable<T>> znači da T mora implementirati Comparable<T> - klasa mora biti usporediva sa SAMOM SOBOM! MyNumber implements Comparable<MyNumber> zadovoljava ovaj uvjet. node1.value.compareTo(node2.value) radi jer MyNumber implementira compareTo(MyNumber). 10 > 5 pa vraća true. Recursive bounds su ČESTI u Javi: Enum<E extends Enum<E>>, Comparable<T> pattern. Ovo omogućava compile-time sigurnost da možete uspoređivati objekte istog tipa. WICHTIG: Ako MyNumber implementira Comparable<Object> umjesto Comparable<MyNumber>, NE bi prošlo Node<MyNumber>!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 'true' - recursive bound je zadovoljen", "isCorrect": true },
      { "text": "Neće se kompilirati - recursive bounds nisu dozvoljeni", "isCorrect": false },
      { "text": "Kompilira se ali baca StackOverflowError - beskonačna rekurzija", "isCorrect": false },
      { "text": "Neće se kompilirati - T ne može biti u svom vlastitom boundu", "isCorrect": false },
      { "text": "Ispisuje 'false' - compareTo vraća obrnutu vrijednost", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što se događa kada pokušate kreirati generički array s new T[size]?",
    "explanation": "Ne možete kreirati generički array s new T[size] zbog TYPE ERASURE! U runtime-u, T je obrisan u Object (ili prvi bound), ali array mora znati TOČAN tip u runtime-u za memory allocation i type checking. new T[] postaje new Object[] što ne odgovara očekivanom tipu. Kompajler daje grešku: 'generic array creation'. Workaround: (1) new Object[size] pa unsafe cast na T[], (2) Array.newInstance(clazz, size) s Class<T> parametrom, (3) koristiti ArrayList<T> umjesto array-a. List<T>[] također ne radi - arrays su REIFIED (imaju runtime tip info), generics su ERASED (nemaju runtime tip info) - NE mogu se kombinirati!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompajler daje grešku 'generic array creation' zbog type erasure", "isCorrect": true },
      { "text": "Kreira Object[] array koji se automatski kastuje u T[]", "isCorrect": false },
      { "text": "Radi ispravno i kreira pravi T[] array u runtime-u", "isCorrect": false },
      { "text": "Baca GenericArrayCreationException u runtime-u", "isCorrect": false },
      { "text": "Kreira array ali svi elementi su null i ne mogu se postaviti", "isCorrect": false },
      { "text": "new T[size] radi samo ako T extends Object[]", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih operacija MOŽETE napraviti s List<? extends Number>? (Odaberite sve točne)",
    "explanation": "MOŽETE: (1) Number num = list.get(0) - PRODUCER čita, vraća Number ili njegovu podklasu što se može spremiti u Number referencu. (2) list.size() - metode koje ne ovise o tipu rade uvijek. (3) list.clear() - briše sve elemente, ne dodaje ništa pa je OK. NE MOŽETE: list.add(10) - ne možete DODAVATI ništa osim null! Kompajler ne zna je li lista List<Integer>, List<Double> ili List<Number>, pa ne može garantirati type safety. Također ne možete list.add(new Integer(5)) ili bilo što drugo osim null. Integer value = list.get(0) također NE RADI jer get() vraća UNKNOWN tip koji extends Number, ne garantira Integer!",
    "difficulty": "HARD",
    "options": [
      { "text": "Number num = list.get(0)", "isCorrect": true },
      { "text": "list.size()", "isCorrect": true },
      { "text": "list.clear()", "isCorrect": true },
      { "text": "list.add(10)", "isCorrect": false },
      { "text": "list.add(new Integer(5))", "isCorrect": false },
      { "text": "Integer value = list.get(0)", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite SVE greške u sljedećem kodu s wildcards i PECS pravilom:",
    "codeSnippet": "public class PECSTest {\n    public static void copy1(List<? extends Number> dest, \n                            List<? extends Number> src) {\n        for (Number num : src) {\n            dest.add(num);\n        }\n    }\n    \n    public static void copy2(List<? super Number> dest,\n                            List<? extends Number> src) {\n        for (Number num : src) {\n            dest.add(num);\n        }\n    }\n    \n    public static void copy3(List<? super Integer> dest,\n                            List<? extends Number> src) {\n        for (Number num : src) {\n            dest.add(num);\n        }\n    }\n    \n    public static void main(String[] args) {\n        List<Number> numbers = new ArrayList<>();\n        numbers.add(10);\n        \n        List<Integer> integers = new ArrayList<>();\n        integers.add(5);\n        \n        copy1(numbers, integers);\n        copy2(numbers, integers);\n        copy3(integers, numbers);\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) copy1() - dest.add(num) NE RADI! dest je List<? extends Number> što je PRODUCER - ne možete dodavati elemente (osim null). Kompajler greška: 'cannot add Number to List<? extends Number>'. (2) copy3() - dest.add(num) također NE RADI jer dest je List<? super Integer> što prihvaća Integer i njegove nadklase, ali num je Number koji MOŽE biti Double ili Float, ne samo Integer! Ne možete dodati Number u List<? super Integer>. copy2() je JEDINA ispravna - dest je CONSUMER (super) koji prihvaća Number, src je PRODUCER (extends) iz kojeg čitamo Number. PECS: Producer Extends (čitaj), Consumer Super (piši)!",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - copy1 ne može add u extends wildcard, copy3 ne može add Number u super Integer", "isCorrect": true },
      { "text": "1 greška - samo copy1 je problematična", "isCorrect": false },
      { "text": "3 greške - sve tri metode su pogrešne", "isCorrect": false },
      { "text": "0 grešaka - PECS pravilo dopušta sve operacije", "isCorrect": false },
      { "text": "2 greške - copy1 i copy2 su pogrešne, copy3 je ispravna", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između List<?> (unbounded wildcard) i List<Object>?",
    "explanation": "List<?> je lista NEPOZNATOG tipa - može biti List<String>, List<Integer>, bilo što. Ne možete dodavati ništa osim null jer kompajler ne zna tip! Možete samo čitati kao Object. List<Object> je lista koja SADRŽI Object elemente - možete dodavati bilo koji objekt! KLJUČNA razlika: List<?> list = new ArrayList<String>() RADI, ali List<Object> list = new ArrayList<String>() NE RADI (generics nisu covariant)! List<?> je supertype svih Lista, List<Object> je specifičan tip. List<?>.add() ne radi (osim null), List<Object>.add() radi za bilo što. List<?> se koristi kada ne želite mijenjati listu, samo je čitati/iterirati.",
    "difficulty": "HARD",
    "options": [
      { "text": "List<?> je nepoznat tip gdje ne možete dodavati, List<Object> sadrži Object i možete dodavati", "isCorrect": true },
      { "text": "Nema razlike - oboje su ekvivalentni generic Object tipu", "isCorrect": false },
      { "text": "List<?> prihvaća samo null, List<Object> prihvaća bilo što", "isCorrect": false },
      { "text": "List<Object> ne može se kastovati u List<?>, ali obrnuto može", "isCorrect": false },
      { "text": "List<?> se pretvara u List<Object> nakon type erasure-a", "isCorrect": false },
      { "text": "List<Object> je raw type, List<?> je parametrizirani tip", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s type witness i diamond operator?",
    "codeSnippet": "public class TypeInferenceTest {\n    public static <T> T firstElement(List<T> list) {\n        return list.isEmpty() ? null : list.get(0);\n    }\n    \n    public static void main(String[] args) {\n        List<String> list1 = new ArrayList<>();\n        list1.add(\"Java\");\n        \n        String s1 = firstElement(list1);\n        \n        List<Integer> list2 = new ArrayList<>();\n        list2.add(42);\n        \n        String s2 = firstElement(list2);\n        \n        System.out.println(s1 + \" \" + s2);\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Greška: String s2 = firstElement(list2) - firstElement vraća T koji je INFERRED kao Integer (iz list2), ne String! Kompajler ne može konvertirati Integer u String. Greška: 'incompatible types: Integer cannot be converted to String'. s1 radi jer list1 je List<String> pa T = String. Type inference automatski zaključuje T iz argumenta, ali return tip mora odgovarati deklariranoj varijabli! Rješenje: Integer s2 = firstElement(list2) ili koristiti type witness: String s2 = TypeInferenceTest.<String>firstElement(list2) (ali ovo bi bacilo ClassCastException u runtime).",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - firstElement(list2) vraća Integer, ne String", "isCorrect": true },
      { "text": "Ispisuje 'Java 42' - autoboxing automatski pretvara", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException u runtime-u", "isCorrect": false },
      { "text": "Ispisuje 'Java null' - Integer se ne može kastovati u String pa je null", "isCorrect": false },
      { "text": "Neće se kompilirati - diamond operator ne radi s generičkim metodama", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su POSLJEDICE type erasure-a u Javi? (Odaberite sve točne)",
    "explanation": "TOČNE posljedice: (1) Ne možete new T() jer T je obrisano u Object/bound. (2) Ne možete new T[] jer arrays zahtijevaju runtime tip info. (3) instanceof s parametriziranim tipovima ne radi jer tip info ne postoji u runtime-u. (4) Overloading s različitim generičkim tipovima ne radi: void process(List<String>) i void process(List<Integer>) imaju ISTU signature nakon erasure (oboje List). NETOČNA: Generički tipovi nisu sporiji - nema runtime overhead jer su obrisani! Također, možete koristiti reflection da dohvatite generičke informacije iz class meta-podataka (ali ne iz instance).",
    "difficulty": "HARD",
    "options": [
      { "text": "Ne možete kreirati instancu generičkog tipa: new T()", "isCorrect": true },
      { "text": "Ne možete kreirati generički array: new T[]", "isCorrect": true },
      { "text": "Ne možete koristiti instanceof s parametriziranim tipovima", "isCorrect": true },
      { "text": "Ne možete overloadati metode s različitim generičkim tipovima", "isCorrect": true },
      { "text": "Generički tipovi su sporiji od non-generičkih zbog runtime provjera", "isCorrect": false },
      { "text": "Ne možete koristiti reflection s generičkim klasama", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što se događa kada koristite raw type List umjesto List<T>?",
    "explanation": "Raw type List gubi SVE type safety provjere! Možete dodati BILO ŠTO (String, Integer, Object) bez kompajler greške, ali dobijete unchecked warning. U runtime-u možete dobiti ClassCastException kada pokušate izvući element i kastovati ga. Raw types postoje SAMO za backward compatibility s pre-Java 5 kodom. Kompajler daje 'unchecked' upozorenja, ne greške. list.get() vraća Object pa morate ručno kastovati. Raw type bypass-a sve generičke provjere pa možete dobiti 'heap pollution' gdje objekti različitih tipova završe u istoj listi. NIKAD ne koristiti raw types u modernom kodu!",
    "difficulty": "HARD",
    "options": [
      { "text": "Gubite type safety, dobijate unchecked warnings, možete dobiti ClassCastException", "isCorrect": true },
      { "text": "Kompajler automatski inferira tip iz prvog elementa koji dodate", "isCorrect": false },
      { "text": "Raw type je ekvivalentan List<Object> i ima istu sigurnost", "isCorrect": false },
      { "text": "Ne možete dodavati elemente u raw type List bez castanja", "isCorrect": false },
      { "text": "Raw type radi samo s primitivnim tipovima, ne objektima", "isCorrect": false },
      { "text": "Raw types su brži jer ne rade runtime type checking", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s generičkim record-ima kompilirati?",
    "codeSnippet": "record Pair<T, U>(T first, U second) {\n    public Pair {\n        if (first == null || second == null) {\n            throw new IllegalArgumentException(\"Null values not allowed\");\n        }\n    }\n    \n    public <V> Pair<T, V> withSecond(V newSecond) {\n        return new Pair<>(first, newSecond);\n    }\n    \n    public static <A, B> Pair<A, B> of(A first, B second) {\n        return new Pair<>(first, second);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Pair<String, Integer> pair1 = new Pair<>(\"Java\", 25);\n        Pair<String, Double> pair2 = pair1.withSecond(3.14);\n        Pair<Integer, String> pair3 = Pair.of(42, \"Answer\");\n        \n        System.out.println(pair2.first() + \" \" + pair2.second());\n        System.out.println(pair3.first() + \" \" + pair3.second());\n    }\n}",
    "explanation": "Kod se kompilira i ispisuje 'Java 3.14' i '42 Answer'! Generički records su potpuno validni i KOMBINIRAJU prednosti records (immutability, auto-generated metode) s generičkim tipovima. Compact constructor (public Pair) radi validaciju. withSecond() je NOVA generička metoda s vlastitim type parametrom V - mijenja tip drugog elementa! pair1<String, Integer>.withSecond(3.14) vraća Pair<String, Double>. Pair.of() je static factory metoda s type inference - kompajler zaključuje A=Integer, B=String iz argumenata. Records s generics su MODERAN i ČIST način za kreiranje immutable parametriziranih klasa!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 'Java 3.14' i '42 Answer' - generički records rade", "isCorrect": true },
      { "text": "Neće se kompilirati - records ne mogu biti generički", "isCorrect": false },
      { "text": "Neće se kompilirati - compact constructor ne može s generičkim tipovima", "isCorrect": false },
      { "text": "Kompilira se ali baca NullPointerException", "isCorrect": false },
      { "text": "Neće se kompilirati - generička metoda u record nije dozvoljena", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih deklaracija bounded type parametara su VALIDNE? (Odaberite sve točne)",
    "explanation": "VALIDNE: (1) <T extends Number & Comparable<T>> - klasa prva, zatim interface. (2) <T extends Comparable<T> & Serializable> - dva interface-a, redoslijed OK. (3) <T extends Number & Comparable<T> & Serializable> - klasa prva, onda interface-i. NEVALIDNE: (4) <T extends Integer & Number> - NE radi jer Integer i Number su OBE KLASE, može biti samo jedna klasa! (5) <T extends Comparable<T> & Number> - NE radi jer Number je KLASA i mora biti PRVA ako postoji! (6) <T super Number> - NEMA 'super' za type parameters, samo za wildcards! Type parameters mogu samo 'extends', wildcards mogu 'extends' i 'super'.",
    "difficulty": "HARD",
    "options": [
      { "text": "<T extends Number & Comparable<T>>", "isCorrect": true },
      { "text": "<T extends Comparable<T> & Serializable>", "isCorrect": true },
      { "text": "<T extends Number & Comparable<T> & Serializable>", "isCorrect": true },
      { "text": "<T extends Integer & Number>", "isCorrect": false },
      { "text": "<T extends Comparable<T> & Number>", "isCorrect": false },
      { "text": "<T super Number>", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto ne možete koristiti primitive tipove kao generičke parametre (npr. List<int>)?",
    "explanation": "Primitive tipovi NE mogu biti generički parametri zbog TYPE ERASURE! Generički tipovi se brišu u Object (ili prvi bound) koji je REFERENTNI tip. int nije objekt pa ne može biti Object. Arrays zahtijevaju da elementi imaju pravu memorijsku reprezentaciju - Object[] sadrži reference, int[] sadrži vrijednosti direktno. Ne mogu se kombinirati! Rješenje: autoboxing s wrapper klasama - List<Integer>. BUDUĆNOST: Project Valhalla (Java 25+) planira Primitive Type Specialization gdje List<int> neće raditi boxing nego će imati specijaliziranu implementaciju za svaki primitivni tip!",
    "difficulty": "HARD",
    "options": [
      { "text": "Type erasure pretvara tipove u Object, a primitive tipovi nisu objekti", "isCorrect": true },
      { "text": "Primitive tipovi su preveliki za generičke strukture podataka", "isCorrect": false },
      { "text": "JVM ne podržava primitive tipove u heap memoriji", "isCorrect": false },
      { "text": "Generički parametri moraju imati konstruktore, a primitive nemaju", "isCorrect": false },
      { "text": "List<int> bi zauzeo previše memorije zbog boxing overheada", "isCorrect": false },
      { "text": "Primitive tipovi se automatski pretvaraju u String pa bi bio konflikt", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se događa u sljedećem kodu s covariance i arrays vs generics?",
    "codeSnippet": "public class CovarianceTest {\n    public static void main(String[] args) {\n        // Arrays SU covariant\n        Integer[] intArray = {1, 2, 3};\n        Number[] numArray = intArray;\n        numArray[0] = 4.5;\n        \n        // Generics NISU covariant\n        List<Integer> intList = new ArrayList<>();\n        intList.add(1);\n        List<Number> numList = intList;\n        numList.add(4.5);\n        \n        System.out.println(\"Done\");\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati na liniji List<Number> numList = intList! Generics su INVARIANT - List<Integer> NIJE podtip List<Number>! Kompajler greška: 'incompatible types: List<Integer> cannot be converted to List<Number>'. ZANIMLJIVO: Array dio bi se KOMPILIRAO (arrays SU covariant - Integer[] JE podtip Number[]), ali bi PALA u runtime-u s ArrayStoreException na numArray[0] = 4.5 jer stvarni array je Integer[] i ne može držati Double! Ovo je DESIGN FLAW u Java arrays. Generics POPRAVLJAJU ovo - compile-time error umjesto runtime! Wildcards omogućuju kovarijansu: List<? extends Number> numList = intList radi!",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - generics nisu covariant, List<Integer> nije List<Number>", "isCorrect": true },
      { "text": "Kompilira se ali pada na numArray[0]=4.5 s ArrayStoreException", "isCorrect": false },
      { "text": "Kompilira se i radi - oboje arrays i generics su covariant", "isCorrect": false },
      { "text": "Neće se kompilirati - arrays nisu covariant", "isCorrect": false },
      { "text": "Kompilira se ali pada na numList.add(4.5) s ClassCastException", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje operacije MOŽETE napraviti s List<? super Integer>? (Odaberite sve točne)",
    "explanation": "MOŽETE: (1) list.add(10) - CONSUMER prihvaća Integer i njegove podklase. (2) list.add(new Integer(5)) - isto. (3) Object obj = list.get(0) - get() vraća UNKNOWN super-tip, najsigurniji je Object. (4) list.size() i list.clear() - uvijek rade. NE MOŽETE: Number num = list.get(0) - get() NE garantira Number! Lista može biti List<Object> ili List<Number>, ali get() vraća zajednički supertype što je Object. Integer val = list.get(0) - isto, ne garantira Integer. list.add(new Double(3.14)) - ne možete dodati Double jer super Integer ne znači super Number!",
    "difficulty": "HARD",
    "options": [
      { "text": "list.add(10)", "isCorrect": true },
      { "text": "list.add(new Integer(5))", "isCorrect": true },
      { "text": "Object obj = list.get(0)", "isCorrect": true },
      { "text": "list.clear()", "isCorrect": true },
      { "text": "Number num = list.get(0)", "isCorrect": false },
      { "text": "list.add(new Double(3.14))", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'Bridge Method' i kako se odnosi na generičke tipove?",
    "explanation": "Bridge method je SINTETIČKA metoda koju kompajler automatski generira zbog type erasure da održi kompatibilnost između generičkog i brisanog tipa! Primjer: class MyList implements List<String> ima metodu add(String). Nakon erasure, List interface ima add(Object). Kompajler kreira BRIDGE: public boolean add(Object e) { return add((String)e); } koji poziva pravu generičku metodu. Bridge methods omogućavaju polimorfizam s generičkim tipovima! Možete ih vidjeti s reflection: getDeclaredMethods() vraća i bridge methods označene s isBridge(). Most users nikad ne trebaju razmišljati o njima, ali su KLJUČNI za funkcioniranje generičkih tipova!",
    "difficulty": "HARD",
    "options": [
      { "text": "Sintetička metoda koju kompajler generira da održi kompatibilnost nakon type erasure", "isCorrect": true },
      { "text": "Metoda koja povezuje dva različita generička tipa u hijerarhiji", "isCorrect": false },
      { "text": "Special metoda za pretvaranje između primitive i wrapper tipova", "isCorrect": false },
      { "text": "Deprecated metoda iz starih Java verzija prije generičkih tipova", "isCorrect": false },
      { "text": "Metoda koja omogućava kreiranje generičkih array-a", "isCorrect": false },
      { "text": "User-defined metoda koja radi kao adapter između različitih tipova", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s generičkim interfaceima i override-om:",
    "codeSnippet": "interface Container<T> {\n    void add(T item);\n    T remove();\n}\n\nclass StringContainer implements Container<String> {\n    private List<String> items = new ArrayList<>();\n    \n    @Override\n    public void add(String item) {\n        items.add(item);\n    }\n    \n    @Override\n    public Object remove() {\n        return items.isEmpty() ? null : items.remove(0);\n    }\n}\n\nclass NumberContainer<T extends Number> implements Container<T> {\n    private List<T> items = new ArrayList<>();\n    \n    @Override\n    public void add(Number item) {\n        items.add((T) item);\n    }\n    \n    @Override\n    public T remove() {\n        return items.isEmpty() ? null : items.remove(0);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        StringContainer sc = new StringContainer();\n        sc.add(\"Test\");\n        System.out.println(sc.remove());\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) StringContainer.remove() vraća Object umjesto String! Interface deklarira T remove() gdje T=String, mora biti public String remove(), ne Object! Iako je Object nadklasa String, OVERRIDE mora imati ISTI ili KOVARIANTNI return tip (podklasa), ali T je zamijenjeno sa String pa mora biti TOČNO String. (2) NumberContainer.add(Number item) je KRIVI parametar tip! Interface deklarira add(T item) gdje T je bounded type parameter, mora biti public void add(T item), ne Number! Iako T extends Number, signature mora matchati T, ne bound! Kompajler će javiti override greške.",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - StringContainer return tip Object umjesto String, NumberContainer parametar Number umjesto T", "isCorrect": true },
      { "text": "0 grešaka - covariant return i contravariant parametar su dozvoljeni", "isCorrect": false },
      { "text": "1 greška - samo StringContainer return tip je problem", "isCorrect": false },
      { "text": "1 greška - samo NumberContainer parametar tip je problem", "isCorrect": false },
      { "text": "3 greške - unchecked cast u NumberContainer.add također", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'Heap Pollution' u kontekstu generičkih tipova?",
    "explanation": "Heap pollution nastaje kada varijabla parametriziranog tipa pokazuje na objekt koji NIJE tog tipa - runtime tip ne odgovara compile-time tipu! Najčešće zbog unchecked operacija: raw types, unchecked castova, varargs s generičkim tipovima. Primjer: List<String> list = new ArrayList(); list.add(123) // raw type bypass, Integer u List<String>! Ili: List<Integer>[] arr = new List[10] // generic array warning. Heap pollution MOŽE uzrokovati ClassCastException u NEOČEKIVANIM mjestima - kad izvlačite element koji mislite da je String a zapravo je Integer! @SafeVarargs anotacija govori kompajleru da metoda ne uzrokuje heap pollution.",
    "difficulty": "HARD",
    "options": [
      { "text": "Situacija gdje varijabla parametriziranog tipa pokazuje na objekt različitog tipa", "isCorrect": true },
      { "text": "Memory leak uzrokovan neispravnom upotrebom generičkih kolekcija", "isCorrect": false },
      { "text": "OutOfMemoryError koji nastaje zbog previše generičkih instanci", "isCorrect": false },
      { "text": "Bug gdje generički tip 'zagađuje' heap memory s null vrijednostima", "isCorrect": false },
      { "text": "Performance problem zbog eksplicitnog boxinga generičkih tipova", "isCorrect": false },
      { "text": "Konfuzija između heap i stack memorije kod generičkih objekata", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su prednosti korištenja Generics-a u odnosu na raw types? (Odaberite sve točne)",
    "explanation": "TOČNE prednosti: (1) Type safety u compile-time - greške se hvataju prije runtime-a! (2) Eliminacija castinga - list.get() vraća T, ne Object. (3) Mogućnost pisanja generičkih algoritama koji rade s više tipova. (4) Bolja dokumentacija - List<String> jasno govori što lista sadrži. (5) Compiler optimizacije - kompajler može bolje optimizirati generic kod. NETOČNA: Generics NISU brži u runtime-u jer type erasure uklanja sve tipove - nema runtime overhead ALI nema ni runtime provjera! Performance je ISTI, razlika je u compile-time safety.",
    "difficulty": "HARD",
    "options": [
      { "text": "Type safety u compile-time - greške se hvataju prije izvođenja", "isCorrect": true },
      { "text": "Eliminacija eksplicitnog castanja", "isCorrect": true },
      { "text": "Mogućnost pisanja generičkih algoritama", "isCorrect": true },
      { "text": "Bolja dokumentacija koda", "isCorrect": true },
      { "text": "Compiler optimizacije", "isCorrect": true },
      { "text": "Runtime je brži nego s raw types", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s self-referential generics?",
    "codeSnippet": "abstract class SelfRef<T extends SelfRef<T>> {\n    abstract T self();\n    \n    T doSomething() {\n        System.out.println(\"Doing something\");\n        return self();\n    }\n}\n\nclass Concrete extends SelfRef<Concrete> {\n    @Override\n    Concrete self() {\n        return this;\n    }\n    \n    void specificMethod() {\n        System.out.println(\"Concrete method\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Concrete c = new Concrete();\n        c.doSomething().specificMethod();\n    }\n}",
    "explanation": "Ispisat će 'Doing something' i 'Concrete method'. Ovo je SELF-REFERENTIAL (F-bounded) generic type - <T extends SelfRef<T>> znači da T mora biti podklasa SelfRef<T>! Omogućava method chaining s PRAVIM runtime tipom! Concrete extends SelfRef<Concrete> pa T = Concrete. doSomething() vraća T (Concrete), ne SelfRef! c.doSomething() vraća Concrete pa možemo pozvati specificMethod() bez castanja! Ovo je CURIOUSLY RECURRING TEMPLATE PATTERN (CRTP) iz C++. Koristi se za type-safe fluent interfaces i builder patterne gdje želite da metode vraćaju PRAVI tip podklase!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ispisuje 'Doing something' i 'Concrete method' - self-referential type omogućava method chaining", "isCorrect": true },
      { "text": "Neće se kompilirati - ciklična generička definicija nije dozvoljena", "isCorrect": false },
      { "text": "Kompilira se ali pada s StackOverflowError - beskonačna rekurzija", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može se pozvati specificMethod bez castanja", "isCorrect": false },
      { "text": "Ispisuje samo 'Doing something' - specificMethod se ne izvršava", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Kada biste trebali koristiti <?> (unbounded wildcard) umjesto <T> (type parameter)?",
    "explanation": "Koristite <?> kada SAMO ČITATE iz kolekcije i ne trebate znati točan tip! <?> je za situacije gdje tip nije bitan za algoritam. Primjer: void printSize(List<?> list) { return list.size(); } - veličina ne ovisi o tipu! Koristite <T> kada trebate: (1) pisati u kolekciju, (2) koristiti tip kasnije u metodi, (3) return type ovisi o parametru tipa, (4) povezati više parametara istog tipa. List<?> NE MOŽETE dodavati elemente (osim null), List<T> MOŽETE! <?> je RESTRIKTIVNIJI ali jasnije pokazuje intent - 'ne želim mijenjati listu'. <T> daje fleksibilnost za čitanje I pisanje.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kada samo čitate i ne trebate znati tip, a ne mijenjate kolekciju", "isCorrect": true },
      { "text": "Kada trebate pisati elemente različitih tipova u kolekciju", "isCorrect": false },
      { "text": "Kada trebate return type koji odgovara parametru", "isCorrect": false },
      { "text": "<?> je uvijek bolji od <T> jer je fleksibilniji", "isCorrect": false },
      { "text": "Kada trebate povezati više parametara istog tipa", "isCorrect": false },
      { "text": "<?> i <T> su ekvivalentni i mogu se koristiti interchan geably", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s varargs, generics i @SafeVarargs?",
    "codeSnippet": "@SafeVarargs\npublic static <T> List<T> asList(T... elements) {\n    List<T> result = new ArrayList<>();\n    for (T element : elements) {\n        result.add(element);\n    }\n    return result;\n}\n\n@SafeVarargs\npublic <T> void printAll(T... items) {\n    for (T item : items) {\n        System.out.println(item);\n    }\n}\n\npublic static void main(String[] args) {\n    List<String> list1 = asList(\"A\", \"B\", \"C\");\n    \n    GenericClass obj = new GenericClass();\n    obj.printAll(1, 2, 3);\n}",
    "explanation": "Kod ima 1 GREŠKU: @SafeVarargs na printAll(T... items) - GREŠKA! @SafeVarargs može se koristiti SAMO na: (1) static metode, (2) final metode, (3) private metode (Java 9+), ili (4) konstruktore (Java 9+). NE može se koristiti na običnim instance metodama! Razlog: instance metode mogu biti override-ane u podklasama što može narušiti sigurnost. Kompajler će javiti: '@SafeVarargs is not allowed on methods that can be overridden'. asList je OK jer je static. Rješenje: staviti 'static', 'final', ili 'private' na printAll. Ili ukloniti @SafeVarargs i živjeti s warningom.",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - @SafeVarargs ne može na non-final instance metode", "isCorrect": true },
      { "text": "0 grešaka - @SafeVarargs je ispravno korišten", "isCorrect": false },
      { "text": "2 greške - obje metode krivo koriste @SafeVarargs", "isCorrect": false },
      { "text": "1 greška - @SafeVarargs ne može na static metode", "isCorrect": false },
      { "text": "Neće se kompilirati - generički varargs nisu dozvoljeni", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Što sve Java 25 planira/donosi za Generics kroz Project Valhalla? (Odaberite sve točne planove)",
    "explanation": "Project Valhalla planira REVOLUCIONIRATI generics: (1) PRIMITIVE TYPE SPECIALIZATION - List<int>, List<double> bez boxinga! Specijalizirane implementacije za svaki primitiv. (2) REIFIED GENERICS - pristup tipovima u runtime-u, instanceof List<String> bi RADILO! (3) VALUE TYPES - objekti bez identity koji se mogu inline-ati kao primitive. (4) INLINE TYPES - value types s boljim performance. NIJE planirano: automatsko dedukovanje generic types iz metoda (type inference već postoji), automatsko pretvaranje raw types u generičke (backward compatibility problem). Project Valhalla je NAJVEĆA promjena generics-a od Java 5!",
    "difficulty": "HARD",
    "options": [
      { "text": "Primitive Type Specialization - List<int> bez boxinga", "isCorrect": true },
      { "text": "Reified Generics - pristup tipovima u runtime-u", "isCorrect": true },
      { "text": "Value Types - objekti bez identity", "isCorrect": true },
      { "text": "Inline Types - value objects s boljim performance", "isCorrect": true },
      { "text": "Automatsko dedukovanje generic types iz metoda", "isCorrect": false },
      { "text": "Automatsko pretvaranje raw types u generičke tipove", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto je sljedeći kod s generičkim exception tipovima NEDOZVOLJEN?",
    "codeSnippet": "public class GenericException<T extends Exception> extends Exception {\n    private T cause;\n    \n    public GenericException(T cause) {\n        this.cause = cause;\n    }\n    \n    public T getCause() {\n        return cause;\n    }\n}\n\npublic static <T extends Exception> void riskyMethod() throws T {\n    throw (T) new Exception(\"Error\");\n}",
    "explanation": "DIJELOVI KODA SU NEDOZVOLJENI ali ne sav! GenericException<T extends Exception> extends Exception je DOZVOLJEN i kompilira se! Možete kreirati generičke exception klase. ALI: <T extends Exception> void riskyMethod() throws T je PROBLEMATIČAN - throws clause s type variable RADI ALI je OPASAN jer type erasure pretvara T u Exception pa gubite specifičan tip! Glavni problem: Ne možete catch generic exception: catch(T e) NE RADI zbog type erasure! Možete samo catch(Exception e). Također, ne možete kreirati instancu: new T() ne radi. Generički exceptions SU tehnički mogući ali NISU PREPORUČENI jer gubite type safety u catch blokovima!",
    "difficulty": "HARD",
    "options": [
      { "text": "Type erasure uklanja specifičan exception tip, ne možete catch(T e)", "isCorrect": true },
      { "text": "Exception klase ne mogu biti generičke po Java specifikaciji", "isCorrect": false },
      { "text": "throws clause ne može koristiti type variable", "isCorrect": false },
      { "text": "Generički exceptions uzrokuju StackOverflowError", "isCorrect": false },
      { "text": "JVM ne podržava parametrizirane exception tipove", "isCorrect": false },
      { "text": "Exception hijerarhija ne dopušta extends s generičkim tipovima", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s getClass() i generičkim tipovima?",
    "codeSnippet": "public class GenericTypeCheck {\n    public static <T> void checkType(List<T> list) {\n        System.out.println(\"List class: \" + list.getClass());\n        System.out.println(\"List type: \" + list.getClass().getTypeName());\n        \n        if (!list.isEmpty()) {\n            T element = list.get(0);\n            System.out.println(\"Element class: \" + element.getClass());\n            System.out.println(\"Element type: \" + element.getClass().getTypeName());\n        }\n    }\n    \n    public static void main(String[] args) {\n        List<String> stringList = new ArrayList<>();\n        stringList.add(\"Java\");\n        \n        List<Integer> intList = new ArrayList<>();\n        intList.add(42);\n        \n        checkType(stringList);\n        System.out.println(\"---\");\n        checkType(intList);\n    }\n}",
    "explanation": "Ispisat će: 'List class: class java.util.ArrayList', 'List type: java.util.ArrayList', 'Element class: class java.lang.String', 'Element type: java.lang.String', '---', 'List class: class java.util.ArrayList', 'List type: java.util.ArrayList', 'Element class: class java.lang.Integer', 'Element type: java.lang.Integer'. VAŽNO: list.getClass() vraća STVARNI runtime class što je ArrayList - NEMA informacije o generičkom tipu zbog type erasure! list<String> i list<Integer> OBA vraćaju ArrayList class. element.getClass() vraća String/Integer jer su to KONKRETNI objekti! Type erasure briše <T> iz liste ALI objekti ZNAJU svoj pravi tip! getClass() ne vidi <String> ili <Integer> na listi!",
    "difficulty": "HARD",
    "options": [
      { "text": "Lista uvijek pokazuje ArrayList bez generic tipa, elementi pokazuju String/Integer", "isCorrect": true },
      { "text": "Lista pokazuje ArrayList<String> i ArrayList<Integer> - različiti tipovi", "isCorrect": false },
      { "text": "Sve vraća Object class zbog type erasure", "isCorrect": false },
      { "text": "Neće se kompilirati - getClass() ne može na generic type", "isCorrect": false },
      { "text": "Baca TypeNotPresentException u runtime-u", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih situacija ZAHTIJEVAJU unchecked cast upozorenje? (Odaberite sve točne)",
    "explanation": "Unchecked cast warning dolazi u situacijama gdje kompajler NE MOŽE provjeriti type safety zbog type erasure: (1) (List<String>) someList - cast na parametrizirani tip, kompajler ne može provjeriti runtime tip. (2) (T[]) new Object[10] - kreiranje generičkog arraya kroz cast. (3) (List<String>) getRawList() - konverzija raw tipa u parametrizirani. NEĆE dati warning: List<String> list = new ArrayList<>() - diamond operator je OK, kompajler zna tipove. Collections.<String>emptyList() - explicit type witness, kompajler zna tipove. list.add(\"String\") - normalna operacija bez castanja.",
    "difficulty": "HARD",
    "options": [
      { "text": "(List<String>) someList", "isCorrect": true },
      { "text": "(T[]) new Object[10]", "isCorrect": true },
      { "text": "(List<String>) getRawList() gdje getRawList() vraća raw List", "isCorrect": true },
      { "text": "List<String> list = new ArrayList<>()", "isCorrect": false },
      { "text": "Collections.<String>emptyList()", "isCorrect": false },
      { "text": "list.add(\"String\") na List<String>", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između super type token i type token patterns?",
    "explanation": "Type Token koristi Class<T> za držanje runtime type informacije: void process(Class<T> type). Super Type Token koristi ANONYMOUS CLASS s reflection za capture-anje PARAMETRIZIRANOG tipa: new TypeReference<List<String>>() {}. Super type token MOŽE držati generičke tipove kroz getGenericSuperclass()! Primjer: abstract class TypeReference<T> { Type type = ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]; }. Ovo omogućava API-jima kao Jackson da deserializiraju List<String> bez type erasure! Type token radi samo za RAW tipove (String.class), super type token radi za PARAMETRIZIRANE (List<String>). Ovo je WORKAROUND za reified generics!",
    "difficulty": "HARD",
    "options": [
      { "text": "Type token koristi Class<T>, super type token koristi anonymous class s reflection za parametrizirane tipove", "isCorrect": true },
      { "text": "Type token je za primitive, super type token za objekte", "isCorrect": false },
      { "text": "Super type token je deprecated zamjena za type token", "isCorrect": false },
      { "text": "Type token radi u compile-time, super type token u runtime-u", "isCorrect": false },
      { "text": "Nema razlike - to su sinonimi", "isCorrect": false },
      { "text": "Super type token može držati više tipova istovremeno", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite SVE probleme u sljedećem kodu s generic singleton pattern:",
    "codeSnippet": "public class GenericSingleton<T> {\n    private static GenericSingleton<?> instance;\n    \n    private GenericSingleton() {}\n    \n    @SuppressWarnings(\"unchecked\")\n    public static <T> GenericSingleton<T> getInstance() {\n        if (instance == null) {\n            instance = new GenericSingleton<T>();\n        }\n        return (GenericSingleton<T>) instance;\n    }\n    \n    public static void main(String[] args) {\n        GenericSingleton<String> s1 = GenericSingleton.getInstance();\n        GenericSingleton<Integer> s2 = GenericSingleton.getInstance();\n        \n        System.out.println(s1 == s2);\n    }\n}",
    "explanation": "Kod ima OZBILJNE PROBLEME ali se kompilira! Problem: s1 i s2 pokazuju na ISTI objekt (ispisuje 'true') jer je singleton, ali kompajler MISLI da su različitih tipova (GenericSingleton<String> vs GenericSingleton<Integer>)! Ovo je TYPE SAFETY VIOLATION! Type erasure briše T pa sve instance dijele ISTU singleton referencu. Unchecked cast (GenericSingleton<T>) instance MASKIRA problem. HEAP POLLUTION: s1 se misli da je String singleton, s2 Integer singleton, ali OBOJE su ISTI objekt! Ovo može uzrokovati ClassCastException u neočekivanim mjestima! LEKCIJA: Generic singleton je ANTI-PATTERN - singleton i generics se ne slažu zbog type erasure!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se ali ima type safety violation - s1 i s2 su isti objekt ali različitih 'tipova'", "isCorrect": true },
      { "text": "Neće se kompilirati - ne može se kreirati generic singleton", "isCorrect": false },
      { "text": "Kompilira se i radi ispravno - s1 i s2 su različiti objekti", "isCorrect": false },
      { "text": "Baca ClassCastException na getInstance() poziv", "isCorrect": false },
      { "text": "Neće se kompilirati - static field ne može biti generic", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što znači termin 'Producer Extends, Consumer Super' (PECS) pravilo?",
    "explanation": "PECS je memorijsko pravilo za wildcards: 'Producer Extends, Consumer Super'. PRODUCER (odakle ČITATE podatke) koristi EXTENDS: List<? extends T> - možete čitati T objekte. CONSUMER (u koji PIŠETE podatke) koristi SUPER: List<? super T> - možete pisati T objekte. Primjer: Collections.copy(List<? super T> dest, List<? extends T> src) - src je PRODUCER (čitamo iz njega, extends), dest je CONSUMER (pišemo u njega, super). Pravilo pomaže odabrati ispravan wildcard! Ako metoda samo ČITA iz argumenta = extends. Ako metoda PIŠE u argument = super. Ako oboje = ne koristiti wildcard, koristiti T!",
    "difficulty": "HARD",
    "options": [
      { "text": "Producer (čitanje) koristi extends, Consumer (pisanje) koristi super", "isCorrect": true },
      { "text": "Producer koristi super, Consumer koristi extends", "isCorrect": false },
      { "text": "Producer kreira objekte, Consumer ih briše", "isCorrect": false },
      { "text": "Pravilo za određivanje redoslijeda bounded types", "isCorrect": false },
      { "text": "Producer je za factory metode, Consumer za destruktore", "isCorrect": false },
      { "text": "Deprecated pravilo iz Java 5, više se ne koristi", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su DOBRE prakse pri radu s Generics-ima? (Odaberite sve točne)",
    "explanation": "DOBRE prakse: (1) Eliminirajte raw types - koristite List<T>, ne List. (2) Preferirajte liste nad arrayima za generičke tipove - List<String> je sigurniji od String[]. (3) Koristite bounded types kada trebate specifične operacije - <T extends Comparable<T>> omogućava compareTo(). (4) Koristite wildcards za fleksibilnost - metode koje samo čitaju mogu koristiti <? extends T>. (5) Favorizirajte generičke metode nad generičkim klasama - lakše za koristiti. LOŠE prakse: Ignorirati unchecked warnings - ona signaliziraju probleme! Koristiti raw types u novom kodu - gube type safety!",
    "difficulty": "HARD",
    "options": [
      { "text": "Eliminirajte raw types - uvijek koristite parametrizirane verzije", "isCorrect": true },
      { "text": "Preferirajte liste nad arrayima za generičke tipove", "isCorrect": true },
      { "text": "Koristite bounded types kada trebate specifične operacije", "isCorrect": true },
      { "text": "Koristite wildcards za fleksibilnost u API-ju", "isCorrect": true },
      { "text": "Favorizirajte generičke metode nad generičkim klasama", "isCorrect": true },
      { "text": "Ignorirajte unchecked warnings - oni su samo informativni", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s intersection types u lambda izrazu?",
    "codeSnippet": "interface Playable {\n    void play();\n}\n\ninterface Recordable {\n    void record();\n}\n\npublic class IntersectionTypeTest {\n    public static <T extends Playable & Recordable> void process(T device) {\n        device.play();\n        device.record();\n    }\n    \n    public static void main(String[] args) {\n        process(() -> {\n            System.out.println(\"Playing\");\n        });\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Greška: Lambda izraz () -> { System.out.println(\"Playing\"); } implementira SAMO Playable (ima jednu metodu play()), ALI process() zahtijeva T extends Playable & Recordable - TIP MORA implementirati OBA interface-a! Lambda može implementirati samo JEDNO funkcionalno sučelje, ne dva! Kompajler ne može zaključiti da lambda implementira Recordable jer ne vidi record() metodu. Rješenje: kreirati klasu koja implementira oba ili koristiti anonymous class. Lambda expression ne podržava intersection types direktno! Možete: new Object() implements Playable, Recordable { ... } ali to nije lambda!",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - lambda može implementirati samo jedno funkcionalno sučelje", "isCorrect": true },
      { "text": "Ispisuje 'Playing' - record() se automatski preskače", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 'Playing' i prazan record()", "isCorrect": false },
      { "text": "Neće se kompilirati - process ne može primati lambda izraze", "isCorrect": false },
      { "text": "Baca UnsupportedOperationException na record() poziv", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto je generic static field problematičan i kako ga riješiti?",
    "explanation": "Generic static field je problematičan jer static field pripada KLASI, ne instanci, ali type parameter T pripada INSTANCI! Nakon type erasure, SVE instance dijele ISTI static field. Primjer: class Cache<T> { private static T defaultValue; } - defaultValue bi bio ISTI za Cache<String> i Cache<Integer> što nema smisla! Kompajler daje grešku: 'static fields cannot be parameterized by type'. Rješenja: (1) Ne koristiti static s T, (2) Koristiti static generic METODE umjesto polja, (3) Koristiti Map<Class<?>, Object> za različite tipove, (4) Wrapper class za svaki tip. Static i instance type parameters ne mogu se miješati!",
    "difficulty": "HARD",
    "options": [
      { "text": "Static field pripada klasi, T pripada instanci - konflikt zbog type erasure", "isCorrect": true },
      { "text": "Generic static fields uzrokuju memory leak", "isCorrect": false },
      { "text": "JVM ne podržava generičke static varijable", "isCorrect": false },
      { "text": "Static fields ne mogu držati objektne reference", "isCorrect": false },
      { "text": "Generic types ne mogu biti thread-safe pa static ne radi", "isCorrect": false },
      { "text": "To je stari bug iz Java 5 koji je riješen u Java 25", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s nested generics kompilirati?",
    "codeSnippet": "public class NestedGenerics {\n    public static <T> List<List<T>> splitList(List<T> source, int chunkSize) {\n        List<List<T>> result = new ArrayList<>();\n        \n        for (int i = 0; i < source.size(); i += chunkSize) {\n            int end = Math.min(i + chunkSize, source.size());\n            result.add(source.subList(i, end));\n        }\n        \n        return result;\n    }\n    \n    public static void main(String[] args) {\n        List<String> words = List.of(\"A\", \"B\", \"C\", \"D\", \"E\");\n        List<List<String>> chunks = splitList(words, 2);\n        \n        chunks.forEach(chunk -> System.out.println(chunk));\n    }\n}",
    "explanation": "Kod se kompilira i ispisuje [[A, B], [C, D], [E]]! Nested generics List<List<T>> su potpuno validni! Type parameter može biti korišten u NESTED strukturi - List sadrži List-e koji sadrže T. Type inference radi rekurzivno: splitList(words, 2) zaključuje T=String pa vraća List<List<String>>. source.subList() vraća List<T> što može biti dodano u List<List<T>>. Nested generics su ČESTI: Map<String, List<Integer>>, Optional<List<String>>, Stream<Collection<T>>. Kompajler pravilno inferira tipove kroz sve nivoe! NEMA LIMITA na dubinu nestinga - možete List<List<List<T>>>!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje [[A, B], [C, D], [E]] - nested generics su validni", "isCorrect": true },
      { "text": "Neće se kompilirati - nested generics nisu dozvoljeni", "isCorrect": false },
      { "text": "Kompilira se ali pada s StackOverflowError", "isCorrect": false },
      { "text": "Neće se kompilirati - type inference ne radi s nested tipovima", "isCorrect": false },
      { "text": "Ispisuje samo [A, B, C, D, E] - ignorira nesting", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je 'Capture Conversion' u kontekstu wildcards?",
    "explanation": "Capture conversion je proces gdje kompajler KONVERTIRA wildcard (?) u KONKRETNI (ali nepoznati) type parameter! Primjer: void process(List<?> list) { helper(list); } gdje helper je <T> void helper(List<T> list). Kompajler 'capture-ira' ? u novi type parameter T za helper! Ovo omogućava korištenje wildcard-a kao konkretnog tipa UNUTAR metode. Capture conversion može FAILATI: List<?> list1; List<?> list2; list1 = list2 RADI, ali metoda koja prima DVI List<?> ne može garantirati da su ISTOG tipa! 'Capture#1 of ?' i 'Capture#2 of ?' su RAZLIČITI tipovi! Ovo je ČESTA greška kod wildcards.",
    "difficulty": "HARD",
    "options": [
      { "text": "Proces gdje kompajler konvertira wildcard u konkretni (nepoznati) type parameter", "isCorrect": true },
      { "text": "Način za dohvaćanje runtime tipa iz generičke varijable", "isCorrect": false },
      { "text": "Capture je zastarjela značajka iz Java 6 za type casting", "isCorrect": false },
      { "text": "Proces pretvaranja type parameter u wildcard za backward compatibility", "isCorrect": false },
      { "text": "Runtime mehanizam za 'hvatanje' ClassCastException-a", "isCorrect": false },
      { "text": "Conversion između bounded i unbounded wildcard-a", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su validne deklaracije generičkih metoda u Java 25? (Odaberite sve točne)",
    "explanation": "VALIDNE: (1) public static <T> T identity(T value) - standard. (2) public <T extends Number> void process(T num) - bounded type. (3) public static <T, U> Map<T, U> zip(List<T> keys, List<U> values) - više type parametara. (4) public <T extends Comparable<T>> T max(T a, T b) - recursive bound. NEVALIDNE: (5) public <T super Number> void method(T t) - NE postoji 'super' za type parameters, samo za wildcards! (6) public static T identity(T value) - GREŠKA, <T> nedostaje prije return tipa! Type parameter mora biti deklariran PRIJE return tipa: public static <T> T...",
    "difficulty": "HARD",
    "options": [
      { "text": "public static <T> T identity(T value)", "isCorrect": true },
      { "text": "public <T extends Number> void process(T num)", "isCorrect": true },
      { "text": "public static <T, U> Map<T, U> zip(List<T> keys, List<U> values)", "isCorrect": true },
      { "text": "public <T extends Comparable<T>> T max(T a, T b)", "isCorrect": true },
      { "text": "public <T super Number> void method(T t)", "isCorrect": false },
      { "text": "public static T identity(T value)", "isCorrect": false }
    ]
  }
]
}
