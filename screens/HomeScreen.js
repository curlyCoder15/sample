import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { ButtonGroup } from "react-native-elements";
import { MonoText } from "../components/StyledText";
import { Header } from "../components/common";
import { Pie } from "../components/Pie";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as actions from "../actions";
//import NetInfo from "@react-native-community/netinfo";
import _ from "lodash";

class HomeScreen extends Component {
  state = {
    unset: true,
    index: 0,
    selectedFeeling: "",
    selectedCategory: "",
    dataList: [],
    category: [],
    categoryValues: [],
    pieData: []
  };

  updateIndex = index => {
    this.setState({ index });
  };

  componentDidMount() {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   this.props.setNetwork(state.isConnected);
    // });
    this.props.getTransactions();
  }

  componentDidUpdate(nextProps) {
    if (this.props.data != nextProps.data)
      this.setState({ dataList: this.props.data });
  }

  updateList = (value, type) => {
    //function to handle the filter by category and reflection type
    if (value !== "" && type != "") {
      var arr = [];
      this.props.data.map((item, index) => {
        if (item.reflected_as == value && item.category_name == type) {
          arr.push(item);
        }
      });
      this.setState({ dataList: arr });
    } else if (value != "" && type == "") {
      var arr = [];
      this.props.data.map((item, index) => {
        if (item.reflected_as == value) {
          arr.push(item);
        }
      });
      this.setState({ dataList: arr });
    } else if (value == "" && type != "") {
      var arr = [];
      this.props.data.map((item, index) => {
        if (item.category_name == type) {
          arr.push(item);
        }
      });
      this.setState({ dataList: arr, selectedCategory: type });
    }
  };

  getCategory = () => {
    //function to handle category distribution
    var cat = [];
    var catLength = [];
    var array = _.groupBy(this.props.data, "category_name");
    _.toPairs(array).map((value, key) => {
      cat.push(value[0]);
      catLength.push(value[1].length);
    });
    this.setState({
      category: cat,
      categoryValues: catLength,
      dataList: this.props.data,
      selectedCategory: ""
    });
  };

  FilterFeeling = () => {
    return (
      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() =>
            this.updateList("POSITIVE", this.state.selectedCategory)
          }
        >
          <FontAwesome
            name={"smile-o"}
            size={50}
            color={"green"}
            style={{ padding: 4 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() =>
            this.updateList("NUETRAL", this.state.selectedCategory)
          }
        >
          <FontAwesome
            name={"meh-o"}
            size={50}
            color={"#ffb300"}
            style={{ padding: 4 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          onPress={() =>
            this.updateList("NEGATIVE", this.state.selectedCategory)
          }
        >
          <FontAwesome
            name={"frown-o"}
            size={50}
            color={"red"}
            style={{ padding: 4 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.log(this.state.dataList);
    return (
      <View style={styles.container}>
        <Header
          back={() => {}}
          backButton={false}
          network={this.props.network}
        />
        <ButtonGroup
          selectedBackgroundColor="pink"
          onPress={index => this.updateIndex(index)}
          selectedIndex={this.state.index}
          buttons={["7 Days", "14 Days", "Last Month"]}
          containerStyle={{ height: 30, marginTop: 20 }}
        />

        <View style={styles.innerContainer}>
          <View style={{ flex: 1.5 }}>
            {this.state.category.length == 0 && (
              <Pie
                onClick={type => this.updateList(type, "")}
                keys={["POSITIVE", "NUETRAL", "NEGATIVE"]}
                colors={["green", "#ffb300", "red"]}
                values={[
                  this.props.positive.length,
                  this.props.nuetral.length,
                  this.props.negative.length
                ]}
                check={
                  this.props.positive.length +
                  this.props.nuetral.length +
                  this.props.negative.length
                }
              />
            )}
            {this.state.category.length > 0 && (
              <Pie
                onClick={type => this.updateList("", type)}
                colors={["green", "#ffb300", "red", "pink"]}
                keys={this.state.category}
                values={this.state.categoryValues}
                check={1}
              />
            )}
          </View>
        </View>
        {this.FilterFeeling()}

        <TouchableOpacity
          style={styles.analyseButton}
          onPress={() => this.getCategory()}
        >
          <Text>Analyse Category</Text>
        </TouchableOpacity>
        <Text>{this.state.selectedCategory}</Text>
        <FlatList
          style={{ width: "90%" }}
          data={this.state.dataList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.flatlist}>
              <View style={{ flex: 3, justifyContent: "center" }}>
                <Text>{item.merchant_name}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>$ {item.amount}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                {item.reflected_as == "POSITIVE" ? (
                  <FontAwesome name={"smile-o"} size={30} color={"green"} />
                ) : item.reflected_as == "NEGATIVE" ? (
                  <FontAwesome name={"frown-o"} size={30} color={"red"} />
                ) : (
                  <FontAwesome name={"meh-o"} size={30} color={"#ffb300"} />
                )}
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

function mapStateToProps({ reflect }) {
  const { data, positive, negative, nuetral, network } = reflect;
  return { data, positive, negative, nuetral, network };
}

export default connect(
  mapStateToProps,
  actions
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  innerContainer: {
    width: "95%",
    height: "30%",
    marginVertical: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.2,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row"
  },
  analyseButton: {
    width: "90%",
    // borderWidth: 1,
    padding: 20,
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.7,
    backgroundColor: "#fceee2"
  },
  flatlist: {
    borderWidth: 1,
    flex: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row"
  }
});
