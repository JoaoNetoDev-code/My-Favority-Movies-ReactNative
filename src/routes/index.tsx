import { NavigationContainer } from "@react-navigation/native"
import TabRoutes from "./tabs.routes";

const Routes = () => {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  )
}

export default Routes;
