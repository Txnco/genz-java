import { QuestionType, Difficulty } from '@prisma/client'

export const javaFx = {
  lectureSlug: 'javafx',
  questions: [
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa ako pozovete Application.launch() VIŠE PUTA u istom programu? (Odaberite sve točne)",
      "explanation": "Application.launch() može se pozvati SAMO JEDNOM po JVM procesu! Drugi poziv baca IllegalStateException: 'Application launch must not be called more than once'. launch() pokreće JavaFX Application Thread koji može postojati samo jednom. Za ponovno pokretanje aplikacije mora se kreirati NOVI JVM proces. launch() je BLOCKING poziv - vraća kontrolu tek kada se aplikacija zatvori. Platform.exit() ili Stage.close() zatvaraju aplikaciju ali NE resetiraju launch() status. Za testiranje koristiti @Rule JavaFXThreadingRule ili TestFX framework. Workaround: Koristiti Platform.startup() (Java 19+) umjesto launch().",
      "difficulty": "HARD",
      "options": [
        { "text": "Baca IllegalStateException - može se pozvati samo jednom", "isCorrect": true },
        { "text": "Kreira novi Stage - multiple windows", "isCorrect": false },
        { "text": "Resetira aplikaciju na početno stanje", "isCorrect": false },
        { "text": "Drugi poziv se ignorira - no-op", "isCorrect": false },
        { "text": "launch() je blocking - vraća kontrolu tek pri zatvaranju", "isCorrect": true },
        { "text": "Mora se kreirati novi JVM proces za ponovno pokretanje", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći JavaFX kod kompilirati?",
      "codeSnippet": "import javafx.application.Application;\nimport javafx.stage.Stage;\nimport javafx.scene.Scene;\nimport javafx.scene.layout.StackPane;\n\npublic class MultiSceneTest extends Application {\n    @Override\n    public void start(Stage primaryStage) {\n        StackPane root1 = new StackPane();\n        Scene scene1 = new Scene(root1, 300, 200);\n        \n        StackPane root2 = new StackPane();\n        Scene scene2 = new Scene(root2, 400, 300);\n        \n        // Postavi obje scene na isti Stage?\n        primaryStage.setScene(scene1);\n        primaryStage.setScene(scene2);\n        \n        primaryStage.show();\n    }\n    \n    public static void main(String[] args) {\n        launch(args);\n    }\n}",
      "explanation": "Kod se KOMPILIRA i prikazuje scene2! Stage može imati SAMO JEDNU Scene u bilo kojem trenutku. Drugi setScene() poziv ZAMJENJUJE prvu scenu. scene1 se NE prikazuje jer je overwriteana. Za switching između scena koristiti setScene() dinamički (npr. na button click). Scene Graph koncept: Stage → Scene → Root Node → Children. Svaka Scene može imati različitu veličinu, CSS, root node. Multiple stages = multiple windows. Scene.setRoot() također može mijenjati sadržaj. Scene NE mora biti na Stage-u da postoji - može se kreirati unaprijed. getScene() vraća trenutnu scenu.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Kompilira se i prikazuje scene2 - drugi setScene() zamjenjuje prvi", "isCorrect": true },
        { "text": "Neće se kompilirati - Stage ne može imati dvije Scene", "isCorrect": false },
        { "text": "Kompilira se i prikazuje obje scene odjednom", "isCorrect": false },
        { "text": "Pada u runtime s IllegalStateException", "isCorrect": false },
        { "text": "Kompilira se ali ne prikazuje ništa", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje metode JavaFX Application klase MORAJU biti implementirane? (Odaberite sve točne)",
      "explanation": "SAMO start(Stage primaryStage) metoda je OBAVEZNA - to je ABSTRACT metoda! init() i stop() su OPCIONALNE - imaju default implementacije. init() se poziva PRIJE start() na launcher thread-u (ne JavaFX thread). stop() se poziva NAKON zatvaranja svih Stage-ova na JavaFX thread-u. main() metoda NIJE obavezna ako se pokreće direktno s 'java MyApp' (module-info). Lifecycle: main() → launch() → init() → start() → [aplikacija radi] → stop(). init() koristi se za: učitavanje konfiguracije, database connection, ne za GUI kreiranje! stop() za: cleanup, zatvaranje resursa, spremanje stanja.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "start(Stage primaryStage) - OBAVEZNA abstract metoda", "isCorrect": true },
        { "text": "init() - opcionalna, poziva se prije start()", "isCorrect": false },
        { "text": "stop() - opcionalna, poziva se pri zatvaranju", "isCorrect": false },
        { "text": "main(String[] args) - obavezna za pokretanje", "isCorrect": false },
        { "text": "launch(String[] args) - mora biti pozvana", "isCorrect": false },
        { "text": "Sve navedene metode su obavezne", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati sljedeći kod s Platform.runLater()?",
      "codeSnippet": "import javafx.application.Application;\nimport javafx.application.Platform;\nimport javafx.stage.Stage;\n\npublic class RunLaterTest extends Application {\n    @Override\n    public void start(Stage primaryStage) {\n        System.out.println(\"1\");\n        \n        Platform.runLater(() -> {\n            System.out.println(\"2\");\n        });\n        \n        System.out.println(\"3\");\n        \n        Platform.runLater(() -> {\n            System.out.println(\"4\");\n        });\n        \n        System.out.println(\"5\");\n        \n        primaryStage.show();\n    }\n    \n    public static void main(String[] args) {\n        launch(args);\n    }\n}",
      "explanation": "Ispisuje '1', '3', '5', '2', '4' (ili '1', '3', '5', zatim '2' i '4' u nekom redoslijedu). Platform.runLater() ODGAĐA izvršavanje na SLJEDEĆI JavaFX pulse! runLater() dodaje Runnable u JavaFX event queue. start() metoda JE na JavaFX thread-u pa se izvršava odmah. runLater() lambde se izvršavaju NAKON što start() završi. Redoslijed runLater() poziva je GARANTIRAN (FIFO queue). Pulse = JavaFX render cycle (~60 FPS). runLater() koristi se za: UI updates iz background threada, deferring heavy operations, breaking stack depth. Platform.isFxApplicationThread() provjerava jeste li na FX threadu.",
      "difficulty": "HARD",
      "options": [
        { "text": "1, 3, 5, 2, 4 - runLater() odgađa izvršavanje", "isCorrect": true },
        { "text": "1, 2, 3, 4, 5 - izvršava se redom", "isCorrect": false },
        { "text": "5, 4, 3, 2, 1 - reverse order", "isCorrect": false },
        { "text": "1, 3, 5 - runLater() se preskače", "isCorrect": false },
        { "text": "Neće se kompilirati - runLater() ne prima lambda", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što FXMLLoader.load() vraća ako FXML datoteka ne postoji? (Odaberite sve točne)",
      "explanation": "FXMLLoader.load() baca IOException ako datoteka ne postoji! NE vraća null. Razlozi za IOException: (1) FXML datoteka ne postoji na navedenoj putanji, (2) Path je pogrešan (typo), (3) Resource nije u classpath-u, (4) Package struktura ne odgovara. load() također baca IOException za: invalid XML, nepostojeće JavaFX klase u FXML-u, missing fx:controller klasa. Za debug koristiti getClass().getResource() prije load() - vraća null ako resource ne postoji. Best practice: Provjeriti null prije load(). LoadException se baca za FXML syntax errors. NullPointerException ako je URL null.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Baca IOException - datoteka ne postoji", "isCorrect": true },
        { "text": "Vraća null", "isCorrect": false },
        { "text": "Vraća prazan Parent node", "isCorrect": false },
        { "text": "Baca FileNotFoundException", "isCorrect": false },
        { "text": "getResource() vraća null ako resource ne postoji", "isCorrect": true },
        { "text": "LoadException za FXML syntax errors", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Je li potreban no-arg konstruktor za FXML Controller klasu?",
      "codeSnippet": "// Controller.java\npublic class MyController {\n    @FXML\n    private Button myButton;\n    \n    // Konstruktor s parametrom\n    public MyController(String param) {\n        System.out.println(param);\n    }\n    \n    // NEMA no-arg konstruktora!\n    \n    @FXML\n    public void initialize() {\n        myButton.setText(\"Initialized\");\n    }\n}\n\n// FXML\n// fx:controller=\"com.example.MyController\"",
      "explanation": "FXMLLoader će FAILATI s InstantiationException! Controller klasa MORA imati no-arg konstruktor (public ili package-private). FXMLLoader koristi reflection za kreiranje instance: Class.newInstance() ili Constructor.newInstance(). Bez no-arg konstruktora reflection ne može kreirati objekt. Rješenja: (1) Dodati prazan konstruktor, (2) Koristiti FXMLLoader s custom controller factory, (3) setControllerFactory() prije load(). Custom factory omogućava dependency injection (Spring, Guice). initialize() se poziva NAKON što su sva @FXML polja inicijalizirana. Controller može biti inner class ALI mora biti static!",
      "difficulty": "HARD",
      "options": [
        { "text": "DA - baca InstantiationException bez no-arg konstruktora", "isCorrect": true },
        { "text": "NE - FXMLLoader poziva konstruktor s parametrima", "isCorrect": false },
        { "text": "NE - initialize() zamjenjuje konstruktor", "isCorrect": false },
        { "text": "DA - ali može biti private", "isCorrect": false },
        { "text": "Rješenje: setControllerFactory() za custom instantiation", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je razlika između Stage.close() i Platform.exit()? (Odaberite sve točne)",
      "explanation": "Stage.close() zatvara JEDAN Stage (window), Platform.exit() zatvara CIJELU aplikaciju! close() poziva onCloseRequest handler - može se cancelirati. exit() force quit - NEMA cancel mogućnosti. close() na primaryStage defaultno zatvara app ako je implicitExit=true. setImplicitExit(false) sprječava automatic shutdown. exit() poziva stop() metodu prije zatvaranja. close() ne poziva stop() osim ako je zadnji Stage. Multiple stages: close() samo taj Stage, exit() SVE. System.exit() također zatvara ali preskače JavaFX cleanup! Best practice: close() za pojedine prozore, exit() za explicit shutdown. OnCloseRequest može se koristiti za 'Are you sure?' dialog.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "close() zatvara jedan Stage, exit() cijelu aplikaciju", "isCorrect": true },
        { "text": "close() može se cancelirati, exit() ne može", "isCorrect": true },
        { "text": "exit() poziva stop() metodu, close() ne", "isCorrect": false },
        { "text": "close() i exit() rade isto - synonyms", "isCorrect": false },
        { "text": "implicitExit=false sprječava automatic shutdown", "isCorrect": true },
        { "text": "System.exit() preskače JavaFX cleanup", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati TableView ako ObservableList nije postavljen?",
      "codeSnippet": "import javafx.scene.control.*;\nimport javafx.collections.*;\n\npublic class TableViewEmptyTest {\n    public void setup() {\n        TableView<String> table = new TableView<>();\n        \n        TableColumn<String, String> col = new TableColumn<>(\"Data\");\n        table.getColumns().add(col);\n        \n        // NIJE pozvan setItems()!\n        \n        System.out.println(\"Items: \" + table.getItems());\n        System.out.println(\"Size: \" + table.getItems().size());\n    }\n}",
      "explanation": "Ispisuje 'Items: []' i 'Size: 0'. TableView ima DEFAULT PRAZAN ObservableList! getItems() NIKAD ne vraća null - vraća prazan FXCollections.emptyObservableList(). Ako nije postavljen setItems(), koristi se default empty list. Za provjeru: table.getItems().isEmpty() ili size() == 0. setItems(null) ZAMJENJUJE s null - onda getItems() vraća null! Razlika: default empty list vs explicit null. Default list je UNMODIFIABLE - add() baca UnsupportedOperationException! Za modificiranje mora se setItems() s modifiable listom. PlaceholderNode se prikazuje kada je lista prazna.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Items: [], Size: 0 - default prazan ObservableList", "isCorrect": true },
        { "text": "Baca NullPointerException - items je null", "isCorrect": false },
        { "text": "Items: null, Size: 0", "isCorrect": false },
        { "text": "Neće se kompilirati - mora biti setItems()", "isCorrect": false },
        { "text": "Default list je unmodifiable - add() baca exception", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje CSS svojstvo postavlja font size u JavaFX-u? (Odaberite sve točne)",
      "explanation": "JavaFX CSS koristi -fx-font-size, NE font-size! SVI CSS propertyi u JavaFX-u imaju -fx- PREFIX. Web CSS: font-size, JavaFX: -fx-font-size. Web: background-color, JavaFX: -fx-background-color. Web: padding, JavaFX: -fx-padding. Razlog: Izbjegavanje konflikta s web CSS-om. JavaFX CSS parser ignorira propertye BEZ -fx- prefixa! Compatibilnost: JavaFX CSS nije W3C standard. Jedinice: pt, px, em, % - iste kao web. -fx-font-family za font, -fx-text-fill za boju teksta. CSS file se učitava s scene.getStylesheets().add(). Inline stil: node.setStyle('-fx-font-size: 20px').",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "-fx-font-size - SA -fx- prefiksom", "isCorrect": true },
        { "text": "font-size - kao u web CSS-u", "isCorrect": false },
        { "text": "fontSize - camelCase stil", "isCorrect": false },
        { "text": "Sva JavaFX CSS svojstva imaju -fx- prefiks", "isCorrect": true },
        { "text": "CSS bez -fx- se ignorira", "isCorrect": true },
        { "text": "-fx-text-fill za boju teksta", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Može li GridPane imati negativne row/column indekse?",
      "codeSnippet": "import javafx.scene.layout.GridPane;\nimport javafx.scene.control.Button;\n\npublic class GridPaneNegativeTest {\n    public void setup() {\n        GridPane grid = new GridPane();\n        \n        Button b1 = new Button(\"Zero\");\n        Button b2 = new Button(\"Negative\");\n        Button b3 = new Button(\"Positive\");\n        \n        grid.add(b1, 0, 0);   // Normal\n        grid.add(b2, -1, -1); // Negativno?\n        grid.add(b3, 1, 1);   // Normal\n        \n        System.out.println(\"Added buttons!\");\n    }\n}",
      "explanation": "Kod se KOMPILIRA i radi! GridPane DOZVOLJAVA negativne indekse! Row i column mogu biti bilo koji int vrijednosti (pozitivni, 0, negativni). GridPane automatski proširuje grid u svim smjerovima. Negativni indeksi postavljaju elemente 'lijevo od nule' ili 'iznad nule'. Koordinatni sustav: (0,0) je 'origin' ali ne mora biti lijevi gornji kut! getColumnIndex() i getRowIndex() mogu vratiti negativne vrijednosti. GridPane nema fiksnu veličinu - dinamički raste. Ovo omogućava CENTRIRANJE bez znanja ukupne veličine! Npr. srednji element na (0,0), ostali oko njega. columnSpan i rowSpan mogu biti samo pozitivni.",
      "difficulty": "HARD",
      "options": [
        { "text": "DA - GridPane dozvoljava negativne indekse", "isCorrect": true },
        { "text": "NE - baca IllegalArgumentException", "isCorrect": false },
        { "text": "Kompilira se ali elementi se ne prikazuju", "isCorrect": false },
        { "text": "GridPane automatski konvertira u pozitivne", "isCorrect": false },
        { "text": "GridPane grid dinamički raste u svim smjerovima", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što @FXML anotacija radi? (Odaberite sve točne)",
      "explanation": "@FXML označava polja i metode koje FXMLLoader treba povezati s FXML elementima! (1) Polja: moraju imati ISTO ime kao fx:id u FXML-u. (2) Metode: povezuju se s event handlers (onAction='#methodName'). (3) @FXML MIJENJA vidljivost - private/package-private postaju dostupni FXMLLoader-u! (4) Bez @FXML, private polja nisu dostupna reflection-u. (5) initialize() metoda mora biti @FXML. (6) @FXML ne radi na static poljima! (7) Controller injection: @FXML se preskače ako se koristi setController(). Best practice: Držati @FXML polja private za encapsulation. FXMLLoader koristi reflection za pristup.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Označava polja/metode za FXMLLoader povezivanje", "isCorrect": true },
        { "text": "Polja moraju imati isto ime kao fx:id", "isCorrect": true },
        { "text": "Mijenja vidljivost - omogućava reflection pristup", "isCorrect": true },
        { "text": "Mora biti na public poljima", "isCorrect": false },
        { "text": "Ne radi na static poljima", "isCorrect": true },
        { "text": "initialize() metoda mora biti @FXML", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što vraća Parent.getChildren() za Region?",
      "codeSnippet": "import javafx.scene.layout.*;\nimport javafx.scene.control.Button;\n\npublic class RegionChildrenTest {\n    public void test() {\n        // BorderPane extends Region extends Parent\n        BorderPane borderPane = new BorderPane();\n        borderPane.setCenter(new Button(\"Center\"));\n        \n        // Region metoda\n        System.out.println(\"Children: \" + borderPane.getChildren());\n        System.out.println(\"Size: \" + borderPane.getChildren().size());\n    }\n}",
      "explanation": "Kod se NEĆE KOMPILIRATI! Region NE EKSPONIRA getChildren() metodu! Parent ima getChildren() ali je PROTECTED. Region je subclasa Parent-a ali ne otkriva children. BorderPane.setCenter() dodaje child interno ali getChildren() nije dostupno. Za pristup koristiti getChildrenUnmodifiable() - vraća READ-ONLY listu. Razlog: Region kontrolira svoj layout - ne dozvoljava direktno dodavanje. Pane extends Region i OTKRIVA getChildren(). HBox, VBox, StackPane, FlowPane nasljeđuju Pane. BorderPane, GridPane koriste specifične add() metode. Control također ne eksponira children.",
      "difficulty": "HARD",
      "options": [
        { "text": "NEĆE se kompilirati - Region nema getChildren()", "isCorrect": true },
        { "text": "Vraća children list s jednim Button-om", "isCorrect": false },
        { "text": "Vraća prazan list", "isCorrect": false },
        { "text": "Vraća null", "isCorrect": false },
        { "text": "getChildrenUnmodifiable() vraća read-only listu", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje layout containere imaju getChildren() metodu dostupnu? (Odaberite sve točne)",
      "explanation": "Samo containeri koji nasljeđuju PANE imaju public getChildren()! (1) Pane - base class, direktan pristup. (2) HBox, VBox, StackPane, FlowPane - nasljeđuju Pane. (3) TilePane, AnchorPane - također Pane subclase. BorderPane i GridPane NE nasljeđuju Pane - imaju specijalizirane add() metode! BorderPane.setTop/Left/Center/Right/Bottom. GridPane.add(node, col, row). Region i Control također NEMAJU public getChildren(). Parent ima getChildren() ali je PROTECTED. Za read-only pristup koristiti getChildrenUnmodifiable(). Group ima public getChildren().",
      "difficulty": "HARD",
      "options": [
        { "text": "Pane i sve njegove subclase", "isCorrect": true },
        { "text": "HBox, VBox, StackPane, FlowPane", "isCorrect": true },
        { "text": "BorderPane", "isCorrect": false },
        { "text": "GridPane", "isCorrect": false },
        { "text": "TilePane, AnchorPane", "isCorrect": true },
        { "text": "Group", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što će ispisati kod s ObservableList i običnom listom?",
      "codeSnippet": "import javafx.collections.*;\nimport java.util.*;\n\npublic class ObservableListTest {\n    public void test() {\n        List<String> normalList = new ArrayList<>();\n        normalList.add(\"A\");\n        normalList.add(\"B\");\n        \n        ObservableList<String> obsList = \n            FXCollections.observableArrayList(normalList);\n        \n        obsList.add(\"C\");\n        normalList.add(\"D\");\n        \n        System.out.println(\"Normal: \" + normalList.size());\n        System.out.println(\"Observable: \" + obsList.size());\n    }\n}",
      "explanation": "Ispisuje 'Normal: 3' i 'Observable: 3'. ObservableList kreira KOPIJU normale liste, NE dijele podatke! observableArrayList() kopira elemente u novu listu. Promjene u normalList NE utječu na obsList i obrnuto. Za shared data koristiti observableList(List) - wrappa postojeću listu. Razlika: observableArrayList() = nova lista, observableList() = wrapper. Wrapped lista: promjene se reflektiraju u obje! observable liste šalju change notifikacije ListChangeListener-ima. Normal lista to ne radi. Za TableView/ListView MORA se koristiti ObservableList. FXCollections factory ima mnogo metoda: unmodifiableObservableList, synchronizedObservableList, emptyObservableList.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Normal: 3, Observable: 3 - kreira kopiju, ne dijele podatke", "isCorrect": true },
        { "text": "Normal: 3, Observable: 4 - dijele podatke", "isCorrect": false },
        { "text": "Normal: 4, Observable: 3 - obrnuto", "isCorrect": false },
        { "text": "Oba 4 - potpuno sinkronizirani", "isCorrect": false },
        { "text": "observableList(List) wrappa, observableArrayList() kopira", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kada se poziva initialize() metoda u Controlleru? (Odaberite sve točne)",
      "explanation": "initialize() se poziva NAKON što su sva @FXML polja inicijalizirana, ali PRIJE nego što je root node vraćen! Timing: FXMLLoader.load() → parse FXML → kreiraj controller → inject @FXML fields → pozovi initialize() → vrati root. initialize() mora biti @FXML annotated. initialize() može biti bez parametara ILI s parametrima (URL location, ResourceBundle resources). Parametri se automatski injektiraju. Koristi se za: event listener setup, data binding,初期 table data, validaciju. NE koristi se za GUI kreiranje - to radi FXML! initialize() je kao konstruktor ALI sa pristupom @FXML poljima. Construktor JOŠ NEMA @FXML polja inicijalizirana!",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Nakon što su sva @FXML polja inicijalizirana", "isCorrect": true },
        { "text": "Prije nego što je root node vraćen iz load()", "isCorrect": true },
        { "text": "Prije konstruktora Controller klase", "isCorrect": false },
        { "text": "Može imati URL i ResourceBundle parametre", "isCorrect": true },
        { "text": "U konstruktoru @FXML polja su već dostupna", "isCorrect": false },
        { "text": "Mora biti @FXML annotated", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Je li PropertyValueFactory case-sensitive?",
      "codeSnippet": "class Person {\n    private String firstName;\n    \n    public String getFirstName() { return firstName; }\n    public void setFirstName(String name) { this.firstName = name; }\n}\n\nTableColumn<Person, String> col = new TableColumn<>(\"Name\");\n\n// Opcija 1\ncol.setCellValueFactory(new PropertyValueFactory<>(\"firstName\"));\n\n// Opcija 2\ncol.setCellValueFactory(new PropertyValueFactory<>(\"FirstName\"));\n\n// Opcija 3\ncol.setCellValueFactory(new PropertyValueFactory<>(\"FIRSTNAME\"));\n\n// Koja opcija radi?",
      "explanation": "SAMO Opcija 1 radi! PropertyValueFactory JE CASE-SENSITIVE i traži EXACT property name! String mora matchati property ime (field ili getter/setter). PropertyValueFactory traži: (1) getFirstName() metodu, (2) firstNameProperty() metodu, (3) firstName field. Ime se konvertira: 'firstName' → 'getFirstName()', 'FirstName' → 'getFirstName()'. 'FirstName' NE radi jer traži 'getFirstName()' ali name mora biti 'firstName'. Java Bean konvencije: propertyName → getPropertyName(). Za custom logic koristiti Callback umjesto PropertyValueFactory. ObservableValue iz property() omogućava automatic updates.",
      "difficulty": "HARD",
      "options": [
        { "text": "Samo Opcija 1 - case-sensitive exact match", "isCorrect": true },
        { "text": "Sve tri opcije rade - case-insensitive", "isCorrect": false },
        { "text": "Opcija 2 radi - capitalized", "isCorrect": false },
        { "text": "Opcija 3 radi - uppercase", "isCorrect": false },
        { "text": "PropertyValueFactory traži getter/property/field", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa ako fx:id u FXML-u ne matchira @FXML polje u Controlleru? (Odaberite sve točne)",
      "explanation": "FXMLLoader NE baca exception ako fx:id ne postoji u Controlleru! Jednostavno PRESKAČE injektiranje. FXML element se kreira normalno ali @FXML polje ostaje null. Greška se javlja tek kad pokušate koristiti to polje - NullPointerException! FXML može imati VIŠE fx:id-eva nego što Controller ima @FXML polja. Obrnuto: Controller može imati @FXML polja koja ne postoje u FXML-u (ostaju null). Za debug: provjeriti null u initialize(). LoadException se baca samo za: syntax errors, missing classes, invalid attributes. Typo u fx:id je SILENT failure! Best practice: Konzistentno imenovanje (camelCase).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "NE baca exception - preskače injektiranje", "isCorrect": true },
        { "text": "@FXML polje ostaje null", "isCorrect": true },
        { "text": "NullPointerException tek pri korištenju", "isCorrect": true },
        { "text": "Baca LoadException odmah", "isCorrect": false },
        { "text": "FXML može imati više fx:id nego @FXML polja", "isCorrect": true },
        { "text": "Controller može imati više @FXML polja nego fx:id", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Može li BorderPane imati više od 5 children?",
      "codeSnippet": "import javafx.scene.layout.BorderPane;\nimport javafx.scene.control.*;\n\npublic class BorderPaneMaxTest {\n    public void test() {\n        BorderPane pane = new BorderPane();\n        \n        pane.setTop(new Button(\"Top1\"));\n        pane.setTop(new Button(\"Top2\")); // Drugi top?\n        \n        pane.setLeft(new Button(\"Left\"));\n        pane.setCenter(new Button(\"Center\"));\n        pane.setRight(new Button(\"Right\"));\n        pane.setBottom(new Button(\"Bottom\"));\n        \n        // Koliko children ima?\n        System.out.println(pane.getChildrenUnmodifiable().size());\n    }\n}",
      "explanation": "Ispisuje '5' - drugi setTop() ZAMJENJUJE prvi! BorderPane ima MAKSIMALNO 5 pozicija (TOP, LEFT, CENTER, RIGHT, BOTTOM). Svaka pozicija može imati SAMO JEDAN node. Drugi setTop() overwritea prethodni - Top1 se uklanja. getChildrenUnmodifiable() vraća trenutne children (max 5). Za više elemenata na jednoj poziciji koristiti container (HBox, VBox): pane.setTop(new HBox(button1, button2)). set*() s null UKLANJA child iz te pozicije. BorderPane automatski resizea children prema poziciji. TOP/BOTTOM rastežu horizontalno, LEFT/RIGHT vertikalno, CENTER uzima sav preostali prostor.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "5 - drugi setTop() zamjenjuje prvi", "isCorrect": true },
        { "text": "6 - oba Top buttona ostaju", "isCorrect": false },
        { "text": "Baca IllegalStateException - već ima Top", "isCorrect": false },
        { "text": "4 - drugi Top se ignorira", "isCorrect": false },
        { "text": "Za više elemenata koristiti container (HBox/VBox)", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je razlika između Scene.getRoot() i Scene.setRoot()? (Odaberite sve točne)",
      "explanation": "getRoot() VRAĆA trenutni root node, setRoot() POSTAVLJA novi root i ZAMJENJUJE stari! setRoot() omogućava dynamic content switching BEZ mijenjanja Scene objekta. setRoot(null) UKLANJA sve children iz Scene-a - prazan prozor! Root mora biti Parent subclasa (Pane, Region, Group). setRoot() triggera layout recalculation. Scene može postojati BEZ root-a (temporary state). getRoot() vraća null ako nije postavljen. Za preserving state koristiti multiple scenes umjesto setRoot(). setRoot() je brži od kreiranja nove Scene. CSS stylesheets ostaju nakon setRoot() - vezani su za Scene, ne root!",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "getRoot() vraća root, setRoot() mijenja root", "isCorrect": true },
        { "text": "setRoot() zamjenjuje postojeći root", "isCorrect": true },
        { "text": "setRoot(null) kreira prazan prozor", "isCorrect": true },
        { "text": "getRoot() ne može vratiti null", "isCorrect": false },
        { "text": "CSS ostaju nakon setRoot() - vezani za Scene", "isCorrect": true },
        { "text": "Root mora biti Parent subclasa", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što vraća FlowPane sa spacing = -5?",
      "codeSnippet": "import javafx.scene.layout.FlowPane;\nimport javafx.scene.control.Button;\n\npublic class FlowPaneNegativeSpacingTest {\n    public void test() {\n        FlowPane flow = new FlowPane();\n        \n        // Negativan spacing?\n        flow.setHgap(-5);\n        flow.setVgap(-5);\n        \n        flow.getChildren().addAll(\n            new Button(\"A\"),\n            new Button(\"B\"),\n            new Button(\"C\")\n        );\n        \n        System.out.println(\"HGap: \" + flow.getHgap());\n        System.out.println(\"VGap: \" + flow.getVgap());\n    }\n}",
      "explanation": "Ispisuje 'HGap: -5.0' i 'VGap: -5.0'. Negativan spacing JE DOZVOLJEN i radi! Elementi se PREKLAPAJU za negativne vrijednosti. Negativan spacing koristin za: overlapping effects, compact layouts, custom positioning. HGap = horizontal gap između children. VGap = vertical gap između children. Alignment još uvijek radi s negativnim spacing-om. FlowPane layout: lijevo-desno s wrap-om, top-bottom. setHgap() prima double vrijednost (može biti negative, 0, positive). Default spacing je 0. Za fine-tuning koristiti setMargin() na individual nodes.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "HGap: -5, VGap: -5 - negativan spacing je dozvoljen", "isCorrect": true },
        { "text": "HGap: 0, VGap: 0 - konvertira u 0", "isCorrect": false },
        { "text": "Baca IllegalArgumentException", "isCorrect": false },
        { "text": "HGap: 5, VGap: 5 - absolute value", "isCorrect": false },
        { "text": "Elementi se preklapaju s negativnim spacing-om", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Alert.showAndWait() vraća? (Odaberite sve točne)",
      "explanation": "showAndWait() vraća Optional<ButtonType> - result korisnikovog izbora! showAndWait() je BLOCKING - čeka dok korisnik ne zatvori dialog. show() je NON-BLOCKING - nastavlja izvršavanje odmah. ButtonType može biti: OK, CANCEL, YES, NO, CLOSE, APPLY, FINISH, NEXT, PREVIOUS, ili custom. Optional.empty() ako je dialog zatvoren bez button klika (X button ili ESC). Optional.get() vraća ButtonType - mora se provjeriti isPresent()! Optional.orElse(ButtonType.CANCEL) za default. showAndWait() mora biti na JavaFX thread-u! Za non-JavaFX thread koristiti Platform.runLater(). Custom buttons: new ButtonType('Custom', ButtonBar.ButtonData.OK_DONE).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Optional<ButtonType> - result korisnikovog izbora", "isCorrect": true },
        { "text": "showAndWait() je BLOCKING, show() non-blocking", "isCorrect": true },
        { "text": "Optional.empty() ako je zatvoren bez klika", "isCorrect": true },
        { "text": "Vraća boolean true/false", "isCorrect": false },
        { "text": "Vraća null ako je canceled", "isCorrect": false },
        { "text": "Mora biti na JavaFX thread-u", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Može li se MenuItem dodati direktno u MenuBar?",
      "codeSnippet": "import javafx.scene.control.*;\n\npublic class MenuItemDirectTest {\n    public void test() {\n        MenuBar menuBar = new MenuBar();\n        \n        MenuItem item1 = new MenuItem(\"File\");\n        MenuItem item2 = new MenuItem(\"Edit\");\n        \n        // Direktno dodavanje MenuItem?\n        menuBar.getMenus().addAll(item1, item2);\n    }\n}",
      "explanation": "Kod se NEĆE KOMPILIRATI! MenuBar.getMenus() vraća ObservableList<Menu>, NE MenuItem! MenuItem se mora dodati u Menu, zatim Menu u MenuBar. Hijerarhija: MenuBar → Menu → MenuItem. Menu je container, MenuItem je akcija. Primjer: Menu fileMenu = new Menu('File'); fileMenu.getItems().add(new MenuItem('Open')); menuBar.getMenus().add(fileMenu). Menu može sadržavati: MenuItem, CheckMenuItem, RadioMenuItem, SeparatorMenuItem, Menu (submenu). MenuBar je samo top-level container. MenuItem.setOnAction() za event handling. Accelerator za keyboard shortcuts.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "NEĆE se kompilirati - MenuBar prima Menu, ne MenuItem", "isCorrect": true },
        { "text": "Kompilira se i prikazuje items kao top-level", "isCorrect": false },
        { "text": "Kompilira se ali ne prikazuje ništa", "isCorrect": false },
        { "text": "MenuItem mora biti u Menu, Menu u MenuBar", "isCorrect": true },
        { "text": "getMenus() vraća ObservableList<Menu>", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kada se ToggleButton automatski deselektira? (Odaberite sve točne)",
      "explanation": "ToggleButton u ToggleGroup se deselektira kada se DRUGI button u istoj grupi selektira! ToggleGroup omogućava 'one selected at a time' ponašanje (radio button style). Klik na selektirani button u grupi NE deselektira ga! Za deselect mora se kliknuti drugi button ili pozvati setSelected(false). ToggleButton BEZ grupe: klik toggle-a između selected/deselected. setSelected(false) eksplicitno deselektira. clearSelection() na ToggleGroup deselektira sve. selectToggle(null) također deselektira. Toggle event: selectedProperty().addListener(). ToggleGroup može biti prazna (no selected button).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Kada se drugi button u ToggleGroup-i selektira", "isCorrect": true },
        { "text": "Klik na selektirani button ga NE deselektira", "isCorrect": true },
        { "text": "setSelected(false) eksplicitno deselektira", "isCorrect": true },
        { "text": "Automatski nakon 2 sekunde", "isCorrect": false },
        { "text": "ToggleGroup.clearSelection() deselektira sve", "isCorrect": true },
        { "text": "Bez grupe: klik toggle-a state", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što vraća TabPane.getSelectionModel().getSelectedItem() ako nema tab-ova?",
      "codeSnippet": "import javafx.scene.control.*;\n\npublic class TabPaneEmptyTest {\n    public void test() {\n        TabPane tabPane = new TabPane();\n        \n        // NEMA tab-ova!\n        \n        Tab selected = tabPane.getSelectionModel().getSelectedItem();\n        \n        System.out.println(\"Selected: \" + selected);\n        System.out.println(\"Index: \" + \n            tabPane.getSelectionModel().getSelectedIndex());\n    }\n}",
      "explanation": "Ispisuje 'Selected: null' i 'Index: -1'. Prazan TabPane nema selected tab-a! getSelectedItem() vraća null. getSelectedIndex() vraća -1 (no selection). Dodavanje prvog tab-a automatski ga selektira. Tab.setClosable(false) sprječava zatvaranje. TabPane.getTabs() vraća ObservableList<Tab>. SelectionModel omogućava programmatic selection: select(int), selectFirst(), selectLast(), selectNext(), selectPrevious(). Tab.setOnSelectionChanged() za event kad se tab selektira. Tab.setOnCloseRequest() za custom close logic. Tab.setContent() postavlja Node.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Selected: null, Index: -1 - nema tab-ova", "isCorrect": true },
        { "text": "Baca IndexOutOfBoundsException", "isCorrect": false },
        { "text": "Selected: empty Tab object", "isCorrect": false },
        { "text": "Index: 0 - default", "isCorrect": false },
        { "text": "Prvi dodan tab se automatski selektira", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Accordion.setExpandedPane(null) radi? (Odaberite sve točne)",
      "explanation": "setExpandedPane(null) ZATVARA sve TitledPane-ove - nema expanded pane-a! Accordion dozvoljava null expanded pane. Korisnik može kliknuti na expanded pane da ga zatvori (toggle behaviour). getExpandedPane() vraća null ako su svi zatvoreni. Accordion omogućava SAMO JEDAN expanded pane u bilo kojem trenutku. Klik na drugi TitledPane zatvara prethodni. expandedPaneProperty() za binding. TitledPane.setCollapsible(false) sprječava zatvaranje. TitledPane može postojati izvan Accordiona (samostalno). Multiple Accordions mogu imati iste TitledPane objekte? NE - node može imati samo jednog parenta!",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Zatvara sve TitledPane-ove - nema expanded", "isCorrect": true },
        { "text": "Accordion dozvoljava null expanded pane", "isCorrect": true },
        { "text": "Korisnik može toggle expanded pane", "isCorrect": true },
        { "text": "Baca NullPointerException", "isCorrect": false },
        { "text": "Samo jedan expanded pane u bilo kojem trenutku", "isCorrect": true },
        { "text": "TitledPane.setCollapsible(false) sprječava zatvaranje", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Je li TreeView root node vidljiv po defaultu?",
      "codeSnippet": "import javafx.scene.control.*;\n\npublic class TreeViewRootTest {\n    public void test() {\n        TreeItem<String> root = new TreeItem<>(\"Root\");\n        root.getChildren().addAll(\n            new TreeItem<>(\"Child1\"),\n            new TreeItem<>(\"Child2\")\n        );\n        \n        TreeView<String> tree = new TreeView<>(root);\n        \n        System.out.println(\"Root visible: \" + tree.isShowRoot());\n        System.out.println(\"Root: \" + tree.getRoot().getValue());\n    }\n}",
      "explanation": "Ispisuje 'Root visible: true' i 'Root: Root'. TreeView PO DEFAULTU prikazuje root node! setShowRoot(false) skriva root - prikazuje samo children. Root je TreeItem<T>, ne String direktno. TreeItem.setExpanded(true) za expanding. TreeItem može imati grafiku: setGraphic(Node). TreeView.getSelectionModel() za selection handling. Multiple selection: setSelectionMode(SelectionMode.MULTIPLE). Root je OBAVEZAN - TreeView zahtijeva root čak i kad je skriven! getRoot() vraća null ako nije postavljen. TreeItem nije Node - wrappa value i children.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Root visible: true - default prikazuje root", "isCorrect": true },
        { "text": "Root visible: false - default skriva root", "isCorrect": false },
        { "text": "setShowRoot(false) skriva root", "isCorrect": true },
        { "text": "Baca NullPointerException - mora biti setShowRoot()", "isCorrect": false },
        { "text": "Root je obavezan čak i kad je skriven", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što SplitPane.setDividerPosition() prima kao parametar? (Odaberite sve točne)",
      "explanation": "setDividerPosition() ima DVA overloada: (1) setDividerPosition(int dividerIndex, double position) - position je 0.0 do 1.0 (percentage)! (2) Pozicija 0.5 = 50% prostora. (3) dividerIndex = koji divider (0-based, jer može biti više). (4) SplitPane s 3 itema ima 2 dividera (indeksi 0 i 1). (5) getDividerPositions() vraća array sa svim pozicijama. (6) setDividerPositions(double... positions) postavlja sve odjednom. Percentage je RELATIVNO na available space. setOrientation(Orientation.VERTICAL/HORIZONTAL) mijenja smjer. ResizableWithParent kontrolira koje područje raste.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "dividerIndex (int) i position (double 0.0-1.0)", "isCorrect": true },
        { "text": "Position je percentage (0.5 = 50%)", "isCorrect": true },
        { "text": "dividerIndex je 0-based", "isCorrect": true },
        { "text": "Position je pixels (int vrijednost)", "isCorrect": false },
        { "text": "3 itema = 2 dividera", "isCorrect": true },
        { "text": "getDividerPositions() vraća array", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Može li DatePicker imati null vrijednost?",
      "codeSnippet": "import javafx.scene.control.DatePicker;\nimport java.time.LocalDate;\n\npublic class DatePickerNullTest {\n    public void test() {\n        DatePicker picker1 = new DatePicker();\n        DatePicker picker2 = new DatePicker(LocalDate.now());\n        \n        System.out.println(\"Picker1: \" + picker1.getValue());\n        System.out.println(\"Picker2: \" + picker2.getValue());\n        \n        picker2.setValue(null);\n        System.out.println(\"After null: \" + picker2.getValue());\n    }\n}",
      "explanation": "Ispisuje 'Picker1: null', 'Picker2: [current date]', 'After null: null'. DatePicker DOZVOLJAVA null vrijednost! No-arg konstruktor postavlja null. getValue() vraća null ako nije odabran datum. setValue(null) UKLANJA odabrani datum - picker postaje prazan. DatePicker prikazuje prazan field za null. setPromptText() postavlja placeholder. DatePickerSkin upravlja prikazom. valueProperty() za binding. setDayCellFactory() za custom cell rendering (npr. disabled dates). setConverter() za custom date formatting. DatePicker koristi LocalDate, NE java.util.Date!",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "DA - picker1: null, picker2: today, after: null", "isCorrect": true },
        { "text": "NE - baca NullPointerException na setValue(null)", "isCorrect": false },
        { "text": "No-arg konstruktor postavlja today", "isCorrect": false },
        { "text": "setValue(null) se ignorira", "isCorrect": false },
        { "text": "getValue() nikad ne vraća null", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ColorPicker.getValue() vraća po defaultu? (Odaberite sve točne)",
      "explanation": "ColorPicker po defaultu vraća Color.WHITE! No-arg konstruktor: new ColorPicker() = bijela boja. Konstruktor s bojom: new ColorPicker(Color.RED). getValue() vraća Color objekt, NE String! Color je immutable - rgba vrijednosti. Color.web('#FF0000') parsira hex string. Color.rgb(255, 0, 0) iz RGB. Color.hsb() iz HSB. getCustomColors() vraća ObservableList<Color> za palette. setOnAction() za change event. valueProperty() za binding. ColorPicker prikazuje palette dialog s preset bojama. Custom colors se spremaju između otvaranja.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Color.WHITE - default bijela boja", "isCorrect": true },
        { "text": "Color.BLACK - default crna", "isCorrect": false },
        { "text": "null - nema default", "isCorrect": false },
        { "text": "getValue() vraća Color objekt, ne String", "isCorrect": true },
        { "text": "Color.web() parsira hex string", "isCorrect": true },
        { "text": "getCustomColors() vraća ObservableList", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Što se događa s ProgressBar.setProgress() vrijednostima izvan 0-1?",
      "codeSnippet": "import javafx.scene.control.ProgressBar;\n\npublic class ProgressBarRangeTest {\n    public void test() {\n        ProgressBar bar = new ProgressBar();\n        \n        bar.setProgress(-0.5);\n        System.out.println(\"Negative: \" + bar.getProgress());\n        \n        bar.setProgress(1.5);\n        System.out.println(\"Over 1: \" + bar.getProgress());\n        \n        bar.setProgress(0.5);\n        System.out.println(\"Valid: \" + bar.getProgress());\n        \n        bar.setProgress(ProgressBar.INDETERMINATE_PROGRESS);\n        System.out.println(\"Indeterminate: \" + bar.getProgress());\n    }\n}",
      "explanation": "Ispisuje 'Negative: 0.0', 'Over 1: 1.0', 'Valid: 0.5', 'Indeterminate: -1.0'. ProgressBar CLAMPUJE vrijednosti: < 0 postaje 0, > 1 postaje 1. Validan range: 0.0 (0%) do 1.0 (100%). INDETERMINATE_PROGRESS = -1.0 za 'in progress' animaciju (spinning). Default progress je 0.0. progressProperty() za binding: bar.progressProperty().bind(model.progressProperty()). ProgressIndicator je base class (circular). ProgressBar extends ProgressIndicator (linear). setProgress(Double.NaN) NE radi kao indeterminate - koristi INDETERMINATE_PROGRESS konstanlu!",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "0.0, 1.0, 0.5, -1.0 - clampuje na 0-1 range", "isCorrect": true },
        { "text": "Baca IllegalArgumentException za invalid range", "isCorrect": false },
        { "text": "-0.5, 1.5, 0.5, -1.0 - prima sve vrijednosti", "isCorrect": false },
        { "text": "INDETERMINATE_PROGRESS = -1.0 za spinning animaciju", "isCorrect": true },
        { "text": "Default progress je 0.5", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kada ScrollPane prikazuje scrollbar-ove? (Odaberite sve točne)",
      "explanation": "ScrollPane ima 4 policy opcije: (1) AS_NEEDED (default) - prikazuje scrollbar samo kad je content veći od viewport-a. (2) ALWAYS - uvijek prikazuje scrollbar. (3) NEVER - nikad ne prikazuje scrollbar. (4) VbarPolicy za vertical, HbarPolicy za horizontal. setVbarPolicy(ScrollPane.ScrollBarPolicy.AS_NEEDED). Content može biti veći od viewport-a pa korisnik ne može vidjeti sve. setFitToWidth(true) prilagođava content širini. setFitToHeight(true) za visinu. setPannable(true) omogućava drag scrolling. Content je setContent(Node). getViewportBounds() vraća visible area.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "AS_NEEDED - samo kad je content veći", "isCorrect": true },
        { "text": "ALWAYS - uvijek prikazuje", "isCorrect": true },
        { "text": "NEVER - nikad ne prikazuje", "isCorrect": true },
        { "text": "Automatski prikazuje bez policy", "isCorrect": false },
        { "text": "AS_NEEDED je default", "isCorrect": true },
        { "text": "Odvojeni policy za vertical i horizontal", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što znači GUI?",
      "explanation": "GUI je Graphical User Interface – grafičko korisničko sučelje koje koristi kontrole/widgete.",
      "difficulty": "EASY",
      "options": [
        { "text": "Graphical User Interface", "isCorrect": true },
        { "text": "General User Input", "isCorrect": false },
        { "text": "Global Utility Interface", "isCorrect": false },
        { "text": "Graphics Under Instruction", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji su GUI toolkiti spomenuti u predavanju? (Odaberite sve točne)",
      "explanation": "U materijalu su navedeni AWT, Swing i JavaFX.",
      "difficulty": "EASY",
      "options": [
        { "text": "AWT", "isCorrect": true },
        { "text": "Swing", "isCorrect": true },
        { "text": "JavaFX", "isCorrect": true },
        { "text": "React", "isCorrect": false },
        { "text": "Qt", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji alat se koristi za vizualno dizajniranje JavaFX sučelja?",
      "explanation": "Scene Builder je vizualni alat (drag & drop) koji generira FXML.",
      "difficulty": "EASY",
      "options": [
        { "text": "Scene Builder", "isCorrect": true },
        { "text": "Maven Surefire", "isCorrect": false },
        { "text": "JUnit", "isCorrect": false },
        { "text": "Gradle Wrapper", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je FXML?",
      "explanation": "FXML je XML format (FX Markup Language) za definiranje izgleda GUI-ja i odvajanje prikaza od logike.",
      "difficulty": "EASY",
      "options": [
        { "text": "XML format za definiranje JavaFX GUI-ja", "isCorrect": true },
        { "text": "Binarni format za spremanje Scene-a", "isCorrect": false },
        { "text": "JavaScript framework", "isCorrect": false },
        { "text": "Alat za testiranje UI-ja", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja metoda u JavaFX aplikaciji služi za pokretanje GUI-ja?",
      "explanation": "start(Stage primaryStage) je glavna metoda gdje se postavlja Scene i prikazuje Stage.",
      "difficulty": "EASY",
      "options": [
        { "text": "start(Stage primaryStage)", "isCorrect": true },
        { "text": "run()", "isCorrect": false },
        { "text": "render()", "isCorrect": false },
        { "text": "initGUI()", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što predstavlja Stage u JavaFX-u?",
      "explanation": "Stage je glavni prozor aplikacije (window).",
      "difficulty": "EASY",
      "options": [
        { "text": "Glavni prozor aplikacije", "isCorrect": true },
        { "text": "Lista podataka za TableView", "isCorrect": false },
        { "text": "CSS datoteka", "isCorrect": false },
        { "text": "Controller klasa", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što predstavlja Scene u JavaFX-u?",
      "explanation": "Scene je sadržaj prozora (sadrži root node i graf elemenata).",
      "difficulty": "EASY",
      "options": [
        { "text": "Sadržaj prozora (UI sadržaj na Stage-u)", "isCorrect": true },
        { "text": "Drugi naziv za Stage", "isCorrect": false },
        { "text": "Obavezna CSS tema", "isCorrect": false },
        { "text": "Thread za renderiranje", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja naredba pokreće JavaFX aplikaciju iz main metode?",
      "explanation": "launch(args) pokreće JavaFX aplikaciju.",
      "difficulty": "EASY",
      "options": [
        { "text": "launch(args)", "isCorrect": true },
        { "text": "start(args)", "isCorrect": false },
        { "text": "runLater(args)", "isCorrect": false },
        { "text": "openStage(args)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se dodaje CSS datoteka na Scene? (Odaberite sve točne)",
      "explanation": "U primjeru se koristi scene.getStylesheets().add(getClass().getResource(...).toExternalForm()).",
      "difficulty": "EASY",
      "options": [
        { "text": "scene.getStylesheets().add(getClass().getResource(\"application.css\").toExternalForm())", "isCorrect": true },
        { "text": "primaryStage.setStylesheet(\"application.css\")", "isCorrect": false },
        { "text": "Scene.loadCss(\"application.css\")", "isCorrect": false },
        { "text": "scene.getCss().add(\"application.css\")", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje je važno pravilo za CSS svojstva u JavaFX-u?",
      "explanation": "JavaFX CSS svojstva trebaju imati -fx- prefiks.",
      "difficulty": "EASY",
      "options": [
        { "text": "CSS svojstva moraju imati -fx- prefiks", "isCorrect": true },
        { "text": "CSS svojstva moraju biti camelCase", "isCorrect": false },
        { "text": "CSS se ne može koristiti u JavaFX-u", "isCorrect": false },
        { "text": "CSS radi samo inline, ne iz datoteke", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout postavlja elemente jedan iza drugog horizontalno?",
      "explanation": "HBox je horizontalni raspored.",
      "difficulty": "EASY",
      "options": [
        { "text": "HBox", "isCorrect": true },
        { "text": "VBox", "isCorrect": false },
        { "text": "GridPane", "isCorrect": false },
        { "text": "BorderPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout postavlja elemente jedan ispod drugog vertikalno?",
      "explanation": "VBox je vertikalni raspored.",
      "difficulty": "EASY",
      "options": [
        { "text": "VBox", "isCorrect": true },
        { "text": "HBox", "isCorrect": false },
        { "text": "FlowPane", "isCorrect": false },
        { "text": "SplitPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout ima 5 područja (TOP, LEFT, CENTER, RIGHT, BOTTOM)?",
      "explanation": "BorderPane omogućava raspored u 5 područja.",
      "difficulty": "EASY",
      "options": [
        { "text": "BorderPane", "isCorrect": true },
        { "text": "GridPane", "isCorrect": false },
        { "text": "FlowPane", "isCorrect": false },
        { "text": "HBox", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout raspoređuje elemente u mrežu (tablicu) s koordinatama (stupac, redak)?",
      "explanation": "GridPane postavlja elemente u tablicu po (col, row) koordinatama.",
      "difficulty": "EASY",
      "options": [
        { "text": "GridPane", "isCorrect": true },
        { "text": "BorderPane", "isCorrect": false },
        { "text": "FlowPane", "isCorrect": false },
        { "text": "StackPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je osnovna ideja MVC arhitekture? (Odaberite sve točne)",
      "explanation": "MVC dijeli aplikaciju na Model (podaci), View (prikaz) i Controller (povezuje UI i logiku).",
      "difficulty": "EASY",
      "options": [
        { "text": "Model = domenski podaci (npr. Knjiga)", "isCorrect": true },
        { "text": "View = FXML ili Java klase koje definiraju izgled", "isCorrect": true },
        { "text": "Controller = reagira na akcije i povezuje UI s logikom", "isCorrect": true },
        { "text": "Controller = baza podataka", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Čemu služi anotacija @FXML?",
      "explanation": "@FXML označava polja i metode koje se povezuju s elementima iz FXML-a (fx:id i handleri).",
      "difficulty": "EASY",
      "options": [
        { "text": "Označava polja/metode koje FXMLLoader povezuje s FXML-om", "isCorrect": true },
        { "text": "Automatski sprema podatke u bazu", "isCorrect": false },
        { "text": "Zamjenjuje potrebu za Controllerom", "isCorrect": false },
        { "text": "Povećava performanse renderiranja", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što mora vrijediti za povezivanje @FXML polja i elementa u FXML-u?",
      "explanation": "Naziv varijable u Controlleru mora odgovarati fx:id u FXML-u (i tip mora biti kompatibilan).",
      "difficulty": "EASY",
      "options": [
        { "text": "Naziv @FXML varijable mora odgovarati fx:id", "isCorrect": true },
        { "text": "fx:id mora biti isti kao naziv klase", "isCorrect": false },
        { "text": "fx:id nije bitan, sve se mapira automatski", "isCorrect": false },
        { "text": "@FXML mora biti na static poljima", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je ObservableList?",
      "explanation": "ObservableList je JavaFX lista koja šalje obavijesti o promjenama (listenerima) pa se UI može automatski ažurirati.",
      "difficulty": "EASY",
      "options": [
        { "text": "Lista koja automatski obavještava o promjenama", "isCorrect": true },
        { "text": "Lista koja se ne može mijenjati", "isCorrect": false },
        { "text": "Mapa (key-value) struktura", "isCorrect": false },
        { "text": "Thread-safe kolekcija po defaultu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja klasa se koristi kao factory za kreiranje Observable kolekcija?",
      "explanation": "FXCollections je factory klasa za kreiranje ObservableList/ObservableMap itd.",
      "difficulty": "EASY",
      "options": [
        { "text": "FXCollections", "isCorrect": true },
        { "text": "Collections", "isCorrect": false },
        { "text": "ObservableFactory", "isCorrect": false },
        { "text": "JavaFXCollections", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Čemu služi TableView?",
      "explanation": "TableView prikazuje podatke u tablici (redci i stupci).",
      "difficulty": "EASY",
      "options": [
        { "text": "Prikaz podataka u tablici", "isCorrect": true },
        { "text": "Prikaz HTML stranice", "isCorrect": false },
        { "text": "Uređivanje CSS-a", "isCorrect": false },
        { "text": "Navigacija kroz scene", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja klasa se često koristi za povezivanje stupca TableView-a s propertyjem (npr. \"firstName\")?",
      "explanation": "U primjeru je korišten PropertyValueFactory(\"firstName\").",
      "difficulty": "EASY",
      "options": [
        { "text": "PropertyValueFactory", "isCorrect": true },
        { "text": "FXMLLoader", "isCorrect": false },
        { "text": "SceneBuilder", "isCorrect": false },
        { "text": "TableRowFactory", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Od kojih se elemenata sastoji izbornik u JavaFX-u? (Odaberite sve točne)",
      "explanation": "MenuBar sadrži Menu, a Menu sadrži MenuItem.",
      "difficulty": "EASY",
      "options": [
        { "text": "MenuBar", "isCorrect": true },
        { "text": "Menu", "isCorrect": true },
        { "text": "MenuItem", "isCorrect": true },
        { "text": "StageItem", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi showAndWait() kod Alert dijaloga?",
      "explanation": "Alert.showAndWait() prikazuje dijalog i čeka da korisnik zatvori/odabere opciju (blocking).",
      "difficulty": "EASY",
      "options": [
        { "text": "Prikazuje dijalog i čeka korisnikov odgovor", "isCorrect": true },
        { "text": "Prikazuje dijalog ali se odmah nastavlja izvršavanje", "isCorrect": false },
        { "text": "Automatski zatvara aplikaciju", "isCorrect": false },
        { "text": "Mijenja Scene na Stage-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koliko TitledPane-ova može biti otvoreno u Accordion-u u isto vrijeme?",
      "explanation": "Accordion tipično dopušta samo jedan prošireni (expanded) pane u jednom trenutku.",
      "difficulty": "EASY",
      "options": [
        { "text": "Samo jedan", "isCorrect": true },
        { "text": "Neograničeno", "isCorrect": false },
        { "text": "Točno dva", "isCorrect": false },
        { "text": "Nijedan (uvijek su zatvoreni)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi TreeView.setShowRoot(false)?",
      "explanation": "Skriva root element i prikazuje samo njegovu djecu (children).",
      "difficulty": "EASY",
      "options": [
        { "text": "Skriva root i prikazuje samo children", "isCorrect": true },
        { "text": "Briše root iz memorije", "isCorrect": false },
        { "text": "Onemogućava selekciju u TreeView-u", "isCorrect": false },
        { "text": "Pretvara TreeView u ListView", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je SplitPane?",
      "explanation": "SplitPane prikazuje više komponenti razdvojenih pomičnim dividerom.",
      "difficulty": "EASY",
      "options": [
        { "text": "Kontejner s više područja odvojenih dividerom", "isCorrect": true },
        { "text": "Komponenta za unos datuma", "isCorrect": false },
        { "text": "Layout s 5 područja", "isCorrect": false },
        { "text": "Dijalog za potvrdu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kada ScrollPane prikazuje scroll barove po defaultu?",
      "explanation": "Default policy je AS_NEEDED – prikazuje se kad je sadržaj veći od vidljivog dijela (viewport).",
      "difficulty": "EASY",
      "options": [
        { "text": "AS_NEEDED (kad je sadržaj veći od viewport-a)", "isCorrect": true },
        { "text": "ALWAYS (uvijek)", "isCorrect": false },
        { "text": "NEVER (nikad)", "isCorrect": false },
        { "text": "RANDOM (nasumično)", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći JavaFX kod kompilirati?",
      "codeSnippet": "import javafx.application.Application;\nimport javafx.stage.Stage;\n\npublic class App1 extends Application {\n  @Override\n  public void start(Stage primaryStage) {\n    primaryStage.setTitle(\"Hello JavaFX\");\n    primaryStage.show();\n  }\n\n  public static void main(String[] args) {\n    launch(args);\n  }\n}",
      "explanation": "Da. Klasa nasljeđuje Application, implementira start(Stage) i poziva launch(args).",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, mora se koristiti FXMLLoader", "isCorrect": false },
        { "text": "Ne, ne smije postojati main metoda", "isCorrect": false },
        { "text": "Ne, Stage se ne može koristiti u start()", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: učitavanje CSS-a na scenu?",
      "codeSnippet": "import javafx.scene.Scene;\nimport javafx.scene.layout.BorderPane;\n\npublic class CssTest {\n  public Scene make() {\n    BorderPane root = new BorderPane();\n    Scene scene = new Scene(root, 400, 400);\n    scene.getStylesheets().add(\n      getClass().getResource(\"application.css\").toExternalForm()\n    );\n    return scene;\n  }\n}",
      "explanation": "Da, sintaksa je ispravna (pretpostavljajući da resource postoji u runtime-u).",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, Scene nema getStylesheets()", "isCorrect": false },
        { "text": "Ne, CSS se može dodati samo na Stage", "isCorrect": false },
        { "text": "Ne, toExternalForm() ne postoji", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: GridPane.add(node, col, row)?",
      "codeSnippet": "import javafx.scene.control.Label;\nimport javafx.scene.control.TextField;\nimport javafx.scene.layout.GridPane;\n\npublic class GridForm {\n  public GridPane make() {\n    GridPane grid = new GridPane();\n    Label lbl = new Label(\"First Name\");\n    TextField tf = new TextField();\n    grid.add(lbl, 0, 0);\n    grid.add(tf, 1, 0);\n    return grid;\n  }\n}",
      "explanation": "Da. GridPane.add(Node child, int columnIndex, int rowIndex) je standardni način dodavanja elemenata.",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, GridPane nema add()", "isCorrect": false },
        { "text": "Ne, mora se koristiti setCenter()", "isCorrect": false },
        { "text": "Ne, koordinate moraju biti double", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: MenuBar → Menu → MenuItem hijerarhija?",
      "codeSnippet": "import javafx.scene.control.*;\n\npublic class MenuOk {\n  public MenuBar make() {\n    MenuItem itemSave = new MenuItem(\"Save\");\n    Menu menuFile = new Menu(\"File\");\n    menuFile.getItems().add(itemSave);\n\n    MenuBar bar = new MenuBar();\n    bar.getMenus().add(menuFile);\n    return bar;\n  }\n}",
      "explanation": "Da. MenuBar sadrži Menu, a Menu sadrži MenuItem.",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, MenuBar prima MenuItem direktno", "isCorrect": false },
        { "text": "Ne, MenuItem mora biti u ToolBar-u", "isCorrect": false },
        { "text": "Ne, Menu ne smije imati Items", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: TabPane s Tab-ovima?",
      "codeSnippet": "import javafx.scene.control.*;\n\npublic class Tabs {\n  public TabPane make() {\n    Tab t1 = new Tab(\"One\");\n    t1.setClosable(false);\n    Tab t2 = new Tab(\"Two\");\n\n    TabPane pane = new TabPane();\n    pane.getTabs().addAll(t1, t2);\n    return pane;\n  }\n}",
      "explanation": "Da. TabPane.getTabs() vraća listu Tab-ova.",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, TabPane prima samo Scene", "isCorrect": false },
        { "text": "Ne, Tab mora naslijediti Node", "isCorrect": false },
        { "text": "Ne, setClosable(false) ne postoji", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "U kojem je razdoblju JavaFX postao standardni GUI toolkit integriran s Javom 8?",
      "explanation": "U materijalu piše da je JavaFX 8 (2014) integriran s Javom 8 i postaje standardni GUI toolkit.",
      "difficulty": "EASY",
      "options": [
        { "text": "2014 (JavaFX 8)", "isCorrect": true },
        { "text": "2007 (početak JavaFX-a)", "isCorrect": false },
        { "text": "2008 (JavaFX 1.0)", "isCorrect": false },
        { "text": "2011 (JavaFX 2.0)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje su prednosti JavaFX-a navedene u predavanju? (Odaberite sve točne)",
      "explanation": "U prednostima su nabrojani Scene Builder, CSS Styling, Multithreading i Animacije.",
      "difficulty": "EASY",
      "options": [
        { "text": "Scene Builder", "isCorrect": true },
        { "text": "CSS Styling", "isCorrect": true },
        { "text": "Multithreading", "isCorrect": true },
        { "text": "Animacije", "isCorrect": true },
        { "text": "Automatsko generiranje baze podataka", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji panel u Scene Builderu prikazuje stablo elemenata (hijerarhiju)?",
      "explanation": "Hierarchy panel (lijevo dolje) prikazuje stablo elemenata.",
      "difficulty": "EASY",
      "options": [
        { "text": "Hierarchy", "isCorrect": true },
        { "text": "Inspector", "isCorrect": false },
        { "text": "Content Area", "isCorrect": false },
        { "text": "Library", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji panel u Scene Builderu služi za podešavanje Properties/Layout/Code?",
      "explanation": "Inspector (desno) ima kartice Properties, Layout i Code.",
      "difficulty": "EASY",
      "options": [
        { "text": "Inspector", "isCorrect": true },
        { "text": "Library", "isCorrect": false },
        { "text": "Hierarchy", "isCorrect": false },
        { "text": "Content Area", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se u CSS-u (JavaFX) cilja root element scene (root node)?",
      "explanation": "U primjeru se koristi selektor .root u application.css.",
      "difficulty": "EASY",
      "options": [
        { "text": ".root", "isCorrect": true },
        { "text": "#root", "isCorrect": false },
        { "text": "root()", "isCorrect": false },
        { "text": "Stage.root", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji selektor u JavaFX CSS-u cilja sve gumbe (Button)?",
      "explanation": "U primjeru se stilizira .button klasa.",
      "difficulty": "EASY",
      "options": [
        { "text": ".button", "isCorrect": true },
        { "text": ".btn", "isCorrect": false },
        { "text": "#button", "isCorrect": false },
        { "text": "Button{}", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što znači da CSS svojstva u JavaFX-u imaju prefiks -fx-?",
      "explanation": "JavaFX CSS koristi svoj prefiks (npr. -fx-font-size, -fx-background).",
      "difficulty": "EASY",
      "options": [
        { "text": "Da se razlikuju JavaFX CSS svojstva (npr. -fx-font-size)", "isCorrect": true },
        { "text": "Da CSS radi samo u FXML-u", "isCorrect": false },
        { "text": "Da se CSS može koristiti samo za Button", "isCorrect": false },
        { "text": "Da je CSS obavezan u svakoj aplikaciji", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je uloga metode launch(args) u JavaFX aplikaciji?",
      "explanation": "launch(args) pokreće JavaFX aplikaciju iz main metode.",
      "difficulty": "EASY",
      "options": [
        { "text": "Pokreće JavaFX aplikaciju", "isCorrect": true },
        { "text": "Učitava CSS datoteku", "isCorrect": false },
        { "text": "Dodaje kontrolu u layout", "isCorrect": false },
        { "text": "Kreira FXML datoteku", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što znači 'Scene Graph' u kontekstu JavaFX-a?",
      "explanation": "Scene Graph je koncept organizacije elemenata UI-a u hijerarhiju (graf/stablo) u sceni.",
      "difficulty": "EASY",
      "options": [
        { "text": "Hijerarhija (graf) UI elemenata unutar Scene-a", "isCorrect": true },
        { "text": "Datoteka za CSS stilove", "isCorrect": false },
        { "text": "Poseban tip baze podataka", "isCorrect": false },
        { "text": "Thread koji renderira UI", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout u primjeru koristi razmak (spacing) 5px pri kreiranju?",
      "explanation": "U primjerima piše: new HBox(5) i new VBox(5).",
      "difficulty": "EASY",
      "options": [
        { "text": "HBox i VBox", "isCorrect": true },
        { "text": "BorderPane", "isCorrect": false },
        { "text": "GridPane", "isCorrect": false },
        { "text": "SplitPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi setPadding(new Insets(1)) u primjerima HBox/VBox?",
      "explanation": "Padding dodaje unutarnji razmak (rub) oko sadržaja layouta.",
      "difficulty": "EASY",
      "options": [
        { "text": "Dodaje unutarnji razmak (padding) oko sadržaja", "isCorrect": true },
        { "text": "Dodaje razmak između child elemenata", "isCorrect": false },
        { "text": "Postavlja marginu na prozoru (Stage)", "isCorrect": false },
        { "text": "Skriva elemente iz layouta", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je FlowPane (u jednoj rečenici)?",
      "explanation": "FlowPane slaže elemente u 'tok' — ide lijevo-desno dok ima mjesta pa prelazi u novi red.",
      "difficulty": "EASY",
      "options": [
        { "text": "Layout u kojem elementi 'teku' i prelaze u novi red kad ponestane mjesta", "isCorrect": true },
        { "text": "Layout s 5 fiksnih područja", "isCorrect": false },
        { "text": "Layout u kojem su elementi uvijek jedan ispod drugog", "isCorrect": false },
        { "text": "Layout koji radi samo s tablicama", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "U BorderPane-u, koja je pozicija namijenjena glavnom sadržaju?",
      "explanation": "BorderPane ima TOP/LEFT/CENTER/RIGHT/BOTTOM, a glavni sadržaj ide u CENTER.",
      "difficulty": "EASY",
      "options": [
        { "text": "CENTER", "isCorrect": true },
        { "text": "TOP", "isCorrect": false },
        { "text": "LEFT", "isCorrect": false },
        { "text": "BOTTOM", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "GridPane postavlja elemente pomoću kojih koordinata?",
      "explanation": "GridPane koristi koordinate (stupac, redak) tj. (column, row).",
      "difficulty": "EASY",
      "options": [
        { "text": "(stupac, redak)", "isCorrect": true },
        { "text": "(x, y u pikselima)", "isCorrect": false },
        { "text": "(redak, veličina)", "isCorrect": false },
        { "text": "(širina, visina)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje metode u GridPane-u iz primjera postavljaju razmak između ćelija?",
      "explanation": "U primjeru se koristi gridpane.setHgap(5) i gridpane.setVgap(5).",
      "difficulty": "EASY",
      "options": [
        { "text": "setHgap(...) i setVgap(...)", "isCorrect": true },
        { "text": "setPadding(...)", "isCorrect": false },
        { "text": "setSpacing(...)", "isCorrect": false },
        { "text": "setMargin(...)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što znači Priority.ALWAYS u ColumnConstraints primjeru?",
      "explanation": "Stupac se širi i zauzima maksimalno dostupnog prostora kad se prozor proširi.",
      "difficulty": "EASY",
      "options": [
        { "text": "Stupac se uvijek širi i uzima dostupni prostor", "isCorrect": true },
        { "text": "Stupac se nikad ne smije mijenjati", "isCorrect": false },
        { "text": "Stupac se uvijek skriva", "isCorrect": false },
        { "text": "Stupac dobiva fiksnu širinu 100px", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja dva tipa Alert dijaloga su prikazana u materijalu?",
      "explanation": "Primjeri prikazuju Information (INFORMATION) i Confirmation (CONFIRMATION) dijalog.",
      "difficulty": "EASY",
      "options": [
        { "text": "INFORMATION i CONFIRMATION", "isCorrect": true },
        { "text": "ERROR i WARNING", "isCorrect": false },
        { "text": "INPUT i FILECHOOSER", "isCorrect": false },
        { "text": "DIALOG i MODAL", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što showAndWait() radi kod Alert-a?",
      "explanation": "Prikazuje dijalog i čeka korisnikov odgovor (blocking).",
      "difficulty": "EASY",
      "options": [
        { "text": "Prikazuje dijalog i čeka da ga korisnik zatvori/odabere opciju", "isCorrect": true },
        { "text": "Prikazuje dijalog i odmah nastavlja bez čekanja", "isCorrect": false },
        { "text": "Samo logira poruku u konzolu", "isCorrect": false },
        { "text": "Automatski klikne OK", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je rezultat confirm.showAndWait() u primjeru s potvrdom?",
      "explanation": "U primjeru je rezultat spremljen u Optional<ButtonType>.",
      "difficulty": "EASY",
      "options": [
        { "text": "Optional<ButtonType>", "isCorrect": true },
        { "text": "boolean", "isCorrect": false },
        { "text": "String", "isCorrect": false },
        { "text": "int", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je hijerarhija izbornika u JavaFX-u?",
      "explanation": "Izbornik se sastoji od MenuBar (gore), Menu (npr. File) i MenuItem (npr. Save).",
      "difficulty": "EASY",
      "options": [
        { "text": "MenuBar → Menu → MenuItem", "isCorrect": true },
        { "text": "MenuItem → Menu → MenuBar", "isCorrect": false },
        { "text": "Stage → Menu → MenuItem", "isCorrect": false },
        { "text": "MenuBar → MenuItem → Menu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi setAccelerator(KeyCombination.keyCombination(\"Ctrl+N\")) na MenuItem-u?",
      "explanation": "Dodaje tipkovnički prečac (npr. Ctrl+N) za tu opciju izbornika.",
      "difficulty": "EASY",
      "options": [
        { "text": "Dodaje tipkovnički prečac (shortcut)", "isCorrect": true },
        { "text": "Mijenja tekst MenuItem-a", "isCorrect": false },
        { "text": "Otvara novi Stage automatski", "isCorrect": false },
        { "text": "Dodaje CSS klasu elementu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Čemu služi ToolBar u JavaFX-u?",
      "explanation": "ToolBar prikazuje skup gumbi/akcija (često s ikonama i separatorima) na jednom mjestu.",
      "difficulty": "EASY",
      "options": [
        { "text": "Za prikaz skupa gumbi/akcija u traci alata", "isCorrect": true },
        { "text": "Za prikaz tablice podataka", "isCorrect": false },
        { "text": "Za odabir datuma", "isCorrect": false },
        { "text": "Za prikaz stabla (Tree)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi new Separator(Orientation.VERTICAL) u ToolBar-u?",
      "explanation": "Separator vizualno razdvaja grupe kontrola; VERTICAL znači okomiti separator.",
      "difficulty": "EASY",
      "options": [
        { "text": "Razdvaja kontrole okomitim separatorom", "isCorrect": true },
        { "text": "Okreće cijeli ToolBar vertikalno", "isCorrect": false },
        { "text": "Sakriva gumbe u ToolBar-u", "isCorrect": false },
        { "text": "Automatski dodaje novi Tab", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Tab.setClosable(false) radi?",
      "explanation": "Onemogućuje zatvaranje taba (ne prikazuje X ili ga deaktivira).",
      "difficulty": "EASY",
      "options": [
        { "text": "Onemogućuje zatvaranje taba", "isCorrect": true },
        { "text": "Skriva sadržaj taba", "isCorrect": false },
        { "text": "Automatski selektira tab", "isCorrect": false },
        { "text": "Prebacuje tab u novi prozor", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja se metoda koristi za dodavanje više tabova u TabPane?",
      "explanation": "U primjeru je: tabPane.getTabs().addAll(tableTab, accordionTab, webViewTab).",
      "difficulty": "EASY",
      "options": [
        { "text": "tabPane.getTabs().addAll(...)", "isCorrect": true },
        { "text": "tabPane.addTabs(...)", "isCorrect": false },
        { "text": "tabPane.setTabs(...)", "isCorrect": false },
        { "text": "tabPane.addChildren(...)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja komponenta u primjeru prikazuje podatke u stupcima First Name / Last Name / Phone?",
      "explanation": "To je TableView s više TableColumn stupaca.",
      "difficulty": "EASY",
      "options": [
        { "text": "TableView", "isCorrect": true },
        { "text": "ListView", "isCorrect": false },
        { "text": "TreeView", "isCorrect": false },
        { "text": "ScrollPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se u primjeru povezuju stupci TableView-a s property nazivima (npr. \"firstName\")?",
      "explanation": "U primjeru se koristi new PropertyValueFactory<>(\"firstName\").",
      "difficulty": "EASY",
      "options": [
        { "text": "PropertyValueFactory(\"firstName\")", "isCorrect": true },
        { "text": "FXMLLoader.load(\"firstName\")", "isCorrect": false },
        { "text": "setText(\"firstName\")", "isCorrect": false },
        { "text": "setId(\"firstName\")", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koliko TitledPane-ova može biti otvoreno u Accordion-u prema opisu u materijalu?",
      "explanation": "U materijalu piše: 'Accordion - samo jedan otvoren'.",
      "difficulty": "EASY",
      "options": [
        { "text": "Samo jedan", "isCorrect": true },
        { "text": "Sva odjednom", "isCorrect": false },
        { "text": "Točno dva", "isCorrect": false },
        { "text": "Nijedan (uvijek su zatvoreni)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi treeView.setShowRoot(false) u primjeru TreeView-a?",
      "explanation": "Skriva root čvor u prikazu i prikazuje samo djecu (children).",
      "difficulty": "EASY",
      "options": [
        { "text": "Skriva root u prikazu", "isCorrect": true },
        { "text": "Briše root iz TreeView-a", "isCorrect": false },
        { "text": "Zaključava TreeView (no selection)", "isCorrect": false },
        { "text": "Pretvara TreeView u TableView", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje dvije komponente su u primjeru spojene unutar SplitPane-a?",
      "explanation": "U SplitPane primjeru su dodani TreeView i ListView.",
      "difficulty": "EASY",
      "options": [
        { "text": "TreeView i ListView", "isCorrect": true },
        { "text": "TableView i MenuBar", "isCorrect": false },
        { "text": "Accordion i ToolBar", "isCorrect": false },
        { "text": "DatePicker i ColorPicker", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je svrha ObservableList u JavaFX-u?",
      "explanation": "ObservableList šalje obavijesti o promjenama, pa se UI (npr. TableView) automatski osvježava.",
      "difficulty": "EASY",
      "options": [
        { "text": "Automatski ažurira GUI kad se lista promijeni", "isCorrect": true },
        { "text": "Sprema podatke u datoteku", "isCorrect": false },
        { "text": "Ubrzava kompilaciju", "isCorrect": false },
        { "text": "Zamjenjuje Controller u MVC-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je factory klasa za kreiranje ObservableList iz obične liste?",
      "explanation": "U primjeru se koristi FXCollections.observableArrayList(...).",
      "difficulty": "EASY",
      "options": [
        { "text": "FXCollections", "isCorrect": true },
        { "text": "Collections", "isCorrect": false },
        { "text": "ObservableFactory", "isCorrect": false },
        { "text": "ListFactory", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što u MVC arhitekturi predstavlja 'Controller' u JavaFX kontekstu?",
      "explanation": "Controller povezuje GUI elemente s poslovnom logikom i reagira na korisničke akcije.",
      "difficulty": "EASY",
      "options": [
        { "text": "Povezuje UI s logikom i obrađuje akcije korisnika", "isCorrect": true },
        { "text": "Samo definira izgled ekrana", "isCorrect": false },
        { "text": "Samo predstavlja domenske podatke (npr. Knjiga)", "isCorrect": false },
        { "text": "Samo učitava CSS datoteku", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je JavaFX?",
      "explanation": "JavaFX je GUI toolkit za izradu grafičkih sučelja u Java aplikacijama.",
      "difficulty": "EASY",
      "options": [
        { "text": "GUI toolkit za izradu grafičkih sučelja u Javi", "isCorrect": true },
        { "text": "Baza podataka za Java aplikacije", "isCorrect": false },
        { "text": "Biblioteka za mrežnu komunikaciju", "isCorrect": false },
        { "text": "Alat za pisanje unit testova", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja klasa se nasljeđuje za JavaFX aplikaciju?",
      "explanation": "Tipično se nasljeđuje javafx.application.Application.",
      "difficulty": "EASY",
      "options": [
        { "text": "javafx.application.Application", "isCorrect": true },
        { "text": "javafx.stage.Stage", "isCorrect": false },
        { "text": "javafx.scene.Scene", "isCorrect": false },
        { "text": "javafx.fxml.FXMLLoader", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što predstavlja 'root' node u Scene-u?",
      "explanation": "Root je vršni čvor Scene Grapha i roditelj svih ostalih UI elemenata u toj sceni.",
      "difficulty": "EASY",
      "options": [
        { "text": "Vršni čvor hijerarhije elemenata (Scene Graph)", "isCorrect": true },
        { "text": "CSS datoteka koja stilizira aplikaciju", "isCorrect": false },
        { "text": "Glavni thread JavaFX-a", "isCorrect": false },
        { "text": "Kontroler (Controller) u MVC-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji alat se koristi za drag & drop izradu FXML sučelja?",
      "explanation": "Scene Builder služi za vizualno dizajniranje i generiranje FXML-a.",
      "difficulty": "EASY",
      "options": [
        { "text": "Scene Builder", "isCorrect": true },
        { "text": "Maven", "isCorrect": false },
        { "text": "JUnit", "isCorrect": false },
        { "text": "Postman", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji panel u Scene Builderu sadrži sve kontrole (Button, Label...)?",
      "explanation": "Library panel sadrži kategorije Controls/Containers/Shapes itd.",
      "difficulty": "EASY",
      "options": [
        { "text": "Library", "isCorrect": true },
        { "text": "Hierarchy", "isCorrect": false },
        { "text": "Inspector", "isCorrect": false },
        { "text": "Console", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi FXMLLoader u JavaFX-u?",
      "explanation": "FXMLLoader učitava FXML datoteku i kreira UI hijerarhiju (root node), te povezuje controller.",
      "difficulty": "EASY",
      "options": [
        { "text": "Učitava FXML i kreira UI (Scene Graph)", "isCorrect": true },
        { "text": "Kompilira Java kod", "isCorrect": false },
        { "text": "Kreira CSS stilove", "isCorrect": false },
        { "text": "Spaja aplikaciju na bazu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout je najbolji za jednostavnu formu (label + textfield u redovima)?",
      "explanation": "GridPane je idealan za forme jer raspoređuje elemente u mrežu (col,row).",
      "difficulty": "EASY",
      "options": [
        { "text": "GridPane", "isCorrect": true },
        { "text": "StackPane", "isCorrect": false },
        { "text": "FlowPane", "isCorrect": false },
        { "text": "Group", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout slaže elemente jedan preko drugog (stack)?",
      "explanation": "StackPane slaže djecu jedno preko drugog, centrirano po defaultu.",
      "difficulty": "EASY",
      "options": [
        { "text": "StackPane", "isCorrect": true },
        { "text": "HBox", "isCorrect": false },
        { "text": "VBox", "isCorrect": false },
        { "text": "GridPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi VBox.setSpacing(10)?",
      "explanation": "Spacing postavlja razmak između djece unutar VBox-a.",
      "difficulty": "EASY",
      "options": [
        { "text": "Postavlja razmak između elemenata u VBox-u", "isCorrect": true },
        { "text": "Postavlja padding oko VBox-a", "isCorrect": false },
        { "text": "Mijenja font size u VBox-u", "isCorrect": false },
        { "text": "Postavlja marginu prozora (Stage)", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja komponenta prikazuje listu elemenata (jedan stupac)?",
      "explanation": "ListView prikazuje listu stavki (vertikalno).",
      "difficulty": "EASY",
      "options": [
        { "text": "ListView", "isCorrect": true },
        { "text": "TableView", "isCorrect": false },
        { "text": "TreeView", "isCorrect": false },
        { "text": "MenuBar", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja komponenta prikazuje hijerarhiju (stablo)?",
      "explanation": "TreeView prikazuje TreeItem hijerarhiju (npr. kategorije i podkategorije).",
      "difficulty": "EASY",
      "options": [
        { "text": "TreeView", "isCorrect": true },
        { "text": "TableView", "isCorrect": false },
        { "text": "ScrollPane", "isCorrect": false },
        { "text": "ToolBar", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja komponenta služi za prikaz više kartica (tabova)?",
      "explanation": "TabPane sadrži Tab-ove.",
      "difficulty": "EASY",
      "options": [
        { "text": "TabPane", "isCorrect": true },
        { "text": "Accordion", "isCorrect": false },
        { "text": "SplitPane", "isCorrect": false },
        { "text": "BorderPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja komponenta koristi 'pane-ove' koji se mogu proširiti/sažeti?",
      "explanation": "Accordion sadrži TitledPane-ove.",
      "difficulty": "EASY",
      "options": [
        { "text": "Accordion", "isCorrect": true },
        { "text": "TabPane", "isCorrect": false },
        { "text": "MenuBar", "isCorrect": false },
        { "text": "GridPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je MenuBar?",
      "explanation": "MenuBar je traka izbornika koja sadrži Menu objekte (npr. File, Edit).",
      "difficulty": "EASY",
      "options": [
        { "text": "Traka izbornika koja sadrži Menu", "isCorrect": true },
        { "text": "Dijalog za potvrdu", "isCorrect": false },
        { "text": "Layout s 5 područja", "isCorrect": false },
        { "text": "Kontrola za odabir datuma", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je ToolBar?",
      "explanation": "ToolBar je traka alata koja sadrži gumbe i druge kontrole za brzi pristup akcijama.",
      "difficulty": "EASY",
      "options": [
        { "text": "Traka s gumbima/akcijama (toolbar)", "isCorrect": true },
        { "text": "Layout za mrežu", "isCorrect": false },
        { "text": "Baza podataka", "isCorrect": false },
        { "text": "Thread za renderiranje", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja komponenta omogućava scrollanje sadržaja koji je veći od prikaza?",
      "explanation": "ScrollPane omata (wrap) neki Node i omogućava scroll barove.",
      "difficulty": "EASY",
      "options": [
        { "text": "ScrollPane", "isCorrect": true },
        { "text": "BorderPane", "isCorrect": false },
        { "text": "HBox", "isCorrect": false },
        { "text": "ToggleGroup", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja kontrola služi za odabir datuma?",
      "explanation": "DatePicker omogućava odabir LocalDate vrijednosti.",
      "difficulty": "EASY",
      "options": [
        { "text": "DatePicker", "isCorrect": true },
        { "text": "ColorPicker", "isCorrect": false },
        { "text": "Slider", "isCorrect": false },
        { "text": "ProgressBar", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja kontrola služi za odabir boje?",
      "explanation": "ColorPicker vraća javafx.scene.paint.Color.",
      "difficulty": "EASY",
      "options": [
        { "text": "ColorPicker", "isCorrect": true },
        { "text": "DatePicker", "isCorrect": false },
        { "text": "ChoiceBox", "isCorrect": false },
        { "text": "PasswordField", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što prikazuje ProgressBar?",
      "explanation": "ProgressBar prikazuje napredak (0-100%) ili indeterminate stanje.",
      "difficulty": "EASY",
      "options": [
        { "text": "Napredak izvršavanja (progress)", "isCorrect": true },
        { "text": "Listu elemenata", "isCorrect": false },
        { "text": "Hijerarhiju (stablo)", "isCorrect": false },
        { "text": "Odabir boje", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi Slider?",
      "explanation": "Slider omogućava odabir numeričke vrijednosti pomicanjem klizača.",
      "difficulty": "EASY",
      "options": [
        { "text": "Odabir numeričke vrijednosti klizačem", "isCorrect": true },
        { "text": "Odabir datuma", "isCorrect": false },
        { "text": "Prikaz tablice", "isCorrect": false },
        { "text": "Prikaz izbornika", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je MVC? (Odaberite sve točne)",
      "explanation": "MVC dijeli aplikaciju na Model, View i Controller.",
      "difficulty": "EASY",
      "options": [
        { "text": "Model sadrži domenske podatke", "isCorrect": true },
        { "text": "View definira izgled (FXML/Java UI)", "isCorrect": true },
        { "text": "Controller obrađuje akcije i povezuje UI s logikom", "isCorrect": true },
        { "text": "Controller je isto što i baza podataka", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji atribut u FXML-u definira controller klasu?",
      "explanation": "fx:controller navodi punu putanju do controller klase.",
      "difficulty": "EASY",
      "options": [
        { "text": "fx:controller", "isCorrect": true },
        { "text": "fx:id", "isCorrect": false },
        { "text": "onAction", "isCorrect": false },
        { "text": "xmlns", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Čemu služi fx:id u FXML-u?",
      "explanation": "fx:id služi za povezivanje elementa iz FXML-a s @FXML poljem u controlleru.",
      "difficulty": "EASY",
      "options": [
        { "text": "Povezuje FXML element s @FXML poljem", "isCorrect": true },
        { "text": "Postavlja CSS klasu elementu", "isCorrect": false },
        { "text": "Pokreće aplikaciju", "isCorrect": false },
        { "text": "Definira veličinu Stage-a", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja anotacija se koristi za povezivanje polja/metoda s FXML-om?",
      "explanation": "@FXML označava članove koje FXMLLoader injektira ili poziva.",
      "difficulty": "EASY",
      "options": [
        { "text": "@FXML", "isCorrect": true },
        { "text": "@Override", "isCorrect": false },
        { "text": "@Autowired", "isCorrect": false },
        { "text": "@Entity", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je factory klasa za ObservableList/ObservableMap?",
      "explanation": "FXCollections je factory klasa za observable kolekcije.",
      "difficulty": "EASY",
      "options": [
        { "text": "FXCollections", "isCorrect": true },
        { "text": "Collections", "isCorrect": false },
        { "text": "Arrays", "isCorrect": false },
        { "text": "Streams", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TableView prikazuje?",
      "explanation": "TableView prikazuje podatke u redcima i stupcima.",
      "difficulty": "EASY",
      "options": [
        { "text": "Tablicu (redci i stupci)", "isCorrect": true },
        { "text": "Samo jedan stupac listu", "isCorrect": false },
        { "text": "Hijerarhiju (stablo)", "isCorrect": false },
        { "text": "Web stranicu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se najčešće povezuje stupac TableView-a s getterom propertyja (npr. firstName)?",
      "explanation": "Često se koristi PropertyValueFactory s nazivom propertyja.",
      "difficulty": "EASY",
      "options": [
        { "text": "new PropertyValueFactory<>('firstName')", "isCorrect": true },
        { "text": "FXMLLoader.load('firstName')", "isCorrect": false },
        { "text": "table.setId('firstName')", "isCorrect": false },
        { "text": "new TableColumnFactory<>('firstName')", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji selektor u JavaFX CSS-u cilja sve Button kontrole?",
      "explanation": "U primjerima se koristi .button selektor.",
      "difficulty": "EASY",
      "options": [
        { "text": ".button", "isCorrect": true },
        { "text": "#button", "isCorrect": false },
        { "text": "Button()", "isCorrect": false },
        { "text": ".btn-primary", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji selektor u JavaFX CSS-u cilja root element Scene-a?",
      "explanation": "Root se često cilja selektorom .root.",
      "difficulty": "EASY",
      "options": [
        { "text": ".root", "isCorrect": true },
        { "text": "#root", "isCorrect": false },
        { "text": "Stage.root", "isCorrect": false },
        { "text": "scene-root", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što znači da JavaFX CSS svojstva imaju prefiks -fx-?",
      "explanation": "JavaFX CSS koristi vlastita svojstva s prefiksom -fx- (npr. -fx-font-size).",
      "difficulty": "EASY",
      "options": [
        { "text": "Koristi se JavaFX specifičan prefiks za CSS svojstva", "isCorrect": true },
        { "text": "CSS radi samo ako je u FXML-u", "isCorrect": false },
        { "text": "Svojstva moraju biti camelCase", "isCorrect": false },
        { "text": "CSS je obavezan za svaku kontrolu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi Alert dijalog tipa INFORMATION?",
      "explanation": "Prikazuje informativnu poruku korisniku.",
      "difficulty": "EASY",
      "options": [
        { "text": "Prikazuje informativnu poruku", "isCorrect": true },
        { "text": "Odabire boju", "isCorrect": false },
        { "text": "Otvara novi Stage automatski", "isCorrect": false },
        { "text": "Renderira HTML", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji tip Alert dijaloga se koristi za potvrdu (Yes/No ili OK/Cancel)?",
      "explanation": "Za potvrdu se koristi AlertType.CONFIRMATION.",
      "difficulty": "EASY",
      "options": [
        { "text": "AlertType.CONFIRMATION", "isCorrect": true },
        { "text": "AlertType.INFORMATION", "isCorrect": false },
        { "text": "AlertType.NONE", "isCorrect": false },
        { "text": "AlertType.PROGRESS", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je SplitPane?",
      "explanation": "SplitPane dijeli prostor na više područja razdvojenih dividerima koje korisnik može pomicati.",
      "difficulty": "EASY",
      "options": [
        { "text": "Kontejner s područjima razdvojenim dividerom", "isCorrect": true },
        { "text": "Kontrola za odabir datuma", "isCorrect": false },
        { "text": "Traka izbornika", "isCorrect": false },
        { "text": "Layout s 5 fiksnih područja", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se u GridPane.add(node, col, row) znači 'col'?",
      "explanation": "col je indeks stupca (column) u mreži.",
      "difficulty": "EASY",
      "options": [
        { "text": "Indeks stupca (column)", "isCorrect": true },
        { "text": "Indeks retka (row)", "isCorrect": false },
        { "text": "Širina u pikselima", "isCorrect": false },
        { "text": "Visina u pikselima", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja dva layouta iz materijala koriste new HBox(5) / new VBox(5) za spacing?",
      "explanation": "U primjerima su HBox i VBox kreirani s parametrom razmaka 5.",
      "difficulty": "EASY",
      "options": [
        { "text": "HBox i VBox", "isCorrect": true },
        { "text": "BorderPane i GridPane", "isCorrect": false },
        { "text": "FlowPane i StackPane", "isCorrect": false },
        { "text": "SplitPane i ScrollPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi PasswordField?",
      "explanation": "PasswordField je TextField koji skriva unesene znakove.",
      "difficulty": "EASY",
      "options": [
        { "text": "Unos lozinke uz skrivanje znakova", "isCorrect": true },
        { "text": "Odabir datuma", "isCorrect": false },
        { "text": "Prikaz napretka", "isCorrect": false },
        { "text": "Prikaz tabova", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi CheckBox?",
      "explanation": "CheckBox je kontrola za on/off odabir (true/false).",
      "difficulty": "EASY",
      "options": [
        { "text": "Omogućava odabir da/ne (boolean)", "isCorrect": true },
        { "text": "Odabire jedan od više (radio)", "isCorrect": false },
        { "text": "Prikazuje tablicu", "isCorrect": false },
        { "text": "Učitava FXML", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što radi RadioButton (u kontekstu grupe)?",
      "explanation": "RadioButton u ToggleGroup omogućava da je odabran samo jedan od više.",
      "difficulty": "EASY",
      "options": [
        { "text": "Omogućava odabir jedne opcije među više (uz ToggleGroup)", "isCorrect": true },
        { "text": "Uvijek omogućava multi-select", "isCorrect": false },
        { "text": "Prikazuje napredak", "isCorrect": false },
        { "text": "Otvara dijalog", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je Hyperlink u JavaFX-u?",
      "explanation": "Hyperlink je kontrola nalik web linku koja se može kliknuti i okinuti akciju.",
      "difficulty": "EASY",
      "options": [
        { "text": "Klikabilni link koji okida akciju", "isCorrect": true },
        { "text": "Kontrola za izbor boje", "isCorrect": false },
        { "text": "Layout s 5 područja", "isCorrect": false },
        { "text": "Kontejner za tabove", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je uloga MenuItem-a?",
      "explanation": "MenuItem predstavlja jednu akciju unutar Menu-a (npr. Save, Open).",
      "difficulty": "EASY",
      "options": [
        { "text": "Predstavlja pojedinačnu opciju/akciju u izborniku", "isCorrect": true },
        { "text": "Predstavlja cijeli MenuBar", "isCorrect": false },
        { "text": "Predstavlja layout mreže", "isCorrect": false },
        { "text": "Predstavlja root Scene-a", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je osnovna razlika između HBox i VBox?",
      "explanation": "HBox raspoređuje elemente horizontalno, VBox vertikalno.",
      "difficulty": "EASY",
      "options": [
        { "text": "HBox = horizontalno, VBox = vertikalno", "isCorrect": true },
        { "text": "HBox = vertikalno, VBox = horizontalno", "isCorrect": false },
        { "text": "Oba rade samo u FXML-u", "isCorrect": false },
        { "text": "Oba su dijalozi", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "U BorderPane-u, gdje ide zaglavlje aplikacije (header)?",
      "explanation": "Zaglavlje se tipično stavlja u TOP.",
      "difficulty": "EASY",
      "options": [
        { "text": "TOP", "isCorrect": true },
        { "text": "CENTER", "isCorrect": false },
        { "text": "BOTTOM", "isCorrect": false },
        { "text": "RIGHT", "isCorrect": false }
      ]
    },

    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je razlika između padding i spacing? (Odaberite sve točne)",
      "explanation": "Padding je unutarnji rub kontejnera, spacing je razmak između djece.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Padding = razmak između ruba kontejnera i sadržaja", "isCorrect": true },
        { "text": "Spacing = razmak između child elemenata", "isCorrect": true },
        { "text": "Padding i spacing su ista stvar", "isCorrect": false },
        { "text": "Spacing postavlja marginu na Stage-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se u FXML-u povezuje Button na metodu u controlleru? (Odaberite sve točne)",
      "explanation": 'Najčešće se koristi onAction="#imeMetode" u FXML-u, a metoda u controlleru je @FXML.',
      "difficulty": "MEDIUM",
      "options": [
        { "text": 'U FXML-u: onAction="#handleClick"', "isCorrect": true },
        { "text": 'U controlleru: @FXML void handleClick() { ... }', "isCorrect": true },
        { "text": 'U FXML-u: fx:id="#handleClick"', "isCorrect": false },
        { "text": 'U controlleru: metoda mora biti static', "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati (FXML učitavanje i postavljanje na scenu)?",
      "codeSnippet": 'import javafx.fxml.FXMLLoader;\nimport javafx.scene.Parent;\nimport javafx.scene.Scene;\nimport javafx.stage.Stage;\n\npublic class LoadFx {\n public void open(Stage stage) throws Exception {\n Parent root = FXMLLoader.load(getClass().getResource(" / view / main.fxml"));\n stage.setScene(new Scene(root));\n stage.show();\n }\n}',
      "explanation": 'Da, kod se kompilira. U runtime-u će raditi ako resource " / view / main.fxml" stvarno postoji u classpathu.',
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Da, kompilira se (runtime ovisi o postojanju resursa)", "isCorrect": true },
        { "text": "Ne, FXMLLoader.load ne postoji", "isCorrect": false },
        { "text": "Ne, Scene ne može primiti Parent", "isCorrect": false },
        { "text": "Ne, Stage se ne može show() iz metode", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se dogodi ako u FXML-u postoji fx:id, ali u controlleru nema odgovarajućeg @FXML polja? (Odaberite sve točne)",
      "explanation": "FXMLLoader neće odmah baciti grešku; polje se jednostavno neće injektirati (a u controlleru tog polja ni nema). Problem nastaje tek ako očekuješ to polje u kodu.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "FXMLLoader obično ne baca grešku samo zbog viška fx:id", "isCorrect": true },
        { "text": "Element se i dalje kreira u UI hijerarhiji", "isCorrect": true },
        { "text": "Aplikacija se ne može pokrenuti (uvijek)", "isCorrect": false },
        { "text": "FXML se neće parsirati uopće", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje su prednosti FXML-a? (Odaberite sve točne)",
      "explanation": "FXML odvaja izgled (View) od logike, olakšava održavanje i rad sa Scene Builderom.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Odvajanje prikaza od programske logike", "isCorrect": true },
        { "text": "Lakše mijenjanje dizajna bez diranja Java koda", "isCorrect": true },
        { "text": "Automatsko generiranje SQL sheme", "isCorrect": false },
        { "text": "Obavezno ubrzava aplikaciju", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ColumnConstraints(min/pref/max) predstavlja u GridPane-u? (Odaberite sve točne)",
      "explanation": "ColumnConstraints definira ograničenja širine stupca (minimalna, preferirana, maksimalna).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Minimalnu širinu stupca", "isCorrect": true },
        { "text": "Preferiranu širinu stupca", "isCorrect": true },
        { "text": "Maksimalnu širinu stupca", "isCorrect": true },
        { "text": "Broj redaka u GridPane-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Za što se koristi Priority.ALWAYS u ColumnConstraints? (Odaberite sve točne)",
      "explanation": "Priority.ALWAYS znači da se stupac širi (hgrow) i uzima dodatni prostor kad postoji.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Stupac može rasti i uzeti dodatni prostor", "isCorrect": true },
        { "text": "Stupac se nikad ne mijenja", "isCorrect": false },
        { "text": "Korisno kad se prozor povećava", "isCorrect": true },
        { "text": "Postavlja boju stupca", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: dodavanje Separatora u ToolBar?",
      "codeSnippet": 'import javafx.scene.control.;\nimport javafx.geometry.Orientation;\n\npublic class Tb {\n public ToolBar make() {\n return new ToolBar(\n new Button("A"),\n new Separator(Orientation.VERTICAL),\n new Button("B")\n );\n }\n}',
      "explanation": "Da, ToolBar može sadržavati Separator, a Orientation.VERTICAL je validan.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, Separator se ne smije koristiti u ToolBar-u", "isCorrect": false },
        { "text": "Ne, Orientation ne postoji u javafx.geometry", "isCorrect": false },
        { "text": "Ne, ToolBar prima samo MenuItem", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se u JavaFX-u tipično postavlja keyboard shortcut na MenuItem? (Odaberite sve točne)",
      "explanation": "Koristi se setAccelerator(KeyCombination.keyCombination('Ctrl+ N')).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "menuItem.setAccelerator(KeyCombination.keyCombination('Ctrl+ N'))", "isCorrect": true },
        { "text": "menuItem.setShortcut('Ctrl+ N')", "isCorrect": false },
        { "text": "setAccelerator radi na MenuItem-u, ne na MenuBar-u", "isCorrect": true },
        { "text": "Shortcut se postavlja samo u CSS-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Tab.setClosable(false) utječe? (Odaberite sve točne)",
      "explanation": "Onemogućuje zatvaranje taba (korisnik ne može kliknuti X).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Korisnik ne može zatvoriti tab (nema/disabled X)", "isCorrect": true },
        { "text": "Tab se automatski selektira", "isCorrect": false },
        { "text": "Sadržaj taba se briše", "isCorrect": false },
        { "text": "Utječe samo na taj Tab, ne na cijeli TabPane", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: stvaranje TableView i postavljanje ObservableList?",
      "codeSnippet": 'import javafx.scene.control.;\nimport javafx.collections.;\n\npublic class T {\n public TableView<String> make() {\n TableView<String> tv = new TableView<>();\n ObservableList<String> items = FXCollections.observableArrayList("A", "B");\n tv.setItems(items);\n return tv;\n }\n}',
      "explanation": "Da, kompilira se. TableView očekuje ObservableList za automatsko osvježavanje.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, TableView ne radi s ObservableList", "isCorrect": false },
        { "text": "Ne, FXCollections nema observableArrayList varijantu s varargs", "isCorrect": false },
        { "text": "Ne, TableView mora imati stupce da bi se kompilirao", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje su dvije glavne politike scroll barova u ScrollPane-u prema primjerima? (Odaberite sve točne)",
      "explanation": "Najčešće: AS_NEEDED (default) i ALWAYS/NEVER ovisno o potrebi.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "AS_NEEDED", "isCorrect": true },
        { "text": "ALWAYS", "isCorrect": true },
        { "text": "AUTO_HIDE", "isCorrect": false },
        { "text": "DYNAMIC_ONLY", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što znači 'Scene Graph' u JavaFX-u? (Odaberite sve točne)",
      "explanation": "Scene Graph je hijerarhija Node-ova unutar Scene-a (root i njegova djeca).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Hijerarhija UI elemenata (Node) unutar Scene-a", "isCorrect": true },
        { "text": "Samo graf animacija (frames)", "isCorrect": false },
        { "text": "Povezanost Stage → Scene → root → children", "isCorrect": true },
        { "text": "Služi samo za CSS", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: korištenje ToggleGroup s RadioButton-ima?",
      "codeSnippet": 'import javafx.scene.control.;\n\npublic class R {\n public void setup() {\n ToggleGroup g = new ToggleGroup();\n RadioButton r1 = new RadioButton("A");\n RadioButton r2 = new RadioButton("B");\n r1.setToggleGroup(g);\n r2.setToggleGroup(g);\n }\n}',
      "explanation": "Da, kompilira se. ToggleGroup osigurava da je odabran najviše jedan RadioButton u grupi.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, RadioButton ne može u ToggleGroup", "isCorrect": false },
        { "text": "Ne, ToggleGroup radi samo s ToggleButton", "isCorrect": false },
        { "text": "Ne, mora se koristiti ButtonGroup", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je ObservableList u kontekstu UI-a? (Odaberite sve točne)",
      "explanation": "ObservableList šalje obavijesti o promjenama, pa kontrole (TableView/ListView) mogu refreshati prikaz.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Lista koja šalje notifikacije o promjenama", "isCorrect": true },
        { "text": "Omogućava automatsko osvježavanje UI-a", "isCorrect": true },
        { "text": "U JavaFX-u se ne koristi s kontrolama", "isCorrect": false },
        { "text": "Zamjenjuje potrebu za MVC-om", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji dio MVC-a je najčešće FXML datoteka?",
      "explanation": "FXML definira izgled (View).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "View", "isCorrect": true },
        { "text": "Model", "isCorrect": false },
        { "text": "Controller", "isCorrect": false },
        { "text": "Repository", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se u JavaFX-u najčešće dodaje CSS datoteka na Scene? (Odaberite sve točne)",
      "explanation": "Dodaje se putem scene.getStylesheets().add(url.toExternalForm()).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": 'scene.getStylesheets().add(getClass().getResource("application.css").toExternalForm())', "isCorrect": true },
        { "text": "stage.getStylesheets().add(...)", "isCorrect": false },
        { "text": 'scene.addCss("application.css")', "isCorrect": false },
        { "text": "Resource treba pretvoriti u external form (String URL)", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: postavljanje sadržaja Tab-a na Button?",
      "codeSnippet": 'import javafx.scene.control.*;\n\npublic class TabContent {\n public Tab make() {\n Tab t = new Tab("X");\n t.setContent(new Button("Click"));\n return t;\n }\n}',
      "explanation": "Da, kompilira se. Tab content može biti bilo koji Node.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": 'Da, kompilira se', "isCorrect": true },
        { "text": "Ne, Tab content mora biti Parent", "isCorrect": false },
        { "text": "Ne, Button ne može biti u Tab-u", "isCorrect": false },
        { "text": "Ne, Tab nema setContent()", "isCorrect": false }
      ]
    },

    {
      "type": "MULTIPLE_CHOICE",
      "prompt": 'to se događa ako getClass().getResource(" / nepostoji.fxml") vrati null i to proslijediš FXMLLoader.load(null)? (Odaberite sve točne)',
      "explanation": "Ako je URL null, dobit ćeš runtime grešku (najčešće NullPointerException) jer FXMLLoader ne može učitati null resource.",
      "difficulty": "HARD",
      "options": [
        { "text": "U runtime-u može baciti NullPointerException", "isCorrect": true },
        { "text": "FXMLLoader automatski traži alternativni resource", "isCorrect": false },
        { "text": "Problem je u krivoj putanji ili tome da resource nije u classpath-u", "isCorrect": true },
        { "text": "Kompajler će to uhvatiti kao grešku", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": 'Što vrijedi za Controller klasu u FXML-u kada se koristi fx:controller? (Odaberite sve točne)',
      "explanation": "FXMLLoader instancira controller refleksijom. Tipično treba no-arg konstruktor ili controller factory.",
      "difficulty": "HARD",
      "options": [
        { "text": "Controller se obično instancira refleksijom", "isCorrect": true },
        { "text": "No-arg konstruktor je tipično potreban (ako nema controller factory)", "isCorrect": true },
        { "text": "Controller mora biti interface", "isCorrect": false },
        { "text": "Controller se nikad ne instancira automatski", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": 'Hoće li se kompilirati: poziv initialize() s pogrešnim signatureom?',
      "codeSnippet": 'import javafx.fxml.FXML;\n\npublic class C {\n @FXML\n public void initialize(int x) {\n System.out.println(x);\n }\n}',
      "explanation": 'Kompilira se, ali FXMLLoader neće prepoznati initialize(int) kao validan initialize handler (očekuje no-arg ili (URL, ResourceBundle)).',
      "difficulty": "HARD",
      "options": [
        { "text": 'Da, kompilira se, ali FXMLLoader neće automatski pozvati initialize(int)', "isCorrect": true },
        { "text": "Ne, ne kompilira se jer initialize mora biti bez parametara", "isCorrect": false },
        { "text": "Da, i FXMLLoader će ga pozvati s 0", "isCorrect": false },
        { "text": "Ne, @FXML se ne može koristiti na metodama", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": 'Što je točno za onAction="#metoda" u FXML-u? (Odaberite sve točne)',
      "explanation": "FXMLLoader mapira handler na metodu u controlleru. Ako metoda ne postoji ili potpis nije kompatibilan, dobiješ LoadException u runtime-u.",
      "difficulty": "HARD",
      "options": [
        { "text": "Metoda mora postojati u controlleru", "isCorrect": true },
        { "text": "Greška se često vidi kao LoadException pri učitavanju FXML-a", "isCorrect": true },
        { "text": "Metoda mora obavezno vraćati boolean", "isCorrect": false },
        { "text": "Handler se provjerava u compile time-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje tvrdnje su točne za SplitPane s 3 itema? (Odaberite sve točne)",
      "explanation": "SplitPane s 3 itema ima 2 dividera (indeksi 0 i 1) i pozicije su 0.0-1.0.",
      "difficulty": "HARD",
      "options": [
        { "text": "Ima 2 dividera", "isCorrect": true },
        { "text": "Divider indeksi su 0 i 1", "isCorrect": true },
        { "text": "Pozicije dividera su u rasponu 0.0 do 1.0", "isCorrect": true },
        { "text": "Pozicije dividera se postavljaju u pikselima", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: pokušaj dodavanja Node-a direktno u BorderPane preko getChildren()?",
      "codeSnippet": 'import javafx.scene.layout.BorderPane;\nimport javafx.scene.control.Button;\n\npublic class B {\n public void t() {\n BorderPane p = new BorderPane();\n p.getChildren().add(new Button("X"));\n }\n}',
      "explanation": "Neće se kompilirati: BorderPane ne izlaže public getChildren() (koristi setTop/setCenter...).",
      "difficulty": "HARD",
      "options": [
        { "text": "Ne, neće se kompilirati (nema public getChildren())", "isCorrect": true },
        { "text": "Da, kompilira se i dodaje gumb u CENTER", "isCorrect": false },
        { "text": "Da, kompilira se ali baca exception u runtime-u", "isCorrect": false },
        { "text": "Ne, BorderPane ne može sadržavati kontrole", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je točno za TableView i njegove stupce? (Odaberite sve točne)",
      "explanation": "TableView prikazuje redove iz items liste, a TableColumn definira kako se čita vrijednost iz objekta (cellValueFactory).",
      "difficulty": "HARD",
      "options": [
        { "text": "TableView čita redove iz items (ObservableList)", "isCorrect": true },
        { "text": "TableColumn koristi cellValueFactory za dohvat vrijednosti", "isCorrect": true },
        { "text": "Stupci se automatski generiraju bez ikakvih postavki", "isCorrect": false },
        { "text": "TableView može raditi i bez items (prikazat će prazno)", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je razlika između setStyle(...) i CSS datoteke na Scene-u? (Odaberite sve točne)",
      "explanation": "setStyle postavlja inline CSS na Node, dok CSS datoteka (stylesheet) djeluje kroz selektore na više čvorova.",
      "difficulty": "HARD",
      "options": [
        { "text": "setStyle postavlja inline stil na pojedini Node", "isCorrect": true },
        { "text": "Stylesheet na Scene-u može stilizirati više elemenata selektorima", "isCorrect": true },
        { "text": "Inline style uvijek koristi web CSS bez -fx- prefiksa", "isCorrect": false },
        { "text": "Stylesheet se može dodati preko scene.getStylesheets()", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: upotreba getResource bez toExternalForm u stylesheets?",
      "codeSnippet": 'import javafx.scene.Scene;\nimport javafx.scene.layout.BorderPane;\n\npublic class S {\n public Scene make() {\n Scene sc = new Scene(new BorderPane(), 200, 200);\n sc.getStylesheets().add(getClass().getResource("application.css").toString());\n return sc;\n }\n}',
      "explanation": 'Kompilira se, ali je preporučeno koristiti toExternalForm(); toString() često radi jer je URL, no external form je standardan pristup.',
      "difficulty": "HARD",
      "options": [
        { "text": 'Da, kompilira se (toExternalForm je preporučen)', "isCorrect": true },
        { "text": "Ne, ne kompilira se jer add prima URL, ne String", "isCorrect": false },
        { "text": "Ne, getStylesheets() ne postoji", "isCorrect": false },
        { "text": "Da, ali uvijek baca exception u compile time-u", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je najčešći uzrok da @FXML polje ostane null nakon učitavanja FXML-a? (Odaberite sve točne)",
      "explanation": "Najčešće: krivi fx:id (ne podudara se), fali @FXML anotacija na private polju, ili se učitava krivi FXML.",
      "difficulty": "HARD",
      "options": [
        { "text": "fx:id u FXML-u ne odgovara nazivu polja", "isCorrect": true },
        { "text": "Polje je private i nema @FXML", "isCorrect": true },
        { "text": "FXMLLoader uvijek puni sva polja bez obzira na naziv", "isCorrect": false },
        { "text": "Učitava se druga FXML datoteka nego što misliš", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što vrijedi za BorderPane pozicije? (Odaberite sve točne)",
      "explanation": "BorderPane ima 5 pozicija i svaka pozicija može imati samo jedan Node; za više elemenata koristi se dodatni container (npr. HBox).",
      "difficulty": "HARD",
      "options": [
        { "text": "Postoji TOP/LEFT/CENTER/RIGHT/BOTTOM", "isCorrect": true },
        { "text": "Svaka pozicija prima samo jedan Node", "isCorrect": true },
        { "text": "Za više elemenata u TOP koristi se npr. HBox", "isCorrect": true },
        { "text": "BorderPane može imati neograničeno djece u CENTER bez dodatnog layouta", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: poziv launch(args) iz obične metode koja nije static main?",
      "codeSnippet": "import javafx.application.Application;\nimport javafx.stage.Stage;\n\npublic class A extends Application {\n @Override public void start(Stage s) { s.show(); }\n public void runApp(String[] args) { launch(args); }\n}",
      "explanation": "Da, kompilira se, ali u praksi launch se tipično zove iz static main ili direktno preko JVM-a; poziv iz instance metode je legalan za kompilaciju.",
      "difficulty": "HARD",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, launch se smije zvati samo u main metodi", "isCorrect": false },
        { "text": "Ne, launch je private metoda", "isCorrect": false },
        { "text": "Da, ali neće pokrenuti JavaFX Application Thread nikad", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje tvrdnje su točne za 'MenuBar → Menu → MenuItem'? (Odaberite sve točne)",
      "explanation": "MenuBar sadrži Menu, a Menu sadrži MenuItem (akcije). MenuItem se ne dodaje direktno u MenuBar.",
      "difficulty": "HARD",
      "options": [
        { "text": "MenuBar sadrži Menu objekte", "isCorrect": true },
        { "text": "Menu sadrži MenuItem objekte", "isCorrect": true },
        { "text": "MenuItem se može direktno dodati u MenuBar.getMenus()", "isCorrect": false },
        { "text": "Menu može sadržavati i pod-izbornik (Menu unutar Menu-a)", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je najtočniji opis razlike između ListView i TableView? (Odaberite sve točne)",
      "explanation": "ListView je lista (jedna kolona prikaza), TableView prikazuje tablicu (više stupaca) s TableColumn definicijama.",
      "difficulty": "HARD",
      "options": [
        { "text": "ListView prikazuje listu stavki (obično jedan prikazni stupac)", "isCorrect": true },
        { "text": "TableView prikazuje redove i stupce (TableColumn)", "isCorrect": true },
        { "text": "TableView ne može raditi s ObservableList", "isCorrect": false },
        { "text": "ListView je obavezno hijerarhijski prikaz (stablo)", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: korištenje ChoiceBox bez generics tipa?",
      "codeSnippet": 'import javafx.scene.control.ChoiceBox;\n\npublic class Ch {\n public void t() {\n ChoiceBox cb = new ChoiceBox();\n cb.getItems().add("A");\n }\n}',
      "explanation": 'Da, kompilira se uz raw type upozorenja. Preporuka je koristiti ChoiceBox<String>.',
      "difficulty": "HARD",
      "options": [
        { "text": 'Da, kompilira se (raw type warning)', "isCorrect": true },
        { "text": "Ne, ChoiceBox mora imati generic tip da bi se kompiliralo", "isCorrect": false },
        { "text": "Ne, getItems() ne postoji na ChoiceBox", "isCorrect": false },
        { "text": 'Da, ali add("A") nije dopušten', "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje tvrdnje su točne za GridPane koordinate? (Odaberite sve točne)",
      "explanation": "GridPane pozicionira node po (columnIndex, rowIndex). Elementi se mogu poravnati i constraintati (Hgap/Vgap, constraints).",
      "difficulty": "HARD",
      "options": [
        { "text": 'Dodavanje ide kao add(node, col, row)', "isCorrect": true },
        { "text": "Hgap/Vgap su razmaci između ćelija", "isCorrect": true },
        { "text": "GridPane koristi apsolutne piksele umjesto redaka/stupaca", "isCorrect": false },
        { "text": "ColumnConstraints/RowConstraints mogu utjecati na veličine", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa ako u BorderPane-u više puta pozoveš setLeft(...) s različitim nodeovima? (Odaberite sve točne)",
      "explanation": "Svaka pozicija ima samo jednog node-a; novi node zamjenjuje stari na toj poziciji.",
      "difficulty": "HARD",
      "options": [
        { "text": "Novi node zamjenjuje prethodni (overwrite)", "isCorrect": true },
        { "text": "Oba node-a ostaju prikazana", "isCorrect": false },
        { "text": "Baca exception jer je pozicija zauzeta", "isCorrect": false },
        { "text": "Za više elemenata treba koristiti container (npr. VBox) kao left content", "isCorrect": true }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se kompilirati: dodavanje više elemenata u TOP BorderPane-a preko HBox-a?",
      "codeSnippet": 'import javafx.scene.layout.;\nimport javafx.scene.control.;\n\npublic class BP {\n public BorderPane make() {\n BorderPane bp = new BorderPane();\n HBox top = new HBox(5, new Button("A"), new Button("B"));\n bp.setTop(top);\n return bp;\n }\n}',
      "explanation": 'Da, kompilira se. BorderPane TOP prima jedan Node, ali taj Node može biti HBox s više djece.',
      "difficulty": "HARD",
      "options": [
        { "text": 'Da, kompilira se', "isCorrect": true },
        { "text": 'Ne, BorderPane TOP ne može primiti HBox', "isCorrect": false },
        { "text": "Ne, HBox ne može primiti Button", "isCorrect": false },
        { "text": "Da, ali samo ako je TOP prazan", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje su realne posljedice krivog -fx- prefiksa u JavaFX CSS-u? (Odaberite sve točne)",
      "explanation": "Ako koristiš web CSS property bez -fx-, JavaFX ga najčešće ignorira pa stil ne djeluje.",
      "difficulty": "HARD",
      "options": [
        { "text": "Stil se može ignorirati i neće se primijeniti", "isCorrect": true },
        { "text": "Aplikacija se neće kompilirati", "isCorrect": false },
        { "text": "Može izgledati kao da CSS 'ne radi'", "isCorrect": true },
        { "text": "Rješenje je koristiti odgovarajuća -fx-* svojstva", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je točno za povezivanje TableColumn s podacima preko PropertyValueFactory? (Odaberite sve točne)",
      "explanation": "PropertyValueFactory koristi naziv propertyja da pronađe getter (bean konvencija) ili property metodu; naziv treba odgovarati propertyju.",
      "difficulty": "HARD",
      "options": [
        { "text": 'Prima naziv propertyja kao String (npr. "firstName")', "isCorrect": true },
        { "text": 'Oslanja se na bean konvencije (getFirstName / firstNameProperty)', "isCorrect": true },
        { "text": 'Automatski radi i ako je naziv potpuno drugačiji', "isCorrect": false },
        { "text": 'Koristi se unutar setCellValueFactory(...)', "isCorrect": true }
      ]
    }
  ]
}
