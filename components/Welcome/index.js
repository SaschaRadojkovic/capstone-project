import styled from "styled-components";

const WelcomeWrapper = styled.div`
  //   margin-top: 100px;
  margin: 100px;
  //   margin-left: 10px;
  text-align: right;
`;

export function Welcome() {
  return (
    <WelcomeWrapper>
      <h1>Herzlich Willkommen bei Eatable</h1>
      <p>
        Diese App dient dazu Nahrungsmittel mit einem simplem Barcodescan
        <br />
        nach unerwünschten Zusatzstoffen/
        <br />
        Additiven oder bestimmten Allergenen zu durchsuchen.
        <br />
        wählen Sie in den Einstellungen Ihr &quot;Kryptonit&quot; .
      </p>
    </WelcomeWrapper>
  );
}
