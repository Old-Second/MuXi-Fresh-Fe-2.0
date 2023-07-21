import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/homework');
  });

  return <>index</>;
};

export default Main;
