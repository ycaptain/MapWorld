import styled from 'styled-components';
import { Tooltip as AntTooltip } from 'antd';

const Tooltip = styled(AntTooltip)`
  .ant-tooltip-arrow {
    display: none;
  }

  .ant-tooltip-inner {
    border-radius: 15px;
    padding: 8px 24px;
  }
  background: transparent;
`;

export { Tooltip };
