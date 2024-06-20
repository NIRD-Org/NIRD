// YfInsightsPdf.js
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    border: 2,
    borderStyle: "solid",
    borderColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#1f2937", // primary color
    color: "white",
  },
  headerText: {
    margin: 5,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    width: "30%",
  },
  value: {
    width: "70%",
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
  },
});

const YfInsightsPdf = ({ insights }) => (
  <Document>
    {insights.map((insight, index) => {
      if (insight.approved) {
        return (
          <Page key={index} style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                State:{" "}
                <Text style={{ color: "#d1d5db" }}>{insight.state_name}</Text>
              </Text>
              <Text style={styles.headerText}>
                District: {insight.dist_name}
              </Text>
              <Text style={styles.headerText}>Block: {insight.block_name}</Text>
              <Text style={styles.headerText}>
                Gram Panchayat: {insight.gp_name}
              </Text>
            </View>
            <View style={styles.section}>
              <View style={styles.row}>
                <Text style={styles.label}>Young Fellow Name:</Text>
                <Text style={styles.value}>{insight.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Date of Joining:</Text>
                <Text style={styles.value}>{insight.dateOfJoining}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Financial Year:</Text>
                <Text style={styles.value}>{insight.financialYear}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Plan Of Action:</Text>
                <Text style={styles.value}>{insight.planOfAction}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Achievement:</Text>
                <Text style={styles.value}>{insight.achievement}</Text>
              </View>
              <View style={[styles.row, styles.imageContainer]}>
                <Text style={styles.label}>Achievement Picture:</Text>
                {insight.achievementPhoto && (
                  <Image style={styles.image} src={insight?.achievementPhoto} />
                )}
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Failures:</Text>
                <Text style={styles.value}>{insight.failure}</Text>
              </View>
            </View>
          </Page>
        );
      }
    })}
  </Document>
);

export default YfInsightsPdf;
