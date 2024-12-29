import { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import PieChart from "react-native-pie-chart";
import { TransactionsContext } from "../../contexts/TransactionsContext";
const screenWidth = Dimensions.get("window").width;

export function GraphSummary() {
  const { allTransactions } = useContext(TransactionsContext);
  const [expensesByCategory, setExpensesByCategory] = useState([
    { label: { text: "Food" }, value: 20, color: "#fbd203" },
    { label: { text: "Shopping" }, value: 10, color: "#66bb6a" },
    { label: { text: "Entertainment" }, value: 40, color: "#2196f3" },
    { label: { text: "Travel" }, value: 90, color: "#9c27b0" },
  ]);

  useEffect(() => {
    calculateExpensesByCategory();
  }, [allTransactions]);

  var categoryTotals = [
    { label: { text: "Food" }, value: 20, color: "#fbd203" },
    { label: { text: "Shopping" }, value: 10, color: "#66bb6a" },
    { label: { text: "Entertainment" }, value: 40, color: "#2196f3" },
    { label: { text: "Travel" }, value: 90, color: "#9c27b0" },
  ];
  function calculateExpensesByCategory() {
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
    console.log(categoryTotals[0].value);
    console.log(categoryTotals[1].value);
    console.log(categoryTotals[2].value);
    console.log(categoryTotals[3].value);

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
