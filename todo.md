Trebam pitanja iz sljedecih temi, ta pitanja moraju biti u ovom stilu i moram ih moci staviti u seeder za bazu. 
Evo templatea za seeder za bazu

Here are the lectures. I need all this in Croatian


New chat

PRIMJER PRVE KONTROLNE ZADAĆE IZ "PROGRAMIRANJA U JAVI" 1. Koja je veza između JRE-a i JDK-a? A JRE sadrži JDK. B JDK sadrži JRE. C JDK sadrži Eclipse, a JRE ne sadrži. D JRE sadrži Eclipse, a JDK ne sadrži. E JRE se brže izvodi od JDK-a. F JDK se brže izvodi od JRE-a. 2. Na koji od navedeni

pasted

Ti si profesor Jave na tehnickom veleucilistu i moras napraviti pitanja za kolokvij koji ima 6 pitanja za 2 boda i 6 pitanja za 3 boda. 
Prvih 6 pitanja za 2 boda je vise teorijski, dok je drugi dio 6 pitanja više programski i problem solving pitanje.

Evo ti primjeri pitanja i opiši prema kojim načelima, koceptima, kalupima su ta pitanja napravljena kako bi se taj template mogao koristiti za generiranje više pitanja točno tog stila.

Trebamo uvijek najnovije provjerene stvari iz Jave 25 koja je trenutno najnovija.

Trebam template gdje cu napisati temu za Javu 25 i onda ce AI na temelju tog templatea koji ce opisivati strukturu pitanja zgenerirati ta pitanja.
Primjeri pitanja i odgovora. 

 Koju pogrešku će dojaviti prevoditelj, ako su implementirane sljedeće klase i izvedene
 sljedeće dvije linije koda? 

3 points
A The type Druga must be an abstract class to define abstract methods
B The type Druga must implement the inherited abstract method __Prva.test__()
C The type Prva must implement the inherited abstract method __Druga.test__()
D Ništa od navedenog, nema pogreške u navedenom kodu.
E This method requires a body instead of a semicolon
F The type Prva must be an abstract class to define abstract methods

Što nedostaje slijedećem programskom isječku kako bi se na ispravan način određivao prosjek ocjena na ispitima studenata te bacati označenu iznimku u slučaju negativne ocjene?

**CODE

A Nedostaje try-catch-finally blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException
B Potrebno je maknuti throws NemoguceOdreditiProsjekStudenataException kod definicije metode
C Nedostaje try-finally blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException
D Nedostaje samo try blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException
E Ništa od navedenog, programski isječak je u potpunosti ispravan.
F Nedostaje try-catch blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException

Pronađite pogrešku u sljedećoj metodi za provjeru duplikata:

private static Boolean checkDuplicateCar(Car carToCheck, Car[] existingCars) {
    for (Car enteredCar : existingCars) {
        if (carToCheck == enteredCar) {
            return true;
        }
    }
    return false;
}

3 points
A Kod return naredbe mora se koristiti vraćanje poput return new Boolean
B Pogreška je u for petlji, mora se koristiti indeks kod dohvata elemenata polja.
C Objekti se uspoređuju na neispravan način.
D Umjesto if naredbe mora pisati samo return carToCheck == enteredCar
E Metoda mora vraćati boolean umjesto Boolean.
F Nema pogreške u navedenom programskom isječku

Koje od navedenih iznimaka nema smisla hvatati (moguće više odgovora)
2 point
A VirtualMachineError
B Throwable
C NullpointerException
D OutOfMemoryError
E ArrayIndexOutOfBoundsException
F StackOverflowError

Što će ispisati sljedeći programski odsječak? 
3 BODA

public class Temperatura { private LocalDate datum; private float temperatura;
public Temperatura (LocalDate datum, float temperatura) { this.datum datum;
}
this.temperatura = temperatura;
public LocalDate getDatum() { return datum;
}
public float getTemperatura() { return temperatura;
}
}

public static void main(String[] args) { LocalDate datum1 = LocalDate.now();
LocalDate datum2 = LocalDate.now().plusDays(1); LocalDate datum3 = LocalDate.now().plusDays (2); Temperatura temp1 = new Temperatura (datum1, -15); Temperatura temp2 = new Temperatura (datum2, -20); Temperatura temp3 = new Temperatura (datum3, -10); Set<Temperatura> set =
new TreeSet<Temperatura>(
new TemperaturaComparator());
set.add(temp1);
set.add(temp2);
set.add(temp3);
set.add(temp3);
for (Temperatura temp set) {
}
System.out.println(temp.getTemperatura());

public class TemperaturaComparator implements Comparator<Temperatura> {
@Override
public int compare (Temperatura t1, Temperatura t2) { if (t1.getDatum().isAfter (t2.getDatum())) {
}
return 1;
else if(t1.getDatum ().isBefore (t2.getDatum())) {
return -1;
} else {
return 0;
}

A
-15.0
-20.0
-10.0
B
-15.0
-10.0
-10.0
-20.0
C
-10.0
-10.0
-15.0
-20.0
D
-10.0
-15.0
-20.0
E
-20.0
-15.0
-10.0
F
-20.0
-15.0
-10.0
-10.0

 S kojom metodom se može provjeriti imaju li dva String objekta spremljeni isti niz znakova?
2 points

A equals
B compare
C equalStrings
D compareStrings
E compareIfEqual
F checkIfEqual

Koje od navedenih naredbi se mogu prevesti?
2 points
A List<String> lista2 = new LinkedList<>();
B LinkedList<String> lista2 = new ArrayList<>();
C Vector<String> vektor = new List<>();
D ArrayList<String> lista = new List<>();
E List<String> vektor = new Vector<>();
F List<String> lista = new List<>();

Koje iznimke nasljeđuje izravno ili neizravno klasa ArrayIndexOutOfBoundsException
2 points
A
Error
B
Exception
C
Sve od navedenih.
D
Throwable
E
RuntimeException
F
IndexOutOfBoundsException

Koje se ključne riječi mogu postaviti na mjesta označena s 1, 2, i 3 ako je Car apstraktna klasa, a Electric sučelje: (moguće više odgovora)

Public 1 class ElectricCar 2 Car 3 Electric
2 points
A
3 - implements
B
1 - non-sealed
C
1 - final
D
2 - implements
E
2 - extends
F
3 - extends

Koji od navedenih tipova podataka u Javi ne predstavljaju objekte?
2 points
A
int
B
Svi predstavljaju objekte
C
String[]
D
Scanner
E
String
F
boolean

Kod kojih tipova u Javi je moguće koristiti referencu za metode kod lambda izraza? (moguće više odgovora)
3 points
A
Konstanti
B
Primitivnih tipova
C
Klasa
D
Effective final tipova
E
Izraza
F
Final tipova

Što od navedenog vrijedi i za sučelja i za apstraktne klase? 
2 points
A
Mogu sadržavati implementacija metoda.
B
Mogu sadržavati konstruktore.
C
Mogu sadržavati neimplementirane metode.
D
Mogu nasljeđivati druge entitete (sučelja mogu nasljeđivati druga sučelja, a klase mogu nasljeđivati druge klase).
E
Mogu sadržavati konstante.
F
Sve od navedenog.

Koje vrste iznimaka nikad ne bi bilo dobro hvatati zbog toga što može predstavljati situaciju tijekom izvođenja programa kad je bolje da program ne nastavi s radom?
2 points
A
Throwable
B
JavaException
C
Exception
D
Error
E
RuntimeException
F
VirtualMachineException

Pomoću koje naredbe je moguće odrediti objekt klase „Car“ koji ima najmanju cijenu, ako klasa „Car“ ima metodu „getPrice“ koja vraća cijenu automobila tipa „BigDecimal“? 
3 points

A
Car theCheapestCar = __cars.stream____().min__((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__;
B
Car theCheapestCar = __cars.stream____().min__((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice())).get__();
C
Car theCheapestCar = __cars.stream____().m__ax((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__;
D
Car theCheapestCar = __cars.stream____().__sorted((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__;
E
Car theCheapestCar = __cars.stream____().m__ax((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__.get();
F
Car theCheapestCar = __cars.stream____().__sorted((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__.get();

Ako je potrebno definirati konstantnu vrijednost u Javi koja će se moći koristiti u svim klasama, koje sve modifikatore je potrebno koristiti u tom slučaju? (moguće više odgovora)
2 points

A
static
B
final
C
volatile
D
private
E
abstract
F
public

Što je potrebno ubaciti na mjesto označeno s „??“ kako bi se na ispravan način određivala prosječna vrijednost realnih brojeva u listi koja je ulazni parametar metode?

public static BigDecimal average(List<BigDecimal> bigDecimals, RoundingMode roundingMode){
    BigDecimal sum = bigDecimals__.stream__()
     .map(Objects::requireNonNull)
     ??
    return __sum.divide__(new __BigDecimal(bigDecimals.size__()), roundingMode);
}

3 points

A
__.forEach(____BigDecimal.ZERO__, __BigDecimal.add__);
B
__.forEach(BigDecimal.__add, __BigDecimal.__ZERO);
C
.average(BigDecimal:add);
D
.reduce(BigDecimal.ZERO, BigDecimal.add);
E
__.reduce(BigDecimal.__add, __BigDecimal.__ZERO);
F
.average(bigDecimals);

Koje od navedenih lambda metoda vraćaju Optional
2 points
A
collect
B
limit
C
map
D
max
E
reduce
F
sorted

Koje vrste iznimki nije preporučljivo hvatati, jer je u situacijama kad se one jave često bolje da program završi s radom? (moguće više odgovora)
2 points

A
RuntimeException
B
Nijednu iznimku nije preporučljivo hvatati.
C
Throwable
D
Exception
E
Error
F
Preporučljivo je hvatati sve navedene iznimke.

Što se treba ispraviti u klasi „Garage“ da se mogla prevesti? 

public class Garage<T extends Car> {
    private List<T extends Car> carsInGarage;

    public List<T extends Car> getCarsInGarage() {
        return carsInGarage;
    }

    public void setCarsInGarage(List<T> carsInGarage){
        this.carsInGarage = carsInGarage;
    }
}
3 points
A
klasa  „Garage“ mora sadržavati oznaku <> nakon ključnih riječi "public class..."
B
klasa  „Garage“ mora implementirati sučelje „Car“
C
klasa „Garage“ mora imati konstruktor
D
Nema pogreške u klasi Garage
E
klasa  „Garage“ ne smije koristiti extends Car unutar tijela klase
F
klasa  „Garage“ ne smije koristiti extends Car u liniji "public class.."

Ako je zadan sljedeći record, pomoću koje naredbe je moguće promijeniti kapacitet baterije u metodi main?

public record Battery(Integer capacity) implements Serializable { }

public static void main(String[] args) {
    Battery novaBaterija = new Battery(100);
}
3 points
A
 Naredbom __novaBaterija.this.capacity__ = 100;
B
Nijednom od navedenih naredbi.
C
 Naredbom novaBaterija.capacity = 100;
D
Naredbom novaBaterija.capacity(100);
E
Naredbom novaBaterija.setCapacity(100);

Ako se kod definiranja članova klasa navede modifikator protected, što od navedenog
 vrijedi za te članove?
2 points

A
Članova je omogućen pristup iz klasa u kojima su definirani i klasa u istom paketu.
B
Članovima je omogućen pristup iz klasa u kojima su definirani, podklasa i klasa u istom 
 paketu. 
C
Članovima je omogućen pristup iz svih klasa uz korištenja ključne riječi „super“.
D
Članovima je omogućen pristup iz klasa u kojima su definirani i podklasa.
E
 Članovima je omogućen pristup iz klasa u kojima su definirani.
F
Članovima je omogućen pristup iz svih klasa.

 Što od navedenog će ispisati navedeni programski kod ako korisnik upiše „abc“? Klasa
 „JednaIznimka“ je označena iznimka, a klasa „DrugaIznimka“ je neoznačena iznimka.
3 points

public static void ucitaj () throws
JednaIznimka, DrugaIznimka {
Scanner sken = new Scanner(System.in); sken.next();
String broj
sken.close();
if(broj != "0")) {
}
throw new JednaIznimka ("Nije nula");
else {
throw new DrugaIznimka ("Nula");
}
}
public static void main(String[] arg
{
try {
ucitaj();
}
catch (JednaIznimka e) {
e.printStackTrace();
}
}

A
Samo tekst „Nula“. 
B
 Ništa od navedenog, jer se navedeni program ne može prevesti zbog pogreške.
C
Samo stazu stoga iznimke „Druga iznimka“.
D
 Samo stazu stoga iznimke „Jedna iznimka“. 
E
Samo staza stoga iznimke „InputMismatchException“
F
Samo tekst „Nije nula“.

Koja funkcionalna sučelja u Javi vraćaju objekt tipa „T“?
2 points
A
Predicate<T>
B
UnaryOperator<T>
C
 Supplier<T>
D
Consumer<T>
E
Function<T>
F
BinaryOperator<T, R>

Što će ispisati sljedeći programski kod?

Integer i = 0;

while( i < 5) {
    try {
        __System.out.println__(i);
        if( i % 2 == 0)
            throw new RuntimeException("Pogreška!");

    } catch (Exception ex){
         i++;
        __System.out.println__("Catch");
        continue;
    } finally {
        __System.out.println__("Finally");
         i += 2;
    }
}

__System.out.println__("Konačno: " + i);

3 points
A
5
B
7
C
6
D
3
E
Ništa od navedenog zbog pogreške u programskom kodu.
F
4

Koja od navedenih metoda vezana uz lambda izraze predstavlja završnu operaciju?
2 points

2 points
A
sorted
B
Nijedna od navedenih
C
findFirst
D
sort
E
stream
F
filter

Ako postoji klasa Student koja ima metodu getProsjek koja vraća Double, što bi vratio izraz Student::getProsjek
2 points

A
Predicate<Student, Double>
B
Function<Student, Double>
C
Function<Double>
D
Predicate<Student>
E
Function<Student>
F
Predicate<Double>

 Što vraća sljedeći programski isječak ako se umjesto količine automobila unese "abc", ako se objekat klase Scanner u metodu getCars preda na ispravan način? 

private static Car[] eCars(Scanner inputScanner) {
    Boolean error = false;
    Integer numberOfCars = -1;

    do {
        error = false;
        try {
            __System.out.print__("Unesite količinu automobila koje želite unijeti: ");
            numberOfCars = inputScanner.nextInt();
        } catch (InputMismatchException e) {
            String message = "Neispravan unos broja automobila";
logger.error(message,e);
            __System.out.println__(message);
            error = true;
        }
    } while(error);

    Car[] cars = new Car[numberOfCars];
    for (int i = 0; i < numberOfCars; i++) {
        enterCar(i, inputScanner, cars);
    }

    return cars;
}
3 points
A
Dogodi se iznimka OutOfMemoryError i prekine rad programa
B
Dogodi se iznimka StackOverflowError i prekine rad programa
C
Dogodi se iznimka ArrayIndexOutOfBoundsException i prekine rad programa
D
Dogodi se beskonačna petlja
E
Dogodi se iznimka InputMismatchException i prekine rad programa.
F
Dogodi se iznimka NullPointerException i prekine rad programa.

Što od navedenog ne vrijedi za apstraktne klase (samo jedan odgovor)? 
2 points
A
Apstraktne klase moraju sadržavati barem jednu apstraktnu metodu. 
B
Iz apstraktnih klasa se mogu kreirati objekti. 
C
Apstraktne klase mogu sadržavati tijelo metoda.
D
Apstraktne klase mogu sadržavati konstruktor.
E
Apstraktne klase mogu implementirati sučelja. 
F
Apstraktne klase mogu nasljeđivati druge apstraktne klase.

Po čemu se razlikuju enumeracije i klase?
2 points
A
Enumeracijemogu sadržavati konstante, a klase ne mogu.
B
 Enumeracije ne mogu imati konstruktor, a klase mogu imati konstruktor.
C
Enumeracije mogu imati konstruktor, a klase ne mogu imati konstruktor.
D
Enumeracije mogu imati „setter“ metode, a klase mogu imati „setter“ metode.
E
Enumeracije ne mogu imati „setter“ metode, a klase mogu imati „setter“ metode.
F
Enumeracije ne mogu sadržavati konstante, a klase mogu.

Pomoću koje klase i koje metode je moguće kreirati objekt koji služi za kreiranje log zapisa u Java programima (odabrati dva odgovora)
3 points
A
getLog
B
getLogger
C
Logback
D
createLog
E
Log
F
Logger

Koje pogreške postoje u sljedećoj definiciji enumeracije?

public enum CarTypeCategory {
    FUEL(1), ELECTRIC(2);

    private Integer code;

    public CarTypeCategory(Integer code) {
        __this.code__ = code;
    }

    public Integer getCode() {
        return code;
    }
}

2 points
A 
Oznaka ; nakonELECTRIC(2) je suvišna.
B
Prva naredba unutar konstruktora mora biti super();
C
Konstruktor ne smije biti public, već samo private
D
Nedostaje setCode metoda.
E
Nema pogreške u navedenom programskom isječku
F
Konstruktor ne smije biti public, već samo private ili protected.

Show more

Analizirao primjere i osmislio template za generiranje ispitnih pitanja.
19s















Analiza i Template za Pitanja iz Kolokvija Java
Analizirao sam sve primjere pitanja koje si dao. Evo detaljne analize uzoraka i template-a za generiranje novih pitanja.

ANALIZA UZORAKA PITANJA
DIO 1: Pitanja za 2 boda (Teorijska)
Kategorija	Uzorak	Primjer iz tvojih pitanja
Definicija pojmova	"Koja je veza između X i Y?"	JRE vs JDK
Hijerarhija klasa	"Koje klase/iznimke nasljeđuje X?"	ArrayIndexOutOfBoundsException hijerarhija
Modifikatori pristupa	"Što vrijedi za članove s modifikatorom X?"	protected pristup
Svojstva entiteta	"Što vrijedi i za X i za Y?"	Sučelja vs apstraktne klase
Ograničenja	"Što od navedenog NE vrijedi za X?"	Apstraktne klase ograničenja
Funkcionalna sučelja	"Koje sučelje vraća tip X?"	Supplier, Function, Predicate
Ključne karakteristike 2-bodnih pitanja:

Testiraju poznavanje definicija i terminologije
Traže razumijevanje hijerarhije (nasljeđivanje)
Ispituju modifikatore i njihova značenja
Često imaju više točnih odgovora
Ne zahtijevaju čitanje koda
DIO 2: Pitanja za 3 boda (Programska/Problem-solving)
Kategorija	Uzorak	Primjer
Što će ispisati kod?	Daje se kompletan kod s Comparator/Stream	TreeSet + Comparator ispis
Pronađi pogrešku	Kod s namjernom greškom	Object comparison s ==
Što nedostaje?	Nepotpun kod	Stream reduce operacija
Što treba ispraviti?	Kod s greškom kompilacije	Generic klasa s extends
Što će se dogoditi?	Scenarij s try-catch-finally	Beskonačna petlja, iznimke
Koja naredba?	Traži točnu lambda/stream sintaksu	min/max s Comparator
Ključne karakteristike 3-bodnih pitanja:

Zahtijevaju čitanje i razumijevanje koda
Testiraju predviđanje ponašanja programa
Ispituju poznavanje API-ja (Stream, Collections)
Traže pronalaženje grešaka u logici ili sintaksi
Često uključuju try-catch-finally, Comparator, ili Generics
TEMPLATE ZA GENERIRANJE PITANJA
TEMPLATE A: Pitanja za 2 boda (Teorijska)
=== TEMPLATE A1: Definicija i Veza ===
PITANJE: Koja je veza između [POJAM_1] i [POJAM_2]?

STRUKTURA ODGOVORA:
A) [POJAM_1] sadrži [POJAM_2] - točno/netočno
B) [POJAM_2] sadrži [POJAM_1] - točno/netočno  
C) [NETOČNA_VEZA_1]
D) [NETOČNA_VEZA_2]
E) [BESMISLENA_OPCIJA]
F) Ništa od navedenog

PRIMJER TEME: Virtual Threads vs Platform Threads
=== TEMPLATE A2: Hijerarhija Nasljeđivanja ===
PITANJE: Koje klase/sučelja nasljeđuje izravno ili neizravno [KLASA/SUČELJE]?

STRUKTURA ODGOVORA (više točnih):
A) [DIREKTNI_RODITELJ] - točno
B) [INDIREKTNI_RODITELJ] - točno
C) [KLASA_IZ_DRUGE_GRANE] - netočno
D) [KORIJENSKA_KLASA] - točno
E) [NEPOVEZANA_KLASA] - netočno
F) Sve od navedenog

PRIMJER TEME: SequencedCollection hijerarhija
=== TEMPLATE A3: Modifikatori i Pristup ===
PITANJE: Ako se kod definiranja članova klase navede modifikator [MODIFIKATOR], 
što od navedenog vrijedi za te članove?

STRUKTURA ODGOVORA:
A) Pristup iz [LOKACIJA_1]
B) Pristup iz [LOKACIJA_2] 
C) Pristup iz [LOKACIJA_3]
D) Pristup iz svih klasa
E) Pristup samo iz klase u kojoj su definirani
F) [KRIVO_TUMAČENJE]

PRIMJER TEME: sealed klase i permits
=== TEMPLATE A4: Usporedba Entiteta ===
PITANJE: Što od navedenog vrijedi i za [ENTITET_1] i za [ENTITET_2]?

STRUKTURA ODGOVORA (više točnih):
A) Mogu sadržavati [ZNAČAJKA_1]
B) Mogu sadržavati [ZNAČAJKA_2]
C) Mogu [AKCIJA_1]
D) Mogu [AKCIJA_2]
E) [ZNAČAJKA_SAMO_ZA_JEDAN]
F) Sve od navedenog

PRIMJER TEME: Records vs Sealed Classes
=== TEMPLATE A5: Funkcionalna Sučelja ===
PITANJE: Koja funkcionalna sučelja [VRAĆAJU/PRIMAJU] [TIP]?

STRUKTURA ODGOVORA (više točnih):
A) Predicate<T>
B) Function<T, R>
C) Consumer<T>
D) Supplier<T>
E) UnaryOperator<T>
F) BinaryOperator<T>

PRIMJER TEME: Gatherers API funkcionalna sučelja
=== TEMPLATE A6: Ograničenja ===
PITANJE: Što od navedenog NE vrijedi za [KONCEPT]?

STRUKTURA ODGOVORA:
A) [ISTINA_1]
B) [ISTINA_2]
C) [ISTINA_3]
D) [LAŽ - TOČAN ODGOVOR]
E) [ISTINA_4]
F) [ISTINA_5]

PRIMJER TEME: Pattern Matching ograničenja
TEMPLATE B: Pitanja za 3 boda (Programska)
=== TEMPLATE B1: Što Će Ispisati Kod ===
PITANJE: Što će ispisati sljedeći programski odsječak?

STRUKTURA KODA:
- Klasa s atributima i konstruktorom
- Main metoda s kolekcijom (TreeSet/List)
- Comparator ili Stream operacija
- For petlja s ispisom

STRUKTURA ODGOVORA:
A) [ISPIS_ASC]
B) [ISPIS_DESC]
C) [ISPIS_S_DUPLIKATIMA]
D) [ISPIS_BEZ_JEDNOG]
E) Pogreška u programu
F) Ništa od navedenog

VARIJABLE:
- Tip kolekcije: TreeSet, ArrayList, LinkedList
- Kriterij sortiranja: datum, cijena, ime
- Broj elemenata: 3-4
=== TEMPLATE B2: Pronađi Pogrešku ===
PITANJE: Pronađite pogrešku u sljedećoj metodi za [OPIS_FUNKCIJE]:

STRUKTURA KODA:
- Metoda s jasnom namjenom
- Jedna logička ili sintaksna greška
- Greška mora biti suptilna ali jasna

TIPOVI GREŠAKA:
- == umjesto .equals() za objekte
- Nedostaje .get() kod Optional
- Krivi redoslijed parametara
- Nedostaje break u switch
- Krivi tip povratne vrijednosti

STRUKTURA ODGOVORA:
A) [KRIVO_OBJAŠNJENJE_1]
B) [KRIVO_OBJAŠNJENJE_2]
C) [TOČNO_OBJAŠNJENJE]
D) [KRIVO_OBJAŠNJENJE_3]
E) [KRIVO_OBJAŠNJENJE_4]
F) Nema pogreške
=== TEMPLATE B3: Što Nedostaje ===
PITANJE: Što je potrebno ubaciti na mjesto označeno s "??" kako bi se [OPIS_FUNKCIJE]?

STRUKTURA KODA:
- Stream operacija s prazninom
- Lambda izraz s nedostajućim dijelom
- Reduce/collect/map operacija

STRUKTURA ODGOVORA:
A) .reduce([KRIVO_1])
B) .reduce([KRIVO_2])
C) .reduce([TOČNO])
D) .forEach([KRIVO])
E) .collect([KRIVO])
F) Ništa od navedenog
=== TEMPLATE B4: Ispravak Klase ===
PITANJE: Što se treba ispraviti u klasi [IME] da se mogla prevesti?

STRUKTURA KODA:
- Generic klasa s greškom
- Sealed klasa s krivim permits
- Record s krivom sintaksom

TIPOVI GREŠAKA:
- <T extends X> unutar tijela umjesto samo u deklaraciji
- Nedostaje permits
- Krivi modifikator konstruktora

STRUKTURA ODGOVORA:
A) Mora sadržavati [X]
B) Mora implementirati [Y]
C) Ne smije koristiti [Z]
D) Nema pogreške
E) Mora imati konstruktor
F) [KRIVO_OBJAŠNJENJE]
=== TEMPLATE B5: Što Se Događa ===
PITANJE: Što vraća/se događa ako [SCENARIJ]?

STRUKTURA KODA:
- Try-catch-finally blok
- Petlja s continue/break
- Rekurzija s greškom

SCENARIJI:
- Unos neispravnih podataka
- Beskonačna petlja
- Stack overflow
- Null pointer

STRUKTURA ODGOVORA:
A) Iznimka [X] i prekid
B) Iznimka [Y] i prekid
C) Beskonačna petlja
D) Vraća [VRIJEDNOST]
E) NullPointerException
F) ArrayIndexOutOfBoundsException
=== TEMPLATE B6: Točna Naredba ===
PITANJE: Pomoću koje naredbe je moguće [OPIS_OPERACIJE]?

STRUKTURA KODA:
- Stream operacije
- Optional handling
- Comparator sintaksa

STRUKTURA ODGOVORA:
A) .stream().min(...) - bez .get()
B) .stream().min(...).get() - s .get()
C) .stream().max(...) - obrnuti comparator
D) .stream().sorted(...) - bez terminalne operacije
E) .stream().max(...).get() - točan odgovor
F) .stream().filter(...) - kriva operacija
KAKO KORISTITI TEMPLATE
Korak 1: Odaberi temu iz Java 25
Primjer: "Virtual Threads", "Pattern Matching for switch", "Record Patterns", "Sequenced Collections"

Korak 2: Odaberi template
Za teorijsko pitanje → Template A1-A6
Za programsko pitanje → Template B1-B6

Korak 3: Popuni varijable
Zamijeni [PLACEHOLDER] s konkretnim pojmovima iz teme

Korak 4: Kreiraj distraktore
1 točan odgovor (ili više za višestruki izbor)
2-3 slična ali netočna odgovora
1-2 očito netočna odgovora
Opcija "Ništa od navedenog" ili "Sve od navedenog"
PRIMJER GENERIRANJA PITANJA
Tema: Sequenced Collections (Java 21+)

Korišten template: A2 (Hijerarhija)

Generirano pitanje:

Koje sučelje izravno nasljeđuje sučelje SequencedSet?

A) Set B) SequencedCollection
C) Collection D) SortedSet E) Iterable F) Sve od navedenog

Točan odgovor: B (SequencedCollection) i A (Set)

Želiš li da ti generiram konkretna pitanja za neku specifičnu temu iz Jave 25? Mogu istražiti najnovije značajke i kreirati pitanja prema ovom template-u.



How can I help you today?

Session limit reached ∙ resets 4:00 AM
Subscribe to Max
Trebam pitanja iz sljedecih temi, ta pitanja moraju biti u ovom stilu i moram ih moci staviti u seeder za bazu. 
Evo templatea za seeder za bazu

Here are the lectures. I need all this in Croatian






import { QuestionType, Difficulty } from '@prisma/client' export const oopConceptsQuestions = { lectureSlug: 'oop-concepts', questions: [ // Nasljeđivanje { type: 'SINGLE_CHOICE' as QuestionType, prompt: 'Koja ključna riječ se koristi za nasljeđivanje klase u Javi?',

pasted



// Lectures based on Themes.md const lectures = [ { title: 'Klase i objekti', slug: 'classes-and-objects', order: 1, description: 'Osnove objektno orijentiranog programiranja u Javi - klase, objekti, konstruktori i životni ciklus objekata.', content: `# Klase i objekti

pasted



26.14 KB •621 lines
•
Formatting may be inconsistent from source
import { QuestionType, Difficulty } from '@prisma/client'

export const oopConceptsQuestions = {
  lectureSlug: 'oop-concepts',
  questions: [
    // Nasljeđivanje
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koja ključna riječ se koristi za nasljeđivanje klase u Javi?',
      explanation: 'U Javi se koristi ključna riječ "extends" za nasljeđivanje klasa. Podklasa nasljeđuje sve vidljive članove nadklase (osim konstruktora).',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'extends', isCorrect: true },
        { text: 'implements', isCorrect: false },
        { text: 'inherits', isCorrect: false },
        { text: 'super', isCorrect: false },
      ],
    },
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'Java podržava višestruko nasljeđivanje klasa (jedna klasa može nasljeđivati više klasa).',
      explanation: 'Java ne podržava višestruko nasljeđivanje klasa kako bi izbjegla "diamond problem". Klasa može nasljeđivati samo jednu klasu, ali može implementirati više sučelja.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: true },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    public void bark() {
        System.out.println(name + " says: Woof!");
    }
}`,
      explanation: 'Kod će se kompilirati uspješno. Dog klasa nasljeđuje Animal klasu i poziva konstruktor nadklase pomoću super(name). Pristup protected polju "name" je dozvoljen jer je Dog podklasa.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što podklasa nasljeđuje od nadklase?',
      explanation: 'Podklasa nasljeđuje sve public i protected članove nadklase. Private članovi nisu dostupni podklasi, ali postoje kao dio objekta. Konstruktori se ne nasljeđuju.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Sve public i protected članove, ali ne konstruktore', isCorrect: true },
        { text: 'Sve članove uključujući private', isCorrect: false },
        { text: 'Sve članove uključujući konstruktore', isCorrect: false },
        { text: 'Samo public metode', isCorrect: false },
      ],
    },

    // Overriding i overloading
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koja je razlika između overriding i overloading?',
      explanation: 'Overriding je redefiniranje metode nadklase u podklasi s istim potpisom. Overloading je definiranje više metoda s istim imenom ali različitim parametrima u istoj klasi.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Overriding redefinira metodu nadklase, overloading stvara više verzija metode s različitim parametrima', isCorrect: true },
        { text: 'Overloading redefinira metodu nadklase, overriding stvara više verzija', isCorrect: false },
        { text: 'Oba rade isto, samo je različita terminologija', isCorrect: false },
        { text: 'Overriding se odnosi na konstruktore, overloading na metode', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `class Parent {
    public void display() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override
    public void display(int x) {
        System.out.println("Child: " + x);
    }
}`,
      explanation: 'Kod se neće kompilirati. @Override anotacija zahtijeva da metoda nadpisuje metodu iz nadklase s istim potpisom. display(int x) ima različit potpis od display(), pa nije overriding već overloading. Greška: method does not override or implement a method from a supertype.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: false },
        { text: 'Will not compile (compilation error)', isCorrect: true },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koja pravila vrijede za method overriding?',
      explanation: 'Pri overridingu, povratni tip može biti jednak ili kovarijantan (podtip), metoda ne može smanjiti vidljivost, i može baciti manje ili iste checked exceptions.',
      difficulty: 'HARD' as Difficulty,
      options: [
        { text: 'Potpis metode mora biti identičan (ime i parametri)', isCorrect: true },
        { text: 'Povratni tip može biti podtip originalnog (covariant return)', isCorrect: true },
        { text: 'Ne može se smanjiti vidljivost (npr. public -> private)', isCorrect: true },
        { text: 'Može baciti bilo koje nove checked exceptions', isCorrect: false },
      ],
    },
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'Konstruktori se mogu preopteretiti (overload) ali ne mogu se nadpisati (override).',
      explanation: 'Konstruktori se mogu overloadati (više konstruktora s različitim parametrima), ali se ne nasljeđuju pa ih nema smisla overrideati. Svaka klasa mora definirati svoje konstruktore.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'True', isCorrect: true },
        { text: 'False', isCorrect: false },
      ],
    },

    // Polimorfizam
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što je polimorfizam u objektno orijentiranom programiranju?',
      explanation: 'Polimorfizam omogućuje objektu da se ponaša kao njegov nadtip. To znači da se referenca nadklase može koristiti za pokazivanje na objekte podklasa, i odgovarajuće metode će biti pozvane u runtime-u.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Mogućnost objekta da se ponaša kao njegov nadtip', isCorrect: true },
        { text: 'Kreiranje više konstruktora', isCorrect: false },
        { text: 'Nasljeđivanje više klasa', isCorrect: false },
        { text: 'Kreiranje privatnih metoda', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati i izvršiti?',
      codeSnippet: `class Animal {
    public void makeSound() {
        System.out.println("Some sound");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal animal = new Cat();
        animal.makeSound();
    }
}`,
      explanation: 'Ispisat će "Meow". Ovo je primjer polimorfizma - referenca tipa Animal pokazuje na objekt tipa Cat. U runtime-u se poziva Cat verzija metode makeSound() (dynamic binding).',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Kada se odlučuje koja verzija override metode će biti pozvana?',
      explanation: 'Odluka o verziji metode donosi se u runtime-u na temelju stvarnog tipa objekta (dynamic/late binding). Ovo omogućuje polimorfizam - različiti objekti mogu različito odgovoriti na isti poziv metode.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'U runtime-u na temelju stvarnog tipa objekta (dynamic binding)', isCorrect: true },
        { text: 'Pri kompilaciji na temelju tipa reference (static binding)', isCorrect: false },
        { text: 'Pri učitavanju klase', isCorrect: false },
        { text: 'Nikada, uvijek se poziva metoda nadklase', isCorrect: false },
      ],
    },

    // Apstraktne klase i metode
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'Apstraktna klasa može sadržavati i apstraktne i konkretne metode.',
      explanation: 'Apstraktna klasa može imati apstraktne metode (bez implementacije) i konkretne metode (s implementacijom). Ne mora imati niti jednu apstraktnu metodu, ali ne može biti instancirana.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'True', isCorrect: true },
        { text: 'False', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `abstract class Shape {
    abstract double calculateArea();
    
    public void display() {
        System.out.println("Area: " + calculateArea());
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    double calculateArea() {
        return Math.PI * radius * radius;
    }
}`,
      explanation: 'Kod će se kompilirati uspješno. Circle konkretizira apstraktnu klasu Shape implementirajući apstraktnu metodu calculateArea(). Apstraktna klasa može pozvati apstraktnu metodu u konkretnoj metodi.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Može li se kreirati instanca apstraktne klase?',
      explanation: 'Apstraktne klase ne mogu se instancirati pomoću "new". Mogu se kreirati samo instance njihovih konkretnih (ne-apstraktnih) podklasa.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Ne, apstraktne klase ne mogu se instancirati', isCorrect: true },
        { text: 'Da, ali samo uz posebnu sintaksu', isCorrect: false },
        { text: 'Da, ako nemaju apstraktne metode', isCorrect: false },
        { text: 'Da, ali samo u istom paketu', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `abstract class Vehicle {
    abstract void start();
}

class Car extends Vehicle {
    // No implementation of start()
}`,
      explanation: 'Kod se neće kompilirati. Car je konkretna klasa (nije označena kao abstract) koja nasljeđuje apstraktnu klasu Vehicle, pa mora implementirati sve apstraktne metode. Car mora implementirati start() ili biti označen kao abstract.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: false },
        { text: 'Will not compile (compilation error)', isCorrect: true },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },

    // Sučelja (Interfaces)
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koja ključna riječ se koristi za implementaciju sučelja?',
      explanation: 'Ključna riječ "implements" se koristi kada klasa implementira jedno ili više sučelja. Klasa može implementirati više sučelja, ali može nasljeđivati samo jednu klasu.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'implements', isCorrect: true },
        { text: 'extends', isCorrect: false },
        { text: 'interface', isCorrect: false },
        { text: 'inherit', isCorrect: false },
      ],
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Što sučelje može sadržavati (od Java 8+)?',
      explanation: 'Od Java 8, sučelja mogu imati default metode (s implementacijom), static metode, apstraktne metode, i konstante (public static final polja). Od Java 9, mogu imati i private metode.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Apstraktne metode', isCorrect: true },
        { text: 'Default metode s implementacijom', isCorrect: true },
        { text: 'Static metode', isCorrect: true },
        { text: 'Instance varijable (non-final)', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `interface Flyable {
    void fly();
    
    default void land() {
        System.out.println("Landing...");
    }
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Flying");
    }
    
    @Override
    public void swim() {
        System.out.println("Swimming");
    }
}`,
      explanation: 'Kod će se kompilirati uspješno. Duck implementira oba sučelja i definira sve potrebne apstraktne metode. Default metoda land() je dostupna ali nije obavezno implementirati je.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'Klasa može implementirati više sučelja istovremeno.',
      explanation: 'Java dopušta implementaciju više sučelja odjednom (višestruko nasljeđivanje preko sučelja). Ovo ne uzrokuje "diamond problem" jer sučelja ne sadrže stanje (instance varijable).',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'True', isCorrect: true },
        { text: 'False', isCorrect: false },
      ],
    },

    // final keyword
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Kako se može koristiti "final" ključna riječ u Javi?',
      explanation: 'final može biti primijenjeno na varijable (konstante), metode (ne mogu se overrideati), i klase (ne mogu se nasljeđivati). To osigurava immutability i sprječava nasljeđivanje/overriding.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Na varijable - čini ih konstantama', isCorrect: true },
        { text: 'Na metode - sprječava overriding', isCorrect: true },
        { text: 'Na klase - sprječava nasljeđivanje', isCorrect: true },
        { text: 'Na konstruktore - sprječava overloading', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `final class Utility {
    public static void helper() {
        System.out.println("Helper");
    }
}

class ExtendedUtility extends Utility {
    public static void anotherHelper() {
        System.out.println("Another helper");
    }
}`,
      explanation: 'Kod se neće kompilirati. Klasa Utility je označena kao final, što znači da ne može biti nasljeđena. ExtendedUtility pokušava nasljediti final klasu, što je zabranjeno.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: false },
        { text: 'Will not compile (compilation error)', isCorrect: true },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `class Parent {
    public final void display() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    @Override
    public void display() {
        System.out.println("Child");
    }
}`,
      explanation: 'Kod se neće kompilirati. Metoda display() u Parent klasi je final, što znači da je ne može overrideati Child klasa. final metode su "zapečaćene" i ne mogu biti promijenjene u podklasama.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: false },
        { text: 'Will not compile (compilation error)', isCorrect: true },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'final varijabla mora biti inicijalizirana pri deklaraciji ili u konstruktoru.',
      explanation: 'final varijable moraju biti inicijalizirane točno jednom - ili pri deklaraciji, ili u svakom konstruktoru (za instance varijable), ili u statičkom bloku (za static varijable). Nakon toga ne mogu se mijenjati.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'True', isCorrect: true },
        { text: 'False', isCorrect: false },
      ],
    },

    // Access modifikatori
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koji su valjani access modifikatori u Javi?',
      explanation: 'Java ima četiri razine pristupa: public (svugdje), protected (paket + podklase), default/package-private (samo paket), i private (samo klasa).',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'public', isCorrect: true },
        { text: 'protected', isCorrect: true },
        { text: 'private', isCorrect: true },
        { text: 'internal', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što znači "default" (package-private) pristup?',
      explanation: 'Default pristup (bez eksplicitnog modifikatora) znači da je član dostupan samo unutar istog paketa. Nije dostupan podklasama u drugim paketima.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Dostupno samo unutar istog paketa', isCorrect: true },
        { text: 'Dostupno svugdje', isCorrect: false },
        { text: 'Dostupno u svim podklasama', isCorrect: false },
        { text: 'Dostupno samo unutar klase', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati ako se klase nalaze u različitim paketima?',
      codeSnippet: `// package com.example.parent
package com.example.parent;

public class Parent {
    protected int value = 10;
}

// package com.example.child
package com.example.child;

import com.example.parent.Parent;

class Child extends Parent {
    public void display() {
        System.out.println(value); // Pristup protected polju
    }
}`,
      explanation: 'Kod će se kompilirati uspješno. protected članovi su dostupni podklasama čak i ako su u različitim paketima. Child može pristupiti protected polju "value" jer nasljeđuje Parent.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koji je najrestriktivniji (najmanji) access modifikator?',
      explanation: 'private je najrestriktivniji modifikator - članova označeni kao private dostupni su samo unutar iste klase. Čak i podklase nemaju pristup private članovima nadklase.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'private', isCorrect: true },
        { text: 'default (package-private)', isCorrect: false },
        { text: 'protected', isCorrect: false },
        { text: 'public', isCorrect: false },
      ],
    },

    // Kompozicija vs nasljeđivanje
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što je kompozicija u objektno orijentiranom programiranju?',
      explanation: 'Kompozicija znači da klasa sadrži instance drugih klasa kao polja ("has-a" odnos). To je alternativa nasljeđivanju i često je fleksibilnija, jer omogućuje promjenu ponašanja u runtime-u.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Odnos "has-a" - klasa sadrži instance drugih klasa', isCorrect: true },
        { text: 'Odnos "is-a" - klasa nasljeđuje drugu klasu', isCorrect: false },
        { text: 'Implementacija više sučelja', isCorrect: false },
        { text: 'Kreiranje apstraktnih metoda', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Koji pristup je prikazan u sljedećem kodu?',
      codeSnippet: `class Engine {
    public void start() {
        System.out.println("Engine started");
    }
}

class Car {
    private Engine engine; // Kompozicija
    
    public Car() {
        this.engine = new Engine();
    }
    
    public void start() {
        engine.start();
        System.out.println("Car started");
    }
}`,
      explanation: 'Ovo je primjer kompozicije. Car "ima" (has-a) Engine kao polje. Car koristi funkcionalnost Engine-a kroz delegaciju. Kompilirat će se i raditi uspješno.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koje su prednosti kompozicije nad nasljeđivanjem?',
      explanation: 'Kompozicija je fleksibilnija (promjena ponašanja u runtime-u), smanjuje povezanost između klasa, izbjegava probleme s krhkim baznim klasama, i omogućuje bolju testabilnost.',
      difficulty: 'HARD' as Difficulty,
      options: [
        { text: 'Veća fleksibilnost - ponašanje se može mijenjati u runtime-u', isCorrect: true },
        { text: 'Slabija povezanost (loose coupling)', isCorrect: true },
        { text: 'Izbjegavanje problema s krhkim baznim klasama', isCorrect: true },
        { text: 'Automatsko nasljeđivanje svih metoda', isCorrect: false },
      ],
    },
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'Kompozicija omogućuje "is-a" odnos između klasa.',
      explanation: 'Kompozicija predstavlja "has-a" odnos (Car "ima" Engine), dok nasljeđivanje predstavlja "is-a" odnos (Dog "je" Animal). To su dva različita pristupa modeliranju odnosa između klasa.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: true },
      ],
    },

    // super keyword
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što predstavlja ključna riječ "super" u Javi?',
      explanation: 'super je referenca na nadklasu trenutnog objekta. Koristi se za pristup članovima nadklase (polja, metode) i pozivanje konstruktora nadklase.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Referencu na nadklasu trenutnog objekta', isCorrect: true },
        { text: 'Referencu na trenutni objekt', isCorrect: false },
        { text: 'Statičku varijablu', isCorrect: false },
        { text: 'Novu instancu nadklase', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        super.makeSound();
        System.out.println("Woof!");
    }
}`,
      explanation: 'Kod će se kompilirati uspješno. super(name) poziva konstruktor nadklase, a super.makeSound() poziva metodu nadklase prije dodavanja dodatnog ponašanja. Ovo je čest pattern.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'Poziv super() konstruktora mora biti prva naredba u konstruktoru podklase.',
      explanation: 'Ako eksplicitno pozivamo super() ili this(), to mora biti prva naredba u konstruktoru. Ako ne pozovemo ništa, compiler automatski dodaje super() poziv na početku.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'True', isCorrect: true },
        { text: 'False', isCorrect: false },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se ispisati?',
      codeSnippet: `class Parent {
    public int value = 10;
    
    public void display() {
        System.out.println("Parent: " + value);
    }
}

class Child extends Parent {
    public int value = 20;
    
    public void show() {
        System.out.println("Child value: " + value);
        System.out.println("Parent value: " + super.value);
    }
}

public class Test {
    public static void main(String[] args) {
        Child c = new Child();
        c.show();
    }
}`,
      explanation: 'Ispisat će "Child value: 20" i "Parent value: 10". super.value pristupa polju iz nadklase, dok value (ili this.value) pristupa polju trenutne klase. Polja ne podliježu polimorfizmu.',
      difficulty: 'HARD' as Difficulty,
      options: [
        { text: 'Will compile and run successfully', isCorrect: true },
        { text: 'Will not compile (compilation error)', isCorrect: false },
        { text: 'Compiles but throws runtime exception', isCorrect: false },
      ],
    },
  ],
}


New chat

PRIMJER PRVE KONTROLNE ZADAĆE IZ "PROGRAMIRANJA U JAVI" 1. Koja je veza između JRE-a i JDK-a? A JRE sadrži JDK. B JDK sadrži JRE. C JDK sadrži Eclipse, a JRE ne sadrži. D JRE sadrži Eclipse, a JDK ne sadrži. E JRE se brže izvodi od JDK-a. F JDK se brže izvodi od JRE-a. 2. Na koji od navedeni

pasted

Ti si profesor Jave na tehnickom veleucilistu i moras napraviti pitanja za kolokvij koji ima 6 pitanja za 2 boda i 6 pitanja za 3 boda. 
Prvih 6 pitanja za 2 boda je vise teorijski, dok je drugi dio 6 pitanja više programski i problem solving pitanje.

Evo ti primjeri pitanja i opiši prema kojim načelima, koceptima, kalupima su ta pitanja napravljena kako bi se taj template mogao koristiti za generiranje više pitanja točno tog stila.

Trebamo uvijek najnovije provjerene stvari iz Jave 25 koja je trenutno najnovija.

Trebam template gdje cu napisati temu za Javu 25 i onda ce AI na temelju tog templatea koji ce opisivati strukturu pitanja zgenerirati ta pitanja.
Primjeri pitanja i odgovora. 

 Koju pogrešku će dojaviti prevoditelj, ako su implementirane sljedeće klase i izvedene
 sljedeće dvije linije koda? 

3 points
A The type Druga must be an abstract class to define abstract methods
B The type Druga must implement the inherited abstract method __Prva.test__()
C The type Prva must implement the inherited abstract method __Druga.test__()
D Ništa od navedenog, nema pogreške u navedenom kodu.
E This method requires a body instead of a semicolon
F The type Prva must be an abstract class to define abstract methods

Što nedostaje slijedećem programskom isječku kako bi se na ispravan način određivao prosjek ocjena na ispitima studenata te bacati označenu iznimku u slučaju negativne ocjene?

**CODE

A Nedostaje try-catch-finally blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException
B Potrebno je maknuti throws NemoguceOdreditiProsjekStudenataException kod definicije metode
C Nedostaje try-finally blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException
D Nedostaje samo try blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException
E Ništa od navedenog, programski isječak je u potpunosti ispravan.
F Nedostaje try-catch blok oko naredbe throw new NemoguceOdreditiProsjekStudenataException

Pronađite pogrešku u sljedećoj metodi za provjeru duplikata:

private static Boolean checkDuplicateCar(Car carToCheck, Car[] existingCars) {
    for (Car enteredCar : existingCars) {
        if (carToCheck == enteredCar) {
            return true;
        }
    }
    return false;
}

3 points
A Kod return naredbe mora se koristiti vraćanje poput return new Boolean
B Pogreška je u for petlji, mora se koristiti indeks kod dohvata elemenata polja.
C Objekti se uspoređuju na neispravan način.
D Umjesto if naredbe mora pisati samo return carToCheck == enteredCar
E Metoda mora vraćati boolean umjesto Boolean.
F Nema pogreške u navedenom programskom isječku

Koje od navedenih iznimaka nema smisla hvatati (moguće više odgovora)
2 point
A VirtualMachineError
B Throwable
C NullpointerException
D OutOfMemoryError
E ArrayIndexOutOfBoundsException
F StackOverflowError

Što će ispisati sljedeći programski odsječak? 
3 BODA

public class Temperatura { private LocalDate datum; private float temperatura;
public Temperatura (LocalDate datum, float temperatura) { this.datum datum;
}
this.temperatura = temperatura;
public LocalDate getDatum() { return datum;
}
public float getTemperatura() { return temperatura;
}
}

public static void main(String[] args) { LocalDate datum1 = LocalDate.now();
LocalDate datum2 = LocalDate.now().plusDays(1); LocalDate datum3 = LocalDate.now().plusDays (2); Temperatura temp1 = new Temperatura (datum1, -15); Temperatura temp2 = new Temperatura (datum2, -20); Temperatura temp3 = new Temperatura (datum3, -10); Set<Temperatura> set =
new TreeSet<Temperatura>(
new TemperaturaComparator());
set.add(temp1);
set.add(temp2);
set.add(temp3);
set.add(temp3);
for (Temperatura temp set) {
}
System.out.println(temp.getTemperatura());

public class TemperaturaComparator implements Comparator<Temperatura> {
@Override
public int compare (Temperatura t1, Temperatura t2) { if (t1.getDatum().isAfter (t2.getDatum())) {
}
return 1;
else if(t1.getDatum ().isBefore (t2.getDatum())) {
return -1;
} else {
return 0;
}

A
-15.0
-20.0
-10.0
B
-15.0
-10.0
-10.0
-20.0
C
-10.0
-10.0
-15.0
-20.0
D
-10.0
-15.0
-20.0
E
-20.0
-15.0
-10.0
F
-20.0
-15.0
-10.0
-10.0

 S kojom metodom se može provjeriti imaju li dva String objekta spremljeni isti niz znakova?
2 points

A equals
B compare
C equalStrings
D compareStrings
E compareIfEqual
F checkIfEqual

Koje od navedenih naredbi se mogu prevesti?
2 points
A List<String> lista2 = new LinkedList<>();
B LinkedList<String> lista2 = new ArrayList<>();
C Vector<String> vektor = new List<>();
D ArrayList<String> lista = new List<>();
E List<String> vektor = new Vector<>();
F List<String> lista = new List<>();

Koje iznimke nasljeđuje izravno ili neizravno klasa ArrayIndexOutOfBoundsException
2 points
A
Error
B
Exception
C
Sve od navedenih.
D
Throwable
E
RuntimeException
F
IndexOutOfBoundsException

Koje se ključne riječi mogu postaviti na mjesta označena s 1, 2, i 3 ako je Car apstraktna klasa, a Electric sučelje: (moguće više odgovora)

Public 1 class ElectricCar 2 Car 3 Electric
2 points
A
3 - implements
B
1 - non-sealed
C
1 - final
D
2 - implements
E
2 - extends
F
3 - extends

Koji od navedenih tipova podataka u Javi ne predstavljaju objekte?
2 points
A
int
B
Svi predstavljaju objekte
C
String[]
D
Scanner
E
String
F
boolean

Kod kojih tipova u Javi je moguće koristiti referencu za metode kod lambda izraza? (moguće više odgovora)
3 points
A
Konstanti
B
Primitivnih tipova
C
Klasa
D
Effective final tipova
E
Izraza
F
Final tipova

Što od navedenog vrijedi i za sučelja i za apstraktne klase? 
2 points
A
Mogu sadržavati implementacija metoda.
B
Mogu sadržavati konstruktore.
C
Mogu sadržavati neimplementirane metode.
D
Mogu nasljeđivati druge entitete (sučelja mogu nasljeđivati druga sučelja, a klase mogu nasljeđivati druge klase).
E
Mogu sadržavati konstante.
F
Sve od navedenog.

Koje vrste iznimaka nikad ne bi bilo dobro hvatati zbog toga što može predstavljati situaciju tijekom izvođenja programa kad je bolje da program ne nastavi s radom?
2 points
A
Throwable
B
JavaException
C
Exception
D
Error
E
RuntimeException
F
VirtualMachineException

Pomoću koje naredbe je moguće odrediti objekt klase „Car“ koji ima najmanju cijenu, ako klasa „Car“ ima metodu „getPrice“ koja vraća cijenu automobila tipa „BigDecimal“? 
3 points

A
Car theCheapestCar = __cars.stream____().min__((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__;
B
Car theCheapestCar = __cars.stream____().min__((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice())).get__();
C
Car theCheapestCar = __cars.stream____().m__ax((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__;
D
Car theCheapestCar = __cars.stream____().__sorted((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__;
E
Car theCheapestCar = __cars.stream____().m__ax((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__.get();
F
Car theCheapestCar = __cars.stream____().__sorted((c1, c2) -> __c2.getPrice().compareTo(c1.getPrice()))__.get();

Ako je potrebno definirati konstantnu vrijednost u Javi koja će se moći koristiti u svim klasama, koje sve modifikatore je potrebno koristiti u tom slučaju? (moguće više odgovora)
2 points

A
static
B
final
C
volatile
D
private
E
abstract
F
public

Što je potrebno ubaciti na mjesto označeno s „??“ kako bi se na ispravan način određivala prosječna vrijednost realnih brojeva u listi koja je ulazni parametar metode?

public static BigDecimal average(List<BigDecimal> bigDecimals, RoundingMode roundingMode){
    BigDecimal sum = bigDecimals__.stream__()
     .map(Objects::requireNonNull)
     ??
    return __sum.divide__(new __BigDecimal(bigDecimals.size__()), roundingMode);
}

3 points

A
__.forEach(____BigDecimal.ZERO__, __BigDecimal.add__);
B
__.forEach(BigDecimal.__add, __BigDecimal.__ZERO);
C
.average(BigDecimal:add);
D
.reduce(BigDecimal.ZERO, BigDecimal.add);
E
__.reduce(BigDecimal.__add, __BigDecimal.__ZERO);
F
.average(bigDecimals);

Koje od navedenih lambda metoda vraćaju Optional
2 points
A
collect
B
limit
C
map
D
max
E
reduce
F
sorted

Koje vrste iznimki nije preporučljivo hvatati, jer je u situacijama kad se one jave često bolje da program završi s radom? (moguće više odgovora)
2 points

A
RuntimeException
B
Nijednu iznimku nije preporučljivo hvatati.
C
Throwable
D
Exception
E
Error
F
Preporučljivo je hvatati sve navedene iznimke.

Što se treba ispraviti u klasi „Garage“ da se mogla prevesti? 

public class Garage<T extends Car> {
    private List<T extends Car> carsInGarage;

    public List<T extends Car> getCarsInGarage() {
        return carsInGarage;
    }

    public void setCarsInGarage(List<T> carsInGarage){
        this.carsInGarage = carsInGarage;
    }
}
3 points
A
klasa  „Garage“ mora sadržavati oznaku <> nakon ključnih riječi "public class..."
B
klasa  „Garage“ mora implementirati sučelje „Car“
C
klasa „Garage“ mora imati konstruktor
D
Nema pogreške u klasi Garage
E
klasa  „Garage“ ne smije koristiti extends Car unutar tijela klase
F
klasa  „Garage“ ne smije koristiti extends Car u liniji "public class.."

Ako je zadan sljedeći record, pomoću koje naredbe je moguće promijeniti kapacitet baterije u metodi main?

public record Battery(Integer capacity) implements Serializable { }

public static void main(String[] args) {
    Battery novaBaterija = new Battery(100);
}
3 points
A
 Naredbom __novaBaterija.this.capacity__ = 100;
B
Nijednom od navedenih naredbi.
C
 Naredbom novaBaterija.capacity = 100;
D
Naredbom novaBaterija.capacity(100);
E
Naredbom novaBaterija.setCapacity(100);

Ako se kod definiranja članova klasa navede modifikator protected, što od navedenog
 vrijedi za te članove?
2 points

A
Članova je omogućen pristup iz klasa u kojima su definirani i klasa u istom paketu.
B
Članovima je omogućen pristup iz klasa u kojima su definirani, podklasa i klasa u istom 
 paketu. 
C
Članovima je omogućen pristup iz svih klasa uz korištenja ključne riječi „super“.
D
Članovima je omogućen pristup iz klasa u kojima su definirani i podklasa.
E
 Članovima je omogućen pristup iz klasa u kojima su definirani.
F
Članovima je omogućen pristup iz svih klasa.

 Što od navedenog će ispisati navedeni programski kod ako korisnik upiše „abc“? Klasa
 „JednaIznimka“ je označena iznimka, a klasa „DrugaIznimka“ je neoznačena iznimka.
3 points

public static void ucitaj () throws
JednaIznimka, DrugaIznimka {
Scanner sken = new Scanner(System.in); sken.next();
String broj
sken.close();
if(broj != "0")) {
}
throw new JednaIznimka ("Nije nula");
else {
throw new DrugaIznimka ("Nula");
}
}
public static void main(String[] arg
{
try {
ucitaj();
}
catch (JednaIznimka e) {
e.printStackTrace();
}
}

A
Samo tekst „Nula“. 
B
 Ništa od navedenog, jer se navedeni program ne može prevesti zbog pogreške.
C
Samo stazu stoga iznimke „Druga iznimka“.
D
 Samo stazu stoga iznimke „Jedna iznimka“. 
E
Samo staza stoga iznimke „InputMismatchException“
F
Samo tekst „Nije nula“.

Koja funkcionalna sučelja u Javi vraćaju objekt tipa „T“?
2 points
A
Predicate<T>
B
UnaryOperator<T>
C
 Supplier<T>
D
Consumer<T>
E
Function<T>
F
BinaryOperator<T, R>

Što će ispisati sljedeći programski kod?

Integer i = 0;

while( i < 5) {
    try {
        __System.out.println__(i);
        if( i % 2 == 0)
            throw new RuntimeException("Pogreška!");

    } catch (Exception ex){
         i++;
        __System.out.println__("Catch");
        continue;
    } finally {
        __System.out.println__("Finally");
         i += 2;
    }
}

__System.out.println__("Konačno: " + i);

3 points
A
5
B
7
C
6
D
3
E
Ništa od navedenog zbog pogreške u programskom kodu.
F
4

Koja od navedenih metoda vezana uz lambda izraze predstavlja završnu operaciju?
2 points

2 points
A
sorted
B
Nijedna od navedenih
C
findFirst
D
sort
E
stream
F
filter

Ako postoji klasa Student koja ima metodu getProsjek koja vraća Double, što bi vratio izraz Student::getProsjek
2 points

A
Predicate<Student, Double>
B
Function<Student, Double>
C
Function<Double>
D
Predicate<Student>
E
Function<Student>
F
Predicate<Double>

 Što vraća sljedeći programski isječak ako se umjesto količine automobila unese "abc", ako se objekat klase Scanner u metodu getCars preda na ispravan način? 

private static Car[] eCars(Scanner inputScanner) {
    Boolean error = false;
    Integer numberOfCars = -1;

    do {
        error = false;
        try {
            __System.out.print__("Unesite količinu automobila koje želite unijeti: ");
            numberOfCars = inputScanner.nextInt();
        } catch (InputMismatchException e) {
            String message = "Neispravan unos broja automobila";
logger.error(message,e);
            __System.out.println__(message);
            error = true;
        }
    } while(error);

    Car[] cars = new Car[numberOfCars];
    for (int i = 0; i < numberOfCars; i++) {
        enterCar(i, inputScanner, cars);
    }

    return cars;
}
3 points
A
Dogodi se iznimka OutOfMemoryError i prekine rad programa
B
Dogodi se iznimka StackOverflowError i prekine rad programa
C
Dogodi se iznimka ArrayIndexOutOfBoundsException i prekine rad programa
D
Dogodi se beskonačna petlja
E
Dogodi se iznimka InputMismatchException i prekine rad programa.
F
Dogodi se iznimka NullPointerException i prekine rad programa.

Što od navedenog ne vrijedi za apstraktne klase (samo jedan odgovor)? 
2 points
A
Apstraktne klase moraju sadržavati barem jednu apstraktnu metodu. 
B
Iz apstraktnih klasa se mogu kreirati objekti. 
C
Apstraktne klase mogu sadržavati tijelo metoda.
D
Apstraktne klase mogu sadržavati konstruktor.
E
Apstraktne klase mogu implementirati sučelja. 
F
Apstraktne klase mogu nasljeđivati druge apstraktne klase.

Po čemu se razlikuju enumeracije i klase?
2 points
A
Enumeracijemogu sadržavati konstante, a klase ne mogu.
B
 Enumeracije ne mogu imati konstruktor, a klase mogu imati konstruktor.
C
Enumeracije mogu imati konstruktor, a klase ne mogu imati konstruktor.
D
Enumeracije mogu imati „setter“ metode, a klase mogu imati „setter“ metode.
E
Enumeracije ne mogu imati „setter“ metode, a klase mogu imati „setter“ metode.
F
Enumeracije ne mogu sadržavati konstante, a klase mogu.

Pomoću koje klase i koje metode je moguće kreirati objekt koji služi za kreiranje log zapisa u Java programima (odabrati dva odgovora)
3 points
A
getLog
B
getLogger
C
Logback
D
createLog
E
Log
F
Logger

Koje pogreške postoje u sljedećoj definiciji enumeracije?

public enum CarTypeCategory {
    FUEL(1), ELECTRIC(2);

    private Integer code;

    public CarTypeCategory(Integer code) {
        __this.code__ = code;
    }

    public Integer getCode() {
        return code;
    }
}

2 points
A 
Oznaka ; nakonELECTRIC(2) je suvišna.
B
Prva naredba unutar konstruktora mora biti super();
C
Konstruktor ne smije biti public, već samo private
D
Nedostaje setCode metoda.
E
Nema pogreške u navedenom programskom isječku
F
Konstruktor ne smije biti public, već samo private ili protected.

Show more

Analizirao primjere i osmislio template za generiranje ispitnih pitanja.
19s















Analiza i Template za Pitanja iz Kolokvija Java
Analizirao sam sve primjere pitanja koje si dao. Evo detaljne analize uzoraka i template-a za generiranje novih pitanja.

ANALIZA UZORAKA PITANJA
DIO 1: Pitanja za 2 boda (Teorijska)
Kategorija	Uzorak	Primjer iz tvojih pitanja
Definicija pojmova	"Koja je veza između X i Y?"	JRE vs JDK
Hijerarhija klasa	"Koje klase/iznimke nasljeđuje X?"	ArrayIndexOutOfBoundsException hijerarhija
Modifikatori pristupa	"Što vrijedi za članove s modifikatorom X?"	protected pristup
Svojstva entiteta	"Što vrijedi i za X i za Y?"	Sučelja vs apstraktne klase
Ograničenja	"Što od navedenog NE vrijedi za X?"	Apstraktne klase ograničenja
Funkcionalna sučelja	"Koje sučelje vraća tip X?"	Supplier, Function, Predicate
Ključne karakteristike 2-bodnih pitanja:

Testiraju poznavanje definicija i terminologije
Traže razumijevanje hijerarhije (nasljeđivanje)
Ispituju modifikatore i njihova značenja
Često imaju više točnih odgovora
Ne zahtijevaju čitanje koda
DIO 2: Pitanja za 3 boda (Programska/Problem-solving)
Kategorija	Uzorak	Primjer
Što će ispisati kod?	Daje se kompletan kod s Comparator/Stream	TreeSet + Comparator ispis
Pronađi pogrešku	Kod s namjernom greškom	Object comparison s ==
Što nedostaje?	Nepotpun kod	Stream reduce operacija
Što treba ispraviti?	Kod s greškom kompilacije	Generic klasa s extends
Što će se dogoditi?	Scenarij s try-catch-finally	Beskonačna petlja, iznimke
Koja naredba?	Traži točnu lambda/stream sintaksu	min/max s Comparator
Ključne karakteristike 3-bodnih pitanja:

Zahtijevaju čitanje i razumijevanje koda
Testiraju predviđanje ponašanja programa
Ispituju poznavanje API-ja (Stream, Collections)
Traže pronalaženje grešaka u logici ili sintaksi
Često uključuju try-catch-finally, Comparator, ili Generics
TEMPLATE ZA GENERIRANJE PITANJA
TEMPLATE A: Pitanja za 2 boda (Teorijska)
=== TEMPLATE A1: Definicija i Veza ===
PITANJE: Koja je veza između [POJAM_1] i [POJAM_2]?

STRUKTURA ODGOVORA:
A) [POJAM_1] sadrži [POJAM_2] - točno/netočno
B) [POJAM_2] sadrži [POJAM_1] - točno/netočno  
C) [NETOČNA_VEZA_1]
D) [NETOČNA_VEZA_2]
E) [BESMISLENA_OPCIJA]
F) Ništa od navedenog

PRIMJER TEME: Virtual Threads vs Platform Threads
=== TEMPLATE A2: Hijerarhija Nasljeđivanja ===
PITANJE: Koje klase/sučelja nasljeđuje izravno ili neizravno [KLASA/SUČELJE]?

STRUKTURA ODGOVORA (više točnih):
A) [DIREKTNI_RODITELJ] - točno
B) [INDIREKTNI_RODITELJ] - točno
C) [KLASA_IZ_DRUGE_GRANE] - netočno
D) [KORIJENSKA_KLASA] - točno
E) [NEPOVEZANA_KLASA] - netočno
F) Sve od navedenog

PRIMJER TEME: SequencedCollection hijerarhija
=== TEMPLATE A3: Modifikatori i Pristup ===
PITANJE: Ako se kod definiranja članova klase navede modifikator [MODIFIKATOR], 
što od navedenog vrijedi za te članove?

STRUKTURA ODGOVORA:
A) Pristup iz [LOKACIJA_1]
B) Pristup iz [LOKACIJA_2] 
C) Pristup iz [LOKACIJA_3]
D) Pristup iz svih klasa
E) Pristup samo iz klase u kojoj su definirani
F) [KRIVO_TUMAČENJE]

PRIMJER TEME: sealed klase i permits
=== TEMPLATE A4: Usporedba Entiteta ===
PITANJE: Što od navedenog vrijedi i za [ENTITET_1] i za [ENTITET_2]?

STRUKTURA ODGOVORA (više točnih):
A) Mogu sadržavati [ZNAČAJKA_1]
B) Mogu sadržavati [ZNAČAJKA_2]
C) Mogu [AKCIJA_1]
D) Mogu [AKCIJA_2]
E) [ZNAČAJKA_SAMO_ZA_JEDAN]
F) Sve od navedenog

PRIMJER TEME: Records vs Sealed Classes
=== TEMPLATE A5: Funkcionalna Sučelja ===
PITANJE: Koja funkcionalna sučelja [VRAĆAJU/PRIMAJU] [TIP]?

STRUKTURA ODGOVORA (više točnih):
A) Predicate<T>
B) Function<T, R>
C) Consumer<T>
D) Supplier<T>
E) UnaryOperator<T>
F) BinaryOperator<T>

PRIMJER TEME: Gatherers API funkcionalna sučelja
=== TEMPLATE A6: Ograničenja ===
PITANJE: Što od navedenog NE vrijedi za [KONCEPT]?

STRUKTURA ODGOVORA:
A) [ISTINA_1]
B) [ISTINA_2]
C) [ISTINA_3]
D) [LAŽ - TOČAN ODGOVOR]
E) [ISTINA_4]
F) [ISTINA_5]

PRIMJER TEME: Pattern Matching ograničenja
TEMPLATE B: Pitanja za 3 boda (Programska)
=== TEMPLATE B1: Što Će Ispisati Kod ===
PITANJE: Što će ispisati sljedeći programski odsječak?

STRUKTURA KODA:
- Klasa s atributima i konstruktorom
- Main metoda s kolekcijom (TreeSet/List)
- Comparator ili Stream operacija
- For petlja s ispisom

STRUKTURA ODGOVORA:
A) [ISPIS_ASC]
B) [ISPIS_DESC]
C) [ISPIS_S_DUPLIKATIMA]
D) [ISPIS_BEZ_JEDNOG]
E) Pogreška u programu
F) Ništa od navedenog

VARIJABLE:
- Tip kolekcije: TreeSet, ArrayList, LinkedList
- Kriterij sortiranja: datum, cijena, ime
- Broj elemenata: 3-4
=== TEMPLATE B2: Pronađi Pogrešku ===
PITANJE: Pronađite pogrešku u sljedećoj metodi za [OPIS_FUNKCIJE]:

STRUKTURA KODA:
- Metoda s jasnom namjenom
- Jedna logička ili sintaksna greška
- Greška mora biti suptilna ali jasna

TIPOVI GREŠAKA:
- == umjesto .equals() za objekte
- Nedostaje .get() kod Optional
- Krivi redoslijed parametara
- Nedostaje break u switch
- Krivi tip povratne vrijednosti

STRUKTURA ODGOVORA:
A) [KRIVO_OBJAŠNJENJE_1]
B) [KRIVO_OBJAŠNJENJE_2]
C) [TOČNO_OBJAŠNJENJE]
D) [KRIVO_OBJAŠNJENJE_3]
E) [KRIVO_OBJAŠNJENJE_4]
F) Nema pogreške
=== TEMPLATE B3: Što Nedostaje ===
PITANJE: Što je potrebno ubaciti na mjesto označeno s "??" kako bi se [OPIS_FUNKCIJE]?

STRUKTURA KODA:
- Stream operacija s prazninom
- Lambda izraz s nedostajućim dijelom
- Reduce/collect/map operacija

STRUKTURA ODGOVORA:
A) .reduce([KRIVO_1])
B) .reduce([KRIVO_2])
C) .reduce([TOČNO])
D) .forEach([KRIVO])
E) .collect([KRIVO])
F) Ništa od navedenog
=== TEMPLATE B4: Ispravak Klase ===
PITANJE: Što se treba ispraviti u klasi [IME] da se mogla prevesti?

STRUKTURA KODA:
- Generic klasa s greškom
- Sealed klasa s krivim permits
- Record s krivom sintaksom

TIPOVI GREŠAKA:
- <T extends X> unutar tijela umjesto samo u deklaraciji
- Nedostaje permits
- Krivi modifikator konstruktora

STRUKTURA ODGOVORA:
A) Mora sadržavati [X]
B) Mora implementirati [Y]
C) Ne smije koristiti [Z]
D) Nema pogreške
E) Mora imati konstruktor
F) [KRIVO_OBJAŠNJENJE]
=== TEMPLATE B5: Što Se Događa ===
PITANJE: Što vraća/se događa ako [SCENARIJ]?

STRUKTURA KODA:
- Try-catch-finally blok
- Petlja s continue/break
- Rekurzija s greškom

SCENARIJI:
- Unos neispravnih podataka
- Beskonačna petlja
- Stack overflow
- Null pointer

STRUKTURA ODGOVORA:
A) Iznimka [X] i prekid
B) Iznimka [Y] i prekid
C) Beskonačna petlja
D) Vraća [VRIJEDNOST]
E) NullPointerException
F) ArrayIndexOutOfBoundsException
=== TEMPLATE B6: Točna Naredba ===
PITANJE: Pomoću koje naredbe je moguće [OPIS_OPERACIJE]?

STRUKTURA KODA:
- Stream operacije
- Optional handling
- Comparator sintaksa

STRUKTURA ODGOVORA:
A) .stream().min(...) - bez .get()
B) .stream().min(...).get() - s .get()
C) .stream().max(...) - obrnuti comparator
D) .stream().sorted(...) - bez terminalne operacije
E) .stream().max(...).get() - točan odgovor
F) .stream().filter(...) - kriva operacija
KAKO KORISTITI TEMPLATE
Korak 1: Odaberi temu iz Java 25
Primjer: "Virtual Threads", "Pattern Matching for switch", "Record Patterns", "Sequenced Collections"

Korak 2: Odaberi template
Za teorijsko pitanje → Template A1-A6
Za programsko pitanje → Template B1-B6

Korak 3: Popuni varijable
Zamijeni [PLACEHOLDER] s konkretnim pojmovima iz teme

Korak 4: Kreiraj distraktore
1 točan odgovor (ili više za višestruki izbor)
2-3 slična ali netočna odgovora
1-2 očito netočna odgovora
Opcija "Ništa od navedenog" ili "Sve od navedenog"
PRIMJER GENERIRANJA PITANJA
Tema: Sequenced Collections (Java 21+)

Korišten template: A2 (Hijerarhija)

Generirano pitanje:

Koje sučelje izravno nasljeđuje sučelje SequencedSet?

A) Set B) SequencedCollection
C) Collection D) SortedSet E) Iterable F) Sve od navedenog

Točan odgovor: B (SequencedCollection) i A (Set)

Želiš li da ti generiram konkretna pitanja za neku specifičnu temu iz Jave 25? Mogu istražiti najnovije značajke i kreirati pitanja prema ovom template-u.



How can I help you today?

Session limit reached ∙ resets 4:00 AM
Subscribe to Max
Trebam pitanja iz sljedecih temi, ta pitanja moraju biti u ovom stilu i moram ih moci staviti u seeder za bazu. 
Evo templatea za seeder za bazu

Here are the lectures. I need all this in Croatian






import { QuestionType, Difficulty } from '@prisma/client' export const oopConceptsQuestions = { lectureSlug: 'oop-concepts', questions: [ // Nasljeđivanje { type: 'SINGLE_CHOICE' as QuestionType, prompt: 'Koja ključna riječ se koristi za nasljeđivanje klase u Javi?',

pasted



// Lectures based on Themes.md const lectures = [ { title: 'Klase i objekti', slug: 'classes-and-objects', order: 1, description: 'Osnove objektno orijentiranog programiranja u Javi - klase, objekti, konstruktori i životni ciklus objekata.', content: `# Klase i objekti

pasted



11.96 KB •466 lines
•
Formatting may be inconsistent from source
// Lectures based on Themes.md
const lectures = [
  {
    title: 'Klase i objekti',
    slug: 'classes-and-objects',
    order: 1,
    description: 'Osnove objektno orijentiranog programiranja u Javi - klase, objekti, konstruktori i životni ciklus objekata.',
    content: `# Klase i objekti

## Što je klasa, što je objekt
- Klasa je nacrt/šablona za objekte
- Objekt je instanca klase

## Polja i metode
- Polja (field) čuvaju stanje objekta
- Metode definiraju ponašanje objekta

## Konstruktor(i) & overloading
- Konstruktor inicijalizira objekt
- Overloading omogućuje više konstruktora s različitim parametrima

## this
- Referenca na trenutni objekt
- Koristi se za razlikovanje parametara od polja

## static polja/metode
- Pripadaju klasi, ne objektu
- Pozivaju se preko imena klase

## Statički inicijalizatori
- Blokovi koda koji se izvršavaju pri učitavanju klase

## Object lifecycle (stack, heap)
- Reference na stacku, objekti na heapu
- Garbage collection automatski oslobađa memoriju

## Reference vs vrijednosti
- Primitivni tipovi prenose se po vrijednosti
- Objekti se prenose po referenci

## Kapsulacija (getteri/setteri)
- Skrivanje implementacije
- Kontroliran pristup poljima`,
  },
  {
    title: 'OOP Koncepti',
    slug: 'oop-concepts',
    order: 2,
    description: 'Nasljeđivanje, polimorfizam, apstraktne klase, sučelja i modifikatori pristupa.',
    content: `# OOP Koncepti

## Nasljeđivanje
- extends ključna riječ
- Podklasa nasljeđuje od nadklase
- Java podržava samo jednostruko nasljeđivanje klasa

## Overriding i overloading
- Override: redefiniranje metode u podklasi
- Overload: više metoda istog imena s različitim parametrima

## Polimorfizam
- Mogućnost objekta da se ponaša kao njegov nadtip
- Runtime polimorfizam kroz nasljeđivanje

## Apstraktne klase
- abstract ključna riječ
- Ne mogu se instancirati
- Mogu sadržavati apstraktne metode

## Sučelja (interface)
- Definiraju ugovor
- Klasa može implementirati više sučelja
- Od Java 8: default i static metode

## final klasa, metoda, varijabla
- final klasa: ne može se nasljeđivati
- final metoda: ne može se override-ati
- final varijabla: konstanta

## Access modifikatori
- public: svugdje dostupno
- private: samo unutar klase
- protected: paket + podklase
- default: samo unutar paketa

## super ključna riječ
- Pristup članovima nadklase
- Poziv konstruktora nadklase`,
  },
  {
    title: 'Iznimke (Exceptions)',
    slug: 'exceptions',
    order: 3,
    description: 'Rukovanje iznimkama, checked i unchecked exceptions, try-catch-finally.',
    content: `# Iznimke (Exceptions)

## Checked vs unchecked exceptions
- Checked: moraju se hvatati ili propagirati (IOException, SQLException)
- Unchecked: RuntimeException i podklase (NullPointerException)

## Exception hijerarhija
- Throwable
  - Error (ozbiljne greške, ne hvataju se)
  - Exception
    - RuntimeException (unchecked)
    - Ostale (checked)

## try / catch / finally
- try: blok koda koji može baciti iznimku
- catch: hvata i obrađuje iznimku
- finally: uvijek se izvršava

## throw i throws
- throw: baca iznimku
- throws: deklarira da metoda može baciti iznimku

## Custom exceptions
- Kreiranje vlastitih iznimaka nasljeđivanjem Exception ili RuntimeException

## Multi-catch (Java 7+)
- catch (IOException | SQLException e)

## try-with-resources (Java 7+)
- Automatsko zatvaranje resursa
- try (Resource r = new Resource()) { }

## Tipične iznimke
- NullPointerException
- ArrayIndexOutOfBoundsException
- IllegalArgumentException
- NumberFormatException`,
  },
  {
    title: 'Javadoc',
    slug: 'javadoc',
    order: 4,
    description: 'Dokumentiranje Java koda pomoću Javadoc komentara i tagova.',
    content: `# Javadoc

## /** ... */ komentari
- Javadoc komentari počinju s /** i završavaju s */
- Pišu se iznad klasa, metoda, polja

## Javadoc tagovi
- @param: opis parametra
- @return: opis povratne vrijednosti
- @throws / @exception: iznimke koje metoda može baciti
- @author: autor klase
- @version: verzija
- @see: referenca na druge klase/metode
- @since: od koje verzije postoji
- @deprecated: označava zastarjele elemente

## Dokumentiranje klasa
- Opis namjene klase
- Primjeri korištenja

## Dokumentiranje metoda
- Opis što metoda radi
- Opis svih parametara
- Opis povratne vrijednosti
- Popis iznimaka

## Generiranje dokumentacije
- javadoc -d docs *.java
- HTML format`,
  },
  {
    title: 'Kolekcije (Java Collections Framework)',
    slug: 'collections',
    order: 5,
    description: 'List, Set, Map sučelja i njihove implementacije, iteratori i sortiranje.',
    content: `# Kolekcije

## Osnovne kolekcije
- Collection sučelje: korijen hijerarhije
- List: uređena kolekcija s duplikatima
- Set: bez duplikata
- Map: parovi ključ-vrijednost

## List implementacije
- ArrayList: dinamički niz, brz random access
- LinkedList: dvostruko povezana lista, brzo ubacivanje/brisanje

## Set implementacije
- HashSet: bez redoslijeda, O(1) operacije
- TreeSet: sortirano, O(log n) operacije
- LinkedHashSet: čuva redoslijed unosa

## Map implementacije
- HashMap: najčešće korištena
- TreeMap: sortirano po ključu
- LinkedHashMap: čuva redoslijed unosa

## Iteratori
- Iterator sučelje: hasNext(), next(), remove()
- Fail-fast iteratori: bace ConcurrentModificationException

## Comparator sučelje
- compare(o1, o2) metoda
- Lambda izrazi za komparatore
- Comparator.comparing() metoda

## Sortiranje
- Collections.sort()
- List.sort()
- Stream.sorted()`,
  },
  {
    title: 'Generici (Generics)',
    slug: 'generics',
    order: 6,
    description: 'Generičko programiranje, type parameters, bounded types i wildcards.',
    content: `# Generici

## Što su generici
- Omogućuju type-safe kod
- Izbjegavanje castanja
- Parametrizirani tipovi

## Generic klase
- class Box<T> { T item; }
- Višestruki type parametri: <K, V>

## Generic metode
- <T> T doSomething(T input)
- Type inference

## Bounded types
- <T extends Number> - gornja granica
- <T super Integer> - donja granica
- <T extends Comparable<T>> - za usporedive tipove

## Wildcards
- <?> - nepoznati tip
- <? extends X> - bilo koji podtip od X
- <? super X> - bilo koji nadtip od X

## Type erasure
- Generički tipovi se brišu pri kompilaciji
- Zamjenjuju se s Object ili gornjom granicom

## Ograničenja generika
- Ne mogu se koristiti s primitivnim tipovima
- Ne mogu se kreirati nizovi generičkih tipova
- Ne može se koristiti instanceof s generičkim tipovima`,
  },
  {
    title: 'Lambda izrazi',
    slug: 'lambda-expressions',
    order: 7,
    description: 'Funkcionalno programiranje u Javi, lambda izrazi i funkcionalna sučelja.',
    content: `# Lambda izrazi

## Sintaksa
- (parametri) -> izraz
- (parametri) -> { blok koda }
- Inference tipova parametara

## Funkcionalna sučelja
- Sučelje s jednom apstraktnom metodom
- @FunctionalInterface anotacija
- Predicate<T>: test(T) -> boolean
- Function<T,R>: apply(T) -> R
- Consumer<T>: accept(T) -> void
- Supplier<T>: get() -> T
- Comparator<T>: compare(T,T) -> int

## Method references
- Referenca na postojeću metodu
- ClassName::methodName
- object::methodName
- ClassName::new (konstruktor)

## Lambda sa kolekcijama
- list.forEach(x -> System.out.println(x))
- list.removeIf(x -> x < 0)
- list.sort((a, b) -> a.compareTo(b))

## Comparator kombinacije
- Comparator.comparing(Person::getName)
- .thenComparing(Person::getAge)
- .reversed()`,
  },
  {
    title: 'Stream API',
    slug: 'stream-api',
    order: 8,
    description: 'Funkcionalno procesiranje kolekcija pomoću Stream API-ja.',
    content: `# Stream API

## Što je Stream
- Sekvenca elemenata za procesiranje
- Ne modificira izvornu kolekciju
- Lazy evaluation

## Kreiranje streama
- collection.stream()
- Arrays.stream(array)
- Stream.of(elements)
- Stream.generate(), Stream.iterate()

## Intermedijalne operacije
- filter(Predicate): filtriranje
- map(Function): transformacija
- flatMap(Function): spljoštavanje
- sorted(): sortiranje
- distinct(): uklanja duplikate
- limit(n), skip(n)
- peek(): debugging

## Terminalne operacije
- forEach(Consumer)
- collect(Collector)
- reduce(identity, accumulator)
- count(), min(), max()
- findFirst(), findAny()
- anyMatch(), allMatch(), noneMatch()

## Collectors
- toList(), toSet()
- toMap(keyMapper, valueMapper)
- groupingBy(), partitioningBy()
- joining()

## Paralelni streamovi
- parallelStream()
- Koristi ForkJoinPool`,
  },
  {
    title: 'Sortiranje (Sorting)',
    slug: 'sorting',
    order: 9,
    description: 'Različite metode sortiranja u Javi, Comparable i Comparator sučelja.',
    content: `# Sortiranje

## Comparable sučelje
- compareTo(T other) metoda
- Prirodni redoslijed elemenata
- Implementira sama klasa

## Comparator sučelje
- compare(T o1, T o2) metoda
- Eksterni komparator
- Više različitih sortiranja za istu klasu

## Collections.sort()
- sort(List<T> list) - koristi Comparable
- sort(List<T> list, Comparator<T> c)

## List.sort()
- list.sort(comparator)
- Od Java 8

## Arrays.sort()
- Za nizove
- Koristi dual-pivot Quicksort

## Stream.sorted()
- sorted() - prirodni redoslijed
- sorted(Comparator) - custom redoslijed

## Comparator metode (Java 8+)
- comparing(keyExtractor)
- thenComparing(keyExtractor)
- reversed()
- nullsFirst(), nullsLast()

## Primjer višestrukog sortiranja
Comparator<Person> comp = Comparator
    .comparing(Person::getLastName)
    .thenComparing(Person::getFirstName)
    .thenComparing(Person::getAge);`,
  },
  {
    title: 'Predviđanje ponašanja koda',
    slug: 'code-behavior',
    order: 10,
    description: 'Analiza Java koda - hoće li se kompilirati, baciti iznimku ili proizvesti određeni izlaz.',
    content: `# Predviđanje ponašanja koda

## Hoće li se kod kompajlirati?
- Provjera tipova
- Provjera sintakse
- Provjera access modifikatora

## Compile-time vs Runtime greške
- Compile-time: syntax errors, type mismatches
- Runtime: NullPointerException, ArrayIndexOutOfBoundsException

## Česte compile-time greške
- Missing semicolon
- Type mismatch
- Unreported exception must be caught or declared
- Cannot find symbol

## Česte runtime iznimke
- NullPointerException: pristup null referenci
- ArrayIndexOutOfBoundsException: neispravan indeks
- ClassCastException: neispravan cast
- NumberFormatException: neispravna konverzija stringa

## Edge-case situacije
- Null vrijednosti
- Prazne kolekcije
- Granične vrijednosti
- Integer overflow

## Evaluacija izraza
- Operator precedence
- Short-circuit evaluation
- Pre vs post increment`,
  },
  {
    title: 'Java osnove',
    slug: 'java-basics',
    order: 11,
    description: 'Osnovni koncepti Jave - tipovi podataka, operatori, kontrolne strukture.',
    content: `# Java osnove

## Tipovi podataka
- Primitivni: byte, short, int, long, float, double, boolean, char
- Referentni: klase, sučelja, nizovi

## Petlje
- for: for (int i = 0; i < n; i++)
- enhanced for: for (Type item : collection)
- while: while (condition)
- do-while: do { } while (condition)

## switch
- Traditional switch
- Switch expressions (Java 12+)
- Pattern matching (Java 17+)

## Scope pravila
- Block scope
- Method scope
- Class scope
- Shadowing

## Operatori
- Aritmetički: +, -, *, /, %
- Relacijski: ==, !=, <, >, <=, >=
- Logički: &&, ||, !
- Bitovni: &, |, ^, ~, <<, >>, >>>
- Assignment: =, +=, -=, *=, /=

## Pre- i post-increment
- ++i vs i++
- --i vs i--

## String manipulacija
- String je immutable
- StringBuilder za promjenjive stringove
- String metode: length(), charAt(), substring(), indexOf()

## Autoboxing i unboxing
- Automatska konverzija primitiv <-> wrapper
- Integer, Double, Boolean, Character...

## == vs .equals()
- == uspoređuje reference
- .equals() uspoređuje sadržaj`,
  },
]