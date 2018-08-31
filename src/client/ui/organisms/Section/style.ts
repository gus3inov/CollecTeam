import styled from 'styled-components';

const StyledSection = styled.div`
    animation: Slide 0.26s 0.03s 1 alternate backwards;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    min-height: 100vh;
    
    ${(props: { bg: boolean }) => {
	if (props.bg) {
		return (
			`.section-content {
                    margin-top: 40px;
                    width: 100%;
                    border-radius: 10px
                    background-color: #0a0c0e;
                    box-shadow: 8px 7px 88px -6px rgba(0,0,0,0.75);
                    padding: 30px;
                    min-height: 75vh;
                }`
		);
	} else {
		return (
			`.section-content {
                    margin-top: 40px;
                    width: 100%;
                    padding: 30px;
                }`
		);
	}
}
	}
`;

export default StyledSection;
