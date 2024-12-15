import { useState } from "react";
import NavBar from "./view/navbar/NavBar";
import Login from "./view/login/login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
