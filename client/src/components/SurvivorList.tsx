"use client";
import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import LocationDialog from "./LocationDialog";
import ReportDialog from "./ReportDialog";
import { Survivor } from "../api";
import { SurvivorRow } from "../utils/utils";

export default function SurvivorList(props: {
  survivorList: Survivor[];
  fetchSurvivors: () => void;
  survivorSelectedForTrade: SurvivorRow | null;
  setSurvivorSelectedForTrade: (survivor: SurvivorRow | null) => void;
  survivorAcceptedTrade: SurvivorRow | null;
  setSurvivorAcceptedTrade: (survivor: SurvivorRow | null) => void;
  setShowInventoryForUser: (selectedSurvivor: SurvivorRow) => void;
}) {
  const [editingSurvivor, setEditingSurvivor] = useState<SurvivorRow | null>(
    null,
  );

  const [reportingSurvivor, setReportingSurvivor] =
    useState<SurvivorRow | null>(null);

  if (
    props.survivorSelectedForTrade != null &&
    props.survivorList.some(
      (e) => e.id == props.survivorSelectedForTrade!.id,
    ) == false
  ) {
    props.setSurvivorSelectedForTrade(null);
  }

  const isInfected = (survivor: SurvivorRow) => {
    return survivor.reportedCount > 2;
  };

  const onTradeClick = (survivor: SurvivorRow) => {
    if (props.survivorSelectedForTrade == null) {
      props.setSurvivorSelectedForTrade(survivor);
    } else {
      if (props.survivorSelectedForTrade.id == survivor.id) {
        props.setSurvivorSelectedForTrade(null);
      } else {
        props.setSurvivorAcceptedTrade(survivor);
      }
    }
  };

  const isTradeOfferActive = (survivor: Survivor) => {
    return (
      props.survivorSelectedForTrade != null &&
      props.survivorSelectedForTrade.id != survivor.id
    );
  };

  const isSelectedForTrade = (survivor: Survivor) => {
    return (
      props.survivorSelectedForTrade != null &&
      props.survivorSelectedForTrade.id == survivor.id
    );
  };

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
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 350,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => setEditingSurvivor(row)}
            color="inherit"
          />,
          <Button
            variant="contained"
            color={isSelectedForTrade(row) ? "success" : "inherit"}
            onClick={() => onTradeClick(row)}
            disabled={isInfected(row)}
          >
            {isInfected(row)
              ? "Trade"
              : isTradeOfferActive(row)
                ? "Accept Trade"
                : "Trade"}
          </Button>,
          <Button
            variant="contained"
            onClick={() => setReportingSurvivor(row)}
            disabled={isInfected(row)}
            color={isInfected(row) ? "warning" : "inherit"}
          >
            {isInfected(row) ? "Infected" : "Report"}
          </Button>,
          <Button
            variant="contained"
            onClick={() => props.setShowInventoryForUser(row)}
            disabled={isInfected(row)}
          >
            Inventory
          </Button>,
        ];
      },
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
        {editingSurvivor && (
          <LocationDialog
            survivor={editingSurvivor}
            onClose={() => setEditingSurvivor(null)}
            onSubmit={() => props.fetchSurvivors()}
          />
        )}
        {reportingSurvivor && (
          <ReportDialog
            reportedSurvivor={reportingSurvivor}
            survivorList={props.survivorList}
            onClose={() => setReportingSurvivor(null)}
            onSubmit={() => props.fetchSurvivors()}
          />
        )}
        <DataGrid columns={columns} rows={props.survivorList} />
      </Container>
    </Box>
  );
}
