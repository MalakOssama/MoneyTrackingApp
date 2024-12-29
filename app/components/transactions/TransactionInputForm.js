import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import SegmentedControlTab from "react-native-segmented-control-tab";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function TransactionInputForm({
  closeModal,
  allTransactions,
  setAllTransactions,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState([
    { label: "Food", value: "Food" },
    { label: "Shopping", value: "Shopping" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Travel", value: "Travel" },
  ]);
  const [incomeCategories, setIncomeCategories] = useState([
    { label: "Investment", value: "Investment" },
    { label: "Salary", value: "Salary" },
    { label: "Bonus", value: "Bonus" },
    { label: "Allowance", value: "Allowance" },
    { label: "Part-time", value: "Part-time" },
  ]);
  const [transaction, setTransaction] = useState({
    id: Math.floor(Math.random() * Date.now()).toString(16),
    amount: "",
    category: "",
    description: "",
    date: new Date(),
    type: "",
  });
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const handleSave = () => {
    if (transaction.category === "") {
      Alert.alert("Error", "Category cannot be empty.");
    } else if (transaction.amount === "") {
      Alert.alert("Error", "Amount cannot be empty.");
    } else {
      storeData();
      closeModal();
    }
  };
  const storeData = async () => {
    try {
      const isExpense = selectedTypeIndex === 0;
      const newTransactionValue = {
        ...transaction,
        type: isExpense ? "Expenses" : "Income",
        amount: isExpense
          ? (Number(transaction.amount) * -1).toString()
          : transaction.amount,
      };
      setTransaction(newTransactionValue);
      await AsyncStorage.setItem(
        "StoredTransactionsList",
        JSON.stringify([newTransactionValue, ...allTransactions])
      );
      setAllTransactions((oldTransactions) => [
        newTransactionValue,
        ...oldTransactions,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <SegmentedControlTab
          values={["Expenses", "Income"]}
          selectedIndex={selectedTypeIndex}
          onTabPress={setSelectedTypeIndex}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.label}>Category:</Text>
          <Text style={{ color: "red", fontSize: 30 }}>*</Text>
        </View>
        {selectedTypeIndex === 0 ? (
          <DropDownPicker
            open={open}
            value={value}
            items={expenseCategories}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setExpenseCategories}
            onChangeValue={(selectedValue) => {
              setValue(selectedValue);
              setTransaction((old) => ({ ...old, category: selectedValue }));
            }}
          />
        ) : (
          <DropDownPicker
            open={open}
            value={value}
            items={incomeCategories}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setIncomeCategories}
            onChangeValue={(selectedValue) => {
              setValue(selectedValue);
              setTransaction((old) => ({ ...old, category: selectedValue }));
            }}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={{ color: "red", fontSize: 30 }}>*</Text>
        </View>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={transaction.amount}
          onChangeText={(text) => {
            setTransaction((old) => ({ ...old, amount: text }));
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={transaction.description}
          onChangeText={(text) => {
            setTransaction((old) => ({ ...old, description: text }));
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#0671e0",
          width: "100%",
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          handleSave();
        }}
      >
        <Text style={{ fontSize: 18, color: "white" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});
