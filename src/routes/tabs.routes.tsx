import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/Home";
import { BookmarkSimple, House, MagnifyingGlass } from "phosphor-react-native";
import Details from "../screens/Details";
import MyList from "../screens/MyList";
import Search from "../screens/Search";

const { Navigator, Screen } = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor:"#242A32",
          height: 60,
          alignItems: "center",
          borderTopWidth: 3,
          borderTopColor: "#0296E5",
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0296E5",
        tabBarInactiveTintColor: "#67686D",
      }}
    >
      <Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
        <House color={color} size={30} weight ="light"/>)}}/>
        
        <Screen
          name="details"
          component={Details}
          options= {{tabBarButton: () => null }}/>
        
        <Screen
          name="MyList"
          component={MyList}
          options={{
            tabBarIcon: ({color}) => (
        <BookmarkSimple color={color} size={30} weight="light"/>)}}/>
        
        <Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({color}) => (
        <MagnifyingGlass color={color} size={30} weight="light"/>)}}  />
    </Navigator>
  )
}

export default TabRoutes;