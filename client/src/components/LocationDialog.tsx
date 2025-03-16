import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Survivor } from "../api";
import api from "../utils/apiSetup";

const LocationDialog = (props: {
  survivor: Survivor;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [longitude, setLongitude] = useState<number>(props.survivor.longitude);
  const [latitude, setLatitude] = useState<number>(props.survivor.latitude);

  const handleOk = async () => {
    await api.updateSurvivorSurvivorsPut({
      id: props.survivor!.id,
      longitude,
      latitude,
    });
    props.onSubmit();
    props.onClose();
  };

  return (
    <Dialog open={props.survivor != null} onClose={props.onClose}>
      <DialogTitle align="center">Enter Coordinates</DialogTitle>
      <DialogContent>
        <TextField
          label="Longitude"
          type="number"
          fullWidth
          margin="dense"
          value={longitude}
          onChange={(e) => setLongitude(Number(e.target.value))}
        />
        <TextField
          label="Latitude"
          type="number"
          fullWidth
          margin="dense"
          value={latitude}
          onChange={(e) => setLatitude(Number(e.target.value))}
        />
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

export default LocationDialog;
