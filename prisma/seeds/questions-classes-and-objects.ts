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
    },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koji je TOČAN redoslijed inicijalizacije u Java klasi?",
    "explanation": "Redoslijed inicijalizacije: (1) STATIC blokovi i static varijable (redoslijedom kako se pojavljuju) - pri PRVOM učitavanju klase! (2) INSTANCE blokovi i instance varijable (redoslijedom kako se pojavljuju) - pri svakom kreiranju objekta. (3) KONSTRUKTOR tijelo - zadnje! Static inicijalizacija se dešava JEDNOM pri class loading-u (prije bilo koje instance). Instance inicijalizacija se dešava pri SVAKOM new operatoru. Primjer: static { } se izvršava PRIJE instance inicijalizatora { } koji se izvršava PRIJE konstruktora! Ovo je KLJUČNO za razumijevanje kada se koja varijabla inicijalizira.",
    "difficulty": "HARD",
    "options": [
      { "text": "Static blokovi → Instance blokovi → Konstruktor", "isCorrect": true },
      { "text": "Konstruktor → Static blokovi → Instance blokovi", "isCorrect": false },
      { "text": "Instance blokovi → Static blokovi → Konstruktor", "isCorrect": false },
      { "text": "Static blokovi → Konstruktor → Instance blokovi", "isCorrect": false },
      { "text": "Sve se izvršava istovremeno", "isCorrect": false },
      { "text": "Redoslijed ovisi o JVM implementaciji", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s static i instance inicijalizacijom?",
    "codeSnippet": "public class InitOrder {\n    private static int staticVar = initStatic();\n    private int instanceVar = initInstance();\n    \n    static {\n        System.out.print(\"A\");\n    }\n    \n    {\n        System.out.print(\"B\");\n    }\n    \n    public InitOrder() {\n        System.out.print(\"C\");\n    }\n    \n    private static int initStatic() {\n        System.out.print(\"S\");\n        return 1;\n    }\n    \n    private int initInstance() {\n        System.out.print(\"I\");\n        return 2;\n    }\n    \n    public static void main(String[] args) {\n        new InitOrder();\n        new InitOrder();\n    }\n}",
    "explanation": "Ispisat će 'SAIBCIBC'. Redoslijed: (1) STATIC inicijalizacija pri class loading-u: initStatic() = 'S', static blok = 'A' (JEDNOM!). (2) PRVA instanca: initInstance() = 'I', instance blok = 'B', konstruktor = 'C'. (3) DRUGA instanca: initInstance() = 'I', instance blok = 'B', konstruktor = 'C'. Static dio ('SA') se izvršava SAMO JEDNOM pri prvom učitavanju klase! Instance dio ('IBC') se ponavlja za SVAKI new operator. Static varijable inicijaliziraju se PRIJE static blokova ako su deklarirane prije, zatim po redoslijedu. Isti princip za instance članove.",
    "difficulty": "HARD",
    "options": [
      { "text": "SAIBCIBC - static jednom, instance dvaput", "isCorrect": true },
      { "text": "SAIBCSAIBC - static se ponavlja", "isCorrect": false },
      { "text": "IBCSAIBC - instance prije static", "isCorrect": false },
      { "text": "SABCBC - initInstance() se preskače", "isCorrect": false },
      { "text": "Neće se kompilirati - static ne može pozivati metode", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje od sljedećih su DEFAULTNE vrijednosti za članke varijable? (Odaberite sve točne)",
    "explanation": "Defaultne vrijednosti za ČLANKE varijable (fields): (1) byte/short/int/long = 0 (ili 0L). (2) float/double = 0.0 (ili 0.0f/0.0d). (3) boolean = false. (4) char = '\\u0000' (null character). (5) Referentni tipovi (Object, String, Array) = null. VAŽNO: ovo vrijedi SAMO za ČLANKE varijable (instance/static fields)! LOKALNE varijable NEMAJU default vrijednosti - moraju biti eksplicitno inicijalizirane prije korištenja ili kompajler javlja grešku! Primjer: class Test { int x; } - x je automatski 0. Metoda: void method() { int x; System.out.println(x); } - GREŠKA, x nije inicijaliziran!",
    "difficulty": "HARD",
    "options": [
      { "text": "int = 0", "isCorrect": true },
      { "text": "boolean = false", "isCorrect": true },
      { "text": "char = '\\u0000'", "isCorrect": true },
      { "text": "String = null", "isCorrect": true },
      { "text": "Lokalne varijable = 0", "isCorrect": false },
      { "text": "double = NaN", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je razlika između System.out.print() i System.out.println()?",
    "explanation": "println() dodaje NEWLINE (\\n) na kraju ispisa, print() NE dodaje! println() = print() + newline. Primjer: System.out.print(\"A\"); System.out.print(\"B\"); ispisuje 'AB' u jednom redu. System.out.println(\"A\"); System.out.println(\"B\"); ispisuje 'A' i 'B' u DVA reda. println() bez argumenata ispisuje SAMO newline (prazni red). print() može primiti bilo koji tip (String, int, Object) i poziva toString() za ispis. printf() omogućava FORMATIRANJE s placeholderima (%d, %s, %f). Platform-specific newline: println() koristi System.lineSeparator() (\\n na Unix, \\r\\n na Windows).",
    "difficulty": "HARD",
    "options": [
      { "text": "println() dodaje newline (\\n) na kraju, print() ne dodaje", "isCorrect": true },
      { "text": "println() je brži zbog buffer optimizacije", "isCorrect": false },
      { "text": "print() može primiti više argumenata, println() samo jedan", "isCorrect": false },
      { "text": "println() automatski poziva toString(), print() ne", "isCorrect": false },
      { "text": "Nema razlike - sinonimi su", "isCorrect": false },
      { "text": "print() je deprecated, treba koristiti println()", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s Scanner i buffer problemima?",
    "codeSnippet": "import java.util.Scanner;\n\npublic class ScannerBufferTest {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        System.out.print(\"Unesi broj: \");\n        int broj = scanner.nextInt();\n        \n        System.out.print(\"Unesi ime: \");\n        String ime = scanner.nextLine();\n        \n        System.out.println(\"Broj: \" + broj);\n        System.out.println(\"Ime: \" + ime);\n    }\n}",
    "explanation": "Kod se kompilira ALI ima LOGIC ERROR! Problem: nextInt() čita broj ali OSTAVLJA newline (\\n) u bufferu! Kada se pozove nextLine(), on čita taj PREOSTALI newline pa vraća PRAZAN string umjesto čekanja user inputa! 'ime' će biti prazan string ''. RJEŠENJA: (1) Dodati scanner.nextLine() NAKON nextInt() za konzumiranje newline-a. (2) Koristiti nextLine() za SVE pa parsirati: int broj = Integer.parseInt(scanner.nextLine()). (3) Koristiti next() umjesto nextLine() (ali čita samo prvu riječ). Ovo je NAJČEŠĆA zamka sa Scanner-om! nextInt/nextDouble ostavljaju \\n, nextLine() ga čita.",
    "difficulty": "HARD",
    "options": [
      { "text": "0 compile grešaka, 1 logic greška - nextInt() ostavlja \\n u bufferu", "isCorrect": true },
      { "text": "1 greška - nextLine() ne može se pozvati nakon nextInt()", "isCorrect": false },
      { "text": "0 grešaka - sve radi kako treba", "isCorrect": false },
      { "text": "2 greške - scanner nije zatvoren i nextInt() ne postoji", "isCorrect": false },
      { "text": "1 greška - Scanner ne može čitati String i int u istom programu", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što printf format specifier '%n' radi i zašto je bolji od '\\n'?",
    "explanation": "%n je PLATFORM-INDEPENDENT newline u printf()! Na Windows-u je \\r\\n, na Unix/Linux/Mac je \\n. \\n je HARDCODED newline koji uvijek ispisuje LF (line feed) bez obzira na platform. %n koristi System.lineSeparator() za PRAVI platform-specific newline! Primjer: System.out.printf(\"Line1%nLine2%n\"); radi ispravno na SVIM platformima. \\n može stvarati probleme na Windows aplikacijama koje očekuju CRLF. Drugi printf specifiers: %s (String), %d (int), %f (float/double), %b (boolean), %c (char), %x (hex), %o (octal). %n je POSEBAN - ne prima argument!",
    "difficulty": "HARD",
    "options": [
      { "text": "%n je platform-independent newline (\\r\\n na Windows, \\n na Unix)", "isCorrect": true },
      { "text": "%n je null check - ispisuje 'null' za null reference", "isCorrect": false },
      { "text": "\\n je bolji jer je brži - %n zahtijeva platform detection", "isCorrect": false },
      { "text": "%n i \\n su identični - nema razlike", "isCorrect": false },
      { "text": "%n formatira broj u scientific notation", "isCorrect": false },
      { "text": "%n je deprecated u Java 25, treba koristiti \\n", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su razlike između primitivnih i referentnih tipova? (Odaberite sve točne)",
    "explanation": "RAZLIKE: (1) Primitivni drže VRIJEDNOST direktno, referentni drže ADRESU objekta u memoriji. (2) Primitivni su na STACK-u (brži pristup), referentni objekti su na HEAP-u. (3) Primitivni imaju FIXED SIZE (int=4 bytes), referentni dynamic size. (4) Primitivni se kopiraju PO VRIJEDNOSTI (int a=b kopira broj), referentni PO REFERENCI (Object a=b dijele isti objekt). (5) Primitivni imaju DEFAULT vrijednosti za fields (int=0), referentni=null. (6) Primitivni NEMAJU metode, referentni IMAJU (wrapper classes daju metode). (7) Primitivni: byte, short, int, long, float, double, boolean, char. Referentni: SVE ostalo (Object, String, Array).",
    "difficulty": "HARD",
    "options": [
      { "text": "Primitivni drže vrijednost, referentni drže adresu", "isCorrect": true },
      { "text": "Primitivni na stack-u, referentni objekti na heap-u", "isCorrect": true },
      { "text": "Primitivni kopiraju po vrijednosti, referentni po referenci", "isCorrect": true },
      { "text": "Primitivni imaju metode, referentni ne", "isCorrect": false },
      { "text": "String je primitivni tip", "isCorrect": false },
      { "text": "Array je primitivni tip", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s pass-by-value?",
    "codeSnippet": "class Person {\n    String name;\n    \n    Person(String name) {\n        this.name = name;\n    }\n}\n\npublic class PassByValueTest {\n    public static void changePrimitive(int x) {\n        x = 100;\n    }\n    \n    public static void changeReference(Person p) {\n        p.name = \"Changed\";\n    }\n    \n    public static void reassignReference(Person p) {\n        p = new Person(\"New Person\");\n    }\n    \n    public static void main(String[] args) {\n        int num = 10;\n        changePrimitive(num);\n        System.out.println(num);\n        \n        Person person = new Person(\"Original\");\n        changeReference(person);\n        System.out.println(person.name);\n        \n        reassignReference(person);\n        System.out.println(person.name);\n    }\n}",
    "explanation": "Ispisat će: '10', 'Changed', 'Changed'. Java je UVIJEK pass-by-VALUE! (1) changePrimitive(): kopira se VRIJEDNOST int-a (10), promjena lokalne varijable x ne utječe na num. (2) changeReference(): kopira se VRIJEDNOST reference (adresa objekta), ali OBA pokazuju na ISTI objekt! p.name = 'Changed' mijenja originalni objekt. (3) reassignReference(): p = new Person() mijenja LOKALNU kopiju reference - ne utječe na originalnu person referencu! person još uvijek pokazuje na objekt s name='Changed'. KLJUČNO: Java kopira reference (adrese), ne objekte! Možete mijenjati OBJEKT, ne možete mijenjati REFERENCU u calling metodi.",
    "difficulty": "HARD",
    "options": [
      { "text": "10, Changed, Changed - pass-by-value za reference i primitive", "isCorrect": true },
      { "text": "100, Changed, New Person - sve se mijenja", "isCorrect": false },
      { "text": "10, Original, Original - ništa se ne mijenja", "isCorrect": false },
      { "text": "10, Changed, New Person - reassign mijenja original", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može se mijenjati parametar", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto String je immutable u Javi?",
    "explanation": "String je immutable (ne može se mijenjati) iz VIŠE razloga: (1) STRING POOL optimizacija - isti literali dijele MEMORIJU! \"abc\" + \"abc\" koristi JEDAN objekt. Immutability omogućava sigurno dijeljenje. (2) THREAD-SAFETY - immutable objekti su automatski thread-safe bez sinkronizacije! (3) SECURITY - String se koristi za username, password, file paths - ne želite da ih netko promijeni. (4) HASHCODE caching - hashCode() se računa JEDNOM i cachira (brže za HashMap). Svaka 'promjena' String-a (concat, replace, toUpperCase) kreira NOVI String objekt! Za mutable stringove koristiti StringBuilder (non-thread-safe) ili StringBuffer (thread-safe). Immutability = sigurnost + performance!",
    "difficulty": "HARD",
    "options": [
      { "text": "String pool optimizacija, thread-safety, security, hashcode caching", "isCorrect": true },
      { "text": "Performance razlozi - immutable stringovi su brži", "isCorrect": false },
      { "text": "Java specifikacija zabranjuje mutable stringove", "isCorrect": false },
      { "text": "Bug u originalnom dizajnu koji se ne može popraviti", "isCorrect": false },
      { "text": "Nema razloga - to je arbitrary odluka", "isCorrect": false },
      { "text": "Immutability će biti uklonjena u Java 26", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s String pool-om?",
    "codeSnippet": "public class StringPoolTest {\n    public static void main(String[] args) {\n        String s1 = \"Hello\";\n        String s2 = \"Hello\";\n        String s3 = new String(\"Hello\");\n        String s4 = s3.intern();\n        \n        System.out.println(s1 == s2);\n        System.out.println(s1 == s3);\n        System.out.println(s1 == s4);\n        System.out.println(s1.equals(s3));\n    }\n}",
    "explanation": "Ispisat će: 'true', 'false', 'true', 'true'. (1) s1 i s2 su String LITERALI - idu u STRING POOL pa dijele ISTU referencu (== je true). (2) s3 = new String() kreira NOVI objekt na HEAP-u (izvan pool-a) pa s1 == s3 je false (različite adrese). (3) s4 = s3.intern() VRAĆA referencu iz string pool-a ('Hello' već postoji od s1) pa s1 == s4 je true (ISTA adresa). (4) s1.equals(s3) uspoređuje SADRŽAJ (ne adrese) pa je true. == uspoređuje REFERENCE (adrese), equals() uspoređuje SADRŽAJ! String pool optimizira memoriju - literali se reusaju!",
    "difficulty": "HARD",
    "options": [
      { "text": "true, false, true, true", "isCorrect": true },
      { "text": "true, true, true, true - sve je isto", "isCorrect": false },
      { "text": "false, false, false, true - samo equals radi", "isCorrect": false },
      { "text": "true, false, false, true - intern() ne radi", "isCorrect": false },
      { "text": "Neće se kompilirati - intern() ne postoji", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje operacije na String-u kreiraju NOVI String objekt? (Odaberite sve točne)",
    "explanation": "Sve String 'promjene' kreiraju NOVI objekt jer je String immutable! (1) concat() - spaja stringove u novi. (2) replace() - zamjenjuje u novom. (3) toUpperCase()/toLowerCase() - kreira novi. (4) substring() - kreira novi (Java 7+, prije je dijelio array). (5) trim() - uklanja whitespace u novom. NE kreiraju novi (vraćaju THIS ako nema promjene): toUpperCase() ako je već uppercase vraća this! replace() ako nema promjene vraća this. substring(0, length()) vraća this. + operator UVIJEK kreira novi String (ili koristi StringBuilder interno ako je više operacija).",
    "difficulty": "HARD",
    "options": [
      { "text": "concat()", "isCorrect": true },
      { "text": "replace()", "isCorrect": true },
      { "text": "toUpperCase()", "isCorrect": true },
      { "text": "substring()", "isCorrect": true },
      { "text": "length() - vraća broj znakova", "isCorrect": false },
      { "text": "charAt() - vraća znak", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je razlika između 'var' (Java 10+) i eksplicitne type deklaracije?",
    "explanation": "var je LOCAL VARIABLE TYPE INFERENCE - kompajler ZAKLJUČUJE tip iz desne strane (inicijalizatora)! var list = new ArrayList<String>(); - kompajler zna da je ArrayList<String>. OGRANIČENJA: (1) var mora biti INICIJALIZIRANO u istoj liniji (ne može: var x; x = 5;). (2) SAMO za lokalne varijable, NE za fields, parameters, return types. (3) Ne može biti null (var x = null; - kompajler ne zna tip). (4) Ne može bez inicijalizatora (var x; - greška). var != dynamic typing! Tip se određuje COMPILE-TIME i ne mijenja se. var je samo SYNTACTIC SUGAR za čitljivost. Kompajlirani bytecode je IDENTIČAN!",
    "difficulty": "HARD",
    "options": [
      { "text": "var je compile-time type inference za lokalne varijable, tip se ne mijenja", "isCorrect": true },
      { "text": "var je dynamic typing kao JavaScript - tip se mijenja u runtime-u", "isCorrect": false },
      { "text": "var može se koristiti za fields i parametere", "isCorrect": false },
      { "text": "var može biti null bez inicijalizatora", "isCorrect": false },
      { "text": "var je brži jer ne provjerava tip", "isCorrect": false },
      { "text": "var i eksplicitna deklaracija su različiti u bytecode-u", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Java 25 Unnamed Variables kompilirati?",
    "codeSnippet": "public class UnnamedVariablesTest {\n    public static void main(String[] args) {\n        // Ignore array index\n        for (int i = 0, _ = sideEffect(); i < 10; i++) {\n            System.out.println(i);\n        }\n        \n        // Multiple underscores\n        String _ = \"first\";\n        String _ = \"second\";\n        \n        // Lambda with unused parameter\n        Runnable r = _ -> System.out.println(\"Running\");\n        \n        // Try-catch with unnamed exception\n        try {\n            Integer.parseInt(\"abc\");\n        } catch (NumberFormatException _) {\n            System.out.println(\"Error\");\n        }\n    }\n    \n    private static int sideEffect() {\n        return 0;\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Java 25 Unnamed Variables (JEP 456) koristi '_' za OZNAČAVANJE nekorištenih varijabli, ali ima PRAVILA: (1) for (int i=0, _ = sideEffect()...) - GREŠKA! _ u for deklaraciji nije dozvoljen (konfuzija s inicijalizacijom). (2) String _ = 'first'; String _ = 'second'; - GREŠKA! Ne možete deklarirati VIŠE lokalnih varijabli s istim imenom '_' u istom scope-u. (3) Runnable r = _ -> ... - OK! Lambda parametar može biti _. (4) catch (Exception _) - OK! Unnamed catch parameter. VALIDNO korištenje _: lambda parametri, catch blokovi, enhanced for (_ : list), pattern matching. _ = označava 'ne koristim ovu varijablu'.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - više _ u istom scope-u i _ u for inicijalizaciji", "isCorrect": true },
      { "text": "Kompilira se - Java 25 dozvoljava sve _ deklaracije", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u", "isCorrect": false },
      { "text": "Neće se kompilirati - _ nije validan identifier", "isCorrect": false },
      { "text": "Kompilira se samo lambda i catch, ostalo pada", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto printf format '%,d' formatira brojeve s tisućnim separatorima?",
    "explanation": "%, flag u printf() dodaje GROUPING separator (tisućni separator)! System.out.printf('%,d', 1000000); ispisuje '1,000,000' (ili '1.000.000' ovisno o Locale-u). Separator ovisi o DEFAULT LOCALE: US = zarez (1,000), EU = točka (1.000). Za kontrolu nad locale-om: System.out.printf(Locale.US, '%,d', 1000000). Drugi printf flags: (1) '-' = left-justify. (2) '+' = show sign. (3) '0' = zero padding. (4) ' ' = space for positive numbers. (5) '#' = alternate form (0x za hex). Primjer: System.out.printf('%,10.2f', 1234.5); = ' 1,234.50' (width 10, 2 decimale, tisućni separator).",
    "difficulty": "HARD",
    "options": [
      { "text": "%, dodaje grouping separator ovisno o Locale-u (zarez ili točka)", "isCorrect": true },
      { "text": "%, pretvara broj u valutu (currency format)", "isCorrect": false },
      { "text": "%, je greška u format stringu", "isCorrect": false },
      { "text": "%, označava modulo operaciju u printf-u", "isCorrect": false },
      { "text": "%, radi samo s floating point brojevima", "isCorrect": false },
      { "text": "%, je deprecated u Java 25", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s autoboxing i unboxing?",
    "codeSnippet": "public class AutoboxingTest {\n    public static void main(String[] args) {\n        Integer a = 100;\n        Integer b = 100;\n        System.out.println(a == b);\n        \n        Integer c = 200;\n        Integer d = 200;\n        System.out.println(c == d);\n        \n        Integer e = 200;\n        Integer f = 200;\n        System.out.println(e.equals(f));\n        \n        int x = a + c;\n        System.out.println(x);\n    }\n}",
    "explanation": "Ispisat će: 'true', 'false', 'true', '300'. (1) a == b je true jer Integer CACHIRA vrijednosti od -128 do 127! 100 je u cache-u pa a i b pokazuju na ISTI objekt. (2) c == d je false jer 200 NIJE u cache-u! c i d su RAZLIČITI objekti. (3) e.equals(f) je true jer equals() uspoređuje VRIJEDNOSTI, ne reference. (4) a + c automatski UNBOXUJE (Integer → int), zbraja (100+200=300), vraća int 300. Integer cache je PERFORMANCE optimizacija za male brojeve! IntegerCache range je [-128, 127], može se proširiti s -XX:AutoBoxCacheMax=<size>. Svi wrapper tipovi cachiraju: Boolean (true/false), Byte (svi), Character (0-127), Short/Integer (-128 do 127).",
    "difficulty": "HARD",
    "options": [
      { "text": "true, false, true, 300 - Integer cachira -128 do 127", "isCorrect": true },
      { "text": "true, true, true, 300 - svi Integer se cachiraju", "isCorrect": false },
      { "text": "false, false, true, 300 - ništa se ne cachira", "isCorrect": false },
      { "text": "true, false, false, 300 - equals() ne radi s autoboxing-om", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može se koristiti == s Integer", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su NOVOSTI u Java 25 Switch Expressions? (Odaberite sve točne)",
    "explanation": "Java 25 Switch novosti: (1) EXHAUSTIVENESS checking - kompajler provjerava pokriva li switch sve moguće vrijednosti! Za enum i sealed types mora biti exhaustive ili imati default. (2) PATTERN MATCHING u switch (od Java 21) - case String s, case Integer i. (3) GUARDED patterns - case String s when s.length() > 5. (4) NULL handling - case null eksplicitan. (5) PRIMITIVE TYPES u pattern matching (Java 25+). NISU novosti: arrow syntax (->) je od Java 14, yield keyword od Java 13, expression form od Java 12. Switch expressions su MODERNE - exhaustive, type-safe, without fall-through!",
    "difficulty": "HARD",
    "options": [
      { "text": "Exhaustiveness checking za enum/sealed", "isCorrect": true },
      { "text": "Pattern matching s guarded patterns", "isCorrect": true },
      { "text": "Null case handling", "isCorrect": true },
      { "text": "Primitive types u pattern matching", "isCorrect": true },
      { "text": "Arrow syntax (->) je nova u Java 25", "isCorrect": false },
      { "text": "Multiple case labels je nova feature", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Java 21+ Switch Pattern Matching kompilirati?",
    "codeSnippet": "public class SwitchPatternTest {\n    public static String format(Object obj) {\n        return switch (obj) {\n            case Integer i -> \"Int: \" + i;\n            case String s -> \"String: \" + s;\n            case Double d when d > 0 -> \"Positive double: \" + d;\n            case Double d -> \"Non-positive double: \" + d;\n        };\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(format(42));\n        System.out.println(format(\"Hello\"));\n        System.out.println(format(3.14));\n        System.out.println(format(-2.5));\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Problem: switch NIJE EXHAUSTIVE - što ako obj je null, Long, List, ili bilo koji drugi Object? Kompajler javlja grešku: 'the switch expression does not cover all possible input values'. RJEŠENJA: (1) Dodati default case. (2) Dodati case null. (3) Dodati case Object o (catch-all). Primjer: case Integer i -> ..., case String s -> ..., default -> 'Unknown'. Guarded pattern (when d > 0) je OK! Mora biti PRIJE non-guarded pattern istog tipa. Java 21+ zahtijeva EXHAUSTIVE switch za expressions (ne za statements koji mogu biti ne-exhaustive).",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - switch nije exhaustive (nema default/null/Object case)", "isCorrect": true },
      { "text": "Kompilira se i ispisuje 'Int: 42, String: Hello, Positive: 3.14, Non-positive: -2.5'", "isCorrect": false },
      { "text": "Neće se kompilirati - when clause nije dozvoljen", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u za Double", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može više case-ova istog tipa", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je razlika između record i regular class u Javi?",
    "explanation": "Record (Java 16+) je IMMUTABLE data carrier sa AUTOMATSKIM implementacijama! record Person(String name, int age) {} automatski dobiva: (1) PRIVATE FINAL fields. (2) PUBLIC accessor metode (name(), age()). (3) equals(), hashCode(), toString() implementacije. (4) CANONICAL konstruktor. (5) COMPACT constructor za validaciju. Record NE MOŽE: (1) extends drugu klasu (ali može implements interface). (2) deklarirati MUTABLE fields (svi su final). (3) imati EXPLICIT accessor imena različita od field names. Record JE: (1) implicitly final (ne može se extends-ati). (2) implicitly static ako je nested. Koristiti record za DTOs, value objects, immutable data. Regular class za COMPLEX behaviour i mutable state!",
    "difficulty": "HARD",
    "options": [
      { "text": "Record je immutable s automatskim equals/hashCode/toString, ne može extends", "isCorrect": true },
      { "text": "Record je mutable verzija klase za bolje performance", "isCorrect": false },
      { "text": "Nema razlike - record je samo syntactic sugar", "isCorrect": false },
      { "text": "Record može extends klasu, class ne može", "isCorrect": false },
      { "text": "Record je thread-safe, class nije", "isCorrect": false },
      { "text": "Record je deprecated u Java 25, treba koristiti class", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s record compact constructor?",
    "codeSnippet": "record Temperature(double celsius) {\n    public Temperature {\n        if (celsius < -273.15) {\n            throw new IllegalArgumentException(\"Below absolute zero!\");\n        }\n        celsius = Math.round(celsius * 10.0) / 10.0;\n    }\n    \n    public double fahrenheit() {\n        return celsius * 9.0 / 5.0 + 32.0;\n    }\n}\n\npublic class RecordTest {\n    public static void main(String[] args) {\n        Temperature temp1 = new Temperature(25.67);\n        System.out.println(temp1.celsius());\n        System.out.println(temp1.fahrenheit());\n        \n        Temperature temp2 = new Temperature(-300);\n    }\n}",
    "explanation": "Ispisat će '25.7', '78.26', zatim baca IllegalArgumentException! COMPACT CONSTRUCTOR (bez parametara u zagradama) izvršava se PRIJE assignanja fields! celsius = Math.round(...) MODIFIKUJE parametar PRIJE nego što se assigna u field. temp1: 25.67 → zaokružen na 25.7 → fahrenheit() = 25.7 * 9/5 + 32 = 78.26. temp2: -300 < -273.15 pa baca exception. Compact constructor omogućava: (1) VALIDACIJU parametara. (2) NORMALIZACIJU podataka. (3) Kraći zapis od canonical konstruktora. Alternative: public Temperature(double celsius) { this.celsius = ...; } (canonical form). Record omogućava BUSINESS LOGIC u konstruktoru!",
    "difficulty": "HARD",
    "options": [
      { "text": "25.7, 78.26, zatim IllegalArgumentException", "isCorrect": true },
      { "text": "25.67, 78.206, zatim IllegalArgumentException", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može modificirati parametar", "isCorrect": false },
      { "text": "25.7, 78.26, -300 - exception se ne baca", "isCorrect": false },
      { "text": "Neće se kompilirati - compact constructor nije validan", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su prednosti korištenja Text Blocks (Java 15+)? (Odaberite sve točne)",
    "explanation": "Text Blocks (\"\"\"...\"\"\") prednosti: (1) MULTI-LINE stringovi bez \\n - automatski newlines! (2) ČITLJIVIJI kod za JSON, SQL, HTML. (3) NE treba escapati \" (quotes) unutar bloka. (4) AUTOMATSKO indentation removal - leading whitespace se uklanja. (5) TRAILING whitespace control s \\s. Primjer: String json = \"\"\" { 'name': 'Ana' } \"\"\"; - čitljivo bez + operatora! Text blocks koriste \"\"\" delimiter na NOVOM redu. Završni \"\"\" kontrolira indentation. String html = \"\"\"<div>\\n  <p>Text</p>\\n</div>\"\"\"; = multi-line HTML. Text blocks su COMPILE-TIME feature - bytecode je običan String!",
    "difficulty": "HARD",
    "options": [
      { "text": "Multi-line bez \\n escape", "isCorrect": true },
      { "text": "Čitljiviji kod za JSON/SQL/HTML", "isCorrect": true },
      { "text": "Ne treba escapati quotes", "isCorrect": true },
      { "text": "Automatsko indentation removal", "isCorrect": true },
      { "text": "Text blocks su brži od regular stringova", "isCorrect": false },
      { "text": "Text blocks mogu se mijenjati u runtime-u", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto 'this' u konstruktoru mora biti PRVA naredba?",
    "explanation": "this(...) poziv DRUGOG konstruktora mora biti PRVA naredba jer Java zahtijeva da se objekt POTPUNO inicijalizira PRIJE bilo koje druge operacije! Razlog: prije nego što izvršite bilo koji kod, objekt mora biti u VALIDNOM stanju. Ako dozvolite kod prije this(), mogao bi pristupiti NEINICIJALIZIRANIM poljima! Primjer: class Test { int x; Test() { x = 10; this(5); } Test(int x) { this.x = x; } } - greška! x bi bio 10 pa 5 (konfuzno). this() ili super() MORA biti prva naredba - ne možete oboje! Ako ne pozovete eksplicitno, kompajler dodaje super() automatski. Constructor chaining osigurava PRAVILAN initialization order!",
    "difficulty": "HARD",
    "options": [
      { "text": "Osigurava potpunu inicijalizaciju objekta prije bilo koje operacije", "isCorrect": true },
      { "text": "Performance optimizacija za JVM", "isCorrect": false },
      { "text": "this() je sporiji ako nije prvi", "isCorrect": false },
      { "text": "Java specifikacija bez posebnog razloga", "isCorrect": false },
      { "text": "Sprječava rekurziju u konstruktorima", "isCorrect": false },
      { "text": "Omogućava automatic memory cleanup", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s varargs metodama?",
    "codeSnippet": "public class VarargsTest {\n    public static void method1(int... numbers, String name) {\n        System.out.println(name);\n    }\n    \n    public static void method2(String... strings) {\n        for (String s : strings) {\n            System.out.println(s);\n        }\n    }\n    \n    public static void method3(int... numbers, double... decimals) {\n        System.out.println(\"Multiple varargs\");\n    }\n    \n    public static void method4(String name, int... numbers) {\n        System.out.println(name + \": \" + numbers.length);\n    }\n    \n    public static void main(String[] args) {\n        method2(\"A\", \"B\", \"C\");\n        method2();\n        method4(\"Test\", 1, 2, 3);\n        method4(\"Empty\");\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) method1: varargs MORA biti ZADNJI parametar! int... numbers, String name je GREŠKA. Pravilno: String name, int... numbers. (2) method3: NE može imati VIŠE varargs parametara! Samo JEDAN varargs dozvoljen po metodi. method2 i method4 su ISPRAVNI: varargs je zadnji parametar. method2() poziv bez argumenata je OK - numbers je prazan array! method4('Empty') također OK - numbers je prazan array. Varargs je SYNTACTIC SUGAR za array: int... numbers ≡ int[] numbers, ali omogućava poziv bez zagrada method(1,2,3) umjesto method(new int[]{1,2,3}).",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - varargs mora biti zadnji i samo jedan po metodi", "isCorrect": true },
      { "text": "0 grešaka - sve je ispravno", "isCorrect": false },
      { "text": "1 greška - samo method1 je problematičan", "isCorrect": false },
      { "text": "3 greške - i main pozivi su problematični", "isCorrect": false },
      { "text": "4 greške - sve metode su pogrešne", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što će se dogoditi ako pokušate deklarirati lokalnu varijablu s istim imenom kao parametar metode?",
    "explanation": "Kompajler javlja GREŠKU: 'variable name is already defined in scope'! Ne možete imati DVE varijable s ISTIM imenom u istom SCOPE-u. Parametar metode je u scope-u cijele metode pa lokalna varijabla s istim imenom stvara konflikt. Primjer: void method(int x) { int x = 10; } - GREŠKA! Ali možete imati: (1) Isti naziv u RAZLIČITIM metodama (različiti scope). (2) FIELD i PARAMETAR s istim imenom - parametar SKRIVA field (koristiti this.field za pristup field-u). (3) RAZLIČITI blokovi: if (true) { int x = 5; } if (true) { int x = 10; } - OK, različiti scope-ovi. Shadowing vs redeclaration!",
    "difficulty": "HARD",
    "options": [
      { "text": "Compile error - ne može imati dva identična imena u istom scope-u", "isCorrect": true },
      { "text": "Lokalna varijabla skriva parametar", "isCorrect": false },
      { "text": "Parametar skriva lokalnu varijablu", "isCorrect": false },
      { "text": "Compile warning ali kod radi", "isCorrect": false },
      { "text": "Runtime exception pri pristupanju varijabli", "isCorrect": false },
      { "text": "Automatski se dodaje prefix local_ ili param_", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s method overloading i autoboxing?",
    "codeSnippet": "public class OverloadingTest {\n    public static void method(int x) {\n        System.out.println(\"int\");\n    }\n    \n    public static void method(Integer x) {\n        System.out.println(\"Integer\");\n    }\n    \n    public static void method(Object x) {\n        System.out.println(\"Object\");\n    }\n    \n    public static void method(int... x) {\n        System.out.println(\"varargs\");\n    }\n    \n    public static void main(String[] args) {\n        int primitiveInt = 5;\n        Integer wrappedInt = 5;\n        \n        method(primitiveInt);\n        method(wrappedInt);\n        method(5);\n        method(new int[]{1, 2});\n    }\n}",
    "explanation": "Ispisat će: 'int', 'Integer', 'int', 'varargs'. Method resolution order: (1) EXACT match (primitiveInt → int metoda). (2) EXACT wrapper match (wrappedInt → Integer metoda). (3) Literal 5 je int → int metoda (primitiv prije autoboxing-a). (4) new int[]{1,2} je int[] → varargs metoda (int... prima int[]). Resolution prioriteti: (1) Exact primitivni tip. (2) Autoboxing (int → Integer). (3) Widening (int → long). (4) Wrapper widening (Integer → Object). (5) Varargs (najniži prioritet). method((Integer)5) bi pozvao Integer verziju eksplicitnim castom. Overloading resolution je COMPILE-TIME!",
    "difficulty": "HARD",
    "options": [
      { "text": "int, Integer, int, varargs", "isCorrect": true },
      { "text": "Integer, Integer, Integer, varargs - sve se autoboxuje", "isCorrect": false },
      { "text": "int, Integer, Integer, int - literal se autoboxuje", "isCorrect": false },
      { "text": "Ambiguous - compile error", "isCorrect": false },
      { "text": "int, Object, int, varargs", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje modifikatore MOŽE imati main metoda? (Odaberite sve točne)",
    "explanation": "main metoda MORA biti: public static void main(String[] args). ALI može imati DODATNE modifikatore: (1) SYNCHRONIZED - public static synchronized void main() radi! (2) FINAL - public static final void main() radi! (3) STRICTFP - public static strictfp void main() radi! NE MOŽE biti: (1) PRIVATE/PROTECTED - main mora biti public! (2) NON-STATIC - mora biti static! (3) NON-VOID - mora vratiti void! Parametar može biti: String[] args, String... args, String args[], ali mora biti String array. JVM poziva main() kao entry point - mora biti dostupan (public) i ne zahtijevati instancu (static)!",
    "difficulty": "HARD",
    "options": [
      { "text": "synchronized", "isCorrect": true },
      { "text": "final", "isCorrect": true },
      { "text": "strictfp", "isCorrect": true },
      { "text": "private", "isCorrect": false },
      { "text": "abstract", "isCorrect": false },
      { "text": "non-static", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što printf format '%.2f' znači?",
    "explanation": "%.2f formatira floating point broj na 2 DECIMALNA MJESTA! Primjer: System.out.printf('%.2f', 3.14159); ispisuje '3.14'. Format: %[flags][width][.precision]conversion. (1) % - start. (2) flags (optional) - -, +, 0, space, ,. (3) width (optional) - minimalna širina. (4) .precision - broj decimala za %f, broj znakova za %s. (5) conversion - f (float/double), d (int), s (String), etc. Rounding: %.2f ZAOKRUŽUJE (3.145 → 3.15, 3.144 → 3.14). Primjer: System.out.printf('%8.2f', 3.14); ispisuje '    3.14' (width 8, 2 decimale).",
    "difficulty": "HARD",
    "options": [
      { "text": "Formatira broj na 2 decimalna mjesta s zaokruživanjem", "isCorrect": true },
      { "text": "Formatira broj na 2 significant digits", "isCorrect": false },
      { "text": "Dijeli broj s 2 prije ispisa", "isCorrect": false },
      { "text": "Ispisuje broj 2 puta", "isCorrect": false },
      { "text": "Prikazuje broj u scientific notation", "isCorrect": false },
      { "text": "Zahtijeva minimalno 2 znaka širine", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s array inicijalizacijom?",
    "codeSnippet": "public class ArrayInitTest {\n    public static void main(String[] args) {\n        int[] arr1 = new int[3];\n        System.out.println(arr1[0]);\n        \n        int[] arr2 = {1, 2, 3};\n        System.out.println(arr2.length);\n        \n        int[] arr3 = new int[]{4, 5, 6};\n        System.out.println(arr3[2]);\n        \n        int[][] arr4 = {{1, 2}, {3, 4, 5}};\n        System.out.println(arr4[1].length);\n        \n        String[] arr5 = new String[2];\n        System.out.println(arr5[0]);\n    }\n}",
    "explanation": "Ispisat će: '0', '3', '6', '3', 'null'. (1) arr1 = new int[3] kreira array s DEFAULT vrijednostima (int=0) → arr1[0] = 0. (2) arr2 = {1,2,3} je array initializer literal → length = 3. (3) arr3 = new int[]{4,5,6} eksplicitni inicijalizator → arr3[2] = 6. (4) arr4 je JAGGED array (različite duljine subarray-a) → arr4[1].length = 3 (array {3,4,5}). (5) arr5 = new String[2] kreira array s null references (referentni tipovi default = null) → arr5[0] = null. Array notacije: int[] arr ili int arr[] (oba valjani). Array su OBJEKTI u Javi - imaju length field (ne metodu)!",
    "difficulty": "HARD",
    "options": [
      { "text": "0, 3, 6, 3, null", "isCorrect": true },
      { "text": "null, 3, 6, 3, null - int također null", "isCorrect": false },
      { "text": "0, 3, 6, 2, null - arr4[1].length je 2", "isCorrect": false },
      { "text": "Neće se kompilirati - jagged array nije dozvoljen", "isCorrect": false },
      { "text": "0, 3, 6, 3, '' - prazan string", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto array.length je FIELD a ne metoda u Javi?",
    "explanation": "Array length je PUBLIC FINAL FIELD, ne metoda! Razlog: PERFORMANCE i HISTORY. (1) PERFORMANCE - direktan pristup field-u (arr.length) je BRŽI od method call-a (arr.length()). (2) LEGACY - array su u Javi od verzije 1.0, prije moderne Object-Oriented konvencija. (3) IMMUTABILITY - length je final pa se ne može promijeniti (sigurnost). (4) ARRAYS su SPECIAL u Javi - imaju poseban tretman u JVM-u (nisu prave klase). Collection.size() JE metoda jer Collections su prave klase s complex behaviour. String.length() JE metoda iako je String također special. INCONSISTENCY u Javi, ali ne može se promijeniti zbog backward compatibility!",
    "difficulty": "HARD",
    "options": [
      { "text": "Performance razlozi i legacy design - field je brži od method call-a", "isCorrect": true },
      { "text": "Array nisu objekti pa ne mogu imati metode", "isCorrect": false },
      { "text": "length metoda bi bila thread-unsafe", "isCorrect": false },
      { "text": "JVM ne podržava metode na array-ima", "isCorrect": false },
      { "text": "length će postati metoda u Java 26", "isCorrect": false },
      { "text": "Nema razloga - to je design bug", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s enhanced for loop kompilirati?",
    "codeSnippet": "public class EnhancedForTest {\n    public static void main(String[] args) {\n        int[] numbers = {1, 2, 3, 4, 5};\n        \n        for (int num : numbers) {\n            num = num * 2;\n        }\n        \n        System.out.println(numbers[0]);\n        \n        String[] words = {\"a\", \"b\", \"c\"};\n        \n        for (var word : words) {\n            word = word.toUpperCase();\n        }\n        \n        System.out.println(words[0]);\n        \n        for (int i : numbers) {\n            if (i == 3) {\n                numbers[2] = 99;\n            }\n        }\n        \n        System.out.println(numbers[2]);\n    }\n}",
    "explanation": "Kompilira se i ispisuje: '1', 'a', '99'. (1) Enhanced for loop KOPIRA vrijednosti - num je LOKALNA kopija! num = num * 2 ne mijenja numbers array. numbers[0] ostaje 1. (2) word = word.toUpperCase() također lokalna promjena - words[0] ostaje 'a'. (3) numbers[2] = 99 DIREKTNO mijenja array pa numbers[2] postaje 99. Enhanced for (for-each) ne može MIJENJATI elemente (za primitive), ali može PRISTUPITI original array-u s index-om! Za mijenjanje koristiti KLASIČNI for loop: for (int i = 0; i < arr.length; i++) { arr[i] = ...; }. Enhanced for je za READ-ONLY iteriranje!",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se, ispisuje 1, a, 99 - enhanced for kopira vrijednosti", "isCorrect": true },
      { "text": "Kompilira se, ispisuje 2, A, 99 - mijenja array", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može modificirati u enhanced for", "isCorrect": false },
      { "text": "Runtime exception pri modifikaciji array-a", "isCorrect": false },
      { "text": "Kompilira se, ispisuje 2, A, 3 - sve promjene rade", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje su razlike između Java 25 Unnamed Patterns i obične varijable? (Odaberite sve točne)",
    "explanation": "Unnamed Patterns (_ u Java 25) razlike: (1) OZNAČAVA NEKORIŠTENE varijable - dokumentira da ne koristite vrijednost. (2) MULTIPLE _ u RAZLIČITIM scope-ovima OK - for (var _ : list) { for (var _ : list2) { } } radi! (3) NE možete PRISTUPITI _ varijabli - _ je vraćanje vrijednosti bez pohrane. (4) COMPILE-TIME optimizacija - kompajler zna da ne treba trackati. Korištenje: (1) Lambda: (x, _) -> x*2 (drugi parametar nekorišten). (2) Pattern matching: case Point(int x, _) (y koordinata nebitna). (3) Catch: catch (Exception _) (exception nekorišten). _ poboljšava ČITLJIVOST - jasno je što se ne koristi!",
    "difficulty": "HARD",
    "options": [
      { "text": "Označava nekorištene varijable za čitljivost", "isCorrect": true },
      { "text": "Multiple _ u različitim scope-ovima je OK", "isCorrect": true },
      { "text": "Ne može se pristupiti _ varijabli", "isCorrect": true },
      { "text": "Compile-time optimizacija", "isCorrect": true },
      { "text": "_ je brži od normalne varijable", "isCorrect": false },
      { "text": "_ se može reassign-ati", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je razlika između StringBuilder i StringBuffer?",
    "explanation": "StringBuffer je THREAD-SAFE (synchronized metode), StringBuilder NIJE! StringBuffer koristi synchronized što znači: (1) SPORIJI - locking overhead. (2) SAFE za VIŠE threadova - možete modificirati iz više threadova bez race conditions. StringBuilder je: (1) BRŽI - nema synchronization overhead. (2) NESIGURN za više threadova. Oba su MUTABLE - append(), insert(), delete() mijenjaju isti objekt (za razliku od String koji je immutable). Koristiti: (1) StringBuilder u SINGLE-THREADED kodu (99% slučajeva). (2) StringBuffer u MULTI-THREADED kodu (rijetko potrebno). Od Java 5, StringBuilder je PREPORUČEN default!",
    "difficulty": "HARD",
    "options": [
      { "text": "StringBuffer je thread-safe (synchronized), StringBuilder je brži ali nije thread-safe", "isCorrect": true },
      { "text": "StringBuilder je thread-safe, StringBuffer nije", "isCorrect": false },
      { "text": "Nema razlike - potpuno identični", "isCorrect": false },
      { "text": "StringBuffer je immutable, StringBuilder mutable", "isCorrect": false },
      { "text": "StringBuilder podržava više metoda od StringBuffer", "isCorrect": false },
      { "text": "StringBuffer je deprecated u Java 25", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s static metoda i instance varijablom?",
    "codeSnippet": "public class StaticMethodTest {\n    private int instanceVar = 10;\n    private static int staticVar = 20;\n    \n    public static void staticMethod() {\n        System.out.println(staticVar);\n        System.out.println(instanceVar);\n    }\n    \n    public void instanceMethod() {\n        System.out.println(staticVar);\n        System.out.println(instanceVar);\n    }\n    \n    public static void main(String[] args) {\n        StaticMethodTest obj = new StaticMethodTest();\n        obj.instanceMethod();\n        StaticMethodTest.staticMethod();\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Greška u staticMethod(): 'non-static variable instanceVar cannot be referenced from a static context'. STATIC metode NE mogu pristupiti INSTANCE varijablama jer ne znaju KOJOJ instanci pripadaju! Static metode pripadaju KLASI, ne objektu. instanceMethod() MOŽE pristupiti I static I instance varijablama jer ima pristup this objektu. Static metode mogu: (1) pristupiti static varijablama, (2) pozvati druge static metode, (3) kreirati nove objekte. NE mogu: (1) pristupiti instance varijablama, (2) koristiti this/super, (3) pozvati instance metode direktno.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - static metoda ne može pristupiti instance varijabli", "isCorrect": true },
      { "text": "Kompilira se i ispisuje 20, 10, 20, 10", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u s NullPointerException", "isCorrect": false },
      { "text": "Neće se kompilirati - instance metoda ne može pristupiti static", "isCorrect": false },
      { "text": "Kompilira se i ispisuje 20, 0 (default), 20, 10", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Zašto su command-line argumenti u main() tipa String[], ne String?",
    "explanation": "main(String[] args) prima ARRAY jer može biti VIŠE command-line argumenata! Primjer: java MyProgram arg1 arg2 arg3 → args = ['arg1', 'arg2', 'arg3']. Sve je STRING jer JVM ne zna tipove - sve prima kao text pa vi morate parsirati! args[0] je PRVI argument (ne ime programa kao u C). Ako nema argumenata, args je PRAZAN array (length=0), NE null! Za brojeve: int num = Integer.parseInt(args[0]). args može biti i varargs: main(String... args) ali konvencija je String[]. JVM poziva main() i prosljeđuje argumente kao array.",
    "difficulty": "HARD",
    "options": [
      { "text": "Array jer može biti više argumenata, String jer JVM ne zna tipove", "isCorrect": true },
      { "text": "Java ne podržava varargs za main metodu", "isCorrect": false },
      { "text": "String[] je brži od String... za JVM", "isCorrect": false },
      { "text": "args mora biti array zbog backward compatibility", "isCorrect": false },
      { "text": "main() će podržavati generičke tipove u Java 26", "isCorrect": false },
      { "text": "String[] omogućava null argumente, String ne", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s nested classes i variable shadowing?",
    "codeSnippet": "public class Outer {\n    private int x = 10;\n    \n    class Inner {\n        private int x = 20;\n        \n        void print(int x) {\n            System.out.println(x);\n            System.out.println(this.x);\n            System.out.println(Outer.this.x);\n        }\n    }\n    \n    public static void main(String[] args) {\n        Outer outer = new Outer();\n        Outer.Inner inner = outer.new Inner();\n        inner.print(30);\n    }\n}",
    "explanation": "Ispisat će: '30', '20', '10'. (1) x (parametar) = 30 - NAJBLIŽA varijabla u scope-u. (2) this.x = 20 - x field INNER klase (this referira na Inner instancu). (3) Outer.this.x = 10 - x field OUTER klase (Outer.this referira na enclosing Outer instancu). Variable shadowing: bliža varijabla SKRIVA dalju s istim imenom! Bez qualifiera pristupa se najbližoj. this.x pristupa klasi, Outer.this.x pristupa outer klasi. Inner class ima pristup OUTER class private članovima! outer.new Inner() kreira inner class instancu (zahtijeva outer instancu).",
    "difficulty": "HARD",
    "options": [
      { "text": "30, 20, 10 - shadowing s parametrom, inner field, outer field", "isCorrect": true },
      { "text": "10, 10, 10 - sve pokazuje na istu vrijednost", "isCorrect": false },
      { "text": "30, 30, 30 - parametar overridea sve", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može imati isto ime varijable", "isCorrect": false },
      { "text": "Neće se kompilirati - Outer.this nije validna sintaksa", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje Java 25 optimizacije utječu na klase i objekte? (Odaberite sve točne)",
    "explanation": "Java 25 optimizacije za klase/objekte: (1) COMPACT OBJECT HEADERS (JEP 519) - objekti koriste ~50% MANJE memorije! Header s 16 bytes → 8 bytes na 64-bit JVM-u. (2) ZGC Generational Mode improvements - bolji GC za kratkoživuće objekte. (3) CLASS-FILE API (JEP 466) - bolji class file generation i transformation. (4) PRIMITIVE TYPES u Patterns (preparation za Valhalla) - value objects optimizacije. (5) STREAM API optimizacije - manje object allocations. Project Valhalla (FUTURE): inline types, value classes, reified generics - REVOLUCIJA za objekte! Java 25 fokus: MEMORIJA i PERFORMANCE bez breaking API changes.",
    "difficulty": "HARD",
    "options": [
      { "text": "Compact Object Headers - 50% manje memorije", "isCorrect": true },
      { "text": "ZGC Generational Mode improvements", "isCorrect": true },
      { "text": "Class-File API za better class generation", "isCorrect": true },
      { "text": "Primitive types u pattern matching", "isCorrect": true },
      { "text": "Automatsko inlining svih metoda", "isCorrect": false },
      { "text": "Objekti se više ne kreiraju na heap-u", "isCorrect": false }
    ]
  }

  ]
}
