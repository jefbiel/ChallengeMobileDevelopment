import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HabitosScreen from '../screens/HabitosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  routeName: string;
  color: string;
  size: number;
  focused: boolean;
};

const ICON_SIZE = 26;

const TabBarIcon: React.FC<TabIconProps> = ({ routeName, color, size, focused }) => {
  if (routeName === 'HomeTab') {
    return (
      <Image
        source={require('../assets/img/home.png')}
        style={[styles.iconImage, { tintColor: color }]}
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
    return (
      <View style={styles.perfilContainer}>
        <View style={focused ? styles.perfilBgActive : styles.perfilBgInactive}>
          <Image
            source={require('../assets/img/user.png')}
            style={[styles.perfilImage, focused ? styles.perfilImageActive : styles.perfilImageInactive]}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }

  const iconName = routeName === 'Perfil' ? 'person-outline' : 'home-outline';
  return <Ionicons name={iconName} size={size} color={color} />;
};

const createScreenOptions = ({ route }: { route: { name: string } }) => ({
  headerShown: false,
  // React Navigation passes focused, color and size to tabBarIcon
  tabBarIcon: (props: { color: string; size: number; focused: boolean }) => (
    <TabBarIcon routeName={route.name} {...props} />
  ),
  tabBarActiveTintColor: '#3498DB',
  tabBarInactiveTintColor: 'gray',
  tabBarShowLabel: true,
  // ensure labels use the tint colors
  tabBarLabelStyle: { fontSize: 12 },
});

const styles = StyleSheet.create({
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  perfilContainer: {
    width: ICON_SIZE,
    alignItems: 'center',
  },
  perfilBgActive: {
    width: ICON_SIZE + 8,
    height: ICON_SIZE + 8,
    borderRadius: (ICON_SIZE + 8) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB22',
  },
  perfilBgInactive: {
    width: ICON_SIZE + 8,
    height: ICON_SIZE + 8,
    borderRadius: (ICON_SIZE + 8) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  perfilImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  perfilImageActive: {
    opacity: 1,
  },
  perfilImageInactive: {
    opacity: 0.5,
  },
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
