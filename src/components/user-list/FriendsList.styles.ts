import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  display: flex,
  flex: 1,
  flex-direction: column,
`;

export const Header = styled.div`
  display: flex,
  flex-direction: row,
  align-items: center,
`;
