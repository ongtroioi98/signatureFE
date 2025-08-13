import { Button, Input } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colorSuccess};
`;
export function Counter() {
  const [count, setCount] = useState(0);
  console.log('counter render....');
  return (
    <Wrapper>
      <Input
        value={count}
        css={`
          color: red;
        `}
      />
      <Button color="primary" onClick={() => setCount((prev) => ++prev)}>
        AAAA
      </Button>
    </Wrapper>
  );
}
export default React.memo(Counter);
