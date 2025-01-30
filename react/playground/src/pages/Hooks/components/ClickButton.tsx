import useClick from "../hooks/useClick";

const ClickButton = () => {
  const sayHello = () => console.log("Hello..");

  const clickRef = useClick<HTMLDivElement>(sayHello);

  return (
    <div>
      <div ref={clickRef}>HELLO CLICK BUTTON</div>
    </div>
  );
};

export default ClickButton;
