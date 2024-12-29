import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formattedDate } from "../../utils/DateHelper";

const TransactionListItem = ({ transaction }) => {
  const date = new Date(transaction.date);
  return (
    <View>
      <Text style={{ paddingHorizontal: 10 }}> {formattedDate(date)}</Text>
      <View style={styles.separator} />
      <View style={styles.itemContainer}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {transaction.category}
          </Text>
          <Text>{transaction.description}</Text>
        </View>
        <View>
          <Text style={{ color: transaction.amount > 0 ? "green" : "red" }}>
            {transaction.amount > 0 && "+"}
            {transaction.amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 2,
  },
});

export default TransactionListItem;
