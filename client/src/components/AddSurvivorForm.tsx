import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import api from "../utils/apiSetup";
import { Survivor } from "../api";

const defaultSurvivor: Survivor = {
  id: 0,
  name: "",
  age: 0,
  gender: "",
  latitude: 0,
  longitude: 0,
};

const defaultItemAmount: Record<string, number> = {
  Water: 0,
  Food: 0,
  Medication: 0,
  Ammunition: 0,
};

const AddSurvivorForm = (props: { fetchSurvivors: () => void }) => {
  const [survivor, setSurvivor] = useState<Survivor>(defaultSurvivor);

  const [itemAmount, setItemAmount] =
    useState<Record<string, number>>(defaultItemAmount);
  const [errors, setErrors] = useState({ latitude: "", longitude: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurvivor({ ...survivor, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemAmount({ ...itemAmount, [e.target.name]: Number(e.target.value) });
  };

  const validateCoordinates = () => {
    const newErrors = { latitude: "", longitude: "" };
    const lat = survivor.latitude;
    const lon = survivor.longitude;

    if (isNaN(lat) || lat < -90 || lat > 90) {
      newErrors.latitude = "Latitude must be between -90 and 90";
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
      newErrors.longitude = "Longitude must be between -180 and 180";
    }

    setErrors(newErrors);
    return !newErrors.latitude && !newErrors.longitude;
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemTypeAndAmountDict = itemAmount;

    if (validateCoordinates()) {
      await api.createSurvivorSurvivorsPost({
        createSurvivorRequest: { survivor, itemTypeAndAmountDict },
      });
      setSurvivor(defaultSurvivor);
      setItemAmount(defaultItemAmount);
      props.fetchSurvivors();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          m: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            <b>Register New Survivor</b>
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <TextField
              label="Name"
              value={survivor.name}
              name="name"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={survivor.age}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0 }}
              sx={{ flex: "1 1 48%" }}
            />
            <TextField
              select
              label="Gender"
              name="gender"
              value={survivor.gender}
              onChange={handleChange}
              fullWidth
              required
              sx={{ flex: "1 1 48%" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              label="Latitude"
              name="latitude"
              type="number"
              value={survivor.latitude}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.latitude}
              helperText={errors.latitude}
              sx={{ flex: "1 1 48%" }}
            />
            <TextField
              label="Longitude"
              name="longitude"
              type="number"
              value={survivor.longitude}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.longitude}
              helperText={errors.longitude}
              sx={{ flex: "1 1 48%" }}
            />
            {Object.keys(itemAmount).map((e) => {
              return (
                <TextField
                  key={e}
                  label={e}
                  name={e}
                  type="number"
                  value={itemAmount[e]}
                  onChange={handleItemChange}
                  fullWidth
                  required
                  inputProps={{ min: 0 }}
                  sx={{ flex: "1 1 48%" }}
                />
              );
            })}
          </Box>
          <Button
            data-testid="submit-button"
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddSurvivorForm;
