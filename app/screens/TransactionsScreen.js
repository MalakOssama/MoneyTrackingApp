import {
  View,
  Text,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import TransactionListItem from "../components/transactions/TransactionListItem";
import { createContext, useEffect, useState } from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { TransactionInputForm } from "../components/transactions/TransactionInputForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sortByDate } from "../utils/DateHelper";
import { Icon } from "@rneui/themed";
import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function TransactionsScreen() {
  const { allTransactions, setAllTransactions } =
    useContext(TransactionsContext);
  const [transactionsTBD, setTransactionTBD] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    let selectedType;
    if (selectedTypeIndex == 0) {
      setTransactionTBD(allTransactions);
      return;
    }
    switch (selectedTypeIndex) {
      case 1:
        selectedType = "Expenses";
        break;
      case 2:
        selectedType = "Income";
        break;
      default:
        break;
    }
    setTransactionTBD(filterByType(allTransactions, selectedType));
  }, [selectedTypeIndex, allTransactions]);

  function filterByType(array, type) {
    return array.filter((item) => item.type === type);
  }
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("StoredTransactionsList");
      if (value !== null) {
        setAllTransactions(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, paddingbottom: 60 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            const returnedList = sortByDate(
              transactionsTBD,
              isAscending ? "desc" : "asc"
            );
            setIsAscending((isAscendingOld) => !isAscendingOld);
            setTransactionTBD(returnedList);
          }}
          hitSlop={15}
        >
          <Icon name="sort" type="font-awesome" size={24} color="gray" />
        </TouchableOpacity>
        <SegmentedControlTab
          values={["All", "Expenses", "Income"]}
          selectedIndex={selectedTypeIndex}
          onTabPress={setSelectedTypeIndex}
          tabsContainerStyle={{
            width: 280,
            justifyContent: "flex-end",
            alignSelf: "flex-end",
          }}
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 60 }}
        data={transactionsTBD}
        renderItem={({ item }) => <TransactionListItem transaction={item} />}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              hitSlop={15}
              style={{ alignSelf: "flex-end", marginBottom: 20 }}
              onPress={() => setIsModalVisible(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
            <TransactionInputForm
              closeModal={() => setIsModalVisible(false)}
              allTransactions={allTransactions}
              setAllTransactions={setAllTransactions}
            />
          </View>
        </SafeAreaView>
      </Modal>
      <TouchableOpacity
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "#0671e0",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setIsModalVisible(true)}
      >
        <Icon name="plus" type="font-awesome" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
