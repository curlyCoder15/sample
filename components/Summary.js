import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Overlay, Slider } from "react-native-elements";
import * as Progress from "react-native-progress";
import moment from "moment-timezone";

import colors from "../constants/Colors";
import layout from "../constants/Layout";

export function Summary(props) {
  const { total, negative, positive, nuetral } = props;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, paddingBottom: 15 }}>
        Recent Reflection Summary
      </Text>
      <View style={styles.innerContainer}>
        <View style={styles.inner2Container}>
          <View style={styles.barStyle}>
            <FontAwesome name={"smile-o"} color={"green"} size={30} />
            <View
              style={[
                styles.barLength,
                {
                  backgroundColor: "green",
                  height: 140 * (total > 0 ? positive / total : 0)
                }
              ]}
            />
          </View>
          <View style={styles.barStyle}>
            <FontAwesome name={"meh-o"} color={"#ffb300"} size={30} />
            <View
              style={[
                styles.barLength,
                {
                  height: 140 * (total > 0 ? nuetral / total : 0),
                  backgroundColor: "#ffb300"
                }
              ]}
            />
          </View>
          <View style={styles.barStyle}>
            <FontAwesome name={"frown-o"} color={"red"} size={30} />
            <View
              style={[
                styles.barLength,
                {
                  height: 140 * (total > 0 ? negative / total : 0),
                  backgroundColor: "red"
                }
              ]}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            paddingBottom: 20
          }}
        >
          <Text style={{ fontSize: 16 }}>
            You are spending Wisely!! Keep it up!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 30,
    //marginHorizontal: 5,
    paddingVertical: 30,
    borderWidth: 0.2,
    borderColor: "#bbb",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  innerContainer: {
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
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
