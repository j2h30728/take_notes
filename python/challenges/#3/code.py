while True:
    try:
        a = float(input("Choose a number:\n"))
        b = float(input("Choose another one:\n"))
    except ValueError:
        print("Please enter a valid number.")
        continue

    operation = input(
        "Choose an operation:\n    Options are: + , - , * or /.\n Write 'exit' to finish.\n"
    )

    if (operation == 'exit'):
        break
    if (operation == '+'):
        print("Result:", a + b)
    elif (operation == '-'):
        print("Result:", a - b)
    elif (operation == '*'):
        print('Result:', a * b)
    elif (operation == '/'):
        try:
            print("Result:", a / b)
        except ZeroDivisionError:
            print('0 으로 나누지 마세요!!')
    else:
        print("잘못된 입력입니다. +, -, *, /, 'exit' 중에 골라주세요")
