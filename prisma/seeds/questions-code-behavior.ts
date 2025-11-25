import { QuestionType, Difficulty } from '@prisma/client'
import { createCompileOptions, createShuffledOptions } from './seed-utils'

export const codeBehaviorQuestions = {
  lectureSlug: 'code-behavior',
  questions: [
    // Hoće li se kod kompilirati?
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int x = 5;
        String s = x;
        System.out.println(s);
    }
}`,
      explanation: 'Kod se neće kompilirati jer ne možete direktno dodijeliti int vrijednost String varijabli. Type mismatch compile-time greška. Trebate koristiti String.valueOf(x) ili x + "".',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    public void method() {
        System.out.println("Hello");
    }

    public static void main(String[] args) {
        method();
    }
}`,
      explanation: 'Kod se neće kompilirati jer se pokušava pozvati instance metoda method() iz static konteksta (main). Mora se kreirati instanca klase ili metoda mora biti static.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    private int value = 10;

    public static void main(String[] args) {
        System.out.println(value);
    }
}`,
      explanation: 'Kod se neće kompilirati jer se pokušava pristupiti instance varijabli value iz static metode (main) bez kreiranja instance. Compile-time greška: non-static variable cannot be referenced from static context.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        final int x;
        x = 5;
        x = 10;
        System.out.println(x);
    }
}`,
      explanation: 'Kod se neće kompilirati jer pokušava ponovo dodijeliti vrijednost final varijabli x. Final varijabla može se inicijalizirati samo jednom. Compile-time greška: cannot assign a value to final variable x.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Hoće li se sljedeći kod kompilirati?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        for (String s : arr) {
            System.out.println(s);
        }
    }
}`,
      explanation: 'Kod se neće kompilirati jer pokušava iterirati int[] niz koristeći String varijablu u enhanced for loop. Type mismatch: mora biti int ili Integer. Compile-time greška.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },

    // Hoće li baciti iznimku?
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se dogoditi pri izvršavanju ovog koda?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        String s = null;
        System.out.println(s.length());
    }
}`,
      explanation: 'Kod će se kompilirati ali bacit će NullPointerException pri izvršavanju jer pokušava pozvati metodu na null referenci. Runtime greška.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('RUNTIME_EXCEPTION'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se dogoditi pri izvršavanju ovog koda?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        System.out.println(arr[5]);
    }
}`,
      explanation: 'Kod će se kompilirati ali bacit će ArrayIndexOutOfBoundsException pri izvršavanju jer pokušava pristupiti indeksu koji ne postoji (niz ima indekse 0-2). Runtime greška.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('RUNTIME_EXCEPTION'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se dogoditi pri izvršavanju ovog koda?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        String s = "123abc";
        int num = Integer.parseInt(s);
        System.out.println(num);
    }
}`,
      explanation: 'Kod će se kompilirati ali bacit će NumberFormatException pri izvršavanju jer "123abc" nije valjani cijeli broj. parseInt() može parsirati samo brojčane stringove. Runtime greška.',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('RUNTIME_EXCEPTION'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se dogoditi pri izvršavanju ovog koda?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        Object obj = "Hello";
        Integer num = (Integer) obj;
        System.out.println(num);
    }
}`,
      explanation: 'Kod će se kompilirati ali bacit će ClassCastException pri izvršavanju jer pokušava castati String u Integer što nije moguće. Runtime greška.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createCompileOptions('RUNTIME_EXCEPTION'),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se dogoditi pri izvršavanju ovog koda?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int result = 10 / 0;
        System.out.println(result);
    }
}`,
      explanation: 'Kod će se kompilirati ali bacit će ArithmeticException pri izvršavanju jer dijeli cijeli broj s nulom. Runtime greška. (Floating-point dijeljenje s 0.0 ne baca iznimku, vraća Infinity.)',
      difficulty: 'EASY' as Difficulty,
      options: createCompileOptions('RUNTIME_EXCEPTION'),
    },

    // Predviđanje outputa
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(x++);
        System.out.println(x);
    }
}`,
      explanation: 'Ispisat će "5" pa "6". x++ je post-increment: prvo se koristi vrijednost (5), zatim se povećava. Druga println() ispisuje povećanu vrijednost (6).',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: '5 i 6', isCorrect: true },
        { text: '6 i 6', isCorrect: false },
        { text: '5 i 5', isCorrect: false },
        { text: '6 i 7', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        String s1 = "Hello";
        String s2 = "Hello";
        System.out.println(s1 == s2);
    }
}`,
      explanation: 'Ispisat će "true". String literali se čuvaju u String pool-u. s1 i s2 pokazuju na istu instancu u pool-u, pa == vraća true. (Ali koristite .equals() za usporedbu sadržaja!)',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'true', isCorrect: true },
        { text: 'false', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
        { text: 'Runtime exception', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int x = 10;
        int y = 3;
        System.out.println(x / y);
    }
}`,
      explanation: 'Ispisat će "3". Dijeljenje dvaju cijelih brojeva daje cijeli broj (integer division). Decimalni dio se odbacuje (truncate), ne zaokružuje.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '3', isCorrect: true },
        { text: '3.33', isCorrect: false },
        { text: '3.3333333', isCorrect: false },
        { text: '4', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        boolean result = false || true && false;
        System.out.println(result);
    }
}`,
      explanation: 'Ispisat će "false". Operator precedence: && ima veći prioritet od ||. Prvo se evaluira (true && false) = false, zatim (false || false) = false.',
      difficulty: 'HARD' as Difficulty,
      options: createShuffledOptions([
        { text: 'false', isCorrect: true },
        { text: 'true', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
        { text: 'Runtime exception', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int x = 5;
        int y = x++ + ++x;
        System.out.println(y);
    }
}`,
      explanation: 'Ispisat će "12". x++ koristi 5 pa inkrementira na 6. ++x inkrementira na 7 pa koristi 7. Zbroj: 5 + 7 = 12.',
      difficulty: 'HARD' as Difficulty,
      options: createShuffledOptions([
        { text: '12', isCorrect: true },
        { text: '11', isCorrect: false },
        { text: '10', isCorrect: false },
        { text: '13', isCorrect: false },
      ]),
    },

    // Runtime vs compile-time errors
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koji tip greške je "missing semicolon"?',
      explanation: 'Missing semicolon je compile-time greška jer compiler očekuje točku-zarez na kraju statement-a. Syntax error.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: 'Compile-time greška', isCorrect: true },
        { text: 'Runtime greška', isCorrect: false },
        { text: 'Logical greška', isCorrect: false },
        { text: 'Syntax warning', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Koji tip greške je NullPointerException?',
      explanation: 'NullPointerException je runtime greška (unchecked exception). Compiler ne može detektirati da li će varijabla biti null u runtime-u.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: 'Runtime greška', isCorrect: true },
        { text: 'Compile-time greška', isCorrect: false },
        { text: 'Syntax greška', isCorrect: false },
        { text: 'Logical greška', isCorrect: false },
      ]),
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koje su compile-time greške?',
      explanation: 'Compile-time greške su one koje compiler detektira: syntax errors, type mismatches, nedostajuće deklaracije, neriješene checked exceptions. Runtime greške se događaju pri izvršavanju.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'Type mismatch (int x = "hello")', isCorrect: true },
        { text: 'Cannot find symbol (nedeklarirana varijabla)', isCorrect: true },
        { text: 'Unreported exception must be caught', isCorrect: true },
        { text: 'NullPointerException', isCorrect: false },
      ]),
    },
    {
      type: 'MULTIPLE_CHOICE' as QuestionType,
      prompt: 'Koje su runtime greške?',
      explanation: 'Runtime greške se događaju pri izvršavanju programa: NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException, ArithmeticException, NumberFormatException itd.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'NullPointerException', isCorrect: true },
        { text: 'ArrayIndexOutOfBoundsException', isCorrect: true },
        { text: 'ClassCastException', isCorrect: true },
        { text: 'Missing semicolon', isCorrect: false },
      ]),
    },
    {
      type: 'CODE_WILL_COMPILE' as QuestionType,
      prompt: 'Što će se dogoditi s ovim kodom?',
      codeSnippet: `import java.io.*;

public class Test {
    public static void main(String[] args) {
        FileReader fr = new FileReader("file.txt");
    }
}`,
      explanation: 'Kod se neće kompilirati jer FileReader konstruktor baca checked exception (FileNotFoundException) koja mora biti uhvaćena ili deklarirana s throws. Compile-time greška: unreported exception.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createCompileOptions('COMPILE_ERROR'),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    static int count = 0;

    public static void main(String[] args) {
        count++;
        System.out.println(count);
        count++;
        System.out.println(count);
    }
}`,
      explanation: 'Kod će se kompilirati uspješno i ispisati "1" pa "2". Static varijabla count se može mijenjati u static metodi main. Svaki count++ inkrementira vrijednost.',
      difficulty: 'EASY' as Difficulty,
      options: createShuffledOptions([
        { text: '1 i 2', isCorrect: true },
        { text: '0 i 1', isCorrect: false },
        { text: '2 i 2', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
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
      explanation: 'Kod će se kompilirati ali bacit će NullPointerException pri unboxingu. Pokušava konvertirati null Integer u primitivni int, što uzrokuje NPE. Runtime greška.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createCompileOptions('RUNTIME_EXCEPTION'),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        String s = "Hello";
        s.concat(" World");
        System.out.println(s);
    }
}`,
      explanation: 'Ispisat će "Hello". String je immutable - concat() vraća novi String ali rezultat se ne dodjeljuje. Originalni s ostaje nepromijenjen. Trebalo bi: s = s.concat(" World").',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: 'Hello', isCorrect: true },
        { text: 'Hello World', isCorrect: false },
        { text: 'World', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        change(arr);
        System.out.println(arr[0]);
    }

    static void change(int[] array) {
        array[0] = 100;
    }
}`,
      explanation: 'Ispisat će "100". Nizovi se prenose po referenci - change() metoda mijenja originalni niz. arr[0] je promijenjen s 1 na 100.',
      difficulty: 'MEDIUM' as Difficulty,
      options: createShuffledOptions([
        { text: '100', isCorrect: true },
        { text: '1', isCorrect: false },
        { text: '0', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod s short-circuit evaluacijom?',
      codeSnippet: `public class Test {
    static int count = 0;

    static boolean incrementAndReturn() {
        count++;
        return true;
    }

    public static void main(String[] args) {
        boolean result = true || incrementAndReturn();
        System.out.println(count);
    }
}`,
      explanation: 'Ispisat će "0". || operator koristi short-circuit evaluation - ako je lijeva strana true, desna se ne evaluira. incrementAndReturn() se ne poziva, count ostaje 0.',
      difficulty: 'HARD' as Difficulty,
      options: createShuffledOptions([
        { text: '0', isCorrect: true },
        { text: '1', isCorrect: false },
        { text: '2', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
    {
      type: 'SINGLE_CHOICE' as QuestionType,
      prompt: 'Što će ispisati sljedeći kod?',
      codeSnippet: `public class Test {
    public static void main(String[] args) {
        int x = Integer.MAX_VALUE;
        x = x + 1;
        System.out.println(x);
    }
}`,
      explanation: 'Kod će se kompilirati i izvršiti uspješno, ispisujući -2147483648 (Integer.MIN_VALUE). Integer overflow ne baca iznimku u Javi, vrijednost "prevrne" (wraps around) na negativnu stranu.',
      difficulty: 'HARD' as Difficulty,
      options: createShuffledOptions([
        { text: '-2147483648', isCorrect: true },
        { text: '2147483648', isCorrect: false },
        { text: 'ArithmeticException', isCorrect: false },
        { text: 'Compile error', isCorrect: false },
      ]),
    },
  ],
}
