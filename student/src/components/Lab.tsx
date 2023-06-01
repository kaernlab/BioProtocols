import React, { useEffect, useState } from 'react';
import { LabStart, LabDoing, LabEnd } from './LabPages';
import Error from './Error';
import { ILabData, ILabProtocols } from '../utils/interfaces';

function Lab(
  {
    data,
    currentPage,
    currentLabId,
    goHome, handleStartLab, handleFinishLab, handleRestartLab,
  }:{
    data: Record<string, ILabData>,
    currentPage: string,
    currentLabId: string,
    goHome: () => void,
    handleFinishLab: () => void,
    handleStartLab: () => void,
    handleRestartLab: () => void
  },
) {
  const [displayData, setDisplayData] = useState<ILabData | undefined>(undefined);

  useEffect(() => {
    if (currentLabId in data) {
      setDisplayData(data[currentLabId]);
    }
  }, []);

  switch (currentPage) {
    case 'LAB_START':
      return (
        <LabStart
          title={displayData?.title || ''}
          labStartBody={displayData?.labStartBody || ''}
          goHome={goHome}
          handleStartLab={handleStartLab}
        />
      );
    case 'LAB_DOING':
      return (
        <LabDoing
          handleSubmit={handleFinishLab}
          labContent={displayData?.labContent as ILabProtocols || ''}
        />
      );
    case 'LAB_FINISHED':
      return (
        <LabEnd
          labEndContent={displayData?.labFinishedBody || ''}
          restartLab={handleRestartLab}
          goHome={goHome}
        />
      );
    default:
      return (
        <Error />
      );
  }
}

export default Lab;
