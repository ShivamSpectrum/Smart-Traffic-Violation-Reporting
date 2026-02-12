import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils';

// Import Screens from barrel
import {
    OfficerDashboard,
    PendingQueue,
    VerifiedReports,
    OfficerProfile,
    ReportVerification,
    OfficerSettings,
    PermissionsRequest
} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function OfficerTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Dashboard') iconName = focused ? 'grid' : 'grid-outline';
                    else if (route.name === 'Pending') iconName = focused ? 'time' : 'time-outline';
                    else if (route.name === 'Verified') iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
                    else if (route.name === 'OfficerProfileTab') iconName = focused ? 'person' : 'person-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.secondary,
                tabBarInactiveTintColor: COLORS.gray500,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Dashboard" component={OfficerDashboard} />
            <Tab.Screen name="Pending" component={PendingQueue} />
            <Tab.Screen name="Verified" component={VerifiedReports} />
            <Tab.Screen name="OfficerProfileTab" component={OfficerProfile} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}

export default function OfficerNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OfficerMain" component={OfficerTabNavigator} />
            <Stack.Screen name="PermissionsRequest" component={PermissionsRequest} />
            <Stack.Screen name="ReportVerification" component={ReportVerification} />
            <Stack.Screen name="OfficerSettings" component={OfficerSettings} />
        </Stack.Navigator>
    );
}
