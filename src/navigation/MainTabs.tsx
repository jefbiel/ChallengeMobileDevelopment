import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HabitosScreen from '../screens/HabitosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

// PlaceholderScreen removed; using `PerfilScreen` for the Perfil tab

type TabIconProps = {
  routeName: string;
  color: string;
  size: number;
};

const TabBarIcon: React.FC<TabIconProps> = ({ routeName, color, size }) => {
  if (routeName === 'HomeTab') {
    // use local image for the Home tab icon
    return (
      <Image
        source={require('../assets/img/home.png')}
        style={{ width: size, height: size, tintColor: color }}
        resizeMode="contain"
      />
    );
  }

  if (routeName === 'Habitos') {
    return (
      <Image
        source={require('../assets/img/puzzle.png')}
        style={{ width: size, height: size, tintColor: color }}
        resizeMode="contain"
      />
    );
  }

  if (routeName === 'Perfil') {
    // wrap the image so the tab label is centered under the icon
    return (
      <View style={{ width: size }}>
        <Image
          source={require('../assets/img/user.png')}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      </View>
    );
  }

  const iconName = routeName === 'Perfil' ? 'person-outline' : 'home-outline';
  return <Ionicons name={iconName} size={size} color={color} />;
};

const createScreenOptions = ({ route }: { route: { name: string } }) => ({
  headerShown: false,
  tabBarIcon: (props: { color: string; size: number }) => (
    <TabBarIcon routeName={route.name} {...props} />
  ),
  tabBarActiveTintColor: '#3498DB',
  tabBarInactiveTintColor: 'gray',
  tabBarShowLabel: true,
});

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={createScreenOptions}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen
        name="Habitos"
        component={HabitosScreen}
        options={{ title: 'Hábitos', tabBarLabel: 'Hábitos', tabBarAccessibilityLabel: 'Hábitos' }}
      />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;

// no local styles required
