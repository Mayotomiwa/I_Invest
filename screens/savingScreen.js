import { HStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../constants/color';
import { fetchUser } from '../data/ApiData';

export default function SavingScreen() {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchUser();
            setData(result[0]);
        };

        fetchData();
    }, []);
    const Card = ({ backgroundColor, name, amount, description, buttonText }) => (
        <View style={[styles.card, { backgroundColor }]}>
            <HStack>
                <View style={styles.icon}>
                    <Text style={styles.amount}>{amount}</Text>
                </View>
                <View style={styles.spendingText}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.button}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </HStack>
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleName}>Finance Score</Text>
                <View style={styles.titleImage}>
                    <Image source={require('../assets/images/Ilustration.png')} style={styles.titleIcon} />
                </View>
                <Text style={styles.titleDescription}>It can be better</Text>
                <Text style={styles.titleDescription2}>below are some recommendations</Text>
            </View>

            <View style={styles.recommendationContainer}>
                <Text style={styles.recommendationText}>Recommendation</Text>
                {data?.budget.map((item) => (
                    <ScrollView key={item.id}>
                        <Card backgroundColor={color.white} name="Spending" amount='+$17' description={`You spent $${item.amount} on food. That's 50% higher than the average of our users.`} buttonText='More details' />
                        <Card backgroundColor={color.white} name="Credit" amount='+8' description="You were late to pay this month's card bills.Try to be on time this month." buttonText='More details' />
                    </ScrollView>
                ))}
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.lightBlue,
        marginTop: Platform.OS === 'ios' ? '5%' : 0,
    },
    title: {
        backgroundColor: color.blue,
        height: 400,
        paddingHorizontal: 10,
        borderEndEndRadius: '45%',
        borderEndStartRadius: '45%',
    },
    titleName: {
        color: color.white,
        fontSize: 28,
        marginTop: '10%',
        textAlign: 'center',
    },
    titleImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%',
    },
    titleIcon: {
        width: '50%',
        height: '60%',
        marginVertical: '5%',
    },
    titleDescription: {
        color: color.white,
        fontSize: 25,
        textAlign: 'center',
    },
    titleDescription2: {
        color: color.offWhite,
        fontSize: 18,
        textAlign: 'center',
    },
    recommendationText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.disabledbtn,
        marginHorizontal: '5%',
        marginVertical: '3%',
    },
    card: {
        backgroundColor: color.white,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginHorizontal: '5%',
        shadowColor: color.blue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.disabledbtn,
        marginVertical: '5%',
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: color.white,
        textAlign: 'center',
    },
    icon: {
        width: 70,
        height: 70,
        borderRadius: 20,
        marginTop: '10%',
        backgroundColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spendingText: {
        marginHorizontal: '2%',
        paddingHorizontal: '5%'
    },
    description: {
        fontSize: 16,
        marginBottom: '5%',
        marginRight: '15%',
    },
    button: {
        backgroundColor: 'white',
        color: 'blue',
        padding: 8,
        borderRadius: 5,
        fontSize: 16,
    },
})