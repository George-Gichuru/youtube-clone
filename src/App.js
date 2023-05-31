import { useState } from "react";
import styled, {ThemeProvider} from "styled-components";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";

import Menu from "./components/Menu";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Feed from "./pages/Feed";
import Search from "./pages/Search";

import { darkTheme, lightTheme } from "./utils/Theme";


const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 20px;
`;

function App() {
const [darkMode, setDarkMode] = useState(lightTheme);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container>
      <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" />
                  <Route index element={<Home/>}/>
                  <Route path="signin" element={<SignIn />}/>
                  <Route path="feed/:name" element={<Feed />}/>
                  <Route path="search/:searchTerm" element={<Search />}/>
                  <Route path="video">
                    <Route path=":id" element={<Video />}/>
                  </Route>
              </Routes>
            </Wrapper>
          </Main>
      </BrowserRouter>
    </Container>
    </ThemeProvider>
  )
}

export default App;
