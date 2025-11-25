import { QuestionType, Difficulty } from '@prisma/client'

export const classesAndObjectsQuestions = {
  lectureSlug: 'classes-and-objects',
  questions: [
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Koja je veza između klase i objekta u Javi?",
      "explanation": "Klasa je blueprint (predložak, kalup) koji definira strukturu i ponašanje, dok je objekt konkretna instanca te klase kreirana u memoriji. Kao što je kalup za kolačiće recept, a kolačić sam proizvod - jedna klasa može imati bezbroj objekata kreiranih pomoću operatora new.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Klasa je blueprint, objekt je konkretna instanca klase", "isCorrect": true },
        { "text": "Objekt je blueprint, klasa je konkretna instanca objekta", "isCorrect": false },
        { "text": "Klasa i objekt su sinonimi - označavaju istu stvar", "isCorrect": false },
        { "text": "Klasa sadrži objekte, ali objekti ne sadrže klase", "isCorrect": false },
        { "text": "Objekt može postojati bez klase u Javi", "isCorrect": false },
        { "text": "Klasa se kreira operatorom new, objekt se kreira bez new", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što od navedenog vrijedi i za atribute i za metode klase?",
      "explanation": "I atributi i metode mogu biti public ili private (kontrola pristupa), mogu biti static (pripadaju klasi, ne objektu), mogu imati različite modifikatore pristupa, i mogu se nasljeđivati u podklasama. Oba su članovi klase koji definiraju njezinu strukturu i ponašanje.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Mogu biti public ili private", "isCorrect": true },
        { "text": "Mogu biti static", "isCorrect": true },
        { "text": "Mogu se nasljeđivati", "isCorrect": true },
        { "text": "Mogu se preklopiti (override)", "isCorrect": false },
        { "text": "Uvijek moraju biti inicijalizirani pri deklaraciji", "isCorrect": false },
        { "text": "Ne mogu imati modifikatore pristupa", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Ako se kod definiranja članova klase navede modifikator private, što od navedenog vrijedi za te članove?",
      "explanation": "Private modifikator znači da su članovi dostupni SAMO unutar iste klase u kojoj su deklarirani. Nisu dostupni ni iz podklasa, ni iz drugih klasa u istom paketu, ni iz vanjskih klasa. Ovo je temelj enkapsulacije - sakrivanja implementacijskih detalja.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Dostupni samo unutar klase u kojoj su deklarirani", "isCorrect": true },
        { "text": "Dostupni iz svih klasa u istom paketu", "isCorrect": false },
        { "text": "Dostupni iz podklasa", "isCorrect": false },
        { "text": "Dostupni iz svih klasa ako koriste getter/setter", "isCorrect": false },
        { "text": "Dostupni svugdje jer je Java objektno-orijentirana", "isCorrect": false },
        { "text": "Dostupni samo iz main metode", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Prema konvencijama nazivanja u Javi, kako se pravilno imenuju klase, varijable i metode?",
      "explanation": "Java koristi PascalCase za klase (prvo slovo veliko: MyClass, StudentAccount), camelCase za varijable i metode (prvo slovo malo: myVariable, calculateSum), i izbjegavaju se hrvatski znakovi. Svaka klasa mora biti u .java datoteci s istim imenom kao klasa.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Klase: PascalCase, varijable i metode: camelCase", "isCorrect": true },
        { "text": "Klase: camelCase, varijable i metode: PascalCase", "isCorrect": false },
        { "text": "Sve: snake_case kao u Pythonu", "isCorrect": false },
        { "text": "Klase: UPPER_CASE, varijable: lower_case", "isCorrect": false },
        { "text": "Nema standardne konvencije, programer bira stil", "isCorrect": false },
        { "text": "Klase: lowercase, metode: UPPERCASE", "isCorrect": false }
      ]
    },
    {
      "type": "TRUE_FALSE",
      "prompt": "Ako ne napišemo konstruktor u klasi, Java automatski kreira defaultni konstruktor bez parametara.",
      "explanation": "TRUE. Java automatski generira defaultni (no-arg) konstruktor ako programer ne definira niti jedan konstruktor. Međutim, čim programer napiše bilo koji konstruktor s parametrima, defaultni konstruktor više nije automatski dostupan i mora se eksplicitno napisati ako je potreban.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "True", "isCorrect": true },
        { "text": "False", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Koja je razlika između primitivnih i referentnih tipova u Javi?",
      "explanation": "Primitivni tipovi (int, double, boolean, char...) pohranjuju stvarnu vrijednost i defaultna im je vrijednost 0 ili false. Referentni tipovi (String, objekti klasa) pohranjuju adresu objekta u memoriji, a defaultna im je vrijednost null. Pokušaj korištenja metode na null objektu rezultira NullPointerException.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Primitivni pohranjuju vrijednost (default 0/false), referentni pohranjuju adresu (default null)", "isCorrect": true },
        { "text": "Primitivni pohranjuju adresu, referentni pohranjuju vrijednost", "isCorrect": false },
        { "text": "Primitivni mogu biti null, referentni ne mogu", "isCorrect": false },
        { "text": "Nema razlike, samo različiti nazivi", "isCorrect": false },
        { "text": "Primitivni se kreiraju s new, referentni bez new", "isCorrect": false },
        { "text": "Referentni tipovi uvijek zauzimaju više memorije", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa kada dvije referentne varijable pokazuju na isti objekt u memoriji?",
      "explanation": "Kada dva referenca pokazuju na isti objekt (npr. secondDate = firstDate), obje varijable dijele istu memorijsku lokaciju. Promjena objekta preko jedne varijable vidljiva je kroz drugu. Operator == vraća true jer uspoređuje adrese. Ovo je ključni koncept za razumijevanje rada s objektima u Javi.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Promjena preko jedne varijable mijenja objekt za obje", "isCorrect": true },
        { "text": "Operator == vraća true jer pokazuju na istu adresu", "isCorrect": true },
        { "text": "Dijele istu memorijsku lokaciju", "isCorrect": true },
        { "text": "Svaka varijabla ima svoju kopiju objekta", "isCorrect": false },
        { "text": "Operator == uvijek vraća false za referentne tipove", "isCorrect": false },
        { "text": "Java automatski kreira nove objekte pri dodjeli", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Koja je razlika između operatora == i metode .equals() kod uspoređivanja objekata?",
      "explanation": "Operator == uspoređuje reference (memorijske adrese) - provjerava jesu li to FIZIČKI isti objekti u memoriji. Metoda .equals() uspoređuje SADRŽAJ/VRIJEDNOSTI objekata - provjerava jesu li logički ekvivalentni. Za String objekte UVIJEK treba koristiti .equals(), nikad ==.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "== uspoređuje reference (adrese), .equals() uspoređuje vrijednosti", "isCorrect": true },
        { "text": "== uspoređuje vrijednosti, .equals() uspoređuje reference", "isCorrect": false },
        { "text": "Nema razlike, oba rade isto", "isCorrect": false },
        { "text": "== se koristi za primitivne, .equals() ne postoji", "isCorrect": false },
        { "text": ".equals() radi samo za brojeve", "isCorrect": false },
        { "text": "== je brži ali manje precizan od .equals()", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Što od navedenog NE vrijedi za konstruktore u Javi?",
      "explanation": "Konstruktori NEMAJU povratni tip (ni void). Konstruktor mora imati isto ime kao klasa, poziva se operatorom new, i služi za inicijalizaciju objekta. Može biti public, private ili protected. Može primati parametre. Klasa može imati više konstruktora (overloading).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Konstruktor mora imati povratni tip void", "isCorrect": true },
        { "text": "Konstruktor mora imati isto ime kao klasa", "isCorrect": false },
        { "text": "Konstruktor se poziva operatorom new", "isCorrect": false },
        { "text": "Konstruktor može primati parametre", "isCorrect": false },
        { "text": "Klasa može imati više konstruktora", "isCorrect": false },
        { "text": "Konstruktor može biti private", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje klase iz Date and Time API-ja (Java 8+) se koriste za rad s datumima i vremenom?",
      "explanation": "Java 8 je uvela novi Date/Time API: LocalDate (samo datum), LocalTime (samo vrijeme), LocalDateTime (datum + vrijeme), Instant (timestamp od 1970). DateTimeFormatter se koristi za formatiranje. Stari Date i Calendar su zastarjeli i ne preporučuju se.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "LocalDate - samo datum (godina, mjesec, dan)", "isCorrect": true },
        { "text": "LocalTime - samo vrijeme (sati, minute, sekunde)", "isCorrect": true },
        { "text": "LocalDateTime - datum i vrijeme zajedno", "isCorrect": true },
        { "text": "Date - moderna klasa za rad s datumima", "isCorrect": false },
        { "text": "Calendar - preporučena klasa za vrijeme", "isCorrect": false },
        { "text": "DateTime - glavna klasa za datum i vrijeme", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Što je enkapsulacija u objektno-orijentiranom programiranju?",
      "explanation": "Enkapsulacija je sakrivanje unutarnjih detalja implementacije i kontrola pristupa podacima kroz javne metode (getters/setters). Privatni atributi se ne mogu direktno mijenjati izvana, već samo kroz metode koje mogu uključivati validaciju. To je jedan od temeljnih principa OOP-a.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Sakrivanje podataka i kontrola pristupa kroz metode", "isCorrect": true },
        { "text": "Kreiranje objekata iz klasa", "isCorrect": false },
        { "text": "Nasljeđivanje svojstava iz roditeljske klase", "isCorrect": false },
        { "text": "Mogućnost korištenja više konstruktora", "isCorrect": false },
        { "text": "Pakiranje više klasa u jedan paket", "isCorrect": false },
        { "text": "Korištenje gettera i settera bez validacije", "isCorrect": false }
      ]
    },
    {
      "type": "TRUE_FALSE",
      "prompt": "Svaka klasa u Javi mora biti smještena u .java datoteku s istim imenom kao što je ime klase.",
      "explanation": "TRUE. Javina konvencija zahtijeva da javna klasa (public class) bude u .java datoteci koja ima isto ime. Npr. klasa 'Account' mora biti u datoteci 'Account.java'. Jedna datoteka može sadržavati više klasa, ali samo jedna može biti public i mora imati isto ime kao datoteka.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "True", "isCorrect": true },
        { "text": "False", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Koja ključna riječ se koristi za kreiranje novog objekta u Javi?",
      "explanation": "Ključna riječ 'new' se koristi za kreiranje novog objekta. Ona alocira memoriju za objekt i poziva konstruktor klase. Primjer: Account racun = new Account(); - ovdje 'new' kreira objekt tipa Account u memoriji.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "new", "isCorrect": true },
        { "text": "create", "isCorrect": false },
        { "text": "object", "isCorrect": false },
        { "text": "instance", "isCorrect": false },
        { "text": "make", "isCorrect": false },
        { "text": "init", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je potrebno navesti pri definiciji Java klase?",
      "explanation": "Pri definiciji klase potrebno je: deklaracija paketa (package), import deklaracije za klase iz drugih paketa, modifikator pristupa (public/private), ključna riječ 'class', ime klase (PascalCase), tijelo klase s atributima i metodama. Extends i implements su opcionalni.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Deklaracija paketa (package)", "isCorrect": true },
        { "text": "Import deklaracije za vanjske klase", "isCorrect": true },
        { "text": "Modifikator pristupa (public/private)", "isCorrect": true },
        { "text": "Uvijek mora nasljeđivati neku klasu (extends)", "isCorrect": false },
        { "text": "Mora implementirati barem jedno sučelje", "isCorrect": false },
        { "text": "Mora imati main metodu", "isCorrect": false }
      ]
    },
    {
      "type": "SINGLE_CHOICE",
      "prompt": "Što je NullPointerException i kada se događa?",
      "explanation": "NullPointerException nastaje kada pokušamo pristupiti metodi ili atributu objekta koji je null (ne pokazuje ni na jedan objekt u memoriji). Primjer: ako je 'account' null, poziv 'account.getName()' će baciti NullPointerException. To je najčešća runtime iznimka u Javi.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Iznimka koja nastaje kada pokušamo koristiti metodu objekta koji je null", "isCorrect": true },
        { "text": "Iznimka koja nastaje kod dijeljenja s nulom", "isCorrect": false },
        { "text": "Iznimka koja nastaje kod pristupa izvan granica polja", "isCorrect": false },
        { "text": "Iznimka koja nastaje kod krivogcastanja tipova", "isCorrect": false },
        { "text": "Iznimka koja nastaje kod neispravnog unosa podataka", "isCorrect": false },
        { "text": "Iznimka koja nastaje kod stack overflow-a", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati i što će ispisati?",
      "codeSnippet": "public class Student {\n    private String ime;\n    private int godine;\n    \n    public Student(String ime, int godine) {\n        this.ime = ime;\n        this.godine = godine;\n    }\n    \n    public void ispis() {\n        System.out.println(ime + \" ima \" + godine + \" godina\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Student s1 = new Student(\"Ana\", 20);\n        Student s2 = new Student(\"Marko\", 22);\n        s1.ispis();\n        s2.ispis();\n    }\n}",
      "explanation": "Kod će se kompilirati i izvršiti uspješno. Ispisat će: 'Ana ima 20 godina' i 'Marko ima 22 godina'. Klasa Student ima konstruktor s parametrima koji inicijalizira privatne atribute koristeći 'this' ključnu riječ za razlikovanje parametara od atributa. Metoda ispis() koristi te atribute za ispis.",
      "difficulty": "HARD",
      "options": [
        { "text": "Kompilira se i ispisuje 'Ana ima 20 godina' i 'Marko ima 22 godina'", "isCorrect": true },
        { "text": "Neće se kompilirati jer atributi su private", "isCorrect": false },
        { "text": "Neće se kompilirati jer nedostaje defaultni konstruktor", "isCorrect": false },
        { "text": "Kompilira se ali baca NullPointerException", "isCorrect": false },
        { "text": "Neće se kompilirati jer metoda ispis() ne vraća vrijednost", "isCorrect": false },
        { "text": "Kompilira se ali ispisuje null vrijednosti", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Pronađite pogrešku u sljedećoj klasi:",
      "codeSnippet": "public class Racun {\n    private String vlasnik;\n    private double stanje;\n    \n    public Racun(String vlasnik, double pocetnoStanje) {\n        vlasnik = vlasnik;\n        stanje = pocetnoStanje;\n    }\n    \n    public String getVlasnik() {\n        return vlasnik;\n    }\n}",
      "explanation": "Greška je u konstruktoru: 'vlasnik = vlasnik;' dodjeljuje parametar sam sebi umjesto atributu klase. Trebalo bi biti 'this.vlasnik = vlasnik;'. Bez 'this' ključne riječi, Java ne zna da mislimo na atribut klase kada ime parametra i atributa poklapaju. Atribut ostaje null.",
      "difficulty": "HARD",
      "options": [
        { "text": "U konstruktoru nedostaje 'this' ključna riječ: treba biti 'this.vlasnik = vlasnik;'", "isCorrect": true },
        { "text": "Konstruktor ne smije imati isto ime kao klasa", "isCorrect": false },
        { "text": "Atribut vlasnik mora biti public", "isCorrect": false },
        { "text": "Nedostaje setter metoda za vlasnik", "isCorrect": false },
        { "text": "Konstruktor mora biti private", "isCorrect": false },
        { "text": "Nema pogreške u kodu", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći programski odsječak?",
      "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        String s1 = new String(\"Java\");\n        String s2 = new String(\"Java\");\n        String s3 = s1;\n        \n        System.out.println(s1 == s2);\n        System.out.println(s1 == s3);\n        System.out.println(s1.equals(s2));\n    }\n}",
      "explanation": "Ispisat će: false, true, true. (s1 == s2) je false jer su to različiti objekti u memoriji (različite adrese). (s1 == s3) je true jer s3 pokazuje na isti objekt kao s1. (s1.equals(s2)) je true jer equals() uspoređuje sadržaj stringova, a oba sadrže \"Java\".",
      "difficulty": "HARD",
      "options": [
        { "text": "false, true, true", "isCorrect": true },
        { "text": "true, true, true", "isCorrect": false },
        { "text": "false, false, true", "isCorrect": false },
        { "text": "true, false, false", "isCorrect": false },
        { "text": "false, false, false", "isCorrect": false },
        { "text": "Neće se kompilirati", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što nedostaje na mjestu označenom s '??' kako bi se ispisalo 'Student: Ana Anić'?",
      "codeSnippet": "public class Student {\n    private String ime;\n    private String prezime;\n    \n    public Student(String ime, String prezime) {\n        this.ime = ime;\n        this.prezime = prezime;\n    }\n    \n    public static void main(String[] args) {\n        Student s = new Student(\"Ana\", \"Anić\");\n        System.out.println(\"Student: \" + ??);\n    }\n}",
      "explanation": "Potrebno je napisati: s.ime + \" \" + s.prezime - ali ovo neće raditi jer su atributi private! Ispravno rješenje je dodati getter metode ili toString() metodu. Ili promijeniti atribute u public (loša praksa). Najčešće rješenje je dodati: public String toString() { return ime + \" \" + prezime; } pa onda pozvati samo 's'.",
      "difficulty": "HARD",
      "options": [
        { "text": "Dodati toString() metodu koja vraća ime + \" \" + prezime", "isCorrect": true },
        { "text": "s.ime + \" \" + s.prezime", "isCorrect": false },
        { "text": "Student.ime + \" \" + Student.prezime", "isCorrect": false },
        { "text": "getName() + \" \" + getPrezime()", "isCorrect": false },
        { "text": "s.getFullName()", "isCorrect": false },
        { "text": "this.ime + \" \" + this.prezime", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što se treba ispraviti u sljedećoj klasi da bi se mogla prevesti?",
      "codeSnippet": "public class Proizvod {\n    private String naziv;\n    private double cijena;\n    \n    private Proizvod(String naziv, double cijena) {\n        this.naziv = naziv;\n        this.cijena = cijena;\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Proizvod p = new Proizvod(\"Laptop\", 5000.0);\n        System.out.println(p.naziv);\n    }\n}",
      "explanation": "Dvije greške: (1) Konstruktor je private - ne može se pozvati izvan klase Proizvod. Treba biti public. (2) Atribut 'naziv' je private - ne može se direktno pristupiti izvana. Treba dodati public getter metodu ili promijeniti atribut u public (loša praksa). Ispravak: konstruktor na public i dodati getter.",
      "difficulty": "HARD",
      "options": [
        { "text": "Konstruktor mora biti public i treba dodati getter metodu za naziv", "isCorrect": true },
        { "text": "Samo konstruktor treba promijeniti u public", "isCorrect": false },
        { "text": "Samo atributi trebaju biti public", "isCorrect": false },
        { "text": "Klasa Proizvod mora biti abstract", "isCorrect": false },
        { "text": "Nedostaje import deklaracija", "isCorrect": false },
        { "text": "Nema pogreške u kodu", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što vraća sljedeći kod ako korisnik unese 'abc' umjesto broja?",
      "codeSnippet": "import java.util.Scanner;\n\npublic class Test {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.print(\"Unesite broj: \");\n        int broj = scanner.nextInt();\n        \n        System.out.println(\"Unijeli ste: \" + broj);\n        scanner.close();\n    }\n}",
      "explanation": "Ako korisnik unese 'abc' umjesto broja, scanner.nextInt() će baciti InputMismatchException jer 'abc' nije validan cijeli broj. Program će se prekinuti s iznimkom. Trebalo bi koristiti try-catch za hvatanje ove iznimke ili provjeravati unos s hasNextInt() prije poziva nextInt().",
      "difficulty": "HARD",
      "options": [
        { "text": "InputMismatchException - neispravni unos za int", "isCorrect": true },
        { "text": "NullPointerException", "isCorrect": false },
        { "text": "NumberFormatException", "isCorrect": false },
        { "text": "Vraća 0 kao defaultnu vrijednost", "isCorrect": false },
        { "text": "Vraća null", "isCorrect": false },
        { "text": "Program se izvršava normalno i ispisuje 'abc'", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s poljima?",
      "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        int[] brojevi = new int[3];\n        String[] imena = new String[2];\n        \n        System.out.println(brojevi[0]);\n        System.out.println(imena[0]);\n        System.out.println(brojevi.length);\n    }\n}",
      "explanation": "Ispisat će: 0 (defaultna vrijednost za int), null (defaultna vrijednost za referentne tipove), 3 (duljina polja). Primitivni tipovi u poljima automatski se inicijaliziraju na 0, false ili '\\u0000', dok se referentni tipovi inicijaliziraju na null.",
      "difficulty": "HARD",
      "options": [
        { "text": "0, null, 3", "isCorrect": true },
        { "text": "null, null, 3", "isCorrect": false },
        { "text": "0, 0, 3", "isCorrect": false },
        { "text": "undefined, undefined, 3", "isCorrect": false },
        { "text": "Baca NullPointerException", "isCorrect": false },
        { "text": "Baca ArrayIndexOutOfBoundsException", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s novim switch izrazom (Java 13+)?",
      "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        String dan = \"SUB\";\n        \n        String tip = switch(dan) {\n            case \"PON\", \"UTO\", \"SRI\", \"CET\", \"PET\" -> \"Radni dan\";\n            case \"SUB\", \"NED\" -> \"Vikend\";\n            default -> \"Nepoznato\";\n        };\n        \n        System.out.println(\"Tip dana: \" + tip);\n    }\n}",
      "explanation": "Ispisat će: 'Tip dana: Vikend'. Novi switch izraz (Java 13+) koristi -> sintaksu i može vraćati vrijednost. Slučajevi se mogu kombinirati s zarezom. Ne treba break jer svaki -> automatski završava granu. 'SUB' se podudara s drugim case-om koji vraća 'Vikend'.",
      "difficulty": "HARD",
      "options": [
        { "text": "Tip dana: Vikend", "isCorrect": true },
        { "text": "Tip dana: Radni dan", "isCorrect": false },
        { "text": "Tip dana: Nepoznato", "isCorrect": false },
        { "text": "Neće se kompilirati - nedostaje break", "isCorrect": false },
        { "text": "Neće se kompilirati - krivi switch format", "isCorrect": false },
        { "text": "Baca IllegalArgumentException", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će biti rezultat izvršavanja sljedećeg koda?",
      "codeSnippet": "public class Osoba {\n    String ime;\n    int starost;\n    \n    public Osoba(String ime) {\n        ime = ime;\n    }\n    \n    public static void main(String[] args) {\n        Osoba o = new Osoba(\"Marko\");\n        System.out.println(\"Ime: \" + o.ime);\n        System.out.println(\"Starost: \" + o.starost);\n    }\n}",
      "explanation": "Ispisat će: 'Ime: null' i 'Starost: 0'. Greška je u konstruktoru: 'ime = ime;' dodjeljuje parametar sam sebi jer nedostaje 'this'. Atribut 'ime' ostaje null (defaultna vrijednost). Atribut 'starost' nije inicijaliziran pa je 0 (defaultna vrijednost za int). Trebalo bi biti 'this.ime = ime;'.",
      "difficulty": "HARD",
      "options": [
        { "text": "Ime: null, Starost: 0", "isCorrect": true },
        { "text": "Ime: Marko, Starost: 0", "isCorrect": false },
        { "text": "Neće se kompilirati", "isCorrect": false },
        { "text": "Baca NullPointerException", "isCorrect": false },
        { "text": "Ime: , Starost: 0", "isCorrect": false },
        { "text": "Ime: Marko, Starost: null", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Pomoću koje naredbe je moguće formatirati LocalDateTime objekt u format 'dd.MM.yyyy.'?",
      "codeSnippet": "import java.time.LocalDateTime;\nimport java.time.format.DateTimeFormatter;\n\npublic class Test {\n    public static void main(String[] args) {\n        LocalDateTime sada = LocalDateTime.now();\n        // Formatiranje u dd.MM.yyyy.\n    }\n}",
      "explanation": "Točna naredba je: sada.format(DateTimeFormatter.ofPattern(\"dd.MM.yyyy.\")). DateTimeFormatter.ofPattern() kreira formatter s custom uzorkom, a metoda format() primjenjuje taj formatter na LocalDateTime objekt i vraća String. Primjer: '25.11.2025.'",
      "difficulty": "HARD",
      "options": [
        { "text": "sada.format(DateTimeFormatter.ofPattern(\"dd.MM.yyyy.\"))", "isCorrect": true },
        { "text": "DateTimeFormatter.format(sada, \"dd.MM.yyyy.\")", "isCorrect": false },
        { "text": "sada.toString(\"dd.MM.yyyy.\")", "isCorrect": false },
        { "text": "sada.parse(\"dd.MM.yyyy.\")", "isCorrect": false },
        { "text": "LocalDateTime.format(sada, \"dd.MM.yyyy.\")", "isCorrect": false },
        { "text": "new SimpleDateFormat(\"dd.MM.yyyy.\").format(sada)", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s Scanner klasom?",
      "codeSnippet": "import java.util.Scanner;\n\npublic class Test {\n    public static void main(String[] args) {\n        String input = \"Ana Marić 25 3.8\";\n        Scanner scanner = new Scanner(input);\n        \n        String ime = scanner.next();\n        String prezime = scanner.next();\n        int godine = scanner.nextInt();\n        double prosjek = scanner.nextDouble();\n        \n        System.out.println(ime + \" \" + prezime + \", \" + godine + \", \" + prosjek);\n        scanner.close();\n    }\n}",
      "explanation": "Ispisat će: 'Ana Marić, 25, 3.8'. Scanner može čitati iz String-a, ne samo iz System.in. Metoda next() čita sljedeću riječ (do praznine), nextInt() čita cijeli broj, nextDouble() čita decimalni broj. Scanner automatski preskače praznine (whitespace).",
      "difficulty": "HARD",
      "options": [
        { "text": "Ana Marić, 25, 3.8", "isCorrect": true },
        { "text": "Ana Marić 25 3.8", "isCorrect": false },
        { "text": "Neće se kompilirati", "isCorrect": false },
        { "text": "Baca InputMismatchException", "isCorrect": false },
        { "text": "Ana, 25, 3.8", "isCorrect": false },
        { "text": "Ispisuje samo 'Ana'", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što se događa kada pokušamo pristupiti elementu polja izvan njegovih granica?",
      "codeSnippet": "public class Test {\n    public static void main(String[] args) {\n        int[] brojevi = {10, 20, 30};\n        System.out.println(brojevi[3]);\n    }\n}",
      "explanation": "Baca ArrayIndexOutOfBoundsException jer pokušavamo pristupiti indeksu 3, a polje ima samo indekse 0, 1, 2 (duljina 3). Java provjerava granice polja pri svakom pristupu (bounds checking). Ovo je runtime iznimka koja se može uhvatiti try-catch blokom.",
      "difficulty": "HARD",
      "options": [
        { "text": "ArrayIndexOutOfBoundsException", "isCorrect": true },
        { "text": "NullPointerException", "isCorrect": false },
        { "text": "IndexOutOfBoundsException", "isCorrect": false },
        { "text": "Vraća 0 kao defaultnu vrijednost", "isCorrect": false },
        { "text": "Vraća null", "isCorrect": false },
        { "text": "Neće se kompilirati", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Koja je razlika između statickih i nestatičkih metoda u sljedećem primjeru?",
      "codeSnippet": "public class Kalkulator {\n    private int vrijednost;\n    \n    public static int zbroji(int a, int b) {\n        return a + b;\n    }\n    \n    public int dodaj(int broj) {\n        vrijednost += broj;\n        return vrijednost;\n    }\n    \n    public static void main(String[] args) {\n        // Statička metoda - bez objekta\n        int rezultat1 = Kalkulator.zbroji(5, 10);\n        \n        // Nestatička metoda - potreban objekt\n        Kalkulator k = new Kalkulator();\n        int rezultat2 = k.dodaj(5);\n        \n        System.out.println(rezultat1 + \", \" + rezultat2);\n    }\n}",
      "explanation": "Ispisat će: '15, 5'. Statička metoda (zbroji) pripada klasi i može se pozvati bez kreiranja objekta. Nestatička metoda (dodaj) pripada objektu i mora se pozvati na instanci. Statičke metode NE mogu pristupiti nestatičkim atributima (vrijednost), dok nestatičke mogu pristupiti svim članovima.",
      "difficulty": "HARD",
      "options": [
        { "text": "Statičke se pozivaju na klasi bez objekta, nestatičke trebaju objekt i mogu pristupiti atributima", "isCorrect": true },
        { "text": "Nema razlike, obje se pozivaju isto", "isCorrect": false },
        { "text": "Statičke su brže, nestatičke sporije", "isCorrect": false },
        { "text": "Statičke mogu pristupiti privatnim atributima, nestatičke ne mogu", "isCorrect": false },
        { "text": "Nestatičke se mogu pozvati bez objekta ako su public", "isCorrect": false },
        { "text": "Kod se neće kompilirati", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s toString() metodom?",
      "codeSnippet": "public class Auto {\n    private String marka;\n    private int godina;\n    \n    public Auto(String marka, int godina) {\n        this.marka = marka;\n        this.godina = godina;\n    }\n    \n    @Override\n    public String toString() {\n        return marka + \" (\" + godina + \")\";\n    }\n    \n    public static void main(String[] args) {\n        Auto a = new Auto(\"BMW\", 2020);\n        System.out.println(a);\n    }\n}",
      "explanation": "Ispisat će: 'BMW (2020)'. Kada se objekt ispisuje direktno (System.out.println(a)), Java automatski poziva toString() metodu. Ako ne napišemo vlastitu toString() metodu, poziva se ona iz Object klase koja vraća nešto poput 'Auto@15db9742'. Preporučuje se uvijek override-ati toString().",
      "difficulty": "HARD",
      "options": [
        { "text": "BMW (2020)", "isCorrect": true },
        { "text": "Auto@hashcode", "isCorrect": false },
        { "text": "null (null)", "isCorrect": false },
        { "text": "marka (godina)", "isCorrect": false },
        { "text": "Neće se kompilirati", "isCorrect": false },
        { "text": "Baca NullPointerException", "isCorrect": false }
      ]
    }
  ]
}
