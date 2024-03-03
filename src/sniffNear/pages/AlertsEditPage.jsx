import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const AlertsEditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();


  return (
    <div>AlertEditPage</div>
  )
}
