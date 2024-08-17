#14 Optimistic Updates

## 14.0 Introduction

## 14.1 See Posts

### [Atomic number operations](https://www.prisma.io/docs/orm/reference/prisma-client-reference#atomic-number-operations)

- 업데이트 시 원자 연산은 숫자 필드 유형(Float 및 Int)에 사용할 수 있습니다.
- 이 기능을 사용하면 경쟁 조건의 위험 없이 **현재 값**(예: 빼기 또는 나누기)을 기반으로 필드를 업데이트할 수 있습니다.

| Option    | Description                                                 |
| --------- | ----------------------------------------------------------- |
| increment | Adds n to the current value.                                |
| decrement | Subtacts n from the current value.                          |
| multiply  | Multiplies the current value by n.                          |
| divide    | Divides the current value by n.                             |
| set       | Sets the current field value. Identical to { myField : n }. |

```ts
async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}
```

## 14.2 Likes and Dislikes

### [Working with compound IDs and unique constraints](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints)

#### 1. 복합 ID란?

- 복합 ID는 두 개 이상의 필드를 결합하여 하나의 고유한 식별자를 만드는 것을 의미한다.
- 예를 들어, "게시물 ID"와 "사용자 ID"를 결합하여 "좋아요" 테이블에서 각 레코드를 고유하게 식별할 수 있다.

#### 2. Prisma에서 복합 ID 사용하기

Prisma에서는 `@@id` 속성을 사용하여 모델에서 복합 ID를 정의할 수 있습니다.
예를 들어, 다음과 같이 `Like` 모델을 정의할 수 있습니다:

```prisma
model Like {
  postId Int
  userId Int
  User   User @relation(fields: [userId], references: [id])
  Post   Post @relation(fields: [postId], references: [id])

  @@id([postId, userId])
}
```

위의 예에서는 `postId`와 `userId` 두 개의 필드를 결합하여 복합 ID로 설정했습니다.
이 모델에서는 각 `postId`와 `userId`의 조합이 유일하게 존재해야 하며, 이를 통해 데이터베이스에서 특정 레코드를 고유하게 식별할 수 있습니다.

#### 3. 복합 ID를 이용한 쿼리

복합 ID를 이용하여 Prisma에서 다양한 쿼리를 수행할 수 있습니다.

##### **레코드 조회**

복합 ID를 이용해 특정 레코드를 조회할 때는 `findUnique` 메서드를 사용할 수 있습니다:

```typescript
const like = await prisma.like.findUnique({
  where: {
    postId_userId: {
      userId: 1,
      postId: 1,
    },
  },
});
```

##### **레코드 삭제**

복합 ID를 이용해 특정 레코드를 삭제할 때는 `delete` 메서드를 사용할 수 있습니다:

```typescript
const like = await prisma.like.delete({
  where: {
    postId_userId: {
      userId: 1,
      postId: 1,
    },
  },
});
```

##### **레코드 업데이트**

복합 ID를 이용해 특정 레코드를 업데이트할 때는 `update` 메서드를 사용할 수 있습니다:

```typescript
const like = await prisma.like.update({
  where: {
    postId_userId: {
      userId: 1,
      postId: 1,
    },
  },
  data: {
    postId: 2,
  },
});
```

##### **레코드 업서트 (업데이트 또는 생성)**

복합 ID를 이용해 레코드가 존재하면 업데이트하고, 존재하지 않으면 생성할 때는 `upsert` 메서드를 사용할 수 있습니다:

```typescript
await prisma.like.upsert({
  where: {
    postId_userId: {
      userId: 1,
      postId: 1,
    },
  },
  update: {
    userId: 2,
  },
  create: {
    userId: 2,
    postId: 1,
  },
});
```

#### 4. 관계 연결 시 복합 ID 사용하기

다른 모델과의 관계를 정의할 때도 복합 ID를 사용할 수 있습니다.
예를 들어, `User` 모델을 생성하면서 특정 "좋아요" 레코드를 연결할 수 있습니다:

```typescript
await prisma.user.create({
  data: {
    name: "Alice",
    likes: {
      connect: {
        postId_userId: {
          postId: 1,
          userId: 2,
        },
      },
    },
  },
});
```

## 14.3 Cache Tags

`unstable_cache`에서 동적으로 태그 값을 변경하고 싶다면 해당 값을 인자로 받을 수 있는 함수로 래핑하면 된다.

```ts
function getCachedLikeStatus(postId: number) {
  const cachedOperation = unstable_cache(getLikeStatus, ["product-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId);
}
```

## 14.4 [useOptimistic](https://ko.react.dev/reference/react/useOptimistic)

- useOptimistic 는 UI를 낙관적으로 업데이트할 수 있게 해주는 React Hook입니다.

- 좋아요 버튼을 누를때마다 `revalidateTag`를 사용하는 것도 또한 나쁘지 않을 지 모르지만, 서버의 거리나 지연상황을 따져 보았을때 낙관적 업데이트를 통해 서버에서 응답이 오기전에 UI에서 먼저 업데이트를 해주는 것으로 한다.

```ts
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

- useOptimistic은 React Hook으로, 비동기 작업이 진행 중일 때 다른 상태를 보여줄 수 있게 해줍니다. 인자로 주어진 일부 상태를 받아, 네트워크 요청과 같은 비동기 작업 기간 동안 달라질 수 있는 그 상태의 복사본을 반환합니다. 현재 상태와 작업의 입력을 취하는 함수를 제공하고, 작업이 대기 중일 때 사용할 낙관적인 상태를 반환합니다.
- 이 상태는 “낙관적” 상태라고 불리는데, 실제로 작업을 완료하는 데 시간이 걸리더라도 사용자에게 즉시 작업의 결과를 표시하기 위해 일반적으로 사용됩니다.

```ts
import { useOptimistic } from "react";

function AppContainer() {
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    // updateFn
    (currentState, optimisticValue) => {
      // merge and return new state
      // with optimistic value
    }
  );
}
```

#### 매개변수

- **`state`**: 작업이 대기 중이지 않을 때 초기에 반환될 값입니다.
- **`updateFn(currentState, optimisticValue)`**: 현재 상태와 `addOptimistic`에 전달된 낙관적인 값을 취하는 함수로, 결과적인 낙관적인 상태를 반환합니다. 순수 함수여야 합니다. updateFn은 두 개의 매개변수를 취합니다. `currentState`와 `optimisticValue`. 반환 값은 `currentState`와 `optimisticValue`의 병합된 값입니다.

#### 반환값

- **`optimisticState`**: 결과적인 낙관적인 상태입니다. 작업이 대기 중이지 않을 때는 `state`와 동일하며, 그렇지 않은 경우 `updateFn`에서 반환된 값과 동일합니다.
- **`addOptimistic`**: `addOptimistic`는 낙관적인 업데이트가 있을 때 호출하는 디스패치 함수입니다. 어떠한 타입의 `optimisticValue`라는 하나의 인자를 취하며, `state`와 `optimisticValue`로 `updateFn`을 호출합니다.

## 14.5 Recap
