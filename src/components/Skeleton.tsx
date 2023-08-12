import React from 'react';
import { css } from '@emotion/react'; 
import styled from '@emotion/styled'; 

const SkeletonContainer = styled.div` // Wrap the div with the styled function
  background-color: #ddd;
  width: 100%;
  height: 100%;
  animation: skeleton-loading 1.5s infinite ease-in-out;

  @keyframes skeleton-loading {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const Skeleton: React.FC = () => {
  return <SkeletonContainer />; 
};

export default Skeleton;
