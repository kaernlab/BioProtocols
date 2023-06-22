import React from 'react';
import { BackToDashboardButton } from '../Style/Styled';

function LabNew(
  { handleGoHome }
  :
  {
    handleGoHome: () => void
  },
) {
  return (
    <div>
      <BackToDashboardButton onClick={handleGoHome} />
    </div>
  );
}

export default LabNew;
