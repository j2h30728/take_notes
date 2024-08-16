# **코드 챌린지**

- [**챌린지 템플릿**](https://replit.com/@serranoarevalo/BurlyPhonyProfile#main.py)(클릭!)은 세금 계산기의 코드 입니다. 그러나 코드가 완성되지 않았어요.
- 여러분이 완성해주시면 됩니다!
- 아래와 같은 함수를 생성해주세요.

### **1. `get_yearly_revenue` (연간 매출 계산)**

- `monthly_revenue` (월간 매출)를 인수로 받고, revenue for a year (연간 매출)를 리턴.
- takes `monthly_revenue` and returns revenue for a year.

### **2. `get_yearly_expenses` (연간 비용 계산)**

- `monthly_expenses` (월간 비용)를 인수로 받고, expenses for a year (연간 비용)를 리턴.
- takes `monthly_expenses` returns expenses for a year.

### **3. `get_tax_amount` (세금 계산)**

- `profit` (이익) 를 인수로 받고, `tax_amount` (세금 금액) 를 리턴.
- takes `profit` returns `tax_amount`.

### **4. `apply_tax_credits` (세액 공제 적용)**

- `tax_amount` (세금 금액), `tax_credits` (세액 공제율)를 인수로 받고, amount to discount (할인할 금액)를 리턴.
- takes `tax_amount` and `tax_credits` returns amount to discount.

### **Requirements (요구사항)**

- `get_tax_amount` 함수는 `if/else` 를 사용해야한다.
- 만약 (`if`) `profit`이 100,000 초과이면. 세율은 25% 이다.
- 아닌 경우에는 (`else`). 세율은 15% 이다.
