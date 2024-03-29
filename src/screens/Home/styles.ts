import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A32',
  },
  
  header: {
    padding: 25,
  },

  headerText: {
    marginTop: 30,
    fontSize: 24,
    lineHeight: 45,
    color: "#FFF"
  },

  containerInput: {
    backgroundColor: "#67686D",
    height: 42,
    padding: 10,
    borderRadius: 16,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },

  input: {
    color: "#FFF",
    width: "80%",
    paddingLeft: 15,
  },

  noResult: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  }
});

export default styles;
