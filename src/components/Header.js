import styled from 'styled-components';

import todoLogo from "../assets/logo-todo.svg";

const Container = styled.header`
  width: 100%;
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #0D0D0D;
`;

const Image = styled.img`
  height: 48px;
`;

export default function Header() {
  return (
    <Container>
      <Image src={todoLogo} alt="Todo" />
    </Container>
  )
}