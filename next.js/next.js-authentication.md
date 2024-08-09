# Authentication

## 8.1 Database Validation

#### [.safeParseAsync](https://zod.dev/?id=safeparseasync)

`.safeParse`의 비동기 버전 (Promise를 반환하는 밸리데이터 사용시 적용)

> `.spa` 로 사용가능

```ts
await stringSchema.safeParseAsync("billie");
await stringSchema.spa("billie");
```

## 8.2 Password Hashing

### bcrypt

```bash
npm i bcrypt
npm i @types/bcrypt
```

- [How To Safely Store A Password? ](https://codahale.com/how-to-safely-store-a-password/)

## 8.3 [Iron Session](https://1password.com/password-generator/)

```bash
npm i iron-session
```

## 8.4 Recap

```ts
// server validate.ts => Promise 반환
export const isUsernameUnique = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

export const isEmailUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

// 회원가입 데이터 스키마에서 Promise 반환 validate 사용
export const accountSchema = z.object({
  email: z
    .string({
      required_error: "이메일은 필수 값입니다.",
    })
    .email("이메일 형식으로 작성해주세요.")
    .refine((email) => email.includes("@zod.com"), "@zod.com 만 허용됩니다.")
    .refine(isEmailUnique, "이미 존재하는 이메일입니다."),
  username: z
    .string({
      invalid_type_error: "이름은 문자만 가능합니다.",
      required_error: "이름은 필수 값입니다.",
    })
    .trim()
    .min(USERNAME_MIN_LENGTH, "이름은 5글자 이상이어야 합니다.")
    .refine(isUsernameUnique, "이미 존재하는 이름입니다."),
  password: z
    .string({
      required_error: "비밀번호는 필수 값입니다.",
    })
    .min(PASSWORD_MIN_LENGTH, "비밀번호는 10글자 이상이어야 합니다.")
    .regex(PASSWORD_REGEX, "반드시 1개 이상의 숫자를 포함해야 합니다."),
});
```

```ts
// 회원가입 action.ts
// safeParseAsync 로 스키마 밸리데이션 진행

export async function handleForm(_: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1));
  const accountData = {
    password: formData.get("password"),
    email: formData.get("email"),
    username: formData.get("username"),
  };

  const result = await accountSchema.safeParseAsync(accountData);

  if (result.success) {
    await createAccount(result.data);
  }

  return {
    data: null,
    error: result.error?.flatten(),
    success: false,
  };
}

// 회원가입로직
const createAccount = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await db.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  const cookie = await getIronSession<typeof user>(cookies(), {
    cookieName: "dam",
    password: process.env.COOKIE_PASSWORD!,
  });
  cookie.id = user.id;
  await cookie.save();
  redirect("/profile");
};
```

## 8.5 Email Log In

```ts
export const isEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

export const logInSchema = z.object({
  email: z
    .string({
      required_error: "이메일은 필수 값입니다.",
    })
    .email("이메일 형식으로 작성해주세요.")
    .refine(isEmailExists, "존재하지않는 유저입니다."),
  password: z.string({
    required_error: "비밀번호는 필수 값입니다.",
  }),
});
```

```ts
// 로그인 action.ts
export async function handleForm(_: unknown, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1));
  const loginData = {
    password: formData.get("password"),
    email: formData.get("email"),
  };

  const result = await logInSchema.spa(loginData);

  if (result.success) {
    await logIn(result.data);
  }

  return {
    data: null,
    error: result.error?.flatten(),
    success: false,
  };
}

// 로그인 로직
const logIn = async ({ email, password }: { email: string; password: string }) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  const isValidPassword = await bcrypt.compare(password, user!.password);
  if (isValidPassword) {
    const session = await getSession();
    session.id = user!.id;
    session.save();
    redirect("/profile");
  }

  return {
    data: null,
    error: {
      fieldErrors: {
        password: ["비밀번호 확인 부탁드립니다."],
        email: [],
      },
    },
    success: false,
  };
};
```

## 8.6 [.superRefine](https://zod.dev/?id=superrefine)

- 원하는 만큼 이슈를 추가할 수 있습니다.
- 함수 실행 중에 `ctx.addIssue`가 호출되지 않으면 유효성 검사가 통과됩니다.
- 일반적으로 세분화는 항상 `ZodIssueCode.custom` 오류 코드와 함께 이슈를 생성하지만, superRefine을 사용하면 모든 ZodIssueCode의 이슈를 던질 수 있습니다.

### Abort early

- 기본적으로 구문 분석은 세분화 검사에 실패한 후에도 계속 진행됩니다.
- 예를 들어, 여러 개의 세분화 검사를 함께 연결하면 모두 실행됩니다. 그러나 나중에 세분화가 실행되지 않도록 조기에 중단하는 것이 바람직할 수 있습니다. 이렇게 하려면 치명적인 플래그를 `ctx.addIssue`에 전달하고 z.NEVER를 반환합니다.

```ts
const schema = z
  .object({
    first: z.string(),
    second: z.number(),
  })
  .nullable()
  .superRefine((arg, ctx): arg is { first: string; second: number } => {
    if (!arg) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom, // customize your issue
        message: "object should exist",
      });
    }

    return z.NEVER; // 반환 값은 사용되지 않지만, 타이핑을 만족시키기 위해 무언가를 반환해야 합니다.
  })
  // here, TS knows that arg is not null
  .refine((arg) => arg.first === "bob", "`first` is not `bob`!");
```

> ⚠️ 유효성 검사 통과 여부를 표시하려면 부울 값을 반환하는 대신 `ctx.addIssue()`를 사용해야 합니다.
> 함수를 실행하는 동안 `ctx.addIssue`가 호출되지 않으면 유효성 검사는 통과합니다.

### 코드 적용

```ts
export const accountSchema = z
  .object({
    email: z
      .string({
        required_error: "이메일은 필수 값입니다.",
      })
      .email("이메일 형식으로 작성해주세요.")
      .refine((email) => email.includes("@zod.com"), "@zod.com 만 허용됩니다."),
    username: z
      .string({
        invalid_type_error: "이름은 문자만 가능합니다.",
        required_error: "이름은 필수 값입니다.",
      })
      .trim()
      .min(USERNAME_MIN_LENGTH, "이름은 5글자 이상이어야 합니다."),
    password: z
      .string({
        required_error: "비밀번호는 필수 값입니다.",
      })
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 10글자 이상이어야 합니다.")
      .regex(PASSWORD_REGEX, "반드시 1개 이상의 숫자를 포함해야 합니다."),
  })
  .superRefine(async ({ email }, ctx) => {
    if (await isEmailUnique(email)) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ username }, ctx) => {
    if (await isUsernameUnique(username)) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  });
```

## 8.7 Log Out

- `session.destroy`

```ts
export const logOut = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/");
};
```

## 8.8 Recap

## 8.9 [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

- `middleware.js|ts` 파일은 모든 요청(request)이 완료되기 전에 서버에서 코드를 실행하는 데 사용된다.
- 들어오는 요청에 따라 응답을 재작성, 리디렉션, 요청 또는 응답 헤더 수정, 직접 응답 등을 통해 수정할 수 있다.

- 미들웨어는 라우트가 렌더링되기 전에 실행됩니다. 인증, 로깅 또는 리디렉션 처리와 같은 사용자 정의 서버 측 로직을 구현하는 데 특히 유용하다.
  - 쿠키
  - headers setting
  - CORS
- 프로젝트의 루트, 예를 들어 app 또는 pages와 같은 레벨이나 src 내부에 `middleware.ts` (또는 `.js`) 파일을 사용하여 미들웨어를 정의

### Middleware function

- 파일은 기본 내보내기 또는 middleware라는 이름의 단일 함수를 내보내야 한다. 동일한 파일에서 여러 미들웨어를 지원하지 않는다.

- **단일 경로의 경우**: 문자열을 직접 사용하여 경로를 정의한다.
  - 예: `'/about'`.
- **여러 경로의 경우**: 배열을 사용하여 여러 경로를 나열한다.
  - 예: matcher: `['/about', '/contact']`. 이는 /about 및 /contact 경로에 미들웨어를 적용.
- **정규 표현식 사용** : 복잡한 경로 지정도 지원하여 포함하거나 제외할 경로를 정확하게 제어할 수 있다.
  - 예: matcher: `['/((?!api|_next/static|_next/image|.*\\.png$).*)']`
  ```js
  export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };
  ```

matcher 옵션은 다음 키를 가진 객체 배열도 허용합니다:

- **source**: 요청 경로를 매칭하는 데 사용되는 경로 또는 패턴. 직접 경로 매칭을 위한 문자열이거나, 더 복잡한 매칭을 위한 패턴일 수 있다..
- **regexp** (선택 사항): 소스를 기반으로 매칭을 세밀하게 조정하는 정규 표현식 문자열. 포함하거나 제외할 경로를 추가로 제어.
- **locale** (선택 사항): false로 설정하면 경로 매칭에서 로케일 기반 라우팅을 무시.
- **has** (선택 사항): 헤더, 쿼리 매개변수 또는 쿠키와 같은 특정 요청 요소의 존재 여부에 따른 조건을 지정.
- **missing** (선택 사항): 누락된 헤더 또는 쿠키와 같은 특정 요청 요소가 없는 경우에 대한 조건을 지정.

```js
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
```

### Edge runtime

- 미들웨어는 Edge runtime만 지원gks다.
- Node.js 런타임은 사용할 수 없다.

```ts
// 기본 내보내기 예제
export default function middleware(request) {
  // 미들웨어 로직
}
```

### Config object (optional)

- 선택적으로, 미들웨어 함수와 함께 config 객체를 내보낼 수 있다.
- 이 객체에는 미들웨어가 적용될 경로를 지정하는 matcher가 포함된다.

## 8.10 [Matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher)

matcher를 사용하면 미들웨어를 필터링하여 특정 경로들에서만 실행되도록 할 수 있습니다.

```js
export const config = {
  matcher: ["profile", "/about/:path*", "/dashboard/:path*"],
};
```

## 8.11 [Edge Runtime 및 Edge Functions](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes)

Next.js에는 애플리케이션에서 사용할 수 있는 두 가지 서버 런타임이 존재:

1. **Node.js Runtime (기본값)**: 모든 Node.js API 및 호환 가능한 패키지에 접근할 수 있는 런타임. 이는 애플리케이션의 서버 측 렌더링(SSR) 및 API 라우트에서 사용.
2. **Edge Runtime**: 더 제한된 API 세트를 포함하는 런타임으로, 주로 글로벌 분산 네트워크에서의 빠른 응답을 필요로 하는 경우에 사용. 이 런타임은 미들웨어(리다이렉트, 리라이트, 헤더 설정 등과 같은 라우팅 규칙)에 사용.

### Edge Runtime의 주요 특징:

- **제한된 API**: Edge Runtime은 Node.js 런타임보다 가벼우며, 제한된 API 세트만 포함. 이는 글로벌 네트워크에서 효율적으로 동작하기 위해 최적화되어 있다.
- **미들웨어에서 사용**: Next.js의 미들웨어는 기본적으로 Edge Runtime에서 실행되며, 이를 통해 다양한 작업(예: 요청의 리다이렉트, 인증 처리, 헤더 설정 등)을 수행할 수 있다.

### Edge Functions란 무엇인가?

- **Edge Functions**: Vercel의 글로벌 분산 네트워크에서 서버리스 함수를 실행하는 기능. Edge Functions는 사용자와 가까운 위치에서 코드를 실행하여 응답 시간을 최소화하고, 더욱 퍼포먼스가 요구되는 작업(예: 실시간 데이터 처리, 사용자 맞춤형 응답 생성)을 빠르게 처리할 수 있도록 돕는다.
- **Edge Runtime에서 실행**: Edge Functions는 Edge Runtime 위에서 실행되며, 고속의 글로벌 네트워크를 통해 사용자의 위치에 가까운 서버에서 직접 실행된다. 이는 전통적인 서버리스 함수보다 빠른 응답 시간을 제공할 수 있다.

- **주요 사용 사례**:
  - 실시간 데이터 처리
  - 개인화된 사용자 경험 제공
  - 글로벌 사용자에게 빠른 응답 제공
  - 인증 및 권한 부여 로직 처리

### 요금 관련 사항:

- **미들웨어의 무료 사용**: Next.js의 미들웨어 기능 자체는 무료로 제공되며, Vercel의 무료 요금제에서도 사용할 수 있다. 즉, Edge Runtime에서 미들웨어를 사용해 인가 처리를 한다는 것은 무료 기능을 활용한 것.
- **Edge Functions의 요금**: Edge Functions는 호출 횟수, 실행 시간, 데이터 전송량 등에 따라 비용이 발생할 수 있다. Vercel의 무료 요금제는 이러한 사용에 대해 특정 한도를 제공하며, 이 한도를 초과하면 추가 요금이 부과될 수 있다.

### 한도를 초과하는 경우:

- **Edge Function 호출 횟수**: 각 요청이 Edge Runtime에서 처리될 때 발생하는 호출 횟수다. 이 횟수가 한도를 초과하면 요금이 부과될 수 있다.
- **데이터 전송량**: 미들웨어 및 Edge Functions가 처리하는 데이터의 양이 많아지면 이에 따른 전송량 증가로 추가 비용이 발생할 수 있다.
- **실행 시간**: Edge Function의 총 실행 시간이 무료 요금제에서 제공하는 한도를 초과하면 추가 비용이 발생할 수 있다.

## 8.12 Authentication Middleware

## 8.13 Recap
