import { Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import Entry from './components/Entry';
import List from './components/List';
import NavBar from './components/NavBar';


function App() {

  return (
    <Viewport>
      <Content>
        <NavBar />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="entry" element={<Entry />} />
          <Route path="entry/:id" element={<Entry />} />
        </Routes>
      </Content>
    </Viewport>
  );
}

const Viewport = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 400px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
`

export default App;
