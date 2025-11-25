import { QuestionType, Difficulty } from '@prisma/client'
import { createCompileOptions, createShuffledOptions } from './seed-utils'

export const exceptionsQuestions = {
  lectureSlug: 'exceptions',
  questions:[
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je iznimka (Exception) u Javi?",
    "explanation": "Iznimka je objekt koji predstavlja problem nastao tijekom izvođenja programa. Sve iznimke nasljeđuju klasu Throwable. Exception handling omogućava razvoj robusnih aplikacija koje mogu nastaviti raditi i nakon greške. Iznimke se mogu hvatati (catch) i bacati (throw), a predstavljaju način komunikacije između dijelova programa o problemu.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Objekt koji predstavlja problem nastao tijekom izvođenja programa", "isCorrect": true },
      { "text": "Greška u sintaksi koda koju kompajler detektira", "isCorrect": false },
      { "text": "Metoda koja se automatski poziva kada program padne", "isCorrect": false },
      { "text": "Poruka koja se ispisuje u konzolu", "isCorrect": false },
      { "text": "Poseban tip varijable za rukovanje greškama", "isCorrect": false },
      { "text": "Alat za debugging koji dolazi s JDK-om", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su glavne razlike između checked (označenih) i unchecked (neoznačenih) iznimaka?",
    "explanation": "Checked iznimke nasljeđuju Exception (osim RuntimeException), MORAJU se obrađivati ili deklarirati s throws, kompajler ih provjerava, i koriste se za predvidive vanjske probleme (IOException, SQLException). Unchecked iznimke nasljeđuju RuntimeException, ne moraju se obrađivati, kompajler ih ne provjerava, i koriste se za programske greške (NullPointerException, ArithmeticException).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Checked nasljeđuju Exception, unchecked nasljeđuju RuntimeException", "isCorrect": true },
      { "text": "Checked se MORAJU obrađivati ili deklarirati, unchecked ne moraju", "isCorrect": true },
      { "text": "Kompajler provjerava checked, ali ne provjerava unchecked", "isCorrect": true },
      { "text": "Unchecked su ozbiljnije i zaustavljaju program", "isCorrect": false },
      { "text": "Checked se koriste za programske greške", "isCorrect": false },
      { "text": "Unchecked se moraju uvijek deklarirati s throws", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između ključnih riječi 'throw' i 'throws' u Javi?",
    "explanation": "'throw' se koristi unutar metode za BACANJE iznimke - stvara se objekt iznimke i prekida se tok izvođenja (npr. throw new IllegalArgumentException()). 'throws' se koristi u DEKLARACIJI metode za označavanje koje iznimke metoda može baciti i koje pozivatelj mora obraditi (npr. public void readFile() throws IOException). Throw je akcija, throws je deklaracija.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "throw baca iznimku unutar metode, throws deklarira iznimke u potpisu metode", "isCorrect": true },
      { "text": "throw je za checked, throws za unchecked iznimke", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "throws baca iznimku, throw je deklarira", "isCorrect": false },
      { "text": "throw se koristi u catch bloku, throws u try bloku", "isCorrect": false },
      { "text": "throws se može koristiti samo s vlastitim iznimkama", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je stack trace i što nam govori?",
    "explanation": "Stack trace je detaljni ispis koji pokazuje točnu lokaciju gdje se dogodila iznimka i cijelu stazu poziva metoda koje su dovele do greške. Sadrži: naziv iznimke, opisnu poruku, lokacije metoda s brojevima linija. To je kao mapa koja te vodi do problema - najvažniji alat za debugging. Stack trace se može ispisati s ex.printStackTrace() ili vidjeti u konzoli kada program padne.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Detaljni ispis koji pokazuje gdje se dogodila iznimka i stazu poziva metoda", "isCorrect": true },
      { "text": "Povijest svih iznimaka u programu", "isCorrect": false },
      { "text": "Lista svih varijabli u memoriji", "isCorrect": false },
      { "text": "Alat za praćenje performansi programa", "isCorrect": false },
      { "text": "Datoteka koja se kreira automatski pri padu programa", "isCorrect": false },
      { "text": "Debugger ugrađen u JVM", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Finally blok se izvršava uvijek, čak i ako postoji return naredba u try ili catch bloku.",
    "explanation": "TRUE. Finally blok se izvršava bez obzira na to što se dogodilo u try/catch bloku - bilo da je došlo do iznimke ili ne, bilo da postoji return ili ne. Izvršava se NAKON try ili catch bloka, ali PRIJE povratka iz metode. Koristi se za čišćenje resursa (zatvaranje datoteka, konekcija). Jedini način da se finally ne izvrši je System.exit() ili pad JVM-a.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": true },
      { "text": "False", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje novosti u obradi iznimaka su uvedene u Java 7?",
    "explanation": "Java 7 je uvela dvije glavne novosti: (1) Multi-catch blok koji omogućava hvatanje više tipova iznimaka u jednom catch bloku (catch (IOException | SQLException ex)), i (2) Try-with-resources koji automatski zatvara resurse koji implementiraju AutoCloseable interface. Ove značajke znatno smanjuju količinu boilerplate koda i čine kod čitljivijim i sigurnijim.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Multi-catch blok za hvatanje više iznimaka odjednom", "isCorrect": true },
      { "text": "Try-with-resources za automatsko zatvaranje resursa", "isCorrect": true },
      { "text": "AutoCloseable interface za resurse", "isCorrect": true },
      { "text": "Pattern matching za iznimke", "isCorrect": false },
      { "text": "Conditional catch blokovi", "isCorrect": false },
      { "text": "Lambda izrazi u catch blokovima", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koji interface mora implementirati klasa da bi mogla koristiti try-with-resources?",
    "explanation": "Klasa mora implementirati AutoCloseable interface (ili njenu podinterfejs Closeable). AutoCloseable ima jednu metodu: void close() throws Exception. Try-with-resources automatski poziva close() metodu na kraju try bloka, čak i ako dođe do iznimke. Primjeri: FileReader, BufferedReader, Connection, Scanner. Sintaksa: try (AutoCloseable resurs = new ...) { }",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "AutoCloseable", "isCorrect": true },
      { "text": "Disposable", "isCorrect": false },
      { "text": "Closable", "isCorrect": false },
      { "text": "Resource", "isCorrect": false },
      { "text": "Finalizable", "isCorrect": false },
      { "text": "Cleanable", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koje je korijen hijerarhije svih iznimaka i grešaka u Javi?",
    "explanation": "java.lang.Throwable je korijen cijelе hijerarhije. Throwable ima dvije glavne grane: (1) Exception - iznimke koje treba obrađivati (uključuje RuntimeException za unchecked iznimke), i (2) Error - ozbiljne sistemske greške koje se NE TREBAJU obrađivati (OutOfMemoryError, StackOverflowError). Samo objekti koji nasljeđuju Throwable mogu se baciti s throw i hvatati s catch.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "java.lang.Throwable", "isCorrect": true },
      { "text": "java.lang.Exception", "isCorrect": false },
      { "text": "java.lang.Error", "isCorrect": false },
      { "text": "java.lang.Object", "isCorrect": false },
      { "text": "java.lang.RuntimeException", "isCorrect": false },
      { "text": "java.lang.Exceptional", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su prednosti try-with-resources naspram tradicionalnog try-finally?",
    "explanation": "Try-with-resources prednosti: (1) Automatsko zatvaranje resursa bez ručnog poziva close(), (2) Kraći i čitljiviji kod - manje boilerplate-a, (3) Sigurniji - čak i ako dođe do iznimke pri zatvaranju, resursi će biti zatvoreni, (4) Može se deklarirati više resursa odvojenih točkom-zarezom, (5) Resurs je final i ne može se promijeniti unutar bloka.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Automatsko zatvaranje resursa bez ručnog poziva close()", "isCorrect": true },
      { "text": "Kraći i čitljiviji kod - manje boilerplate koda", "isCorrect": true },
      { "text": "Sigurniji - resursi će biti zatvoreni čak i ako dođe do iznimke", "isCorrect": true },
      { "text": "Brže izvršavanje programa", "isCorrect": false },
      { "text": "Može se koristiti bez catch bloka", "isCorrect": false },
      { "text": "Ne moraju se deklarirati checked iznimke", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su chained exceptions (povezane iznimke) i zašto se koriste?",
    "explanation": "Chained exceptions omogućavaju povezivanje iznimaka gdje jedna iznimka sadrži drugu kao uzrok (cause). Koristi se za 'omotavanje' lower-level iznimaka u higher-level domenske iznimke, zadržavajući potpunu informaciju o grešci. Primjer: SQLException se omota u DataAccessException. Konstruktor prima uzrok: throw new DataAccessException('Poruka', originalnaIznimka). Olakšava debugging jer vidimo cijeli lanac problema.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Povezivanje iznimaka gdje jedna sadrži drugu kao uzrok za bolju dijagnostiku", "isCorrect": true },
      { "text": "Hvatanje više iznimaka u jednom catch bloku", "isCorrect": false },
      { "text": "Nizanje više catch blokova jedan za drugim", "isCorrect": false },
      { "text": "Iznimke koje se automatski propagiraju kroz call stack", "isCorrect": false },
      { "text": "Try blokovi koji se međusobno pozivaju", "isCorrect": false },
      { "text": "Ponavljanje try bloka dok se ne uspije", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između Exception i Error klasa u Javi?",
    "explanation": "Exception klasa predstavlja probleme koje aplikacija MOŽE i TREBA obrađivati (IOException, SQLException, vlastite iznimke). Error klasa predstavlja ozbiljne sistemske greške izvan kontrole aplikacije koje se NE TREBAJU hvatati (OutOfMemoryError, StackOverflowError, VirtualMachineError). Errors označavaju da je JVM u lošem stanju i program treba završiti. Nikad ne treba hvatati Error.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Exception se obrađuje i hvata, Error predstavlja ozbiljne sistemske greške koje se ne obrađuju", "isCorrect": true },
      { "text": "Exception je za runtime greške, Error za compile-time greške", "isCorrect": false },
      { "text": "Error se može hvatati, Exception ne može", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "Exception je checked, Error je uvijek unchecked", "isCorrect": false },
      { "text": "Error se koristi za vlastitе iznimke, Exception za sistemske", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Što od navedenog su unchecked (neoznačene) iznimke?",
    "explanation": "Unchecked iznimke nasljeđuju RuntimeException i ne moraju se obrađivati ili deklarirati. Primjeri: NullPointerException (pristup null objektu), ArithmeticException (npr. dijeljenje s nulom), ArrayIndexOutOfBoundsException (pristup izvan granica polja), IllegalArgumentException (neispravni parametri), ClassCastException (krivo castanje). Ove iznimke obično označavaju programske greške koje se mogu spriječiti u kodu.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "NullPointerException", "isCorrect": true },
      { "text": "ArithmeticException", "isCorrect": true },
      { "text": "ArrayIndexOutOfBoundsException", "isCorrect": true },
      { "text": "IOException", "isCorrect": false },
      { "text": "SQLException", "isCorrect": false },
      { "text": "FileNotFoundException", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koliko konstruktora se preporučuje implementirati pri kreiranju vlastite iznimke?",
    "explanation": "Best practice je implementirati 4 konstruktora za maksimalnu fleksibilnost: (1) Bez parametara - koristi defaultnu poruku, (2) S porukom (String message), (3) S porukom i uzrokom (String message, Throwable cause) - za chained exceptions, (4) Samo s uzrokom (Throwable cause). Svi pozivaju odgovarajući super() konstruktor roditeljske klase (Exception ili RuntimeException).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "4 konstruktora (bez parametara, s porukom, s porukom i uzrokom, samo s uzrokom)", "isCorrect": true },
      { "text": "1 konstruktor bez parametara je dovoljan", "isCorrect": false },
      { "text": "2 konstruktora (bez parametara i s porukom)", "isCorrect": false },
      { "text": "Vlastite iznimke ne mogu imati konstruktore", "isCorrect": false },
      { "text": "Samo jedan konstruktor s Throwable parametrom", "isCorrect": false },
      { "text": "Konstruktori nisu potrebni, koristi se defaultni", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Multi-catch blok (catch (IOException | SQLException ex)) omogućava da se ista varijabla ex koristi za različite tipove iznimaka.",
    "explanation": "TRUE. Multi-catch blok (Java 7+) omogućava hvatanje više različitih tipova iznimaka u jednom catch bloku koristeći operator | (pipe). Varijabla ex je implicitno final i može se koristiti za pristup metodama koje su zajedničke svim navedenim tipovima iznimaka. Ovo smanjuje duplicirani kod kada različite iznimke trebaju istu obradu.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": true },
      { "text": "False", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s try-catch kompilirati?",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        try {\n            int rezultat = 10 / 0;\n            System.out.println(rezultat);\n        } catch (ArithmeticException ex) {\n            System.out.println(\"Dijeljenje s nulom!\");\n        } catch (Exception ex) {\n            System.out.println(\"Opća greška!\");\n        }\n    }\n}",
    "explanation": "Kod će se kompilirati i ispisati 'Dijeljenje s nulom!'. Try-catch blokovi su pravilno napisani. Dijeljenje s nulom baca ArithmeticException koja se hvata u prvom catch bloku. Drugi catch blok (Exception) neće se izvršiti jer iznimka je već uhvaćena. Važno: specifičniji catch blokovi moraju biti prije općenitijih (Exception je najopćenitija i mora biti zadnja).",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i ispisuje 'Dijeljenje s nulom!'", "isCorrect": true },
      { "text": "Neće se kompilirati - catch blokovi su u krivom redoslijedu", "isCorrect": false },
      { "text": "Kompilira se ali pada s neuhvaćenom iznimkom", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 'Opća greška!'", "isCorrect": false },
      { "text": "Neće se kompilirati - ArithmeticException se ne može hvatati", "isCorrect": false },
      { "text": "Kompilira se ali ne ispisuje ništa", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećem kodu:",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        try {\n            int[] brojevi = {1, 2, 3};\n            System.out.println(brojevi[5]);\n        } catch (Exception ex) {\n            System.out.println(\"Opća greška\");\n        } catch (ArrayIndexOutOfBoundsException ex) {\n            System.out.println(\"Pristup izvan granica!\");\n        }\n    }\n}",
    "explanation": "Greška je u redoslijedu catch blokova. ArrayIndexOutOfBoundsException nasljeđuje Exception, pa mora doći PRIJE općenitijeg Exception catch bloka. Java zahtijeva da se catch blokovi pišu od najspecifičnijih prema najopćenitijima. Trenutni redoslijed znači da će Exception uhvatiti SVE iznimke, pa ArrayIndexOutOfBoundsException catch nikad neće biti postignut - kompajler javlja grešku 'exception already caught'.",
    "difficulty": "HARD",
    "options": [
      { "text": "Catch blokovi moraju biti od specifičnijih prema općenitijima - ArrayIndexOutOfBoundsException mora biti prije Exception", "isCorrect": true },
      { "text": "ArrayIndexOutOfBoundsException se ne može hvatati", "isCorrect": false },
      { "text": "Nedostaje finally blok", "isCorrect": false },
      { "text": "Try blok ne smije sadržavati polja", "isCorrect": false },
      { "text": "Exception se ne smije koristiti u catch bloku", "isCorrect": false },
      { "text": "Nema pogreške u kodu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s finally blokom?",
    "codeSnippet": "public class Test {\n    public static int test() {\n        try {\n            return 1;\n        } finally {\n            return 2;\n        }\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(test());\n    }\n}",
    "explanation": "Ispisat će 2. Finally blok se izvršava NAKON try bloka ali PRIJE povratka iz metode. Ako finally blok sadrži return, on će 'pregaziti' return iz try bloka. Ovo je LOŠA PRAKSA i treba je izbjegavati jer maskira pravi povratni rezultat. Finally bi trebao samo čistiti resurse, ne vraćati vrijednosti. Kompajler će možda dati upozorenje o ovome.",
    "difficulty": "HARD",
    "options": [
      { "text": "2", "isCorrect": true },
      { "text": "1", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može biti return u finally", "isCorrect": false },
      { "text": "Baca iznimku pri izvođenju", "isCorrect": false },
      { "text": "3 (zbroj oba return-a)", "isCorrect": false },
      { "text": "Neće se kompilirati - try mora imati catch", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s try-with-resources kompilirati?",
    "codeSnippet": "import java.io.*;\n\npublic class Test {\n    public static void main(String[] args) {\n        try (BufferedReader br = new BufferedReader(\n                new FileReader(\"file.txt\"))) {\n            System.out.println(br.readLine());\n        }\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati. Razlog: FileReader konstruktor i br.readLine() metoda bacaju IOException koja je checked iznimka. Try-with-resources ne oslobađa od rukovanja checked iznimkama - mora se dodati catch blok ili deklarirati 'throws IOException' u main metodi. Ispravan kod: try (...) { } catch (IOException e) { } ili main(String[] args) throws IOException.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - IOException je checked iznimka i mora se obraditi ili deklarirati", "isCorrect": true },
      { "text": "Kompilira se i čita prvu liniju iz datoteke", "isCorrect": false },
      { "text": "Neće se kompilirati - try-with-resources ne može bez catch", "isCorrect": false },
      { "text": "Kompilira se ali baca iznimku pri izvođenju", "isCorrect": false },
      { "text": "Neće se kompilirati - BufferedReader ne implementira AutoCloseable", "isCorrect": false },
      { "text": "Kompilira se jer try-with-resources automatski obrađuje iznimke", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećoj metodi da bi se kod kompilirao?",
    "codeSnippet": "public class FileManager {\n    public String readFile(String path) {\n        BufferedReader reader = new BufferedReader(\n            new FileReader(path)\n        );\n        return reader.readLine();\n    }\n}",
    "explanation": "Nedostaju dva elementa: (1) Deklaracija 'throws IOException' u potpisu metode jer FileReader i readLine() bacaju checked iznimku IOException, ili dodati try-catch blok, i (2) Zatvaranje resursa - reader se nikad ne zatvara što uzrokuje resource leak. Rješenje: koristiti try-with-resources i throws IOException. Checked iznimke MORAJU biti obrađene ili deklarirane.",
    "difficulty": "HARD",
    "options": [
      { "text": "Nedostaje 'throws IOException' u potpisu metode i resurs se ne zatvara", "isCorrect": true },
      { "text": "Samo nedostaje catch blok", "isCorrect": false },
      { "text": "Samo nedostaje finally za zatvaranje", "isCorrect": false },
      { "text": "BufferedReader mora biti final", "isCorrect": false },
      { "text": "Nema pogreške - kod je potpun", "isCorrect": false },
      { "text": "FileReader mora biti u try bloku", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s multi-catch blokom (Java 7+)?",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        try {\n            String tekst = null;\n            System.out.println(tekst.length());\n        } catch (NullPointerException | ArithmeticException ex) {\n            System.out.println(\"Uhvaćena iznimka: \" + ex.getClass().getSimpleName());\n        }\n    }\n}",
    "explanation": "Ispisat će: 'Uhvaćena iznimka: NullPointerException'. Pokušaj poziva metode length() na null objektu baca NullPointerException. Multi-catch blok hvata NullPointerException jer je jedan od navedenih tipova. getClass().getSimpleName() vraća 'NullPointerException'. Multi-catch omogućava elegant način rukovanja s više različitih iznimaka na isti način.",
    "difficulty": "HARD",
    "options": [
      { "text": "Uhvaćena iznimka: NullPointerException", "isCorrect": true },
      { "text": "Uhvaćena iznimka: ArithmeticException", "isCorrect": false },
      { "text": "Neće se kompilirati - multi-catch ne radi s unchecked iznimkama", "isCorrect": false },
      { "text": "Baca neuhvaćenu iznimku", "isCorrect": false },
      { "text": "Uhvaćena iznimka: Exception", "isCorrect": false },
      { "text": "Neće se kompilirati - getSimpleName() ne postoji", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se treba ispraviti u sljedećoj vlastitoj iznimci?",
    "codeSnippet": "public class InvalidEmailException extends RuntimeException {\n    public InvalidEmailException(String message) {\n        // Prazan konstruktor\n    }\n}",
    "explanation": "Greška je što konstruktor ne poziva super(message) za proslijeđivanje poruke roditeljskoj klasi RuntimeException. Bez toga, poruka se ne sprema i ex.getMessage() će vratiti null. Trebalo bi: super(message); kao prva naredba u konstruktoru. Također, best practice je implementirati sva 4 konstruktora (bez parametara, s porukom, s porukom i uzrokom, samo s uzrokom).",
    "difficulty": "HARD",
    "options": [
      { "text": "Konstruktor mora pozvati super(message) za proslijeđivanje poruke", "isCorrect": true },
      { "text": "Vlastite iznimke moraju nasljeđivati Exception, ne RuntimeException", "isCorrect": false },
      { "text": "Nedostaje @Override anotacija", "isCorrect": false },
      { "text": "Naziv klase mora završiti na Error, ne Exception", "isCorrect": false },
      { "text": "Nema pogreške - kod je ispravan", "isCorrect": false },
      { "text": "Konstruktor mora biti private", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što vraća sljedeći kod s chained exceptions?",
    "codeSnippet": "public class Test {\n    public static void method1() throws Exception {\n        try {\n            int result = 10 / 0;\n        } catch (ArithmeticException e) {\n            throw new Exception(\"Greška u izračunu\", e);\n        }\n    }\n    \n    public static void main(String[] args) {\n        try {\n            method1();\n        } catch (Exception ex) {\n            System.out.println(ex.getMessage());\n            System.out.println(ex.getCause().getClass().getSimpleName());\n        }\n    }\n}",
    "explanation": "Ispisat će: 'Greška u izračunu' i 'ArithmeticException'. Kod demonstrira chained exceptions - originalna ArithmeticException je 'omotana' u novu Exception s dodatnom porukom. ex.getMessage() vraća poruku nove iznimke, a ex.getCause() vraća originalnu ArithmeticException. Ovo omogućava apstrakciju (skrivanje lower-level detalja) dok se zadržava potpuna informacija o grešci za debugging.",
    "difficulty": "HARD",
    "options": [
      { "text": "Greška u izračunu i ArithmeticException", "isCorrect": true },
      { "text": "Samo 'Greška u izračunu'", "isCorrect": false },
      { "text": "Neće se kompilirati - chained exceptions nisu dopuštene", "isCorrect": false },
      { "text": "Baca NullPointerException na getCause()", "isCorrect": false },
      { "text": "Samo 'ArithmeticException'", "isCorrect": false },
      { "text": "Neće se kompilirati - method1 ne smije baciti Exception", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s throws deklaracijom kompilirati?",
    "codeSnippet": "import java.io.*;\n\npublic class Test {\n    public void readFile() throws IOException {\n        BufferedReader reader = new BufferedReader(\n            new FileReader(\"data.txt\")\n        );\n        System.out.println(reader.readLine());\n        reader.close();\n    }\n    \n    public void processFile() {\n        readFile();\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati. Greška je u metodi processFile() - poziva readFile() koja baca checked iznimku IOException, ali processFile() NE obrađuje tu iznimku niti je deklarira u svom throws potpisu. Mora se dodati: (1) try-catch blok oko readFile() poziva, ili (2) 'throws IOException' u potpisu processFile() metode. Checked iznimke se moraju propagirati kroz cijeli call stack.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - processFile() mora obraditi ili deklarirati IOException", "isCorrect": true },
      { "text": "Kompilira se i izvršava uspješno", "isCorrect": false },
      { "text": "Neće se kompilirati - readFile() ne smije baciti IOException", "isCorrect": false },
      { "text": "Kompilira se ali pada s neuhvaćenom iznimkom", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje finally blok", "isCorrect": false },
      { "text": "Kompilira se jer IOException je unchecked", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s vlastitom iznimkom?",
    "codeSnippet": "class PremaliBrojException extends Exception {\n    public PremaliBrojException(String msg) {\n        super(msg);\n    }\n}\n\npublic class Test {\n    public static void provjeri(int broj) throws PremaliBrojException {\n        if (broj < 10) {\n            throw new PremaliBrojException(\"Broj je manji od 10!\");\n        }\n    }\n    \n    public static void main(String[] args) {\n        try {\n            provjeri(5);\n            System.out.println(\"Uspješno\");\n        } catch (PremaliBrojException ex) {\n            System.out.println(ex.getMessage());\n        }\n    }\n}",
    "explanation": "Ispisat će: 'Broj je manji od 10!'. PremaliBrojException nasljeđuje Exception (checked iznimka), poziva super(msg) za postavljanje poruke. Metoda provjeri() baca iznimku jer je 5 < 10. Iznimka se hvata u catch bloku i ispisuje se poruka pomoću getMessage(). 'Uspješno' se neće ispisati jer program preskače ostatak try bloka nakon iznimke.",
    "difficulty": "HARD",
    "options": [
      { "text": "Broj je manji od 10!", "isCorrect": true },
      { "text": "Uspješno", "isCorrect": false },
      { "text": "Neće se kompilirati - vlastite iznimke ne mogu nasljeđivati Exception", "isCorrect": false },
      { "text": "Neće ispisati ništa", "isCorrect": false },
      { "text": "Baca neuhvaćenu iznimku", "isCorrect": false },
      { "text": "Neće se kompilirati - throw ne može biti u if bloku", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se događa kada se u try-with-resources bloku dogodi iznimka pri zatvaranju resursa?",
    "codeSnippet": "class ProblematicResource implements AutoCloseable {\n    @Override\n    public void close() throws Exception {\n        throw new Exception(\"Greška pri zatvaranju\");\n    }\n    \n    public void work() throws Exception {\n        throw new Exception(\"Greška pri radu\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        try (ProblematicResource res = new ProblematicResource()) {\n            res.work();\n        } catch (Exception ex) {\n            System.out.println(ex.getMessage());\n            System.out.println(\"Suppressed: \" + ex.getSuppressed().length);\n        }\n    }\n}",
    "explanation": "Ispisat će: 'Greška pri radu' i 'Suppressed: 1'. Kada se dogodi iznimka u try bloku I pri zatvaranju resursa, primarnu iznimku (iz work()) se baca, a iznimka iz close() postaje 'suppressed' (prigušena) i dostupna je kroz getSuppressed(). Ovo je jedna od prednosti try-with-resources - ne gubi informaciju o višestrukim iznimkama. Stari try-finally bi izgubio prvu iznimku.",
    "difficulty": "HARD",
    "options": [
      { "text": "Ispisuje 'Greška pri radu' i 'Suppressed: 1' - close iznimka postaje suppressed", "isCorrect": true },
      { "text": "Ispisuje samo 'Greška pri zatvaranju'", "isCorrect": false },
      { "text": "Baca obje iznimke odjednom", "isCorrect": false },
      { "text": "Neće se kompilirati - close() ne smije baciti iznimku", "isCorrect": false },
      { "text": "Program se ruši bez ikakvog ispisa", "isCorrect": false },
      { "text": "Ispisuje 'Suppressed: 0'", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koje je ponašanje sljedećeg koda s catch blokom za Error?",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        try {\n            int[] ogromnoPolje = new int[Integer.MAX_VALUE];\n        } catch (OutOfMemoryError ex) {\n            System.out.println(\"Nema memorije!\");\n        }\n        System.out.println(\"Program nastavlja...\");\n    }\n}",
    "explanation": "Kod će se kompilirati i možda uhvatiti OutOfMemoryError ako nema dovoljno memorije. MEĐUTIM, ovo je LOŠA PRAKSA. Error klasa i njene podklase (OutOfMemoryError, StackOverflowError) označavaju ozbiljne sistemske greške koje se NE TREBAJU hvatati jer JVM je u lošem stanju. Program bi trebao završiti. Čak i ako se uhvati, program može nastaviti s nepredvidivim ponašanjem jer je JVM destabiliziran.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se ali je LOŠA PRAKSA - Error se ne treba hvatati", "isCorrect": true },
      { "text": "Neće se kompilirati - Error se ne može hvatati", "isCorrect": false },
      { "text": "Kompilira se i ovo je preporučeni način", "isCorrect": false },
      { "text": "OutOfMemoryError je checked iznimka", "isCorrect": false },
      { "text": "Catch blok za Error mora biti prvi", "isCorrect": false },
      { "text": "Error ne nasljeđuje Throwable pa se ne može hvatati", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s višestrukim resursima u try-with-resources?",
    "codeSnippet": "class Resource implements AutoCloseable {\n    String name;\n    \n    Resource(String name) {\n        this.name = name;\n        System.out.println(name + \" opened\");\n    }\n    \n    @Override\n    public void close() {\n        System.out.println(name + \" closed\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        try (Resource r1 = new Resource(\"R1\");\n             Resource r2 = new Resource(\"R2\")) {\n            System.out.println(\"Working...\");\n        }\n    }\n}",
    "explanation": "Ispisat će: 'R1 opened', 'R2 opened', 'Working...', 'R2 closed', 'R1 closed'. Try-with-resources može deklarirati više resursa odvojenih točkom-zarezom. Resursi se otvaraju redom deklaracije (R1 pa R2), ali se zatvaraju OBRNUTIM redoslijedom (R2 pa R1) - kao stack (LIFO). Ovo osigurava da se resursi koji ovise jedni o drugima pravilno zatvaraju.",
    "difficulty": "HARD",
    "options": [
      { "text": "R1 opened, R2 opened, Working..., R2 closed, R1 closed", "isCorrect": true },
      { "text": "R1 opened, R2 opened, Working..., R1 closed, R2 closed", "isCorrect": false },
      { "text": "Neće se kompilirati - samo jedan resurs je dopušten", "isCorrect": false },
      { "text": "Resursi se ne zatvaraju automatski", "isCorrect": false },
      { "text": "Samo 'Working...'", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje catch blok", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje naredbe možemo ispisati cijeli stack trace iznimke?",
    "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        try {\n            metoda1();\n        } catch (Exception ex) {\n            // Kako ispisati detaljan stack trace?\n        }\n    }\n    \n    public static void metoda1() {\n        metoda2();\n    }\n    \n    public static void metoda2() {\n        throw new RuntimeException(\"Greška!\");\n    }\n}",
    "explanation": "Točna naredba je: ex.printStackTrace(). Ova metoda ispisuje cijeli stack trace u System.err koji pokazuje: naziv iznimke, poruku, i cijelu stazu poziva metoda s brojevima linija (metoda2 -> metoda1 -> main). Za profesionalnije logiranje koristi se logger.error('Poruka', ex) koji također ispisuje stack trace u log datoteku. printStackTrace() je koristan za debugging ali u produkciji treba koristiti logging framework.",
    "difficulty": "HARD",
    "options": [
      { "text": "ex.printStackTrace()", "isCorrect": true },
      { "text": "ex.getStackTrace()", "isCorrect": false },
      { "text": "System.out.println(ex)", "isCorrect": false },
      { "text": "ex.printTrace()", "isCorrect": false },
      { "text": "ex.showStackTrace()", "isCorrect": false },
      { "text": "Debug.printStackTrace(ex)", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će biti rezultat izvršavanja sljedećeg koda s unchecked iznimkom?",
    "codeSnippet": "public class Test {\n    public static void validate(String email) {\n        if (email == null || !email.contains(\"@\")) {\n            throw new IllegalArgumentException(\"Invalid email\");\n        }\n    }\n    \n    public static void main(String[] args) {\n        validate(\"korisnik.foi.hr\");\n        System.out.println(\"Validacija prošla\");\n    }\n}",
    "explanation": "Program će baciti neuhvaćenu IllegalArgumentException i prekinuti izvođenje jer email ne sadrži '@'. IllegalArgumentException je unchecked iznimka (nasljeđuje RuntimeException) pa se ne mora hvatati ili deklarirati, ali ako se ne uhvati, program će pasti. 'Validacija prošla' se neće ispisati. Za produkcijski kod trebalo bi dodati try-catch ili provjeriti ulazne podatke prije poziva.",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca neuhvaćenu IllegalArgumentException i program se prekida", "isCorrect": true },
      { "text": "Ispisuje 'Validacija prošla'", "isCorrect": false },
      { "text": "Neće se kompilirati - IllegalArgumentException se mora hvatati", "isCorrect": false },
      { "text": "Ispisuje 'Invalid email' i nastavlja", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje throws deklaracija", "isCorrect": false },
      { "text": "Vraća null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koja je razlika između sljedeća dva načina rukovanja resursima?",
    "codeSnippet": "// Način 1\nBufferedReader br = null;\ntry {\n    br = new BufferedReader(new FileReader(\"file.txt\"));\n    return br.readLine();\n} finally {\n    if (br != null) br.close();\n}\n\n// Način 2\ntry (BufferedReader br = new BufferedReader(\n        new FileReader(\"file.txt\"))) {\n    return br.readLine();\n}",
    "explanation": "Način 2 (try-with-resources) je BOLJI. Prednosti: (1) Automatsko zatvaranje bez ručnog poziva close(), (2) Kraći kod - nema potrebe za finally blokom, (3) Sigurniji - resurs br je implicitno final, (4) Bolje rukovanje s iznimkama - ako se dogodi iznimka i u try i pri zatvaranju, primarnu iznimku se hvata, a close iznimka postaje suppressed. Način 1 može izgubiti informaciju o iznimci iz try bloka ako close() također baci iznimku.",
    "difficulty": "HARD",
    "options": [
      { "text": "Način 2 je bolji - automatsko zatvaranje, kraći kod, sigurniji, bolje rukovanje s višestrukim iznimkama", "isCorrect": true },
      { "text": "Način 1 je bolji jer daje više kontrole", "isCorrect": false },
      { "text": "Nema razlike, samo različita sintaksa", "isCorrect": false },
      { "text": "Način 2 je sporiji ali sigurniji", "isCorrect": false },
      { "text": "Način 1 hvata više tipova iznimaka", "isCorrect": false },
      { "text": "Način 2 ne zatvara resurs automatski", "isCorrect": false }
    ]
  }
]
}
