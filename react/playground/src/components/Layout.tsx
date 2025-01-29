import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ROUTE_PATH from "../router/constants";

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Container>
      <Navigation>
        <Navigate $pathname={pathname === ROUTE_PATH.ROOT} onClick={() => navigate(ROUTE_PATH.ROOT)}>
          Home
        </Navigate>
        <Navigate $pathname={pathname === ROUTE_PATH.CALENDAR} onClick={() => navigate(ROUTE_PATH.CALENDAR)}>
          Calendar
        </Navigate>
        <Navigate $pathname={pathname === ROUTE_PATH.DND} onClick={() => navigate(ROUTE_PATH.DND)}>
          Drag and Drop
        </Navigate>
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
