# 10 Pagination - Products

## 10.0 Introduction

## 10.1 Tab Bar

- [Heroicons](https://heroicons.com/)

## 10.2 Skeletons

### [Loading](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

```tsx
export default function Loading() {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex gap-5 ">
          <div className="size-40 bg-neutral-700" />
          <div className="flex flex-col gap-2 *:rounded-md *:bg-neutral-700">
            <div className="h-5 w-40" />
            <div className="h-5 w-20" />
            <div className="h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

## 10.3 Product Component

## 10.4 Detail Skeleton

#### [Intl.RelativeTimeFormat](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat)

```ts
export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}
```

## 10.5 Product Detail

## 10.6 Image Hostnames

### [`next/image` Un-configured Host](https://nextjs.org/docs/messages/next-image-unconfigured-host#possible-ways-to-fix-it)

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};
```

## 10.7 Pagination Actions

### MOCK Data 추가 - [Faker 라이브러리](https://fakerjs.dev/api/)

#### prisma/sees.js

```js
const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  for (let i = 0; i < 100; i++) {
    await prisma.tweet.create({
      data: {
        price: +faker.commerce.price({ min: 10000, max: 1000000 }),
        tweet: faker.commerce.productDescription(),
        title: faker.commerce.productName(),
        photo: faker.image.urlPicsumPhotos(),
        created_at: new Date(),
        user: {
          connect: {
            id: 3,
          },
        },
      },
    });
  }
})();
```

#### package.json

```json
  "prisma": {
    "seed": "node prisma/seed.js"
  }
```

#### npx prisma db seed

## 10.8 Recap

## 10.9 Infinite Scrolling

## 10.10 Recap

### offset 기반 페이지네이션 구현

#### 페이지네이션 prisma 코드

```ts
"use server";

import db from "@/utils/db";

const LIMIT_NUMBER = 2;
export async function getTweetsByPage(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: LIMIT_NUMBER * (page - 1),
    take: LIMIT_NUMBER,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function getTweetTotalCount() {
  return db.tweet.count();
}

export async function getPaginatedTweets(page: number) {
  const tweets = await getTweetsByPage(page);
  const TWEETS_TOTAL_COUNT = await getTweetTotalCount();

  const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_NUMBER * page;
  return { tweets, isLastPage };
}
```

#### 페이지네이션을 부르는 tweet-list 컴포넌트

```tsx
"use client";

import { getPaginatedTweets } from "@/app/(tabs)/actions";
import { InitialTweets } from "@/app/(tabs)/page";
import { useEffect, useState } from "react";
import ListTweet from "./list-tweet";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function TweetList({ initialTweets }: { initialTweets: InitialTweets }) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const fetchMoreTweet = async () => {
      const { tweets, isLastPage } = await getPaginatedTweets(page);
      setIsLastPage(isLastPage);
      setTweets(tweets);
    };
    fetchMoreTweet();
  }, [page]);

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        {tweets.map((product) => (
          <ListTweet key={product.id} {...product} />
        ))}
      </div>
      <div className="w-full max-w-screen-sm flex bottom-32 fixed mx-auto gap-10 items-center justify-center">
        <button
          className="disabled:text-stone-200"
          onClick={() => setPage((prev) => (prev === 1 ? prev : prev - 1))}
          disabled={page === 1}>
          <ChevronLeftIcon width={20} height={20} />
        </button>
        <span>{page}</span>
        <button
          className="disabled:text-stone-200"
          onClick={() => setPage((prev) => (isLastPage ? prev : prev + 1))}
          disabled={isLastPage}>
          <ChevronRightIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
```
