import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";

export function Header(props) {
  return (
    <View style={{ width: "100%" }}>
      {!props.network && (
        <View
          style={{
            width: "100%",
            paddingTop: 40,
            marginBottom: -30,
            backgroundColor: "red",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 15 }}>No Network</Text>
        </View>
      )}
      <View style={styles.container}>
        {(props.backButton == false ? false : true) && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => props.back()}
          >
            <Ionicons name="ios-arrow-back" size={35} color="#52BEB3" />
          </TouchableOpacity>
        )}
        <Text style={styles.headText}>{props.headerText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  backButton: { paddingHorizontal: 20, paddingRight: 10 },
  headText: {
    fontSize: 24,
    color: colors.headTextColor,
    flex: 1
  },
  notificationStyle: {
    flex: 1,
    alignItems: "flex-end"
  }
});
