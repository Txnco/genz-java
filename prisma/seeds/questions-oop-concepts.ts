import { QuestionType, Difficulty } from '@prisma/client'
import { createCompileOptions, createShuffledOptions } from './seed-utils'

export const oopConceptsQuestions = {
  lectureSlug: 'oop-concepts',
  questions: [
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koliko nadklasa (superclass) može izravno nasljeđivati jedna klasa u Javi?",
    "explanation": "Java podržava samo jednostruko nasljeđivanje klasa - svaka klasa može nasljeđivati točno jednu nadklasu pomoću ključne riječi 'extends'. Međutim, klasa može implementirati više sučelja istovremeno. Ovo je dizajnerska odluka kako bi se izbjegao 'Diamond Problem' koji postoji u jezicima s višestrukim nasljeđivanjem.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Samo jednu nadklasu (jednostruko nasljeđivanje)", "isCorrect": true },
      { "text": "Najviše dvije nadklase", "isCorrect": false },
      { "text": "Neograničen broj nadklasa", "isCorrect": false },
      { "text": "Tri nadklase ako su u istom paketu", "isCorrect": false },
      { "text": "Nula nadklasa - nasljeđivanje je opcionalno", "isCorrect": false },
      { "text": "Onoliko nadklasa koliko implementira sučelja", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koja pravila vrijede za konstruktore u podklasama?",
    "explanation": "Konstruktori podklasa moraju pozvati konstruktor nadklase pomoću super() kao prvu naredbu. Ako se ne navede eksplicitno, Java automatski poziva super() bez parametara. Konstruktori se pozivaju ulančano od nadklase prema podklasi. Podklasa može imati više konstruktora (overloading), ali svi moraju pozvati neki konstruktor nadklase.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Prva naredba mora biti super() poziv konstruktora nadklase", "isCorrect": true },
      { "text": "Konstruktori se pozivaju ulančano od nadklase prema podklasi", "isCorrect": true },
      { "text": "Ako ne navedemo super(), Java ga automatski dodaje", "isCorrect": true },
      { "text": "Podklasa ne mora pozvati konstruktor nadklase", "isCorrect": false },
      { "text": "super() se može pozvati bilo gdje u konstruktoru", "isCorrect": false },
      { "text": "Konstruktor podklase uvijek mora biti public", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što znači modifikator pristupa 'protected' u Javi?",
    "explanation": "Protected modifikator omogućava pristup članu klase iz: (1) iste klase, (2) svih klasa u istom paketu, i (3) svih podklasa, čak i ako su u različitim paketima. To je srednja razina zaštite između private (samo unutar klase) i public (svugdje dostupno). Koristi se kada želimo omogućiti podklasama pristup članovima.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Dostupno u podklasama i klasama u istom paketu", "isCorrect": true },
      { "text": "Dostupno samo unutar klase i njenih podklasa", "isCorrect": false },
      { "text": "Dostupno samo u istom paketu, ne u podklasama", "isCorrect": false },
      { "text": "Isto kao public ali samo za metode", "isCorrect": false },
      { "text": "Dostupno svugdje osim u podklasama", "isCorrect": false },
      { "text": "Dostupno samo u final klasama", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između ključnih riječi 'super' i 'this' u Javi?",
    "explanation": "'super' je referenca na nadklasu i koristi se za pristup članovima nadklase (super.metoda(), super.atribut) ili poziv konstruktora nadklase (super()). 'this' je referenca na trenutnu instancu klase i koristi se za razlikovanje atributa od parametara (this.ime = ime) ili poziv drugog konstruktora iste klase (this()).",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "super referira na nadklasu, this referira na trenutnu instancu", "isCorrect": true },
      { "text": "super se koristi za statičke metode, this za nestatičke", "isCorrect": false },
      { "text": "Nema razlike, to su sinonimi", "isCorrect": false },
      { "text": "super je za konstruktore, this za metode", "isCorrect": false },
      { "text": "this referira na nadklasu, super na trenutnu klasu", "isCorrect": false },
      { "text": "super radi samo u apstraktnim klasama", "isCorrect": false }
    ]
  },
  {
    "type": "TRUE_FALSE",
    "prompt": "Sve klase u Javi implicitno nasljeđuju klasu java.lang.Object ako ne nasljeđuju drugu klasu.",
    "explanation": "TRUE. Object je 'majka svih klasa' u Javi. Svaka klasa koja ne nasljeđuje eksplicitno drugu klasu automatski nasljeđuje Object. To znači da sve klase imaju metode poput toString(), equals(), hashCode(), getClass(), wait(), notify() koje dolaze iz Object klase. Čak i ako klasa nasljeđuje drugu klasu, ta nadklasa u konačnici nasljeđuje Object.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "True", "isCorrect": true },
      { "text": "False", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje metode iz klase Object se preporučuje nadjačati (override)?",
    "explanation": "Preporučuje se nadjačati: toString() za čitljiviji ispis objekata, equals() za logičku usporedbu objekata po sadržaju, i hashCode() za pravilno funkcioniranje u hash-baziranim kolekcijama. Ako nadjačate equals(), MORATE nadjačati i hashCode() kako bi se poštovao ugovor između tih metoda. clone() se nadjačava samo ako želimo omogućiti kopiranje objekta.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "toString() - za čitljiviji ispis objekta", "isCorrect": true },
      { "text": "equals() - za usporedbu sadržaja objekata", "isCorrect": true },
      { "text": "hashCode() - uz equals() za hash kolekcije", "isCorrect": true },
      { "text": "wait() i notify() - za rad s nitima", "isCorrect": false },
      { "text": "getClass() - za dohvaćanje tipa", "isCorrect": false },
      { "text": "finalize() - za čišćenje resursa", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je polimorfizam u objektno-orijentiranom programiranju?",
    "explanation": "Polimorfizam ('mnogo oblika') omogućava da se ista metoda poziva na različitim objektima i izvršava različito ponašanje ovisno o stvarnom tipu objekta. Primjer: Oblik[] oblici može sadržavati Krug, Pravokutnik, Trokut, i poziv oblici[i].izracunajPovrsinu() će izvršiti različitu implementaciju za svaki oblik. Tipovi se određuju tijekom izvođenja programa (runtime), ne kompiliranja.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Sposobnost da ista metoda ima različito ponašanje ovisno o tipu objekta", "isCorrect": true },
      { "text": "Mogućnost nasljeđivanja više klasa istovremeno", "isCorrect": false },
      { "text": "Kreiranje više objekata iste klase", "isCorrect": false },
      { "text": "Pretvaranje primitivnih u referentne tipove", "isCorrect": false },
      { "text": "Korištenje više konstruktora u jednoj klasi", "isCorrect": false },
      { "text": "Implementacija više sučelja istovremeno", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koja je razlika između upcasting i downcasting objekata?",
    "explanation": "Upcasting je automatska (implicitna) konverzija podklase u nadklasu (npr. Krug krug = new Krug(); Oblik oblik = krug;). Downcast je eksplicitna konverzija nadklase u podklasu (Krug k = (Krug) oblik;) i potencijalno je opasna jer može baciti ClassCastException ako objekt nije stvarno tog tipa. Uvijek treba provjeriti s instanceof prije downcasting-a.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Upcasting je implicitno (podklasa→nadklasa), downcasting eksplicitno (nadklasa→podklasa)", "isCorrect": true },
      { "text": "Upcasting je za primitivne, downcasting za referentne tipove", "isCorrect": false },
      { "text": "Nema razlike, oba rade isto", "isCorrect": false },
      { "text": "Upcasting baca iznimku, downcasting ne", "isCorrect": false },
      { "text": "Downcasting je automatski, upcasting zahtijeva cast operator", "isCorrect": false },
      { "text": "Upcasting je za sučelja, downcasting za klase", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Što od navedenog vrijedi za apstraktne klase u Javi?",
    "explanation": "Apstraktne klase se označavaju s 'abstract', ne mogu se instancirati (ne može se kreirati objekt), mogu sadržavati i apstraktne i konkretne metode, mogu imati konstruktore (pozivaju se iz podklasa), i podklase moraju implementirati sve apstraktne metode ili biti i same apstraktne. Koriste se kao zajednički predložak za podklase.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Ne mogu se instancirati - nije moguće kreirati objekte", "isCorrect": true },
      { "text": "Mogu sadržavati i apstraktne i konkretne metode", "isCorrect": true },
      { "text": "Mogu imati vlastiti konstruktor", "isCorrect": true },
      { "text": "Sve metode moraju biti apstraktne", "isCorrect": false },
      { "text": "Ne mogu imati atribute", "isCorrect": false },
      { "text": "Automatski su i final klase", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Koliko sučelja (interfaces) može implementirati jedna klasa u Javi?",
    "explanation": "Klasa može implementirati neograničen broj sučelja odjednom pomoću ključne riječi 'implements' i razdvajanjem sučelja zarezima (npr. class Patka implements Plivajuce, Letece, Trkace). Ovo je ključna razlika od nasljeđivanja klasa gdje je dozvoljeno samo jednostruko nasljeđivanje. Sučelja omogućavaju fleksibilnost i višestruko 'nasljeđivanje ponašanja'.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Neograničen broj sučelja", "isCorrect": true },
      { "text": "Samo jedno sučelje", "isCorrect": false },
      { "text": "Najviše tri sučelja", "isCorrect": false },
      { "text": "Isto onoliko koliko ima apstraktnih metoda", "isCorrect": false },
      { "text": "Ne može implementirati sučelja ako nasljeđuje klasu", "isCorrect": false },
      { "text": "Onoliko sučelja koliko nasljeđuje klasa", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Koje novosti u sučeljima su uvedene u Java 8 i Java 9?",
    "explanation": "Java 8 je uvela default metode (metode s implementacijom u sučelju označene s 'default') i statičke metode u sučeljima. Java 9 je dodala privatne metode u sučeljima koje mogu koristiti interno default i static metode za dijeljenje koda. Ove značajke omogućavaju evoluciju sučelja bez narušavanja postojećih implementacija.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Java 8: Default metode s implementacijom", "isCorrect": true },
      { "text": "Java 8: Statičke metode u sučeljima", "isCorrect": true },
      { "text": "Java 9: Privatne metode u sučeljima", "isCorrect": true },
      { "text": "Java 8: Konstruktori u sučeljima", "isCorrect": false },
      { "text": "Java 9: Protected metode u sučeljima", "isCorrect": false },
      { "text": "Java 8: Atributi koji nisu final", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je funkcionalno sučelje u Javi i koja anotacija se koristi za označavanje?",
    "explanation": "Funkcionalno sučelje je sučelje koje ima TOČNO JEDNU apstraktnu metodu (SAM - Single Abstract Method). Označava se anotacijom @FunctionalInterface. Funkcionalna sučelja omogućavaju korištenje lambda izraza. Mogu imati default i statičke metode, ali samo jednu apstraktnu. Primjeri: Comparator, Runnable, Callable.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Sučelje s točno jednom apstraktnom metodom, označava se s @FunctionalInterface", "isCorrect": true },
      { "text": "Sučelje koje koristi samo lambda izraze, nema posebnu anotaciju", "isCorrect": false },
      { "text": "Sučelje bez metoda, označava se s @Functional", "isCorrect": false },
      { "text": "Sučelje s više funkcija, označava se s @MultiFunction", "isCorrect": false },
      { "text": "Samo java.util.function paket, označava se automatski", "isCorrect": false },
      { "text": "Sučelje koje vraća funkciju, označava se s @Lambda", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što je svrha ključne riječi 'final' kada se primjenjuje na klasu, metodu i varijablu?",
    "explanation": "Final ima različite svrhe ovisno o primjeni: (1) Final klasa ne može se nasljeđivati (npr. String), (2) Final metoda ne može se nadjačati (override) u podklasama, (3) Final varijabla je konstanta i ne može se promijeniti nakon inicijalizacije. Final osigurava nepromjenjivost i sprječava neželjena nasljeđivanja/promjene.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Final klasa se ne može nasljeđivati, final metoda ne može se nadjačati, final varijabla je konstanta", "isCorrect": true },
      { "text": "Final označava da se klasa/metoda mora nasljeđivati/nadjačati", "isCorrect": false },
      { "text": "Final znači da se element briše nakon korištenja", "isCorrect": false },
      { "text": "Final se koristi samo za primitivne tipove", "isCorrect": false },
      { "text": "Final klasa mora biti apstraktna", "isCorrect": false },
      { "text": "Final metoda mora biti statička", "isCorrect": false }
    ]
  },
  {
    "type": "SINGLE_CHOICE",
    "prompt": "Što su Records u Javi (uvedeni u Java 14) i kada ih koristiti?",
    "explanation": "Records su kompaktne, nepromjenjive (immutable) klase za držanje podataka. Automatski generiraju konstruktor, gettere (bez 'get' prefiksa), equals(), hashCode() i toString(). Idealni za DTO (Data Transfer Objects), value objekte i kada želimo samo držati podatke bez dodatne logike. Sintaksa: public record Person(String name, int age) {}",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Nepromjenjivi nositelji podataka s automatski generiranim metodama, idealni za DTO objekte", "isCorrect": true },
      { "text": "Klase za snimanje rada programa u log datoteke", "isCorrect": false },
      { "text": "Bazni tipovi podataka za rad s bazama podataka", "isCorrect": false },
      { "text": "Klase koje se mogu mijenjati tijekom izvođenja programa", "isCorrect": false },
      { "text": "Alternativa za HashMap kolekcije", "isCorrect": false },
      { "text": "Klase za serijalizaciju objekata", "isCorrect": false }
    ]
  },
  {
    "type": "MULTIPLE_CHOICE",
    "prompt": "Što od navedenog se automatski generira u Java Record klasama?",
    "explanation": "Records automatski generiraju: (1) Javni konstruktor sa svim parametrima (canonical constructor), (2) Gettere bez 'get' prefiksa (npr. person.name() umjesto person.getName()), (3) equals() metodu za usporedbu po vrijednostima, (4) hashCode() metodu, (5) toString() metodu s formatiranim ispisom svih komponenata. Sve komponente su implicitno private final.",
    "difficulty": "MEDIUM",
    "options": [
      { "text": "Konstruktor sa svim komponentama", "isCorrect": true },
      { "text": "Getteri bez 'get' prefiksa (npr. name() umjesto getName())", "isCorrect": true },
      { "text": "equals(), hashCode() i toString() metode", "isCorrect": true },
      { "text": "Setteri za sve komponente", "isCorrect": false },
      { "text": "Builder pattern klasa", "isCorrect": false },
      { "text": "Defaultni no-arg konstruktor", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s nasljeđivanjem kompilirati?",
    "codeSnippet": "public class Vozilo {\n    private int brojPutnika;\n    \n    public Vozilo(int brojPutnika) {\n        this.brojPutnika = brojPutnika;\n    }\n}\n\npublic class Automobil extends Vozilo {\n    private String vrstaMotora;\n    \n    public Automobil(String vrstaMotora, int brojPutnika) {\n        this.vrstaMotora = vrstaMotora;\n        super(brojPutnika);\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati. Greška je u konstruktoru podklase Automobil: poziv super(brojPutnika) MORA biti prva naredba u konstruktoru. Ovdje je prvo this.vrstaMotora = vrstaMotora;, a tek onda super(). Java zahtijeva da konstruktor nadklase bude pozvan prije bilo kakve inicijalizacije podklase. Ispravan redoslijed: super(brojPutnika); pa onda this.vrstaMotora = vrstaMotora;",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - super() mora biti prva naredba u konstruktoru", "isCorrect": true },
      { "text": "Kompilira se i izvršava uspješno", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje extends Vehicle", "isCorrect": false },
      { "text": "Kompilira se ali baca NullPointerException", "isCorrect": false },
      { "text": "Neće se kompilirati - vrstaMotora mora biti protected", "isCorrect": false },
      { "text": "Kompilira se ali konstruktor ne radi ispravno", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s polimorfizmom?",
    "codeSnippet": "abstract class Instrument {\n    public abstract void odsviraj();\n}\n\nclass Gitara extends Instrument {\n    @Override\n    public void odsviraj() {\n        System.out.println(\"Gitara\");\n    }\n}\n\nclass Bubanj extends Instrument {\n    @Override\n    public void odsviraj() {\n        System.out.println(\"Bubanj\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Instrument[] instrumenti = new Instrument[2];\n        instrumenti[0] = new Gitara();\n        instrumenti[1] = new Bubanj();\n        \n        for (Instrument i : instrumenti) {\n            i.odsviraj();\n        }\n    }\n}",
    "explanation": "Ispisat će 'Gitara' u prvom redu i 'Bubanj' u drugom redu. Ovo je klasičan primjer polimorfizma - polje tipa Instrument[] može sadržavati objekte bilo koje podklase (Gitara, Bubanj). Poziv i.odsviraj() izvršava različitu implementaciju ovisno o stvarnom tipu objekta (runtime polymorphism). Svaki objekt 'zna' svoju stvarnu implementaciju metode.",
    "difficulty": "HARD",
    "options": [
      { "text": "Gitara i Bubanj (svaki u svom redu)", "isCorrect": true },
      { "text": "Neće se kompilirati - apstraktne klase ne mogu se koristiti", "isCorrect": false },
      { "text": "Instrument i Instrument", "isCorrect": false },
      { "text": "Baca ClassCastException", "isCorrect": false },
      { "text": "Neće se kompilirati - polje ne može biti apstraktnog tipa", "isCorrect": false },
      { "text": "Ništa - apstraktne metode nemaju implementaciju", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećoj apstraktnoj klasi:",
    "codeSnippet": "public abstract class Oblik {\n    protected String naziv;\n    \n    public abstract double izracunajPovrsinu();\n    \n    public void ispisi() {\n        System.out.println(\"Oblik: \" + naziv);\n    }\n}\n\npublic class Krug extends Oblik {\n    private double polumjer;\n    \n    public Krug(double polumjer) {\n        this.polumjer = polumjer;\n    }\n    \n    public void postaviNaziv(String naziv) {\n        this.naziv = naziv;\n    }\n}",
    "explanation": "Greška je u klasi Krug: nije implementirana apstraktna metoda izracunajPovrsinu() iz nadklase Oblik. Kada klasa nasljeđuje apstraktnu klasu, MORA implementirati sve apstraktne metode ili biti i sama apstraktna. Trebalo bi dodati: @Override public double izracunajPovrsinu() { return Math.PI * polumjer * polumjer; }",
    "difficulty": "HARD",
    "options": [
      { "text": "Krug mora implementirati apstraktnu metodu izracunajPovrsinu()", "isCorrect": true },
      { "text": "Apstraktna klasa ne može imati konkretne metode", "isCorrect": false },
      { "text": "Krug ne smije imati konstruktor", "isCorrect": false },
      { "text": "naziv mora biti private, ne protected", "isCorrect": false },
      { "text": "Metoda ispisi() ne može biti u apstraktnoj klasi", "isCorrect": false },
      { "text": "Nema pogreške u kodu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s instanceof operatorom?",
    "codeSnippet": "class Zivotinja {}\nclass Pas extends Zivotinja {}\nclass Macka extends Zivotinja {}\n\npublic class Test {\n    public static void main(String[] args) {\n        Zivotinja z1 = new Pas();\n        Zivotinja z2 = new Macka();\n        Pas p = new Pas();\n        \n        System.out.println(z1 instanceof Pas);\n        System.out.println(z1 instanceof Zivotinja);\n        System.out.println(p instanceof Zivotinja);\n        System.out.println(z2 instanceof Pas);\n    }\n}",
    "explanation": "Ispisat će: true, true, true, false. (z1 instanceof Pas) je true jer je z1 stvarno Pas objekt. (z1 instanceof Zivotinja) je true jer Pas nasljeđuje Zivotinja. (p instanceof Zivotinja) je true jer Pas JE vrsta Zivotinja. (z2 instanceof Pas) je false jer je z2 Macka objekt, ne Pas. instanceof provjerava stvarni tip objekta u memoriji, ne tip varijable.",
    "difficulty": "HARD",
    "options": [
      { "text": "true, true, true, false", "isCorrect": true },
      { "text": "false, true, true, false", "isCorrect": false },
      { "text": "true, false, false, true", "isCorrect": false },
      { "text": "true, true, false, false", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "Sve će biti true", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što nedostaje u sljedećem kodu s equals() metodom?",
    "codeSnippet": "public class Student {\n    private String oib;\n    private String ime;\n    \n    public Student(String oib, String ime) {\n        this.oib = oib;\n        this.ime = ime;\n    }\n    \n    @Override\n    public boolean equals(Object obj) {\n        if (this == obj) return true;\n        if (obj == null || getClass() != obj.getClass()) return false;\n        Student student = (Student) obj;\n        return Objects.equals(oib, student.oib);\n    }\n}",
    "explanation": "Nedostaje nadjačavanje metode hashCode(). Pravilo u Javi je: ako nadjačate equals(), MORATE nadjačati i hashCode(). To je dio ugovora između ovih metoda - dva objekta koja su jednaka po equals() moraju imati isti hashCode(). Bez toga objekti neće pravilno raditi u hash-baziranim kolekcijama (HashMap, HashSet). Trebalo bi dodati: @Override public int hashCode() { return Objects.hash(oib); }",
    "difficulty": "HARD",
    "options": [
      { "text": "Nedostaje hashCode() metoda - mora se nadjačati zajedno s equals()", "isCorrect": true },
      { "text": "Nedostaje toString() metoda", "isCorrect": false },
      { "text": "equals() mora uspoređivati i ime, ne samo oib", "isCorrect": false },
      { "text": "Nedostaje clone() metoda", "isCorrect": false },
      { "text": "getClass() ne smije se koristiti u equals()", "isCorrect": false },
      { "text": "Nema pogreške - kod je potpun", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s lambda izrazom kompilirati?",
    "codeSnippet": "import java.util.Arrays;\nimport java.util.Comparator;\n\npublic class Test {\n    public static void main(String[] args) {\n        String[] imena = {\"Marko\", \"Ana\", \"Petra\", \"Ivan\"};\n        \n        Arrays.sort(imena, (s1, s2) -> s1.length() - s2.length());\n        \n        System.out.println(Arrays.toString(imena));\n    }\n}",
    "explanation": "Kod će se kompilirati i ispisati [Ana, Ivan, Marko, Petra]. Lambda izraz (s1, s2) -> s1.length() - s2.length() implementira Comparator<String> i sortira stringove po duljini. Lambda izrazi zahtijevaju funkcionalno sučelje (s jednom apstraktnom metodom). Comparator.compare() je takva metoda. Rezultat: kratka imena dolaze prije dugih.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kompilira se i sortira imena po duljini: [Ana, Ivan, Marko, Petra]", "isCorrect": true },
      { "text": "Neće se kompilirati - lambda izrazi ne rade sa Strings", "isCorrect": false },
      { "text": "Kompilira se ali ne sortira ništa", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje tip parametara u lambdi", "isCorrect": false },
      { "text": "Kompilira se i sortira abecedno", "isCorrect": false },
      { "text": "Baca ClassCastException pri izvođenju", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što se treba ispraviti u sljedećoj final klasi?",
    "codeSnippet": "public final class Automobil {\n    private String marka;\n    \n    public Automobil(String marka) {\n        this.marka = marka;\n    }\n}\n\npublic class ElektricniAutomobil extends Automobil {\n    private int kapacitetBaterije;\n    \n    public ElektricniAutomobil(String marka, int kapacitet) {\n        super(marka);\n        this.kapacitetBaterije = kapacitet;\n    }\n}",
    "explanation": "Greška je u pokušaju nasljeđivanja final klase. Klasa Automobil je označena kao 'final', što znači da se NE MOŽE nasljeđivati. ElektricniAutomobil pokušava nasljeđivati Automobil, što će rezultirati greškom kompilacije. Rješenje: ukloniti 'final' iz Automobil klase ili koristiti kompoziciju umjesto nasljeđivanja (ElektricniAutomobil IMA Automobil, ne nasljeđuje ga).",
    "difficulty": "HARD",
    "options": [
      { "text": "Automobil je final klasa i ne može se nasljeđivati - ukloniti final ili koristiti kompoziciju", "isCorrect": true },
      { "text": "ElektricniAutomobil mora biti također final", "isCorrect": false },
      { "text": "Nedostaje @Override anotacija", "isCorrect": false },
      { "text": "super() mora biti u ElektricniAutomobil", "isCorrect": false },
      { "text": "Final klase moraju biti apstraktne", "isCorrect": false },
      { "text": "Nema pogreške u kodu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što vraća sljedeći kod s castanjem objekata?",
    "codeSnippet": "class Zivotinja {\n    public void jedi() {\n        System.out.println(\"Životinja jede\");\n    }\n}\n\nclass Pas extends Zivotinja {\n    public void laje() {\n        System.out.println(\"Pas laje\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Zivotinja z = new Pas();\n        z.jedi();\n        z.laje();\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati. Greška je u pokušaju poziva z.laje(). Iako je z stvarno Pas objekt u memoriji, tip varijable je Zivotinja, a Zivotinja klasa nema metodu laje(). Kompajler gleda tip varijable, ne stvarni tip objekta. Rješenje je downcasting: ((Pas) z).laje() ili Pas p = (Pas) z; p.laje(); ili koristiti instanceof provjeru.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - metoda laje() ne postoji u tipu Zivotinja", "isCorrect": true },
      { "text": "Ispisuje 'Životinja jede' i 'Pas laje'", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException", "isCorrect": false },
      { "text": "Ispisuje samo 'Životinja jede'", "isCorrect": false },
      { "text": "Kompilira se ali baca NullPointerException", "isCorrect": false },
      { "text": "Ispisuje samo 'Pas laje'", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s default metodom u sučelju (Java 8+)?",
    "codeSnippet": "interface Vozilo {\n    default void pokreni() {\n        System.out.println(\"Vozilo pokrenuto\");\n    }\n}\n\nclass Auto implements Vozilo {\n    @Override\n    public void pokreni() {\n        System.out.println(\"Auto pokrenut\");\n    }\n}\n\nclass Bicikl implements Vozilo {\n    // Ne nadjačava pokreni()\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Vozilo v1 = new Auto();\n        Vozilo v2 = new Bicikl();\n        v1.pokreni();\n        v2.pokreni();\n    }\n}",
    "explanation": "Ispisat će: 'Auto pokrenut' i 'Vozilo pokrenuto'. Default metode u sučeljima (Java 8+) omogućavaju implementaciju u sučelju. Klasa Auto nadjačava default metodu pa ispisuje 'Auto pokrenut'. Klasa Bicikl ne nadjačava metodu pa koristi default implementaciju iz sučelja ('Vozilo pokrenuto'). Ovo omogućava dodavanje novih metoda u sučelja bez narušavanja postojećih implementacija.",
    "difficulty": "HARD",
    "options": [
      { "text": "Auto pokrenut, Vozilo pokrenuto", "isCorrect": true },
      { "text": "Vozilo pokrenuto, Vozilo pokrenuto", "isCorrect": false },
      { "text": "Auto pokrenut, Auto pokrenut", "isCorrect": false },
      { "text": "Neće se kompilirati - sučelja ne mogu imati implementaciju", "isCorrect": false },
      { "text": "Neće se kompilirati - Bicikl mora nadjačati pokreni()", "isCorrect": false },
      { "text": "Baca AbstractMethodError", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Hoće li se sljedeći kod s Record klasom (Java 14+) kompilirati?",
    "codeSnippet": "public record Student(\n    String oib,\n    String ime,\n    double prosjek\n) {\n    public Student {\n        if (prosjek < 1.0 || prosjek > 5.0) {\n            throw new IllegalArgumentException(\"Prosjek mora biti 1-5\");\n        }\n    }\n    \n    public void setProsjek(double noviProsjek) {\n        this.prosjek = noviProsjek;\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati. Greška je u setProsjek() metodi - Records su nepromjenjivi (immutable) i svi njihovi atributi su implicitno final. Ne mogu se mijenjati nakon kreирanja objekta. Kompaktni konstruktor (bez zagrada) je ispravan i služi za validaciju. Records automatski generiraju gettere (ime(), oib(), prosjek()), ali ne setere. Immutability je ključna karakteristika Records.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - Records su immutable i ne mogu imati settere", "isCorrect": true },
      { "text": "Kompilira se i izvršava uspješno", "isCorrect": false },
      { "text": "Neće se kompilirati - konstruktor je krivo napisan", "isCorrect": false },
      { "text": "Kompilira se ali setter ne radi", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje return type u konstruktoru", "isCorrect": false },
      { "text": "Kompilira se ali baca iznimku pri kreiranju", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Pattern Matching (Java 16+)?",
    "codeSnippet": "sealed interface Oblik permits Krug, Pravokutnik {}\n\nrecord Krug(double polumjer) implements Oblik {}\nrecord Pravokutnik(double sirina, double visina) implements Oblik {}\n\npublic class Test {\n    public static void opisi(Oblik oblik) {\n        if (oblik instanceof Krug k) {\n            System.out.println(\"Krug s polumjerom: \" + k.polumjer());\n        } else if (oblik instanceof Pravokutnik p) {\n            System.out.println(\"Pravokutnik \" + p.sirina() + \"x\" + p.visina());\n        }\n    }\n    \n    public static void main(String[] args) {\n        opisi(new Krug(5.0));\n        opisi(new Pravokutnik(4.0, 6.0));\n    }\n}",
    "explanation": "Ispisat će: 'Krug s polumjerom: 5.0' i 'Pravokutnik 4.0x6.0'. Kod demonstrira tri moderne Java značajke: (1) Sealed interface s permits - dopušta samo Krug i Pravokutnik, (2) Records kao implementacije, (3) Pattern matching za instanceof (Java 16+) s automatskim castanjem u varijable k i p bez potrebe za eksplicitnim castanjem.",
    "difficulty": "HARD",
    "options": [
      { "text": "Krug s polumjerom: 5.0 i Pravokutnik 4.0x6.0", "isCorrect": true },
      { "text": "Neće se kompilirati - sealed mora biti klasa", "isCorrect": false },
      { "text": "Neće se kompilirati - records ne mogu implementirati sučelja", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException", "isCorrect": false },
      { "text": "Neće se kompilirati - pattern matching ne radi s records", "isCorrect": false },
      { "text": "Ispisuje samo tipove objekata", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite pogrešku u sljedećoj sealed klasi:",
    "codeSnippet": "public sealed class Vozilo permits Automobil, Kamion {\n    protected String registracija;\n    \n    public Vozilo(String registracija) {\n        this.registracija = registracija;\n    }\n}\n\npublic final class Automobil extends Vozilo {\n    public Automobil(String reg) {\n        super(reg);\n    }\n}\n\npublic class Kamion extends Vozilo {\n    public Kamion(String reg) {\n        super(reg);\n    }\n}",
    "explanation": "Greška je u klasi Kamion: sealed klase mogu nasljeđivati samo klase koje su označene kao final, sealed ili non-sealed. Kamion nema niti jedan od ovih modifikatora. Trebalo bi dodati: public final class Kamion (ako ne želimo daljnje nasljeđivanje) ili public non-sealed class Kamion (ako želimo dopustiti daljnje nasljeđivanje). Automobil je ispravno označen kao final.",
    "difficulty": "HARD",
    "options": [
      { "text": "Kamion mora biti final, sealed ili non-sealed", "isCorrect": true },
      { "text": "permits ne smije sadržavati Kamion", "isCorrect": false },
      { "text": "Sealed klase ne mogu imati konstruktore", "isCorrect": false },
      { "text": "Automobil ne smije biti final", "isCorrect": false },
      { "text": "registracija mora biti private", "isCorrect": false },
      { "text": "Nema pogreške u kodu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s toString() metodom?",
    "codeSnippet": "class Osoba {\n    String ime;\n    \n    public Osoba(String ime) {\n        this.ime = ime;\n    }\n}\n\nclass Student extends Osoba {\n    String oib;\n    \n    public Student(String ime, String oib) {\n        super(ime);\n        this.oib = oib;\n    }\n    \n    @Override\n    public String toString() {\n        return \"Student[\" + ime + \", \" + oib + \"]\";\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Osoba o = new Osoba(\"Ana\");\n        Student s = new Student(\"Marko\", \"12345\");\n        \n        System.out.println(o);\n        System.out.println(s);\n    }\n}",
    "explanation": "Ispisat će nešto poput 'Osoba@15db9742' (hash kod) i 'Student[Marko, 12345]'. Osoba klasa ne nadjačava toString() pa se koristi defaultna implementacija iz Object klase koja vraća ime_klase@hash_kod. Student nadjačava toString() s custom formatiranjem. Uvijek se preporučuje nadjačavati toString() za čitljiviji ispis objekata.",
    "difficulty": "HARD",
    "options": [
      { "text": "Osoba@hashcode i Student[Marko, 12345]", "isCorrect": true },
      { "text": "Ana i Student[Marko, 12345]", "isCorrect": false },
      { "text": "Osoba@hashcode i Marko", "isCorrect": false },
      { "text": "null i Student[Marko, 12345]", "isCorrect": false },
      { "text": "Neće se kompilirati", "isCorrect": false },
      { "text": "Ana i Marko", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će biti rezultat izvršavanja sljedećeg koda s višestrukom implementacijom sučelja?",
    "codeSnippet": "interface Plivajuce {\n    void pliva();\n}\n\ninterface Letece {\n    void leti();\n}\n\nclass Patka implements Plivajuce, Letece {\n    @Override\n    public void pliva() {\n        System.out.println(\"Patka pliva\");\n    }\n    \n    @Override\n    public void leti() {\n        System.out.println(\"Patka leti\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Patka p = new Patka();\n        p.pliva();\n        p.leti();\n    }\n}",
    "explanation": "Ispisat će: 'Patka pliva' i 'Patka leti'. Kod demonstrira višestruku implementaciju sučelja - klasa Patka implementira oba sučelja (Plivajuce i Letece) odjednom. Java dopušta neograničen broj implementiranih sučelja, za razliku od nasljeđivanja gdje je dopuštena samo jedna nadklasa. Patka mora implementirati sve metode iz oba sučelja.",
    "difficulty": "HARD",
    "options": [
      { "text": "Patka pliva i Patka leti", "isCorrect": true },
      { "text": "Neće se kompilirati - ne može implementirati više sučelja", "isCorrect": false },
      { "text": "Kompilira se ali baca iznimku", "isCorrect": false },
      { "text": "Ispisuje samo 'Patka pliva'", "isCorrect": false },
      { "text": "Neće se kompilirati - nedostaje extends", "isCorrect": false },
      { "text": "Sučelja se moraju implementirati jedno po jedno", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pomoću koje naredbe je moguće sortirati polje objekata po custom kriteriju koristeći lambda izraz?",
    "codeSnippet": "class Osoba {\n    String ime;\n    int godine;\n    \n    public Osoba(String ime, int godine) {\n        this.ime = ime;\n        this.godine = godine;\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Osoba[] osobe = {\n            new Osoba(\"Ana\", 25),\n            new Osoba(\"Marko\", 30),\n            new Osoba(\"Petra\", 20)\n        };\n        \n        // Sortiranje po godinama?\n    }\n}",
    "explanation": "Točna naredba je: Arrays.sort(osobe, (o1, o2) -> o1.godine - o2.godine); ili Comparator.comparingInt(o -> o.godine). Arrays.sort() prima polje i Comparator. Lambda izraz (o1, o2) -> o1.godine - o2.godine implementira Comparator.compare() metodu koja vraća negativan broj ako o1 < o2, 0 ako su jednaki, pozitivan ako o1 > o2. To sortira osobe po godinama uzlazno.",
    "difficulty": "HARD",
    "options": [
      { "text": "Arrays.sort(osobe, (o1, o2) -> o1.godine - o2.godine)", "isCorrect": true },
      { "text": "osobe.sort((o1, o2) -> o1.godine - o2.godine)", "isCorrect": false },
      { "text": "Collections.sort(osobe, o -> o.godine)", "isCorrect": false },
      { "text": "Stream.of(osobe).sorted(o -> o.godine)", "isCorrect": false },
      { "text": "osobe.orderBy(o -> o.godine)", "isCorrect": false },
      { "text": "Arrays.sortBy(osobe, \"godine\")", "isCorrect": false }
    ]
  }
]
}
