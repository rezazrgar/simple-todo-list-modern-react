import React from "react";
import TodoList from "./todos/TodoList";
import styled from "styled-components";

const AppContainer = styled.div`
    margin: 1rem;
    font-family: Arial;
    color: #222222;
    width: 100vw;
    height: 100vh;
`;


function App() {
  return (
    <AppContainer>
      <TodoList />
    </AppContainer>
  );
}

export default App;
