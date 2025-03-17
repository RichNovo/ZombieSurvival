"use client";
import { useEffect, useState } from "react";
import { InventoryItem, Survivor } from "../api";
import api from "../utils/apiSetup";
import { Box, Container, TextField, Typography } from "@mui/material";

export default function SurvivorInventory(props: {
  tradeId: number;
  survivor: Survivor;
  itemSelectedForTradeList: Record<string, number> | null;
  setItemSelectedForTradeList: (
    selectedItemArray: Record<string, number>,
  ) => void;
}) {
  const [itemList, setItemList] = useState<InventoryItem[]>([]);
  const [amountToTrade, setAmountToTrade] = useState<Record<string, number>>(
    {},
  );

  const fetchInventory = async (survivor: Survivor) => {
    const newItemList = await api.getSurvivorInventoryInventoryGet({
      suvivorId: survivor.id,
    });
    setItemList(newItemList);
    const initialTradeAmount = [
      ...new Set<string>(newItemList.map((i) => i.itemType)),
    ].reduce(
      (acc, key) => {
        acc[key] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );
    setAmountToTrade(initialTradeAmount);
  };

  const updateTradeOffer = (itemType: string, amount: number) => {
    const newOffer = { ...amountToTrade, [itemType]: Number(amount) };
    setAmountToTrade(newOffer);
    props.setItemSelectedForTradeList(newOffer);
  };

  useEffect(() => {
    fetchInventory(props.survivor);
  }, [props.tradeId]);

  itemList.sort();
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Box sx={{ p: 1, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            <b>{props.survivor.name}</b> 's Inventory
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 5 }}>
          {itemList.map((item) => {
            return (
              <Box
                key={item.itemType}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {item.itemType}:<b> {item.amount}</b>
                  </Typography>
                </Box>
                {props.itemSelectedForTradeList != null && (
                  <Box>
                    <TextField
                      label={"Amount to trade"}
                      name={item.itemType}
                      type="number"
                      value={amountToTrade[item.itemType]}
                      onChange={(e) =>
                        updateTradeOffer(e.target.name, Number(e.target.value))
                      }
                      required
                      slotProps={{
                        htmlInput: { min: 0, max: item.amount },
                      }}
                    />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
}
