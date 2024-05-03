import { Ionicons } from '@expo/vector-icons';
import { HStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../constants/color';
import { fetchUser } from '../data/ApiData';


export default function DetailsScreen({ navigation }) {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchUser();
            setData(result[0]);
        };

        fetchData();
    }, []);
    const TransactionItem = ({ item }) => (
        <View style={styles.transactionItem}>
            <HStack style={styles.details}>
                <View style={styles.imageIcon}>
                    <Image style={styles.imageStyles} source={{ uri: item.images }} />
                </View>
                <View>
                    <Text style={styles.merchantName}>{item.description}</Text>
                    <Text style={styles.transactionCount}>{item.transactionFrequency} transactions</Text>
                </View>

            </HStack>
            <Text style={styles.amount}>${item.amount.toLocaleString()}</Text>
        </View>
    );
    const renderItem = ({ item }) =>
        <TouchableOpacity onPress={() => navigation.navigate('receipt', { receiptItems: item })}>
            <TransactionItem item={item} />
        </TouchableOpacity>
    return (
        <SafeAreaView>
            <View>
                <HStack spacing={'55%'}>
                    <TouchableOpacity onPress={() => { }} style={{ marginHorizontal: '5%', marginVertical: '5%' }}>
                        <Ionicons name="chevron-back-outline" size={32} color={color.black} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={{ marginHorizontal: '5%', marginVertical: '5%' }}>
                        <Text style={{ color: color.blue, fontSize: 16, }}>
                            See Budget
                        </Text>
                    </TouchableOpacity>
                </HStack>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.titleText}>
                        Your balance is ${data?.balance.toLocaleString()}
                    </Text>
                    <Text style={styles.titleText2}>
                        Last month you spent ${data?.spent.toLocaleString()}
                    </Text>
                </View>
                <Image style={styles.imageStyle} source={require('../assets/images/Graph.png')} />
            </View>

            <View style={styles.figures}>
                <View style={styles.categoryContainer}>
                    <View style={styles.category}>
                        <Text style={styles.description}>Spent</Text>
                        <HStack spacing={'5%'}>
                            <View style={[styles.circle, styles.spent]} />
                            <Text style={styles.amount}>${data?.spent.toLocaleString()}</Text>
                        </HStack>
                    </View>

                    <View style={styles.category}>
                        <Text style={styles.description}>Earned</Text>
                        <HStack spacing={'5%'}>
                            <View style={[styles.circle, styles.earned]} />
                            <Text style={styles.amount}>${data?.earned.toLocaleString()}</Text>
                        </HStack>
                    </View>
                </View>
            </View>
            <View style={styles.transactionContainer}>
                <Text style={styles.transactionText}>Top Transactions</Text>
                <FlatList
                    data={data?.transactionHistory}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

            <View style={styles.categoryContainers}>
                <Text style={styles.categoryText}>Top Category</Text>
                <View style={{ flexDirection: 'row' }}>
                    {data?.budget.map((item) => (
                        <View style={styles.budgetItem} key={item.id}>
                            <View style={styles.budgetContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.images }} style={styles.icon} />
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.categoryName}>{item.name}</Text>
                                    <Text style={styles.budget}>${item.amount.toLocaleString()}</Text>
                                </View>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.status}>{item.status}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.lightBlue
    },
    titleTextContainer: {
        marginVertical: '4%',
    },
    titleText: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    titleText2: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: color.disabledbtn,
    },
    figures: {
        backgroundColor: color.white,
        paddingVertical: '10%',
        marginHorizontal: '5%',
        borderRadius: '10px',
        bottom: '8%',
        shadowColor: color.blue,
        elevation: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoryContainer: {
        flexDirection: 'row',
    },
    category: {
        marginHorizontal: '3%',
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginTop: '2%',
        marginHorizontal: '10%',
    },
    spent: {
        backgroundColor: '#FF6B6B',
    },
    earned: {
        backgroundColor: '#1DD1A1',
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        marginHorizontal: '20%',
        color: color.black
    },
    figuresText: {
        fontSize: 14,
        color: color.black,
        marginHorizontal: '9%',
    },
    textBtn: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.blue,
        textDecorationLine: 'underline',
        marginHorizontal: '9%',
        marginTop: '5%',
    },
    transactionContainer: {
        bottom: '6%'
    },
    transactionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.disabledbtn,
        marginHorizontal: '5%',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    imageStyles: {
        width: 30,
        height: 30,
    },
    imageIcon: {
        flexDirection: 'row',
        paddingHorizontal: '3%',
    },
    logo: {
        width: 50,
        height: 50,
    },
    details: {
        flex: 1,
    },
    merchantName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    transactionCount: {
        fontSize: 14,
        color: '#888',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    budgetItem: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '45%',
        height: '62%',
        alignItems: 'center',
        padding: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: color.blue,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3, // for Android
    },
    budgetContainer: {
        marginVertical: 10,
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 70,
        height: 70,
        marginVertical: '10%',
    },
    detail: {
        alignItems: 'center',
        marginVertical: '10%',
    },
    categoryName: {
        fontSize: 15,
        fontWeight: 'semibold',
        textAlign: 'center',
    },
    budget: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: color.white,
        textAlign: 'center'
    },
    categoryContainers: {
        bottom: '5%',
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.disabledbtn,
        marginHorizontal: '5%',
    },
    btn: {
        backgroundColor: color.blue,
        width: 90,
        height: 30,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '15%',
        borderRadius: '10px',
        backgroundColor: color.disabledbtn,
    },
});