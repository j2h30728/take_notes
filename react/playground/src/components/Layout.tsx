import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ROUTE_PATH from "../router/constants";

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ROUTE_PATHS = Object.entries(ROUTE_PATH);
  return (
    <Container>
      <Navigation>
        {ROUTE_PATHS.map(([name, path]) => (
          <Navigate key={name} $pathname={pathname === path} onClick={() => navigate(path)}>
            {name}
          </Navigate>
        ))}
      </Navigation>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 10%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.neutral};
`;

const Wrapper = styled.div`
  margin-left: 10%;
  padding: 30px;
  width: calc(100wh - 10%);
`;

const Navigate = styled.button<{ $pathname: boolean }>`
  color: ${({ theme, $pathname }) => ($pathname ? theme.colors.primary : theme.colors["base-100"])};
  font-size: ${({ theme }) => theme.font.md};
  padding: 10px;
`;
