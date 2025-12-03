import { QuestionType, Difficulty } from '@prisma/client'

export const filesAndFoldersQuestions = {
  lectureSlug: 'files-and-folders',
  questions:[
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih sintaksi su VALIDNE za kreiranje Path objekta u Javi? (Odaberite sve točne)",
      "explanation": "Path objekt može se kreirati na VIŠE NAČINA koji su SVI validni: (1) Paths.get(\"file.txt\") - statička metoda iz Java 7. (2) Path.of(\"file.txt\") - novija metoda iz Java 11, IDENTIČNA Paths.get(). (3) new File(\"file.txt\").toPath() - konverzija starog File objekta. (4) FileSystems.getDefault().getPath(\"file.txt\") - eksplicitan filesystem pristup. SVE ČETIRI su funkcionalno IDENTIČNE za lokalne datoteke! Path.of() je PREPORUČENA u modernom kodu (Java 11+) ali Paths.get() je još uvijek widely used. new File().toPath() se koristi pri migraciji legacy koda. FileSystems pristup je za advanced scenarije (npr. ZIP file systems). Odgovori D, E, F su SINTAKTIČKI pogrešni - ne postoje takve metode.",
      "difficulty": "HARD",
      "options": [
        { "text": "Paths.get(\"file.txt\")", "isCorrect": true },
        { "text": "Path.of(\"file.txt\")", "isCorrect": true },
        { "text": "new File(\"file.txt\").toPath()", "isCorrect": true },
        { "text": "Path.create(\"file.txt\")", "isCorrect": false },
        { "text": "new Path(\"file.txt\")", "isCorrect": false },
        { "text": "FileSystems.getDefault().getPath(\"file.txt\")", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati i što će ispisati?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class PathTest {\n    public static void main(String[] args) throws IOException {\n        Path p1 = Paths.get(\"test.txt\");\n        Path p2 = Path.of(\"test.txt\");\n        Path p3 = new java.io.File(\"test.txt\").toPath();\n        \n        System.out.println(p1.equals(p2));\n        System.out.println(p2.equals(p3));\n        System.out.println(p1.getClass().getName());\n    }\n}",
      "explanation": "Kod se kompilira i ispisuje 'true', 'true', naziv implementacijske klase (vjerojatno 'sun.nio.fs.WindowsPath' ili 'sun.nio.fs.UnixPath'). SVI TRI načina kreiranja Path objekta vraćaju IDENTIČNE objekte! p1.equals(p2) je true jer Paths.get() i Path.of() koriste ISTU implementaciju - Path.of() je zapravo samo poziv Paths.get() interno (od Java 11). p2.equals(p3) također true jer File.toPath() kreira Path s istom putanjom. getClass().getName() vraća konkretnu platformski-specifičnu implementaciju Path interfacea. VAŽNO: Path je INTERFACE, ne klasa - konkretna implementacija ovisi o OS-u! equals() uspoređuje putanje, ne class tipove.",
      "difficulty": "HARD",
      "options": [
        { "text": "Kompilira se i ispisuje: true, true, implementacijska klasa (platform-specific)", "isCorrect": true },
        { "text": "Neće se kompilirati - new File().toPath() nije validno", "isCorrect": false },
        { "text": "Kompilira se i ispisuje: false, false - različite klase", "isCorrect": false },
        { "text": "Neće se kompilirati - Path.of() ne prima String", "isCorrect": false },
        { "text": "Kompilira se ali pada u runtime-u s NullPointerException", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su VALIDNI načini čitanja cijele tekstualne datoteke u String? (Odaberite sve točne)",
      "explanation": "Postoji VIŠE validnih načina čitanja datoteke u String: (1) Files.readString(path) - Java 11+, NAJJEDNOSTAVNIJE, čita s UTF-8 encodingom defaultno. (2) new String(Files.readAllBytes(path)) - Java 7+, čita sve bajtove pa konvertira u String. (3) Files.lines(path).collect(Collectors.joining(\"\\n\")) - Stream API, čita liniju po liniju pa spaja. (4) BufferedReader s StringBuilder - klasičan način, liniju po liniju. SVE ČETIRI rade, ali s RAZLIKAMA: readString() je najbržiji i najjednostavniji. readAllBytes() daje kontrolu nad encodingom. lines() omogućava filtriranje prije čitanja. BufferedReader je za velike datoteke (ne učitava sve u memoriju). Scanner.useDelimiter(\"\\\\Z\").next() TAKOĐER radi ali je sporiji! Odgovori D i F su SINTAKTIČKI pogrešni.",
      "difficulty": "HARD",
      "options": [
        { "text": "Files.readString(Path.of(\"file.txt\"))", "isCorrect": true },
        { "text": "new String(Files.readAllBytes(Path.of(\"file.txt\")))", "isCorrect": true },
        { "text": "Files.lines(Path.of(\"file.txt\")).collect(Collectors.joining(\"\\n\"))", "isCorrect": true },
        { "text": "Files.read(Path.of(\"file.txt\")).toString()", "isCorrect": false },
        { "text": "Path.of(\"file.txt\").readString()", "isCorrect": false },
        { "text": "new BufferedReader(new FileReader(\"file.txt\")) s manual StringBuilder", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Koliko različitih načina try-with-resources sintakse je validno u sljedećem kodu?",
      "codeSnippet": "import java.io.*;\n\npublic class TryWithResourcesVariations {\n    public static void main(String[] args) throws IOException {\n        // Način 1\n        try (FileReader fr1 = new FileReader(\"a.txt\")) {\n            System.out.println(\"1\");\n        }\n        \n        // Način 2\n        FileReader fr2 = new FileReader(\"b.txt\");\n        try (fr2) {\n            System.out.println(\"2\");\n        }\n        \n        // Način 3\n        final FileReader fr3 = new FileReader(\"c.txt\");\n        try (fr3) {\n            System.out.println(\"3\");\n        }\n        \n        // Način 4\n        try (FileReader fr4 = new FileReader(\"d.txt\");\n             FileReader fr5 = new FileReader(\"e.txt\")) {\n            System.out.println(\"4\");\n        }\n    }\n}",
      "explanation": "SVI ČETIRI načina su VALIDNI! (1) Način 1: klasični try-with-resources (Java 7+) - deklaracija UNUTAR try zagrada. (2) Način 2: Java 9+ effectively final - fr2 je effectively final (ne mijenja se nakon inicijalizacije) pa može u try zagrade. (3) Način 3: Java 9+ eksplicitni final - isto kao način 2 ali eksplicitan final modifier. (4) Način 4: VIŠE resursa odjednom - separiranih točkom-zarezom (;). Način 2 i 3 su ISTI funkcionalno - effectively final znači da varijabla MOŽE biti bez final keywoorda ako se ne mijenja. BITNA razlika: Način 1 resource je VIDLJIV samo u try bloku. Način 2/3 resource je vidljiv IZ try bloka ali JE zatvoreno nakon try-a. Svi načini AUTOMATSKI zatvaraju resurse u OBRNUTOM redoslijedu kreiranja!",
      "difficulty": "HARD",
      "options": [
        { "text": "Svi 4 načina su validni - različite Java verzije podržavaju različite sintakse", "isCorrect": true },
        { "text": "Samo način 1 i 4 - način 2 i 3 nisu validni", "isCorrect": false },
        { "text": "Samo način 1 - ostali bacaju compile error", "isCorrect": false },
        { "text": "Način 2 nije validan - fr2 nije final", "isCorrect": false },
        { "text": "Način 4 nije validan - ne mogu se staviti dva resursa", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih metoda Files klase VRAĆAJU Stream<Path>? (Odaberite sve točne)",
      "explanation": "Files klasa ima NEKOLIKO metoda koje vraćaju Stream<Path>: (1) Files.list(path) - vraća Stream<Path> s DIREKTNIM child elementima mape (NIJE rekurzivno). (2) Files.walk(path) - vraća Stream<Path> s SVIM elementima rekurzivno kroz sve podmape. (3) Files.find(path, depth, matcher) - vraća Stream<Path> s elementima koji matchaju BiPredicate. (4) Files.walk(path, maxDepth) - walk s limitom dubine. SVE ČETIRI vraćaju Stream<Path> i MORAJU SE zatvoriti (try-with-resources)! Files.lines() vraća Stream<String> (ne Path!). Files.newDirectoryStream() vraća DirectoryStream<Path> (ne java.util.stream.Stream!). RAZLIKE: list() = samo trenutna mapa, walk() = rekurzivno sve, find() = s filterom. walk() može doći do StackOverflowError s dubokim strukturama!",
      "difficulty": "HARD",
      "options": [
        { "text": "Files.list(Path dir)", "isCorrect": true },
        { "text": "Files.walk(Path start)", "isCorrect": true },
        { "text": "Files.lines(Path path)", "isCorrect": false },
        { "text": "Files.find(Path start, int maxDepth, BiPredicate<Path,BasicFileAttributes> matcher)", "isCorrect": true },
        { "text": "Files.newDirectoryStream(Path dir)", "isCorrect": false },
        { "text": "Files.walk(Path start, int maxDepth)", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s Files stream metodama?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class FilesStreamTest {\n    public static void main(String[] args) throws IOException {\n        Path dir = Path.of(\".\");\n        \n        long count1 = Files.list(dir).count();\n        long count2 = Files.walk(dir, 1).count();\n        long count3 = Files.walk(dir, 2).count();\n        \n        System.out.println(count1 < count2);\n        System.out.println(count2 <= count3);\n        System.out.println(count1 == (count2 - 1));\n    }\n}",
      "explanation": "Ispisat će 'false', 'true', 'true'. KLJUČNA razlika: Files.list() vraća SAMO direktne child elemente. Files.walk(path, depth) vraća SVE elemente DO depth nivoa, UKLJUČUJUĆI START DIREKTORIJ! count1 = broj fajlova u trenutnoj mapi. count2 = 1 (start dir) + broj fajlova u trenutnoj mapi = count1 + 1. count3 = start dir + fajlovi u mapi + fajlovi u podmapama (depth=2). count1 < count2 je FALSE jer list() vraća isto kao walk() ALI walk() UKLJUČUJE start direktorij (+1)! count2 <= count3 je TRUE jer depth=2 uključuje više ili jednako elemenata od depth=1. count1 == (count2 - 1) je TRUE jer walk() ima +1 za start dir. ZAMKA: walk(path, 0) vraća SAMO path, walk(path, 1) vraća path + direct children!",
      "difficulty": "HARD",
      "options": [
        { "text": "false, true, true - walk() uključuje start direktorij (+1)", "isCorrect": true },
        { "text": "true, true, false - list() i walk(1) su identični", "isCorrect": false },
        { "text": "false, false, true - count3 je uvijek manji", "isCorrect": false },
        { "text": "Neće se kompilirati - walk() ne prima int parameter", "isCorrect": false },
        { "text": "true, true, true - sve su iste vrijednosti", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih klasa MORAJU biti zatvorene nakon korištenja (poziv close())? (Odaberite sve točne)",
      "explanation": "Klase koje implementiraju AutoCloseable ili Closeable MORAJU biti zatvorene: (1) FileReader/FileWriter - direktan pristup datotekama, OS resursi. (2) BufferedReader/BufferedWriter - wrapper oko Reader/Writer, također moraju se zatvoriti. (3) FileInputStream/FileOutputStream - binarne datoteke, file descriptori. (4) ObjectInputStream/ObjectOutputStream - serijalizacija, wrapperi oko streamova. (5) Scanner - čita iz izvora (file/stream), mora zatvoriti resource. (6) Formatter - zapisuje u datoteku, mora flushat buffer. (7) DirectoryStream - iteracija kroz mapu, drži otvoreni direktorij. (8) Stream iz Files.lines/walk/list - OS resursi! SVI oni implementiraju AutoCloseable. String, StringBuilder, Path NE moraju se zatvoriti - nisu system resursi! BEST PRACTICE: Koristi try-with-resources za SVE AutoCloseable objekte!",
      "difficulty": "HARD",
      "options": [
        { "text": "FileReader i FileWriter", "isCorrect": true },
        { "text": "BufferedReader i BufferedWriter", "isCorrect": true },
        { "text": "ObjectInputStream i ObjectOutputStream", "isCorrect": true },
        { "text": "String i StringBuilder", "isCorrect": false },
        { "text": "Stream<Path> iz Files.list() i Files.walk()", "isCorrect": true },
        { "text": "Path objekti", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod s Formatter klasom kompilirati?",
      "codeSnippet": "import java.util.Formatter;\nimport java.io.*;\n\npublic class FormatterTest {\n    public static void main(String[] args) {\n        try (Formatter f1 = new Formatter(\"out1.txt\");\n             Formatter f2 = new Formatter(new File(\"out2.txt\"));\n             Formatter f3 = new Formatter(new FileOutputStream(\"out3.txt\"));\n             Formatter f4 = new Formatter(System.out)) {\n            \n            f1.format(\"%s %d%n\", \"Test\", 123);\n            f2.format(\"%s %d%n\", \"Test\", 123);\n            f3.format(\"%s %d%n\", \"Test\", 123);\n            f4.format(\"%s %d%n\", \"Test\", 123);\n            \n        } catch (FileNotFoundException e) {\n            e.printStackTrace();\n        }\n    }\n}",
      "explanation": "Kod se KOMPILIRA! Formatter ima VIŠE konstruktora koji su SVI validni: (1) new Formatter(String fileName) - kreira novu datoteku ili prepisuje postojeću. (2) new Formatter(File file) - isto ali prima File objekt. (3) new Formatter(OutputStream out) - formatira u bilo koji OutputStream. (4) new Formatter(Appendable a) - System.out implementira Appendable! SVE ČETIRI sintakse su ISPRAVNE. f1, f2, f3 pišu u RAZLIČITE datoteke. f4 piše na EKRAN! Formatter automatski zatvara file resurse (f1, f2, f3) ali NE zatvara System.out (f4) - to je safe! ZAMKA: Formatter(String) baca FileNotFoundException (checked exception) pa mora catch ili throws. Formatter također ima overloadane konstruktore s Charset-om i Locale-om za naprednu kontrolu!",
      "difficulty": "HARD",
      "options": [
        { "text": "Kompilira se - svi konstruktori Formatter-a su validni", "isCorrect": true },
        { "text": "Neće se kompilirati - Formatter ne prima File objekt", "isCorrect": false },
        { "text": "Neće se kompilirati - Formatter ne prima OutputStream", "isCorrect": false },
        { "text": "Kompilira se ali pada na f4 - System.out nije Appendable", "isCorrect": false },
        { "text": "Neće se kompilirati - ne može više Formatter-a u try-with-resources", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su TOČNE tvrdnje o serijalizaciji u Javi? (Odaberite sve točne)",
      "explanation": "Točne tvrdnje o serijalizaciji: (1) Klasa MORA implementirati Serializable sučelje - marker interface bez metoda, compile-time provjera. (2) transient polja se NE serijaliziraju - korisno za passwords, cache, thread-unsafe objekti. (3) static polja se NE serijaliziraju - pripadaju klasi, ne instanci. (4) Deserijalizacija NE poziva konstruktor - objekt se kreira direktno iz stream-a! (5) serialVersionUID je PREPORUČEN - kontrolira verzioniranje klase. (6) Sve reference objekta MORAJU biti serializable - inače NotSerializableException! NETOČNO: (A) Konstruktor SE poziva - NE poziva se! (B) Može se serijalizirati bez Serializable - NE može (NotSerializableException). Default serialVersionUID se generira automatski ako nije postavljen, ali je BOLJE postaviti eksplicitno.",
      "difficulty": "HARD",
      "options": [
        { "text": "Klasa mora implementirati Serializable sučelje", "isCorrect": true },
        { "text": "transient polja se NE serijaliziraju", "isCorrect": true },
        { "text": "static polja se NE serijaliziraju", "isCorrect": true },
        { "text": "Deserijalizacija poziva prazan konstruktor klase", "isCorrect": false },
        { "text": "serialVersionUID polje je obavezno za serijalizaciju", "isCorrect": false },
        { "text": "Svi referenced objekti moraju također biti Serializable", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će biti vrijednosti polja nakon deserijalizacije sljedećeg objekta?",
      "codeSnippet": "import java.io.*;\n\nclass Data implements Serializable {\n    private static final long serialVersionUID = 1L;\n    \n    private String name = \"Default\";\n    private transient String password = \"secret\";\n    private static String company = \"TechCorp\";\n    private final String type = \"Standard\";\n    \n    public Data(String name, String password) {\n        this.name = name;\n        this.password = password;\n        company = \"CustomCorp\";\n    }\n}\n\npublic class SerializationTest {\n    public static void main(String[] args) throws Exception {\n        Data original = new Data(\"Ana\", \"pass123\");\n        \n        // Serijalizacija\n        ObjectOutputStream out = new ObjectOutputStream(\n            new FileOutputStream(\"data.ser\"));\n        out.writeObject(original);\n        out.close();\n        \n        // Deserijalizacija\n        ObjectInputStream in = new ObjectInputStream(\n            new FileInputStream(\"data.ser\"));\n        Data restored = (Data) in.readObject();\n        in.close();\n        \n        System.out.println(restored.name);\n        System.out.println(restored.password);\n        System.out.println(Data.company);\n        System.out.println(restored.type);\n    }\n}",
      "explanation": "Ispisat će: 'Ana', 'null', 'CustomCorp', 'Standard'. (1) name = 'Ana' - NORMALNO serijalizirano i deserialized. (2) password = null - transient polja se NE serijaliziraju! Postaje DEFAULT vrijednost za tip (String = null). (3) company = 'CustomCorp' - static polja se NE serijaliziraju ALI static varijabla OSTAJE u memoriji od original objekta! Static nije dio instance pa deserijalizacija ne mijenja static. (4) type = 'Standard' - final polja SE serijaliziraju normalno. KLJUČNO: Deserijalizacija NE poziva konstruktor! Objekt se kreira DIREKTNO iz byte stream-a pa 'Default' inicijalizacija NE izvršava. transient polja dobivaju default vrijednosti (null, 0, false). Final transient bi bio null nakon deserijalizacije!",
      "difficulty": "HARD",
      "options": [
        { "text": "Ana, null, CustomCorp, Standard - transient je null, static ostaje, final se serijalizira", "isCorrect": true },
        { "text": "Ana, secret, TechCorp, Standard - sve se serijalizira", "isCorrect": false },
        { "text": "Default, null, TechCorp, Standard - konstruktor se poziva", "isCorrect": false },
        { "text": "Ana, secret, CustomCorp, Standard - transient se serijalizira", "isCorrect": false },
        { "text": "Neće se kompilirati - final polja ne mogu biti serijalizable", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su VALIDNI načini zapisivanja teksta u datoteku u Javi? (Odaberite sve točne)",
      "explanation": "Postoje MNOGI validni načini za zapisivanje u datoteku: (1) Files.writeString(path, text) - Java 11+, NAJJEDNOSTAVNIJE za String. (2) Files.write(path, bytes) - za byte array. (3) PrintWriter s FileWriter - klasičan način, automatsko flushing. (4) BufferedWriter s FileWriter - buffer za performance. (5) FileOutputStream.write() - low-level binarne operacije. (6) Files.newBufferedWriter(path).write() - NIO.2 način. (7) Formatter - formatiranje prije zapisa. SVE su validne ali s razlikama: writeString() = moderan, jednostavan. PrintWriter = println(), printf() metode. BufferedWriter = performance za velike količine. FileOutputStream = binarne datoteke. Formatter = formatiran ispis. Files metode mogu primiti StandardOpenOption (APPEND, CREATE, TRUNCATE_EXISTING)!",
      "difficulty": "HARD",
      "options": [
        { "text": "Files.writeString(Path.of(\"file.txt\"), \"content\")", "isCorrect": true },
        { "text": "new PrintWriter(new FileWriter(\"file.txt\")).println(\"content\")", "isCorrect": true },
        { "text": "Files.write(Path.of(\"file.txt\"), \"content\".getBytes())", "isCorrect": true },
        { "text": "Path.of(\"file.txt\").write(\"content\")", "isCorrect": false },
        { "text": "new BufferedWriter(new FileWriter(\"file.txt\")).write(\"content\")", "isCorrect": true },
        { "text": "new FileWriter(\"file.txt\").append(\"content\")", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Koliko različitih VALIDNIH načina otvaranja datoteke za pisanje je u sljedećem kodu?",
      "codeSnippet": "import java.io.*;\nimport java.nio.file.*;\n\npublic class FileWriteVariations {\n    public static void main(String[] args) throws IOException {\n        // Način 1\n        FileWriter fw1 = new FileWriter(\"file1.txt\");\n        \n        // Način 2\n        FileWriter fw2 = new FileWriter(new File(\"file2.txt\"));\n        \n        // Način 3\n        FileWriter fw3 = new FileWriter(\"file3.txt\", true);\n        \n        // Način 4\n        PrintWriter pw = new PrintWriter(\"file4.txt\");\n        \n        // Način 5\n        PrintWriter pw2 = new PrintWriter(new FileWriter(\"file5.txt\"));\n        \n        // Način 6\n        BufferedWriter bw = Files.newBufferedWriter(Path.of(\"file6.txt\"));\n        \n        // Način 7\n        FileOutputStream fos = new FileOutputStream(\"file7.txt\");\n        \n        // Način 8\n        BufferedWriter bw2 = new BufferedWriter(new FileWriter(\"file8.txt\"));\n    }\n}",
      "explanation": "SVI 8 načina su VALIDNI za pisanje u datoteku! (1) FileWriter(String) - overwrite existing. (2) FileWriter(File) - isto ali prima File. (3) FileWriter(String, boolean) - append mode ako je true. (4) PrintWriter(String) - direktno iz imena. (5) PrintWriter(FileWriter) - wrapper oko Writer-a. (6) Files.newBufferedWriter(Path) - NIO.2 moderan način. (7) FileOutputStream(String) - low-level binarne operacije. (8) BufferedWriter(FileWriter) - klasični buffered wrapper. RAZLIKE: FileWriter = basic, PrintWriter = println/printf metode, BufferedWriter = performance, FileOutputStream = bajtovi. Files.newBufferedWriter() je PREPORUČEN moderni način (Java 7+). Svi mogu se koristiti u try-with-resources! PrintWriter NE baca IOException pa je \"lakši\" ali manje explicit o greškama.",
      "difficulty": "HARD",
      "options": [
        { "text": "Svi 8 načina su validni - različite implementacije za različite potrebe", "isCorrect": true },
        { "text": "Samo 5 načina - način 3, 6, 8 nisu validni", "isCorrect": false },
        { "text": "Samo 4 načina - PrintWriter i BufferedWriter nisu za datoteke", "isCorrect": false },
        { "text": "6 načina - FileOutputStream nije za tekstualne datoteke", "isCorrect": false },
        { "text": "Nijedan nije validan - svi bacaju compile error", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih anotacija su VALIDNE za JAXB/Jakarta XML Binding? (Odaberite sve točne)",
      "explanation": "JAXB/Jakarta XML Binding ima MNOGO anotacija: (1) @XmlRootElement - označava root element XML-a, OBAVEZNA za top-level klase. (2) @XmlElement - mapira field u XML element, OPCIONALNA (defaultno koristi field name). (3) @XmlAttribute - mapira field u XML atribut umjesto elementa. (4) @XmlAccessorType - kontrolira koji fieldovi se serijaliziraju (FIELD, PROPERTY, PUBLIC_MEMBER, NONE). (5) @XmlTransient - ISKLJUČUJE field iz serijalizacije (kao transient za binary). (6) @XmlType - kontrolira redoslijed elemenata i namespace. @JsonProperty je za JSON-B, NE za XML! @Serializable NE POSTOJI - postoji samo Serializable interface. @XmlValue mapira field u text content elementa. @XmlElementWrapper kreira wrapper element za kolekcije. Većina anotacija je OPCIONALNA - JAXB može raditi s POJO klasama!",
      "difficulty": "HARD",
      "options": [
        { "text": "@XmlRootElement", "isCorrect": true },
        { "text": "@XmlElement", "isCorrect": true },
        { "text": "@XmlAttribute", "isCorrect": true },
        { "text": "@JsonProperty", "isCorrect": false },
        { "text": "@XmlAccessorType", "isCorrect": true },
        { "text": "@XmlTransient", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći JAXB kod kompilirati i raditi?",
      "codeSnippet": "import jakarta.xml.bind.annotation.*;\nimport jakarta.xml.bind.*;\nimport java.io.File;\n\n@XmlRootElement\nclass Book {\n    private String title;\n    private String author;\n    \n    // BEZ prazan konstruktora!\n    public Book(String title, String author) {\n        this.title = title;\n        this.author = author;\n    }\n    \n    public String getTitle() { return title; }\n    public void setTitle(String title) { this.title = title; }\n    public String getAuthor() { return author; }\n    public void setAuthor(String author) { this.author = author; }\n}\n\npublic class JAXBTest {\n    public static void main(String[] args) throws JAXBException {\n        Book book = new Book(\"Java Basics\", \"John Doe\");\n        \n        JAXBContext context = JAXBContext.newInstance(Book.class);\n        Marshaller marshaller = context.createMarshaller();\n        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);\n        \n        marshaller.marshal(book, new File(\"book.xml\"));\n    }\n}",
      "explanation": "Kod se NEĆE kompilirati normalno, ali će FAILATI u RUNTIME-u! Kompajler NE javlja grešku jer sintaksa je ispravna. ALI pri izvršavanju, JAXB će baciti exception: 'com.sun.xml.bind.v2.runtime.IllegalAnnotationsException: Book does not have a no-arg default constructor'. JAXB ZAHTIJEVA prazan konstruktor za deserijalizaciju! Pri marshalling-u (serijalizaciji) možda će raditi (ovisi o JAXB implementaciji), ali pri unmarshalling-u (deserijalizaciji) će SIGURNO failati jer JAXB mora kreirati objekt BEZ argumenata. Rješenje: Dodati 'public Book() {}' konstruktor. MOŽE biti private/protected, ali MORA postojati! Ovo je ČESTA zamka - klasa izgleda ispravno ali runtime failure. JAXB koristi reflection za kreiranje objekta pa treba no-arg konstruktor!",
      "difficulty": "HARD",
      "options": [
        { "text": "Kompilira se ali pada u runtime-u - nema no-arg konstruktora", "isCorrect": true },
        { "text": "Neće se kompilirati - @XmlRootElement zahtijeva prazan konstruktor", "isCorrect": false },
        { "text": "Kompilira se i radi - konstruktor nije obavezan za marshalling", "isCorrect": false },
        { "text": "Neće se kompilirati - Book klasa mora biti public", "isCorrect": false },
        { "text": "Kompilira se i radi normalno", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su TOČNE razlike između JAXB (XML) i JSON-B (JSON) serijalizacije? (Odaberite sve točne)",
      "explanation": "Ključne razlike XML vs JSON serijalizacije: (1) JAXB ZAHTIJEVA anotacije (@XmlRootElement), JSON-B NE zahtijeva (radi s POJO-ima). (2) JAXB ZAHTIJEVA no-arg konstruktor OBAVEZNO, JSON-B također preporučuje ali je fleksibilniji. (3) XML podržava ATRIBUTE (@XmlAttribute), JSON NE podržava (samo key-value parovi). (4) XML može imati NAMESPACE-e, JSON NE može. (5) JSON je KOMAKTNIJI - manja veličina datoteke (20-40% manje od XML-a). (6) JSON-B je BRŽI za parsing (~30% brže od JAXB-a). (7) XML ima XSD validaciju, JSON ima JSON Schema (manje korišten). OBOJE zahtijevaju getters/setters za public pristup! OBOJE podržavaju transient fields (@XmlTransient / @JsonbTransient). JSON je DOMINANTAN u modernim API-jima!",
      "difficulty": "HARD",
      "options": [
        { "text": "JAXB zahtijeva @XmlRootElement, JSON-B ne zahtijeva anotacije", "isCorrect": true },
        { "text": "JSON datoteke su obično manje od XML datoteka", "isCorrect": true },
        { "text": "XML podržava atribute, JSON ne", "isCorrect": true },
        { "text": "JSON-B je sporiji od JAXB-a zbog parsing overhead-a", "isCorrect": false },
        { "text": "JAXB MORA imati no-arg konstruktor, JSON-B ne", "isCorrect": false },
        { "text": "XML može imati namespace-e, JSON ne", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će biti sadržaj JSON datoteke nakon izvršavanja koda?",
      "codeSnippet": "import jakarta.json.bind.*;\nimport jakarta.json.bind.annotation.*;\nimport java.io.*;\nimport java.time.LocalDate;\n\nclass Product {\n    @JsonbProperty(\"product_id\")\n    private int id;\n    \n    private String name;\n    \n    @JsonbTransient\n    private String internalCode;\n    \n    @JsonbDateFormat(\"dd.MM.yyyy\")\n    private LocalDate createdDate;\n    \n    private transient String tempData;\n    \n    public Product() {}\n    \n    public Product(int id, String name, String internalCode, \n                   LocalDate date, String temp) {\n        this.id = id;\n        this.name = name;\n        this.internalCode = internalCode;\n        this.createdDate = date;\n        this.tempData = temp;\n    }\n    \n    // Svi getteri i setteri...\n}\n\npublic class JSONBTest {\n    public static void main(String[] args) throws Exception {\n        Product p = new Product(1, \"Laptop\", \"INT-001\", \n                               LocalDate.of(2024, 1, 15), \"TMP\");\n        \n        Jsonb jsonb = JsonbBuilder.create();\n        String json = jsonb.toJson(p);\n        \n        Files.writeString(Path.of(\"product.json\"), json);\n    }\n}",
      "explanation": "JSON će sadržavati: {\"product_id\":1,\"name\":\"Laptop\",\"createdDate\":\"15.01.2024\"}. ANALIZA: (1) id → 'product_id' zbog @JsonbProperty - custom ime u JSON-u. (2) name → 'name' - defaultno mapiranje. (3) internalCode → NIJE u JSON-u - @JsonbTransient ISKLJUČUJE field! (4) createdDate → '15.01.2024' - @JsonbDateFormat formatira datum. (5) tempData → NIJE u JSON-u - transient keyword također ISKLJUČUJE! @JsonbTransient i transient rade ISTO u JSON-B kontekstu. @JsonbProperty mijenja IME u JSON-u. @JsonbDateFormat kontrolira format datuma (defaultno bi bio ISO-8601: '2024-01-15'). Bez anotacija, sve public/package/protected fieldovi bi bili includeani s default imenima. @JsonbTransient > transient (eksplicitnije).",
      "difficulty": "HARD",
      "options": [
        { "text": "{\"product_id\":1,\"name\":\"Laptop\",\"createdDate\":\"15.01.2024\"}", "isCorrect": true },
        { "text": "{\"id\":1,\"name\":\"Laptop\",\"internalCode\":\"INT-001\",\"createdDate\":\"15.01.2024\"}", "isCorrect": false },
        { "text": "{\"product_id\":1,\"name\":\"Laptop\",\"createdDate\":\"2024-01-15\"}", "isCorrect": false },
        { "text": "{\"id\":1,\"name\":\"Laptop\",\"createdDate\":\"15.01.2024\",\"tempData\":\"TMP\"}", "isCorrect": false },
        { "text": "Neće se kompilirati - LocalDate nije podržan u JSON-B", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su VALIDNE JsonbConfig opcije u JSON-B? (Odaberite sve točne)",
      "explanation": "JsonbConfig omogućava MANY konfiguracije: (1) withFormatting(true) - pretty-print JSON s newlines i indentacijom. (2) withNullValues(true) - uključuje null vrijednosti u JSON (defaultno se preskaču). (3) withEncoding(\"UTF-8\") - postavlja character encoding. (4) withPropertyOrderStrategy() - kontrolira redoslijed fieldova (LEXICOGRAPHICAL, REVERSE, ANY). (5) withAdapters() - custom type adapteri za konverzije. (6) withPropertyNamingStrategy() - konvencije imenovanja (camelCase, kebab-case, snake_case). (7) withDateFormat() - globalni format za sve datume. (8) withBinaryDataStrategy() - kako encodirati binary data (BASE64, HEX). withStrictMode() NE POSTOJI! withPrettyPrint() NE POSTOJI - koristi se withFormatting(). Sve opcije su CHAINABLE - mogu se pozivati jedna za drugom!",
      "difficulty": "HARD",
      "options": [
        { "text": "withFormatting(true)", "isCorrect": true },
        { "text": "withNullValues(true)", "isCorrect": true },
        { "text": "withEncoding(\"UTF-8\")", "isCorrect": true },
        { "text": "withStrictMode(true)", "isCorrect": false },
        { "text": "withPropertyNamingStrategy(PropertyNamingStrategy.LOWER_CASE_WITH_UNDERSCORES)", "isCorrect": true },
        { "text": "withDateFormat(\"dd.MM.yyyy\", Locale.US)", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Koliko RAZLIČITIH načina kopiranja datoteke je validno u sljedećem kodu?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.*;\n\npublic class FileCopyVariations {\n    public static void main(String[] args) throws IOException {\n        // Način 1\n        Files.copy(Path.of(\"src.txt\"), Path.of(\"dst1.txt\"));\n        \n        // Način 2\n        Files.copy(Path.of(\"src.txt\"), Path.of(\"dst2.txt\"), \n                  StandardCopyOption.REPLACE_EXISTING);\n        \n        // Način 3\n        Files.copy(new FileInputStream(\"src.txt\"), \n                  Path.of(\"dst3.txt\"));\n        \n        // Način 4\n        Files.copy(Path.of(\"src.txt\"), \n                  new FileOutputStream(\"dst4.txt\"));\n        \n        // Način 5\n        try (FileInputStream in = new FileInputStream(\"src.txt\");\n             FileOutputStream out = new FileOutputStream(\"dst5.txt\")) {\n            byte[] buffer = new byte[1024];\n            int bytesRead;\n            while ((bytesRead = in.read(buffer)) != -1) {\n                out.write(buffer, 0, bytesRead);\n            }\n        }\n        \n        // Način 6\n        Files.copy(new File(\"src.txt\").toPath(), \n                  new File(\"dst6.txt\").toPath());\n    }\n}",
      "explanation": "SVI 6 načina su VALIDNI za kopiranje datoteke! (1) Files.copy(Path, Path) - osnovni Path to Path. (2) Files.copy(Path, Path, CopyOption) - s opcijama (REPLACE_EXISTING, COPY_ATTRIBUTES, ATOMIC_MOVE). (3) Files.copy(InputStream, Path) - iz streama u datoteku. (4) Files.copy(Path, OutputStream) - iz datoteke u stream. (5) Manual kopiranje s bufferom - klasičan low-level način. (6) File.toPath() konverzija pa copy - legacy File integracija. RAZLIKE: Način 1-2 = najviše efikasni (OS native operacije). Način 3-4 = fleksibilni za stream operacije. Način 5 = kontrola nad bufferom, progress tracking. Način 6 = migracija legacy koda. Files.copy() je ATOMIC za Path to Path! StandardCopyOption ima i ATOMIC_MOVE za move operacije.",
      "difficulty": "HARD",
      "options": [
        { "text": "Svi 6 načina su validni - različite implementacije za različite potrebe", "isCorrect": true },
        { "text": "Samo način 1 i 2 - ostali nisu podržani u Files klasi", "isCorrect": false },
        { "text": "Samo način 5 - Files.copy() ne prima Stream argumente", "isCorrect": false },
        { "text": "4 načina - način 3 i 4 bacaju compile error", "isCorrect": false },
        { "text": "Nijedan način nije validan za kopiranje", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih StandardOpenOption enuma su VALIDNE za Files.writeString()? (Odaberite sve točne)",
      "explanation": "Files.writeString() podržava VIŠE StandardOpenOption-a: (1) CREATE - kreira datoteku ako ne postoji (DEFAULT behaviour). (2) TRUNCATE_EXISTING - briše postojeći sadržaj (DEFAULT behaviour). (3) APPEND - dodaje na kraj postojeće datoteke. (4) CREATE_NEW - kreira samo ako NE postoji, inače FileAlreadyExistsException. (5) WRITE - otvara za pisanje (DEFAULT). (6) SYNC/DSYNC - synchronous I/O operacije. READ option NE radi s writeString() jer je to write operacija! DELETE_ON_CLOSE bi obrisao file nakon zatvaranja. SPARSE option za sparse files. DEFAULT behaviour (bez opcija): CREATE + TRUNCATE_EXISTING + WRITE. Za APPEND: Files.writeString(path, text, StandardOpenOption.CREATE, StandardOpenOption.APPEND). Opcije se mogu kombinirati varargs-om!",
      "difficulty": "HARD",
      "options": [
        { "text": "StandardOpenOption.CREATE", "isCorrect": true },
        { "text": "StandardOpenOption.APPEND", "isCorrect": true },
        { "text": "StandardOpenOption.TRUNCATE_EXISTING", "isCorrect": true },
        { "text": "StandardOpenOption.READ", "isCorrect": false },
        { "text": "StandardOpenOption.CREATE_NEW", "isCorrect": true },
        { "text": "StandardOpenOption.WRITE", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s Files utility metodama?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\nimport java.nio.charset.StandardCharsets;\n\npublic class FilesMethodsTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"test.txt\");\n        \n        // Način 1\n        Files.writeString(file, \"Line1\\n\");\n        Files.writeString(file, \"Line2\\n\", StandardOpenOption.APPEND);\n        Files.writeString(file, \"Line3\\n\", StandardOpenOption.APPEND);\n        \n        // Način 2\n        long lines1 = Files.lines(file).count();\n        \n        // Način 3\n        String content = Files.readString(file);\n        long lines2 = content.split(\"\\n\").length;\n        \n        // Način 4\n        long lines3 = Files.readAllLines(file).size();\n        \n        System.out.println(lines1 + \" \" + lines2 + \" \" + lines3);\n        \n        Files.delete(file);\n    }\n}",
      "explanation": "Ispisat će '3 3 3'. (1) writeString() + APPEND dodaje tekst - rezultat: 'Line1\\nLine2\\nLine3\\n'. (2) Files.lines(file).count() broji LINIJE (separatore \\n) = 3 linije. (3) readString() čita cijeli sadržaj, split('\\n') razdvaja = 3 elementa. (4) readAllLines() vraća List<String> s 3 elementa. SVE TRI METODE vraćaju 3! RAZLIKA: lines() koristi Stream (lazy), readString() učitava sve u memoriju, readAllLines() također sve u memoriju ali kao List. lines() je NAJBOLJI za VELIKE datoteke jer ne učitava sve odjednom! readString() je najjednostavniji za male datoteke. readAllLines() je za procesiranje liste linija. Files.lines() MORA se zatvoriti (try-with-resources), ostale metode NE moraju!",
      "difficulty": "HARD",
      "options": [
        { "text": "3 3 3 - sve tri metode vraćaju broj linija", "isCorrect": true },
        { "text": "3 4 3 - split() dodaje prazan element na kraju", "isCorrect": false },
        { "text": "4 4 4 - \\n na kraju se broji kao dodatna linija", "isCorrect": false },
        { "text": "Neće se kompilirati - readString() ne postoji", "isCorrect": false },
        { "text": "3 3 4 - readAllLines() broji drugačije", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih iznimki mogu baciti metode Files klase? (Odaberite sve točne)",
      "explanation": "Files metode bacaju RAZLIČITE checked iznimke: (1) IOException - generalna I/O greška, NAJČEŠĆA, PARENT iznimka svih ostalih. (2) NoSuchFileException - datoteka ne postoji (subclass IOException). (3) FileAlreadyExistsException - datoteka već postoji (CREATE_NEW mode). (4) DirectoryNotEmptyException - mapa nije prazna pri brisanju. (5) AccessDeniedException - nema permisije. (6) FileSystemException - file system problemi. (7) UnsupportedOperationException - nepodržana operacija (runtime, unchecked). SecurityException može se baciti za security managere. FileNotFoundException je OLD java.io iznimka, Files baca NoSuchFileException! SVE su subklase IOException osim UnsupportedOperationException (unchecked). Best practice: hvati specifične exceptions prije generalne IOException!",
      "difficulty": "HARD",
      "options": [
        { "text": "IOException", "isCorrect": true },
        { "text": "NoSuchFileException", "isCorrect": true },
        { "text": "FileAlreadyExistsException", "isCorrect": true },
        { "text": "FileNotFoundException", "isCorrect": false },
        { "text": "DirectoryNotEmptyException", "isCorrect": true },
        { "text": "AccessDeniedException", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod s BufferedReader kompilirati i raditi?",
      "codeSnippet": "import java.io.*;\nimport java.nio.file.*;\n\npublic class BufferedReaderVariations {\n    public static void main(String[] args) throws IOException {\n        // Način 1\n        BufferedReader br1 = new BufferedReader(\n            new FileReader(\"file.txt\"));\n        \n        // Način 2\n        BufferedReader br2 = new BufferedReader(\n            new InputStreamReader(\n                new FileInputStream(\"file.txt\")));\n        \n        // Način 3\n        BufferedReader br3 = Files.newBufferedReader(\n            Path.of(\"file.txt\"));\n        \n        // Način 4\n        BufferedReader br4 = new BufferedReader(\n            new InputStreamReader(\n                new FileInputStream(\"file.txt\"), \n                \"UTF-8\"));\n        \n        // Način 5\n        BufferedReader br5 = Files.newBufferedReader(\n            Path.of(\"file.txt\"), \n            java.nio.charset.StandardCharsets.UTF_8);\n        \n        // Svi bi trebali biti zatvoreni u try-with-resources!\n    }\n}",
      "explanation": "Kod se KOMPILIRA! SVI 5 načina su VALIDNI za kreiranje BufferedReadera: (1) BufferedReader(FileReader) - najjednostavniji, koristi default encoding platforme. (2) BufferedReader(InputStreamReader(FileInputStream)) - više kontrole, chain wrappera. (3) Files.newBufferedReader(Path) - moderan NIO.2 način, UTF-8 default. (4) Način 2 + eksplicitan encoding - BOLJE za cross-platform. (5) Files + Charset - NAJBOLJI način, siguran encoding. RAZLIKE: Način 1 = platform default encoding (problematično!). Način 3/5 = UTF-8 default (sigurno). Način 2/4 = kontrola nad encodingom. Files.newBufferedReader() je PREPORUČEN (Java 7+). Način 2/4 može baciti UnsupportedEncodingException ako encoding ne postoji. Svi moraju biti u try-with-resources!",
      "difficulty": "HARD",
      "options": [
        { "text": "Kompilira se - svi načini su validni za kreiranje BufferedReadera", "isCorrect": true },
        { "text": "Neće se kompilirati - način 4 ne prima String encoding", "isCorrect": false },
        { "text": "Kompilira se ali način 3 i 5 bacaju runtime error", "isCorrect": false },
        { "text": "Neće se kompilirati - Files.newBufferedReader() ne postoji", "isCorrect": false },
        { "text": "Kompilira se samo način 1 - ostali su deprecated", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih metoda Files klase NE zahtijevaju zatvaranje resursa? (Odaberite sve točne)",
      "explanation": "Files metode koje NE trebaju close(): (1) Files.readString() - čita sve u String pa automatski zatvara. (2) Files.readAllLines() - čita sve u List<String> pa zatvara. (3) Files.readAllBytes() - čita sve bajtove pa zatvara. (4) Files.writeString() - piše i automatski zatvara. (5) Files.write() - piše bajtove i zatvara. (6) Files.copy() - kopira i zatvara oboje. (7) Files.move() - premješta i zatvara. (8) Files.exists/size/getLastModifiedTime - metadata, nema stream. TREBAJU close(): (1) Files.lines() - vraća Stream<String>, MORA try-with-resources! (2) Files.list() - vraća Stream<Path>, MORA close! (3) Files.walk() - vraća Stream<Path>, MORA close! (4) Files.newBufferedReader/Writer - vraća Reader/Writer, MORA close! Pravilo: Ako metoda vraća Stream ili Reader/Writer, MORA se zatvoriti!",
      "difficulty": "HARD",
      "options": [
        { "text": "Files.readString()", "isCorrect": true },
        { "text": "Files.lines()", "isCorrect": false },
        { "text": "Files.readAllLines()", "isCorrect": true },
        { "text": "Files.list()", "isCorrect": false },
        { "text": "Files.writeString()", "isCorrect": true },
        { "text": "Files.walk()", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s DirectoryStream?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class DirectoryStreamTest {\n    public static void main(String[] args) throws IOException {\n        Path dir = Path.of(\".\");\n        \n        // Način 1 - bez filtera\n        long count1 = 0;\n        try (DirectoryStream<Path> stream1 = \n                Files.newDirectoryStream(dir)) {\n            for (Path p : stream1) {\n                count1++;\n            }\n        }\n        \n        // Način 2 - s glob filterom\n        long count2 = 0;\n        try (DirectoryStream<Path> stream2 = \n                Files.newDirectoryStream(dir, \"*.txt\")) {\n            for (Path p : stream2) {\n                count2++;\n            }\n        }\n        \n        // Način 3 - s lambdom\n        long count3 = 0;\n        try (DirectoryStream<Path> stream3 = \n                Files.newDirectoryStream(dir, \n                    path -> Files.isDirectory(path))) {\n            for (Path p : stream3) {\n                count3++;\n            }\n        }\n        \n        System.out.println(count1 >= count2);\n        System.out.println(count1 >= count3);\n        System.out.println((count2 + count3) <= count1);\n    }\n}",
      "explanation": "Ispisat će 'true', 'true', 'true'. DirectoryStream omogućava FILTRIRANJE tijekom iteracije: (1) count1 = SVE datoteke i mape u direktoriju (bez filtera). (2) count2 = samo *.txt datoteke (glob pattern filter). (3) count3 = samo DIREKTORIJI (lambda filter). count1 >= count2 je TRUE jer count1 uključuje SVE (pa i .txt files). count1 >= count3 je TRUE jer count1 uključuje SVE (pa i direktorije). (count2 + count3) <= count1 je TRUE jer count2 i count3 su PODSKUPOVI od count1 (mogu biti DISJOINT seti). DirectoryStream je ITERABLE ali NIJE Stream<Path>! Ne može se koristiti s .stream() metodama. newDirectoryStream() prima: (1) Path, (2) String glob pattern, (3) DirectoryStream.Filter<Path>. Glob: *.txt, *.{java,class}, **/*.txt (recursive).",
      "difficulty": "HARD",
      "options": [
        { "text": "true, true, true - count1 uključuje sve, count2 i count3 su podskupovi", "isCorrect": true },
        { "text": "false, false, false - svi su različiti brojevi", "isCorrect": false },
        { "text": "true, false, true - direktoriji nisu uključeni u count1", "isCorrect": false },
        { "text": "Neće se kompilirati - lambda ne može biti filter", "isCorrect": false },
        { "text": "true, true, false - zbroj može biti veći", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su VALIDNE glob patterns za DirectoryStream? (Odaberite sve točne)",
      "explanation": "DirectoryStream podržava GLOB PATTERNS (shell-style): (1) *.txt - sve .txt datoteke. (2) *.{java,class} - sve .java ILI .class datoteke (brace expansion). (3) test?.txt - test + jedan znak + .txt (test1.txt, testA.txt). (4) [abc]*.txt - počinje s a, b ili c, završava s .txt. (5) **/*.txt - REKURZIVNO sve .txt datoteke u svim podmapama (ako se koristi s FileSystem). (6) [!a]*.txt - NE počinje s 'a' (negacija). Glob META-CHARACTERS: * (bilo koji znakovi), ? (jedan znak), [ ] (character class), { } (group), ** (rekurzivno). Regex patterns se NE koriste direktno - glob je JEDNOSTAVNIJI! Za regex koristiti PathMatcher ili custom filter. **.txt NE radi - mora biti **/*.txt za rekurziju!",
      "difficulty": "HARD",
      "options": [
        { "text": "*.txt", "isCorrect": true },
        { "text": "*.{java,class}", "isCorrect": true },
        { "text": "test?.txt", "isCorrect": true },
        { "text": "\\d+\\.txt (regex)", "isCorrect": false },
        { "text": "[abc]*.txt", "isCorrect": true },
        { "text": "**/*.txt (rekurzivno)", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Koliko različitih VALIDNIH načina brisanja datoteke postoji u sljedećem kodu?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.*;\n\npublic class FileDeleteVariations {\n    public static void main(String[] args) throws IOException {\n        // Način 1\n        Files.delete(Path.of(\"file1.txt\"));\n        \n        // Način 2\n        Files.deleteIfExists(Path.of(\"file2.txt\"));\n        \n        // Način 3\n        boolean deleted = new File(\"file3.txt\").delete();\n        \n        // Način 4\n        Path path = Path.of(\"file4.txt\");\n        if (Files.exists(path)) {\n            Files.delete(path);\n        }\n        \n        // Način 5\n        Files.deleteIfExists(Path.of(\"file5.txt\"));\n        // (funkcionalno isto kao način 2)\n    }\n}",
      "explanation": "Postoje 3 RAZLIČITA pristupa brisanju (način 2 i 5 su isti): (1) Files.delete(path) - baca NoSuchFileException ako ne postoji. (2) Files.deleteIfExists(path) - vraća boolean, NE baca exception ako ne postoji. (3) File.delete() - legacy način, vraća boolean. (4) Način 4 = kombinacija exists() + delete() - REDUNDANTNO jer deleteIfExists() radi isto! RAZLIKE: Files.delete() = exception ako ne postoji (striktno). Files.deleteIfExists() = safe, ne baca exception. File.delete() = legacy, slabije error reporting. Files metode bacaju DETALJNE exceptions (AccessDeniedException, DirectoryNotEmptyException). File.delete() samo vraća false! PREPORUKA: Koristi Files.deleteIfExists() za većinu slučajeva. Files.delete() kada MORA postojati (catch NoSuchFileException za error handling).",
      "difficulty": "HARD",
      "options": [
        { "text": "3 različita načina - Files.delete, Files.deleteIfExists, File.delete", "isCorrect": true },
        { "text": "5 različitih načina - svaki je unique", "isCorrect": false },
        { "text": "2 načina - samo Files metode su validne", "isCorrect": false },
        { "text": "4 načina - način 2 i 5 su različiti", "isCorrect": false },
        { "text": "1 način - samo Files.delete() je ispravan", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su TOČNE tvrdnje o Scanner klasi za čitanje datoteka? (Odaberite sve točne)",
      "explanation": "Scanner karakteristike: (1) Scanner može čitati iz File, InputStream, Path, String, Readable. (2) Scanner.nextLine() čita CIJELU liniju do \\n. (3) Scanner.next() čita RIJEČ (do whitespace-a). (4) Scanner ima nextInt(), nextDouble(), hasNextInt() - typed input metode. (5) Scanner NE buffira efikasno kao BufferedReader - SPORIJI za velike datoteke! (6) Scanner.useDelimiter() postavlja custom delimiter (defaultno whitespace). (7) Scanner je Closeable - MORA se zatvoriti! NETOČNO: Scanner JE thread-safe - NIJE thread-safe! Scanner je JEDNOSTAVNIJI za parsing (nextInt, nextDouble) ali SPORIJI od BufferedReader. Za VELIKE datoteke: BufferedReader. Za PARSING podataka: Scanner. Scanner može koristiti regex patterns za delimiter!",
      "difficulty": "HARD",
      "options": [
        { "text": "Scanner može čitati iz File, InputStream, Path", "isCorrect": true },
        { "text": "Scanner.nextLine() čita cijelu liniju", "isCorrect": true },
        { "text": "Scanner je brži od BufferedReadera za velike datoteke", "isCorrect": false },
        { "text": "Scanner ima typed metode (nextInt, nextDouble)", "isCorrect": true },
        { "text": "Scanner je thread-safe", "isCorrect": false },
        { "text": "Scanner mora biti zatvoren nakon korištenja", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s Scanner delimiterom?",
      "codeSnippet": "import java.util.Scanner;\nimport java.io.*;\n\npublic class ScannerDelimiterTest {\n    public static void main(String[] args) throws IOException {\n        String content = \"apple,banana,cherry,date\";\n        \n        // Scanner 1 - default delimiter\n        Scanner sc1 = new Scanner(content);\n        int count1 = 0;\n        while (sc1.hasNext()) {\n            sc1.next();\n            count1++;\n        }\n        \n        // Scanner 2 - comma delimiter\n        Scanner sc2 = new Scanner(content);\n        sc2.useDelimiter(\",\");\n        int count2 = 0;\n        while (sc2.hasNext()) {\n            sc2.next();\n            count2++;\n        }\n        \n        // Scanner 3 - cijeli sadržaj kao jedan token\n        Scanner sc3 = new Scanner(content);\n        sc3.useDelimiter(\"\\\\Z\");\n        int count3 = 0;\n        while (sc3.hasNext()) {\n            sc3.next();\n            count3++;\n        }\n        \n        System.out.println(count1 + \" \" + count2 + \" \" + count3);\n    }\n}",
      "explanation": "Ispisat će '1 4 1'. (1) count1 = 1 - default delimiter je WHITESPACE (\\s+), 'apple,banana,cherry,date' je JEDAN token bez razmaka! (2) count2 = 4 - delimiter je ',', pa se dijeli na: 'apple', 'banana', 'cherry', 'date' = 4 tokena. (3) count3 = 1 - '\\\\Z' je END OF INPUT regex, znači CIJELI sadržaj je jedan token. useDelimiter() prima REGEX pattern! Default delimiter: Pattern.compile('\\\\p{javaWhitespace}+') = whitespace. '\\\\Z' match-a end of input pa nikad ne dijeli. Drugi korisni delimiteri: ',' za CSV, '\\\\s*,\\\\s*' za CSV s opcionalnim razmacima, '\\\\|' za pipe-delimited, '\\n' za liniju po liniju. Scanner.reset() vraća delimiter na default!",
      "difficulty": "HARD",
      "options": [
        { "text": "1 4 1 - default je whitespace, comma dijeli, \\\\Z ne dijeli", "isCorrect": true },
        { "text": "4 4 1 - default također dijeli po comma", "isCorrect": false },
        { "text": "1 1 1 - svi vraćaju cijeli string", "isCorrect": false },
        { "text": "Neće se kompilirati - useDelimiter ne prima String", "isCorrect": false },
        { "text": "4 4 4 - svi dijele jednako", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su VALIDNI načini čitanja binary podataka iz datoteke? (Odaberite sve točne)",
      "explanation": "Binary čitanje ima VIŠE načina: (1) FileInputStream.read() - čita bajt po bajt (low-level). (2) Files.readAllBytes(path) - čita sve bajtove odjednom u byte[]. (3) BufferedInputStream - wrapper za efikasniji buffering. (4) DataInputStream - čita typed podatke (readInt, readDouble, readUTF). (5) ObjectInputStream - deserijalizacija objekata. (6) FileChannel + ByteBuffer - NIO.2 advanced, memory-mapped files. (7) RandomAccessFile - random access s seek(). SVE su validni za binarne podatke! FileReader/BufferedReader su za TEKSTUALNE datoteke (znakovi). RAZLIKE: FileInputStream = basic bytes, DataInputStream = typed data, ObjectInputStream = objekti, FileChannel = advanced NIO. Za MALE datoteke: readAllBytes(). Za VELIKE: stream s bufferom. Za RANDOM ACCESS: RandomAccessFile ili FileChannel.",
      "difficulty": "HARD",
      "options": [
        { "text": "FileInputStream.read()", "isCorrect": true },
        { "text": "Files.readAllBytes(Path)", "isCorrect": true },
        { "text": "DataInputStream", "isCorrect": true },
        { "text": "FileReader", "isCorrect": false },
        { "text": "ObjectInputStream", "isCorrect": true },
        { "text": "BufferedReader", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će biti rezultat izvršavanja sljedećeg koda s DataInputStream i DataOutputStream?",
      "codeSnippet": "import java.io.*;\n\npublic class DataStreamTest {\n    public static void main(String[] args) throws IOException {\n        String filename = \"data.bin\";\n        \n        // Zapisivanje\n        try (DataOutputStream dos = new DataOutputStream(\n                new FileOutputStream(filename))) {\n            dos.writeInt(42);\n            dos.writeDouble(3.14);\n            dos.writeUTF(\"Hello\");\n            dos.writeBoolean(true);\n        }\n        \n        // Čitanje - KRIVI redoslijed!\n        try (DataInputStream dis = new DataInputStream(\n                new FileInputStream(filename))) {\n            double d = dis.readDouble();\n            int i = dis.readInt();\n            String s = dis.readUTF();\n            boolean b = dis.readBoolean();\n            \n            System.out.println(i + \" \" + d + \" \" + s + \" \" + b);\n        }\n    }\n}",
      "explanation": "Kod će FAILATI u runtime-u s IOException ili pogrešnim podacima! DataInputStream i DataOutputStream MORAJU čitati podatke u ISTOM REDOSLIJEDU kako su zapisani! Zapisano: int (4 bytes), double (8 bytes), UTF String, boolean (1 byte). Čitano: double PRVO (očekuje 8 bytes ali čita gdje je int!), pa int (čita dio double-a), etc. Rezultat: GARBAGE podaci ili exception! KLJUČNO: redoslijed MORA biti identičan! Pravilno čitanje: readInt(), readDouble(), readUTF(), readBoolean(). DataStreams pišu BINARY format s FIXED velikostima tipova. UTF format ima length prefix (2 bytes) + data. Ovo je ČESTA zamka - DEV mora paziti na redoslijed! Za FLEKSIBILNOST koristiti ObjectInputStream ili JSON/XML.",
      "difficulty": "HARD",
      "options": [
        { "text": "Pada u runtime-u ili vraća garbage - redoslijed čitanja ne odgovara zapisivanju", "isCorrect": true },
        { "text": "Ispisuje: 42 3.14 Hello true - automatski konvertira tipove", "isCorrect": false },
        { "text": "Neće se kompilirati - readDouble() ne može biti prvi", "isCorrect": false },
        { "text": "Ispisuje: 0 0.0 null false - default vrijednosti", "isCorrect": false },
        { "text": "Radi ispravno - DataInputStream automatski parsira tipove", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su TOČNE tvrdnje o RandomAccessFile klasi? (Odaberite sve točne)",
      "explanation": "RandomAccessFile karakteristike: (1) Omogućava RANDOM ACCESS - može se pozicionirati bilo gdje u datoteci s seek(). (2) Može se otvoriti u 'r' (read-only), 'rw' (read-write), 'rws' (sync content+metadata), 'rwd' (sync content) modovima. (3) Ima getFilePointer() za trenutnu poziciju i length() za veličinu datoteke. (4) Podržava readInt(), writeInt(), readUTF(), writeUTF() kao DataInputStream/OutputStream. (5) Može MIJENJATI dio datoteke bez rewritea cijele datoteke. (6) Koristi se za DATABASE FILES, INDEX FILES, BINARY FORMATS gdje treba random access. NETOČNO: NE može se koristiti s try-with-resources - MOŽE, implementira Closeable! NE radi samo s binarnim datotekama - radi s SVE tipovima. RandomAccessFile je LEGACY (Java 1.0) ali još uvijek KORISTAN. Modernija alternativa: FileChannel (NIO.2).",
      "difficulty": "HARD",
      "options": [
        { "text": "Omogućava pozicioniranje bilo gdje u datoteci s seek()", "isCorrect": true },
        { "text": "Može se otvoriti u read-only ili read-write modu", "isCorrect": true },
        { "text": "Podržava typed read/write metode (readInt, writeDouble)", "isCorrect": true },
        { "text": "Ne može se koristiti s try-with-resources", "isCorrect": false },
        { "text": "Može modificirati dio datoteke bez rewritea cijele", "isCorrect": true },
        { "text": "Radi samo s binarnim datotekama", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod s RandomAccessFile kompilirati i što će ispisati?",
      "codeSnippet": "import java.io.*;\n\npublic class RandomAccessTest {\n    public static void main(String[] args) throws IOException {\n        String filename = \"test.dat\";\n        \n        // Zapisivanje\n        try (RandomAccessFile raf = new RandomAccessFile(filename, \"rw\")) {\n            raf.writeInt(100);        // pozicija 0-3\n            raf.writeDouble(3.14);    // pozicija 4-11\n            raf.writeUTF(\"Java\");     // pozicija 12+\n        }\n        \n        // Čitanje od kraja prema početku\n        try (RandomAccessFile raf = new RandomAccessFile(filename, \"r\")) {\n            long len = raf.length();\n            System.out.println(\"Duljina: \" + len);\n            \n            // Preskoči int i double, čitaj String\n            raf.seek(12);\n            String s = raf.readUTF();\n            \n            // Vrati se na početak, čitaj int\n            raf.seek(0);\n            int i = raf.readInt();\n            \n            // Čitaj double\n            double d = raf.readDouble();\n            \n            System.out.println(i + \" \" + d + \" \" + s);\n        }\n    }\n}",
      "explanation": "Kod se kompilira i ispisuje: 'Duljina: 18', '100 3.14 Java'. RandomAccessFile omogućava BILO KOJI redoslijed čitanja! (1) writeInt(100) = 4 bajta (0-3). (2) writeDouble(3.14) = 8 bajtova (4-11). (3) writeUTF('Java') = 2 bytes (length) + 4 bytes (chars) = 6 bajtova (12-17). Ukupno = 18 bajtova. seek(12) pozicionira na String. seek(0) vraća na početak. readInt() + readDouble() čitaju u ISPRAVNOM redoslijedu od pozicije 0. UTF format: 2-byte length prefix + UTF-8 encoded characters. seek() radi s BYTE pozicijom, ne sa 'field' pozicijom! getFilePointer() vraća trenutnu poziciju. skipBytes(n) preskače n bajtova naprijed. RandomAccessFile je MOĆAN za complex file formats!",
      "difficulty": "HARD",
      "options": [
        { "text": "Kompilira se i ispisuje: Duljina: 18, 100 3.14 Java", "isCorrect": true },
        { "text": "Neće se kompilirati - seek() ne prima long", "isCorrect": false },
        { "text": "Kompilira se ali pada - ne može čitati unatrag", "isCorrect": false },
        { "text": "Ispisuje: Duljina: 16, 100 3.14 Java", "isCorrect": false },
        { "text": "Neće se kompilirati - mode 'r' ne dozvoljava seek()", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su VALIDNE Character encoding opcije u Javi? (Odaberite sve točne)",
      "explanation": "Java podržava MNOGE character encodinge: (1) StandardCharsets.UTF_8 - UNIVERSAL, 1-4 bytes po character, PREPORUČEN! (2) StandardCharsets.ISO_8859_1 (Latin-1) - 1 byte po character, Western European. (3) StandardCharsets.US_ASCII - 7-bit ASCII, samo engleski. (4) StandardCharsets.UTF_16 - 2 ili 4 bytes, Java interno koristi. (5) Charset.forName('Windows-1252') - legacy Windows encoding. (6) Charset.defaultCharset() - platform default (OPASNO za cross-platform!). StandardCharsets su KONSTANTE (Java 7+) - BRŽE od Charset.forName(). UTF-8 je DEFAULT u većini Files metoda (readString, writeString). UTF-16 je internal Java String format. NAJBOLJA PRAKSA: UVIJEK koristiti UTF-8 eksplicitno za cross-platform compatibility! Charset.availableCharsets() vraća SVE dostupne.",
      "difficulty": "HARD",
      "options": [
        { "text": "StandardCharsets.UTF_8", "isCorrect": true },
        { "text": "StandardCharsets.ISO_8859_1", "isCorrect": true },
        { "text": "StandardCharsets.US_ASCII", "isCorrect": true },
        { "text": "StandardCharsets.UNICODE (ne postoji)", "isCorrect": false },
        { "text": "Charset.forName(\"Windows-1252\")", "isCorrect": true },
        { "text": "StandardCharsets.UTF_16", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će biti RAZLIČITO u sljedećem kodu pri korištenju različitih encodinga?",
      "codeSnippet": "import java.nio.file.*;\nimport java.nio.charset.*;\nimport java.io.IOException;\n\npublic class EncodingTest {\n    public static void main(String[] args) throws IOException {\n        String text = \"Čovjek živi život!\";\n        Path file = Path.of(\"test.txt\");\n        \n        // UTF-8 encoding\n        Files.writeString(file, text, StandardCharsets.UTF_8);\n        long size1 = Files.size(file);\n        String read1 = Files.readString(file, StandardCharsets.UTF_8);\n        \n        // ISO-8859-1 encoding\n        Files.writeString(file, text, StandardCharsets.ISO_8859_1);\n        long size2 = Files.size(file);\n        String read2 = Files.readString(file, StandardCharsets.ISO_8859_1);\n        \n        // ASCII encoding - problem!\n        Files.writeString(file, text, StandardCharsets.US_ASCII);\n        long size3 = Files.size(file);\n        String read3 = Files.readString(file, StandardCharsets.US_ASCII);\n        \n        System.out.println(\"UTF-8 size: \" + size1 + \", match: \" + text.equals(read1));\n        System.out.println(\"ISO size: \" + size2 + \", match: \" + text.equals(read2));\n        System.out.println(\"ASCII size: \" + size3 + \", match: \" + text.equals(read3));\n    }\n}",
      "explanation": "Rezultat: 'UTF-8 size: 21, match: true', 'ISO size: 18, match: true', 'ASCII size: 18, match: false'. ANALIZA: (1) UTF-8: 'Č' = 2 bytes, 'ž' = 2 bytes, 'ž' = 2 bytes, ostalo 1 byte = ~21 bytes. Sve radi PERFEKTNO. (2) ISO-8859-1: Croatian znakovi SU podržani (Latin-1 extension), sve 1 byte = 18 bytes. Radi OK. (3) US-ASCII: Croatian znakovi NISU podržani! 'Č', 'ž', 'ž' se zamjenjuju s '?' ili se gube. size = 18 ali read3 != text (CORRUPTION)! UTF-8 je NAJVEĆA datoteka ali SAFEST. ISO-8859-1 manji ali limited characters. ASCII NAJMANJI ali gubi podatke! LEKCIJA: UVIJEK koristi UTF-8 za international text! Charset mismatch između write i read uzrokuje MOJIBAKE (corruption).",
      "difficulty": "HARD",
      "options": [
        { "text": "UTF-8 ~21 bytes (radi), ISO ~18 (radi), ASCII ~18 (corrupted)", "isCorrect": true },
        { "text": "Sve tri iste veličine - encoding ne utječe na veličinu", "isCorrect": false },
        { "text": "ASCII baca exception - ne podržava hrvatske znakove", "isCorrect": false },
        { "text": "UTF-8 najmanji, ASCII najveći", "isCorrect": false },
        { "text": "Sve tri corrupt podatke - treba koristiti UTF-16", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su NAJBOLJE prakse pri radu s datotekama u Javi? (Odaberite sve točne)",
      "explanation": "Best practices za datoteke: (1) UVIJEK koristi try-with-resources za AutoCloseable resurse - automatsko zatvaranje! (2) Koristi NIO.2 (java.nio.file) umjesto starog java.io.File - moderniji, bolji API. (3) Koristi UTF-8 encoding EKSPLICITNO - cross-platform compatibility. (4) Koristi Files.lines() za VELIKE datoteke - ne učitava sve u memoriju. (5) Koristi BufferedReader/Writer za BOLJE performanse. (6) Hvati SPECIFIČNE iznimke prije generalne IOException - bolji error handling. (7) Validiraj putanje prije operacija (exists, isReadable, isWritable). (8) Koristi Path umjesto String za putanje - type-safe. LOŠE prakse: Koristiti platform default encoding (problem!), ne zatvarati resurse, koristiti File.delete() umjesto Files.delete() (slabo error reporting), čitati velike datoteke u memoriju odjednom.",
      "difficulty": "HARD",
      "options": [
        { "text": "Koristi try-with-resources za sve AutoCloseable resurse", "isCorrect": true },
        { "text": "Koristi NIO.2 (java.nio.file) umjesto java.io.File", "isCorrect": true },
        { "text": "Koristi UTF-8 encoding eksplicitno", "isCorrect": true },
        { "text": "Koristi platform default encoding za cross-platform compatibility", "isCorrect": false },
        { "text": "Koristi Files.lines() za velike datoteke umjesto readAllLines()", "isCorrect": true },
        { "text": "Ne provjeravaj postojanje datoteke - exception će se baciti automatski", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Koliko različitih načina kreiranje privremene datoteke je validno u sljedećem kodu?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.*;\n\npublic class TempFileTest {\n    public static void main(String[] args) throws IOException {\n        // Način 1 - temp file u default temp direktoriju\n        Path temp1 = Files.createTempFile(\"prefix\", \".txt\");\n        \n        // Način 2 - temp file u custom direktoriju\n        Path temp2 = Files.createTempFile(\n            Path.of(\".\"), \"prefix\", \".txt\");\n        \n        // Način 3 - temp file s null prefix/suffix\n        Path temp3 = Files.createTempFile(null, null);\n        \n        // Način 4 - temp direktorij\n        Path tempDir = Files.createTempDirectory(\"mydir\");\n        Path temp4 = tempDir.resolve(\"file.txt\");\n        Files.createFile(temp4);\n        \n        // Način 5 - File.createTempFile (legacy)\n        File temp5 = File.createTempFile(\"prefix\", \".txt\");\n        \n        // Način 6 - s FileAttribute\n        Path temp6 = Files.createTempFile(\"prefix\", \".txt\",\n            PosixFilePermissions.asFileAttribute(\n                PosixFilePermissions.fromString(\"rw-------\")));\n        \n        System.out.println(\"Sve temp datoteke kreirane!\");\n    }\n}",
      "explanation": "SVI načini su VALIDNI (način 6 samo na Unix/Linux)! (1) createTempFile(prefix, suffix) - u system temp dir (System.getProperty('java.io.tmpdir')). (2) createTempFile(dir, prefix, suffix) - u custom direktoriju. (3) createTempFile(null, null) - RADI! Generira random naziv ako je null. (4) createTempDirectory() + resolve() + createFile() - ručno u temp dir. (5) File.createTempFile() - LEGACY način ali još uvijek radi. (6) createTempFile() + FileAttribute - s permisijama (POSIX only). VAŽNO: Temp datoteke se NE brišu automatski! Treba ručno brisati ili koristiti deleteOnExit() (ne preporučeno - memory leak). NAJBOLJE: try-with-resources + finally block s Files.deleteIfExists(). createTempFile garantira UNIQUE ime s random numbers!",
      "difficulty": "HARD",
      "options": [
        { "text": "Svi načini su validni - različite opcije za temp datoteke", "isCorrect": true },
        { "text": "Samo način 1 i 2 - ostali nisu podržani", "isCorrect": false },
        { "text": "Način 3 neće raditi - ne može biti null", "isCorrect": false },
        { "text": "Način 5 je deprecated i ne radi", "isCorrect": false },
        { "text": "Samo 4 načina - način 4 i 6 nisu validni", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih operacija s Files klasom su ATOMIČNE? (Odaberite sve točne)",
      "explanation": "Atomične operacije u Files klasi: (1) Files.move() s ATOMIC_MOVE option - garantirano atomic ili exception. (2) Files.createFile() - atomic kreiranje (fails ako postoji). (3) Files.createDirectory() - atomic kreiranje direktorija. (4) Files.delete() - atomic brisanje. NISU atomične: (1) Files.copy() - NE garantira atomicity (može partial copy pri failure). (2) Files.write() - može biti partial write pri failure. (3) Files.readString/readAllLines() - čitanje nije atomično (file može se mijenjati tijekom čitanja). ATOMIC_MOVE omogućava rename/move u JEDNOJ operaciji (kritično za databases, concurrent access). KLJUČNO: Atomic znači POTPUNO ili NIŠTA - nema partial states. Files.move() bez ATOMIC_MOVE NIJE garantirano atomic! StandardCopyOption.ATOMIC_MOVE baca AtomicMoveNotSupportedException ako nije podržano (npr. cross-filesystem move).",
      "difficulty": "HARD",
      "options": [
        { "text": "Files.move() s ATOMIC_MOVE option", "isCorrect": true },
        { "text": "Files.createFile()", "isCorrect": true },
        { "text": "Files.delete()", "isCorrect": true },
        { "text": "Files.copy()", "isCorrect": false },
        { "text": "Files.write()", "isCorrect": false },
        { "text": "Files.createDirectory()", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će se dogoditi pri izvršavanju sljedećeg koda s file locking-om?",
      "codeSnippet": "import java.nio.channels.*;\nimport java.nio.file.*;\nimport java.io.*;\n\npublic class FileLockTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"locked.txt\");\n        Files.writeString(file, \"Initial content\");\n        \n        try (FileChannel channel = FileChannel.open(file, \n                StandardOpenOption.WRITE,\n                StandardOpenOption.READ)) {\n            \n            // Ekskluzivni lock\n            FileLock lock = channel.lock();\n            System.out.println(\"Lock acquired: \" + lock.isValid());\n            System.out.println(\"Shared: \" + lock.isShared());\n            \n            // Modifikacija dok je locked\n            Files.writeString(file, \"Modified content\",\n                StandardOpenOption.WRITE,\n                StandardOpenOption.TRUNCATE_EXISTING);\n            \n            lock.release();\n            System.out.println(\"Lock released\");\n        }\n        \n        System.out.println(Files.readString(file));\n    }\n}",
      "explanation": "Kod se kompilira i ispisuje: 'Lock acquired: true', 'Shared: false', 'Lock released', 'Modified content'. FileLock omogućava COORDINACIJU između procesa! (1) channel.lock() dobiva EKSKLUZIVNI lock (drugi procesi NE mogu pisati ili čitati dok je locked). (2) isShared() vraća false - ovo je exclusive lock. (3) Files.writeString() UNUTAR istog procesa RADI jer isti proces drži lock! (4) Drugi proces bi bio BLOKIRAN ili dobio OverlappingFileLockException. (5) lock.release() oslobađa lock. FileLock je za INTER-PROCESS synchronizaciju, NE thread synchronizaciju! tryLock() je non-blocking verzija (vraća null ako ne može dobiti lock). lock(position, size, shared) za PARTIAL file lock. FileLock je automatski released pri zatvaranju channel-a!",
      "difficulty": "HARD",
      "options": [
        { "text": "Radi i ispisuje: true, false, Lock released, Modified content", "isCorrect": true },
        { "text": "Pada na Files.writeString() - ne može pisati dok je locked", "isCorrect": false },
        { "text": "Neće se kompilirati - channel.lock() ne postoji", "isCorrect": false },
        { "text": "Pada s OverlappingFileLockException", "isCorrect": false },
        { "text": "isShared() vraća true - svi lockovi su shared", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su TOČNE tvrdnje o memory-mapped files (MappedByteBuffer)? (Odaberite sve točne)",
      "explanation": "Memory-mapped files (FileChannel.map()): (1) Mapiraju file content direktno u memoriju - OS handla I/O. (2) EKSTREMNO BRZI za VELIKE datoteke - nema explicit read/write poziva! (3) Koriste se za HIGH-PERFORMANCE applications, databases, scientific computing. (4) FileChannel.map() vraća MappedByteBuffer koji je DirectByteBuffer. (5) Izmjene su automatski sinkronizirane s datotekom (force() za immediate flush). (6) MapMode može biti READ_ONLY, READ_WRITE, PRIVATE (copy-on-write). LIMITACIJE: (1) Zauzimaju virtual address space (problem na 32-bit JVM). (2) Ne mogu se unmap eksplicitno - čekaju GC! (3) mogu biti slow za MALE datoteke (overhead). NAJBOLJE za: Large files (>100MB), random access, high performance I/O. Memory-mapped je OS feature - Java je wrapper!",
      "difficulty": "HARD",
      "options": [
        { "text": "Mapiraju file content direktno u memoriju", "isCorrect": true },
        { "text": "Ekstremno brzi za velike datoteke", "isCorrect": true },
        { "text": "Koriste FileChannel.map() metodu", "isCorrect": true },
        { "text": "Mogu se eksplicitno unmap s close() metodom", "isCorrect": false },
        { "text": "Uvijek brži od normalnih I/O operacija", "isCorrect": false },
        { "text": "Izmjene automatski sinkronizirane s datotekom", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod s WatchService kompilirati?",
      "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\nimport static java.nio.file.StandardWatchEventKinds.*;\n\npublic class WatchServiceTest {\n    public static void main(String[] args) throws IOException, InterruptedException {\n        Path dir = Path.of(\".\");\n        \n        try (WatchService watcher = FileSystems.getDefault().newWatchService()) {\n            \n            // Registriraj directory za monitoring\n            dir.register(watcher, \n                ENTRY_CREATE,\n                ENTRY_DELETE,\n                ENTRY_MODIFY);\n            \n            System.out.println(\"Monitoring directory: \" + dir);\n            \n            // Čekaj na event (blocking)\n            WatchKey key = watcher.take();\n            \n            for (WatchEvent<?> event : key.pollEvents()) {\n                WatchEvent.Kind<?> kind = event.kind();\n                Path filename = (Path) event.context();\n                \n                System.out.println(kind.name() + \": \" + filename);\n            }\n            \n            key.reset();\n        }\n    }\n}",
      "explanation": "Kod se KOMPILIRA i radi! WatchService omogućava MONITORING file system promjena: (1) newWatchService() kreira watcher. (2) dir.register() registrira direktorij za praćenje ENTRY_CREATE, ENTRY_DELETE, ENTRY_MODIFY evenata. (3) watcher.take() BLOKIRA dok ne dođe event (poll() je non-blocking). (4) key.pollEvents() vraća listu evenata. (5) event.context() vraća Path za promijenjenu datoteku. (6) key.reset() vraća key u ready state za nove evente. WatchService radi ASINKRONO - thread čeka na evente! OVERFLOW event znači da su eventi izgubljeni (buffer full). register() ne prati PODIREKTORIJE - mora se rekurzivno registrirati! Koristi se za: file sync, auto-reload configuration, development tools (live reload).",
      "difficulty": "HARD",
      "options": [
        { "text": "Kompilira se - WatchService je validan API za file monitoring", "isCorrect": true },
        { "text": "Neće se kompilirati - register() ne prima više evenata", "isCorrect": false },
        { "text": "Kompilira se ali pada - take() nije blocking", "isCorrect": false },
        { "text": "Neće se kompilirati - context() vraća Object, ne Path", "isCorrect": false },
        { "text": "Kompilira se ali ne detektira promjene u subdirektorijima", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih FileVisitor metoda se pozivaju pri Files.walkFileTree()? (Odaberite sve točne)",
      "explanation": "FileVisitor interface ima 4 metode koje se pozivaju tijekom tree traversal-a: (1) preVisitDirectory() - poziva se PRIJE ulaska u direktorij. (2) visitFile() - poziva se za SVAKI file. (3) visitFileFailed() - poziva se ako pristup file-u FAILA (IOException). (4) postVisitDirectory() - poziva se NAKON izlaska iz direktorija. Files.walkFileTree() koristi DEPTH-FIRST traversal! FileVisitResult return vrijednosti kontroliraju traversal: CONTINUE (nastavi), TERMINATE (zaustavi sve), SKIP_SUBTREE (preskoči subdirs), SKIP_SIBLINGS (preskoči siblings). SimpleFileVisitor je ABSTRACT klasa s default implementacijama (koristi se kao base). Koristi se za: rekurzivno brisanje, search, copy tree, file statistics. walkFileTree() može raditi s FileVisitOption.FOLLOW_LINKS za symbolic links!",
      "difficulty": "HARD",
      "options": [
        { "text": "preVisitDirectory()", "isCorrect": true },
        { "text": "visitFile()", "isCorrect": true },
        { "text": "visitFileFailed()", "isCorrect": true },
        { "text": "postVisitDirectory()", "isCorrect": true },
        { "text": "visitDirectory()", "isCorrect": false },
        { "text": "onFileFound()", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će uraditi sljedeći kod s Files.walkFileTree()?",
      "codeSnippet": "import java.nio.file.*;\nimport java.nio.file.attribute.BasicFileAttributes;\nimport java.io.IOException;\n\npublic class DeleteDirectoryTest {\n    public static void main(String[] args) throws IOException {\n        Path dir = Path.of(\"temp_dir\");\n        \n        // Kreiraj strukturu: temp_dir/subdir/file.txt\n        Files.createDirectories(dir.resolve(\"subdir\"));\n        Files.writeString(dir.resolve(\"subdir/file.txt\"), \"test\");\n        Files.writeString(dir.resolve(\"root.txt\"), \"root\");\n        \n        // Pokušaj obrisati direktorij\n        Files.walkFileTree(dir, new SimpleFileVisitor<Path>() {\n            @Override\n            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) \n                    throws IOException {\n                Files.delete(file);\n                return FileVisitResult.CONTINUE;\n            }\n            \n            @Override\n            public FileVisitResult postVisitDirectory(Path dir, IOException exc) \n                    throws IOException {\n                Files.delete(dir);\n                return FileVisitResult.CONTINUE;\n            }\n        });\n        \n        System.out.println(\"Directory deleted: \" + !Files.exists(dir));\n    }\n}",
      "explanation": "Kod uspješno BRIŠE cijeli directory tree rekurzivno! Ispisuje 'Directory deleted: true'. ANALIZA: (1) walkFileTree() prolazi depth-first kroz strukturu. (2) visitFile() briše SVE fileove (file.txt, root.txt). (3) postVisitDirectory() briše direktorije NAKON što su prazni (subdir, zatim temp_dir). (4) postVisit je KLJUČAN - mora biti NAKON što su fileovi obrisani! preVisitDirectory() ne bi radio jer bi pokušao obrisati NEPRAZNI direktorij (DirectoryNotEmptyException). Ovo je STANDARDAN pattern za rekurzivno brisanje! Files.delete() direktno ne može obrisati neprazni direktorij. Alternative: org.apache.commons.io.FileUtils.deleteDirectory() ili ručno rekurzivno s list(). Java nema built-in recursive delete!",
      "difficulty": "HARD",
      "options": [
        { "text": "Uspješno briše cijeli directory tree - ispisuje true", "isCorrect": true },
        { "text": "Pada s DirectoryNotEmptyException", "isCorrect": false },
        { "text": "Briše samo fileove, ne i direktorije", "isCorrect": false },
        { "text": "Neće se kompilirati - SimpleFileVisitor ne može biti anonymous", "isCorrect": false },
        { "text": "Briše samo root direktorij, ne subdirektore", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje od sljedećih su VALIDNE kombinacije JSON-B anotacija? (Odaberite sve točne)",
      "explanation": "Validne JSON-B anotacije kombinacije: (1) @JsonbProperty + @JsonbDateFormat - custom ime + format datuma. (2) @JsonbProperty + @JsonbTransient - NE, konfliktirajuće (transient isključuje field)! (3) @JsonbNillable + @JsonbProperty - omogućava null u JSON s custom imenom. (4) @JsonbPropertyOrder + multiple @JsonbProperty - kontrolira redoslijed fieldova. (5) @JsonbTypeAdapter + @JsonbProperty - custom adapter s custom imenom. (6) @JsonbNumberFormat + @JsonbProperty - format brojeva s custom imenom. @JsonbTransient OVERRIDEUJE sve druge anotacije - field se ne serijalizira! @JsonbProperty mijenja IME u JSON-u. @JsonbDateFormat samo na Date/LocalDate/etc fields. @JsonbNillable na CLASS nivou dozvoljava null values. Multiple anotacije mogu se kombinirati osim Transient!",
      "difficulty": "HARD",
      "options": [
        { "text": "@JsonbProperty + @JsonbDateFormat", "isCorrect": true },
        { "text": "@JsonbProperty + @JsonbTransient", "isCorrect": false },
        { "text": "@JsonbNillable (class) + @JsonbProperty (field)", "isCorrect": true },
        { "text": "@JsonbNumberFormat + @JsonbProperty", "isCorrect": true },
        { "text": "@JsonbTypeAdapter + @JsonbProperty", "isCorrect": true },
        { "text": "@JsonbPropertyOrder (class) + multiple @JsonbProperty", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će biti rezultat sljedećeg koda s JSON-B type adapters?",
      "codeSnippet": "import jakarta.json.bind.*;\nimport jakarta.json.bind.adapter.*;\nimport java.time.LocalDate;\nimport java.time.format.DateTimeFormatter;\n\nclass DateAdapter implements JsonbAdapter<LocalDate, String> {\n    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern(\"dd/MM/yyyy\");\n    \n    @Override\n    public String adaptToJson(LocalDate date) {\n        return date.format(formatter);\n    }\n    \n    @Override\n    public LocalDate adaptFromJson(String date) {\n        return LocalDate.parse(date, formatter);\n    }\n}\n\nclass Event {\n    @JsonbTypeAdapter(DateAdapter.class)\n    private LocalDate eventDate;\n    private String name;\n    \n    public Event() {}\n    public Event(LocalDate eventDate, String name) {\n        this.eventDate = eventDate;\n        this.name = name;\n    }\n    \n    // Getteri i setteri...\n}\n\npublic class TypeAdapterTest {\n    public static void main(String[] args) {\n        Jsonb jsonb = JsonbBuilder.create();\n        \n        Event event = new Event(LocalDate.of(2024, 3, 15), \"Conference\");\n        String json = jsonb.toJson(event);\n        \n        System.out.println(json);\n        \n        Event restored = jsonb.fromJson(json, Event.class);\n        System.out.println(restored.getEventDate());\n    }\n}",
      "explanation": "Kod radi i ispisuje: '{\"eventDate\":\"15/03/2024\",\"name\":\"Conference\"}' i '2024-03-15'. JsonbTypeAdapter omogućava CUSTOM konverzije! (1) adaptToJson() konvertira LocalDate → String s custom formatom (dd/MM/yyyy). (2) JSON sadrži '15/03/2024' umjesto default ISO formata. (3) adaptFromJson() parsira String natrag u LocalDate. (4) restored.getEventDate() vraća LocalDate(2024-03-15) - internal format. Type adapteri korisni za: (1) Legacy date formats, (2) Custom enumerations, (3) Complex objekt → primitive konverzije, (4) Encryption/decryption. @JsonbTypeAdapter može biti na FIELD ili CLASS nivou. Generic tipovi <T, S> gdje je T Java tip, S JSON tip. Adapter mora biti public s no-arg konstruktorom!",
      "difficulty": "HARD",
      "options": [
        { "text": "Ispisuje JSON s formatom dd/MM/yyyy i restored datum je 2024-03-15", "isCorrect": true },
        { "text": "Neće se kompilirati - JsonbTypeAdapter ne prima class parameter", "isCorrect": false },
        { "text": "Pada u runtime - LocalDate ne može se adaptirati", "isCorrect": false },
        { "text": "Ispisuje ISO format - adapter se ignorira", "isCorrect": false },
        { "text": "Neće se kompilirati - DateAdapter mora biti static", "isCorrect": false }
      ]
    },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što će vratiti Files.exists(Path.of(\"\")) za PRAZAN string? (Odaberite sve točne)",
        "explanation": "Files.exists(Path.of(\"\")) vraća TRUE jer prazan string predstavlja TRENUTNI DIREKTORIJ (\".\")! Path.of(\"\") je ekvivalentno Path.of(\".\"). Ovo je ČESTA zamka - developeri misle da je to invalid path. Files.exists(null) baca NullPointerException. Files.exists(Path.of(\" \")) (razmak) vraća FALSE jer tražimo direktorij s imenom \" \". Path.of(\"\") JE validan Path objekt. isEmpty() NE POSTOJI na Path-u! exists() vraća FALSE ako path ne postoji ILI ako nema permisija za provjeru (AccessDeniedException se NE baca, samo vraća false). RAZLIKA: notExists() može vratiti FALSE čak i ako exists() vraća FALSE (ako je unknown status)!",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Vraća true - prazan string je trenutni direktorij", "isCorrect": true },
          { "text": "Vraća false - prazan string nije validan path", "isCorrect": false },
          { "text": "Baca InvalidPathException", "isCorrect": false },
          { "text": "Vraća null", "isCorrect": false },
          { "text": "Baca NullPointerException", "isCorrect": false },
          { "text": "Path.of(\"\") jednako Path.of(\".\")", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što će vratiti Files.size() za PRAZNU datoteku?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class EmptyFileSizeTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"empty.txt\");\n        \n        Files.writeString(file, \"\");\n        \n        long size1 = Files.size(file);\n        \n        Files.write(file, new byte[0]);\n        \n        long size2 = Files.size(file);\n        \n        System.out.println(size1 + \" \" + size2);\n    }\n}",
        "explanation": "Ispisuje '0 0'. Prazna datoteka ima veličinu 0 bajtova! Files.writeString(file, \"\") kreira datoteku veličine 0. Files.write(file, new byte[0]) također 0. Files.size() vraća EXACT broj bajtova u datoteci. Za direktorij, size() vraća 'directory entry size' (platform-dependent, obično 4096 na Linux). Files.size() baca NoSuchFileException ako ne postoji. Files.size() NE uzima u account disk allocation (file system može allocirati 4KB minimum block). Za točan disk usage koristiti Files.getAttribute(path, \"size\") ili native tools.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "0 0", "isCorrect": true },
          { "text": "-1 -1", "isCorrect": false },
          { "text": "Baca IOException - prazna datoteka nije validna", "isCorrect": false },
          { "text": "null null", "isCorrect": false },
          { "text": "1 1 - minimalna veličina", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što se događa s Files.readString() na binarnoj datoteci? (Odaberite sve točne)",
        "explanation": "Files.readString() čita BILO koju datoteku kao text s defaultnim UTF-8 encodingom! Binarna datoteka će se pročitati ali sadržaj će biti MOJIBAKE (corruption) jer se bajtovi interpretiraju kao UTF-8 characters. Metoda NE baca exception! Vraća String s invalid characters (replacement characters '�'). readString() je za TEKSTUALNE datoteke. Za binarne koristiti readAllBytes(). Metoda također učitava CIJELU datoteku u memoriju - OutOfMemoryError za velike datoteke! readString() može specificirati Charset za različite encodinge. Nema runtime check-a je li datoteka binarna ili tekstualna.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Vraća String s mojibake/corruption", "isCorrect": true },
          { "text": "Baca InvalidFormatException", "isCorrect": false },
          { "text": "Učitava cijelu datoteku u memoriju", "isCorrect": true },
          { "text": "Automatski detektira binarnu datoteku i baca exception", "isCorrect": false },
          { "text": "Vraća null za binarne datoteke", "isCorrect": false },
          { "text": "Može baciti OutOfMemoryError za velike datoteke", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Je li sljedeći kod siguran za concurrent access?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class ConcurrentWriteTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"shared.txt\");\n        \n        // Thread 1\n        new Thread(() -> {\n            try {\n                for (int i = 0; i < 1000; i++) {\n                    Files.writeString(file, \"A\", \n                        StandardOpenOption.CREATE,\n                        StandardOpenOption.APPEND);\n                }\n            } catch (IOException e) {}\n        }).start();\n        \n        // Thread 2\n        new Thread(() -> {\n            try {\n                for (int i = 0; i < 1000; i++) {\n                    Files.writeString(file, \"B\",\n                        StandardOpenOption.CREATE,\n                        StandardOpenOption.APPEND);\n                }\n            } catch (IOException e) {}\n        }).start();\n    }\n}",
        "explanation": "Kod NIJE thread-safe! Files.writeString() s APPEND opcijom NIJE atomična operacija za multiple pozive! Svaki writeString() poziv otvara, piše, i zatvara datoteku zasebno. Između otvaranja i pisanja može doći do context switcha. Rezultat: RACE CONDITION - može se izgubiti data, overlapping writes, incorrect order. Files metode su thread-safe na nivou POJEDINAČNOG poziva ali ne između poziva! Za thread-safe append koristiti: (1) FileChannel s FileLock, (2) synchronized block, (3) BufferedWriter u try-with-resources per-thread, (4) ConcurrentLinkedQueue + single writer thread. FileChannel.write() s position parametrom je ATOMSKI za appends na većini platformi.",
        "difficulty": "HARD",
        "options": [
          { "text": "NIJE thread-safe - race condition između otvaranja i pisanja", "isCorrect": true },
          { "text": "JE thread-safe - Files.writeString() je synchronized", "isCorrect": false },
          { "text": "JE thread-safe - APPEND option je atomic", "isCorrect": false },
          { "text": "NIJE thread-safe - mora biti synchronized block", "isCorrect": false },
          { "text": "JE thread-safe - OS handla concurrent writes", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što Files.lines() vraća za datoteku s Windows line endings (\\r\\n)? (Odaberite sve točne)",
        "explanation": "Files.lines() AUTOMATSKI handla line endings! Windows (\\r\\n), Unix (\\n), i Mac (\\r) se svi prepoznaju kao line separatori. Stream<String> sadržava linije BEZ line separatora - stripped! lines() čita liniju po liniju LAZY - ne učitava cijelu datoteku. lines() MORA se zatvoriti - vraća AutoCloseable Stream. Prazne linije se UKLJUČUJU u stream kao prazni Stringovi. Trailing newline na kraju datoteke NE dodaje dodatnu praznu liniju ako datoteka završava s \\n. lines() koristi BufferedReader interno. Za kontrolu nad line endings koristiti BufferedReader.readLine() direktno.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Automatski handla \\r\\n, \\n, \\r kao line endings", "isCorrect": true },
          { "text": "Linije u Streamu nemaju line separatore (stripped)", "isCorrect": true },
          { "text": "Mora se zatvoriti (try-with-resources)", "isCorrect": true },
          { "text": "Baca exception za Windows endings", "isCorrect": false },
          { "text": "Učitava cijelu datoteku u memoriju odmah", "isCorrect": false },
          { "text": "Prazne linije se preskačaju", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Koliko bajtova zauzima sljedeća datoteka?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class NewlineSizeTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"newlines.txt\");\n        \n        // Način 1\n        Files.writeString(file, \"Line1\\n\");\n        long size1 = Files.size(file);\n        \n        // Način 2  \n        Files.writeString(file, \"Line1\" + System.lineSeparator());\n        long size2 = Files.size(file);\n        \n        System.out.println(size1 + \" \" + size2);\n    }\n}",
        "explanation": "Ovisi o PLATFORMI! Na Unix/Linux/Mac: '6 6' (\\n je 1 bajt). Na Windows: '6 7' (System.lineSeparator() je \\r\\n = 2 bajta)! Files.writeString() NE konvertira \\n automatski - piše EXACT što mu date. 'Line1\\n' = 5 chars + 1 byte (\\n) = 6 bytes na SVIM platformama. System.lineSeparator() vraća platform-specific separator: Unix='\\n' (1 byte), Windows='\\r\\n' (2 bytes). Ovo je ČESTA zamka u cross-platform kodu! Za platform-independent koristiti \\n ili %n u printf(). Files.writeString() default encoding je UTF-8 gdje ASCII characters = 1 byte per char.",
        "difficulty": "HARD",
        "options": [
          { "text": "6 6 na Unix, 6 7 na Windows - lineSeparator() je platform-specific", "isCorrect": true },
          { "text": "6 6 na svim platformama", "isCorrect": false },
          { "text": "7 7 na svim platformama", "isCorrect": false },
          { "text": "5 6 - \\n se ne računa u prvom slučaju", "isCorrect": false },
          { "text": "6 7 na svim platformama - writeString() dodaje extra byte", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što se događa ako pozovete Files.delete() na symlink? (Odaberite sve točne)",
        "explanation": "Files.delete() na symlink-u briše SAM LINK, NE target datoteku! Symlink je samo pointer na drugu datoteku. Target ostaje netaknut. Files.delete() NE prati linkove. Za brisanje target-a koristiti Files.delete(link.toRealPath()). Files.isSymbolicLink() provjerava je li path symlink. Files.readSymbolicLink() vraća target path. Files.deleteIfExists() također briše samo link. Za copy/move symlink-a koristiti NOFOLLOW_LINKS option inače se kopira target! Windows Junctions i Hard links se ponašaju drugačije od symbolic links.",
        "difficulty": "HARD",
        "options": [
          { "text": "Briše sam link, NE target datoteku", "isCorrect": true },
          { "text": "Briše target datoteku, link ostaje", "isCorrect": false },
          { "text": "Briše i link i target", "isCorrect": false },
          { "text": "Baca SymbolicLinkException", "isCorrect": false },
          { "text": "Files.delete() NE prati linkove", "isCorrect": true },
          { "text": "toRealPath() daje target path", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što vraća Files.readAllLines() za datoteku bez trailing newline-a?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\nimport java.util.List;\n\npublic class NoTrailingNewlineTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"notrailing.txt\");\n        \n        // Datoteka s 3 linije BEZ trailing newline\n        Files.writeString(file, \"Line1\\nLine2\\nLine3\");\n        \n        List<String> lines = Files.readAllLines(file);\n        \n        System.out.println(lines.size());\n        System.out.println(lines.get(2));\n    }\n}",
        "explanation": "Ispisuje '3' i 'Line3'. readAllLines() vraća 3 linije! Trailing newline NIJE potreban za zadnju liniju. 'Line1\\nLine2\\nLine3' čita kao 3 elementa: ['Line1', 'Line2', 'Line3']. Trailing newline bi dodao PRAZNU liniju: 'Line1\\nLine2\\nLine3\\n' čita kao ['Line1', 'Line2', 'Line3', '']. Ovo je RAZLIČITO od nekih language-ova gdje trailing newline je ignoran. Java lines() i readAllLines() UKLJUČUJU sve linije između separatora. Za ignoriranje praznih linija koristiti filter: lines.stream().filter(s -> !s.isEmpty()).",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "3, Line3 - trailing newline nije potreban", "isCorrect": true },
          { "text": "4, prazan string - dodaje praznu liniju", "isCorrect": false },
          { "text": "2, Line2 - zadnja linija se gubi", "isCorrect": false },
          { "text": "3, Line3\\n - zadržava newline", "isCorrect": false },
          { "text": "Baca IOException - datoteka mora završiti s newline", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Koja je razlika između Files.move() i Files.copy()? (Odaberite sve točne)",
        "explanation": "KLJUČNE razlike: (1) move() PREMJEŠTA (original se briše), copy() KOPIRA (original ostaje). (2) move() može biti ATOMIC s ATOMIC_MOVE option, copy() NE MOŽE biti atomic. (3) move() MOŽE raditi across file systems (slower - copy+delete), copy() također. (4) move() vraća target Path, copy() također. (5) move() može renameat() na istom file systemu (instant), copy() mora kopirati podatke. (6) move() može failati s AtomicMoveNotSupportedException, copy() NE. (7) move() s REPLACE_EXISTING atomski zamjenjuje target, copy() overwritea. move() = cut+paste, copy() = copy+paste. move() je BRŽI na istom filesystemu (samo directory entry update).",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "move() briše original, copy() ostavlja original", "isCorrect": true },
          { "text": "move() može biti atomic, copy() ne može", "isCorrect": true },
          { "text": "move() je brži na istom filesystemu", "isCorrect": true },
          { "text": "copy() može raditi across filesystems, move() ne može", "isCorrect": false },
          { "text": "move() ne može overwriteati existing file", "isCorrect": false },
          { "text": "copy() baca AtomicMoveNotSupportedException", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što se događa ako BufferedWriter ne bude flushed?",
        "codeSnippet": "import java.io.*;\nimport java.nio.file.*;\n\npublic class NoFlushTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"noflush.txt\");\n        \n        BufferedWriter writer = Files.newBufferedWriter(file);\n        writer.write(\"Test data\");\n        // Zaboravljen flush() i close()!\n        \n        long size = Files.size(file);\n        String content = Files.readString(file);\n        \n        System.out.println(\"Size: \" + size);\n        System.out.println(\"Content: '\" + content + \"'\");\n    }\n}",
        "explanation": "Ispisuje 'Size: 0' i \"Content: ''\"! Bez flush() ili close(), podaci ostaju u BUFFERU i NIKAD se ne pišu u datoteku! BufferedWriter buffira za performance ali MORA se zatvoriti ili flushati. close() automatski poziva flush(). try-with-resources GARANTIRA close(). writer.flush() eksplicitno piše buffer u file. Ovo je ČESTA greška - datoteka je prazna iako je write() pozvan! Formatter i PrintWriter imaju autoFlush opciju. FileWriter bez buffera piše odmah ali je sporiji. UVIJEK koristiti try-with-resources!",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Size: 0, Content: '' - podaci ostaju u bufferu", "isCorrect": true },
          { "text": "Size: 9, Content: 'Test data' - automatski flushed", "isCorrect": false },
          { "text": "Baca IOException pri čitanju", "isCorrect": false },
          { "text": "Flush se poziva automatski pri Files.size()", "isCorrect": false },
          { "text": "write() automatski flusha buffer", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što Files.isSameFile() provjerava? (Odaberite sve točne)",
        "explanation": "Files.isSameFile(path1, path2) provjerava referiraju li dva patha na ISTU datoteku! Koristi FILE SYSTEM inode/file ID, NE path string usporedbu! isSameFile(Path.of('file.txt'), Path.of('./file.txt')) vraća TRUE - različiti paths, ista datoteka. isSameFile() prati SYMBOLIC LINKS - uspoređuje target files. isSameFile() baca IOException ako datoteke ne postoje. Različito od path1.equals(path2) koji uspoređuje PATH STRINGOVE. isSameFile() radi ACROSS hard links - svi hard linkovi na istu datoteku vraćaju true. Za direktorije također radi. isSameFile() je PLATFORM-SPECIFIC (koristi OS file ID).",
        "difficulty": "HARD",
        "options": [
          { "text": "Provjerava file system inode/ID, ne path string", "isCorrect": true },
          { "text": "Prati symbolic links do target-a", "isCorrect": true },
          { "text": "Baca IOException ako datoteke ne postoje", "isCorrect": true },
          { "text": "Uspoređuje path stringove kao equals()", "isCorrect": false },
          { "text": "Ne radi s hard linkovima", "isCorrect": false },
          { "text": "Radi i za direktorije", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Hoće li ObjectInputStream deserijalizirati objekt s promijenjenim serialVersionUID?",
        "codeSnippet": "import java.io.*;\n\n// Original class\nclass Person implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String name;\n    public Person(String name) { this.name = name; }\n}\n\n// Modified class (različiti serialVersionUID)\nclass Person implements Serializable {\n    private static final long serialVersionUID = 2L; // Changed!\n    private String name;\n    public Person(String name) { this.name = name; }\n}\n\npublic class SerialVersionTest {\n    public static void main(String[] args) {\n        // Serialize with serialVersionUID = 1\n        // Deserialize with serialVersionUID = 2\n        // Što će se dogoditi?\n    }\n}",
        "explanation": "Kod NEĆE raditi! Baca InvalidClassException: 'local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = 2'. serialVersionUID je VERZIONIRANJE za kompatibilnost! Različiti UIDs znači incompatible verzije klase. JVM ne dopušta deserijalizaciju. Ako serialVersionUID NIJE postavljen, Java ga automatski generira iz class signature (fields, methods, modifiers). Promjena bilo čega u klasi mijenja auto-generated UID. BEST PRACTICE: Postaviti eksplicitno serialVersionUID = 1L i NE mijenjati! Za breaking changes dodati novu klasu. serialVersionUID omogućava KONTROLIRANU evoluciju klase (dodavanje novih fielova s default vrijednostima).",
        "difficulty": "HARD",
        "options": [
          { "text": "Baca InvalidClassException - različiti serialVersionUID", "isCorrect": true },
          { "text": "Radi normalno - serialVersionUID se ignorira", "isCorrect": false },
          { "text": "Deserijalizira ali s null vrijednostima", "isCorrect": false },
          { "text": "Baca ClassNotFoundException", "isCorrect": false },
          { "text": "Automatski migrira na novu verziju", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što readObject() vraća ako serijalizirani objekt sadrži null reference? (Odaberite sve točne)",
        "explanation": "readObject() NORMALNO handla null reference! (1) Ako field je null, deserijalizirani objekt također ima null field. (2) Null vrijednosti se SERIJALIZIRAJU i DESERIJALIZIRAJU pravilno. (3) readObject() vraća null samo ako je serijalizirani OBJEKT null (out.writeObject(null)). (4) Circular references (A → B → A) također rade - Java tracka objekte. (5) Duplicate references (A → C, B → C) deserijaliziraju kao ISTI objekt C. readObject() NE baca NullPointerException za null fields. Java serialization handla object graphs automatski. transient fieldi postaju null pri deserijalizaciji.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Null fieldi se deserijaliziraju kao null", "isCorrect": true },
          { "text": "readObject() vraća null samo ako je cijeli objekt null", "isCorrect": true },
          { "text": "Circular references rade (A→B→A)", "isCorrect": true },
          { "text": "Baca NullPointerException za null fields", "isCorrect": false },
          { "text": "Null references se zamjenjuju s default vrijednostima", "isCorrect": false },
          { "text": "Duplicate references dijele isti objekt", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što vraća Files.list() za prazan direktorij?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\nimport java.util.stream.Stream;\n\npublic class EmptyDirListTest {\n    public static void main(String[] args) throws IOException {\n        Path dir = Path.of(\"emptydir\");\n        Files.createDirectories(dir);\n        \n        try (Stream<Path> stream = Files.list(dir)) {\n            long count = stream.count();\n            System.out.println(count);\n        }\n        \n        // Što ako pozovemo list() na FILE umjesto direktoriju?\n        Path file = dir.resolve(\"test.txt\");\n        Files.createFile(file);\n        \n        try (Stream<Path> stream2 = Files.list(file)) {\n            // Što se događa?\n        }\n    }\n}",
        "explanation": "Prvi dio ispisuje '0' - prazan direktorij vraća PRAZAN stream! Files.list() vraća Stream<Path> s 0 elemenata, NE null. Drugi dio baca NotDirectoryException! Files.list() MOŽE se pozvati samo na direktoriju. Na file-u baca exception. list() NE uključuje '.' i '..' entries (za razliku od nekih OS API-ja). list() NE uključuje skrivene datoteke po defaultu - vraća SVE osim . i ... list() NE prati symbolic links u poddirektorije. Za rekurzivno koristiti walk(). Za provjeravanje Files.isDirectory() prije list().",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Prazan direktorij vraća stream s 0 elemenata, file baca NotDirectoryException", "isCorrect": true },
          { "text": "Prazan direktorij vraća null", "isCorrect": false },
          { "text": "Prazan direktorij baca exception", "isCorrect": false },
          { "text": "File vraća prazan stream", "isCorrect": false },
          { "text": "list() vraća null za file", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Koje exception-e može baciti Files.copy()? (Odaberite sve točne)",
        "explanation": "Files.copy() može baciti: (1) IOException - generalna I/O greška. (2) FileAlreadyExistsException - target postoji i nema REPLACE_EXISTING. (3) DirectoryNotEmptyException - pokušaj overwritea nepraznog direktorija. (4) AccessDeniedException - nema permisija. (5) NoSuchFileException - source ne postoji. (6) UnsupportedOperationException - invalid copy options. SecurityException može se baciti. OutOfMemoryError može ako je file ogroman i nema memorije za buffering. copy() NE baca FileNotFoundException - to je stari java.io exception, NIO koristi NoSuchFileException!",
        "difficulty": "HARD",
        "options": [
          { "text": "FileAlreadyExistsException", "isCorrect": true },
          { "text": "NoSuchFileException", "isCorrect": true },
          { "text": "DirectoryNotEmptyException", "isCorrect": true },
          { "text": "FileNotFoundException", "isCorrect": false },
          { "text": "AccessDeniedException", "isCorrect": true },
          { "text": "InvalidPathException", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Je li moguće kopirati direktorij s Files.copy()?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class CopyDirectoryTest {\n    public static void main(String[] args) throws IOException {\n        Path srcDir = Path.of(\"source\");\n        Path dstDir = Path.of(\"destination\");\n        \n        // Kreiraj source direktorij sa sadržajem\n        Files.createDirectories(srcDir);\n        Files.writeString(srcDir.resolve(\"file1.txt\"), \"content1\");\n        Files.writeString(srcDir.resolve(\"file2.txt\"), \"content2\");\n        Files.createDirectories(srcDir.resolve(\"subdir\"));\n        \n        // Pokušaj kopirati direktorij\n        Files.copy(srcDir, dstDir);\n        \n        System.out.println(\"Directory copied!\");\n        System.out.println(\"Files in destination: \" + \n            Files.list(dstDir).count());\n    }\n}",
        "explanation": "Kod kreira PRAZAN destination direktorij! Files.copy() na direktoriju kopira SAMO direktorij entry, NE sadržaj! destination direktorij postoji ali je prazan - count() vraća 0. Files.copy() NE kopira rekurzivno! Za kopiranje direktorija sa sadržajem mora se koristiti walkFileTree() s FileVisitor-om ili manual rekurzija. Postoje utility biblioteke (Apache Commons IO) s copyDirectory() metodom. Files.copy() je SHALLOW copy za direktorije. Za deep copy potreban je custom kod. Ovo je ČESTA zabuna - developeri očekuju deep copy!",
        "difficulty": "HARD",
        "options": [
          { "text": "Kreira prazan destination direktorij - NE kopira sadržaj", "isCorrect": true },
          { "text": "Kopira rekurzivno sve fileove i subdirektorije", "isCorrect": false },
          { "text": "Baca DirectoryNotEmptyException", "isCorrect": false },
          { "text": "Baca UnsupportedOperationException - ne može kopirati direktorije", "isCorrect": false },
          { "text": "Ne radi ništa - copy() ignorira direktorije", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što se događa s FileChannel nakon što se zatvori? (Odaberite sve točne)",
        "explanation": "Zatvoreni FileChannel: (1) Sve operacije bacaju ClosedChannelException. (2) isOpen() vraća false. (3) Multiple close() pozivi su SAFE - ne baca exception. (4) Lock-ovi se automatski oslobađaju pri close(). (5) Bufferi (MappedByteBuffer) mogu NASTAVITI raditi jer su direktno mapiran memory! (6) try-with-resources automatski zatvara. close() je IDEMPOTENT - može se zvati više puta. read()/write() bacaju ClosedChannelException. FileChannel NE baca IOException samo za close() poziv (osim ako ima pending writes). Channel NE može se reopenati - mora se kreirati novi!",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Sve operacije bacaju ClosedChannelException", "isCorrect": true },
          { "text": "isOpen() vraća false", "isCorrect": true },
          { "text": "Multiple close() su safe - nema exception", "isCorrect": true },
          { "text": "Baca IOException pri svakom close()", "isCorrect": false },
          { "text": "MappedByteBuffer može nastaviti raditi", "isCorrect": true },
          { "text": "Može se reopenati s open() metodom", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što će ispisati kod s relativnim i apsolutnim putanjama?",
        "codeSnippet": "import java.nio.file.*;\n\npublic class PathNormalizeTest {\n    public static void main(String[] args) {\n        Path p1 = Path.of(\"a/b/../c/./d\");\n        Path p2 = p1.normalize();\n        \n        Path p3 = Path.of(\"/a/b/../c/./d\");\n        Path p4 = p3.normalize();\n        \n        Path p5 = Path.of(\"../a/b\");\n        Path p6 = p5.normalize();\n        \n        System.out.println(p1 + \" -> \" + p2);\n        System.out.println(p3 + \" -> \" + p4);\n        System.out.println(p5 + \" -> \" + p6);\n    }\n}",
        "explanation": "Ispisuje: 'a/b/../c/./d -> a/c/d', '/a/b/../c/./d -> /a/c/d', '../a/b -> ../a/b'. normalize() RAZRJEŠAVA '.' i '..' u putanji: '.' = trenutni dir (removea), '..' = parent dir (removea prethodni segment). 'b/..' se cancelira. './d' postaje 'd'. '../a/b' OSTAJE isto jer ne može razriješiti '..' na početku! normalize() NE pristupa filesystemu - samo string operacije. toRealPath() pristupa filesystemu i razrješava sve uključujući symbolic links. normalize() ne mijenja apsolutnost puta - relativni ostaje relativni.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "a/c/d, /a/c/d, ../a/b - normalize razrješava . i ..", "isCorrect": true },
          { "text": "a/c/d, /a/c/d, a/b - sve razrješeno", "isCorrect": false },
          { "text": "Baca InvalidPathException", "isCorrect": false },
          { "text": "Svi ostaju isti - normalize ne mijenja path", "isCorrect": false },
          { "text": "a/b/../c/./d ostaje isti - nema promjene", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što readLine() vraća na kraju datoteke? (Odaberite sve točne)",
        "explanation": "BufferedReader.readLine() na kraju datoteke: (1) Vraća null - NIKAD prazan String za EOF! (2) Prazna linija ('\\n\\n') vraća PRAZAN String '', NE null. (3) Datoteka bez trailing newline: zadnja linija se vraća normalno, zatim null. (4) Potpuno prazna datoteka: prvi readLine() vraća null. (5) Linija sa samo spacevima: vraća String s spaceovima. null je JEDINI indikator EOF-a! Provjera: while ((line = reader.readLine()) != null). Razlika od Scanner.nextLine() koji baca NoSuchElementException na EOF.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Vraća null - indikator EOF-a", "isCorrect": true },
          { "text": "Prazna linija vraća '', ne null", "isCorrect": true },
          { "text": "Bez trailing newline zadnja linija se vraća normalno", "isCorrect": true },
          { "text": "Vraća prazan String za EOF", "isCorrect": false },
          { "text": "Baca EOFException", "isCorrect": false },
          { "text": "Potpuno prazna datoteka: prvi readLine() vraća null", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Je li Files.walk() thread-safe?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\nimport java.util.concurrent.*;\nimport java.util.stream.Stream;\n\npublic class WalkThreadSafeTest {\n    public static void main(String[] args) throws InterruptedException {\n        ExecutorService executor = Executors.newFixedThreadPool(2);\n        \n        executor.submit(() -> {\n            try (Stream<Path> stream = Files.walk(Path.of(\".\"))) {\n                stream.forEach(System.out::println);\n            } catch (IOException e) {}\n        });\n        \n        executor.submit(() -> {\n            try (Stream<Path> stream = Files.walk(Path.of(\".\"))) {\n                stream.forEach(System.out::println);\n            } catch (IOException e) {}\n        });\n        \n        executor.shutdown();\n        executor.awaitTermination(1, TimeUnit.MINUTES);\n    }\n}",
        "explanation": "Kod JE thread-safe jer svaki thread ima SVOJ Stream! Files.walk() kreira NOVI stream objekt za svaki poziv. Multiple concurrent walk() pozivi na ISTOM direktoriju su SAFE. ALI: stream sam po sebi NIJE thread-safe - ne dijeli stream između threadova! Parallelni stream od walk() rezultata može biti problematičan: walk().parallel() može doći do race conditions pri modificiranju filesystema. walk() otvara DirectoryStream interno - svaki walk() ima svoje resurse. PROBLEM: Istovremeno modificiranje i traversiranje filesystema može propustiti datoteke ili vidjeti inconsistencies.",
        "difficulty": "HARD",
        "options": [
          { "text": "JE thread-safe - svaki thread ima svoj stream", "isCorrect": true },
          { "text": "NIJE thread-safe - dijele isti stream", "isCorrect": false },
          { "text": "walk().parallel() je problematičan pri modifikacijama", "isCorrect": true },
          { "text": "Baca ConcurrentModificationException", "isCorrect": false },
          { "text": "Multiple concurrent walk() su uvijek unsafe", "isCorrect": false },
          { "text": "Stream sami po sebi nisu thread-safe za sharing", "isCorrect": true }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što JSON-B radi s null vrijednostima po defaultu? (Odaberite sve točne)",
        "explanation": "JSON-B default behaviour za null: (1) Null fieldi se PRESKAČU - ne pojavljuju se u JSON-u! (2) Za uključivanje null-ova koristiti withNullValues(true) u JsonbConfig. (3) @JsonbNillable na klasi uključuje null za SVA polja. (4) Pri deserijalizaciji, missing fields postaju null. (5) Empty String '' se SERIJALIZIRA (nije null). (6) Razlika od Jackson koji default uključuje null-ove! Null vs missing field: null value se može deserijalizirati eksplicitno, missing field je implicitno null. JAXB također default preskače null-ove.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Null fieldi se preskaču - ne pojavljuju u JSON-u", "isCorrect": true },
          { "text": "withNullValues(true) uključuje null-ove", "isCorrect": true },
          { "text": "@JsonbNillable uključuje null za sva polja", "isCorrect": true },
          { "text": "Default uključuje null u JSON kao null value", "isCorrect": false },
          { "text": "Empty String '' je isto kao null", "isCorrect": false },
          { "text": "Missing fields pri deserijalizaciji postaju null", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što vraća Files.getAttribute() za nepostojeći atribut?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class AttributeTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"test.txt\");\n        Files.writeString(file, \"test\");\n        \n        // Validni atribut\n        Object size = Files.getAttribute(file, \"size\");\n        System.out.println(\"Size: \" + size);\n        \n        // Nepostojeći atribut\n        Object invalid = Files.getAttribute(file, \"nonexistent\");\n        System.out.println(\"Invalid: \" + invalid);\n    }\n}",
        "explanation": "Kod pada na drugom getAttribute() s IllegalArgumentException! Nepostojeći atribut baca exception: 'nonexistent not recognized'. getAttribute() NE vraća null za invalid attribute. Validni atributi: 'size', 'lastModifiedTime', 'lastAccessTime', 'creationTime', 'isRegularFile', 'isDirectory', 'isSymbolicLink', 'isOther', 'fileKey'. Platform-specific: 'owner', 'permissions' (POSIX), 'hidden' (DOS). Za listu svih atributa koristiti readAttributes(). getAttribute() je generic - vraća Object. Type cast potreban.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Pada s IllegalArgumentException - nepostojeći atribut", "isCorrect": true },
          { "text": "Vraća null za invalid atribut", "isCorrect": false },
          { "text": "Vraća default vrijednost (0, false)", "isCorrect": false },
          { "text": "Baca NoSuchAttributeException", "isCorrect": false },
          { "text": "Ignorira i vraća prazan String", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Kada se koristi Scanner.nextLine() nakon nextInt()? (Odaberite sve točne)",
        "explanation": "Scanner.nextInt() + nextLine() PROBLEM: (1) nextInt() čita broj ali OSTAVLJA '\\n' u bufferu! (2) nextLine() čita taj newline i vraća PRAZAN String. (3) Mora se dodati DUMMY nextLine() nakon nextInt() za konzumiranje newline-a. (4) Alternativa: koristiti nextLine() za SVE pa Integer.parseInt(). (5) Problem postoji i sa nextDouble(), next() ne ostavlja newline. (6) Scanner.skip('\\r?\\n') može preskočiti newline. Ovo je NAJČEŠĆA Scanner greška! BufferedReader nema ovaj problem jer readLine() konzumira newline.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "nextInt() ostavlja \\n u bufferu", "isCorrect": true },
          { "text": "nextLine() čita taj newline kao prazan String", "isCorrect": true },
          { "text": "Mora se dodati dummy nextLine() za konzumiranje", "isCorrect": true },
          { "text": "nextInt() automatski konzumira newline", "isCorrect": false },
          { "text": "Problem postoji i s nextDouble()", "isCorrect": true },
          { "text": "next() također ostavlja newline", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Može li DataInputStream čitati UTF String duži od 65535 bajtova?",
        "codeSnippet": "import java.io.*;\n\npublic class UTFLimitTest {\n    public static void main(String[] args) throws IOException {\n        String longString = \"A\".repeat(70000);\n        \n        try (DataOutputStream dos = new DataOutputStream(\n                new FileOutputStream(\"utf.dat\"))) {\n            dos.writeUTF(longString);\n        }\n        \n        try (DataInputStream dis = new DataInputStream(\n                new FileInputStream(\"utf.dat\"))) {\n            String read = dis.readUTF();\n            System.out.println(read.length());\n        }\n    }\n}",
        "explanation": "Kod PADA s UTFDataFormatException: 'encoded string too long: 70000 bytes'! writeUTF() ima LIMIT od 65535 bajtova zbog UTF format specifikacije. UTF encoding koristi 2-byte length prefix (max 65535). Za duže stringove koristiti: (1) writeUTF() za svaki segment < 65535, (2) writeInt(length) + writeBytes(), (3) ObjectOutputStream za objekte. readUTF() također ima isti limit. ASCII characters = 1 byte, non-ASCII mogu biti 2-3 bytes pa je limit CHARACTERS < 65535! Ovo je RIJETKA zamka ali KRITIČNA za large data.",
        "difficulty": "HARD",
        "options": [
          { "text": "NE - baca UTFDataFormatException, limit je 65535 bajtova", "isCorrect": true },
          { "text": "DA - automatski segmentira u više dijelova", "isCorrect": false },
          { "text": "DA - nema limita za UTF stringove", "isCorrect": false },
          { "text": "Neće se kompilirati - writeUTF() ne prima String", "isCorrect": false },
          { "text": "Pada samo pri čitanju, ne pri pisanju", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što Path.resolve() radi s apsolutnim pathom kao argumentom? (Odaberite sve točne)",
        "explanation": "Path.resolve() behaviour: (1) Ako argument je APSOLUTNI path, vraća ARGUMENT (ignorira base path)! (2) Ako argument je RELATIVNI, spaja base + argument. (3) resolve('') vraća SAM BASE path. (4) resolve('.') vraća base/. (5) resolve('..') vraća base/.. (ne normalizira automatski!). (6) Za normalizaciju koristiti .normalize() nakon resolve(). Primjer: Path.of('/a').resolve('/b') vraća '/b' ne '/a/b'! resolve() NE pristupa filesystemu. resolveSibling() razrješava relative to parent.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "Apsolutni argument vraća argument, ignorira base", "isCorrect": true },
          { "text": "Relativni argument spaja base + argument", "isCorrect": true },
          { "text": "resolve('') vraća base path", "isCorrect": true },
          { "text": "Automatski normalizira rezultat", "isCorrect": false },
          { "text": "resolve('..') vraća base/.. bez normalizacije", "isCorrect": true },
          { "text": "Apsolutni argument se spaja s base pathom", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što Files.isReadable() vraća za datoteku bez read permisija?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\nimport java.util.*;\n\npublic class ReadableTest {\n    public static void main(String[] args) throws IOException {\n        Path file = Path.of(\"test.txt\");\n        Files.writeString(file, \"test\");\n        \n        // Makni read permisije (Unix/Linux)\n        Set<PosixFilePermission> perms = new HashSet<>();\n        // Samo write i execute, bez read\n        perms.add(PosixFilePermission.OWNER_WRITE);\n        perms.add(PosixFilePermission.OWNER_EXECUTE);\n        Files.setPosixFilePermissions(file, perms);\n        \n        boolean readable = Files.isReadable(file);\n        System.out.println(\"Readable: \" + readable);\n        \n        // Pokušaj pročitati\n        try {\n            String content = Files.readString(file);\n            System.out.println(\"Content: \" + content);\n        } catch (IOException e) {\n            System.out.println(\"Cannot read: \" + e.getClass().getSimpleName());\n        }\n    }\n}",
        "explanation": "Kod ispisuje 'Readable: false' i 'Cannot read: AccessDeniedException'. Files.isReadable() PROVJERAVA permisije i vraća FALSE bez read permisija. Pokušaj čitanja baca AccessDeniedException. isReadable() NE otvara datoteku - samo provjerava. isReadable() ovisi o: (1) file permissions, (2) OS security context, (3) JVM security manager. Windows nema POSIX permissions - koristi ACLs. isReadable() može vratiti TRUE ali čitanje failati zbog: locked file, deleted during check, security changes. TOCTOU problem (Time-Of-Check-Time-Of-Use)!",
        "difficulty": "HARD",
        "options": [
          { "text": "false, AccessDeniedException - nema read permisije", "isCorrect": true },
          { "text": "true, čita normalno - isReadable() ne provjerava permisije", "isCorrect": false },
          { "text": "false, FileNotFoundException - datoteka nije dostupna", "isCorrect": false },
          { "text": "Neće se kompilirati - setPosixFilePermissions() ne postoji", "isCorrect": false },
          { "text": "true, IOException - generic greška", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što se događa s BufferedReader pri čitanju preko kraja datoteke? (Odaberite sve točne)",
        "explanation": "BufferedReader preko EOF-a: (1) readLine() vraća null - NORMALNO ponašanje, NE exception! (2) read() vraća -1 za EOF - single character read. (3) read(char[], offset, length) vraća -1. (4) Višestruki readLine() pozivi nakon EOF: svi vraćaju null. (5) ready() vraća false nakon EOF. (6) close() može se zvati nakon EOF bez problema. EOFException se NE baca! Razlika od DataInputStream koji baca EOFException na read() preko EOF-a. BufferedReader je 'graceful' - vraća null/−1.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "readLine() vraća null - NE baca exception", "isCorrect": true },
          { "text": "read() vraća -1 za EOF", "isCorrect": true },
          { "text": "Višestruki readLine() nakon EOF vraćaju null", "isCorrect": true },
          { "text": "Baca EOFException", "isCorrect": false },
          { "text": "ready() vraća false nakon EOF", "isCorrect": true },
          { "text": "Automatski zatvara stream nakon EOF", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Je li moguće dodati field u klasu nakon što je serijalizirana?",
        "codeSnippet": "// Original klasa\nclass User implements Serializable {\n    private static final long serialVersionUID = 1L;\n    private String name;\n}\n\n// Serijaliziraj User s name = \"John\"\n\n// Modified klasa (dodan novi field)\nclass User implements Serializable {\n    private static final long serialVersionUID = 1L; // ISTI UID!\n    private String name;\n    private int age; // NOVI FIELD\n}\n\n// Deserijaliziraj stari User objekt\n// Što će biti vrijednost age fielda?",
        "explanation": "Deserijalizacija RADI! age field će biti DEFAULT vrijednost (0 za int). Java serijalizacija podržava BACKWARD COMPATIBILITY! Dodavanje novih fielda s istim serialVersionUID je SAFE. Novi field dobiva default vrijednost (int=0, Object=null, boolean=false). BRISANJE fielda također radi - stara vrijednost se ignorira. PROMJENA tipa fielda MOŽE failati. PRAVILO: Samo ADDITIVE changes su safe. Za complex evolution koristiti readObject()/writeObject() custom metode. serialVersionUID omogućava kontroliranu evoluciju klasa!",
        "difficulty": "HARD",
        "options": [
          { "text": "DA - age dobiva default vrijednost (0), backward compatible", "isCorrect": true },
          { "text": "NE - baca InvalidClassException", "isCorrect": false },
          { "text": "DA - age dobiva null vrijednost", "isCorrect": false },
          { "text": "NE - mora se promijeniti serialVersionUID", "isCorrect": false },
          { "text": "DA - age se ne deserijalizira (ostaje uninitialized)", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Kada Files.writeString() TRUNCATE_EXISTING ne truncate-a datoteku? (Odaberite sve točne)",
        "explanation": "TRUNCATE_EXISTING behaviour: (1) Ako datoteka NE postoji, TRUNCATE_EXISTING se IGNORIRA (no-op). (2) Ako je datoteka PRAZNA, truncate ne radi ništa (već je 0 bytes). (3) TRUNCATE_EXISTING zahtijeva WRITE permission - bez nje AccessDeniedException. (4) TRUNCATE_EXISTING je DEFAULT za writeString() bez opcija! (5) S APPEND opcom, TRUNCATE_EXISTING se IGNORIRA (konfliktirajuće opcije). (6) Na direktoriju baca IOException. TRUNCATE_EXISTING briše postojeći sadržaj prije pisanja. CREATE + TRUNCATE_EXISTING je default kombinacija.",
        "difficulty": "HARD",
        "options": [
          { "text": "Ako datoteka ne postoji - ignorira se", "isCorrect": true },
          { "text": "S APPEND opcijom - konflikt, APPEND ima prioritet", "isCorrect": true },
          { "text": "Na praznoj datoteci - već je 0 bytes", "isCorrect": true },
          { "text": "Uvijek truncate-a bez obzira na opcije", "isCorrect": false },
          { "text": "Bez WRITE permisija - AccessDeniedException", "isCorrect": true },
          { "text": "TRUNCATE_EXISTING nije default", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Može li Files.walk() detektirati infinite loop s symbolic link-ovima?",
        "codeSnippet": "import java.nio.file.*;\nimport java.io.IOException;\n\npublic class SymlinkLoopTest {\n    public static void main(String[] args) throws IOException {\n        Path dir = Path.of(\"testdir\");\n        Files.createDirectories(dir);\n        \n        // Kreiraj circular symlink: testdir/link -> testdir\n        Path link = dir.resolve(\"link\");\n        Files.createSymbolicLink(link, dir);\n        \n        // Pokušaj walk - infinite loop?\n        try (var stream = Files.walk(dir)) {\n            long count = stream.count();\n            System.out.println(\"Count: \" + count);\n        } catch (Exception e) {\n            System.out.println(\"Exception: \" + e.getClass().getSimpleName());\n        }\n    }\n}",
        "explanation": "Kod NEĆE ući u infinite loop! Files.walk() default IGNORA symbolic links (ne prati ih)! count() vraća broj elemenata bez praćenja symlink-a. Za praćenje linkova koristiti FileVisitOption.FOLLOW_LINKS. S FOLLOW_LINKS, walk() DETEKTIRA cycles i baca FileSystemLoopException! walk() tracka visited directories. FOLLOW_LINKS bez cycle detection bi bio infinite loop. walk() je SAFE po defaultu. maxDepth parametar također limitira dubinu. Circular symlinks su common security issue.",
        "difficulty": "HARD",
        "options": [
          { "text": "NE - default ne prati symlinks, vraća count bez loop-a", "isCorrect": true },
          { "text": "DA - ulazi u infinite loop i visi", "isCorrect": false },
          { "text": "Baca FileSystemLoopException odmah", "isCorrect": false },
          { "text": "S FOLLOW_LINKS detektira cycle i baca exception", "isCorrect": true },
          { "text": "Pada s StackOverflowError", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Koje ObjectOutputStream metode pišu podatke BEZ pozivanja writeObject()? (Odaberite sve točne)",
        "explanation": "ObjectOutputStream typed write metode: (1) writeInt(), writeDouble(), writeLong() - primitive types. (2) writeUTF() - String u modified UTF format. (3) writeBytes() - byte array. (4) writeChars() - String kao char array. (5) writeBoolean(), writeByte(), writeShort(), writeChar(), writeFloat(). Sve ove metode pišu RAW podatke, ne serializiraju objekte! writeObject() koristi se za OBJEKTE (sa Serializable). write() metode za PRIMITIVE types i Stringove. defaultWriteObject() piše default serialization. writeUnshared() sprječava shared references.",
        "difficulty": "MEDIUM",
        "options": [
          { "text": "writeInt(), writeDouble(), writeLong()", "isCorrect": true },
          { "text": "writeUTF()", "isCorrect": true },
          { "text": "writeBoolean(), writeByte(), writeFloat()", "isCorrect": true },
          { "text": "defaultWriteObject()", "isCorrect": false },
          { "text": "writeBytes(), writeChars()", "isCorrect": true },
          { "text": "writeFields()", "isCorrect": false }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Što će biti sadržaj datoteke nakon izvršavanja?",
        "codeSnippet": "import java.io.*;\n\npublic class PrintWriterAutoFlushTest {\n    public static void main(String[] args) throws IOException {\n        PrintWriter pw = new PrintWriter(\n            new FileWriter(\"test.txt\"), \n            true); // autoFlush = true\n        \n        pw.print(\"Hello \");\n        pw.print(\"World\");\n        pw.println(\" Java\");\n        pw.print(\"End\");\n        \n        // Bez close()!\n    }\n}",
        "explanation": "Datoteka sadrži 'Hello World Java\\n' - 'End' NEDOSTAJE! autoFlush = true flusha SAMO na println(), printf(), format() - NE na print()! print() metode NE triggeraju flush čak i s autoFlush. println() dodaje newline i flusha. 'End' ostaje u bufferu jer nema close() ni flush(). autoFlush je PARTIAL guarantee! Za potpuni flush potreban close() ili eksplicitan flush(). autoFlush se često KRIVO razumije - ne znači 'flush after every write'!",
        "difficulty": "HARD",
        "options": [
          { "text": "'Hello World Java\\n' - 'End' nedostaje, print() ne flusha", "isCorrect": true },
          { "text": "'Hello World Java\\nEnd' - sve je flushed", "isCorrect": false },
          { "text": "Prazna datoteka - autoFlush ne radi bez close()", "isCorrect": false },
          { "text": "'Hello ' - samo prvi print() je flushed", "isCorrect": false },
          { "text": "'End' - samo zadnje je u datoteci", "isCorrect": false }
        ]
      },
      {
        "type": "MULTIPLE_CHOICE",
        "prompt": "Što Path.relativize() radi s pathovima na različitim drive-ovima (Windows)? (Odaberite sve točne)",
        "explanation": "relativize() na različitim drive-ovima: (1) Windows: C:\\a.relativize(D:\\b) baca IllegalArgumentException! Ne mogu se relativizirati različiti drive-ovi. (2) Oba patha moraju biti oba RELATIVNI ili oba APSOLUTNI. (3) Unix/Linux: sve je jedan root pa radi. (4) relativize() kreira path od this → other. (5) base.relativize(base) vraća prazan path (''). (6) base.resolve(base.relativize(target)) == target (ako su kompatibilni). relativize() je INVERZ od resolve()!",
        "difficulty": "HARD",
        "options": [
          { "text": "Baca IllegalArgumentException - različiti drive-ovi", "isCorrect": true },
          { "text": "Radi normalno - kreira ../../../D:/b path", "isCorrect": false },
          { "text": "Vraća null za incompatible paths", "isCorrect": false },
          { "text": "Oba moraju biti relativni ili oba apsolutni", "isCorrect": true },
          { "text": "base.relativize(base) vraća ''", "isCorrect": true },
          { "text": "Unix/Linux nema ovaj problem - jedan root", "isCorrect": true }
        ]
      },
      {
        "type": "CODE_WILL_COMPILE",
        "prompt": "Je li moguće serijalizirati objekt koji sadrži lambda izraz?",
        "codeSnippet": "import java.io.*;\nimport java.util.function.Predicate;\n\nclass LambdaContainer implements Serializable {\n    private static final long serialVersionUID = 1L;\n    \n    private Predicate<String> predicate = s -> s.length() > 5;\n}\n\npublic class LambdaSerializationTest {\n    public static void main(String[] args) throws IOException {\n        LambdaContainer container = new LambdaContainer();\n        \n        try (ObjectOutputStream out = new ObjectOutputStream(\n                new FileOutputStream(\"lambda.ser\"))) {\n            out.writeObject(container);\n            System.out.println(\"Serialized!\");\n        }\n    }\n}",
        "explanation": "Kod pada s NotSerializableException! Lambda izrazi su DEFAULT NOT serializable! Predicate field nije Serializable. Za serijalizaciju lambde potreban CAST na Serializable: Predicate<String> & Serializable. Primjer: private Predicate<String> p = (Predicate<String> & Serializable) s -> s.length() > 5. Lambda s intersection type je serializable ALI: (1) Fragile - internal representation može se promijeniti, (2) Cross-JVM compatibility nije garantirana. NAJBOLJE: Ne serijalizirati lambde! Koristiti named classes ili method references.",
        "difficulty": "HARD",
        "options": [
          { "text": "Pada s NotSerializableException - lambda nije serializable", "isCorrect": true },
          { "text": "Radi - lambda se automatski serijalizira", "isCorrect": false },
          { "text": "Lambda postaje null pri deserijalizaciji", "isCorrect": false },
          { "text": "Neće se kompilirati - lambda ne može biti field", "isCorrect": false },
          { "text": "Radi s cast na Serializable & Predicate", "isCorrect": true }
        ]
      }
  ]
}
