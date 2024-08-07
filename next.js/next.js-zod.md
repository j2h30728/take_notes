# zod

## 6.0 Introduction to Zod

TypeScript는 개발자에게 타입 안전성을 제공하고, 코드 작성 시 타입 관련 오류를 미리 발견할 수 있게 도와준다.<br/>
그러나 런타임에서는 JavaScript로 변환된 코드가 실행되며, 이 때는 TypeScript의 타입 시스템이 아무런 역할을 하지 않는다.<br/>
따라서, 런타임 타입 체크가 필요한 경우 JavaScript의 동적 타입 시스템이나 추가적인 런타임 검증 로직을 사용해야 한다.

런타임 검증 라이브러리로는 Zod, Yup, Joi가 존재한다.

관련 참고 글 : https://www.daleseo.com/zod-why-validation/

### [Zod](https://zod.dev/?id=introduction)

- Zod는 타입스크립트 우선 스키마 선언 및 유효성 검사 라이브러리
- "schema"라는 용어는 단순한 문자열부터 복잡한 중첩 객체까지 모든 데이터 유형을 광범위하게 지칭하기 위해 사용
- Zod를 사용하면 유효성 검사기를 한 번만 선언하면 Zod가 정적 타입스크립트 타입을 자동으로 추론

#### Creating a simple string schema

```ts
import { z } from "zod";

// creating a schema for strings
const mySchema = z.string();

// parsing
mySchema.parse("tuna"); // => "tuna"
mySchema.parse(12); // => throws ZodError

// "safe" parsing (doesn't throw error if validation fails)
mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
mySchema.safeParse(12); // => { success: false; error: ZodError }
```

#### Creating an object schema

```ts
import { z } from "zod";

const User = z.object({
  username: z.string(),
});

User.parse({ username: "Ludwig" });

// extract the inferred type
type User = z.infer<typeof User>;
// { username: string }
```

## 6.1 Validation Errors

### [Object Schema](https://zod.dev/?id=objects)

- `z.object({생성할 object와 그에 매칭되는 따른 타입})` 로 오브젝트 스키마 생성
- 얘시 : `const User = z.object( { username: z.string() } );`

### [.parse](https://zod.dev/?id=parse)

- `.parse(data: unknown): T`
- Zod 스키마가 주어지면 해당 `.parse` 메서드를 호출하여 데이터가 유효한지 확인
- 유효하면 전체 유형 정보가 포함된 값이 반환되고 그렇지 않으면 에러가 발생하기 때문에, try-catch문으로 감싸서 사용
- 💡 `.parse`가 반환하는 값은 전달한 변수의 deep clone(깊은 복사 본의 객체 값)이다.

```ts
const stringSchema = z.string();

stringSchema.parse("fish"); // => returns "fish"
stringSchema.parse(12); // throws error
```

### [.safeParse](https://zod.dev/?id=safeparse)

- `.safeParse(data:unknown): { success: true; data: T; } | { success: false; error: ZodError; }`
- 유효성 검사에 실패할 때 Zod가 오류를 발생시키지 않게 하려면 .safeParse를 사용
- 이 메서드는 성공적으로 구문 분석된 데이터 또는 유효성 검사 문제에 대한 자세한 정보가 포함된 ZodError 인스턴스를 포함하는 객체를 반환

```ts
stringSchema.safeParse(12);
// => { success: false; error: ZodError }

stringSchema.safeParse("billie");
// => { success: true; data: 'billie' }
```

## 6.2 Refinement

### [Strings :문자열 관련 유효성 검사](https://zod.dev/?id=strings)

- Zod에는 몇 가지 문자열 관련 유효성 검사가 포함되어 있다.

```ts
// validations
z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().email();
z.string().url();
z.string().emoji();
z.string().uuid();
z.string().nanoid();
z.string().cuid();
z.string().cuid2();
z.string().ulid();
z.string().regex(regex);
z.string().includes(string);
z.string().startsWith(string);
z.string().endsWith(string);
z.string().datetime(); // ISO 8601; by default only `Z` timezone allowed
z.string().ip(); // defaults to allow both IPv4 and IPv6

// transforms
z.string().trim(); // trim whitespace
z.string().toLowerCase(); // toLowerCase
z.string().toUpperCase(); // toUpperCase

// added in Zod 3.23
z.string().date(); // ISO date format (YYYY-MM-DD)
z.string().time(); // ISO time format (HH:mm:ss[.SSSSSS])
z.string().duration(); // ISO 8601 duration
z.string().base64();
```

> 세분화와 함께 사용할 수 있는 다른 유용한 문자열 유효성 검사 함수는 [validator.js](https://github.com/validatorjs/validator.js)에서 확인

문자열 스키마를 만들 때 몇 가지 오류 메시지를 지정할 수 있습니다.

```ts
const name = z.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string",
});
```

유효성 검사 메서드를 사용할 때 추가 인수를 전달하여 사용자 지정 오류 메시지를 제공할 수 있습니다.

```ts
z.string().min(5, { message: "Must be 5 or more characters long" });
z.string().max(5, { message: "Must be 5 or fewer characters long" });
z.string().length(5, { message: "Must be exactly 5 characters long" });
z.string().email({ message: "Invalid email address" });
z.string().url({ message: "Invalid url" });
z.string().emoji({ message: "Contains non-emoji characters" });
z.string().uuid({ message: "Invalid UUID" });
z.string().includes("tuna", { message: "Must include tuna" });
z.string().startsWith("https://", { message: "Must provide secure URL" });
z.string().endsWith(".com", { message: "Only .com domains allowed" });
z.string().datetime({ message: "Invalid datetime string! Must be UTC." });
z.string().date({ message: "Invalid date string!" });
z.string().time({ message: "Invalid time string!" });
z.string().ip({ message: "Invalid IP address" });
```

### [.refine](https://zod.dev/?id=refine)

- `.refine(validator: (data:T)=>any, params?: RefineParams)`
- Zod를 사용하면 세분화를 통해 사용자 정의 유효성 검사 가능
- ❗️refinement function(세분화 함수)는 던져서는 안 된다. 대신 거짓 값을 반환하여 실패를 알려야 한다.

```ts
const myString = z.string().refine((val) => val.length <= 255, {
  message: "String can't be more than 255 characters",
});
```

**Arguments**
`.refine`은 2개의 인수를 받는다.

1. 첫 번째 인수 : 유효성 검사 함수.
2. 두 번째 인수 : 몇 가지 옵션을 허용. 특정 오류 처리 동작을 사용자 정의할 수 있다.

   - message: 에러 메세지 지정
   - path: 에러 경로 지정
   - params: 에러시 메세지를 커스텀하기 위해 사용되는 객체

   ```ts
   type RefineParams = {
     // override error message
     message?: string;

     // appended to error path
     path?: (string | number)[];

     // params object you can use to customize message
     // in error map
     params?: object;
   };
   ```

   **Customize error path**

```ts
const passwordForm = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // confirm 경로에 에러메시지 추가
  });

passwordForm.parse({ password: "asdf", confirm: "qwer" });
```

**그에 따른 에러 메시지**

- refine은 z.object인 객체 전체에 걸었지만 에러 path는 "confirm"으로 지정해서 나온다.

```ts
ZodError {
  issues: [{
    "code": "custom",
    "path": [ "confirm" ],
    "message": "Passwords don't match"
  }]
}
```

## 6.3 Transformation

### [Strings :문자열 관련 유효성 검사](https://zod.dev/?id=strings)

```ts
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/);
const passwordSchema = z
  .string()
  .min(4)
  .regex(
    passwordRegex,
    "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-"
  );
```

- `.regax`
  - 정규표현식으로 데이터 검증 가능

> #### 정규식
>
> `new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/)`
>
> - 이 정규식은 비밀번호나 문자열의 유효성을 검사하는데 자주 사용되는 패턴으로, 다음과 같은 조건을 모두 만족하는 문자열을 찾습니다:
>
> 1.  **적어도 하나의 소문자 포함** (`(?=.*[a-z])`)
> 2.  **적어도 하나의 대문자 포함** (`(?=.*[A-Z])`)
> 3.  **적어도 하나의 숫자 포함** (`(?=.*\d)`)
> 4.  **적어도 하나의 특수 문자 포함** (`(?=.*?[#?!@$%^&*-])`)
> 5.  **최소 한 글자 이상** (`.+`)
>
> - `^`: 문자열의 시작을 나타냅니다.
> - `(?=.*[a-z])`: 적어도 하나의 소문자 (a-z) 를 포함하는지 확인합니다.
> - `(?=.*[A-Z])`: 적어도 하나의 대문자 (A-Z) 를 포함하는지 확인합니다.
> - `(?=.*\d)`: 적어도 하나의 숫자 (0-9) 를 포함하는지 확인합니다.
> - `(?=.*?[#?!@$%^&*-])`: 적어도 하나의 특수 문자 (#?!@$%^&\*-) 를 포함하는지 확인합니다.
> - `.+`: 한 글자 이상의 문자열을 의미합니다.
> - `$`: 문자열의 끝을 나타냅니다.
>
> **긍정형 전방 탐색 (`(?=.*)`)**
>
> - **형식**: `(?=.*<pattern>)`
> - **설명**: `<pattern>`에 해당하는 패턴이 문자열 어디엔가 최소한 하나 이상 존재하는지를 확인합니다.

```ts
const usernameSchema = z
  .string({
    invalid_type_error: "Username must be a string!",
    required_error: "Where is my username???",
  })
  .min(3, "Way too short!!!")
  .max(10, "That is too looooong!")
  .trim()
  .toLowerCase()
  .transform((username) => `🔥 ${username}`)
  .refine((username) => !username.includes("potato"), "No potatoes allowed!");
```

- `.toLowerCase`
  - String 타입의 데이터를 모두 소문자로 변환
- `.trim`
  - String 타입의 데이터에서 맨앞과 뒤에 붙은 공백을 제거
- `.transform`
  - 이 메서드를 이용하면 해당 데이터를 변환 가능
  - 예시: .transform((username) => `🔥 ${username} 🔥`)

## 6.4 Refactor

## 6.5 Recap

### [Error formatting](https://zod.dev/?id=error-formatting)

- `.format()` 메서드를 사용하여 이 오류를 중첩된 객체로 변환할 수 있다.

```ts
const result = z
  .object({
    name: z.string(),
  })
  .safeParse({ name: 12 });

if (!result.success) {
  const formatted = result.error.format();
  /* {
    name: { _errors: [ 'Expected string, received number' ] }
  } */

  formatted.name?._errors;
  // => ["Expected string, received number"]
}
```

### [Flattening errors](https://zod.dev/ERROR_HANDLING?id=flattening-errors)

- `format`은 깊게 중첩된 객체를 반환하므로 키 충돌을 방지하기 위해 오류는 \_errors 속성 내에 포함되지만, 객체 스키마의 뎁스가 하나일 경우에는 필요하지 않는다.
- 그럴경우에, `.flatten()`을 사용하는 것이 더 편리할 수 있다.

```ts
if (!result.success) {
  console.log(result.error.flatten());
}
/*
  {
    formErrors: [],
    fieldErrors: {
      name: ['Expected string, received null'],
      contactInfo: ['Invalid email']
    },
  }
*/
```

## 6.6 Log In Validation

## 6.7 Coerce

### [Coercion for primitives](https://zod.dev/?id=coercion-for-primitives)

- 값의 타입을 원시 타입으로 강제할 수 있는 방법
- 구문 분석 단계에서 입력은 데이터를 문자열로 강제 변환하는 JavaScript 내장 함수인 `String()` 함수를 통해 전달된다.

```ts
const schema = z.coerce.string(); // 무조건 문자열로 변환된다.
schema.parse("tuna"); // => "tuna"
schema.parse(12); // => "12"
schema.parse(true); // => "true"
schema.parse(undefined); // => "undefined"
schema.parse(null); // => "null"
```

- 반환된 스키마는 일반 ZodString 인스턴스이므로 모든 문자열 메서드를 사용할 수 있다.

  - `z.coerce.string().email().min(5);`

- 모든 원시 타입 강제 변환을 지원한다.
  - `String(input)` , `Number(input)`, `new Date(input)`, etc.

```ts
z.coerce.string(); // String(input)
z.coerce.number(); // Number(input)
z.coerce.boolean(); // Boolean(input)
z.coerce.bigint(); // BigInt(input)
z.coerce.date(); // new Date(input)

const schema = z.coerce.boolean(); // Boolean(input)

schema.parse("tuna"); // => true
schema.parse("true"); // => true
schema.parse("false"); // => true
schema.parse(1); // => true
schema.parse([]); // => true

schema.parse(0); // => false
schema.parse(""); // => false
schema.parse(undefined); // => false
schema.parse(null); // => false
```
