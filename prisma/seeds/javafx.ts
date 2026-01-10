import { QuestionType, Difficulty } from '@prisma/client'

export const javaFx = {
  lectureSlug: 'javafx',
  questions: [
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje klase ili interface moraju JavaFX aplikacije naslijediti/implementirati? (Odaberite sve točne)",
      "explanation": "JavaFX aplikacija nasljeđuje javafx.application.Application klasu koja upravlja životnim ciklusom. Application je konkretna klasa, ne interface. Ova klasa pruža metode kao što su start(), init() i stop(). Nije potrebno implementirati dodatne interface-e osim ako aplikacija ima specifične potrebe (npr. EventHandler).",
      "difficulty": "EASY",
      "options": [
        { "text": "javafx.application.Application", "isCorrect": true },
        { "text": "javafx.stage.Stage", "isCorrect": false },
        { "text": "javafx.scene.Node", "isCorrect": false },
        { "text": "Runnable", "isCorrect": false },
        { "text": "Serializable", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što predstavlja Stage u JavaFX aplikaciji? (Odaberite sve točne)",
      "explanation": "Stage je vrhovna razina kontejnera koji predstavlja prozor aplikacije. Svaka JavaFX aplikacija ima barem jedan Stage (primaryStage). Stage može sadržavati Scene objekte i upravlja naslovom prozora, veličinom i vidljivošću. Stage je kao kazališna pozornica na koju se postavljaju scene.",
      "difficulty": "EASY",
      "options": [
        { "text": "Glavni prozor aplikacije", "isCorrect": true },
        { "text": "Top-level container", "isCorrect": true },
        { "text": "Može sadržavati Scene objekte", "isCorrect": true },
        { "text": "Layout container za kontrole", "isCorrect": false },
        { "text": "CSS stylesheet datoteka", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Scene predstavlja u JavaFX-u? (Odaberite sve točne)",
      "explanation": "Scene je kontejner za sav sadržaj u JavaFX grafu. Scene drži root node koji je početak hijerarhije svih UI elemenata. Scene se postavlja na Stage pomoću setScene(). Scene može imati svoje CSS stylesheets i veličinu. Scene Graph je hijerarhija node-ova unutar Scene objekta.",
      "difficulty": "EASY",
      "options": [
        { "text": "Kontejner za UI sadržaj", "isCorrect": true },
        { "text": "Drži root node hijerarhije", "isCorrect": true },
        { "text": "Postavlja se na Stage", "isCorrect": true },
        { "text": "Isti objekt kao Stage", "isCorrect": false },
        { "text": "Ne može imati CSS", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja metoda pokreće JavaFX aplikaciju? (Odaberite sve točne)",
      "explanation": "Application.launch() je statička metoda koja pokreće JavaFX runtime i kreira Application Thread. Poziva se iz main metode. launch() metoda je blocking - ne vraća kontrolu dok se aplikacija ne zatvori. Može se pozvati samo jednom u životnom vijeku JVM procesa.",
      "difficulty": "EASY",
      "options": [
        { "text": "launch(args)", "isCorrect": true },
        { "text": "Application.launch(args)", "isCorrect": true },
        { "text": "start(args)", "isCorrect": false },
        { "text": "run(args)", "isCorrect": false },
        { "text": "Platform.startup()", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje lifecycle metode postoje u Application klasi? (Odaberite sve točne)",
      "explanation": "Application klasa ima tri glavne lifecycle metode: init() koja se poziva prije start() na background thread-u, start() koja se izvršava na JavaFX Application Thread-u i prima primaryStage, te stop() koja se poziva pri zatvaranju aplikacije. Samo start() metoda je obavezna za override jer je abstract.",
      "difficulty": "EASY",
      "options": [
        { "text": "init()", "isCorrect": true },
        { "text": "start(Stage primaryStage)", "isCorrect": true },
        { "text": "stop()", "isCorrect": true },
        { "text": "main(String[] args)", "isCorrect": false },
        { "text": "render()", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je Scene Builder? (Odaberite sve točne)",
      "explanation": "Scene Builder je vizualni alat za dizajniranje JavaFX GUI-ja metodom drag-and-drop. Automatski generira FXML kod. Integrira se s IDE-ima poput IntelliJ IDEA i Eclipse. Instalira se zasebno od IDE-a i može se preuzeti s gluonhq.com. Omogućava live preview dizajna.",
      "difficulty": "EASY",
      "options": [
        { "text": "Vizualni alat za dizajniranje GUI-ja", "isCorrect": true },
        { "text": "Generira FXML kod automatski", "isCorrect": true },
        { "text": "Drag-and-drop interface", "isCorrect": true },
        { "text": "Dolazi ugrađen u JDK", "isCorrect": false },
        { "text": "Kompajlira Java kod", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je FXML? (Odaberite sve točne)",
      "explanation": "FXML je XML-based markup language za deklarativno definiranje JavaFX korisničkih sučelja. Odvaja prezentacijsku logiku od programske logike. FXML datoteke se učitavaju pomoću FXMLLoader klase. Scene Builder automatski generira FXML kod. FXML omogućava lakše održavanje jer se UI dizajn može mijenjati bez diranja Java koda.",
      "difficulty": "EASY",
      "options": [
        { "text": "XML format za JavaFX UI", "isCorrect": true },
        { "text": "Odvaja prezentaciju od logike", "isCorrect": true },
        { "text": "Učitava se s FXMLLoader", "isCorrect": true },
        { "text": "Binary format za brzinu", "isCorrect": false },
        { "text": "Zamjena za CSS", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kako se CSS datoteka dodaje na Scene? (Odaberite sve točne)",
      "explanation": "CSS se dodaje na Scene pomoću getStylesheets().add() metode. Resource se učitava pomoću getClass().getResource() i konvertira u String URL s toExternalForm(). Može se dodati više CSS datoteka. CSS stilovi se primjenjuju hijerarhijski kroz Scene Graph. JavaFX CSS koristi -fx- prefiks za svojstva.",
      "difficulty": "EASY",
      "options": [
        { "text": "scene.getStylesheets().add(url)", "isCorrect": true },
        { "text": "getClass().getResource() za učitavanje", "isCorrect": true },
        { "text": "toExternalForm() konverzija", "isCorrect": true },
        { "text": "stage.addCss()", "isCorrect": false },
        { "text": "Ne može se dodati CSS na Scene", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje prefiks JavaFX CSS svojstva koriste? (Odaberite sve točne)",
      "explanation": "Sva JavaFX CSS svojstva koriste -fx- prefiks. Primjeri: -fx-font-size, -fx-background-color, -fx-text-fill, -fx-padding. Razlog je razlikovanje od standardnog web CSS-a. CSS parser ignorira svojstva bez -fx- prefiksa. Ovo sprječava konflikte s web CSS svojstvima.",
      "difficulty": "EASY",
      "options": [
        { "text": "-fx-", "isCorrect": true },
        { "text": "Sva svojstva moraju imati ovaj prefiks", "isCorrect": true },
        { "text": "Primjer: -fx-font-size", "isCorrect": true },
        { "text": "-javafx-", "isCorrect": false },
        { "text": "Bez prefiksa kao web CSS", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout raspoređuje elemente horizontalno? (Odaberite sve točne)",
      "explanation": "HBox je layout koji raspoređuje child node-ove horizontalno u jednom redu. Spacing parametar kontrolira razmak između elemenata. HBox automatski prilagođava veličinu pri promjeni prozora. Padding se može postaviti za unutarnji razmak. HBox nasljeđuje Pane pa ima public getChildren().",
      "difficulty": "EASY",
      "options": [
        { "text": "HBox", "isCorrect": true },
        { "text": "Raspoređuje u jedan red", "isCorrect": true },
        { "text": "Može imati spacing", "isCorrect": true },
        { "text": "VBox", "isCorrect": false },
        { "text": "BorderPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koji layout raspoređuje elemente vertikalno? (Odaberite sve točne)",
      "explanation": "VBox je layout koji raspoređuje child node-ove vertikalno u jednoj koloni. Kao i HBox, podržava spacing i padding. VBox je idealan za forme i vertikalne toolbar-e. Automatski prilagođava visinu children. Nasljeđuje Pane klasu.",
      "difficulty": "EASY",
      "options": [
        { "text": "VBox", "isCorrect": true },
        { "text": "Raspoređuje u jednu kolonu", "isCorrect": true },
        { "text": "Podržava spacing i padding", "isCorrect": true },
        { "text": "HBox", "isCorrect": false },
        { "text": "GridPane", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je FlowPane? (Odaberite sve točne)",
      "explanation": "FlowPane raspoređuje elemente u 'tok' - horizontalno dok ima mjesta, zatim wrap na novi red. Slično HTML flex wrappingu. Podržava alignment pozicioniranje. HGap i VGap kontroliraju razmake. Korisno za grupe gumbi ili ikonice koje treba prilagoditi različitim širinama prozora.",
      "difficulty": "EASY",
      "options": [
        { "text": "Raspoređuje u tok s wrap-om", "isCorrect": true },
        { "text": "Lijevo-desno pa novi red", "isCorrect": true },
        { "text": "Podržava HGap i VGap", "isCorrect": true },
        { "text": "Fiksna pozicija bez wrapa", "isCorrect": false },
        { "text": "Samo za tablice", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koliko regija BorderPane ima? (Odaberite sve točne)",
      "explanation": "BorderPane ima točno 5 regija: TOP, LEFT, CENTER, RIGHT i BOTTOM. Svaka regija može sadržavati samo jedan Node. Za više elemenata u regiji koristi se container (HBox, VBox). CENTER zauzima preostali prostor. TOP i BOTTOM se rastežu horizontalno, LEFT i RIGHT vertikalno.",
      "difficulty": "EASY",
      "options": [
        { "text": "5 regija", "isCorrect": true },
        { "text": "TOP, LEFT, CENTER, RIGHT, BOTTOM", "isCorrect": true },
        { "text": "Svaka regija prima jedan Node", "isCorrect": true },
        { "text": "3 regije", "isCorrect": false },
        { "text": "Neograničen broj regija", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je GridPane? (Odaberite sve točne)",
      "explanation": "GridPane je layout koji raspoređuje elemente u mrežu s redovima i stupcima. Elementi se pozicioniraju s add(node, columnIndex, rowIndex). HGap i VGap kontroliraju razmake. ColumnConstraints i RowConstraints omogućavaju fine-tuning veličina. Idealan za forme i tablične prikaze.",
      "difficulty": "EASY",
      "options": [
        { "text": "Mreža s redovima i stupcima", "isCorrect": true },
        { "text": "Pozicioniranje s (col, row)", "isCorrect": true },
        { "text": "Idealan za forme", "isCorrect": true },
        { "text": "Samo horizontalni raspored", "isCorrect": false },
        { "text": "Ne podržava razmake", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je @FXML anotacija? (Odaberite sve točne)",
      "explanation": "@FXML označava polja i metode za FXMLLoader injection. Omogućava pristup private poljima kroz reflection. Ime polja mora odgovarati fx:id u FXML-u. Metode se povezuju s event handlerima. Ne radi na static poljima jer svaki Controller instance ima svoje field vrijednosti.",
      "difficulty": "EASY",
      "options": [
        { "text": "Označava injection targets", "isCorrect": true },
        { "text": "Omogućava reflection pristup", "isCorrect": true },
        { "text": "Povezuje fx:id s poljima", "isCorrect": true },
        { "text": "Mijenja compile-time vidljivost", "isCorrect": false },
        { "text": "Radi na static poljima", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što fx:id označava u FXML-u? (Odaberite sve točne)",
      "explanation": "fx:id je jedinstveni identifikator elementa u FXML-u. Koristi se za povezivanje s @FXML poljima u Controlleru. Mora biti unique unutar FXML dokumenta. Ime mora odgovarati varijabli u Controlleru. Slično HTML id atributu ali specifično za JavaFX injection.",
      "difficulty": "EASY",
      "options": [
        { "text": "Jedinstveni identifikator elementa", "isCorrect": true },
        { "text": "Povezuje s @FXML poljima", "isCorrect": true },
        { "text": "Mora biti unique u dokumentu", "isCorrect": true },
        { "text": "Isto kao CSS class", "isCorrect": false },
        { "text": "Ne mora biti unique", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je MVC arhitektura u JavaFX-u? (Odaberite sve točne)",
      "explanation": "MVC (Model-View-Controller) razdvaja aplikaciju na tri dijela: Model su domenski podaci (POJO klase), View je FXML/UI prezentacija, Controller povezuje View s logikom. Omogućava bolju organizaciju koda, lakše testiranje i održavanje. Svaki ekran ima svoju FXML i Controller klasu.",
      "difficulty": "EASY",
      "options": [
        { "text": "Model = domenski podaci", "isCorrect": true },
        { "text": "View = FXML/UI prezentacija", "isCorrect": true },
        { "text": "Controller = logika i event handling", "isCorrect": true },
        { "text": "Model = baza podataka", "isCorrect": false },
        { "text": "View = Java kod za UI", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je ObservableList? (Odaberite sve točne)",
      "explanation": "ObservableList je lista koja šalje notifikacije o promjenama. Koristi se s TableView, ListView i drugim kontrolama za automatsko ažuriranje UI-a. FXCollections.observableArrayList() kreira instance. Podržava ListChangeListener za praćenje promjena. Ključni dio JavaFX data binding mehanizma.",
      "difficulty": "EASY",
      "options": [
        { "text": "Šalje notifikacije o promjenama", "isCorrect": true },
        { "text": "Za automatsko UI ažuriranje", "isCorrect": true },
        { "text": "Koristi se s TableView/ListView", "isCorrect": true },
        { "text": "Immutable lista", "isCorrect": false },
        { "text": "Ne podržava listenere", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što FXCollections klasa pruža? (Odaberite sve točne)",
      "explanation": "FXCollections je factory klasa za observable kolekcije. Metode uključuju observableArrayList(), observableHashMap(), unmodifiableObservableList(). Omogućava kreiranje synchronized i empty observable kolekcija. Svi UI containeri koji prikazuju podatke koriste observable kolekcije za binding.",
      "difficulty": "EASY",
      "options": [
        { "text": "Factory za observable kolekcije", "isCorrect": true },
        { "text": "observableArrayList() metoda", "isCorrect": true },
        { "text": "observableHashMap() metoda", "isCorrect": true },
        { "text": "Utility za sortiranje", "isCorrect": false },
        { "text": "Zamjena za java.util.Collections", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TableView prikazuje? (Odaberite sve točne)",
      "explanation": "TableView prikazuje podatke u tabličnom formatu s redovima i stupcima. Svaki stupac je TableColumn objekt. Koristi ObservableList za podatke. PropertyValueFactory povezuje stupce s objektnim poljima. Podržava sortiranje, selekciju i cell customization.",
      "difficulty": "EASY",
      "options": [
        { "text": "Tablični prikaz podataka", "isCorrect": true },
        { "text": "Redovi i stupci", "isCorrect": true },
        { "text": "Koristi ObservableList", "isCorrect": true },
        { "text": "Samo jedan stupac", "isCorrect": false },
        { "text": "Ne podržava sortiranje", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što PropertyValueFactory radi? (Odaberite sve točne)",
      "explanation": "PropertyValueFactory povezuje TableColumn s property-jem objekta. Traži getter metode (getPropertyName) ili property metode (propertyNameProperty). Case-sensitive je i mora matchati točan naziv polja. Koristi Java Bean konvencije. Alternativa je custom Callback za kompleksniju logiku.",
      "difficulty": "EASY",
      "options": [
        { "text": "Povezuje stupac s objektnim poljem", "isCorrect": true },
        { "text": "Traži getter metode", "isCorrect": true },
        { "text": "Case-sensitive je", "isCorrect": true },
        { "text": "Automatski kreira polja", "isCorrect": false },
        { "text": "Ne koristi Bean konvencije", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što MenuBar sadrži? (Odaberite sve točne)",
      "explanation": "MenuBar je top-level container za menije. Sadrži Menu objekte koji predstavljaju dropdown kategorije (File, Edit). Svaki Menu sadrži MenuItem objekte koji su pojedinačne akcije. Podržava keyboard shortcuts kroz setAccelerator(). MenuBar se tipično postavlja na TOP BorderPane-a.",
      "difficulty": "EASY",
      "options": [
        { "text": "Menu objekte", "isCorrect": true },
        { "text": "Top-level container za menije", "isCorrect": true },
        { "text": "Dobavlja se s getMenus()", "isCorrect": true },
        { "text": "MenuItem objekte direktno", "isCorrect": false },
        { "text": "Samo TextField kontrole", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što MenuItem predstavlja? (Odaberite sve točne)",
      "explanation": "MenuItem je pojedinačna akcija u meniju. Može imati tekst, ikonu i keyboard shortcut. Povezuje se s ActionEvent handlerom. Podržava disabled stanje. Može biti u obliku CheckMenuItem ili RadioMenuItem za toggle funkcionalnost. Menu može sadržavati i submenu (Menu unutar Menu-a).",
      "difficulty": "EASY",
      "options": [
        { "text": "Pojedinačna akcija u meniju", "isCorrect": true },
        { "text": "Može imati shortcut", "isCorrect": true },
        { "text": "Povezuje se s handlerima", "isCorrect": true },
        { "text": "Top-level container", "isCorrect": false },
        { "text": "Ne može biti disabled", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je Alert dijalog? (Odaberite sve točne)",
      "explanation": "Alert je ugrađeni dijalog za poruke korisniku. Tipovi uključuju INFORMATION, WARNING, ERROR, CONFIRMATION. showAndWait() je blocking metoda koja čeka korisnikov odgovor. Vraća Optional<ButtonType>. Može imati custom buttons. setHeaderText i setContentText postavljaju sadržaj.",
      "difficulty": "EASY",
      "options": [
        { "text": "Ugrađeni dijalog za poruke", "isCorrect": true },
        { "text": "showAndWait() čeka odgovor", "isCorrect": true },
        { "text": "Vraća Optional<ButtonType>", "isCorrect": true },
        { "text": "Samo INFORMATION tip", "isCorrect": false },
        { "text": "Ne može imati custom buttons", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TabPane sadrži? (Odaberite sve točne)",
      "explanation": "TabPane je kontejner za Tab objekte koji prikazuje kartice. Svaki Tab ima tekst, ikonu i content (Node). Samo jedan Tab može biti selektiran istovremeno. Tab.setClosable() kontrolira može li se zatvoriti. SelectionModel upravlja trenutnom selekcijom. getTabs() vraća ObservableList.",
      "difficulty": "EASY",
      "options": [
        { "text": "Tab objekte", "isCorrect": true },
        { "text": "Prikazuje kartice", "isCorrect": true },
        { "text": "Svaki Tab ima content", "isCorrect": true },
        { "text": "Menu objekte", "isCorrect": false },
        { "text": "Ne podržava closable tabove", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Accordion prikazuje? (Odaberite sve točne)",
      "explanation": "Accordion je kontejner s TitledPane elementima gdje samo jedan može biti proširen istovremeno. Klik na expanded pane ga zatvara (collapse). setExpandedPane() kontrolira koji je otvoren. Može biti null (svi zatvoreni). Korisno za FAQ sekcije i konfiguracijske panele.",
      "difficulty": "EASY",
      "options": [
        { "text": "TitledPane elemente", "isCorrect": true },
        { "text": "Samo jedan otvoren istovremeno", "isCorrect": true },
        { "text": "Toggle collapsed/expanded", "isCorrect": true },
        { "text": "Svi otvoreni istovremeno", "isCorrect": false },
        { "text": "Ne može biti prazan", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TreeView prikazuje? (Odaberite sve točne)",
      "explanation": "TreeView prikazuje hijerarhijske podatke u tree strukturi. Root je TreeItem<T> objekt. setShowRoot(false) skriva root i prikazuje samo children. TreeItem može imati grafiku (ikonu). Podržava multiple selection mode. getSelectionModel() upravlja selekcijom. Expanded/collapsed state se kontrolira na TreeItem-u.",
      "difficulty": "EASY",
      "options": [
        { "text": "Hijerarhijske podatke", "isCorrect": true },
        { "text": "TreeItem strukturu", "isCorrect": true },
        { "text": "Može sakriti root", "isCorrect": true },
        { "text": "Samo flat listu", "isCorrect": false },
        { "text": "Ne podržava ikone", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ListView prikazuje? (Odaberite sve točne)",
      "explanation": "ListView prikazuje skrolabilnu listu stavki u jednoj koloni. Koristi ObservableList za podatke. Podržava single i multiple selection mode. CellFactory omogućava custom cell prikaz. Slično kao TableView ali jednostavnije bez stupaca. getSelectionModel().getSelectedItem() vraća selection.",
      "difficulty": "EASY",
      "options": [
        { "text": "Skrolabilnu listu stavki", "isCorrect": true },
        { "text": "Jedna kolona", "isCorrect": true },
        { "text": "Koristi ObservableList", "isCorrect": true },
        { "text": "Multiple stupaca", "isCorrect": false },
        { "text": "Ne podržava selection", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što SplitPane radi? (Odaberite sve točne)",
      "explanation": "SplitPane dijeli prostor između više node-ova s pomičnim dividerom. Korisnik može pomicati divider za resizing. Podržava horizontal i vertical orientation. setDividerPosition() postavlja poziciju (0.0-1.0). Više od 2 itema ima multiple dividere. ResizableWithParent kontrolira koji side raste.",
      "difficulty": "EASY",
      "options": [
        { "text": "Dijeli prostor s dividerom", "isCorrect": true },
        { "text": "Pomični divider", "isCorrect": true },
        { "text": "Podržava više node-ova", "isCorrect": true },
        { "text": "Fiksna pozicija bez pomicanja", "isCorrect": false },
        { "text": "Samo 2 node-a maksimalno", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ScrollPane radi? (Odaberite sve točne)",
      "explanation": "ScrollPane omogućava scrollanje sadržaja većeg od viewport-a. Podržava vertical i horizontal scroll barove. Policy: AS_NEEDED, ALWAYS, NEVER. setContent() postavlja scrollable content. setFitToWidth/Height prilagođava content. setPannable(true) omogućava drag scrolling. getViewportBounds() vraća visible area.",
      "difficulty": "EASY",
      "options": [
        { "text": "Omogućava scrollanje", "isCorrect": true },
        { "text": "Podržava scroll bar policy", "isCorrect": true },
        { "text": "setContent() postavlja content", "isCorrect": true },
        { "text": "Ne može imati veliku content", "isCorrect": false },
        { "text": "Uvijek prikazuje scrollbars", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Button kontrola predstavlja? (Odaberite sve točne)",
      "explanation": "Button je klasa za klikabilan gumb. Može imati tekst i/ili grafiku (ikonu). setOnAction() postavlja event handler. Podržava disabled stanje. Može biti default button (reagira na Enter) ili cancel button (reagira na Escape). fire() metoda programski trigera klik.",
      "difficulty": "EASY",
      "options": [
        { "text": "Klikabilan gumb", "isCorrect": true },
        { "text": "Može imati tekst i grafiku", "isCorrect": true },
        { "text": "setOnAction() za event", "isCorrect": true },
        { "text": "Ne može biti disabled", "isCorrect": false },
        { "text": "Samo tekst, bez grafike", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TextField omogućava? (Odaberite sve točne)",
      "explanation": "TextField je single-line text input kontrola. getText() dohvaća sadržaj, setText() postavlja. textProperty() omogućava binding. setPromptText() postavlja placeholder. Podržava input validation. Keyboard events se mogu handleati. prefColumnCount kontrolira preferiranu širinu.",
      "difficulty": "EASY",
      "options": [
        { "text": "Single-line text input", "isCorrect": true },
        { "text": "getText() i setText() metode", "isCorrect": true },
        { "text": "Podržava binding", "isCorrect": true },
        { "text": "Multi-line text", "isCorrect": false },
        { "text": "Ne može imati placeholder", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što CheckBox omogućava? (Odaberite sve točne)",
      "explanation": "CheckBox je kontrola za binary selection (checked/unchecked). isSelected() vraća state, setSelected() postavlja. Podržava indeterminate state (tri stanja). Može se grupirati ali svaki je independent. selectedProperty() omogućava binding. ActionEvent se triggera pri promjeni.",
      "difficulty": "EASY",
      "options": [
        { "text": "Binary selection", "isCorrect": true },
        { "text": "Checked/unchecked state", "isCorrect": true },
        { "text": "Podržava indeterminate", "isCorrect": true },
        { "text": "Samo jedan može biti checked", "isCorrect": false },
        { "text": "Ne može biti tri-state", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što RadioButton omogućava? (Odaberite sve točne)",
      "explanation": "RadioButton omogućava selection jedne opcije iz grupe. Mora biti u ToggleGroup-i za mutual exclusion. setToggleGroup() povezuje s grupom. Samo jedan u grupi može biti selected. selectedProperty() vraća Observable za binding. ToggleGroup.getSelectedToggle() dohvaća trenutni selection.",
      "difficulty": "EASY",
      "options": [
        { "text": "Selection jedne opcije", "isCorrect": true },
        { "text": "Koristi ToggleGroup", "isCorrect": true },
        { "text": "Mutual exclusion u grupi", "isCorrect": true },
        { "text": "Multiple selection", "isCorrect": false },
        { "text": "Ne treba grupu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što DatePicker omogućava? (Odaberite sve točne)",
      "explanation": "DatePicker omogućava odabir LocalDate vrijednosti. getValue() vraća odabrani datum (može biti null). Prikazuje calendar popup. setDayCellFactory() omogućava custom cell rendering (npr. disabled dates). Podržava custom date converter. valueProperty() za binding. Koristi java.time.LocalDate, ne java.util.Date.",
      "difficulty": "EASY",
      "options": [
        { "text": "Odabir LocalDate", "isCorrect": true },
        { "text": "Calendar popup", "isCorrect": true },
        { "text": "getValue() može biti null", "isCorrect": true },
        { "text": "Koristi java.util.Date", "isCorrect": false },
        { "text": "Ne može biti null", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ColorPicker omogućava? (Odaberite sve točne)",
      "explanation": "ColorPicker omogućava odabir Color objekta. Default je Color.WHITE. Prikazuje color palette dialog. getValue() vraća Color (javafx.scene.paint.Color). Podržava custom colors koje se spremaju. Color.web() parsira hex stringove. valueProperty() za binding.",
      "difficulty": "EASY",
      "options": [
        { "text": "Odabir boje", "isCorrect": true },
        { "text": "Vraća Color objekt", "isCorrect": true },
        { "text": "Default je WHITE", "isCorrect": true },
        { "text": "Vraća String hex", "isCorrect": false },
        { "text": "Ne podržava custom colors", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ProgressBar prikazuje? (Odaberite sve točne)",
      "explanation": "ProgressBar prikazuje napredak operacije. setProgress() prima vrijednost 0.0-1.0 (0-100%). INDETERMINATE_PROGRESS (-1.0) prikazuje spinning animaciju. Vrijednosti izvan raspona se clampuju (< 0 = 0, > 1 = 1). progressProperty() za binding. ProgressIndicator je base class (circular).",
      "difficulty": "EASY",
      "options": [
        { "text": "Napredak operacije", "isCorrect": true },
        { "text": "Vrijednost 0.0-1.0", "isCorrect": true },
        { "text": "Podržava indeterminate mode", "isCorrect": true },
        { "text": "Vrijednosti u pikselima", "isCorrect": false },
        { "text": "Ne može biti indeterminate", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Slider omogućava? (Odaberite sve točne)",
      "explanation": "Slider omogućava odabir numeričke vrijednosti pomicanjem. setMin/Max/Value postavljaju raspon i vrijednost. Podržava horizontal i vertical orientation. setShowTickLabels/Marks prikazuje oznake. setMajorTickUnit/MinorTickCount kontrolira tickove. valueProperty() za binding. valueChanging() pokazuje je li user još uvijek pomicanje.",
      "difficulty": "EASY",
      "options": [
        { "text": "Odabir numeričke vrijednosti", "isCorrect": true },
        { "text": "Pomicanje klizača", "isCorrect": true },
        { "text": "setMin/Max/Value metode", "isCorrect": true },
        { "text": "Samo za tekst", "isCorrect": false },
        { "text": "Ne može biti vertical", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Label prikazuje? (Odaberite sve točne)",
      "explanation": "Label prikazuje read-only tekst. Može imati grafiku (ikonu). setText() mijenja tekst, getText() čita. Podržava text wrapping. Može biti mnemonicParsing enabled za keyboard shortcuts. setWrapText(true) omogućava multi-line. Ne prima user input.",
      "difficulty": "EASY",
      "options": [
        { "text": "Read-only tekst", "isCorrect": true },
        { "text": "Može imati grafiku", "isCorrect": true },
        { "text": "Podržava text wrapping", "isCorrect": true },
        { "text": "User input kontrola", "isCorrect": false },
        { "text": "Samo za slike", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je PasswordField? (Odaberite sve točne)",
      "explanation": "PasswordField je TextField koji maskira input karaktere. Prikazuje bullet points ili asteriske umjesto stvarnih karaktera. getText() vraća actual password text. Sve TextField metode su dostupne. Nema built-in caps lock indicator. Nasljeđuje TextField.",
      "difficulty": "EASY",
      "options": [
        { "text": "TextField koji maskira input", "isCorrect": true },
        { "text": "Prikazuje bullets/asterisks", "isCorrect": true },
        { "text": "getText() vraća actual text", "isCorrect": true },
        { "text": "Ne može čitati tekst", "isCorrect": false },
        { "text": "Enkriptira tekst automatski", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koje su prednosti korištenja JavaFX? (Odaberite sve točne)",
      "explanation": "JavaFX prednosti: Scene Builder za vizualni dizajn, CSS styling za izgled, FXML za separation of concerns, moderna arhitektura s binding-om, hardware accelerated graphics, multithreading podrška, animacije i efekti, cross-platform compatibilnost, integracija s Java SE.",
      "difficulty": "EASY",
      "options": [
        { "text": "Scene Builder za vizualni dizajn", "isCorrect": true },
        { "text": "CSS styling", "isCorrect": true },
        { "text": "FXML separation", "isCorrect": true },
        { "text": "Samo za desktop aplikacije", "isCorrect": false },
        { "text": "Nema binding podrške", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Koja je razlika između AWT, Swing i JavaFX? (Odaberite sve točne)",
      "explanation": "AWT je prvi GUI toolkit (heavyweight components), Swing je lightweight swing components (maintenance mode od Java SE 7), JavaFX je moderni toolkit s boljim dizajnom, CSS supportom, FXML-om i Scene Builder-om. JavaFX je preporučen za nove aplikacije.",
      "difficulty": "EASY",
      "options": [
        { "text": "AWT = prvi toolkit", "isCorrect": true },
        { "text": "Swing = lightweight components", "isCorrect": true },
        { "text": "JavaFX = moderni toolkit", "isCorrect": true },
        { "text": "Svi su isti", "isCorrect": false },
        { "text": "Swing je preporučen za nove app", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je ToolBar? (Odaberite sve točne)",
      "explanation": "ToolBar prikazuje horizontalnu ili vertikalnu traku alata s kontrolama. Može sadržavati Button, ToggleButton, Separator i druge node-ove. setOrientation() mijenja smjer. Separator razdvaja grupe kontrola. ToolBar može biti 'floating' ili fixiran na poziciji.",
      "difficulty": "EASY",
      "options": [
        { "text": "Traka alata s kontrolama", "isCorrect": true },
        { "text": "Može biti horizontal/vertical", "isCorrect": true },
        { "text": "Može sadržavati Separator", "isCorrect": true },
        { "text": "Samo za MenuItem", "isCorrect": false },
        { "text": "Ne može imati Button", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Hyperlink omogućava? (Odaberite sve točne)",
      "explanation": "Hyperlink je kontrola nalik web linku. Prikazuje podvučeni tekst (obično plav). setOnAction() definira što se događa pri kliku. Može se disable-ati. setVisited(true) mijenja appearance u 'visited' state. Korisno za navigaciju i help links.",
      "difficulty": "EASY",
      "options": [
        { "text": "Klikabilan link", "isCorrect": true },
        { "text": "Podvučeni tekst", "isCorrect": true },
        { "text": "setOnAction() handler", "isCorrect": true },
        { "text": "Otvara URL automatski", "isCorrect": false },
        { "text": "Ne može se disable-ati", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je Separator? (Odaberite sve točne)",
      "explanation": "Separator je vizualna linija za razdvajanje UI elemenata. Podržava horizontal i vertical orientation. Koristi se u ToolBar, Menu i layoutima. Može imati custom stil putem CSS. Ne prima user input. Separator(Orientation.VERTICAL) kreira okomiti separator.",
      "difficulty": "EASY",
      "options": [
        { "text": "Vizualna razdjelnica", "isCorrect": true },
        { "text": "Horizontal/vertical orientation", "isCorrect": true },
        { "text": "Koristi se u ToolBar/Menu", "isCorrect": true },
        { "text": "User input kontrola", "isCorrect": false },
        { "text": "Samo u Menu", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je ChoiceBox? (Odaberite sve točne)",
      "explanation": "ChoiceBox je dropdown selection kontrola. Prikazuje listu opcija kada se klikne. getValue() vraća selected item. getItems() vraća ObservableList. Može biti single selection only. Slično kao ComboBox ali jednostavnije (ne omogućava typing).",
      "difficulty": "EASY",
      "options": [
        { "text": "Dropdown selection", "isCorrect": true },
        { "text": "getValue() za selection", "isCorrect": true },
        { "text": "Koristi ObservableList", "isCorrect": true },
        { "text": "Omogućava typing", "isCorrect": false },
        { "text": "Multiple selection", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je TextArea? (Odaberite sve točne)",
      "explanation": "TextArea je multi-line text input kontrola. Podržava text wrapping i scrolling. getText() i setText() kao TextField. appendText() dodaje text na kraj. prefRowCount i prefColumnCount kontroliraju veličinu. Podržava undo/redo. setWrapText(true) omogućava wrapping.",
      "difficulty": "EASY",
      "options": [
        { "text": "Multi-line text input", "isCorrect": true },
        { "text": "Podržava wrapping", "isCorrect": true },
        { "text": "Podržava scrolling", "isCorrect": true },
        { "text": "Single-line only", "isCorrect": false },
        { "text": "Ne može imati scroll", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ToggleButton omogućava? (Odaberite sve točne)",
      "explanation": "ToggleButton je button koji može biti selected/unselected. isSelected() vraća state. Može biti u ToggleGroup-i za mutual exclusion. Bez grupe, klik toggle-a state. selectedProperty() za binding. Koristi se za on/off state, formatting buttons (bold, italic).",
      "difficulty": "EASY",
      "options": [
        { "text": "Selected/unselected state", "isCorrect": true },
        { "text": "Može biti u ToggleGroup", "isCorrect": true },
        { "text": "Toggle state na klik", "isCorrect": true },
        { "text": "Ne može biti grouped", "isCorrect": false },
        { "text": "Samo single use", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TitledPane prikazuje? (Odaberite sve točne)",
      "explanation": "TitledPane je panel s naslovom koji se može expand/collapse. setText() postavlja title, setContent() postavlja content node. setCollapsible(false) onemogućava collapsing. Može postojati samostalno ili u Accordion-u. Expanded/collapsed state kontrolira isExpanded().",
      "difficulty": "EASY",
      "options": [
        { "text": "Panel s naslovom", "isCorrect": true },
        { "text": "Expand/collapse funkcionalnost", "isCorrect": true },
        { "text": "setText() za title", "isCorrect": true },
        { "text": "Ne može imati content", "isCorrect": false },
        { "text": "Uvijek collapsible", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ComboBox omogućava? (Odaberite sve točne)",
      "explanation": "ComboBox kombinira dropdown listu s text fieldom. Može biti editable (typing) ili non-editable (selection only). getValue() vraća selection. getItems() vraća ObservableList. setEditable(true) omogućava typing. Podržava custom cell factory.",
      "difficulty": "EASY",
      "options": [
        { "text": "Dropdown s optional typing", "isCorrect": true },
        { "text": "Može biti editable", "isCorrect": true },
        { "text": "getValue() za selection", "isCorrect": true },
        { "text": "Uvijek editable", "isCorrect": false },
        { "text": "Ne koristi ObservableList", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je StackPane? (Odaberite sve točne)",
      "explanation": "StackPane slaže child node-ove jedan preko drugog (z-order). Default alignment je CENTER. getChildren() vraća listu gdje zadnji element je top-most. Korisno za overlay-e, ikone preko slika, loading indicators. Može imati multiple children stacked.",
      "difficulty": "EASY",
      "options": [
        { "text": "Slaže node-ove jedan preko drugog", "isCorrect": true },
        { "text": "Default center alignment", "isCorrect": true },
        { "text": "Z-order stacking", "isCorrect": true },
        { "text": "Samo jedan child", "isCorrect": false },
        { "text": "Ne podržava alignment", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je AnchorPane? (Odaberite sve točne)",
      "explanation": "AnchorPane omogućava anchoranje child node-ova na rubove. setTopAnchor/BottomAnchor/LeftAnchor/RightAnchor postavljaju udaljenosti. Node ostaje na fiksnoj udaljenosti od ruba pri resizingu. Korisno za responsive layouts. Nasljeđuje Pane.",
      "difficulty": "EASY",
      "options": [
        { "text": "Anchoranje na rubove", "isCorrect": true },
        { "text": "setTopAnchor/BottomAnchor metode", "isCorrect": true },
        { "text": "Responsive layout", "isCorrect": true },
        { "text": "Samo center pozicioniranje", "isCorrect": false },
        { "text": "Ne podržava anchoring", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TilePane omogućava? (Odaberite sve točne)",
      "explanation": "TilePane raspoređuje child node-ove u uniform grid cells. Sve ćelije imaju istu veličinu. Podržava horizontal i vertical orientation. prefTileWidth/Height kontrolira cell veličinu. Automatski wrap na novi red/kolonu. Slično FlowPane ali s uniform cells.",
      "difficulty": "EASY",
      "options": [
        { "text": "Uniform grid cells", "isCorrect": true },
        { "text": "Sve ćelije iste veličine", "isCorrect": true },
        { "text": "Automatski wrap", "isCorrect": true },
        { "text": "Variable cell veličine", "isCorrect": false },
        { "text": "Ne podržava orientation", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je Group? (Odaberite sve točne)",
      "explanation": "Group je lightweight container bez layouta. Samo drži children u listi. Ne mijenja veličine ili pozicije children. Koristi se za transformacije na grupi node-ova. getChildren() je public. Ne nasljeđuje Region/Pane. Bounds su union svih children bounds.",
      "difficulty": "EASY",
      "options": [
        { "text": "Lightweight container", "isCorrect": true },
        { "text": "Ne provodi layout", "isCorrect": true },
        { "text": "Za grupiranje transformacija", "isCorrect": true },
        { "text": "Nasljeđuje Pane", "isCorrect": false },
        { "text": "Automatski layouta children", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Platform.runLater() radi? (Odaberite sve točne)",
      "explanation": "Platform.runLater() šalje Runnable na JavaFX Application Thread za izvršavanje. Koristi se za UI updates iz background thread-a. Dodaje u event queue. Izvršava se na sljedećem pulse. Omogućava thread-safe UI updates. runLater() pozivi se izvršavaju redom (FIFO).",
      "difficulty": "EASY",
      "options": [
        { "text": "Izvršava na JavaFX thread-u", "isCorrect": true },
        { "text": "Za UI updates iz background-a", "isCorrect": true },
        { "text": "FIFO red izvršavanja", "isCorrect": true },
        { "text": "Izvršava odmah", "isCorrect": false },
        { "text": "Ne koristi event queue", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je Scene Graph? (Odaberite sve točne)",
      "explanation": "Scene Graph je hijerarhija node-ova u Scene-u. Root node je na vrhu, children su ispod. Svaki node može imati svoje children (osim Leaf nodes). Graph se traversea za layout, rendering i event handling. Parent node-ovi kontroliraju children transforms i visibility.",
      "difficulty": "EASY",
      "options": [
        { "text": "Hijerarhija node-ova", "isCorrect": true },
        { "text": "Root na vrhu", "isCorrect": true },
        { "text": "Za layout i rendering", "isCorrect": true },
        { "text": "Flat struktura", "isCorrect": false },
        { "text": "Ne koristi hijerarhiju", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Node klasa predstavlja? (Odaberite sve točne)",
      "explanation": "Node je base class za sve Scene Graph elemente. Svaki UI element je Node. Definira zajedničke properties: id, style, transforms, event handlers. Node može biti u samo jednom Parent-u istovremeno. getParent() vraća trenutni parent ili null.",
      "difficulty": "EASY",
      "options": [
        { "text": "Base class za UI elemente", "isCorrect": true },
        { "text": "Definira zajedničke properties", "isCorrect": true },
        { "text": "Može biti u jednom Parent-u", "isCorrect": true },
        { "text": "Može biti u više Parent-a", "isCorrect": false },
        { "text": "Ne može imati transforms", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Parent klasa predstavlja? (Odaberite sve točne)",
      "explanation": "Parent je abstract base class za sve node-ove koji mogu imati children. getChildren() je protected. Subclase odlučuju da li eksponiraju children. Parent provodi layout svoje djece. Region i Pane nasljeđuju Parent. Group također nasljeđuje Parent.",
      "difficulty": "EASY",
      "options": [
        { "text": "Base za node-ove s children", "isCorrect": true },
        { "text": "getChildren() je protected", "isCorrect": true },
        { "text": "Provodi layout", "isCorrect": true },
        { "text": "Ne može imati children", "isCorrect": false },
        { "text": "getChildren() je uvijek public", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Region klasa predstavlja? (Odaberite sve točne)",
      "explanation": "Region je base class za layoute i kontrole. Nasljeđuje Parent. Ne eksponira getChildren() public-no. Dodaje CSS styling support, background, borders, padding. Ima preferredSize, minSize, maxSize properties. BorderPane i GridPane nasljeđuju Region.",
      "difficulty": "EASY",
      "options": [
        { "text": "Base za layoute i kontrole", "isCorrect": true },
        { "text": "Ne eksponira public getChildren()", "isCorrect": true },
        { "text": "Dodaje CSS support", "isCorrect": true },
        { "text": "Eksponira public getChildren()", "isCorrect": false },
        { "text": "Ne podržava CSS", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Pane klasa omogućava? (Odaberite sve točne)",
      "explanation": "Pane nasljeđuje Region i eksponira public getChildren(). Ne provodi layout - children su na fiksnim pozicijama. HBox, VBox, StackPane, FlowPane nasljeđuju Pane. Korisno kao base layout kada ne trebaš specifičan layout algoritam.",
      "difficulty": "EASY",
      "options": [
        { "text": "Eksponira public getChildren()", "isCorrect": true },
        { "text": "Ne provodi layout", "isCorrect": true },
        { "text": "Base za HBox/VBox/StackPane", "isCorrect": true },
        { "text": "Provodi automatic layout", "isCorrect": false },
        { "text": "Ne može imati children", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Control klasa predstavlja? (Odaberite sve točne)",
      "explanation": "Control je base class za UI kontrole (Button, TextField, Label). Nasljeđuje Region. Ima Skin za rendering. Podržava CSS pseudo-classes (:hover, :pressed, :focused). Ne eksponira getChildren(). Skin kontrolira visual appearance.",
      "difficulty": "EASY",
      "options": [
        { "text": "Base za UI kontrole", "isCorrect": true },
        { "text": "Ima Skin za rendering", "isCorrect": true },
        { "text": "Podržava CSS pseudo-classes", "isCorrect": true },
        { "text": "Eksponira getChildren()", "isCorrect": false },
        { "text": "Ne koristi CSS", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je Tooltip? (Odaberite sve točne)",
      "explanation": "Tooltip prikazuje hint tekst na hover. setTooltip() postavlja na bilo koji Control. Podržava tekst i grafiku. Install delay je konfigurabilan. Može imati custom styling. Tooltip.install() za non-Control node-ove. Automatski se prikazuje/skriva.",
      "difficulty": "EASY",
      "options": [
        { "text": "Hint tekst na hover", "isCorrect": true },
        { "text": "setTooltip() na Control", "isCorrect": true },
        { "text": "Može imati grafiku", "isCorrect": true },
        { "text": "Ne može se stilizirati", "isCorrect": false },
        { "text": "Samo na Button", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ContextMenu omogućava? (Odaberite sve točne)",
      "explanation": "ContextMenu je popup menu s MenuItem-ima. Prikazuje se na right-click (ili programski). setContextMenu() postavlja na Node. Može imati separatore i submenije. show() i hide() kontroliraju vidljivost. Automatski se pozicionira blizu kursora.",
      "difficulty": "EASY",
      "options": [
        { "text": "Popup menu", "isCorrect": true },
        { "text": "Right-click menu", "isCorrect": true },
        { "text": "Može imati MenuItem", "isCorrect": true },
        { "text": "Ne može imati separatore", "isCorrect": false },
        { "text": "Samo left-click", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ImageView prikazuje? (Odaberite sve točne)",
      "explanation": "ImageView prikazuje Image objekt. setImage() postavlja image. Podržava scaling i preserving aspect ratio. setFitWidth/Height kontrolira veličinu. Image se učitava iz file, URL, InputStream ili classpath. Može biti smooth scaling.",
      "difficulty": "EASY",
      "options": [
        { "text": "Prikazuje Image objekt", "isCorrect": true },
        { "text": "Podržava scaling", "isCorrect": true },
        { "text": "setFitWidth/Height metode", "isCorrect": true },
        { "text": "Ne može biti resizean", "isCorrect": false },
        { "text": "Samo PNG format", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što MediaView omogućava? (Odaberite sve točne)",
      "explanation": "MediaView prikazuje Media (video/audio). Media objekt se učitava iz MediaPlayer-a. Podržava playback kontrole. setMediaPlayer() povezuje s playerom. Može se resize-ati i aspect ratio preservation. Podržava različite video formate.",
      "difficulty": "EASY",
      "options": [
        { "text": "Prikazuje video/audio", "isCorrect": true },
        { "text": "Koristi MediaPlayer", "isCorrect": true },
        { "text": "Podržava resize", "isCorrect": true },
        { "text": "Ne može playback", "isCorrect": false },
        { "text": "Samo audio", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što WebView omogućava? (Odaberite sve točne)",
      "explanation": "WebView embedda WebEngine za HTML/CSS/JavaScript prikaz. getEngine() vraća WebEngine. load() učitava URL. loadContent() učitava HTML string. Podržava JavaScript execution. Može komunicirati s Java kodom. Koristi WebKit engine.",
      "difficulty": "EASY",
      "options": [
        { "text": "Embedda web content", "isCorrect": true },
        { "text": "Podržava HTML/CSS/JavaScript", "isCorrect": true },
        { "text": "Koristi WebKit", "isCorrect": true },
        { "text": "Ne podržava JavaScript", "isCorrect": false },
        { "text": "Samo statički HTML", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati?",
      "codeSnippet": "import javafx.application.Application;\nimport javafx.stage.Stage;\nimport javafx.scene.Scene;\nimport javafx.scene.layout.VBox;\nimport javafx.scene.control.Button;\n\npublic class MyApp extends Application {\n    public void start(Stage stage) {\n        VBox root = new VBox();\n        root.getChildren().add(new Button(\"Click\"));\n        stage.setScene(new Scene(root, 300, 200));\n        stage.show();\n    }\n}",
      "explanation": "Kod se neće kompilirati jer start() metoda nema @Override anotaciju ali to nije problem - pravi problem je što start() ne označava throws Exception ili ima try-catch. Međutim, u ovom slučaju kod se HOĆE kompilirati jer start() ne mora bacati exception. Primjer je potpuno validan JavaFX kod.",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se i radi normalno", "isCorrect": true },
        { "text": "Ne, nedostaje main metoda", "isCorrect": false },
        { "text": "Ne, VBox ne može biti root", "isCorrect": false },
        { "text": "Ne, Button ne može biti u VBox", "isCorrect": false },
        { "text": "Ne, mora imati @Override", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati?",
      "codeSnippet": "import javafx.scene.layout.HBox;\nimport javafx.scene.control.Label;\n\npublic class Test {\n    public void create() {\n        HBox box = new HBox(10);\n        box.getChildren().addAll(\n            new Label(\"A\"),\n            new Label(\"B\"),\n            new Label(\"C\")\n        );\n    }\n}",
      "explanation": "Kod se kompilira bez problema. HBox konstruktor prima spacing parametar. getChildren() vraća ObservableList koji ima addAll() metodu. Label objekti se mogu dodati u HBox. Kod kreira HBox s tri Label-a i spacing-om od 10 piksela između njih.",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, HBox(10) nije validan konstruktor", "isCorrect": false },
        { "text": "Ne, Label ne može biti u HBox", "isCorrect": false },
        { "text": "Ne, addAll() ne postoji", "isCorrect": false },
        { "text": "Ne, nedostaje spacing parametar", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati?",
      "codeSnippet": "import javafx.scene.control.Button;\nimport javafx.scene.layout.BorderPane;\n\npublic class BorderTest {\n    public BorderPane makeLayout() {\n        BorderPane pane = new BorderPane();\n        pane.setTop(new Button(\"Top\"));\n        pane.setCenter(new Button(\"Center\"));\n        return pane;\n    }\n}",
      "explanation": "Kod se kompilira bez problema. BorderPane metode setTop(), setCenter() itd. primaju Node parametre. Button nasljeđuje Node. BorderPane je validan return type. Kod kreira BorderPane s dva Button-a na TOP i CENTER pozicijama.",
      "difficulty": "EASY",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, Button ne može biti u BorderPane", "isCorrect": false },
        { "text": "Ne, setTop() ne prima Button", "isCorrect": false },
        { "text": "Ne, mora vratiti Node", "isCorrect": false },
        { "text": "Ne, mora biti void metoda", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što initialize() metoda radi u Controlleru? (Odaberite sve točne)",
      "explanation": "initialize() se automatski poziva nakon što FXMLLoader injektira sve @FXML polja. Poziva se PRIJE nego što je root node vraćen. Koristi se za setup (event listeners, initial data). Može primati URL i ResourceBundle parametre. Mora biti @FXML annotated.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Poziva se nakon injection", "isCorrect": true },
        { "text": "Prije vraćanja root node-a", "isCorrect": true },
        { "text": "Za initial setup", "isCorrect": true },
        { "text": "Poziva se prije injection", "isCorrect": false },
        { "text": "Ne mora biti @FXML", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što FXMLLoader.load() radi? (Odaberite sve točne)",
      "explanation": "FXMLLoader.load() parsira FXML i kreira Scene Graph. Instancira Controller s reflection. Injektira @FXML polja. Poziva initialize() metodu. Vraća root Parent node. Baca IOException za greške. URL parametar pokazuje na FXML resource.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Parsira FXML dokument", "isCorrect": true },
        { "text": "Kreira Scene Graph", "isCorrect": true },
        { "text": "Instancira Controller", "isCorrect": true },
        { "text": "Ne poziva initialize()", "isCorrect": false },
        { "text": "Vraća Stage objekt", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kada se Controller instancira? (Odaberite sve točne)",
      "explanation": "Controller se instancira tijekom FXMLLoader.load() poziva. Koristi se reflection (Class.newInstance() ili Constructor). Zato je potreban no-arg konstruktor. Može se koristiti custom ControllerFactory za dependency injection. setControllerFactory() postavlja custom factory. Svaki load() poziv kreira novu Controller instancu.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Tijekom FXMLLoader.load()", "isCorrect": true },
        { "text": "Koristi reflection", "isCorrect": true },
        { "text": "Potreban no-arg konstruktor", "isCorrect": true },
        { "text": "Prije parsiranja FXML-a", "isCorrect": false },
        { "text": "Automatski singleton", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što getClass().getResource() vraća? (Odaberite sve točne)",
      "explanation": "getResource() vraća URL za resource iz classpath-a. Vraća null ako resource ne postoji. Path je relativan prema calling class package-u. '/' prefix traži od root classpath-a. toExternalForm() konvertira URL u String. Resource mora biti u classpath-u (npr. src/main/resources).",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "URL za resource", "isCorrect": true },
        { "text": "null ako ne postoji", "isCorrect": true },
        { "text": "Relativan prema package-u", "isCorrect": true },
        { "text": "Baca exception ako ne postoji", "isCorrect": false },
        { "text": "Vraća String path", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa ako fx:id ne matchira @FXML polje? (Odaberite sve točne)",
      "explanation": "FXMLLoader ne baca exception odmah. Polje ostaje null jer se ne može injektirati. Element se i dalje kreira u UI-u. NullPointerException nastaje tek pri pokušaju korištenja polja. LoadException se baca samo za syntax errors. Ovo je silent failure što otežava debugging.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Polje ostaje null", "isCorrect": true },
        { "text": "NE baca exception odmah", "isCorrect": true },
        { "text": "Element se kreira u UI-u", "isCorrect": true },
        { "text": "Baca LoadException odmah", "isCorrect": false },
        { "text": "Aplikacija ne može startati", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što observableArrayList() radi? (Odaberite sve točne)",
      "explanation": "observableArrayList() kreira NOVU ObservableList i KOPIRA elemente iz source liste. Originalna lista i observable lista NE dijele podatke. Promjene u jednoj ne utječu na drugu. Za shared data koristiti observableList() koji wrappa. Kopija omogućava independent tracking.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Kreira novu listu", "isCorrect": true },
        { "text": "Kopira elemente", "isCorrect": true },
        { "text": "NE dijele podatke", "isCorrect": true },
        { "text": "Wrappa postojeću listu", "isCorrect": false },
        { "text": "Dijele iste podatke", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što observableList() radi? (Odaberite sve točne)",
      "explanation": "observableList() WRAPPA postojeću listu. Observable lista i source lista dijele ISTE podatke. Promjene se reflektiraju u obje. Wrapper dodaje change listening. Ne kopira elemente. Sync je automatski jer koriste istu backing storage.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Wrappa postojeću listu", "isCorrect": true },
        { "text": "Dijele iste podatke", "isCorrect": true },
        { "text": "Promjene se reflektiraju", "isCorrect": true },
        { "text": "Kreira novu kopiju", "isCorrect": false },
        { "text": "Ne dijele podatke", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što PropertyValueFactory traži u klasi? (Odaberite sve točne)",
      "explanation": "PropertyValueFactory traži: (1) getter metodu prema Bean konvenciji (getPropertyName), (2) property metodu (propertyNameProperty) koja vraća ObservableValue, (3) public field s tim imenom. Property metoda ima prioritet jer omogućava automatic updates. Case-sensitive search. Ime mora exact matchati.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Getter metodu (Bean konvencija)", "isCorrect": true },
        { "text": "Property metodu (ObservableValue)", "isCorrect": true },
        { "text": "Public field", "isCorrect": true },
        { "text": "Setter metodu", "isCorrect": false },
        { "text": "Case-insensitive search", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TableColumn.setCellValueFactory() prima? (Odaberite sve točne)",
      "explanation": "setCellValueFactory() prima Callback<CellDataFeatures, ObservableValue>. PropertyValueFactory je implementacija Callback-a. Custom callback omogućava kompleksnu logiku. CellDataFeatures sadrži row object. ObservableValue omogućava automatic cell updates. Lambda ili method reference također mogu biti used.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Callback interface", "isCorrect": true },
        { "text": "PropertyValueFactory je Callback", "isCorrect": true },
        { "text": "Vraća ObservableValue", "isCorrect": true },
        { "text": "Prima samo String", "isCorrect": false },
        { "text": "Ne podržava lambda", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Platform.exit() radi? (Odaberite sve točne)",
      "explanation": "Platform.exit() zatvara cijelu JavaFX aplikaciju. Poziva stop() lifecycle metodu. Zatvara Application Thread. Force quit bez mogućnosti cancela. Za pojedine prozore koristiti Stage.close(). System.exit() također zatvara ali preskače JavaFX cleanup. implicitExit property kontrolira automatic shutdown.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Zatvara cijelu aplikaciju", "isCorrect": true },
        { "text": "Poziva stop() metodu", "isCorrect": true },
        { "text": "Force quit bez cancela", "isCorrect": true },
        { "text": "Zatvara samo jedan Stage", "isCorrect": false },
        { "text": "Može se cancelirati", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Stage.close() radi? (Odaberite sve točne)",
      "explanation": "Stage.close() zatvara jedan Stage. Poziva onCloseRequest handler koji može cancelirati zatvaranje. Ako je primaryStage i implicitExit=true, zatvara aplikaciju. Ako nisu svi Stage-ovi zatvoreni, aplikacija nastavlja. Multiple stages mogu postojati istovremeno. close() ne poziva stop() osim ako je zadnji Stage.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Zatvara jedan Stage", "isCorrect": true },
        { "text": "Može se cancelirati", "isCorrect": true },
        { "text": "Poziva onCloseRequest", "isCorrect": true },
        { "text": "Uvijek zatvara aplikaciju", "isCorrect": false },
        { "text": "Ne može imati multiple stages", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što setOnCloseRequest() omogućava? (Odaberite sve točne)",
      "explanation": "setOnCloseRequest() postavlja handler za close event. Handler prima WindowEvent. event.consume() cancelira zatvaranje. Može prikazati 'Are you sure?' dialog. Poziva se prije close()-a. Ne poziva se za Platform.exit(). Koristi se za unsaved changes handling.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Handler za close event", "isCorrect": true },
        { "text": "event.consume() cancelira", "isCorrect": true },
        { "text": "Za 'Are you sure?' dialog", "isCorrect": true },
        { "text": "Poziva se za Platform.exit()", "isCorrect": false },
        { "text": "Ne može cancelirati", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što GridPane.setHgap() i setVgap() rade? (Odaberite sve točne)",
      "explanation": "setHgap() postavlja horizontal razmak između stupaca. setVgap() postavlja vertical razmak između redaka. Vrijednost je u pikselima. Može biti 0, pozitivna ili negativna. Negativne vrijednosti uzrokuju overlapping. Primjenjuje se na sve cells.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Horizontal razmak između stupaca", "isCorrect": true },
        { "text": "Vertical razmak između redaka", "isCorrect": true },
        { "text": "Mogu biti negativne", "isCorrect": true },
        { "text": "Samo pozitivne vrijednosti", "isCorrect": false },
        { "text": "Samo za prvi red/stupac", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ColumnConstraints omogućava? (Odaberite sve točne)",
      "explanation": "ColumnConstraints kontrolira stupac properties. Može postaviti min/pref/max width. setHgrow(Priority) kontrolira rastezanje. Priority.ALWAYS znači stupac uzima extra space. Priority.SOMETIMES raste samo ako postoji prostor. Priority.NEVER se ne mijenja. percentWidth postavlja width kao postotak.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Kontrolira width properties", "isCorrect": true },
        { "text": "setHgrow() za rastezanje", "isCorrect": true },
        { "text": "Priority.ALWAYS uzima extra space", "isCorrect": true },
        { "text": "Ne može biti percent", "isCorrect": false },
        { "text": "Samo fiksne vrijednosti", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što GridPane.setColumnSpan() radi? (Odaberite sve točne)",
      "explanation": "setColumnSpan() omogućava elementu da zauzme više stupaca. Static metoda na GridPane-u. Prima node i broj stupaca. Slično HTML colspan. rowSpan radi isto za retke. Element se proširuje preko multiple cells. Span mora biti pozitivan broj.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Element zauzima više stupaca", "isCorrect": true },
        { "text": "Static metoda na GridPane", "isCorrect": true },
        { "text": "Slično HTML colspan", "isCorrect": true },
        { "text": "Može biti negativan", "isCorrect": false },
        { "text": "Ne postoji rowSpan", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što GridPane.setHalignment() radi? (Odaberite sve točne)",
      "explanation": "setHalignment() postavlja horizontal alignment elementa u cell-u. Opcije: LEFT, CENTER, RIGHT. Static metoda na GridPane-u. Prima node i HPos. setValignment() radi isto za vertical (TOP, CENTER, BOTTOM). Alignment je unutar cell-a, ne globalno.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Horizontal alignment u cell-u", "isCorrect": true },
        { "text": "Opcije: LEFT, CENTER, RIGHT", "isCorrect": true },
        { "text": "Static metoda na GridPane", "isCorrect": true },
        { "text": "Globalni alignment", "isCorrect": false },
        { "text": "Ne postoji valignment", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što FlowPane.setAlignment() radi? (Odaberite sve točne)",
      "explanation": "setAlignment() kontrolira kako su djeca pozicionirana unutar FlowPane-a. Pos enum vrijednosti: TOP_LEFT, TOP_CENTER, TOP_RIGHT, CENTER_LEFT, CENTER, CENTER_RIGHT, BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT. Utječe na početnu poziciju flow-a. Default je TOP_LEFT.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Kontrolira pozicioniranje djece", "isCorrect": true },
        { "text": "Koristi Pos enum", "isCorrect": true },
        { "text": "Default je TOP_LEFT", "isCorrect": true },
        { "text": "Samo CENTER opcija", "isCorrect": false },
        { "text": "Ne utječe na flow", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što setOnAction() radi? (Odaberite sve točne)",
      "explanation": "setOnAction() postavlja ActionEvent handler na kontrolu. Prima EventHandler<ActionEvent> ili lambda. Poziva se pri user action (klik, Enter na Button). event objekt sadrži source i informacije. Jedan handler po kontroli. removeEventHandler() briše handler.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Postavlja ActionEvent handler", "isCorrect": true },
        { "text": "Prima lambda ili EventHandler", "isCorrect": true },
        { "text": "Poziva se pri user action", "isCorrect": true },
        { "text": "Multiple handlers po kontroli", "isCorrect": false },
        { "text": "Ne može se remove", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što event.getSource() vraća? (Odaberite sve točne)",
      "explanation": "getSource() vraća Object koji je generirao event. Cast na specifičan tip je potreban. Za ActionEvent, source je tipično Control. event.getTarget() vraća node na kojem je event nastao. Source i target mogu biti različiti zbog event bubbling.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Objekt koji je generirao event", "isCorrect": true },
        { "text": "Vraća Object (cast potreban)", "isCorrect": true },
        { "text": "Za ActionEvent tipično Control", "isCorrect": true },
        { "text": "Uvijek String", "isCorrect": false },
        { "text": "Isto kao getTarget()", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TabPane.getSelectionModel() omogućava? (Odaberite sve točne)",
      "explanation": "getSelectionModel() vraća SingleSelectionModel za TabPane. select(int) selektira tab po indeksu. selectFirst/Last/Next/Previous metode za navigaciju. getSelectedItem() vraća trenutni Tab ili null. getSelectedIndex() vraća indeks ili -1. selectedItemProperty() za binding.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Programska kontrola selekcije", "isCorrect": true },
        { "text": "select(int) selektira tab", "isCorrect": true },
        { "text": "getSelectedItem() vraća Tab", "isCorrect": true },
        { "text": "Ne može biti null", "isCorrect": false },
        { "text": "Multiple selection moguć", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Tab.setOnSelectionChanged() radi? (Odaberite sve točne)",
      "explanation": "setOnSelectionChanged() postavlja handler koji se poziva kad se tab selektira ili deselektira. Prima EventHandler<Event>. event ne sadrži old/new state - koristiti isSelected() na Tab-u. Poziva se samo za promjene selekcije. Različito od setOnClosed().",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Handler za selection promjene", "isCorrect": true },
        { "text": "Poziva se pri select/deselect", "isCorrect": true },
        { "text": "Prima EventHandler<Event>", "isCorrect": true },
        { "text": "Sadrži old/new state", "isCorrect": false },
        { "text": "Isto kao setOnClosed()", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Accordion.setExpandedPane() radi? (Odaberite sve točne)",
      "explanation": "setExpandedPane() programski proširuje TitledPane. Prima TitledPane objekt ili null. null zatvara sve pane-ove. Samo jedan može biti expanded. Klik na expanded pane ga zatvara. expandedPaneProperty() za binding. getExpandedPane() vraća trenutni ili null.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Programski proširuje TitledPane", "isCorrect": true },
        { "text": "null zatvara sve", "isCorrect": true },
        { "text": "Samo jedan expanded", "isCorrect": true },
        { "text": "Multiple expanded moguće", "isCorrect": false },
        { "text": "Ne može biti null", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TreeView.setShowRoot() radi? (Odaberite sve točne)",
      "explanation": "setShowRoot(false) skriva root node i prikazuje samo children. Root je još uvijek obavezan - TreeView mora imati root. Korisno za flat-looking hijerarhiju gdje ne želiš vidjeti top-level node. Default je true (root vidljiv). isShowRoot() vraća trenutni state.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Kontrolira vidljivost root-a", "isCorrect": true },
        { "text": "false skriva root, pokazuje children", "isCorrect": true },
        { "text": "Root je još uvijek obavezan", "isCorrect": true },
        { "text": "Briše root iz TreeView-a", "isCorrect": false },
        { "text": "Ne mora imati root", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TreeItem.setExpanded() radi? (Odaberite sve točne)",
      "explanation": "setExpanded(true) proširuje TreeItem i prikazuje children. setExpanded(false) kolapsa TreeItem. Samo za node-ove s children. expandedProperty() za binding. TreeView ima expanded event handlers. Expanded state se čuva na TreeItem-u, ne na TreeView-u.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Proširuje/kolapsa TreeItem", "isCorrect": true },
        { "text": "true prikazuje children", "isCorrect": true },
        { "text": "Samo za node-ove s children", "isCorrect": true },
        { "text": "State na TreeView-u", "isCorrect": false },
        { "text": "Ne radi za leaf node-ove", "isCorrect": true }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što SplitPane.setDividerPosition() radi? (Odaberite sve točne)",
      "explanation": "setDividerPosition(dividerIndex, position) postavlja poziciju dividera. dividerIndex je 0-based (SplitPane s 3 itema ima 2 dividera: indeksi 0 i 1). position je 0.0-1.0 (postotak prostora). getDividerPositions() vraća array svih pozicija. setDividerPositions() postavlja sve odjednom.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Postavlja poziciju dividera", "isCorrect": true },
        { "text": "position je 0.0-1.0 postotak", "isCorrect": true },
        { "text": "dividerIndex je 0-based", "isCorrect": true },
        { "text": "position je u pikselima", "isCorrect": false },
        { "text": "Samo jedan divider", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što SplitPane.setOrientation() radi? (Odaberite sve točne)",
      "explanation": "setOrientation() mijenja smjer split-a. Orientation.HORIZONTAL = lijevo-desno split (vertical divider). Orientation.VERTICAL = gore-dolje split (horizontal divider). Default je HORIZONTAL. getOrientation() vraća trenutni. Može se mijenjati u runtime-u.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Mijenja smjer split-a", "isCorrect": true },
        { "text": "HORIZONTAL = lijevo-desno", "isCorrect": true },
        { "text": "VERTICAL = gore-dolje", "isCorrect": true },
        { "text": "Ne može se mijenjati u runtime", "isCorrect": false },
        { "text": "HORIZONTAL = gore-dolje", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ScrollPane.setVbarPolicy() radi? (Odaberite sve točne)",
      "explanation": "setVbarPolicy() kontrolira vertical scrollbar policy. AS_NEEDED = prikazuje samo kad je potrebno. ALWAYS = uvijek prikazan. NEVER = nikad ne prikazuje. setHbarPolicy() radi isto za horizontal. Default je AS_NEEDED. getVbarPolicy() vraća trenutni.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Kontrolira vertical scrollbar", "isCorrect": true },
        { "text": "AS_NEEDED = samo kad treba", "isCorrect": true },
        { "text": "ALWAYS/NEVER opcije", "isCorrect": true },
        { "text": "Ne može biti NEVER", "isCorrect": false },
        { "text": "Samo AS_NEEDED", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ScrollPane.setFitToWidth() radi? (Odaberite sve točne)",
      "explanation": "setFitToWidth(true) prilagođava content width na viewport width. Ne dodaje horizontal scrollbar. Content se resize-a da fit. Koristi se za responsive layouts. setFitToHeight() radi isto za height. Default je false. Content mora podržavati resizing.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Prilagođava content width", "isCorrect": true },
        { "text": "Ne dodaje horizontal scrollbar", "isCorrect": true },
        { "text": "Content se resize-a", "isCorrect": true },
        { "text": "Dodaje scrollbar", "isCorrect": false },
        { "text": "Ne radi za height", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ScrollPane.setPannable() radi? (Odaberite sve točne)",
      "explanation": "setPannable(true) omogućava scroll-anje draganjem content-a. Korisnik može kliknuti i povući za scroll. Alternative za scrollbar korištenje. Slično touch/mobile panning. Default je false. Radi s mouse drag event-ima.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Omogućava scroll draganjem", "isCorrect": true },
        { "text": "Alternative za scrollbar", "isCorrect": true },
        { "text": "Slično mobile panning", "isCorrect": true },
        { "text": "Default je true", "isCorrect": false },
        { "text": "Ne radi s mouse-om", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ToggleGroup omogućava? (Odaberite sve točne)",
      "explanation": "ToggleGroup osigurava mutual exclusion za Toggle-e (RadioButton, ToggleButton). Samo jedan može biti selected. setToggleGroup() na svakom Toggle-u. getSelectedToggle() vraća trenutni selection ili null. selectToggle() programski selektira. clearSelection() deselektira sve.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Mutual exclusion za Toggle-e", "isCorrect": true },
        { "text": "Samo jedan selected", "isCorrect": true },
        { "text": "getSelectedToggle() vraća selection", "isCorrect": true },
        { "text": "Multiple selection moguć", "isCorrect": false },
        { "text": "Ne radi s RadioButton", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati?",
      "codeSnippet": "import javafx.scene.control.Alert;\nimport javafx.scene.control.Alert.AlertType;\nimport javafx.scene.control.ButtonType;\nimport java.util.Optional;\n\npublic class AlertTest {\n    public void show() {\n        Alert alert = new Alert(AlertType.CONFIRMATION);\n        alert.setTitle(\"Confirm\");\n        alert.setContentText(\"Are you sure?\");\n        Optional<ButtonType> result = alert.showAndWait();\n        if (result.isPresent() && result.get() == ButtonType.OK) {\n            System.out.println(\"OK clicked\");\n        }\n    }\n}",
      "explanation": "Kod se kompilira bez problema. Alert konstruktor prima AlertType. showAndWait() vraća Optional<ButtonType>. result.isPresent() provjerava je li odgovorio. result.get() vraća ButtonType. Usporedba s ButtonType.OK je validna. Kod demonstrira standardan pattern za handling Alert rezultata.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, showAndWait() ne vraća Optional", "isCorrect": false },
        { "text": "Ne, ButtonType.OK ne postoji", "isCorrect": false },
        { "text": "Ne, result.get() nije validan", "isCorrect": false },
        { "text": "Ne, AlertType.CONFIRMATION ne postoji", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati?",
      "codeSnippet": "import javafx.scene.control.TableView;\nimport javafx.scene.control.TableColumn;\nimport javafx.scene.control.cell.PropertyValueFactory;\nimport javafx.collections.FXCollections;\n\nclass Person {\n    private String name;\n    public String getName() { return name; }\n}\n\npublic class TableTest {\n    public TableView<Person> create() {\n        TableView<Person> table = new TableView<>();\n        TableColumn<Person, String> col = new TableColumn<>(\"Name\");\n        col.setCellValueFactory(new PropertyValueFactory<>(\"name\"));\n        table.getColumns().add(col);\n        table.setItems(FXCollections.observableArrayList());\n        return table;\n    }\n}",
      "explanation": "Kod se kompilira bez problema. Person klasa ima getName() getter. PropertyValueFactory prima 'name' string koji matchira property. TableColumn je generički s Person i String tipovima. observableArrayList() kreira praznu listu. table.getColumns() vraća ObservableList na koji se može addati column.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, PropertyValueFactory ne prima String", "isCorrect": false },
        { "text": "Ne, Person mora implementirati interface", "isCorrect": false },
        { "text": "Ne, getColumns() ne postoji", "isCorrect": false },
        { "text": "Ne, generički tipovi nisu validni", "isCorrect": false }
      ]
    },
    {
      "type": "CODE_WILL_COMPILE",
      "prompt": "Hoće li se sljedeći kod kompilirati?",
      "codeSnippet": "import javafx.scene.control.MenuBar;\nimport javafx.scene.control.Menu;\nimport javafx.scene.control.MenuItem;\n\npublic class MenuTest {\n    public MenuBar create() {\n        MenuItem item1 = new MenuItem(\"New\");\n        MenuItem item2 = new MenuItem(\"Open\");\n        Menu menu = new Menu(\"File\");\n        menu.getItems().addAll(item1, item2);\n        MenuBar bar = new MenuBar();\n        bar.getMenus().add(menu);\n        return bar;\n    }\n}",
      "explanation": "Kod se kompilira bez problema. MenuItem se dodaje u Menu s getItems().addAll(). Menu se dodaje u MenuBar s getMenus().add(). Hijerarhija je ispravna: MenuBar → Menu → MenuItem. Svi objekti su ispravno kreirani. Return type MenuBar je validan.",
      "difficulty": "MEDIUM",
      "options": [
        { "text": "Da, kompilira se", "isCorrect": true },
        { "text": "Ne, MenuItem ne može biti u Menu", "isCorrect": false },
        { "text": "Ne, Menu ne može biti u MenuBar", "isCorrect": false },
        { "text": "Ne, getItems() ne postoji", "isCorrect": false },
        { "text": "Ne, addAll() ne prima MenuItem", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa ako postavite BorderPane.setTop() dva puta? (Odaberite sve točne)",
      "explanation": "Drugi setTop() poziv ZAMJENJUJE prvi node. BorderPane pozicija može imati samo jedan node istovremeno. Prvi node se automatski uklanja iz Scene Graph-a. Za više node-ova u TOP koristiti container (HBox, VBox). set*() s null uklanja node s pozicije.",
      "difficulty": "HARD",
      "options": [
        { "text": "Drugi poziv zamjenjuje prvi", "isCorrect": true },
        { "text": "Samo jedan node po poziciji", "isCorrect": true },
        { "text": "Prvi se automatski uklanja", "isCorrect": true },
        { "text": "Oba node-a ostaju", "isCorrect": false },
        { "text": "Baca IllegalStateException", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Može li GridPane imati negativne row/column indekse? (Odaberite sve točne)",
      "explanation": "GridPane DOZVOLJAVA negativne indekse! Row i column mogu biti bilo koji int. GridPane automatski proširuje grid u svim smjerovima. (0,0) je origin ali ne mora biti lijevi gornji kut. Negativni indeksi postavljaju elemente 'lijevo/iznad' nule. getColumnIndex/getRowIndex mogu vratiti negativne vrijednosti.",
      "difficulty": "HARD",
      "options": [
        { "text": "DA, dozvoljeni su negativni indeksi", "isCorrect": true },
        { "text": "Grid se proširuje u svim smjerovima", "isCorrect": true },
        { "text": "(0,0) ne mora biti lijevi gornji", "isCorrect": true },
        { "text": "NE, baca IllegalArgumentException", "isCorrect": false },
        { "text": "Samo pozitivni indeksi", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što je razlika između Region.getChildren() i Pane.getChildren()? (Odaberite sve točne)",
      "explanation": "Region ima getChildren() ali je PROTECTED - nije javno dostupan. Pane OVERRIDE-a getChildren() kao PUBLIC metodu. BorderPane i GridPane nasljeđuju Region pa NE eksponiraju getChildren(). HBox, VBox, StackPane nasljeđuju Pane pa IMAJU public getChildren(). Za Region koristiti getChildrenUnmodifiable().",
      "difficulty": "HARD",
      "options": [
        { "text": "Region: protected getChildren()", "isCorrect": true },
        { "text": "Pane: public getChildren()", "isCorrect": true },
        { "text": "BorderPane nema public getChildren()", "isCorrect": true },
        { "text": "Region eksponira public", "isCorrect": false },
        { "text": "Pane ne nasljeđuje Region", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa s FlowPane spacing-om ako je negativan? (Odaberite sve točne)",
      "explanation": "FlowPane DOZVOLJAVA negativan spacing! Elementi se PREKLAPAJU za negativne vrijednosti. setHgap(-5) i setVgap(-5) su validni. Negativan spacing je koristin za overlapping effects i compact layouts. Alignment i dalje radi normalno. Default spacing je 0.",
      "difficulty": "HARD",
      "options": [
        { "text": "Dozvoljava negativan spacing", "isCorrect": true },
        { "text": "Elementi se preklapaju", "isCorrect": true },
        { "text": "Korisno za overlapping effects", "isCorrect": true },
        { "text": "Baca IllegalArgumentException", "isCorrect": false },
        { "text": "Automatski konvertira u 0", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TableView.getItems() vraća ako nije postavljen setItems()? (Odaberite sve točne)",
      "explanation": "TableView ima DEFAULT PRAZAN ObservableList! getItems() NIKAD ne vraća null - vraća FXCollections.emptyObservableList(). Default list je UNMODIFIABLE - add() baca UnsupportedOperationException. Za modificiranje mora se setItems() s modifiable listom. PlaceholderNode se prikazuje za prazne table.",
      "difficulty": "HARD",
      "options": [
        { "text": "Vraća prazan ObservableList", "isCorrect": true },
        { "text": "NIKAD ne vraća null", "isCorrect": true },
        { "text": "Default list je unmodifiable", "isCorrect": true },
        { "text": "Vraća null", "isCorrect": false },
        { "text": "Baca NullPointerException", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa ako fx:controller klasa nema no-arg konstruktor? (Odaberite sve točne)",
      "explanation": "FXMLLoader će baciti InstantiationException u runtime-u! Controller mora imati no-arg konstruktor (public ili package-private). FXMLLoader koristi reflection (Constructor.newInstance()). Rješenje: (1) dodati prazan konstruktor, (2) koristiti setControllerFactory() za custom instantiation, (3) dependency injection framework.",
      "difficulty": "HARD",
      "options": [
        { "text": "Baca InstantiationException", "isCorrect": true },
        { "text": "Mora imati no-arg konstruktor", "isCorrect": true },
        { "text": "Koristi reflection", "isCorrect": true },
        { "text": "Automatski kreira konstruktor", "isCorrect": false },
        { "text": "Ne mora imati konstruktor", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što se događa ako Application.launch() pozovete VIŠE PUTA? (Odaberite sve točne)",
      "explanation": "launch() može se pozvati SAMO JEDNOM po JVM procesu! Drugi poziv baca IllegalStateException. launch() pokreće JavaFX Application Thread koji može postojati samo jednom. Za ponovno pokretanje mora se kreirati NOVI JVM proces. launch() je BLOCKING - vraća kontrolu tek pri zatvaranju.",
      "difficulty": "HARD",
      "options": [
        { "text": "Baca IllegalStateException", "isCorrect": true },
        { "text": "Može se pozvati samo jednom", "isCorrect": true },
        { "text": "Za ponovno pokretanje novi JVM", "isCorrect": true },
        { "text": "Kreira novi Stage", "isCorrect": false },
        { "text": "Resetira aplikaciju", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Platform.runLater() odgađa izvršavanje? (Odaberite sve točne)",
      "explanation": "runLater() ODGAĐA izvršavanje na SLJEDEĆI JavaFX pulse! Dodaje Runnable u JavaFX event queue. Izvršava se NAKON što trenutna metoda završi. Redoslijed runLater() poziva je GARANTIRAN (FIFO). Pulse = JavaFX render cycle (~60 FPS). Koristi se za UI updates iz background thread-a.",
      "difficulty": "HARD",
      "options": [
        { "text": "Odgađa na sljedeći pulse", "isCorrect": true },
        { "text": "Dodaje u event queue", "isCorrect": true },
        { "text": "FIFO redoslijed", "isCorrect": true },
        { "text": "Izvršava odmah", "isCorrect": false },
        { "text": "Ne koristi queue", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Je li PropertyValueFactory case-sensitive? (Odaberite sve točne)",
      "explanation": "PropertyValueFactory JE case-sensitive! Mora exact matchati property ime. 'firstName' traži getFirstName() ili firstNameProperty(). 'FirstName' NE radi jer traži getFirstName() ali property mora biti 'firstName'. Java Bean konvencije: propertyName → getPropertyName(). Za custom logic koristiti Callback.",
      "difficulty": "HARD",
      "options": [
        { "text": "DA, case-sensitive je", "isCorrect": true },
        { "text": "Mora exact matchati ime", "isCorrect": true },
        { "text": "Java Bean konvencije", "isCorrect": true },
        { "text": "NE, case-insensitive", "isCorrect": false },
        { "text": "Sve varijante rade", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što DatePicker.getValue() vraća po defaultu? (Odaberite sve točne)",
      "explanation": "DatePicker no-arg konstruktor postavlja getValue() na NULL! Nije postavljen datum po defaultu. setValue(null) također je validan - uklanja odabrani datum. DatePicker prikazuje prazan field za null. setPromptText() postavlja placeholder. Koristi LocalDate, NE java.util.Date.",
      "difficulty": "HARD",
      "options": [
        { "text": "null po defaultu", "isCorrect": true },
        { "text": "setValue(null) je validan", "isCorrect": true },
        { "text": "Koristi LocalDate", "isCorrect": true },
        { "text": "Današnji datum", "isCorrect": false },
        { "text": "Ne može biti null", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ColorPicker.getValue() vraća po defaultu? (Odaberite sve točne)",
      "explanation": "ColorPicker po defaultu vraća Color.WHITE! No-arg konstruktor postavlja bijelu boju. getValue() vraća Color objekt, NE String. Color je immutable - rgba vrijednosti. Color.web('#FF0000') parsira hex. getCustomColors() vraća ObservableList<Color>.",
      "difficulty": "HARD",
      "options": [
        { "text": "Color.WHITE", "isCorrect": true },
        { "text": "Vraća Color objekt", "isCorrect": true },
        { "text": "Color je immutable", "isCorrect": true },
        { "text": "Color.BLACK", "isCorrect": false },
        { "text": "Vraća String hex", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što ProgressBar.setProgress() radi s vrijednostima izvan 0-1? (Odaberite sve točne)",
      "explanation": "ProgressBar CLAMPUJE vrijednosti! < 0 postaje 0, > 1 postaje 1. Validan range: 0.0-1.0 (0-100%). INDETERMINATE_PROGRESS (-1.0) je specijalni za spinning animaciju. Default progress je 0.0. ProgressIndicator je base class (circular).",
      "difficulty": "HARD",
      "options": [
        { "text": "Clampuje na 0-1 range", "isCorrect": true },
        { "text": "< 0 postaje 0", "isCorrect": true },
        { "text": "> 1 postaje 1", "isCorrect": true },
        { "text": "Baca IllegalArgumentException", "isCorrect": false },
        { "text": "Prima bilo koju vrijednost", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Alert.showAndWait() vraća? (Odaberite sve točne)",
      "explanation": "showAndWait() vraća Optional<ButtonType>! Je BLOCKING - čeka korisnikov odgovor. Optional.empty() ako je zatvoren bez klika (X ili ESC). Optional.get() vraća ButtonType - mora provjeriti isPresent()! show() je NON-BLOCKING alternativa. Mora biti na JavaFX thread-u.",
      "difficulty": "HARD",
      "options": [
        { "text": "Optional<ButtonType>", "isCorrect": true },
        { "text": "Je BLOCKING", "isCorrect": true },
        { "text": "empty() za X/ESC", "isCorrect": true },
        { "text": "Vraća boolean", "isCorrect": false },
        { "text": "Vraća null za cancel", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Može li MenuItem biti direktno u MenuBar? (Odaberite sve točne)",
      "explanation": "NE, MenuBar.getMenus() vraća ObservableList<Menu>! MenuItem se mora dodati u Menu, zatim Menu u MenuBar. Hijerarhija: MenuBar → Menu → MenuItem. Menu je container, MenuItem je akcija. MenuBar je samo top-level container.",
      "difficulty": "HARD",
      "options": [
        { "text": "NE, mora biti u Menu", "isCorrect": true },
        { "text": "MenuBar prima samo Menu", "isCorrect": true },
        { "text": "Hijerarhija: MenuBar→Menu→MenuItem", "isCorrect": true },
        { "text": "DA, direktno se dodaje", "isCorrect": false },
        { "text": "MenuItem je top-level", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kada se ToggleButton automatski deselektira u ToggleGroup? (Odaberite sve točne)",
      "explanation": "ToggleButton u ToggleGroup se deselektira kada se DRUGI button selektira! Klik na selektirani button ga NE deselektira (mutual exclusion). Za deselect mora se kliknuti drugi ili pozvati setSelected(false). Bez grupe: klik toggle-a state. clearSelection() na grupi deselektira sve.",
      "difficulty": "HARD",
      "options": [
        { "text": "Kad se drugi selektira", "isCorrect": true },
        { "text": "Klik na selected NE deselektira", "isCorrect": true },
        { "text": "Mutual exclusion behaviour", "isCorrect": true },
        { "text": "Automatski nakon 2 sekunde", "isCorrect": false },
        { "text": "Svaki klik deselektira", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što TabPane.getSelectionModel().getSelectedItem() vraća bez tab-ova? (Odaberite sve točne)",
      "explanation": "Vraća NULL! Prazan TabPane nema selected tab-a. getSelectedIndex() vraća -1 (no selection). Dodavanje prvog tab-a ga automatski selektira. SelectionModel omogućava programsku kontrolu. Tab.setClosable(false) sprječava zatvaranje.",
      "difficulty": "HARD",
      "options": [
        { "text": "Vraća null", "isCorrect": true },
        { "text": "getSelectedIndex() vraća -1", "isCorrect": true },
        { "text": "Prvi tab automatski selected", "isCorrect": true },
        { "text": "Baca IndexOutOfBoundsException", "isCorrect": false },
        { "text": "Vraća prazan Tab", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što Accordion.setExpandedPane(null) radi? (Odaberite sve točne)",
      "explanation": "setExpandedPane(null) ZATVARA sve TitledPane-ove! Accordion dozvoljava null expanded pane. getExpandedPane() vraća null ako su svi zatvoreni. Korisnik može toggle expanded pane. TitledPane.setCollapsible(false) sprječava zatvaranje.",
      "difficulty": "HARD",
      "options": [
        { "text": "Zatvara sve pane-ove", "isCorrect": true },
        { "text": "null je validan", "isCorrect": true },
        { "text": "getExpandedPane() vraća null", "isCorrect": true },
        { "text": "Baca NullPointerException", "isCorrect": false },
        { "text": "Ne može biti null", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Je li TreeView root vidljiv po defaultu? (Odaberite sve točne)",
      "explanation": "DA, TreeView PO DEFAULTU prikazuje root! isShowRoot() vraća true. setShowRoot(false) skriva root - prikazuje samo children. Root je OBAVEZAN čak i kad je skriven! TreeItem.setExpanded(true) za expanding. getRoot() vraća null ako nije postavljen.",
      "difficulty": "HARD",
      "options": [
        { "text": "DA, default prikazuje root", "isCorrect": true },
        { "text": "isShowRoot() vraća true", "isCorrect": true },
        { "text": "Root obavezan čak i skriven", "isCorrect": true },
        { "text": "NE, default skriva root", "isCorrect": false },
        { "text": "Root nije obavezan", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Što SplitPane.setDividerPosition() prima? (Odaberite sve točne)",
      "explanation": "Prima (dividerIndex, position)! dividerIndex je 0-based int. position je double 0.0-1.0 (postotak). 3 itema = 2 dividera (indeksi 0 i 1). getDividerPositions() vraća double[]. setDividerPositions(double...) postavlja sve.",
      "difficulty": "HARD",
      "options": [
        { "text": "dividerIndex (int)", "isCorrect": true },
        { "text": "position (double 0.0-1.0)", "isCorrect": true },
        { "text": "3 itema = 2 dividera", "isCorrect": true },
        { "text": "position u pikselima", "isCorrect": false },
        { "text": "Samo jedan divider", "isCorrect": false }
      ]
    },
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "Kada ScrollPane prikazuje scrollbar-ove po defaultu? (Odaberite sve točne)",
      "explanation": "Default policy je AS_NEEDED! Prikazuje scrollbar samo kad je content veći od viewport-a. ALWAYS = uvijek prikazuje. NEVER = nikad ne prikazuje. setVbarPolicy/HbarPolicy kontroliraju vertical/horizontal. setFitToWidth/Height prilagođava content.",
      "difficulty": "HARD",
      "options": [
        { "text": "AS_NEEDED je default", "isCorrect": true },
        { "text": "Samo kad je content veći", "isCorrect": true },
        { "text": "ALWAYS/NEVER opcije", "isCorrect": true },
        { "text": "Uvijek prikazuje", "isCorrect": false },
        { "text": "Nikad ne prikazuje", "isCorrect": false }
      ]
    }
  ]
}
