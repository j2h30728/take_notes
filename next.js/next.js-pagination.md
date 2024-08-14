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

## 10.8 Recap

## 10.9 Infinite Scrolling

## 10.10 Recap
