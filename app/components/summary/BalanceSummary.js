import { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TransactionsContext } from "../../contexts/TransactionsContext";

export function BalanceSummary() {
  const [balanceSummary, setBalanceSummary] = useState({
    expenses: 0,
    income: 0,
  });

  const { allTransactions } = useContext(TransactionsContext);

  useEffect(() => {
    calculateMonthlyTotals();
  }, [allTransactions]);
  function calculateMonthlyTotals() {
    const today = new Date();
    const currentMonth = today.getMonth();

    let totalIncome = 0;
    let totalExpenses = 0;

    allTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate.getMonth() === currentMonth) {
        if (transaction.type === "Income") {
          totalIncome += Number(transaction.amount);
        } else if (transaction.type === "Expenses") {
          totalExpenses += Number(transaction.amount);
        }
      }
    });
    setBalanceSummary({
      expenses: totalExpenses,
      income: totalIncome,
    });
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>{new Date().getFullYear()}</Text>
        <Text style={styles.content}>
          {new Date().toLocaleDateString("en-US", { month: "short" })}
        </Text>
      </View>
      <View>
        <Text style={styles.header}>Expenses</Text>
        <Text style={styles.content}>
          {balanceSummary.expenses
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      <View>
        <Text style={styles.header}>Income</Text>
        <Text style={styles.content}>
          {balanceSummary.income
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
      <View>
        <Text style={styles.header}>Balance</Text>
        <Text style={styles.content}>
          {(balanceSummary.income + balanceSummary.expenses)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#4B4A49",
  },
  header: {
    color: "grey",
    fontSize: 15,
  },
  content: {
    color: "white",
    fontSize: 20,
  },
});
