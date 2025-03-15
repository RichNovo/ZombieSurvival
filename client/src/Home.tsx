"use client";
import { useState, useEffect } from "react";
import api from "./utils/apiSetup";
import { Box } from "@mui/material";
import AddSurvivorForm from "./components/AddSurvivorForm";
import { SurvivorRow } from "./utils/utils";
import SurvivorList from "./components/SurvivorList";

export default function Home() {
  const [survivorList, setSurvivorList] = useState<SurvivorRow[]>([]);

  useEffect(() => {
    fetchSurvivors();
  }, []);

  const fetchSurvivors = async () => {
    const survivorsListReply = await api.getSurvivorsSurvivorsGet();
    setSurvivorList(
      survivorsListReply.survivorsWithReported.map((s) => {
        return { ...s[0], reportedCount: s[1] };
      }),
    );
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AddSurvivorForm fetchSurvivors={fetchSurvivors} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SurvivorList
            survivorList={survivorList}
            fetchSurvivors={fetchSurvivors}
          />
        </Box>
      </Box>
    </div>
  );
}
