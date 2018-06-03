import styled from 'styled-components';

const StyledSection = styled.div`
    animation: Slide 0.26s 0.03s 1 alternate backwards;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    
    .section-content{
        padding-top: 40px;
        width: 100%;
    }
`;

export default StyledSection;
