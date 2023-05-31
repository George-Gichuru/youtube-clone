import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  font-weight: 900;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 50%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  flex: 2;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Navbar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    console.log(search);

    const handleSubmit = () => {
        if (search === "") return;
        navigate(`/search/${search}`)
    }

    return (
        <Container>
            <Wrapper>
                <Search>
                    <Input 
                       placeholder='Search...'
                       name='search'
                       value={search}
                       onChange={(e) => setSearch(e.target.value)} />

                       <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "grey",
                            justifyContent: "center",
                            borderRadius: "15px",
                            padding: "2px",
                            
                        }}
                        onClick={handleSubmit}
                        >
                            <SearchOutlinedIcon />

                       </div>

                </Search>
                <Link to="signin" style={{ TextDecoration: "none" }}>
                    <Button>
                        <AccountCircleOutlinedIcon/>
                        SIGNIN
                    </Button>
                </Link>
            </Wrapper>
        </Container>
    )
}

export default Navbar
