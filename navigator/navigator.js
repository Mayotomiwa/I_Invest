import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import DetailsScreen from '../screens/detailsScreen';
import MainScreen from '../screens/mainScreen';
import ReceiptScreen from '../screens/receiptScreen';
import SavingScreen from '../screens/savingScreen';
import TransferScreen from '../screens/transferScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator () {
    return (
            <Stack.Navigator 
            initialRouteName={'home'}
            screenOptions={{ headerShown: false }}>
                <Stack.Screen name="home" component={MainScreen} />
                <Stack.Screen name="details" component={DetailsScreen} />
                <Stack.Screen name="savings" component={SavingScreen} />
                <Stack.Screen name="transfer" component={TransferScreen} />
                <Stack.Screen name="receipt" component={ReceiptScreen} />
            </Stack.Navigator>
    );
};
