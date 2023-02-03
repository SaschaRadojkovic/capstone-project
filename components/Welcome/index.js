import styled from "styled-components";

const WelcomeWrapper = styled.div`
  top: 200px;
  z-index: 5;
  text-align: center;
`;

export function Welcome() {
  return (
    <WelcomeWrapper>
      <h1>Welcome to Eatable</h1>
      <p>first go to the settings page </p>
    </WelcomeWrapper>
  );
}
