
import SplashScreen from './screens/SplashScreen';
import MapScreen from './screens/MapScreen'; 
import AddSpotScreen from './screens/AddSpotScreen';
import SpotDetailScreen from './screens/SpotDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="AddSpot" component={AddSpotScreen} />
        <Stack.Screen name="Details" component={SpotDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
