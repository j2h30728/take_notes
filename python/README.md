# Python

## Challenges

### [#3 계산기](./challenges/#3/)

### [#4 세금 계산기](./challenges/#4/)

### [#5 영화 데이터 가져오기(with. OOP)](./challenges/#5/)

### [#6 Scraper 만들기(with. OOP)](./challenges/#6/)

---

## 코드리뷰로 배운 파이썬 개념들

### 1. 제너레이터 표현식 (Generator Expression)

```python
title, overview, vote_average = (movie_data.get(key) for key in ('title', 'overview', 'vote_average'))
```

- **제너레이터 표현식**은 리스트 컴프리헨션과 비슷하지만, 대괄호(`[]`) 대신 소괄호(`()`)를 사용합니다. 제너레이터 표현식은 메모리를 절약하며, 필요할 때 값을 생성하는 방식으로 동작합니다.
- 위의 코드는 `('title', 'overview', 'vote_average')`라는 튜플의 각 항목에 대해 `movie_data.get(key)`를 호출하여, 그 결과를 순차적으로 생성합니다.

### 2. 튜플 언패킹 (Tuple Unpacking)

```python
title, overview, vote_average = (movie_data.get(key) for key in ('title', 'overview', 'vote_average'))
```

- **튜플 언패킹**은 여러 개의 값을 가진 튜플이나 리스트를 변수들에 한 번에 할당하는 문법입니다.
- 제너레이터 표현식에서 반환된 값들을 `title`, `overview`, `vote_average`라는 변수에 한 번에 할당합니다.

`for i, movie_id in enumerate(movie_ids):`는 파이썬의 **`enumerate`** 함수를 활용한 문법입니다. 이 문법은 리스트, 튜플, 또는 다른 반복 가능한 객체를 반복하면서 동시에 현재 아이템의 인덱스와 값을 가져올 때 사용됩니다.

### 3. `enumerate` 함수

- `enumerate` 함수는 반복 가능한 객체(리스트, 튜플 등)를 입력으로 받아, 각 요소에 대해 인덱스와 그 요소를 함께 반환하는 이터레이터를 생성합니다.
- 즉, `enumerate(movie_ids)`는 `movie_ids` 리스트의 각 요소와 그에 해당하는 인덱스를 쌍으로 반환합니다.

- **`for i, movie_id in enumerate(movie_ids):`**:
  - `i`: 리스트 `movie_ids`의 현재 요소의 인덱스 값입니다. `0`부터 시작합니다.
  - `movie_id`: 리스트 `movie_ids`의 현재 요소 값입니다.
  - 이 문법을 통해 `movie_ids` 리스트를 반복하면서 동시에 현재 요소의 인덱스(`i`)와 값을(`movie_id`) 가져올 수 있습니다.

#### 예시:

```python
movie_ids = [238, 680, 550]
for i, movie_id in enumerate(movie_ids):
    print(f"Index: {i}, Movie ID: {movie_id}")
```

이 코드의 출력은 다음과 같습니다:

```
Index: 0, Movie ID: 238
Index: 1, Movie ID: 680
Index: 2, Movie ID: 550
```

### 4. 멀티 리턴

멀티 리턴은 여러 개의 값을 한 번에 반환할 때 유용합니다. 파이썬에서는 하나의 함수에서 여러 값을 반환할 때, 일반적으로 튜플 형태로 반환하며, 함수 호출부에서 이를 여러 변수로 나누어 받을 수 있습니다.

```python
def regame():
    a = int(input("Choose a number:\n"))
    b = int(input("Choose another one:\n"))
    operation = input(
        "Choose an operation:\n    Options are: + , - , * or /.\n    Write 'exit' to finish.\n"
    )
    return a, b, operation  # 세 개의 값을 한 번에 반환
```

- **`return a, b, operation`**:
  - 이 구문은 `a`, `b`, `operation` 세 개의 값을 튜플로 한 번에 반환합니다.
  - 함수 호출 시 `regame()`은 `(a, b, operation)` 형태의 튜플을 반환하게 됩니다.

#### 함수 호출 및 값의 언패킹:

- 함수 호출 시 반환된 튜플은 아래와 같이 개별 변수에 언패킹(Unpacking)되어 할당됩니다:

```python
a, b, operation = regame()  # 튜플의 값을 각 변수에 나누어 할당
```

- 여기서 `a`, `b`, `operation` 각각에 `regame()` 함수의 리턴 값이 차례로 들어갑니다.

네, `print("Result: {0}".format(result))`에서 사용된 것은 파이썬의 **문자열 포매팅(String Formatting)** 기능입니다. 이 기능은 문자열 안에 변수를 삽입하거나, 특정 형식으로 데이터를 표현할 때 사용됩니다.

### 5. `str.format()` 메서드를 이용한 문자열 포매팅

- **`"{0}".format()` 구문**은 문자열 안에 변수를 삽입하기 위한 방법 중 하나입니다.
- `{0}`은 포매팅할 값이 삽입될 위치를 의미하며, `format()` 메서드의 첫 번째 인자를 해당 위치에 삽입합니다.

#### 예시:

```python
result = 42
print("Result: {0}".format(result))
```

이 코드는 `"Result: 42"`라는 문자열을 출력합니다.

- `{0}`: `format()` 메서드의 첫 번째 인자인 `result`의 값 `42`가 이 위치에 들어갑니다.
- `format(result)`: `result` 값을 `{0}`에 넣어 문자열을 생성합니다.

#### 인덱스와 여러 개의 값:

- `{0}`, `{1}`, `{2}` 등으로 포매팅 위치를 지정할 수 있습니다.
- `format()` 메서드에 여러 인자를 전달하여, 각 인자를 해당 위치에 삽입할 수 있습니다.

```python
name = "Alice"
age = 30
print("Name: {0}, Age: {1}".format(name, age))
```

이 코드는 `"Name: Alice, Age: 30"`를 출력합니다.

- `{0}`: `format()`의 첫 번째 인자인 `name`이 이 위치에 들어갑니다.
- `{1}`: `format()`의 두 번째 인자인 `age`가 이 위치에 들어갑니다.

#### 포매팅의 장점:

1. **가독성**: 코드가 더 읽기 쉬워집니다.
2. **유연성**: 여러 개의 변수를 하나의 문자열로 표현할 때 유용합니다.
3. **순서 제어**: `{0}`, `{1}` 등을 사용하여 인자의 순서를 재조정할 수 있습니다.

#### 다른 문자열 포매팅 방법들:

파이썬에는 문자열 포매팅을 할 수 있는 여러 가지 방법이 있습니다:

1. **% 포맷팅**:

   ```python
   print("Name: %s, Age: %d" % (name, age))
   ```

2. **f-string (파이썬 3.6 이상)**:
   ```python
   print(f"Name: {name}, Age: {age}")
   ```

`f-string` 방식은 최신 방식이며, 가장 간결하고 성능도 좋아 많이 사용됩니다.

람다 함수(Lambda Function)는 파이썬에서 익명 함수(이름이 없는 함수)를 만들 때 사용하는 문법입니다. 람다 함수는 보통 간단한 연산이나 기능을 수행할 때 유용하게 사용됩니다.

### 6. 람다 함수의 기본 문법

람다 함수는 다음과 같은 형태로 작성됩니다:

```python
lambda 매개변수1, 매개변수2, ... : 표현식
```

- **`lambda`**: 람다 함수를 정의하기 위한 키워드입니다.
- **매개변수들**: 함수에 전달될 입력 값들입니다. 일반 함수처럼 여러 개의 매개변수를 가질 수 있습니다.
- **표현식**: 매개변수들을 이용한 연산이나 기능을 나타내는 표현식으로, 이 결과값이 람다 함수의 반환값이 됩니다.

#### 예시

```python
# 일반적인 함수 정의
def add(a, b):
    return a + b

# 람다 함수로 정의
add_lambda = lambda a, b: a + b

# 사용
print(add(2, 3))        # 출력: 5
print(add_lambda(2, 3)) # 출력: 5
```

위의 코드에서 `add` 함수와 `add_lambda` 람다 함수는 동일한 역할을 합니다. 둘 다 두 숫자를 더한 값을 반환합니다.

#### 장점과 사용 사례

람다 함수는 다음과 같은 상황에서 자주 사용됩니다:

1. **간단한 함수 정의**: 코드가 간결해집니다. 한 줄로 표현할 수 있는 간단한 함수를 정의할 때 유용합니다.
2. **함수 내부에서 즉시 사용**: 일회성 함수나 특정 함수의 인자로 함수를 전달할 때 사용합니다. 예를 들어, 정렬 기준을 정의할 때 많이 사용됩니다.

   ```python
   numbers = [(1, 2), (3, 4), (5, 0)]
   sorted_numbers = sorted(numbers, key=lambda x: x[1])
   print(sorted_numbers)  # 출력: [(5, 0), (1, 2), (3, 4)]
   ```

   여기서 `lambda x: x[1]`은 각 튜플의 두 번째 요소를 기준으로 정렬하겠다는 의미입니다.

#### 예시 (연산자 딕셔너리)

```python
OPERATORS = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b if b != 0 else "Cannot divide by zero",
}
```

- 이 예시는 기본적인 산술 연산을 수행하는 람다 함수를 딕셔너리에 저장한 것입니다.
- 각 연산자 (`+`, `-`, `*`, `/`)에 대해 람다 함수를 정의하여, 두 숫자를 입력받아 그에 해당하는 연산을 수행합니다.
- 특히, `/` 연산자의 경우 `b`가 `0`이 아닐 때만 나누기를 수행하며, 그렇지 않으면 `"Cannot divide by zero"`라는 메시지를 반환합니다.

### 7.`match`-`case` 문법 : 패터 매칭

`match`-`case`는 파이썬 3.10에서 도입된 **패턴 매칭** 기능입니다.
값을 조건에 따라 매칭하고, 그에 따라 다양한 코드를 실행할 수 있는 구조화된 방법을 제공합니다. 패턴 매칭은 복잡한 조건을 보다 간결하고 명확하게 처리할 수 있도록 돕습니다.

#### 기본 문법

```python
match value:
    case pattern1:
        # pattern1과 value가 일치할 때 실행할 코드
    case pattern2:
        # pattern2와 value가 일치할 때 실행할 코드
    case _:
        # 위의 어떤 패턴과도 일치하지 않을 때 실행할 코드
```

#### 주요 요소

- **`match value:`**: 매칭할 값을 지정합니다. 이 값이 각각의 `case` 블록에서 정의된 패턴과 비교됩니다.
- **`case pattern:`**: `match`로 지정된 값이 이 패턴과 일치하는 경우, 해당 `case` 블록이 실행됩니다.
- **`case _:`**: 밑줄(`_`)은 "기타 모든 경우"를 의미합니다. 앞서 정의한 패턴들과 일치하지 않는 경우 이 블록이 실행됩니다.

#### 예시 1: 간단한 숫자 매칭

```python
def number_type(n):
    match n:
        case 0:
            return "Zero"
        case 1:
            return "One"
        case _:
            return "Other"

print(number_type(0))  # 출력: Zero
print(number_type(1))  # 출력: One
print(number_type(2))  # 출력: Other
```

#### 예시 2: 튜플 매칭

```python
def process_point(point):
    match point:
        case (0, 0):
            return "Origin"
        case (0, y):
            return f"Y-axis at {y}"
        case (x, 0):
            return f"X-axis at {x}"
        case (x, y):
            return f"Point at ({x}, {y})"
        case _:
            return "Unknown point"

print(process_point((0, 0)))  # 출력: Origin
print(process_point((0, 5)))  # 출력: Y-axis at 5
print(process_point((3, 0)))  # 출력: X-axis at 3
print(process_point((3, 4)))  # 출력: Point at (3, 4)
```

#### 예시 3: 클래스와 속성 매칭

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def describe_point(pt):
    match pt:
        case Point(0, 0):
            return "Origin"
        case Point(x, 0):
            return f"X-axis at {x}"
        case Point(0, y):
            return f"Y-axis at {y}"
        case Point(x, y):
            return f"Point at ({x}, {y})"
        case _:
            return "Unknown point"

p = Point(3, 4)
print(describe_point(p))  # 출력: Point at (3, 4)
```

#### 패턴 매칭의 장점

1. **가독성**: 복잡한 `if`-`elif`-`else` 조건문보다 더 가독성이 좋습니다.
2. **다양한 패턴 지원**: 숫자, 튜플, 리스트, 객체 등 다양한 타입의 패턴을 지원합니다.
3. **명확한 구조**: 패턴에 따라 코드를 구조화할 수 있어 코드의 흐름이 명확해집니다.
