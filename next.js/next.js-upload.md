# 11 Upload

## 11.0 Introduction

## 11.1 Form Action

### [URL.createObjectURL()](https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL_static)

- **브라우저에 저장되는 객체 링크 생성**:
  - 이 메서드는 `Blob`, `File`, `MediaSource`와 같은 객체를 가리키는 URL을 생성합니다. 이 URL은 브라우저의 메모리에 저장된 객체를 참조하므로, 로컬 파일이나 동적으로 생성된 데이터를 웹에서 접근할 수 있도록 합니다.
  - **프리뷰 이미지 링크를 생성할 때 사용**:
    - 파일 입력(input)을 통해 선택된 이미지를 미리 보기 위해 자주 사용됩니다. 사용자가 선택한 이미지를 `createObjectURL`을 통해 생성된 URL을 사용하여 `<img>` 태그의 `src` 속성에 설정할 수 있습니다.

### [URL.revokeObjectURL()](https://developer.mozilla.org/ko/docs/Web/API/URL/revokeObjectURL_static)

- **브라우저 메모리 누수를 방지하고자 사용하지 않는 객체 링크를 삭제할 때 사용**:
  - `createObjectURL`을 통해 생성된 URL은 브라우저의 메모리에 객체를 유지합니다. 이 객체를 더 이상 사용하지 않게 되면, 메모리 누수를 방지하기 위해 `revokeObjectURL`을 호출하여 메모리에서 해당 객체를 해제할 수 있습니다.
  - 주로 이미지나 비디오의 미리보기 작업이 끝난 후에 해당 URL을 삭제하기 위해 사용됩니다.

#### action.ts

```ts
export async function uploadTweet(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  console.log(data);
}
```

#### AddTweets

- `!files` : 이미지 파일이 없을 경우
- `file.type.includes("image")` : 사용자가 등록한 파일이 이미지 타입이 아닐경우
- `file.size > 4 * 1024 * 1024` : 사용자가 등록한 이미지 파일이 4MB 가 넘을 경우

```tsx
export default function AddTweets() {
  const [preview, setPreview] = useState("");

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return alert("파일이 없다!");
    const file = files[0];
    if (!file.type.includes("image")) return alert("이미지 파일만 업로드 가능합니다.");
    if (file.size > 4 * 1024 * 1024) return alert("크기가 4MB를 초과하는 이미지는 업로드 할 수 없습니다.");
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  return (
    <div>
      <form action={uploadTweet} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${preview})` }}
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer">
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">사진을 추가해주세요.</div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
        <FormInput name="title" type="text" required placeholder="제목" />
        <FormInput name="price" type="number" required placeholder="가격" />
        <FormInput name="tweet" type="text" required placeholder="자세한 설명" />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
}
```

## 11.2 Product Upload

### [fs.appendFile(path, data[, options], callback)](https://nodejs.org/api/fs.html#fsappendfilepath-data-options-callback)

- [`fs.appendFile()`](https://www.geeksforgeeks.org/node-js-fs-appendfile-function/) 함수는 Node.js에서 파일에 데이터를 비동기적으로 추가하는 함수
- 파일이 존재하지 않으면 새로 생성하며, 데이터는 문자열 또는 버퍼 형태로 추가할 수 있습니다.

##### 매개변수

- **path**: 파일 경로를 지정하며, 문자열, 버퍼, URL, 또는 파일 디스크립터로 제공됩니다.
- **data**: 파일에 추가할 데이터로, 문자열 또는 버퍼로 지정됩니다.
- **options**: 인코딩(`utf8` 등), 파일 권한(`mode`), 파일 시스템 플래그(`flag`) 등을 설정할 수 있습니다.
- **callback**: 작업 완료 후 호출되는 콜백 함수로, 에러가 발생한 경우 이를 처리합니다.

```javascript
import { appendFile } from "node:fs";

appendFile("message.txt", "data to append", (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
```

- `message.txt` 파일에 `'data to append'`를 추가하며, 파일이 없으면 생성됩니다.

#### 로컬 public 폴더에 이미지 추가

- [ArrayBuffer](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
  - ArrayBuffer 객체는 일반적인 원시 바이너리 데이터 버퍼를 표현하는 데 사용됩니다.
- [Static method: Buffer.from(buffer)](https://nodejs.org/api/buffer.html#static-method-bufferfrombuffer)
  - [Node.js Buffer.from() Method](https://www.w3schools.com/nodejs/met_buffer_from.asp)
  - `Buffer.from()` 메서드는 지정된 문자열, 배열 또는 버퍼로 채워진 새 버퍼를 생성합니다.

```ts
if (data.photo instanceof File) {
  const photoData = await data.photo.arrayBuffer();
  await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
  data.photo = `/${data.photo.name}`;
}
```

```ts
"use server";

import db from "@/utils/db";
import { tweetSchema } from "@/utils/schema";
import { getSession } from "@/utils/session";
import fs from "fs/promises";
import { redirect } from "next/navigation";

export async function uploadTweet(_: unknown, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    tweet: formData.get("tweet"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
  const session = await getSession();
  if (session.id) {
    const tweet = await db.tweet.create({
      data: {
        photo: result.data.photo,
        title: result.data.title,
        price: result.data.price,
        tweet: result.data.tweet,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    redirect(`/tweets/${tweet.id}`);
  }
}
```

```ts
export const tweetSchema = z.object({
  photo: z.string({
    required_error: "이미지는 필수 값입니다.",
  }),
  title: z.string({
    required_error: "제목은 필수 값입니다.",
  }),
  tweet: z.string({
    required_error: "자세한 설명은 필수 값입니다.",
  }),
  price: z.coerce.number({
    required_error: "가격은 필수 값입니다.",
  }),
});
```

## 11.3 Images Setup

## 11.4 Upload URLs

### [Request a one-time upload URL](https://developers.cloudflare.com/images/upload-images/direct-creator-upload/#request-a-one-time-upload-url)

- Cloudflare에서 이미지를 업로드할 수 있는 "껍데기"에 해당하는 일회성 업로드 URL을 요청합니다.
- 이 URL은 생성된 시점부터 30분 동안 유효하며, 그 시간 내에 사용하지 않으면 만료됩니다.

```ts
export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
```

```ts
const [upload, setUpload] = useState("");

//....

const { success, result } = await getUploadUrl();
if (success) {
  const { id, uploadUrl } = result;
  setUpload(uploadUrl);
}
```

## 11.5 Image Upload

1. 사용자가 폼을 제출하면
2. 껍데기인 one-time upload URL에 이미지를 보내 반환받은 uploadURL로 POST요청을 보내, 실제로 cloudflare에 등록한다.
3. 그후, 반환받은 image Id 값과 cloudflare의 이미지 제공 URL에 이미지를 결합하여 데이터 베이스에 저장
   - 이미지 요청시 variants 추가 필요

```tsx
import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadTweet } from "./actions";
import { useFormState } from "react-dom";

export default function AddTweets() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setPhotoId] = useState("");

  // 사용자가 이미지를 교체할 때 실행
  // 이미지를 계속 교체하여도 일회용 URL(30분만료기한)이 발급되기 때문에 상관없다.
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return alert("파일이 없다!");
    const file = files[0];
    if (!file.type.includes("image")) return alert("이미지 파일만 업로드 가능합니다.");
    if (file.size > 4 * 1024 * 1024) return alert("크기가 4MB를 초과하는 이미지는 업로드 할 수 없습니다.");
    const url = URL.createObjectURL(file);
    setPreview(url);

    // 임시 일회용 URL 껍데기 발급
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL); // 껍데기 uploadURL
      setPhotoId(id); // 껍데기 id
    }
  };

  // 서버에 트윗이 등록되는 로직인 uploadTweet이 실행하기전에 cloudflare에 이미지를 등록한다.
  const interceptAction = async (_: unknown, formData: FormData) => {
    const file = formData.get("photo"); // 사용자가 선택한 이미지가 File 타입으로 들어가 있다.
    if (!file) return alert("파일이 없다!");

    // cloudflare에 이미지를 등록하는 로직
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    // 이전에 발급받은 임시 일회용 껍데기 URL에 등록한 이미지를 body값으로 post요청을 보낸다.
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) return;

    // 이미지 사용시 계정마다 다른 이미지 제공 URL와 image Id 값을 결합하여 사용
    const photoUrl = `https://imagedelivery.net/wLHa2XjZzk_8Ca42_eTQww/${photoId}`;
    // 이미지 url로 교체하여 트위을 업로드하는 서버로직으로 전달
    formData.set("photo", photoUrl);
    return uploadTweet(_, formData);
  };

  const [state, action] = useFormState(interceptAction, null);

  return (
    <div>
      <form action={action} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          style={{ backgroundImage: `url(${preview})` }}
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover ">
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">{state?.fieldErrors.photo ?? "사진을 추가해주세요."}</div>
            </>
          ) : null}
        </label>
        <input onChange={onImageChange} type="file" id="photo" name="photo" accept="image/*" className="hidden" />
        <FormInput name="title" type="text" required placeholder="제목" errorMessage={state?.fieldErrors.title} />
        <FormInput name="price" type="number" required placeholder="가격" errorMessage={state?.fieldErrors.price} />
        <FormInput
          name="tweet"
          type="text"
          required
          placeholder="자세한 설명"
          errorMessage={state?.fieldErrors.tweet}
        />
        <FormButton text="작성 완료" />
      </form>
    </div>
  );
}
```

## 11.6 Variants

## 11.7 Recap

## 11.8 RHF Refactor

### [React Hook Form](https://react-hook-form.com)

```bash
npm install react-hook-form

```

### [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)

```bash
npm i @hookform/resolvers

```

### zod [Type inference](https://zod.dev/?id=type-inference)

- Zod는 타입스크립트에서 스키마 기반의 유효성 검사를 수행하는 라이브러리
- Zod를 사용하면 스키마로부터 타입을 추론할 수 있다.

#### 기본적인 타입 추론

Zod 스키마에서 타입을 추론하려면 `z.infer<typeof mySchema>`를 사용

```typescript
export type UploadTweetType = z.infer<typeof tweetSchema>;

const A = z.string();
type A = z.infer<typeof A>; // A는 string 타입으로 추론

const u: A = 12; // TypeError: 12는 string 타입이 아니다.
const u: A = "asdf"; // 정상적으로 컴파일됨
```

#### 변환(Transforms)에 대한 타입 추론

- Zod에서는 스키마에 변환을 추가할 수 있다.
- 변환을 사용하면 입력 타입과 출력 타입이 다를 수 있다.
- 예를 들어, `z.string().transform(val => val.length)` 스키마는 문자열을 입력받아 숫자(문자열의 길이)를 출력한다.

이 경우, Zod 스키마는 내부적으로 두 가지 타입을 추적한다:

- **입력 타입 (input type)**: 스키마가 입력으로 받을 수 있는 타입
- **출력 타입 (output type)**: 스키마가 출력하는 타입

```typescript
const stringToNumber = z.string().transform((val) => val.length);

// 입력 타입을 추출합니다.
type input = z.input<typeof stringToNumber>; // string

// 출력 타입을 추출합니다.
type output = z.output<typeof stringToNumber>; // number

// `z.infer`는 출력 타입을 반환합니다!
type inferred = z.infer<typeof stringToNumber>; // number
```

- `z.infer`가 **출력 타입**을 반환한다는 것이다. 즉, `z.infer`는 `z.output`과 동일한 결과를 반환한다.

## 11.9 Recap
