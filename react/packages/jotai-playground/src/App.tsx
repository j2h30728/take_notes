import Countries from "./components/Countires";
import CountryForm from "./components/CountryForm";

function App() {
  return (
    <div>
      <h3>내가 가고싶은 나라들</h3>
      <CountryForm />
      <Countries filter={"WANT"} />
      <h3>내가 가본 나라들</h3>
      <Countries filter={"WENT"} />
      <h3>내가 좋아하는 나라들</h3>
      <Countries filter={"LIKE"} />
    </div>
  );
}

export default App;
