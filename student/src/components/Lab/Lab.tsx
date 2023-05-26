import React, { useEffect, useState } from "react";
import LabDoing from './LabDoing';
import LabStart from "./LabStart";
import LabEnd from "./LabEnd";
import Error from '../Error';
import { ILabData, ILabProtocols } from '../../utils/interfaces';

function Lab(
  {
    data,
    currentPage,
    currentLabId,
    goHome, handleStartLab, handleFinishLab, handleRestartLab }:
    {
      data: Record<string, ILabData>,
      currentPage: string,
      currentLabId: string,
      goHome: () => void,
      handleFinishLab: () => void,
      handleStartLab: () => void,
      handleRestartLab: () => void
    }) {

  const [ILabData, setILabData] = useState<ILabData | undefined>(undefined);

  useEffect(() => {
    if (currentLabId in data) {
      setILabData({ ...data[currentLabId] })
    }
  }, [])

  return (
    <div>
      {
        currentPage === 'LAB_START' ? (
          <LabStart
            title={ILabData?.title || ""}
            labStartBody={ILabData?.labStartBody || ""}
            goHome={goHome}
            handleStartLab={handleStartLab}
          />
        ) : currentPage === 'LAB_DOING' ? (
          <LabDoing
            handleSubmit={handleFinishLab}
            labContent={ILabData?.labContent as ILabProtocols}
          />
        ) : currentPage === 'LAB_FINISHED' ? (
          <LabEnd
            labEndContent={ILabData?.labFinishedBody || ""}
            restartLab={handleRestartLab}
            goHome={goHome}
          />
        ) : (
          <Error />
        )
      }
    </div>
  )
}

export default Lab;