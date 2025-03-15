"use client";
import { Box, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Survivor } from "../api";

export default function SurvivorList(props: {
  survivorList: Survivor[];
  fetchSurvivors: () => void;
}) {

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 20,
    },
    { field: "gender", headerName: "Gender", width: 70 },
    {
      field: "latitude",
      headerName: "Latitude",
      type: "number",
      width: 70,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      type: "number",
      width: 90,
    },
    {
      field: "reportedCount",
      headerName: "Reported",
      type: "number",
      width: 90,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "2rem", mb: 2 }}>
        <b>List of survivors</b>
      </Typography>
      <Container>
        <DataGrid columns={columns} rows={props.survivorList} />
      </Container>
    </Box>
  );
}
