import { QuestionType, Difficulty } from '@prisma/client'
import { createCompileOptions, createShuffledOptions } from './seed-utils'

export const javaBasicsQuestions = {
  lectureSlug: 'java-basics',
  questions: [
    // Tipovi podataka
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koliko bajtova zauzima int tip podataka u Javi?',
      explanation: 'int tip u Javi je 32-bitni (4 bajta) signed integer. Raspon: -2,147,483,648 do 2,147,483,647.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: '4 bajta', isCorrect: true },
        { text: '2 bajta', isCorrect: false },
        { text: '8 bajtova', isCorrect: false },
        { text: '1 bajt', isCorrect: false },
      ],
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koji su primitivni tipovi podataka u Javi?',
      explanation: 'Java ima 8 primitivnih tipova: byte, short, int, long (cijeli brojevi), float, double (decimalni brojevi), boolean (true/false), char (znak). Svi ostali su referentni tipovi.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'int', isCorrect: true },
        { text: 'boolean', isCorrect: true },
        { text: 'char', isCorrect: true },
        { text: 'String', isCorrect: false },
      ],
    },
    {
      type: 'TRUE_FALSE' as QuestionType,
      prompt: 'String je primitivni tip podataka u Javi.',
      explanation: 'FALSE. String je referentni tip (klasa), ne primitivni. Primitivni tipovi su: byte, short, int, long, float, double, boolean, char.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: true },
      ],
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        byte b = 128;
        System.out.println(b);
    }
}`,
      explanation: 'Kod se neće kompilirati jer 128 je izvan raspona byte tipa (-128 do 127). Compile-time greška: possible loss of precision. Trebao bi cast: byte b = (byte) 128, ali to bi dalo -128 zbog overflow-a.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koja je defaultna vrijednost za boolean polje u klasi?',
      explanation: 'Defaultna vrijednost boolean polja je false. Za lokalne varijable nema defaultne vrijednosti - moraju se eksplicitno inicijalizirati.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'false', isCorrect: true },
        { text: 'true', isCorrect: false },
        { text: 'null', isCorrect: false },
        { text: '0', isCorrect: false },
      ],
    },

    // Petlje
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeća for petlja?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
    }
}`,
      explanation: 'Ispisat će "0 1 2 3 4 ". Petlja počinje s i=0, nastavlja dok je i < 5, povećava i za 1 svaki put. Ispisuje brojeve od 0 do 4.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '0 1 2 3 4 ', isCorrect: true },
        { text: '1 2 3 4 5 ', isCorrect: false },
        { text: '0 1 2 3 4 5 ', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeća enhanced for petlja?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30};
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}`,
      explanation: 'Ispisat će "10 20 30 ". Enhanced for (for-each) iterira kroz sve elemente niza. Čitljivija alternativa klasičnoj for petlji za iteraciju.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '10 20 30 ', isCorrect: true },
        { text: '1 2 3 ', isCorrect: false },
        { text: '0 1 2 ', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koja je razlika između while i do-while petlje?',
      explanation: 'do-while izvršava blok koda barem jednom prije provjere uvjeta, while prvo provjerava uvjet pa izvršava. do-while garantira barem jedno izvršavanje.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'do-while izvršava barem jednom, while može i 0 puta', isCorrect: true },
        { text: 'while je brži od do-while', isCorrect: false },
        { text: 'Nema razlike, samo sintaksa', isCorrect: false },
        { text: 'do-while ne može imati break', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod s break?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            if (i == 5) {
                break;
            }
            System.out.print(i + " ");
        }
    }
}`,
      explanation: 'Ispisat će "0 1 2 3 4 ". break izlazi iz petlje kada i dosegne 5. Brojevi od 0 do 4 se ispisuju, ali ne i 5.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '0 1 2 3 4 ', isCorrect: true },
        { text: '0 1 2 3 4 5 ', isCorrect: false },
        { text: '1 2 3 4 5 ', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod s continue?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            if (i == 2) {
                continue;
            }
            System.out.print(i + " ");
        }
    }
}`,
      explanation: 'Ispisat će "0 1 3 4 ". continue preskače ostatak tijela petlje za trenutnu iteraciju. Kada i == 2, preskače println() i nastavlja na i = 3.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '0 1 3 4 ', isCorrect: true },
        { text: '0 1 2 3 4 ', isCorrect: false },
        { text: '0 1 4 ', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },

    // Scope
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int x = 5;
        {
            int x = 10;
            System.out.println(x);
        }
    }
}`,
      explanation: 'Kod se neće kompilirati jer pokušava deklarirati varijablu x koja već postoji u vanjskom scope-u. Ne može se imati dvije varijable istog imena u istom ili ugniježđenom scope-u. Compile-time greška: variable x is already defined.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        if (true) {
            int x = 5;
        }
        System.out.println(x);
    }
}`,
      explanation: 'Kod se neće kompilirati jer varijabla x je deklarirana u block scope (if blok) i nije dostupna izvan njega. Compile-time greška: cannot find symbol x.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što je shadowing varijabli?',
      explanation: 'Shadowing se događa kada lokalna varijabla ima isto ime kao polje instance. Lokalna varijabla "zasijenjuje" polje u svojem scope-u. Koristi se this.variableName za pristup polju.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'Lokalna varijabla skriva polje instance istog imena', isCorrect: true },
        { text: 'Brisanje varijabli iz memorije', isCorrect: false },
        { text: 'Skrivanje static varijabli', isCorrect: false },
        { text: 'Greška pri kompilaciji', isCorrect: false },
      ],
    },

    // switch
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći switch statement?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int day = 2;
        switch (day) {
            case 1:
                System.out.println("Monday");
            case 2:
                System.out.println("Tuesday");
            case 3:
                System.out.println("Wednesday");
            default:
                System.out.println("Other");
        }
    }
}`,
      explanation: 'Ispisat će "Tuesday", "Wednesday", "Other". Bez break-a, izvršavanje "pada kroz" (fall-through) sve case-ove nakon prvog matchanja. Ovo je često bug - trebaju break statement-i.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'Tuesday, Wednesday, Other', isCorrect: true },
        { text: 'Tuesday', isCorrect: false },
        { text: 'Monday, Tuesday', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći switch expression (Java 12+)?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int day = 2;
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            default -> "Other";
        };
        System.out.println(dayName);
    }
}`,
      explanation: 'Kod će se kompilirati uspješno (Java 12+) i ispisati "Tuesday". Switch expression s arrow sintaksom -> automatski dodaje break i vraća vrijednost. Moderniji i čitljiviji način.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'Tuesday', isCorrect: true },
        { text: 'Tuesday, Wednesday, Other', isCorrect: false },
        { text: 'Monday', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koji tipovi podataka mogu se koristiti u switch statement-u?',
      explanation: 'Switch podržava: byte, short, int, char (primitivni), String (Java 7+), enum tipovi, i njihovi wrapper tipovi (Byte, Short, Integer, Character). Ne podržava long, float, double, boolean.',
      difficulty: 'MEDIUM' as Difficulty,
      options: [
        { text: 'int', isCorrect: true },
        { text: 'String (Java 7+)', isCorrect: true },
        { text: 'enum', isCorrect: true },
        { text: 'double', isCorrect: false },
      ],
    },

    // Operatori
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će vratiti izraz: 10 % 3?',
      explanation: '10 % 3 vraća 1. Modulo operator (%) vraća ostatak dijeljenja. 10 ÷ 3 = 3 ostatak 1.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: '1', isCorrect: true },
        { text: '3', isCorrect: false },
        { text: '0', isCorrect: false },
        { text: '3.33', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod s operatorima?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int a = 5;
        int b = 10;
        int c = a++ + ++b;
        System.out.println(c);
    }
}`,
      explanation: 'Ispisat će "16". a++ koristi 5 pa inkrementira a na 6. ++b inkrementira b na 11 pa koristi 11. Zbroj: 5 + 11 = 16.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: '16', isCorrect: true },
        { text: '15', isCorrect: false },
        { text: '17', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što radi compound assignment operator += ?',
      explanation: 'x += 5 je ekvivalentno x = x + 5. Compound assignment operatori (+=, -=, *=, /=, %=) kombiniraju operaciju s dodjeljivanjem i automatski castaju rezultat.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Zbraja i dodjeljuje: x = x + value', isCorrect: true },
        { text: 'Samo zbraja vrijednosti', isCorrect: false },
        { text: 'Uspoređuje dvije vrijednosti', isCorrect: false },
        { text: 'Inkrementira varijablu', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod s bitovnim operatorima?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int x = 5;  // 0101 u binarnom
        int y = 3;  // 0011 u binarnom
        System.out.println(x & y);
    }
}`,
      explanation: 'Ispisat će "1". Bitovni AND operator (&) uspoređuje bitove: 0101 & 0011 = 0001 (1 u decimalnom). Samo zadnji bit je 1 u oba broja.',
      difficulty: 'HARD' as Difficulty,
      options: createShuffledOptions([
        { text: '1', isCorrect: true },
        { text: '3', isCorrect: false },
        { text: '5', isCorrect: false },
        { text: '8', isCorrect: false },
      ]),
    },

    // Pre/post increment
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koja je razlika između ++i i i++?',
      explanation: '++i je pre-increment (inkrementira pa vraća novu vrijednost), i++ je post-increment (vraća trenutnu vrijednost pa inkrementira). U samostalnom statement-u nema razlike.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: '++i inkrementira prije korištenja, i++ poslije', isCorrect: true },
        { text: 'Nema razlike', isCorrect: false },
        { text: '++i je brži', isCorrect: false },
        { text: 'i++ inkrementira za 2', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int i = 5;
        int j = ++i;
        System.out.println(i + " " + j);
    }
}`,
      explanation: 'Ispisat će "6 6". ++i inkrementira i na 6 pa vraća 6 koja se dodjeljuje j. Obje varijable imaju vrijednost 6.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '6 6', isCorrect: true },
        { text: '5 6', isCorrect: false },
        { text: '6 5', isCorrect: false },
        { text: '5 5', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int i = 5;
        int j = i++;
        System.out.println(i + " " + j);
    }
}`,
      explanation: 'Ispisat će "6 5". i++ vraća trenutnu vrijednost 5 (dodjeljuje j) pa inkrementira i na 6. i je 6, j je 5.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '6 5', isCorrect: true },
        { text: '5 6', isCorrect: false },
        { text: '6 6', isCorrect: false },
        { text: '5 5', isCorrect: false },
      ]),
    },

    // String == vs .equals()
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        String s1 = new String("Hello");
        String s2 = new String("Hello");
        System.out.println(s1 == s2);
        System.out.println(s1.equals(s2));
    }
}`,
      explanation: 'Ispisat će "false" pa "true". == uspoređuje reference (različiti objekti), .equals() uspoređuje sadržaj (isti sadržaj). new String() kreira nove objekte, ne koristi String pool.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'false i true', isCorrect: true },
        { text: 'true i true', isCorrect: false },
        { text: 'false i false', isCorrect: false },
        { text: 'true i false', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Kada bi trebali koristiti == za String usporedbu?',
      explanation: 'Gotovo nikada. == uspoređuje reference, ne sadržaj. Koristi se .equals() za usporedbu sadržaja String-ova. == može raditi za literale zbog String pool-a, ali to je nepouzdano.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Gotovo nikada - koristi .equals() za sadržaj', isCorrect: true },
        { text: 'Uvijek kada uspoređuješ stringove', isCorrect: false },
        { text: 'Samo za null provjeru', isCorrect: false },
        { text: 'Kada uspoređuješ literale', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");

        System.out.println(s1 == s2);
        System.out.println(s1 == s3);
        System.out.println(s1.equals(s3));
    }
}`,
      explanation: 'Ispisat će "true", "false", "true". s1 i s2 pokazuju na istu instancu u String pool-u (==true). s3 je novi objekt (==false). Svi imaju isti sadržaj (.equals()=true).',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'true, false, true', isCorrect: true },
        { text: 'true, true, true', isCorrect: false },
        { text: 'false, false, true', isCorrect: false },
        { text: 'false, false, false', isCorrect: false },
      ]),
    },

    // Autoboxing/unboxing
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što je autoboxing?',
      explanation: 'Autoboxing je automatska konverzija primitivnog tipa u odgovarajući wrapper objekt (npr. int → Integer). Unboxing je obrnuto (Integer → int). Uvedeno u Java 5.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Automatska konverzija primitiv → wrapper objekt', isCorrect: true },
        { text: 'Pakiranje objekata u kutije', isCorrect: false },
        { text: 'Enkapasulacija podataka', isCorrect: false },
        { text: 'Izbjegavanje null vrijednosti', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod s autoboxingom?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        Integer x = 5;
        int y = x;
        System.out.println(x + y);
    }
}`,
      explanation: 'Kod će se kompilirati uspješno i ispisati "10". x = 5 je autoboxing (int → Integer), y = x je unboxing (Integer → int), x + y je unboxing + aritmetika.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '10', isCorrect: true },
        { text: '5', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
        { text: 'NullPointerException', isCorrect: false },
      ]),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se dogoditi s ovim kodom?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        Integer x = null;
        int y = x;
        System.out.println(y);
    }
}`,
      explanation: 'Kod će se kompilirati ali bacit će NullPointerException pri unboxingu. Pokušava konvertirati null Integer u int, što ne može. Runtime greška.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createCompileOptions('RUNTIME_EXCEPTION'),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod s Integer cache-om?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;
        Integer c = 128;
        Integer d = 128;

        System.out.println(a == b);
        System.out.println(c == d);
    }
}`,
      explanation: 'Ispisat će "true" pa "false". Java cachea Integer objekte od -128 do 127. a i b pokazuju na isti cache objekt (==true). c i d su različiti objekti (==false). Uvijek koristi .equals() za usporedbu!',
      difficulty: 'HARD' as Difficulty,
      options: createShuffledOptions([
        { text: 'true i false', isCorrect: true },
        { text: 'false i false', isCorrect: false },
        { text: 'true i true', isCorrect: false },
        { text: 'false i true', isCorrect: false },
      ]),
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koji su wrapper tipovi za primitive?',
      explanation: 'Svaki primitivni tip ima odgovarajući wrapper: byte→Byte, short→Short, int→Integer, long→Long, float→Float, double→Double, boolean→Boolean, char→Character.',
      difficulty: 'EASY' as Difficulty,
      options: [
        { text: 'Integer za int', isCorrect: true },
        { text: 'Boolean za boolean', isCorrect: true },
        { text: 'Character za char', isCorrect: true },
        { text: 'String za char', isCorrect: false },
      ],
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `import java.util.*;

public class Test {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(5);
        list.add(10);

        int sum = 0;
        for (int num : list) {
            sum += num;
        }
        System.out.println(sum);
    }
}`,
      explanation: 'Ispisat će "15". list.add(5) je autoboxing (int→Integer). for (int num : list) je unboxing (Integer→int). Zbroj: 5 + 10 = 15. Kolekcije ne mogu čuvati primitive, samo objekte.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: '15', isCorrect: true },
        { text: '5', isCorrect: false },
        { text: '10', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
  ],
}
