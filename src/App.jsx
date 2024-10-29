import { Fragment } from "react";
import Display from "./components/Display";
import Color from "./components/Color";
import Person from "./components/Person";
import ColorObjectArray from "./components/FruitObjectArray";
import FruitObjectArray from "./components/FruitObjectArray";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ActorList from "./components/actor/ActorList";
import ProductList from "./components/product/ProductList";
import ButtonClick from "./components/ButtonClick";
import Counter from "./components/Counter";
import PersonClick from "./components/PersonClick";
import MovieName from "./components/MovieName";
import InputDemo from "./components/InputDemo";
import EcomList from "./components/ecommerce/EcomList";
import EcomAdd from "./components/ecommerce/EcomAdd";
import EcomEdit from "./components/ecommerce/EcomEdit";
import EcomAddValidation from "./components/ecommerce/EcomAddValidation";
import EcomAddValidationRef from "./components/ecommerce/EcomAddValidationRef";
import TodoList from "./components/todo-app/TodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import HeaderApp from "./components/HeaderApp";
function App() {
  return (
    <>
      {/* <h2>This is App Component!</h2> */}
      {/* <Display></Display> */}
      {/* <Color></Color> */}
      {/* <Person></Person> */}
      {/* <FruitObjectArray></FruitObjectArray> */}
      {/* <ActorList></ActorList> */}
      {/* {<ProductList></ProductList>} */}
      {/* <ButtonClick></ButtonClick> */}
      {/* <Counter></Counter> */}
      {/* <PersonClick></PersonClick> */}
      {/* <MovieName></MovieName> */}
      {/* <InputDemo></InputDemo> */}
      {/* <EcomList></EcomList> */}
      {/* <EcomAdd></EcomAdd> */}
      {/* <EcomEdit></EcomEdit> */}
      {/* <InputDemo></InputDemo> */}
      {/* <EcomAddValidation></EcomAddValidation> */}
      {/* <EcomAddValidationRef></EcomAddValidationRef> */}
      {/* <TodoList></TodoList> */}

      <BrowserRouter>
        <HeaderApp></HeaderApp>
        <Routes>
          <Route path="/" element={<Counter />}></Route>
          <Route path="/todo" element={<TodoList />}></Route>
          <Route path="/fruit-list" element={<FruitObjectArray />}></Route>
          <Route path="/ecom-list" element={<EcomList />}></Route>
          <Route path="/actor-list" element={<ActorList />}></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
