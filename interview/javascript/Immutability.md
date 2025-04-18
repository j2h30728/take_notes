# 불변성에 대해 설명하고 왜 불변성을 지켜야 하는가요?

---

불변성은 프로그래밍에서 변수 값이 변경될 수 없는 개념입니다. 자바스크립트에서 변수는 콜스택에 저장되고, 객체나 배열과 같은 변수의 참조 값은 메모리 힙에 저장됩니다. 불변성을 유지하는 것은 변수가 참조하는 객체나 배열이 변경될 때마다, 메모리 힙에서 새로운 객체나 배열을 생성하고 이를 참조하는 새로운 변수를 만드는 것입니다. 그렇게 함으로써 원래의 변수는 변경되지 않습니다.

이러한 불변성을 유지하는 것은 예상 가능하고 신뢰할 수 있는 코드를 만들 수 있습니다. 불변성이 지켜지지 않으면 해당 객체나 배열을 참조하는 코드에 문제가 발생할 수 있습니다. 또한 값이 변경되지 않기 때문에 캐시를 사용할 수 있고, 변경되는 시점을 파악하기 쉬워서 버그를 찾아내고 수정하는 것이 용이하며, 코드의 유지보수성을 높일 수 있습니다.

특히, 리액트에서는 불변성을 지키는 것이 매우 중요합니다. 상태(state)를 변경할 때 이전 상태를 직접적으로 수정하지 않고, 새로운 객체를 만들어서 상태를 갱신해야 합니다.
만약 상태를 직접 수정하면 리액트는 메모리 힙에 있는 데이터를 변경하기 때문에 상태 변경을 감지하지 못하고 리렌더링을 하지 않습니다. 그러나 불변성을 유지하면 리액트는 변경된 부분만 다시 렌더링하고 성능을 향상시킬 수 있습니다.
