import { Box } from "@mui/material";
import React from "react";

function Error() {
  return (
    <Box>
      <Box typography="h6">
        Some unknown error has occured
      </Box>
      <Box typography="body">
        Please see your instructor
      </Box>
    </Box>
  )
}

export default Error;