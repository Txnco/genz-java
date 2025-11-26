import { QuestionType, Difficulty } from '@prisma/client'

export const codeBehaviorQuestions = {
  lectureSlug: 'code-behavior',
  questions:[
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka postoji u sljedećem kodu s generičkim metodama i bounded types?",
    "codeSnippet": "public class Calculator {\n    public static <T extends Number> T maximum(T x, T y) {\n        if (x.compareTo(y) > 0) {\n            return x;\n        }\n        return y;\n    }\n    \n    public static void main(String[] args) {\n        Integer max1 = maximum(10, 20);\n        Double max2 = maximum(10.5, 20.5);\n        Number max3 = maximum(10, 20.5);\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) GLAVNA GREŠKA: T extends Number ne znači da T implementira Comparable! Number KLASA ne implementira Comparable, pa x.compareTo(y) neće raditi. Trebalo bi: <T extends Number & Comparable<T>>. (2) DRUGA GREŠKA: maximum(10, 20.5) pokušava miješati Integer i Double tipove - Java ne može zaključiti zajednički tip jer metoda zahtijeva da oba parametra budu istog tipa T. Kompajler će javiti grešku 'no suitable method found'. max1 i max2 su OK jer koriste isti tip.",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - Number ne implementira Comparable i ne mogu se miješati Integer i Double", "isCorrect": true },
      { "text": "1 greška - samo Number ne implementira Comparable", "isCorrect": false },
      { "text": "0 grešaka - kod će se kompilirati", "isCorrect": false },
      { "text": "3 greške - sve tri linije u main() su pogrešne", "isCorrect": false },
      { "text": "1 greška - samo miješanje Integer i Double", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Type Erasure i generičkim poljima?",
    "codeSnippet": "public class Container<T> {\n    private T[] items;\n    \n    public Container(int size) {\n        items = (T[]) new Object[size];\n    }\n    \n    public void set(int index, T item) {\n        items[index] = item;\n    }\n    \n    public T get(int index) {\n        return items[index];\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Container<String> container = new Container<>(3);\n        container.set(0, \"Java\");\n        container.set(1, \"Generics\");\n        String value = container.get(0);\n        System.out.println(value);\n    }\n}",
    "explanation": "Kod će se kompilirati s UPOZORENJIMA (unchecked cast) ali će baciti ClassCastException u runtime-u! Problem: items = (T[]) new Object[size] kreira Object[] koji se UNSAFE castuje u T[]. Type erasure pretvara T u Object. Kada set() sprema String, interno sprema u Object[]. Ali get() pokušava vratiti String, što RADI jer je stvarno String. Međutim, ako pokušamo: String[] arr = container.items, dobili bismo ClassCastException jer items je zapravo Object[], ne String[]. U ovom specifičnom slučaju KOD RADI i ispisuje 'Java', ali JE OPASAN i može pući u drugim scenarijima. VAŽNO: Ne možemo kreirati new T[] zbog type erasure!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ispisuje 'Java' ali kompajler daje unchecked warning - opasan kod", "isCorrect": true },
      { "text": "Neće se kompilirati - ne može se kreirati generički array", "isCorrect": false },
      { "text": "Baca ClassCastException u runtime-u", "isCorrect": false },
      { "text": "Ispisuje 'Java' bez problema", "isCorrect": false },
      { "text": "Ispisuje null", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s wildcards i PECS pravilom?",
    "codeSnippet": "public class WildcardTest {\n    public static void copy(List<? super Integer> dest, \n                           List<? extends Integer> src) {\n        for (Integer num : src) {\n            dest.add(num);\n        }\n    }\n    \n    public static void main(String[] args) {\n        List<Integer> source = List.of(1, 2, 3);\n        List<Number> destination = new ArrayList<>();\n        \n        copy(destination, source);\n        \n        Integer first = destination.get(0);\n        System.out.println(first);\n    }\n}",
    "explanation": "Kod ima 1 GREŠKU: destination.get(0) vraća Number (jer je lista List<Number>), a pokušavamo ga spremiti u Integer. Kompajler će javiti grešku 'incompatible types: Number cannot be converted to Integer'. Rješenje: Number first = destination.get(0) ili Integer first = (Integer) destination.get(0). Sve ostalo je ISPRAVNO: copy() koristi PECS pravilno (Producer Extends, Consumer Super), List.of() je immutable ali čitamo samo iz nje (extends), ArrayList je mutable i pišemo u nju (super). PECS princip je pravilno primijenjen!",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - destination.get(0) vraća Number, ne Integer", "isCorrect": true },
      { "text": "0 grešaka - kod je ispravan", "isCorrect": false },
      { "text": "2 greške - wildcards su pogrešno korišteni", "isCorrect": false },
      { "text": "1 greška - List.of() je immutable i ne može se koristiti kao source", "isCorrect": false },
      { "text": "3 greške - cijeli kod je pogrešan", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s lambda izrazima i effectively final varijablama?",
    "codeSnippet": "public class LambdaTest {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add(\"Java\");\n        words.add(\"Lambda\");\n        words.add(\"Stream\");\n        \n        int length = 4;\n        \n        words.stream()\n             .filter(w -> w.length() > length)\n             .forEach(System.out::println);\n        \n        length = 5;\n        \n        words.stream()\n             .filter(w -> w.length() > length)\n             .forEach(System.out::println);\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Greška: 'Variable used in lambda expression should be final or effectively final'. Lambda izrazi mogu koristiti samo EFFECTIVELY FINAL varijable (varijable koje se ne mijenjaju nakon inicijalizacije). length se koristi u lambda izrazu .filter(w -> w.length() > length), a zatim se mijenja (length = 5), što krši pravilo. Kompajler detektira da length NIJE effectively final jer se mijenja. Rješenje: ne mijenjati length nakon što se koristi u lambdi, ili koristiti drugu varijablu (int length2 = 5). Effectively final je KRITIČAN koncept za lambde!",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - length nije effectively final", "isCorrect": true },
      { "text": "Ispisuje 'Lambda' i 'Stream', zatim samo 'Lambda'", "isCorrect": false },
      { "text": "Ispisuje 'Lambda' i 'Stream' dvaput", "isCorrect": false },
      { "text": "Ispisuje samo 'Stream'", "isCorrect": false },
      { "text": "Kompilira se ali baca runtime exception", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite sve greške u sljedećem kodu s Comparatorom i višekriterijskim sortiranjem:",
    "codeSnippet": "record Student(String name, int age, double grade) {}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Student> students = new ArrayList<>();\n        students.add(new Student(\"Ana\", 20, 4.5));\n        students.add(new Student(\"Marko\", 20, 4.8));\n        students.add(null);\n        students.add(new Student(\"Petra\", 22, 4.5));\n        \n        Comparator<Student> comp = Comparator\n            .comparing(Student::grade).reversed()\n            .thenComparing(Student::age)\n            .thenComparing(Student::name);\n        \n        Collections.sort(students, comp);\n        \n        students.forEach(System.out::println);\n    }\n}",
    "explanation": "Kod ima 1 KRITIČNU GREŠKU koja će baciti NullPointerException u runtime-u! Lista sadrži null element (students.add(null)), a Collections.sort() s Comparatorom ne može hendlati null vrijednosti jer Comparator poziva metode na objektima (Student::grade, Student::age, Student::name). Kada sort() pokuša usporediti null s drugim elementom, baca NullPointerException! Rješenje: (1) ukloniti null: students.removeIf(Objects::isNull), ili (2) koristiti nullsLast: Comparator.nullsLast(comp), ili (3) filtrirati prije sortiranja. Sve ostalo u kodu je ISPRAVNO: record je dobro korišten, Comparator sintaksa je točna, višekriterijsko sortiranje s reversed() je validno.",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - null element u listi baca NullPointerException", "isCorrect": true },
      { "text": "0 grešaka - kod će raditi ispravno", "isCorrect": false },
      { "text": "2 greške - reversed() ne može se kombinirati s thenComparing", "isCorrect": false },
      { "text": "1 greška - record ne može imati double polje", "isCorrect": false },
      { "text": "3 greške - Comparator sintaksa je potpuno pogrešna", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s flatMap i ugniježđenim streamovima?",
    "codeSnippet": "public class FlatMapTest {\n    public static void main(String[] args) {\n        List<List<Integer>> nestedList = List.of(\n            List.of(1, 2, 3),\n            List.of(),\n            List.of(4, 5),\n            null,\n            List.of(6)\n        );\n        \n        List<Integer> result = nestedList.stream()\n            .flatMap(list -> list.stream())\n            .filter(n -> n % 2 == 0)\n            .toList();\n        \n        System.out.println(result);\n    }\n}",
    "explanation": "Kod će baciti NullPointerException! Problem je u null elementu liste (četvrti element). flatMap(list -> list.stream()) pokušava pozvati .stream() na null objektu što uzrokuje NPE. flatMap NE hendla automatski null vrijednosti! Ako bi kod radio, rezultat bi trebao biti [2, 4, 6] (parni brojevi). Rješenje: filtrirati null-ove prije flatMap: .filter(Objects::nonNull).flatMap(list -> list.stream()). Prazna lista (List.of()) je OK - stream() vraća prazan stream. KLJUČNA LEKCIJA: flatMap ne preskače null-ove, mora se ručno hendlati!",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca NullPointerException - null element u listi", "isCorrect": true },
      { "text": "Ispisuje [2, 4, 6]", "isCorrect": false },
      { "text": "Ispisuje []", "isCorrect": false },
      { "text": "Neće se kompilirati - nested List nije dozvoljen", "isCorrect": false },
      { "text": "Ispisuje [null]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka postoji u sljedećem kodu s pattern matchingom i instanceof?",
    "codeSnippet": "interface Instrument {\n    void play();\n}\n\nclass Gitara implements Instrument {\n    public void play() { System.out.println(\"Gitara svira\"); }\n    public void tune() { System.out.println(\"Štimanje gitare\"); }\n}\n\npublic class Main {\n    public static void process(Object obj) {\n        if (obj instanceof Instrument instrument) {\n            instrument.play();\n        }\n        \n        if (obj instanceof Gitara gitara) {\n            gitara.tune();\n            instrument.play();\n        }\n    }\n    \n    public static void main(String[] args) {\n        process(new Gitara());\n    }\n}",
    "explanation": "Kod ima 1 GREŠKU: U drugom if bloku, pokušavamo koristiti varijablu 'instrument' koja je definirana u PRVOM if bloku. Pattern matching varijable imaju ograničen scope - 'instrument' postoji SAMO unutar prvog if bloka! Druga greška: 'cannot find symbol: variable instrument'. Rješenje: ili deklarirati instrument izvan if blokova, ili ponovno castati, ili pattern matching u drugom if-u ne koristi instrument iz prvog. Pattern matching SCOPE PRAVILO: varijabla postoji samo unutar bloka gdje je definirana! Kod bi trebao ispisati 'Gitara svira', 'Štimanje gitare', 'Gitara svira' da radi.",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - 'instrument' iz prvog if-a nije dostupna u drugom if-u", "isCorrect": true },
      { "text": "0 grešaka - pattern matching omogućava dijeljenje varijabli", "isCorrect": false },
      { "text": "2 greške - pattern matching ne radi s interface-ima", "isCorrect": false },
      { "text": "1 greška - ne može se koristiti Object kao parametar", "isCorrect": false },
      { "text": "3 greške - sav kod je pogrešan", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s reduce operacijom i identity elementom?",
    "codeSnippet": "public class ReduceTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(2, 3, 4);\n        \n        int result1 = numbers.stream()\n            .reduce(1, (a, b) -> a * b);\n        \n        int result2 = numbers.stream()\n            .reduce(0, (a, b) -> a * b);\n        \n        int result3 = numbers.stream()\n            .reduce(10, (a, b) -> a + b);\n        \n        System.out.println(result1 + \" \" + result2 + \" \" + result3);\n    }\n}",
    "explanation": "Ispisat će '24 0 19'. Objašnjenje: result1 = reduce(1, (a,b) -> a*b) množenje s identity=1: 1*2*3*4 = 24 (ISPRAVNO za množenje). result2 = reduce(0, (a,b) -> a*b) množenje s identity=0: 0*2*3*4 = 0 (POGREŠKA! Identity za množenje mora biti 1, ne 0). result3 = reduce(10, (a,b) -> a+b) zbrajanje s identity=10: 10+2+3+4 = 19 (OK, ali neobičan izbor identity-a, obično je 0). KLJUČNA LEKCIJA: Identity element mora biti neutralan za operaciju - za množenje 1 (x*1=x), za zbrajanje 0 (x+0=x). Krivi identity daje pogrešan rezultat!",
    "difficulty": "HARD",
    "options": [
      { "text": "24 0 19", "isCorrect": true },
      { "text": "24 24 19", "isCorrect": false },
      { "text": "24 0 9", "isCorrect": false },
      { "text": "1 0 10", "isCorrect": false },
      { "text": "Baca exception - krivi identity", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s custom iznimkama i try-catch blokovima:",
    "codeSnippet": "class InvalidAgeException extends Exception {\n    public InvalidAgeException(String message) {\n        super(message);\n    }\n}\n\nclass NegativeAgeException extends RuntimeException {\n    public NegativeAgeException(String message) {\n        super(message);\n    }\n}\n\npublic class AgeValidator {\n    public static void validate(int age) \n            throws InvalidAgeException {\n        if (age < 0) {\n            throw new NegativeAgeException(\"Dob ne može biti negativna\");\n        }\n        if (age > 150) {\n            throw new InvalidAgeException(\"Dob je prevelika\");\n        }\n    }\n    \n    public static void main(String[] args) {\n        try {\n            validate(-5);\n        } catch (InvalidAgeException e) {\n            System.out.println(\"Uhvaćena iznimka: \" + e.getMessage());\n        }\n    }\n}",
    "explanation": "Kod se KOMPILIRA ali NE hvata NegativeAgeException! Problem: NegativeAgeException je RuntimeException (unchecked), a hvatamo samo InvalidAgeException (checked). validate(-5) baca NegativeAgeException koja NIJE uhvaćena, program pada s neuhvaćenom iznimkom! VAŽNO: validate() deklarira throws InvalidAgeException, ali baca i NegativeAgeException (unchecked) koja se NE MORA deklarirati ali SE MOŽE dogoditi. Rješenje: dodati catch (NegativeAgeException e) ili catch (RuntimeException e) ili catch (Exception e). LEKCIJA: Checked vs Unchecked - RuntimeException ne mora biti u throws ali treba biti uhvaćena!",
    "difficulty": "HARD",
    "options": [
      { "text": "Program pada s neuhvaćenom NegativeAgeException - nije uhvaćena", "isCorrect": true },
      { "text": "Neće se kompilirati - NegativeAgeException nije u throws", "isCorrect": false },
      { "text": "Ispisuje 'Uhvaćena iznimka: Dob ne može biti negativna'", "isCorrect": false },
      { "text": "Neće se kompilirati - RuntimeException ne može se koristiti", "isCorrect": false },
      { "text": "Kod radi ispravno i hvata obje iznimke", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Builder patternom i immutability?",
    "codeSnippet": "public class Person {\n    private final String name;\n    private final int age;\n    private final List<String> hobbies;\n    \n    private Person(Builder builder) {\n        this.name = builder.name;\n        this.age = builder.age;\n        this.hobbies = builder.hobbies;\n    }\n    \n    public List<String> getHobbies() {\n        return hobbies;\n    }\n    \n    public static class Builder {\n        private String name;\n        private int age;\n        private List<String> hobbies = new ArrayList<>();\n        \n        public Builder name(String name) {\n            this.name = name;\n            return this;\n        }\n        \n        public Builder age(int age) {\n            this.age = age;\n            return this;\n        }\n        \n        public Builder addHobby(String hobby) {\n            hobbies.add(hobby);\n            return this;\n        }\n        \n        public Person build() {\n            return new Person(this);\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Person person = new Person.Builder()\n            .name(\"Ana\")\n            .age(25)\n            .addHobby(\"Reading\")\n            .build();\n        \n        person.getHobbies().add(\"Gaming\");\n        \n        System.out.println(person.getHobbies().size());\n    }\n}",
    "explanation": "Ispisat će '2' što pokazuje da Person NIJE stvarno immutable! Problem: getHobbies() vraća DIREKTNU referencu na mutable List. Iako su polja 'final', List se može modificirati izvana (person.getHobbies().add(\"Gaming\")). GREŠKA U DIZAJNU: Builder pattern ovdje KRIVO implementira immutability! Rješenje: (1) getHobbies() treba vratiti kopiju: return new ArrayList<>(hobbies), ili (2) vratiti immutable listu: return Collections.unmodifiableList(hobbies), ili (3) u konstruktoru kopirati listu: this.hobbies = new ArrayList<>(builder.hobbies). Final ne znači immutable za referentne tipove!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ispisuje '2' - objekt NIJE stvarno immutable, lista se može mijenjati", "isCorrect": true },
      { "text": "Baca UnsupportedOperationException - immutable objekt", "isCorrect": false },
      { "text": "Neće se kompilirati - final ne dopušta modifikacije", "isCorrect": false },
      { "text": "Ispisuje '1' - promjena nije pohranjena", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s paralelnim streamovima i side effects?",
    "codeSnippet": "public class ParallelTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = new ArrayList<>();\n        for (int i = 1; i <= 100; i++) {\n            numbers.add(i);\n        }\n        \n        List<Integer> evenNumbers = new ArrayList<>();\n        \n        numbers.parallelStream()\n               .filter(n -> n % 2 == 0)\n               .forEach(n -> evenNumbers.add(n));\n        \n        System.out.println(\"Veličina: \" + evenNumbers.size());\n        System.out.println(\"Prvih 5: \" + evenNumbers.subList(0, 5));\n    }\n}",
    "explanation": "Kod ima OZBILJNU GREŠKU: RACE CONDITION! ArrayList NIJE thread-safe, a forEach s parallelStream() izvršava se na više threadova istovremeno. evenNumbers.add(n) iz različitih threadova može uzrokovati: (1) ConcurrentModificationException, (2) izgubljene podatke (size < 50 koji bi trebalo biti), (3) ArrayIndexOutOfBoundsException. Kod se MOŽE kompilirati i možda čak raditi, ali rezultat je NEPREDVIDIV! SIDE EFFECT u lambdi + paralelizam = OPASNO! Rješenje: (1) koristiti .collect(Collectors.toList()) umjesto forEach+add, ili (2) Collections.synchronizedList(new ArrayList<>()), ili (3) ConcurrentHashMap. Ovo je KLASIČNA greška kod paralelnih streamova!",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - race condition, ArrayList nije thread-safe za parallelStream", "isCorrect": true },
      { "text": "0 grešaka - kod će raditi ispravno", "isCorrect": false },
      { "text": "2 greške - parallelStream ne može se koristiti s filter", "isCorrect": false },
      { "text": "1 greška - subList ne radi s paralelnim streamovima", "isCorrect": false },
      { "text": "Neće se kompilirati - side effects nisu dozvoljeni", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Optional i orElse vs orElseGet?",
    "codeSnippet": "public class OptionalTest {\n    private static int counter = 0;\n    \n    private static String getDefaultValue() {\n        counter++;\n        System.out.println(\"getDefaultValue pozvan, counter=\" + counter);\n        return \"Default\";\n    }\n    \n    public static void main(String[] args) {\n        Optional<String> opt1 = Optional.of(\"Java\");\n        Optional<String> opt2 = Optional.empty();\n        \n        String result1 = opt1.orElse(getDefaultValue());\n        String result2 = opt2.orElse(getDefaultValue());\n        \n        counter = 0;\n        \n        String result3 = opt1.orElseGet(() -> getDefaultValue());\n        String result4 = opt2.orElseGet(() -> getDefaultValue());\n        \n        System.out.println(\"Rezultati: \" + result1 + \", \" + result2 + \", \" + result3 + \", \" + result4);\n    }\n}",
    "explanation": "Ispisat će: 'getDefaultValue pozvan, counter=1' (za opt1.orElse), 'getDefaultValue pozvan, counter=2' (za opt2.orElse), 'getDefaultValue pozvan, counter=1' (za opt2.orElseGet), 'Rezultati: Java, Default, Java, Default'. KLJUČNA RAZLIKA: orElse() UVIJEK evaluira argument (poziva getDefaultValue() čak i kada Optional NIJE prazan)! orElseGet() je LAZY - poziva Supplier SAMO ako je Optional prazan. opt1.orElse(getDefaultValue()) poziva funkciju nepotrebno jer opt1 nije prazan! opt1.orElseGet() NE poziva funkciju jer opt1 ima vrijednost. BEST PRACTICE: koristiti orElseGet() ako je default vrijednost skupo računanje!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ispisuje getDefaultValue 3 puta - orElse evaluira uvijek, orElseGet samo za empty", "isCorrect": true },
      { "text": "Ispisuje getDefaultValue 2 puta - samo za empty Optional", "isCorrect": false },
      { "text": "Ispisuje getDefaultValue 4 puta - svaki poziv evaluira", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može se koristiti metoda u orElse", "isCorrect": false },
      { "text": "Ispisuje samo rezultate bez poziva getDefaultValue", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite sve greške u sljedećem kodu s Stream API i Collectors.groupingBy:",
    "codeSnippet": "record Student(String name, int age, String major) {}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Student> students = List.of(\n            new Student(\"Ana\", 20, \"CS\"),\n            new Student(\"Marko\", 22, \"CS\"),\n            new Student(\"Petra\", 21, null),\n            new Student(\"Ivan\", 20, \"Math\")\n        );\n        \n        Map<String, List<Student>> byMajor = students.stream()\n            .collect(Collectors.groupingBy(Student::major));\n        \n        byMajor.forEach((major, list) -> \n            System.out.println(major + \": \" + list.size()));\n    }\n}",
    "explanation": "Kod će baciti NullPointerException! Problem: Petra ima major = null, a Collectors.groupingBy(Student::major) poziva major() na svakom studentu. groupingBy NE hendla automatski null vrijednosti! Kada pokuša grupirati Petru, Student::major vraća null, ali groupingBy pokušava koristiti null kao ključ u Map-i što uzrokuje NPE. Rješenje: (1) filtrirati null prije groupinga: .filter(s -> s.major() != null), ili (2) providati null-safe key mapper: .collect(Collectors.groupingBy(s -> s.major() == null ? \"Unknown\" : s.major())), ili (3) koristiti custom Collector koji hendla null. LEKCIJA: groupingBy i null vrijednosti ne idu zajedno!",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca NullPointerException - groupingBy ne hendla null vrijednosti", "isCorrect": true },
      { "text": "Ispisuje CS: 2, Math: 1, null: 1", "isCorrect": false },
      { "text": "Neće se kompilirati - null nije dozvoljen u record", "isCorrect": false },
      { "text": "Ispisuje sve bez Petre - automatski filtrira null", "isCorrect": false },
      { "text": "Baca IllegalArgumentException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s switch expression i yield?",
    "codeSnippet": "public class SwitchTest {\n    public static void main(String[] args) {\n        int day = 3;\n        \n        String result = switch (day) {\n            case 1, 2, 3, 4, 5 -> {\n                String type = \"Radni\";\n                yield type + \" dan\";\n            }\n            case 6, 7 -> \"Vikend\";\n            default -> {\n                System.out.println(\"Nepoznat dan\");\n                yield \"Greška\";\n            }\n        };\n        \n        System.out.println(result);\n        System.out.println(type);\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Greška: 'cannot find symbol: variable type'. Varijabla 'type' je deklarirana UNUTAR switch expression bloka (case 1-5) i ima scope samo unutar tog bloka! Pokušaj pristupa type izvan switcha je GREŠKA. Switch expression blok kreira lokalni scope, kao i svaki {} blok. Rješenje: deklarirati type izvan switcha ili ne pristupati mu izvan bloka. Također, println(\"Nepoznat dan\") u default se NE izvršava jer day=3 pada u case 1-5. Kod bi trebao ispisati samo 'Radni dan' da radi.",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - 'type' nije dostupna izvan switch bloka", "isCorrect": true },
      { "text": "Ispisuje 'Radni dan' i 'Radni'", "isCorrect": false },
      { "text": "Ispisuje samo 'Radni dan'", "isCorrect": false },
      { "text": "Baca RuntimeException - yield ne može biti u bloku s varijablama", "isCorrect": false },
      { "text": "Ispisuje 'Nepoznat dan' i 'Greška'", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s multiple bounds i type inference?",
    "codeSnippet": "interface Playable {\n    void play();\n}\n\ninterface Tuneable {\n    void tune();\n}\n\nclass Guitar implements Playable, Tuneable {\n    public void play() { System.out.println(\"Playing guitar\"); }\n    public void tune() { System.out.println(\"Tuning guitar\"); }\n}\n\npublic class MusicTest {\n    public static <T extends Playable & Tuneable> void prepare(T instrument) {\n        instrument.tune();\n        instrument.play();\n    }\n    \n    public static <T extends Tuneable & Playable> void practice(T instrument) {\n        instrument.play();\n        instrument.tune();\n    }\n    \n    public static void main(String[] args) {\n        Guitar guitar = new Guitar();\n        prepare(guitar);\n        practice(guitar);\n        \n        var auto = prepare(new Guitar());\n    }\n}",
    "explanation": "Kod ima 1 GREŠKU: var auto = prepare(new Guitar()) pokušava spremiti VOID u varijablu! prepare() metoda je void, ne vraća ništa, pa var ne može zaključiti tip (var ne može biti void). Kompajler će javiti grešku: 'cannot infer type for local variable auto (cannot use 'void' as an explicit type)'. Rješenje: ne koristiti var ili promijeniti prepare() da vraća T. Sve ostalo je ISPRAVNO: multiple bounds (<T extends Playable & Tuneable> i <T extends Tuneable & Playable>) su ISTOVJETNI - redoslijed interface-a u bounds NIJE BITAN (samo klasa mora biti prva ako postoji)!",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - var ne može zaključiti void tip", "isCorrect": true },
      { "text": "2 greške - redoslijed u multiple bounds mora biti isti", "isCorrect": false },
      { "text": "0 grešaka - kod je ispravan", "isCorrect": false },
      { "text": "1 greška - ne može se koristiti var s generičkim metodama", "isCorrect": false },
      { "text": "3 greške - multiple bounds sintaksa je pogrešna", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Comparator.nullsFirst i sortiranjem?",
    "codeSnippet": "public class NullSortTest {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add(\"Java\");\n        words.add(null);\n        words.add(\"Python\");\n        words.add(null);\n        words.add(\"C++\");\n        \n        words.sort(Comparator.nullsFirst(\n            Comparator.reverseOrder()\n        ));\n        \n        System.out.println(words);\n    }\n}",
    "explanation": "Ispisat će [null, null, Python, Java, C++]. Objašnjenje: Comparator.nullsFirst() stavlja null vrijednosti NA POČETAK. Comparator.reverseOrder() sortira non-null elemente u SILAZNOM (obrnutom) redoslijedu: Python > Java > C++ (leksikografski obrnut). Konačan rezultat: null-ovi prvo, zatim sortirano silazno. KLJUČNO: nullsFirst() wrappa drugi Comparator - null-ovi se izdvajaju prvo, PA ONDA se non-null elementi sortiraju prema wrappiranom Comparatoru. Za uzlazno s null-ovima na početku: nullsFirst(Comparator.naturalOrder()).",
    "difficulty": "HARD",
    "options": [
      { "text": "[null, null, Python, Java, C++]", "isCorrect": true },
      { "text": "[null, null, C++, Java, Python]", "isCorrect": false },
      { "text": "[C++, Java, Python, null, null]", "isCorrect": false },
      { "text": "Baca NullPointerException", "isCorrect": false },
      { "text": "[Java, Python, C++, null, null]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s lambda izrazima i method references:",
    "codeSnippet": "interface Processor<T> {\n    T process(T input);\n}\n\npublic class ProcessorTest {\n    public static String toUpperCase(String s) {\n        return s.toUpperCase();\n    }\n    \n    public String toLowerCasе(String s) {\n        return s.toLowerCase();\n    }\n    \n    public static void main(String[] args) {\n        Processor<String> p1 = ProcessorTest::toUpperCase;\n        Processor<String> p2 = ProcessorTest::toLowerCase;\n        Processor<String> p3 = String::toUpperCase;\n        \n        System.out.println(p1.process(\"java\"));\n        System.out.println(p2.process(\"JAVA\"));\n        System.out.println(p3.process(\"Java\"));\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) p2 = ProcessorTest::toLowerCase - toLowerCase() je INSTANCE metoda (nije static), pa ne može se koristiti s :: na klasu bez instance! Trebalo bi: new ProcessorTest()::toLowerCase ili promijeniti metodu u static. (2) p3 = String::toUpperCase - ovo IZGLEDA OK ali je POGREŠNO! String::toUpperCase je method reference za INSTANCE metodu, što odgovara Function<String, String> (prima String, vraća String), a Processor::process prima T i vraća T. String::toUpperCase tehnički RADI ovdje zbog slučajnog match-a, ali JE ZBUNJUJUĆE. Bolje bi bilo: s -> s.toUpperCase() ili provjeriti tipove.",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - toLowerCase nije static, String::toUpperCase je zbunjujući", "isCorrect": true },
      { "text": "1 greška - samo toLowerCase nije static", "isCorrect": false },
      { "text": "0 grešaka - svi method references su ispravni", "isCorrect": false },
      { "text": "3 greške - nijedan method reference ne radi", "isCorrect": false },
      { "text": "1 greška - Processor ne može koristiti method references", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.takeWhile i Stream.dropWhile (Java 9+)?",
    "codeSnippet": "public class TakeDropTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(2, 4, 6, 7, 8, 10, 12, 13);\n        \n        List<Integer> taken = numbers.stream()\n            .takeWhile(n -> n % 2 == 0)\n            .toList();\n        \n        List<Integer> dropped = numbers.stream()\n            .dropWhile(n -> n % 2 == 0)\n            .toList();\n        \n        System.out.println(\"Taken: \" + taken);\n        System.out.println(\"Dropped: \" + dropped);\n    }\n}",
    "explanation": "Ispisat će: 'Taken: [2, 4, 6]' i 'Dropped: [7, 8, 10, 12, 13]'. KLJUČNO: takeWhile() uzima elemente DOK JE predikat true, čim naiđe na false (7 je neparan) ZAUSTAVLJA SE i ne gleda dalje (8, 10, 12 su parni ali se ne uzimaju). dropWhile() preskače elemente DOK JE predikat true, čim naiđe na false (7) zadržava SVE OSTALE elemente uključujući 7 i dalje (čak i neparne 13). Razlika od filter: filter gleda SVE elemente, takeWhile/dropWhile zaustavljaju se nakon PRVOG nesklada. 8, 10, 12 se NE uzimaju u taken jer je 7 već zaustavila takeWhile!",
    "difficulty": "HARD",
    "options": [
      { "text": "Taken: [2, 4, 6], Dropped: [7, 8, 10, 12, 13]", "isCorrect": true },
      { "text": "Taken: [2, 4, 6, 8, 10, 12], Dropped: [7, 13]", "isCorrect": false },
      { "text": "Taken: [2, 4, 6], Dropped: [7, 13]", "isCorrect": false },
      { "text": "Neće se kompilirati - takeWhile ne postoji", "isCorrect": false },
      { "text": "Taken: [2, 4, 6, 8, 10, 12], Dropped: [7]", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s nasljeđivanjem, polimorfizmom i castovanjem?",
    "codeSnippet": "abstract class Instrument {\n    public abstract void play();\n}\n\nclass Guitar extends Instrument {\n    public void play() { System.out.println(\"Guitar plays\"); }\n    public void tune() { System.out.println(\"Tuning guitar\"); }\n}\n\nclass Piano extends Instrument {\n    public void play() { System.out.println(\"Piano plays\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Instrument inst1 = new Guitar();\n        Instrument inst2 = new Piano();\n        \n        inst1.play();\n        inst1.tune();\n        \n        Guitar guitar = (Guitar) inst1;\n        guitar.tune();\n        \n        Piano piano = (Piano) inst2;\n        piano.play();\n        \n        Guitar guitar2 = (Guitar) inst2;\n        guitar2.tune();\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) inst1.tune() - COMPILE ERROR! inst1 je tipa Instrument koji NEMA metodu tune(). Iako stvarni objekt je Guitar koji IMA tune(), kompajler gleda samo deklarirani tip (Instrument). Mora se castati prvo: ((Guitar) inst1).tune(). (2) Guitar guitar2 = (Guitar) inst2 - RUNTIME ERROR! inst2 je stvarno Piano objekt, ne može se castati u Guitar. Baca ClassCastException! Kod se NE kompilira zbog prve greške. Lekcija: Kompajler provjerava deklarirani tip, runtime provjerava stvarni tip. Castanje može proći kompilaciju ali pasti u runtime-u!",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - inst1.tune() compile error, (Guitar) inst2 ClassCastException", "isCorrect": true },
      { "text": "1 greška - samo inst1.tune() je problem", "isCorrect": false },
      { "text": "1 greška - samo castanje Piano u Guitar", "isCorrect": false },
      { "text": "0 grešaka - polimorfizam rješava sve", "isCorrect": false },
      { "text": "3 greške - svi castovi su pogrešni", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s IntStream i boxed operacijom?",
    "codeSnippet": "public class IntStreamTest {\n    public static void main(String[] args) {\n        List<Integer> result1 = IntStream.range(1, 5)\n            .boxed()\n            .toList();\n        \n        List<Integer> result2 = IntStream.rangeClosed(1, 5)\n            .boxed()\n            .toList();\n        \n        int sum1 = IntStream.range(1, 5).sum();\n        int sum2 = IntStream.rangeClosed(1, 5).sum();\n        \n        System.out.println(result1);\n        System.out.println(result2);\n        System.out.println(\"Sums: \" + sum1 + \", \" + sum2);\n    }\n}",
    "explanation": "Ispisat će: '[1, 2, 3, 4]', '[1, 2, 3, 4, 5]', 'Sums: 10, 15'. KLJUČNA RAZLIKA: range(1, 5) je EKSKLUZIVAN gornji limit (1,2,3,4 - bez 5!), rangeClosed(1, 5) je INKLUZIVAN gornji limit (1,2,3,4,5). boxed() pretvara IntStream u Stream<Integer> za toList(). sum1 = 1+2+3+4 = 10, sum2 = 1+2+3+4+5 = 15. Česta zamka: zaboraviti da range() NE uključuje gornju granicu! rangeClosed() je za [start, end], range() je za [start, end). boxed() je potreban jer toList() radi sa Stream<T>, ne IntStream!",
    "difficulty": "HARD",
    "options": [
      { "text": "[1, 2, 3, 4], [1, 2, 3, 4, 5], Sums: 10, 15", "isCorrect": true },
      { "text": "[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], Sums: 15, 15", "isCorrect": false },
      { "text": "[1, 2, 3, 4], [1, 2, 3, 4], Sums: 10, 10", "isCorrect": false },
      { "text": "Neće se kompilirati - boxed() ne postoji", "isCorrect": false },
      { "text": "[0, 1, 2, 3, 4], [0, 1, 2, 3, 4, 5], Sums: 10, 15", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s Scanner klasom i izuzecima:",
    "codeSnippet": "import java.util.Scanner;\nimport java.util.InputMismatchException;\n\npublic class ScannerTest {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        \n        try {\n            System.out.print(\"Unesite broj: \");\n            int number = scanner.nextInt();\n            \n            System.out.print(\"Unesite ime: \");\n            String name = scanner.nextLine();\n            \n            System.out.println(\"Broj: \" + number);\n            System.out.println(\"Ime: \" + name);\n            \n        } catch (InputMismatchException e) {\n            System.out.println(\"Neispravan unos!\");\n        }\n    }\n}",
    "explanation": "Kod ima 1 PROBLEM (ne tehnička greška ali BUG): nextInt() NE konzumira newline karakter (Enter)! Kada korisnik unese broj i pritisne Enter, nextInt() čita broj ali OSTAVLJA '\\n' u bufferu. nextLine() zatim čita taj '\\n' kao PRAZAN STRING umjesto čekanja korisničkog unosa! name će biti prazan. Rješenje: (1) dodati scanner.nextLine() nakon nextInt() da 'pojede' \\n, ili (2) koristiti scanner.nextLine() i ručno parsirati: Integer.parseInt(scanner.nextLine()). OVO JE KLASIČNA ZAMKA s Scanner-om! Također, scanner.close() nedostaje na kraju.",
    "difficulty": "HARD",
    "options": [
      { "text": "1 problem - nextInt() ne konzumira newline, nextLine() čita prazan string", "isCorrect": true },
      { "text": "0 grešaka - kod radi ispravno", "isCorrect": false },
      { "text": "2 greške - nextLine ne može slijediti nextInt", "isCorrect": false },
      { "text": "1 greška - InputMismatchException nije checked", "isCorrect": false },
      { "text": "Neće se kompilirati - Scanner mora biti u try-with-resources", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.binarySearch i sortiranjem?",
    "codeSnippet": "public class BinarySearchTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = new ArrayList<>();\n        numbers.add(5);\n        numbers.add(2);\n        numbers.add(8);\n        numbers.add(1);\n        numbers.add(9);\n        \n        int index1 = Collections.binarySearch(numbers, 8);\n        \n        Collections.sort(numbers);\n        \n        int index2 = Collections.binarySearch(numbers, 8);\n        int index3 = Collections.binarySearch(numbers, 6);\n        \n        System.out.println(index1 + \" \" + index2 + \" \" + index3);\n    }\n}",
    "explanation": "Ispisat će NEPREDVIDIV broj za index1 (npr. -4 ili drugi negativan broj), zatim '3 -4'. Objašnjenje: binarySearch() ZAHTIJEVA SORTIRANU listu! Ako lista NIJE sortirana, rezultat je UNDEFINED (nepredvidiv)! index1 koristi binarySearch na NESORTIRANOJ listi [5,2,8,1,9] - rezultat je nepredvidiv negativan broj. Nakon sortiranja: [1,2,5,8,9], index2 = 3 (8 je na indeksu 3). index3 = -4 jer 6 ne postoji - binarySearch vraća (-(insertion point) - 1) = -(4) - 1 = -4 (6 bi trebao biti na poziciji 3, pa -3-1=-4). LEKCIJA: UVIJEK sortirati prije binarySearch!",
    "difficulty": "HARD",
    "options": [
      { "text": "Nepredvidiv negativan broj, 3, -4 - lista mora biti sortirana za binarySearch", "isCorrect": true },
      { "text": "2, 3, -4", "isCorrect": false },
      { "text": "-1, 3, -1", "isCorrect": false },
      { "text": "Baca IllegalStateException - lista nije sortirana", "isCorrect": false },
      { "text": "Neće se kompilirati - binarySearch zahtijeva sortiranu listu", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s generičkim interfaceima i implementacijom?",
    "codeSnippet": "interface Container<T> {\n    void add(T item);\n    T get();\n}\n\nclass StringContainer implements Container<String> {\n    private String item;\n    \n    public void add(String item) {\n        this.item = item;\n    }\n    \n    public Object get() {\n        return item;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Container<String> container = new StringContainer();\n        container.add(\"Java\");\n        String value = container.get();\n        System.out.println(value);\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! Greška: public Object get() u StringContainer je POGREŠAN return tip! Interface deklarira T get() gdje je T = String, pa implementacija MORA biti public String get(), NE Object! Iako String extends Object (covariant return type je dozvoljen), ovdje T je zamijenjeno sa String u interface deklaraciji, pa return tip MORA biti String. Kompajler će javiti: 'StringContainer is not abstract and does not override abstract method get() in Container'. Rješenje: promijeniti return tip u String: public String get(). Type erasure pretvara T u Object, ali override metode moraju poštovati parameteriziran tip!",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - return tip get() mora biti String, ne Object", "isCorrect": true },
      { "text": "0 grešaka - Object je nadklasa String pa je OK", "isCorrect": false },
      { "text": "2 greške - add() i get() su pogrešni", "isCorrect": false },
      { "text": "1 greška - ne može se koristiti interface s generičkim tipom", "isCorrect": false },
      { "text": "Kompilira se ali baca ClassCastException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collectors.joining i String operacijama?",
    "codeSnippet": "public class JoiningTest {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"Java\", \"Lambda\", \"Stream\");\n        \n        String result1 = words.stream()\n            .collect(Collectors.joining());\n        \n        String result2 = words.stream()\n            .collect(Collectors.joining(\", \"));\n        \n        String result3 = words.stream()\n            .collect(Collectors.joining(\", \", \"[\", \"]\"));\n        \n        String result4 = words.stream()\n            .map(String::toUpperCase)\n            .collect(Collectors.joining(\"-\", \"Start:\", \":End\"));\n        \n        System.out.println(result1);\n        System.out.println(result2);\n        System.out.println(result3);\n        System.out.println(result4);\n    }\n}",
    "explanation": "Ispisat će: (1) 'JavaLambdaStream' - joining() bez argumenata spaja bez delimitera, (2) 'Java, Lambda, Stream' - delimiter je ', ', (3) '[Java, Lambda, Stream]' - delimiter ', ' + prefix '[' + suffix ']', (4) 'Start:JAVA-LAMBDA-STREAM:End' - map pretvara u uppercase, delimiter '-', prefix 'Start:', suffix ':End'. Collectors.joining() ima 3 overload-a: (), (delimiter), (delimiter, prefix, suffix). VAŽNO: prefix i suffix se dodaju SAMO AKO ima elemenata - za prazan stream vraća se PRAZAN string, ne 'prefix+suffix'! joining() je specifično za String Stream-ove.",
    "difficulty": "HARD",
    "options": [
      { "text": "JavaLambdaStream, Java, Lambda, Stream, [Java, Lambda, Stream], Start:JAVA-LAMBDA-STREAM:End", "isCorrect": true },
      { "text": "Java Lambda Stream, Java, Lambda, Stream, [Java, Lambda, Stream], JAVA-LAMBDA-STREAM", "isCorrect": false },
      { "text": "Neće se kompilirati - joining() zahtijeva delimiter", "isCorrect": false },
      { "text": "Sve opcije ispisuju 'Java, Lambda, Stream'", "isCorrect": false },
      { "text": "Baca IllegalArgumentException - prefix bez suffix", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s varargs i generičkim tipovima:",
    "codeSnippet": "public class VarargsTest {\n    public static <T> List<T> createList(T... elements) {\n        return Arrays.asList(elements);\n    }\n    \n    public static <T> void printAll(List<T>... lists) {\n        for (List<T> list : lists) {\n            System.out.println(list);\n        }\n    }\n    \n    public static void main(String[] args) {\n        List<String> list1 = createList(\"A\", \"B\", \"C\");\n        List<Integer> list2 = createList(1, 2, 3);\n        \n        printAll(list1, list2);\n    }\n}",
    "explanation": "Kod će dati UNCHECKED WARNING ali će se kompilirati! Problem: printAll(List<T>... lists) koristi varargs s generičkim tipom što je OPASNO zbog 'heap pollution'. printAll(list1, list2) poziva printAll s List<String> i List<Integer>, ali T mora biti ISTI TIP! Java će 'pokušati' zaključiti zajednički tip (vjerojatno Object), ali daje unchecked warning. Kod MOŽE raditi u runtime-u, ali je NEBEZBEDAN. Rješenje: koristiti @SafeVarargs anotaciju ako je metoda sigurna, ili izbjeći varargs s generičkim tipovima. createList je OK jer T ostaje konzistentan po pozivu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Unchecked warning - varargs s generičkim tipovima je opasno (heap pollution)", "isCorrect": true },
      { "text": "Neće se kompilirati - ne mogu se miješati List<String> i List<Integer>", "isCorrect": false },
      { "text": "0 problema - generički varargs su sigurni", "isCorrect": false },
      { "text": "Baca ClassCastException u runtime-u", "isCorrect": false },
      { "text": "2 greške - createList i printAll su pogrešni", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.distinct i custom objektima?",
    "codeSnippet": "class Person {\n    String name;\n    int age;\n    \n    Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public String toString() {\n        return name + \"(\" + age + \")\";\n    }\n}\n\npublic class DistinctTest {\n    public static void main(String[] args) {\n        List<Person> people = List.of(\n            new Person(\"Ana\", 20),\n            new Person(\"Ana\", 20),\n            new Person(\"Marko\", 22),\n            new Person(\"Ana\", 20)\n        );\n        \n        List<Person> distinct = people.stream()\n            .distinct()\n            .toList();\n        \n        System.out.println(distinct.size());\n    }\n}",
    "explanation": "Ispisat će '4' - SVI objekti ostaju jer Person NE nadjačava equals() i hashCode()! distinct() koristi equals() za provjeru duplikata. Person koristi defaultnu equals() iz Object klase koja uspoređuje REFERENCE, ne sadržaj! new Person(\"Ana\", 20) tri puta kreira 3 RAZLIČITA objekta (različite reference), pa distinct() ih smatra različitim. Rješenje: nadjačati equals() i hashCode() u Person klasi. Sa equals/hashCode bi distinct dala 2 (Ana(20) i Marko(22)). Record bi automatski implementirao equals/hashCode! LEKCIJA: distinct() = equals() + hashCode()!",
    "difficulty": "HARD",
    "options": [
      { "text": "4 - Person ne nadjačava equals/hashCode, distinct uspoređuje reference", "isCorrect": true },
      { "text": "2 - distinct automatski uklanja duplikate po sadržaju", "isCorrect": false },
      { "text": "3 - 'Ana' se pojavljuje 3 puta", "isCorrect": false },
      { "text": "Neće se kompilirati - custom objekti ne mogu koristiti distinct", "isCorrect": false },
      { "text": "1 - svi su isti", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s try-catch blokovima i exception hijerarhijom?",
    "codeSnippet": "public class ExceptionTest {\n    public static void process(String input) \n            throws IllegalArgumentException {\n        if (input == null) {\n            throw new NullPointerException(\"Input is null\");\n        }\n        if (input.isEmpty()) {\n            throw new IllegalArgumentException(\"Input is empty\");\n        }\n        System.out.println(\"Processing: \" + input);\n    }\n    \n    public static void main(String[] args) {\n        try {\n            process(null);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Caught IAE: \" + e.getMessage());\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught NPE: \" + e.getMessage());\n        } catch (RuntimeException e) {\n            System.out.println(\"Caught RE: \" + e.getMessage());\n        }\n    }\n}",
    "explanation": "Kod ima 1 GREŠKU ali tehnički se kompilira! Problem: catch blok redoslijed je LOŠE DIZAJNIRAN! NullPointerException je PODKLASA IllegalArgumentException? NE! Ali JE podklasa RuntimeException. Kod catch blokova: specifičniji (podklase) MORAJU biti PRIJE općenitijih (nadklase). Ovdje: IllegalArgumentException i NullPointerException su obje podklase RuntimeException, ali NISU u hijerarhiji jedna s drugom - redoslijed između njih ne smeta. Međutim, catch(RuntimeException) NIKAD NEĆE biti pogođen jer IAE i NPE dolaze prije! Process(null) baca NPE, hvata ga drugi catch. DIZAJNERSKI PROBLEM: treći catch je UNREACHABLE za IAE i NPE.",
    "difficulty": "HARD",
    "options": [
      { "text": "Tehnički 0 compile grešaka ali loš dizajn - RuntimeException catch je redundantan", "isCorrect": true },
      { "text": "1 greška - NPE catch mora biti prije IAE catch", "isCorrect": false },
      { "text": "2 greške - redoslijed catch blokova je potpuno pogrešan", "isCorrect": false },
      { "text": "Neće se kompilirati - NPE nije u throws", "isCorrect": false },
      { "text": "0 grešaka - kod je savršeno dizajniran", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Comparator.thenComparing i null vrijednostima?",
    "codeSnippet": "record Student(String name, Integer age, String major) {}\n\npublic class ComparatorTest {\n    public static void main(String[] args) {\n        List<Student> students = new ArrayList<>();\n        students.add(new Student(\"Ana\", 20, \"CS\"));\n        students.add(new Student(\"Marko\", null, \"Math\"));\n        students.add(new Student(\"Petra\", 20, \"CS\"));\n        students.add(new Student(\"Ivan\", 22, null));\n        \n        Comparator<Student> comp = Comparator\n            .comparing(Student::age, Comparator.nullsLast(Comparator.naturalOrder()))\n            .thenComparing(Student::name);\n        \n        students.sort(comp);\n        \n        students.forEach(System.out::println);\n    }\n}",
    "explanation": "Ispisat će: Student[name=Ana, age=20, major=CS], Student[name=Petra, age=20, major=CS], Student[name=Ivan, age=22, major=null], Student[name=Marko, age=null, major=Math]. Objašnjenje: comparing(Student::age, Comparator.nullsLast(...)) sortira po age s null vrijednostima NA KRAJU. Non-null ages se sortiraju naturalOrder (uzlazno): 20, 20, 22, null. thenComparing(Student::name) sortira po imenu za ISTE age vrijednosti: Ana i Petra obje imaju 20, pa se sortiraju abecedno (Ana < Petra). Ivan(22) i Marko(null) nemaju konflikte. major nije u Comparatoru pa ne utječe. KLJUČNO: nullsLast hendla samo null age, name nema null pa thenComparing radi normalno!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ana(20), Petra(20), Ivan(22), Marko(null) - sortiranje po age s null na kraju, pa po name", "isCorrect": true },
      { "text": "Baca NullPointerException - thenComparing ne hendla null", "isCorrect": false },
      { "text": "Marko(null), Ana(20), Petra(20), Ivan(22)", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može se kombinirati nullsLast s thenComparing", "isCorrect": false },
      { "text": "Ana(20), Ivan(22), Petra(20), Marko(null)", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s Collections.unmodifiableList i modifikacijama:",
    "codeSnippet": "public class UnmodifiableTest {\n    public static void main(String[] args) {\n        List<String> original = new ArrayList<>();\n        original.add(\"Java\");\n        original.add(\"Python\");\n        \n        List<String> unmodifiable = Collections.unmodifiableList(original);\n        \n        original.add(\"C++\");\n        \n        System.out.println(\"Unmodifiable size: \" + unmodifiable.size());\n        \n        unmodifiable.add(\"JavaScript\");\n        \n        System.out.println(\"Final size: \" + unmodifiable.size());\n    }\n}",
    "explanation": "Kod pada na unmodifiable.add(\"JavaScript\") s UnsupportedOperationException! unmodifiableList() kreira READ-ONLY VIEW originalne liste, ne kopiju! Promjene na ORIGINALNOJ listi (original.add(\"C++\")) REFLEKTIRAJU SE u unmodifiable view-u! unmodifiable.size() ispisuje '3' jer original sad ima 3 elementa. Ali pokušaj DODAVANJA kroz unmodifiable view (unmodifiable.add()) BACA EXCEPTION jer je read-only. KRITIČNO: unmodifiableList() ne kreira KOPIJU već WRAPPER koji blokira modificirajuće metode! Originalna lista se može mijenjati i promjene se vide kroz view. Za pravu immutability: List.copyOf() ili kreirati novu listu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Ispisuje '3', zatim baca UnsupportedOperationException - unmodifiable je view, ne kopija", "isCorrect": true },
      { "text": "Ispisuje '2' i '2' - unmodifiable je izolirano od originala", "isCorrect": false },
      { "text": "Neće se kompilirati - original se ne može mijenjati nakon unmodifiable", "isCorrect": false },
      { "text": "Baca exception odmah na Collections.unmodifiableList", "isCorrect": false },
      { "text": "Ispisuje '3' i '4' - obje liste se mogu mijenjati", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.peek i lazy evaluation?",
    "codeSnippet": "public class PeekTest {\n    public static void main(String[] args) {\n        List<String> words = List.of(\"Java\", \"Lambda\", \"Stream\", \"API\");\n        \n        Stream<String> stream = words.stream()\n            .filter(w -> w.length() > 3)\n            .peek(w -> System.out.println(\"Filtered: \" + w))\n            .map(String::toUpperCase)\n            .peek(w -> System.out.println(\"Mapped: \" + w));\n        \n        System.out.println(\"Stream created\");\n        \n        long count = stream.count();\n        \n        System.out.println(\"Count: \" + count);\n    }\n}",
    "explanation": "Ispisat će: 'Stream created', zatim 'Filtered: Java', 'Mapped: JAVA', 'Filtered: Lambda', 'Mapped: LAMBDA', 'Filtered: Stream', 'Mapped: STREAM', 'Count: 3'. KLJUČNO: peek() se NE izvršava dok se ne pozove TERMINAL operacija (count())! Lazy evaluation: filter, peek, map samo GRADE pipeline, ne izvršavaju se. 'Stream created' se ispisuje PRIJE peek-ova jer stream još nije izvršen. count() je terminal - pokreće izvršavanje. Filter propušta 'Java', 'Lambda', 'Stream' (length > 3), preskače 'API'. peek() se izvršava ZA SVAKI element koji prolazi kroz pipeline. Count vraća 3. peek() je za DEBUGGING, ne za logiku!",
    "difficulty": "HARD",
    "options": [
      { "text": "Stream created, zatim Filtered/Mapped za svaki element, Count: 3", "isCorrect": true },
      { "text": "Svi Filtered/Mapped prvo, pa Stream created, pa Count: 3", "isCorrect": false },
      { "text": "Samo 'Stream created' i 'Count: 3' - peek ne radi bez forEach", "isCorrect": false },
      { "text": "Neće se kompilirati - peek ne može biti prije map", "isCorrect": false },
      { "text": "Baca exception - peek je deprecated", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s record-ima i nasljeđivanjem?",
    "codeSnippet": "abstract class Entity {\n    private final long id;\n    \n    Entity(long id) {\n        this.id = id;\n    }\n    \n    public long getId() {\n        return id;\n    }\n}\n\nrecord Student(long id, String name, int age) extends Entity {\n    public Student(long id, String name, int age) {\n        super(id);\n        this.id = id;\n        this.name = name;\n        this.age = age;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student student = new Student(1L, \"Ana\", 20);\n        System.out.println(student);\n    }\n}",
    "explanation": "Kod ima VIŠE GREŠAKA i NEĆE se kompilirati! (1) GLAVNA GREŠKA: Record NE MOŽE naslijediti klasu! Record može SAMO implementirati interface-e, NE extends klasu. 'extends Entity' je ZABRANJENO. (2) DRUGA GREŠKA: Record već ima IMPLICITNI konstruktor - ne možemo napisati vlastiti na ovaj način. Record konstruktor se piše kao 'public Student { ... }' (compact constructor) ili standardni s this pozivom. (3) Record ne može imati super() poziv jer ne nasljeđuje. Records su finalni i ne mogu se extendirati. Rješenje: koristiti interface umjesto abstract class, ili ne koristiti record već običnu klasu.",
    "difficulty": "HARD",
    "options": [
      { "text": "Više grešaka - record ne može extends klasu, konstruktor je pogrešan", "isCorrect": true },
      { "text": "0 grešaka - record može naslijediti abstract klasu", "isCorrect": false },
      { "text": "1 greška - samo extends je problem", "isCorrect": false },
      { "text": "2 greške - extends i konstruktor", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s TreeSet i custom Comparatorom bez equals/hashCode?",
    "codeSnippet": "class Book {\n    String title;\n    int year;\n    \n    Book(String title, int year) {\n        this.title = title;\n        this.year = year;\n    }\n    \n    public String toString() {\n        return title + \"(\" + year + \")\";\n    }\n}\n\npublic class TreeSetTest {\n    public static void main(String[] args) {\n        Set<Book> books = new TreeSet<>(Comparator.comparing(b -> b.year));\n        \n        books.add(new Book(\"Java\", 2020));\n        books.add(new Book(\"Python\", 2019));\n        books.add(new Book(\"C++\", 2020));\n        books.add(new Book(\"JavaScript\", 2021));\n        \n        System.out.println(\"Size: \" + books.size());\n        books.forEach(System.out::println);\n    }\n}",
    "explanation": "Ispisat će 'Size: 3' i Python(2019), Java(2020), JavaScript(2021). VAŽNO: TreeSet koristi COMPARATOR za određivanje duplikata, NE equals/hashCode! Comparator uspoređuje samo po year - 'Java' i 'C++' imaju ISTI year (2020), pa ih TreeSet smatra DUPLIKATIMA! Drugi element s year=2020 ('C++') se ODBACUJE! TreeSet čuva samo PRVI element s istim Comparator rezultatom. Ako bi Comparator bio po title, sve 4 bi bile sačuvane. LEKCIJA: TreeSet s Comparatorom = Comparator definira jednakost, ne equals()! Često zbunjuje jer HashSet koristi equals/hashCode.",
    "difficulty": "HARD",
    "options": [
      { "text": "Size: 3 - TreeSet koristi Comparator za duplikate, 'Java' i 'C++' imaju isti year", "isCorrect": true },
      { "text": "Size: 4 - svi elementi su različiti", "isCorrect": false },
      { "text": "Baca ClassCastException - Book ne implementira Comparable", "isCorrect": false },
      { "text": "Neće se kompilirati - TreeSet zahtijeva equals/hashCode", "isCorrect": false },
      { "text": "Size: 2 - odbacuje više duplikata", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s generičkim wildcardima i add operacijom:",
    "codeSnippet": "public class WildcardAddTest {\n    public static void main(String[] args) {\n        List<? extends Number> list1 = new ArrayList<Integer>();\n        list1.add(10);\n        list1.add(20.5);\n        \n        List<? super Integer> list2 = new ArrayList<Number>();\n        list2.add(10);\n        list2.add(20);\n        \n        Integer value1 = list1.get(0);\n        Integer value2 = list2.get(0);\n        \n        System.out.println(value1 + \" \" + value2);\n    }\n}",
    "explanation": "Kod ima MULTIPLE GREŠKE: (1) list1.add(10) - GREŠKA! List<? extends Number> je PRODUCER - ne možete dodavati elemente (osim null)! Kompajler ne zna točan tip, može biti List<Integer> ili List<Double>. (2) list1.add(20.5) - ista greška. (3) Integer value1 = list1.get(0) - GREŠKA! get() vraća UNKNOWN tip koji extends Number, ne garantira Integer. (4) Integer value2 = list2.get(0) - GREŠKA! List<? super Integer> vraća Object ili nepoznat super-tip, ne Integer! Rješenje za list2: Object value2 = list2.get(0). PECS: Producer Extends (read), Consumer Super (write)!",
    "difficulty": "HARD",
    "options": [
      { "text": "4 greške - ne može se add u extends, get ne vraća Integer", "isCorrect": true },
      { "text": "2 greške - samo add operacije su problem", "isCorrect": false },
      { "text": "0 grešaka - wildcards dozvoljavaju sve operacije", "isCorrect": false },
      { "text": "1 greška - samo list1.add(20.5) je Double", "isCorrect": false },
      { "text": "3 greške - list2 je ispravan", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.allMatch, anyMatch i noneMatch?",
    "codeSnippet": "public class MatchTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(2, 4, 6, 7, 8, 10);\n        \n        boolean all = numbers.stream()\n            .peek(n -> System.out.println(\"All checking: \" + n))\n            .allMatch(n -> n % 2 == 0);\n        \n        boolean any = numbers.stream()\n            .peek(n -> System.out.println(\"Any checking: \" + n))\n            .anyMatch(n -> n % 2 != 0);\n        \n        boolean none = numbers.stream()\n            .peek(n -> System.out.println(\"None checking: \" + n))\n            .noneMatch(n -> n > 20);\n        \n        System.out.println(\"Results: \" + all + \", \" + any + \", \" + none);\n    }\n}",
    "explanation": "Ispisat će: 'All checking: 2', '4', '6', '7' (ZAUSTAVLJA SE), 'Any checking: 2', '4', '6', '7' (ZAUSTAVLJA SE), 'None checking: 2', '4', '6', '7', '8', '10' (SVI), 'Results: false, true, true'. SHORT-CIRCUIT: allMatch() provjerava dok je true, ZAUSTAVLJA se na prvom false (7 je neparan). anyMatch() traži dok ne nađe true, ZAUSTAVLJA se na prvom match-u (7 je neparan). noneMatch() mora provjeriti SVE elemente jer traži potvrdu da NIJEDAN ne zadovoljava (svi su ≤20 pa je true). peek() pokazuje koliko elemenata se procesira. OPTIMIZACIJA: match operacije ne procesiraju nepotrebno!",
    "difficulty": "HARD",
    "options": [
      { "text": "allMatch i anyMatch zaustavljaju se na 7, noneMatch provjerava sve - short-circuit", "isCorrect": true },
      { "text": "Sve tri operacije provjeravaju sve elemente", "isCorrect": false },
      { "text": "peek() se ne izvršava jer su match operacije lazy", "isCorrect": false },
      { "text": "Ispisuje samo 'Results: false, true, true'", "isCorrect": false },
      { "text": "allMatch provjerava sve, anyMatch i noneMatch short-circuit", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s konstruktorima, super pozivom i inicijalizacijom?",
    "codeSnippet": "class Vehicle {\n    private int passengers;\n    \n    Vehicle(int passengers) {\n        this.passengers = passengers;\n    }\n}\n\nclass Car extends Vehicle {\n    private String engine;\n    \n    Car(String engine, int passengers) {\n        this.engine = engine;\n        super(passengers);\n    }\n    \n    public void display() {\n        System.out.println(\"Engine: \" + engine);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car = new Car(\"V8\", 4);\n        car.display();\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! KRITIČNA GREŠKA: super(passengers) mora biti PRVA naredba u konstruktoru! U Car konstruktoru, this.engine = engine je PRIJE super() poziva što je ZABRANJENO. Java zahtijeva da se nadklasa inicijalizira PRIJE podklase. Kompajler će javiti: 'call to super must be first statement in constructor'. Rješenje: zamijeniti redoslijed - super(passengers) prvo, zatim this.engine = engine. Pravilo: super() ili this() poziv (ako postoji) MORA biti prva naredba u konstruktoru, bez iznimke!",
    "difficulty": "HARD",
    "options": [
      { "text": "1 greška - super() mora biti prva naredba u konstruktoru", "isCorrect": true },
      { "text": "0 grešaka - redoslijed nije bitan", "isCorrect": false },
      { "text": "2 greške - engine i super su oba pogrešni", "isCorrect": false },
      { "text": "1 greška - private passengers nije dostupan", "isCorrect": false },
      { "text": "Kompilira se ali pada u runtime-u", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Collections.shuffle i immutable listama?",
    "codeSnippet": "public class ShuffleTest {\n    public static void main(String[] args) {\n        List<String> list1 = List.of(\"A\", \"B\", \"C\", \"D\");\n        \n        Collections.shuffle(list1);\n        System.out.println(list1);\n        \n        List<String> list2 = Arrays.asList(\"A\", \"B\", \"C\", \"D\");\n        Collections.shuffle(list2);\n        System.out.println(list2);\n        \n        List<String> list3 = new ArrayList<>(List.of(\"A\", \"B\", \"C\", \"D\"));\n        Collections.shuffle(list3);\n        System.out.println(list3);\n    }\n}",
    "explanation": "list1 PADA s UnsupportedOperationException! list1 = List.of() je IMMUTABLE - ne može se modificirati. shuffle() mijenja listu in-place, što nije dozvoljeno. list2 = Arrays.asList() RADI jer Arrays.asList() vraća fixed-size ali MUTABLE listu (set() radi, add() ne radi). shuffle() samo zamjenjuje elemente (set()), ne dodaje/briše. list3 = new ArrayList<> RADI jer je potpuno mutable. VAŽNA RAZLIKA: List.of() = immutable (ne može set/add/remove), Arrays.asList() = fixed-size mutable (može set, ne može add/remove), ArrayList = potpuno mutable!",
    "difficulty": "HARD",
    "options": [
      { "text": "list1 baca UnsupportedOperationException, list2 i list3 rade - List.of je immutable", "isCorrect": true },
      { "text": "Sve tri liste padaju - shuffle ne radi s List.of ni Arrays.asList", "isCorrect": false },
      { "text": "Sve tri liste rade - shuffle automatski kreira kopiju", "isCorrect": false },
      { "text": "list1 i list2 padaju, list3 radi", "isCorrect": false },
      { "text": "Neće se kompilirati - shuffle ne prihvaća List.of", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s interface-ima, default metodama i nasljeđivanjem:",
    "codeSnippet": "interface Playable {\n    void play();\n    \n    default void stop() {\n        System.out.println(\"Stopping\");\n    }\n}\n\ninterface Recordable {\n    void record();\n    \n    default void stop() {\n        System.out.println(\"Stopping recording\");\n    }\n}\n\nclass MediaPlayer implements Playable, Recordable {\n    public void play() {\n        System.out.println(\"Playing\");\n    }\n    \n    public void record() {\n        System.out.println(\"Recording\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        MediaPlayer player = new MediaPlayer();\n        player.play();\n        player.stop();\n    }\n}",
    "explanation": "Kod se NEĆE kompilirati! KONFLIKT: MediaPlayer implementira dva interface-a (Playable i Recordable) koji OBA imaju default metodu stop() s RAZLIČITIM implementacijama. Java ne zna koju odabrati! Kompajler će javiti: 'MediaPlayer inherits unrelated defaults for stop() from types Playable and Recordable'. Rješenje: MediaPlayer MORA eksplicitno nadjačati stop() i odlučiti što će raditi: (1) odabrati jedan: Playable.super.stop(), (2) kombinirati oba, ili (3) potpuno nova implementacija. DIAMOND PROBLEM s default metodama - mora se ručno riješiti!",
    "difficulty": "HARD",
    "options": [
      { "text": "Neće se kompilirati - diamond problem, oba interface-a imaju stop()", "isCorrect": true },
      { "text": "Ispisuje 'Playing' i 'Stopping' - uzima prvo interface", "isCorrect": false },
      { "text": "Baca AmbiguousMethodException u runtime-u", "isCorrect": false },
      { "text": "Ispisuje 'Playing' i 'Stopping recording' - uzima zadnje", "isCorrect": false },
      { "text": "0 grešaka - default metode se automatski kombiniraju", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.limit i infinite stream-om?",
    "codeSnippet": "public class InfiniteStreamTest {\n    public static void main(String[] args) {\n        Stream<Integer> infiniteStream = Stream.iterate(1, n -> n + 2);\n        \n        List<Integer> result = infiniteStream\n            .filter(n -> n % 3 == 0)\n            .limit(5)\n            .toList();\n        \n        System.out.println(result);\n        \n        long count = Stream.iterate(0, n -> n + 1)\n            .peek(n -> System.out.println(\"Processing: \" + n))\n            .limit(3)\n            .count();\n        \n        System.out.println(\"Count: \" + count);\n    }\n}",
    "explanation": "Ispisat će: [3, 9, 15, 21, 27] (prvi 5 brojevi djeljivi s 3 iz 1,3,5,7,9,11,...), 'Processing: 0', 'Processing: 1', 'Processing: 2', 'Count: 3'. VAŽNO: limit() s infinite stream-om je SIGURNO jer JE short-circuit operacija! iterate(1, n -> n+2) generira 1,3,5,7,9,11,... (neparne brojeve). filter(n % 3 == 0) traži 3,9,15,21,27... Limit ZAUSTAVLJA stream nakon 5 elemenata. DRUGI stream: iterate(0, n -> n+1) generira 0,1,2,... Limit(3) uzima samo prva 3 (0,1,2). peek() pokazuje da se procesiraju SAMO 3 elementa, ne beskonačno! limit() sprječava beskonačno izvršavanje!",
    "difficulty": "HARD",
    "options": [
      { "text": "[3, 9, 15, 21, 27], Processing 0-2, Count: 3 - limit zaustavlja infinite stream", "isCorrect": true },
      { "text": "Program se nikad ne zaustavlja - infinite stream", "isCorrect": false },
      { "text": "Baca StackOverflowError - previše iteracija", "isCorrect": false },
      { "text": "[1, 3, 5, 7, 9], Processing 0-2, Count: 3", "isCorrect": false },
      { "text": "Neće se kompilirati - limit ne može s iterate", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s BigDecimal i operatorima?",
    "codeSnippet": "import java.math.BigDecimal;\n\npublic class BigDecimalTest {\n    public static void main(String[] args) {\n        BigDecimal first = new BigDecimal(\"10.50\");\n        BigDecimal second = new BigDecimal(\"5.25\");\n        \n        BigDecimal sum = first + second;\n        BigDecimal product = first * second;\n        \n        BigDecimal result = first.add(second);\n        result = result.multiply(new BigDecimal(\"2\"));\n        \n        if (result > 30) {\n            System.out.println(\"Result is large\");\n        }\n        \n        System.out.println(sum + \" \" + product + \" \" + result);\n    }\n}",
    "explanation": "Kod ima 3 GREŠKE i NEĆE se kompilirati! (1) first + second - GREŠKA! BigDecimal ne podržava operator +, mora se koristiti .add(). (2) first * second - GREŠKA! Ne postoji operator *, mora biti .multiply(). (3) result > 30 - GREŠKA! Ne postoji operator >, mora biti result.compareTo(new BigDecimal(\"30\")) > 0. Java NE DOPUŠTA operator overloading! Referentni tipovi (osim String konkatenacije) MORAJU koristiti metode, ne operatore. Wrapper klase (Integer, Double) rade s operatorima zbog AUTOBOXING-a, ali BigDecimal NEMA autoboxing!",
    "difficulty": "HARD",
    "options": [
      { "text": "3 greške - BigDecimal ne podržava operatore +, *, >, mora koristiti metode", "isCorrect": true },
      { "text": "0 grešaka - BigDecimal podržava osnovne operatore", "isCorrect": false },
      { "text": "2 greške - samo + i * su problem", "isCorrect": false },
      { "text": "1 greška - samo > operator ne radi", "isCorrect": false },
      { "text": "Kompilira se ali daje pogrešne rezultate", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s System.out.printf i formatiranjem?",
    "codeSnippet": "public class PrintfTest {\n    public static void main(String[] args) {\n        String name = \"Ana\";\n        int age = 20;\n        double grade = 4.567;\n        \n        System.out.printf(\"%s je stara %d godina%n\", name, age);\n        System.out.printf(\"Prosjek: %.2f%n\", grade);\n        System.out.printf(\"%10s %5d %.1f%n\", name, age, grade);\n        System.out.printf(\"%-10s %-5d %.3f%n\", name, age, grade);\n    }\n}",
    "explanation": "Ispisat će: (1) 'Ana je stara 20 godina\\n', (2) 'Prosjek: 4.57\\n' (zaokruženo na 2 decimale), (3) '       Ana    20 4.6\\n' (name ima 7 praznih mjesta lijevo za širinu 10, age 3 prazna za širinu 5, grade zaokružen na 1 decimalu), (4) 'Ana        20    4.567\\n' (minus = lijevo poravnanje, name ima 7 praznih DESNO, age 3 desno). %s=string, %d=decimal(int), %f=float/double, %n=newline. %10s = širina 10 (desno poravnanje), %-10s = širina 10 lijevo poravnanje, %.2f = 2 decimale. printf KOMPLEKSNO ali moćno za formatiranje!",
    "difficulty": "HARD",
    "options": [
      { "text": "'Ana je stara 20 godina', 'Prosjek: 4.57', proravnanja i zaokruživanja", "isCorrect": true },
      { "text": "Neće se kompilirati - krivi format specifiers", "isCorrect": false },
      { "text": "Baca IllegalFormatException - previše argumenata", "isCorrect": false },
      { "text": "Sve linije su jednako formatirane", "isCorrect": false },
      { "text": "Ispisuje samo prve dvije linije - ostale padaju", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s Collectors.toMap i duplikatima:",
    "codeSnippet": "record Student(String id, String name, int age) {}\n\npublic class ToMapTest {\n    public static void main(String[] args) {\n        List<Student> students = List.of(\n            new Student(\"1\", \"Ana\", 20),\n            new Student(\"2\", \"Marko\", 22),\n            new Student(\"1\", \"Petra\", 21),\n            new Student(\"3\", \"Ivan\", 20)\n        );\n        \n        Map<String, Student> map = students.stream()\n            .collect(Collectors.toMap(\n                Student::id,\n                s -> s\n            ));\n        \n        System.out.println(map);\n    }\n}",
    "explanation": "Kod PADA s IllegalStateException: 'Duplicate key 1'! toMap() NE hendla automatski duplikate! Student s id=\"1\" se pojavljuje DVA PUTA (Ana i Petra). toMap() pokušava staviti oba u Map s istim ključem što uzrokuje konflikt. Rješenje: providati merge function kao treći argument: toMap(Student::id, s -> s, (existing, replacement) -> existing) ili (e, r) -> r ili (e, r) -> newer/older ovisno o logici. Merge function kaže ŠTO NAPRAVITI s konfliktom. Bez merge function, toMap() pada na duplikate! ČESTA GREŠKA: zaboraviti merge function!",
    "difficulty": "HARD",
    "options": [
      { "text": "Baca IllegalStateException - 'Duplicate key 1', toMap() zahtijeva merge function", "isCorrect": true },
      { "text": "Ispisuje Map s 3 elementa - zadnji duplikat prepisuje prvi", "isCorrect": false },
      { "text": "Neće se kompilirati - toMap ne može s duplikatima", "isCorrect": false },
      { "text": "Ispisuje Map s 4 elementa - svi se spremaju", "isCorrect": false },
      { "text": "Automatski filtrira duplikate po id-u", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Comparator.comparing i null-safe pristupom?",
    "codeSnippet": "record Person(String name, Integer age) {}\n\npublic class NullSafeComparatorTest {\n    public static void main(String[] args) {\n        List<Person> people = new ArrayList<>();\n        people.add(new Person(\"Ana\", 20));\n        people.add(new Person(null, 22));\n        people.add(new Person(\"Marko\", null));\n        people.add(new Person(\"Petra\", 21));\n        \n        Comparator<Person> comp = Comparator\n            .comparing(\n                Person::name, \n                Comparator.nullsLast(Comparator.naturalOrder())\n            )\n            .thenComparing(\n                Person::age,\n                Comparator.nullsLast(Comparator.naturalOrder())\n            );\n        \n        people.sort(comp);\n        people.forEach(System.out::println);\n    }\n}",
    "explanation": "Ispisat će: Person[name=Ana, age=20], Person[name=Marko, age=null], Person[name=Petra, age=21], Person[name=null, age=22]. Objašnjenje: Prvi Comparator sortira po name s null-ovima na kraju: Ana, Marko, Petra, null. thenComparing sortira po age unutar istih imena (ovdje nema duplikata imena pa age nema efekta osim što null age ne baca exception). nullsLast za SVAKI Comparator omogućava null-safe sortiranje. Ana(20) < Marko(null) < Petra(21) < null(22) po name. Marko ima null age ali to ne smeta jer nullsLast u thenComparing hendla to. KLJUČNO: nullsLast na OBA razine!",
    "difficulty": "HARD",
    "options": [
      { "text": "Ana(20), Marko(null), Petra(21), null(22) - null-safe Comparator na oba nivoa", "isCorrect": true },
      { "text": "Baca NullPointerException - null name ili age", "isCorrect": false },
      { "text": "null(22), Ana(20), Marko(null), Petra(21)", "isCorrect": false },
      { "text": "Neće se kompilirati - nullsLast ne može u thenComparing", "isCorrect": false },
      { "text": "Ana(20), Petra(21), Marko(null), null(22)", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s abstract klasom, konstruktorima i modifikatorima pristupa?",
    "codeSnippet": "public abstract class Animal {\n    private String name;\n    \n    public abstract void sound();\n    \n    public abstract void eat() {\n        System.out.println(name + \" is eating\");\n    }\n    \n    public Animal(String name) {\n        this.name = name;\n    }\n}\n\nclass Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n    \n    public void sound() {\n        System.out.println(\"Bark\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal animal = new Animal(\"Generic\");\n        animal.sound();\n        \n        Dog dog = new Dog(\"Rex\");\n        dog.sound();\n        dog.eat();\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) public abstract void eat() { ... } - GREŠKA! Apstraktna metoda NE MOŽE imati tijelo (implementaciju)! Apstraktne metode su samo deklaracije. Ili je abstract bez tijela, ili je konkretna s tijelom. (2) Animal animal = new Animal(\"Generic\") - GREŠKA! Ne može se instancirati apstraktna klasa! Apstraktne klase mogu imati konstruktore ALI samo za poziv iz podklasa (super()). Dog dog = new Dog() je OK jer Dog je konkretna. eat() također ne može biti pozvana jer Dog ne nadjačava eat() (a ne može jer eat() ne bi trebala imati tijelo).",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - abstract metoda ne može imati tijelo, ne može se instancirati abstract klasa", "isCorrect": true },
      { "text": "1 greška - samo instanciranje abstract klase", "isCorrect": false },
      { "text": "1 greška - samo abstract metoda s tijelom", "isCorrect": false },
      { "text": "0 grešaka - abstract klase mogu imati implementirane metode", "isCorrect": false },
      { "text": "3 greške - Dog također ne može naslijediti Animal", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.concat i duplicate elements?",
    "codeSnippet": "public class ConcatTest {\n    public static void main(String[] args) {\n        Stream<String> stream1 = Stream.of(\"A\", \"B\", \"C\");\n        Stream<String> stream2 = Stream.of(\"B\", \"C\", \"D\");\n        \n        List<String> result = Stream.concat(stream1, stream2)\n            .distinct()\n            .sorted()\n            .toList();\n        \n        System.out.println(result);\n        \n        long count = Stream.concat(\n            Stream.of(1, 2, 3),\n            Stream.of(4, 5, 6)\n        ).count();\n        \n        System.out.println(\"Count: \" + count);\n    }\n}",
    "explanation": "Ispisat će: [A, B, C, D] i 'Count: 6'. Stream.concat() SPAJA dva stream-a u jedan: \"A\",\"B\",\"C\",\"B\",\"C\",\"D\". distinct() UKLANJA duplikate (B i C se pojavljuju dvaput): \"A\",\"B\",\"C\",\"D\". sorted() SORTIRA abecedno: [A, B, C, D]. Drugi concat() spaja 1,2,3,4,5,6 - count() vraća 6 elemenata. VAŽNO: concat() ne uklanja duplikate automatski - mora se koristiti distinct()! concat() prima DVA stream-a kao argumente, ne varargs. Za više stream-ova koristiti višestruki concat() ili Stream.of().flatMap().",
    "difficulty": "HARD",
    "options": [
      { "text": "[A, B, C, D], Count: 6 - concat spaja, distinct uklanja duplikate", "isCorrect": true },
      { "text": "[A, B, B, C, C, D], Count: 6 - concat ne uklanja duplikate", "isCorrect": false },
      { "text": "[A, B, C], Count: 3 - concat automatski uklanja duplikate", "isCorrect": false },
      { "text": "Neće se kompilirati - ne može se koristiti distinct nakon concat", "isCorrect": false },
      { "text": "Baca IllegalStateException - stream je već konzumiran", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Pronađite greške u sljedećem kodu s multi-catch blokom i exception hijerarhijom:",
    "codeSnippet": "import java.io.*;\n\npublic class MultiCatchTest {\n    public static void readFile(String path) {\n        try {\n            BufferedReader reader = new BufferedReader(new FileReader(path));\n            String line = reader.readLine();\n            int number = Integer.parseInt(line);\n            System.out.println(\"Number: \" + number);\n            reader.close();\n            \n        } catch (IOException | NumberFormatException e) {\n            System.out.println(\"Error: \" + e.getMessage());\n            e = new IOException(\"Custom error\");\n            \n        } catch (FileNotFoundException e) {\n            System.out.println(\"File not found\");\n            \n        } catch (Exception e) {\n            System.out.println(\"General error\");\n        }\n    }\n    \n    public static void main(String[] args) {\n        readFile(\"test.txt\");\n    }\n}",
    "explanation": "Kod ima 2 GREŠKE: (1) e = new IOException(\"Custom error\") - GREŠKA! U multi-catch bloku, varijabla 'e' je EFFECTIVELY FINAL! Ne može se reassign-ati. Multi-catch (IOException | NumberFormatException) kreira implicitno final varijablu. (2) catch (FileNotFoundException e) - GREŠKA! FileNotFoundException je PODKLASA IOException. Catch blokovi moraju biti od SPECIFIČNIJIH ka OPĆENITIJIMA. FileNotFoundException catch NIKAD NEĆE biti pogođen jer IOException catch dolazi PRIJE i hvata sve IOException (uključujući FileNotFoundException). Kompajler će javiti: 'exception FileNotFoundException has already been caught'. Rješenje: staviti FileNotFoundException PRIJE IOException ili ukloniti jer je već uhvaćen.",
    "difficulty": "HARD",
    "options": [
      { "text": "2 greške - multi-catch varijabla je final, FileNotFoundException već uhvaćen s IOException", "isCorrect": true },
      { "text": "1 greška - samo reassignment multi-catch varijable", "isCorrect": false },
      { "text": "1 greška - samo redoslijed catch blokova", "isCorrect": false },
      { "text": "0 grešaka - multi-catch dopušta reassignment", "isCorrect": false },
      { "text": "3 greške - BufferedReader također nije zatvoren pravilno", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Što će ispisati sljedeći kod s Stream.reduce i parallel stream-om?",
    "codeSnippet": "public class ParallelReduceTest {\n    public static void main(String[] args) {\n        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n        \n        int result1 = numbers.stream()\n            .reduce(0, (a, b) -> a + b);\n        \n        int result2 = numbers.parallelStream()\n            .reduce(0, (a, b) -> a + b);\n        \n        int result3 = numbers.parallelStream()\n            .reduce(1, (a, b) -> a * b);\n        \n        int result4 = numbers.stream()\n            .reduce(1, (a, b) -> a * b);\n        \n        System.out.println(result1 + \" \" + result2 + \" \" + result3 + \" \" + result4);\n    }\n}",
    "explanation": "Ispisat će: '55 55 3628800 3628800'. result1 = sequential sum 1+2+...+10 = 55. result2 = parallel sum - isti rezultat 55 jer je zbrajanje ASOCIJATIVNO i identity 0 je ISPRAVAN. result3 = parallel product - POGREŠAN rezultat! S više threadova i identity=1, svaki thread POČINJE S 1 i množi svoj dio, PA SE REZULTATI MNOŽE. Umjesto 1*2*3*...*10 = 3628800, dobijemo (1*subset1) * (1*subset2) * ... što daje VEĆI broj od očekivanog zbog višestrukih identity-a! result4 = sequential product 1*2*...*10 = 3628800 (ISPRAVAN). LEKCIJA: Parallel reduce s multiply i identity=1 NE RADI ISPRAVNO!",
    "difficulty": "HARD",
    "options": [
      { "text": "55 55 3628800 3628800 - parallel reduce s multiply daje pogrešan rezultat zbog višestrukih identity-a", "isCorrect": true },
      { "text": "55 55 3628800 3628800 - svi rezultati su točni", "isCorrect": false },
      { "text": "55 55 1 3628800 - parallel multiply s identity 1 vraća 1", "isCorrect": false },
      { "text": "Nepredvidivi rezultati - parallel stream nije deterministički", "isCorrect": false },
      { "text": "Baca ConcurrentModificationException", "isCorrect": false }
    ]
  },
  {
    "type": "CODE_WILL_COMPILE",
    "prompt": "Koliko grešaka ima sljedeći kod s Scanner, nextInt i buffer problemima?",
    "codeSnippet": "import java.util.Scanner;\n\npublic class ScannerBufferTest {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(\"10 20 30\\nAna\\nMarko\");\n        \n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        int c = scanner.nextInt();\n        \n        String name1 = scanner.nextLine();\n        String name2 = scanner.nextLine();\n        \n        System.out.println(\"Numbers: \" + a + \", \" + b + \", \" + c);\n        System.out.println(\"Name1: '\" + name1 + \"'\");\n        System.out.println(\"Name2: '\" + name2 + \"'\");\n    }\n}",
    "explanation": "Kod se kompilira ALI ima BUG: name1 će biti PRAZAN STRING! Poslije scanner.nextInt() čita '30', NEWLINE ('\\n') ostaje u bufferu! scanner.nextLine() zatim čita taj \\n kao PRAZAN STRING! name1 = \"\" (prazan), name2 = \"Ana\". 'Marko' ostaje nepročitan. Output: 'Numbers: 10, 20, 30', 'Name1: ''', 'Name2: 'Ana''. Rješenje: dodati scanner.nextLine() nakon zadnjeg nextInt() da 'pojede' newline: scanner.nextInt(); scanner.nextLine(); String name1 = scanner.nextLine(). OVO JE KLASIČNA SCANNER ZAMKA! nextInt/nextDouble ostavljaju \\n, nextLine čita \\n kao prazan string!",
    "difficulty": "HARD",
    "options": [
      { "text": "0 compile grešaka ali BUG - name1 je prazan jer nextInt ostavlja newline u bufferu", "isCorrect": true },
      { "text": "Baca InputMismatchException - nextLine ne može slijediti nextInt", "isCorrect": false },
      { "text": "Baca NoSuchElementException - nema dovoljno tokena", "isCorrect": false },
      { "text": "Radi ispravno - name1='Ana', name2='Marko'", "isCorrect": false },
      { "text": "1 greška - ne može se koristiti String input u Scanner konstruktoru", "isCorrect": false }
    ]
  }
]
}
