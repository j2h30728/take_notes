# 13 Caching

## 13.0 Introduction

## 13.1 nextCache : [unstable_cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)

unstable_cache를 사용하면 데이터베이스 쿼리와 같이 비용이 많이 드는 작업의 결과를 캐시하여 여러 요청에 걸쳐 재사용할 수 있습니다.

```ts
import { getUser } from './data';
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (id) => getUser(id),
  ['my-app-user']
);

export default async function Component({ userID }) {
  const user = await getCachedUser(userID);
  ...
}
```

- 캐시 범위 내에서 헤더나 쿠키와 같은 동적 데이터 소스에 액세스하는 것은 지원되지 않습니다. 캐시된 함수 내에서 이 데이터가 필요한 경우 캐시된 함수 외부의 헤더를 사용하고 필요한 동적 데이터를 인수로 전달하세요.
- 이 API는 Next.js의 기본 제공 데이터 캐시를 사용하여 요청 및 배포에서 결과를 유지합니다.

### Parameters

```ts
const data = unstable_cache(fetchData, keyParts, options)();
```

- `fetchData`: 캐시하려는 데이터를 가져오는 비동기 함수입니다. Promise를 반환하는 함수여야 합니다.
- `keyParts` : 캐시에 식별을 추가하는 추가 키 배열입니다. **기본적으로 `unstable_cache`는 이미 인자와 함수의 문자열화된 버전을 캐시 키로 사용합니다. 대부분의 경우 이 옵션은 선택 사항**이며, 외부 변수를 매개변수로 전달하지 않고 사용할 때만 사용해야 합니다. 그러나 함수 내에서 사용되는 클로저를 매개 변수로 전달하지 않는 경우 추가하는 것이 중요합니다.
- `options` : 캐시 작동 방식을 제어하는 객체입니다. 다음과 같은 속성을 포함할 수 있습니다:
  - `tags`: 캐시 무효화를 제어하는 데 사용할 수 있는 태그 배열입니다. Next.js는 이를 사용하여 함수를 고유하게 식별하지 않습니다.
  - `revalidate` : 캐시를 재검증해야 하는 시간(초)입니다. 생략하거나 false를 전달하여 캐시를 무기한으로 또는 일치하는 `revalidateTag()` 또는 `revalidatePath()` 메서드가 호출될 때까지 캐시합니다.

### Returns

- unstable_cache는 호출 시 캐시된 데이터로 리졸브하는 Promise를 반환하는 함수를 반환합니다.
- 데이터가 캐시에 없는 경우 제공된 함수가 호출되고 그 결과가 캐시되어 반환됩니다.

## 13.2 revalidate

- unstable_cache의 세번째 파라미터인 옵션 중 revalidate
  - 데이터를 페칭하고난 시각에서 해당 초가 지난뒤 데이터를 확인한다면, 캐시를 재겅즘 해야한다.

```ts
const getCachedProducts = nextCache(getInitialProducts, ["home-products"], {
  revalidate: 60,
});
```

## 13.3 [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)

`revalidatePath`를 사용하면 특정 경로에 대해 캐시된 데이터를 온디맨드 방식으로 제거할 수 있습니다.

- `revalidatePath`는 포함된 경로가 다음에 방문될 때만 캐시를 무효화합니다. 즉, 동적 경로 세그먼트로 `revalidatePath`를 호출해도 한 번에 많은 재검증이 즉시 트리거되지 않습니다. 무효화는 경로가 다음에 방문될 때만 발생합니다.
- 현재 `revalidatePath`는 클라이언트 측 라우터 캐시에 있는 모든 경로를 무효화합니다. 이 동작은 일시적이며 향후 특정 경로에만 적용되도록 업데이트될 예정입니다.
- `revalidatePath`를 사용하면 서버 측 라우터 캐시에 있는 특정 경로만 무효화됩니다.

### Parameters

```ts
revalidatePath(path: string, type?: 'page' | 'layout'): void;

```

- `path`: 재검증하려는 데이터와 관련된 파일 시스템 경로를 나타내는 문자열(예: `/product/[slug]/page`) 또는 리터럴 경로 세그먼트(예: `/product/123`)입니다. 1024자 미만이어야 합니다.
- `type`: (선택 사항) 재검증할 경로 유형을 변경할 `'page`' 또는 `'layout'` 문자열입니다. 경로에 동적 세그먼트(예: `/product/[slug]/page`)가 포함된 경우 이 매개변수는 필수입니다. `path`가 리터럴 경로 세그먼트(예: 동적 페이지의 경우 `/product/1`)를 참조하는 경우(예: `/product/[슬러그]/page`) `type`을 제공하지 않아야 합니다.

### Returns

값을 반환하지 않는다.

```ts
import { revalidatePath } from "next/cache";

// 특정 URL
revalidatePath("/blog/post-1");

// page Path
revalidatePath("/blog/[slug]", "page");
// or with route groups
revalidatePath("/(main)/blog/[slug]", "page");

// layout path
revalidatePath("/blog/[slug]", "layout");
// or with route groups
revalidatePath("/(main)/post/[slug]", "layout");

// 전체 데이터 재검증
revalidatePath("/", "layout");
```

## 13.4 [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

특정 캐시 태그에 대해 on-demand 방식으로 캐시된 데이터를 제거할 수 있습니다.

- 재검증 태그는 Node.js와 Edge 런타임 모두에서 사용할 수 있습니다.
- 재검증 태그는 경로가 다음에 방문될 때만 캐시를 무효화합니다. 즉, 동적 경로 세그먼트를 사용하여 재검증태그를 호출해도 한 번에 많은 재검증이 즉시 트리거되지 않습니다. 무효화는 경로가 다음에 방문될 때만 발생합니다.

```ts
revalidateTag(tag: string): void;

```

- `unstable_cache`의 세번째 파라메터인 option 중 tags에 추가되는 값을 재검증하는 것

## 13.5 [fetch Cache](https://nextjs.org/docs/app/building-your-application/caching#request-memoization)

- 요청 memoization는 Next.js 기능이 아닌 React 기능입니다.
- memoization는 `fetch` 요청의 GET 메서드에만 적용됩니다.
- 즉, memoization는 React 컴포넌트 트리에만 적용된다는 뜻입니다:
  - `generateMetadata`, `generateStaticParams`, Layouts, Pages 및 기타 서버 컴포넌트의 `fetch` 요청에 적용됩니다.
  - 경로 핸들러의 `fetch` 요청에는 적용되지 않는데, 이는 React 컴포넌트 트리의 일부가 아니기 때문입니다.
- `fetch`가 적합하지 않은 경우(예: 일부 데이터베이스 클라이언트, CMS 클라이언트 또는 GraphQL 클라이언트)에는 [React cache 함수](https://nextjs.org/docs/app/building-your-application/caching#react-cache-function)를 사용하여 함수를 memoization 할 수 있습니다.

#### 캐싱이 되지 않는 요청

1. POST request
2. cookies, headers 와 같은 인증인가
3. server action 에 있는 fetcher request

## 13.6 Production Cache

## 13.7 [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)

### [dynamic](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)

레이아웃 또는 페이지의 static 동작을 fully static 또는 fully dynamic으로 변경합니다.

```ts
export const dynamic = "auto";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
```

- `auto`(기본값): 컴포넌트가 동적 동작을 선택하지 못하게 하지 않고 가능한 한 많이 캐싱하는 기본 옵션입니다.
- `force-dynamic`: 동적 렌더링을 강제 적용하여 요청 시 각 사용자에 대해 경로가 렌더링되도록 합니다. 이 옵션은 다음과 같습니다:
- `error`: 컴포넌트가 동적 함수 또는 캐시되지 않은 데이터를 사용하는 경우 오류를 발생시켜 레이아웃 또는 페이지의 데이터를 강제로 렌더링하고 캐시합니다.
  - 페이지 디렉토리의 `getStaticProps()`.
  - 레이아웃 또는 페이지의 모든 `fetch()` 요청 옵션을 `{ cache: 'force-cache' }`로 설정합니다.
  - 세그먼트 구성을 `fetchCache = 'only-cache', dynamicParams = false`로 설정합니다.
  - `dynamic = 'error'`는 `dynamicParams`의 기본값을 `true`에서 `false`로 변경합니다. `generateStaticParams`에서 생성되지 않은 동적 매개 변수에 대해 다시 동적으로 페이지를 렌더링하려면 `dynamicParams = true`를 수동으로 설정하면 됩니다.
- `force-static`: `cookies()`, `headers()`, `useSearchParams()`가 빈 값을 반환하도록 하여 레이아웃 또는 페이지의 데이터를 강제로 정적으로 렌더링하고 캐시합니다.

### [revalidate](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)

레이아웃 또는 페이지의 기본 revalidation time을 설정합니다. 이 옵션은 개별 fetch 요청에 의해 설정된 revalidate 값을 재정의하지 않습니다.

```ts
export const revalidate = false;
// false | 0 | number
```

- `false` (기본값): `revalidate : Infinity` 와 동일하며, 사실상 리소스를 무기한 캐시 하는 것
- `0`: 레이아웃이나 페이지가 항상 동적으로 렌더링된다. 캐시옵션을 설정하지 않은 fetch는 `no-store`로 변경되지만, `force-cache`나 positive revalidate 할경우에는 fetch 요청은 그대로 유지한다.
- `number`(초단위) : 레이아웃이나 페이지의 기본 revalidation frequency를 설정하는 시간

## 13.8 Recap part One

## 13.9 Recap part Two

## 13.10 [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

dynamic route segments와 함께 사용하여 요청 시 on-demand가 아닌 빌드 시점에 **statically generate**를 생성할 수 있습니다.

## 13.11 [dynamicParams](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams)

생성되지 않은 dynamic segment가 방문될 때 발생하는 상황을 제어합니다.

```ts
export const dynamicParams = true; // true | false,
```

- `true`(기본값): `generateStaticParams`에 포함되지 않은 동적 세그먼트가 온디맨드 방식으로 생성됩니다
- `false` : `generateStaticParams`에 포함되지 않은 동적 세그먼트는 404를 반환합니다.

## 13.12 Code Challenge
