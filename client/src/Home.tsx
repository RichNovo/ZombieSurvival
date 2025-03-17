"use client";
import { useState, useEffect } from "react";
import api from "./utils/apiSetup";
import TradeView from "./components/TradeView";
import { Box, Button } from "@mui/material";
import AddSurvivorForm from "./components/AddSurvivorForm";
import { SurvivorRow } from "./utils/utils";
import SurvivorList from "./components/SurvivorList";
import SurvivorInventory from "./components/SurvivorInventory";

export default function Home() {
  const [survivorList, setSurvivorList] = useState<SurvivorRow[]>([]);

  const [survivorSelectedForTrade, setSurvivorSelectedForTrade] =
    useState<SurvivorRow | null>(null);
  const [survivorAcceptedTrade, setSurvivorAcceptedTrade] =
    useState<SurvivorRow | null>(null);
  const [showInventoryForUser, setShowInventoryForUser] =
    useState<SurvivorRow | null>(null);

  if (
    survivorSelectedForTrade != null &&
    survivorList.some((e) => e.id == survivorSelectedForTrade.id) == false
  ) {
    setSurvivorSelectedForTrade(null);
  }

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

  const closeTradeView = () => {
    setSurvivorSelectedForTrade(null);
    setSurvivorAcceptedTrade(null);
  };

  return survivorSelectedForTrade != null && survivorAcceptedTrade != null ? (
    <div>
      <TradeView
        survivorSelectedForTrade={survivorSelectedForTrade}
        survivorAcceptedTrade={survivorAcceptedTrade}
        onCloseTradeView={closeTradeView}
      />
    </div>
  ) : showInventoryForUser != null ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <SurvivorInventory
        tradeId={0}
        itemSelectedForTradeList={null}
        setItemSelectedForTradeList={() => {}}
        survivor={showInventoryForUser}
      />
      <Button
        size="large"
        variant="contained"
        onClick={() => setShowInventoryForUser(null)}
      >
        Close
      </Button>
    </Box>
  ) : (
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
            survivorSelectedForTrade={survivorSelectedForTrade}
            setSurvivorSelectedForTrade={setSurvivorSelectedForTrade}
            survivorAcceptedTrade={survivorAcceptedTrade}
            setSurvivorAcceptedTrade={setSurvivorAcceptedTrade}
            setShowInventoryForUser={setShowInventoryForUser}
          />
        </Box>
      </Box>
    </div>
  );
}
