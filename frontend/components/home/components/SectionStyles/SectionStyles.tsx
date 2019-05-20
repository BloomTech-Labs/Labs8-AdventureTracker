import styled from "styled-components";
//@ts-ignore
import vars from "lib/styles/variables";
const InfoSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${vars.light_blue};
  height: 100vh;
  width: 100%;
  padding: 0 ${vars.space_xl};
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  & > * {
    margin-bottom: ${vars.space_xl};
  }
`;

const Title = styled.button`
  background: ${vars.orange};
  padding: 0.6em;
  font-size: 6.4rem;
  border: none;
  min-width: 500px;
`;

const Description = styled.p`
  font-size: 3.2rem;
`;

export {InfoSection, TextContent, Title, Description};
