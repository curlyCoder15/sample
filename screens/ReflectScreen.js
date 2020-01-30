import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Overlay, Slider } from "react-native-elements";
import * as Progress from "react-native-progress";
import { Pie, Summary, ItemDetails } from "../components";
import moment from "moment-timezone";

import * as actions from "../actions";

import colors from "../constants/Colors";
import layout from "../constants/Layout";
import { Header } from "../components/common";

class ReflectScreen extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
      positive: 0,
      negative: 0,
      nuetral: 0,
      total: 0,
      summary: false
    };
  }

  setReflection = async reflectionType => {
    if (this.props.unreflected.length == 1) {
      this.setState({ isVisible: false });
      var arr = this.props.reflected;
      arr.push({ reflected_as: reflectionType });
      this.calculateSummary(arr);
    }
    await this.props.setReflection(
      reflectionType,
      this.props.unreflected[0].id,
      this.props.unreflected,
      this.props.reflected,
      this.props.data
    );
  };

  calculateSummary = arr => {
    var positive = 0;
    var negative = 0;
    var nuetral = 0;

    if (arr.length > 0) {
      arr.map((value, index) => {
        if (value.reflected_as == "POSITIVE") positive += 1;
        else if (value.reflected_as == "NUETRAL") nuetral += 1;
        else if (value.reflected_as == "NEGATIVE") negative += 1;
      });
      this.setState({
        positive,
        negative,
        nuetral,
        total: positive + negative + nuetral,
        summary: true
      });
      this.props.resetReflected(this.props.unreflected.length);
    }
  };

  getOverlayData = () => {
    if (this.props.unreflected.length > 0) {
      const { reflected, totalUnreflected, unreflected } = this.props;
      return (
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity
            style={{ alignItems: "flex-end", paddingHorizontal: 20 }}
            onPress={() => {
              this.setState({ isVisible: false });
              this.calculateSummary(this.props.reflected);
            }}
          >
            <Ionicons name={"md-close"} size={30} />
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 25 }}>Reflections</Text>
            <Progress.Bar
              progress={reflected.length / totalUnreflected}
              width={layout.window.width * 0.8}
              height={15}
              style={{ borderRadius: 10, marginTop: 40 }}
            />
            <Text style={{ paddingTop: 10 }}>
              {unreflected.length} Remaining
            </Text>
          </View>
          <ItemDetails
            merchant_name={unreflected[0].merchant_name}
            amount={unreflected[0].amount}
            date={moment(unreflected[0].date_of_transaction).format(
              "DD MMM YYYY"
            )}
            onClick={type => this.setReflection(type)}
          />
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header
          back={() => this.props.navigation.goBack(null)}
          headerText="Reflect"
          network={this.props.network}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.props.unreflected.length > 0)
              this.setState({ isVisible: true });
          }}
        >
          <View style={{ flex: 4 }}>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text style={{ fontSize: 28, color: "white" }}>
                Reflect Transactions
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text style={{ fontSize: 20, color: "white" }}>
                {this.props.unreflected.length == 0
                  ? "No"
                  : this.props.unreflected.length}{" "}
                New Transactions
              </Text>
            </View>
          </View>
          <View style={styles.arrow}>
            <Ionicons name="ios-arrow-forward" size={35} color="#fff" />
          </View>
        </TouchableOpacity>
        {this.state.summary && (
          <Summary
            total={this.state.total}
            negative={this.state.negative}
            nuetral={this.state.nuetral}
            positive={this.state.positive}
          />
        )}
        <Overlay
          isVisible={this.state.isVisible}
          windowBackgroundColor="rgba(255, 255, 255, .8)"
          overlayBackgroundColor="white"
          width="90%"
          height="auto"
          overlayStyle={{ borderWidth: 1, borderColor: "#eee" }}
        >
          <View style={{}}>{this.getOverlayData()}</View>
        </Overlay>
      </View>
    );
  }
}

function mapStateToProps({ reflect }) {
  const {
    reflected,
    unreflected,
    totalUnreflected,
    summary,
    data,
    network
  } = reflect;

  return { reflected, unreflected, totalUnreflected, summary, data, network };
}

export default connect(
  mapStateToProps,
  actions
)(ReflectScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    marginTop: 20,
    width: "90%",
    borderRadius: 10,
    height: "20%",
    backgroundColor: colors.backgroundColor,
    padding: 10,
    flexDirection: "row",
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  arrow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
