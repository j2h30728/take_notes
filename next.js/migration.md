# [Migrating from pages to app](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app)

- `app` : 앱 디렉토리는 중첩된 경로와 레이아웃을 지원합니다.
- 중첩된 폴더를 사용하여 경로를 정의하고 특별한 `page.js` 파일을 사용하여 경로 세그먼트를 공개적으로 액세스할 수 있도록 하세요.
- 특수 파일 규칙은 각 경로 세그먼트에 대한 UI를 만드는 데 사용됩니다. 가장 일반적인 특수 파일은 `page.js`와 `layout.js`입니다.
  - `page.js`를 사용하여 경로에 고유한 UI를 정의
  - 여러 경로에서 공유되는 UI를 정의하려면 `layout.js`를 사용 : 중첩 layout 설정 가능
  - 특수 파일에는 `.js`, `.jsx` 또는 `.tsx` 파일 확장자를 사용 가능
- 컴포넌트, 스타일, 테스트 등과 같은 다른 파일을 앱 디렉토리 내에 배치할 수 있습니다.

|                                                                                  | page-router                                                                              | app-router                                           |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 데이터 가져오기                                                                  | `getStaticProps`                                                                         | `fetch('https://...')`                               |
|                                                                                  | `getServerSideProps`                                                                     | `fetch('https://...', { cache: 'no-store' })`        |
|                                                                                  | Incremental Static Regeneration                                                          | `fetch('https://...', { next: { revalidate: 60 } })` |
|                                                                                  | `getStaticPaths`                                                                         | `generateStaticParams`                               |
|                                                                                  | `pages/app.js` 및 `pages/document.js`                                                    | 단일 `app/layout.js` 루트 레이아웃                   |
| 클라이언트에서 발생하는 에러 또는 서버에서 발생하는 500 에러를 핸들링파는 페이지 | `pages/error.js`                                                                         | 더 세분화된 `error.js` 특수 파일로 대체              |
| 전역 url 에러처리                                                                | `pages/404.js`                                                                           | `not-found.js`                                       |
| 서버에서 발생하는 에러 핸들링하는 페이지                                         | `pages/500.js` <br/>: `_error.tsx`와 `500.tsx` 모두 있다면 `500.tsx`가 우선적으로 실행됨 |                                                      |
| API routes                                                                       | `pages/api/*`                                                                            | `route.js`(라우트 핸들러)                            |

## 1. Step 1: Creating the app directory

```bash
npm install next@latest
```

## 2. Step 2: Creating a Root Layout

app/layout.tsx :앱 내의 모든 경로에 적용되는 루트 레이아웃

```tsx
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- 앱 디렉토리에 루트 레이아웃이 포함되어야 합니다.
- 루트 레이아웃에는 `<html>` 및 `<body>` 태그가 정의되어야 합니다. Next.js에서 자동으로 생성되지 않기 때문입니다.
- 루트 레이아웃은 `pages/\_app.tsx` 및 `pages/\_document.tsx` 파일을 대체합니다.(페이지라우터 기준)
- 레이아웃 파일에는 `.js`, `.jsx` 또는 `.tsx`확장자를 사용할 수 있습니다.

`<head>` HTML 요소를 관리하려면 기본 제공 SEO 지원을 사용할 수 있습니다:

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};
```

### Migrating the `getLayout()` pattern to Layouts (Optional)\_`getLayout()` 패턴을 레이아웃으로 마이그레이션하기(선택 사항)

Next.js는 페이지 컴포넌트에 속성을 추가하여 페이지 디렉토리에서 페이지별 레이아웃을 구현할 것을 권장했습니다. <br/>
이 패턴은 앱 디렉토리에서 중첩 레이아웃에 대한 기본 지원으로 대체할 수 있습니다.

#### pages router

```tsx
//pages/dashboard/index.js

//페이지 라우터
import DashboardLayout from "../components/DashboardLayout";

export default function Page() {
  return <p>My Page</p>;
}

Page.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
```

#### app router

```tsx
//app/dashboard/page.js

//앱 라우터
export default function Page() {
  return <p>My Page</p>;
}

// getLayout 삭제
```

- 앱 디렉터리 내의 새 `layout.js` 파일로 DashboardLayout을 가져옵니다.

  ```tsx
  //app/dashboard/layout.js

  import DashboardLayout from "./DashboardLayout";

  // This is a Server Component
  export default function Layout({ children }) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }
  ```

  - 클라이언트에 보내는 컴포넌트 자바스크립트의 양을 줄이기 위해 `DashboardLayout.js`(클라이언트 컴포넌트)의 non-interactive parts을 `layout.js`(서버 컴포넌트)로 점진적으로 이동시킬 수 있습니다.
  - `DashboardLayout.js`을 서버컴포넌트로 변경하는 것. 사실상 클라이언트 훅을 사용하고 있지않으면 서버컴포넌트로 작성해도 무관하기 때문이다.

## 3. Migrating next/head

pages 디렉토리에서 next/head React 컴포넌트는 제목 및 메타 와 같은 <head> HTML 요소를 관리하는 데 사용됩니다.
앱 디렉토리에서 next/head는 새로운 내장 SEO 지원으로 대체됩니다.

#### pages router

```tsx
import Head from "next/head";

export default function Page() {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
    </>
  );
}
```

#### app router

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page Title",
};

export default function Page() {
  return "...";
}
```
