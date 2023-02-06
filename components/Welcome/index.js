import styled from "styled-components";

const WelcomeWrapper = styled.div`
  margin-top: 5rem;
  margin: 5rem;
  margin-left: 5rem;
  margin-right: 4rem;
  text-align: right;
`;
const StyledHeading = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;
const StyledPararaph = styled.p`
  background: red;
  padding: 1rem;
  text-align: center;
  opacity: 0.8;
`;

export function Welcome() {
  return (
    <>
      <WelcomeWrapper>
        <StyledHeading>Herzlich Willkommen bei Eatable</StyledHeading>
        <p>
          Diese App dient dazu Nahrungsmittel mit einem simplen Barcodescan
          <br />
          nach unerwünschten Zusatzstoffen/
          <br />
          Additiven oder bestimmten Allergenen zu durchsuchen.
          <br />
          wählen Sie in den Einstellungen Ihr &quot;Kryptonit&quot; .
        </p>
      </WelcomeWrapper>
      <StyledPararaph>
        Es besteht immer die Möglichkeit, dass Daten über Allergene fehlen,
        unvollständig oder falsch sind oder dass sich die Zusammensetzung des
        Produkts geändert hat. Wenn Sie allergisch sind, überprüfen Sie immer
        die Angaben auf der tatsächlichen Produktverpackung.
      </StyledPararaph>
    </>
  );
}
