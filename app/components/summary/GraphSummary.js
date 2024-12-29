import { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import PieChart from "react-native-pie-chart";
import { TransactionsContext } from "../../contexts/TransactionsContext";
const screenWidth = Dimensions.get("window").width;

export function GraphSummary() {
  const { allTransactions } = useContext(TransactionsContext);
  const [expensesByCategory, setExpensesByCategory] = useState([
    { label: { text: "Food" }, value: 10, color: "#fbd203" },
    { label: { text: "Shopping" }, value: 10, color: "#66bb6a" },
    { label: { text: "Entertainment" }, value: 10, color: "#2196f3" },
    { label: { text: "Travel" }, value: 10, color: "#9c27b0" },
  ]);

  useEffect(() => {
    calculateExpensesByCategory();
  }, [allTransactions]);

  function calculateExpensesByCategory() {
    var categoryTotals = [
      { label: { text: "Food" }, value: 0, color: "#fbd203" },
      { label: { text: "Shopping" }, value: 0, color: "#66bb6a" },
      { label: { text: "Entertainment" }, value: 0, color: "#2196f3" },
      { label: { text: "Travel" }, value: 0, color: "#9c27b0" },
    ];
    allTransactions.forEach((transaction) => {
      if (transaction.type === "Expenses") {
        const categoryIndex = categoryTotals.findIndex(
          (item) => item.label.text === transaction.category
        );
        if (categoryIndex !== -1) {
          categoryTotals[categoryIndex].value +=
            Number(transaction.amount) * -1;
        }
      }
    });

    setExpensesByCategory(categoryTotals);
  }

  return (
    <View style={styles.container}>
      <PieChart widthAndHeight={250} series={expensesByCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 40,
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});
