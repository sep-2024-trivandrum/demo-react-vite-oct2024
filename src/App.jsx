import { Fragment } from "react";
import Display from "./components/Display";
import Color from "./components/Color";
import Person from "./components/Person";
import ColorObjectArray from "./components/FruitObjectArray";
import FruitObjectArray from "./components/FruitObjectArray";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ActorList from "./components/actor/ActorList";
import ProductList from "./components/product/ProductList";
function App() {
  return (
    <>
      <h2>This is App Component!</h2>
      {/* <Display></Display> */}
      {/* <Color></Color> */}
      {/* <Person></Person> */}
      {/* <FruitObjectArray></FruitObjectArray> */}
      {/* <ActorList></ActorList> */}
      {<ProductList></ProductList>}
    </>
  );
}

export default App;
