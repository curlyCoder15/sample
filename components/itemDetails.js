import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Overlay, Slider } from "react-native-elements";
import * as Progress from "react-native-progress";
import moment from "moment-timezone";

import colors from "../constants/Colors";
import layout from "../constants/Layout";

export function ItemDetails(props) {
  const { total, negative, positive, nuetral } = props;

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 30, alignItems: "center" }}>
        <Text style={{ fontSize: 30 }}>{props.merchant_name}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 17 }}>{props.date}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17 }}>$ {props.amount}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => props.onClick("POSITIVE")}>
          <FontAwesome name={"smile-o"} size={50} color={"green"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onClick("NUETRAL")}>
          <FontAwesome name={"meh-o"} size={50} color={"#ffb300"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.onClick("NEGATIVE")}>
          <FontAwesome name={"frown-o"} size={50} color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 30,
    padding: 20
  },
  buttonContainer: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inner2Container: {
    marginVertical: 20,
    paddingVertical: 30,
    alignItems: "flex-end",
    flexDirection: "row",
    width: "85%",
    justifyContent: "center"
  },
  barStyle: {
    width: "15%",
    marginHorizontal: 20,
    alignItems: "center"
  },
  barLength: {
    width: "100%"
  }
});
