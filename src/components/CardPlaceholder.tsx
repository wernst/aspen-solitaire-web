import styled from "styled-components";
import {
  CARD_BORDER_RADIUS,
  CARD_HEIGHT,
  CARD_WIDTH,
} from "../style-constants";

const StyledPlacehodler = styled.div`
  height: ${CARD_HEIGHT};
  width: ${CARD_WIDTH};
  border-radius: ${CARD_BORDER_RADIUS};
  border: ${(props) => `${props.theme.colors.placeholder} solid 3px`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CardPlaceholder({
  message,
  style = {},
}: {
  message?: string;
  style?: any;
}) {
  return (
    <StyledPlacehodler>
      <div style={{ ...style }}>{message}</div>
    </StyledPlacehodler>
  );
}
