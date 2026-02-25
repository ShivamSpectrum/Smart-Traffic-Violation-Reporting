import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils';
// import ReferScreen from "../screens/ReferScreen";
import Refer from "../screens/citizen/Refer";


// Import Screens from barrel
import {
    CitizenHome,
    MyReports,
    Rewards,
    Profile,
    EditProfile,
    NewReport,
    AIProcessing,
    AIResultsVerification,
    ReportSuccess,
    ReportDetail,
    Notifications,
    ContactUs,
    FineInformation,
    PermissionsRequest
} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CitizenTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Reports') iconName = focused ? 'document-text' : 'document-text-outline';
                    else if (route.name === 'Rewards') iconName = focused ? 'trophy' : 'trophy-outline';
                    else if (route.name === 'ProfileTab') iconName = focused ? 'person' : 'person-outline';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.gray500,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={CitizenHome} />
            <Tab.Screen name="Reports" component={MyReports} />
            <Tab.Screen name="Rewards" component={Rewards} />
            <Tab.Screen name="ProfileTab" component={Profile} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}

export default function CitizenNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Refer"component={ReferScreen}options={{ title: "Refer a Friend" }}/> */}
            <Stack.Screen name="CitizenMain" component={CitizenTabNavigator} />
            <Stack.Screen name="Refer"component={Refer}options={{ title: "Refer a Friend" }}/>
            <Stack.Screen name="PermissionsRequest" component={PermissionsRequest} />
            <Stack.Screen name="NewReport" component={NewReport} />
            <Stack.Screen name="AIProcessing" component={AIProcessing} />
            <Stack.Screen name="AIResultsVerification" component={AIResultsVerification} />
            <Stack.Screen name="ReportSuccess" component={ReportSuccess} />
            <Stack.Screen name="ReportDetail" component={ReportDetail} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="FineInformation" component={FineInformation} />
        </Stack.Navigator>
    );
}
