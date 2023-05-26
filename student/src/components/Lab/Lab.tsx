import React, { useEffect, useState } from "react";
import LabDoing from './LabDoing';
import LabStart from "./LabStart";
import LabEnd from "./LabEnd";
import Error from '../Error';
import jsonData from '../../data/data.json';
import { ILabData, ILabProtocols } from '../../utils/interfaces';

function Lab(
  {
    currentPage,
    currentLabId,
    goHome, handleStartLab, handleFinishLab, handleRestartLab }:
    {
      currentPage: string,
      currentLabId: string,
      goHome: () => void,
      handleFinishLab: () => void,
      handleStartLab: () => void,
      handleRestartLab: () => void
    }) {

  const [ILabData, setILabData] = useState<ILabData | undefined>(undefined);

  useEffect(() => {
    // Get this from API. Ensure that this HTML is **TRUSTED** in API
    const temp = jsonData as Record<string, ILabData>;

    console.log(temp);
    if (currentLabId in temp) {
      setILabData({ ...temp[currentLabId] })
      console.log("Now viewing info of labID: ", currentLabId)
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