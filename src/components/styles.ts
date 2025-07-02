import styled from "styled-components";

export const ContainerMusic = styled.div`
display: flex;
flex-direction: column;

align-items: center;
justify-content: center;

background: #281c34;
padding: 1.3rem;
border-radius: 25px;
img {
    border-radius: 13px;
}
`

export const ContainerName = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 1rem;
color: aliceblue;

p {
    color: #d3d3d3;
}
`

export const ContainerPlay = styled.div`
margin-top: 2rem;
width: 100%;
align-items: center;
display: flex;
flex-direction: column;
gap: 1.5rem;
`

export const ContainerSeek = styled.div<{ $progress: number }>`
  margin-top: 8px;
  height: 8px;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ $progress }) => $progress}%;
    height: 100%;
    background-color: #ec539f;
    border-radius: 4px;
  }
`;

export const ButtonsContent = styled.div`
display: flex;
gap: 0.5rem;

.main-button {
    background: none;
    border: none;
    color: #737373;
    cursor: pointer;
}
`

export const ButtonPlayer = styled.button`
display: inherit;
  background: #d43e8f;
  color: aliceblue;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 1rem 1rem;
  border-radius: 50px;
  cursor: pointer;

&:hover {
    
}
`;
