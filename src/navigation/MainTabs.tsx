import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HabitosScreen from '../screens/HabitosScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const PlaceholderScreen: React.FC<{ label: string }> = ({ label }) => (
  <View style={styles.placeholderContainer}>
    <Text>{label}</Text>
  </View>
);

const ProfileScreen: React.FC = () => <PlaceholderScreen label="Perfil" />;

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
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({
  placeholderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
