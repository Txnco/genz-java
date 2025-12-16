import { PrismaClient, QuestionType, Difficulty } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { seedQuestions } from './seeds/seed-questions'

const prisma = new PrismaClient()

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
    title: 'Datoteke i direktoriji',
    slug: 'files-and-folders',
    order: 11,
    description: 'Osnove rada s datotekama i direktorijima u Javi.',
    content: `# Datoteke i direktoriji

## Što je datoteka, što je direktorij
- Datoteka je zapamćeni skup podataka
- Direktorij je mapa za pohranu datoteka

## Paths
- Relative path: relativna putanja
- Absolute path: apsolutna putanja`,
  },
  {
    title: 'JavaFX',
    slug: 'javafx',
    order: 12,
    description: 'JavaFX - uvod u izradu GUI aplikacija u Javi koristeći JavaFX framework.',
    content: `# JavaFX
    
## Uvod u JavaFX
- Što je JavaFX
- Prednosti korištenja JavaFX-a za GUI aplikacije`,
  },
  //   {
  //     title: 'Java osnove',
  //     slug: 'java-basics',
  //     order: 11,
  //     description: 'Osnovni koncepti Jave - tipovi podataka, operatori, kontrolne strukture.',
  //     content: `# Java osnove

  // ## Tipovi podataka
  // - Primitivni: byte, short, int, long, float, double, boolean, char
  // - Referentni: klase, sučelja, nizovi

  // ## Petlje
  // - for: for (int i = 0; i < n; i++)
  // - enhanced for: for (Type item : collection)
  // - while: while (condition)
  // - do-while: do { } while (condition)

  // ## switch
  // - Traditional switch
  // - Switch expressions (Java 12+)
  // - Pattern matching (Java 17+)

  // ## Scope pravila
  // - Block scope
  // - Method scope
  // - Class scope
  // - Shadowing

  // ## Operatori
  // - Aritmetički: +, -, *, /, %
  // - Relacijski: ==, !=, <, >, <=, >=
  // - Logički: &&, ||, !
  // - Bitovni: &, |, ^, ~, <<, >>, >>>
  // - Assignment: =, +=, -=, *=, /=

  // ## Pre- i post-increment
  // - ++i vs i++
  // - --i vs i--

  // ## String manipulacija
  // - String je immutable
  // - StringBuilder za promjenjive stringove
  // - String metode: length(), charAt(), substring(), indexOf()

  // ## Autoboxing i unboxing
  // - Automatska konverzija primitiv <-> wrapper
  // - Integer, Double, Boolean, Character...

  // ## == vs .equals()
  // - == uspoređuje reference
  // - .equals() uspoređuje sadržaj`,
  //   },
]


async function main() {
  console.log('Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('Created admin user:', admin.email)

  // Create test student
  const studentPassword = await bcrypt.hash('student123', 12)
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Test Student',
      passwordHash: studentPassword,
      role: 'STUDENT',
    },
  })
  console.log('Created student user:', student.email)

  // Create lectures
  for (const lectureData of lectures) {
    const lecture = await prisma.lecture.upsert({
      where: { slug: lectureData.slug },
      update: {
        title: lectureData.title,
        description: lectureData.description,
        order: lectureData.order,
        content: lectureData.content,
      },
      create: lectureData,
    })
    console.log('Created lecture:', lecture.title)
  }

  // Seed questions from separate seeder modules
  await seedQuestions()

  console.log('Seeding complete!')
  console.log('')
  console.log('Test accounts:')
  console.log('  Admin: admin@example.com / admin123')
  console.log('  Student: student@example.com / student123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
