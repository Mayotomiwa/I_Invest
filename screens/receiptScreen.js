import { HStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../constants/color';
import Separator from '../constants/Seperator';
import { fetchUser } from '../data/ApiData';

export default function ReceiptScreen({route}) {
    const [data, setData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchUser();
            setData(result[0]);
        };

        fetchData();
    }, []);
    const { receiptItems } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            {receiptItems && (
                <React.Fragment key={receiptItems.id}>
                    <Text style={styles.titleName}>My Receipt</Text>
                    <View style={styles.receipt}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', bottom: '10%' }}>
                            <View style={styles.icon}>
                                <Image style={styles.imageStyle} source={{ uri: receiptItems.images }} />
                            </View>
                        </View>
                        <Text style={styles.titleBody}>Transfer Complete</Text>
                        <View style={{ bottom: '8%' }}>
                            <Separator />
                        </View>
                        <HStack>
                            <View style={{ marginLeft: '5%' }}>
                                <View style={styles.icon}>
                                    <Image style={styles.imageStyle} source={{ uri: receiptItems.images }} />
                                </View>
                            </View>
                            <View style={{ marginHorizontal: '5%', marginTop: '3%' }}>
                                <Text style={styles.recepitText} >Recipient:</Text>
                                <Text style={styles.transName}>{receiptItems.description}</Text>
                            </View>
                        </HStack>

                        <View style={{ marginHorizontal: '6%' }}>
                            <Text style={styles.recepitText2}>Reference number:</Text>
                            <Text style={styles.transRef}>{receiptItems.refno}</Text>
                        </View>

                        <HStack style={{ marginVertical: '15%', marginHorizontal: '5%' }}>
                            <View style={{ paddingRight: '25%' }}>
                                <Text style={styles.recepitText3}>Amount sent: </Text>
                                <Text style={styles.transAmount}>${receiptItems.amount}</Text>
                            </View>
                            <View>
                                <Text style={styles.recepitText3}>Transfer fee</Text>
                                <Text style={styles.transAmount}>$0.00</Text>
                            </View>
                        </HStack>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.status}>Share</Text>
                        </TouchableOpacity>
                    </View>

                </React.Fragment>
            )}

            <Text style={styles.titleFooter}>Your transfer will arrive to the recipient within 48 hours.</Text>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.status}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.blue
    },
    receipt: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: color.blue,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: '5%',
        paddingVertical: '15%'
    },
    titleName: {
        color: color.white,
        fontSize: 28,
        marginTop: '10%',
        textAlign: 'center',
        marginVertical: '10%',
    },
    titleBody: {
        color: color.black,
        fontSize: 25,
        textAlign: 'center',
        bottom: '10%',
        fontWeight: 'bold',
    },
    titleFooter: {
        color: color.white,
        fontSize: 18,
        marginTop: '10%',
        textAlign: 'center',
        marginVertical: '10%',
        marginHorizontal: '10%',
    },
    icon: {
        width: 70,
        height: 70,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: color.burger,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transName: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 16
    },
    transRef: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 16,
        marginTop: '2%',
    },
    transAmount: {
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 16,
        marginTop: '2%',
    },
    btn: {
        backgroundColor: color.blue,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        borderRadius: '10px',
        paddingHorizontal: '20%',
    },
    status: {
        fontSize: 24,
        color: color.white,
        textAlign: 'center'
    },
    recepitText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.disabledbtn,
        marginVertical: '5%',
    },
    recepitText2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.disabledbtn,
        marginTop: '5%',
    },
    recepitText3: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.disabledbtn,
    },
})