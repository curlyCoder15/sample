import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";

export class Pie extends Component {
  // const { labelWidth, selectedSlice } = this.state;

  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: "",
        value: 0
      },
      labelWidth: 0
    };
  }
  render() {
    const { label, value } = this.state.selectedSlice;
    const keys = this.props.keys;
    const values = this.props.values;
    const colors = this.props.colors;
    const data = keys.map((key, index) => {
      return {
        key,
        value: values[index],
        svg: { fill: colors[index] },
        arc: { outerRadius: label === key ? "100%" : "95%", padAngle: 0.01 },
        onPress: () => {
          if (label === key) {
            this.props.onClick("");
            this.setState({ selectedSlice: { label: "", value: 0 } });
          } else {
            this.props.onClick(key);
            this.setState({
              selectedSlice: { label: key, value: values[index] }
            });
          }
        }
      };
    });

    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 30,
          justifyContent: "center"
        }}
      >
        {this.props.check == 0 ? (
          <View style={{ alignItems: "center" }}>
            <Text>No data to show</Text>
          </View>
        ) : (
          <PieChart
            style={{ height: 200, width: "90%" }}
            outerRadius={"100%"}
            innerRadius={"40%"}
            data={data}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", marginTop: 100, flex: 1 }
});
