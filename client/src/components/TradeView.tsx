"use client";
import { useState } from "react";
import { Survivor, TradeRequest } from "../api";
import SurvivorInventory from "./SurvivorInventory";
import api from "../utils/apiSetup";
import { Box, Button, Typography } from "@mui/material";
import { createItemDeltaDict, PRICE_TABLE } from "../utils/utils";

export default function TradeView(props: {
  survivorSelectedForTrade: Survivor;
  survivorAcceptedTrade: Survivor;
  onCloseTradeView: () => void;
}) {
  const [senderItemSelectedForTradeList, setSenderItemSelectedForTradeList] =
    useState<Record<string, number>>({} as Record<string, number>);
  const [
    receiverItemSelectedForTradeList,
    setReceiverItemSelectedForTradeList,
  ] = useState<Record<string, number>>({} as Record<string, number>);

  const [tradeId, setTradeId] = useState(0);

  const nextTrade = () => {
    setTradeId((prevId) => prevId + 1);
  };

  const isTradeButtonActive = () => {
    const senderValue = Object.entries(senderItemSelectedForTradeList).reduce(
      (acc, e) => {
        acc += PRICE_TABLE[e[0]] * e[1];
        return acc;
      },
      0,
    );

    const receiverValue = Object.entries(
      receiverItemSelectedForTradeList,
    ).reduce((acc, e) => {
      acc += PRICE_TABLE[e[0]] * e[1];
      return acc;
    }, 0);

    return senderValue > 0 && senderValue == receiverValue;
  };

  const closeTradeView = () => {
    props.onCloseTradeView();
  };

  const processTrade = async () => {
    await api.tradeInventoryTradePost({
      tradeRequest: {
        senderId: props.survivorSelectedForTrade.id,
        receiverId: props.survivorAcceptedTrade.id,
        itemDeltas: createItemDeltaDict(
          senderItemSelectedForTradeList,
          receiverItemSelectedForTradeList,
        ),
      } as TradeRequest,
    });
    setSenderItemSelectedForTradeList({});
    setReceiverItemSelectedForTradeList({});
    nextTrade();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {" "}
      <Box sx={{ borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h2">Trade View</Typography>
      </Box>
      <SurvivorInventory
        tradeId={tradeId}
        survivor={props.survivorSelectedForTrade}
        itemSelectedForTradeList={senderItemSelectedForTradeList}
        setItemSelectedForTradeList={setSenderItemSelectedForTradeList}
      />
      <SurvivorInventory
        tradeId={tradeId}
        survivor={props.survivorAcceptedTrade}
        itemSelectedForTradeList={receiverItemSelectedForTradeList}
        setItemSelectedForTradeList={setReceiverItemSelectedForTradeList}
      />
      <Button
        size="large"
        variant="contained"
        onClick={() => processTrade()}
        disabled={!isTradeButtonActive()}
      >
        {"Trade"}
      </Button>
      <Button size="large" variant="contained" onClick={() => closeTradeView()}>
        Close
      </Button>
    </Box>
  );
}
