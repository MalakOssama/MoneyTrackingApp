import { View, Text, Dimensions, StyleSheet } from "react-native";
import { GraphSummary } from "../components/summary/GraphSummary";
import { BalanceSummary } from "../components/summary/BalanceSummary";
import { useContext } from "react";

export function SummaryScreen() {
  return (
    <>
      <BalanceSummary />
      <GraphSummary />
    </>
  );
}

const styles = StyleSheet.create({});
