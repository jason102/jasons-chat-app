import React from 'react';
import styled, { keyframes } from 'styled-components';

// Got this from https://codepen.io/mattonit/pen/vLoddq
const waveAnimation = keyframes`
  0%, 60%, 100% {
    transform: initial;
  }

  30% {
    transform: translateY(-15px);
  }
`;

const Wave = styled.div`
  position: absolute;
  bottom: 50px;
  text-align: center;
  height: 30px;
  padding-left: 10px;

  .dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 3px;
    background: #303131;
    animation: ${waveAnimation} 1.3s linear infinite;

    &:nth-child(2) {
      animation-delay: -1.1s;
    }

    &:nth-child(3) {
      animation-delay: -0.9s;
    }
  }
`;

const BouncingDots: React.FC = () => (
  <Wave>
    <span className='dot'></span>
    <span className='dot'></span>
    <span className='dot'></span>
  </Wave>
);

export default BouncingDots;
