import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { AppNavigation } from "./app/navigation/AppNavigation";
import { createContext, useState } from "react";
import { TransactionsContext } from "./app/contexts/TransactionsContext";
export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);

  return (
    <TransactionsContext.Provider
      value={{ allTransactions, setAllTransactions }}
    >
      <StatusBar style="dark" />
      <AppNavigation />
    </TransactionsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
