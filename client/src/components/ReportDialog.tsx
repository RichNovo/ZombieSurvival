import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Survivor } from "../api";
import api from "../utils/apiSetup";

const ReportDialog = (props: {
  reportedSurvivor: Survivor;
  survivorList: Array<Survivor>;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [reportingSurvivor, setReportingSurvivor] = useState<
    Survivor | undefined
  >(undefined);

  const handleOk = async () => {
    if (!reportingSurvivor) {
      return;
    }
    const successfulReport = await await api.reportSurvivorSurvivorsReportPut({
      reportingSurvivorId: reportingSurvivor.id,
      reportedSurvivorId: props.reportedSurvivor!.id,
    });

    props.onSubmit();
    props.onClose();

    if (successfulReport == false) {
      alert("Reporting survivor already reported the selected survivor");
    }
  };

  return (
    <Dialog open={props.reportedSurvivor != null} onClose={props.onClose}>
      <DialogTitle align="center">Report survivor</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Name of the reporting survivor"
          name="report"
          value={reportingSurvivor ? reportingSurvivor.id : ""}
          sx={{ width: "300px" }} // Set fixed width
          onChange={(e) =>
            setReportingSurvivor(
              props.survivorList.find((s) => s.id == Number(e.target.value)),
            )
          }
          fullWidth
          required
        >
          {props.survivorList
            .filter((s) => s.id != props.reportedSurvivor?.id)
            .map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
