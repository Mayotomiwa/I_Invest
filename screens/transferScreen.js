import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { HStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { color } from '../constants/color';
import { fetchUser } from '../data/ApiData';

export default function TransferScreen({navigation}) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchUser();
            setData(result[0]);
        };

        fetchData();
    }, []);


    const ContactItem = ({ Item }) => (
        <View style={styles.innerContainer}>
            <View style={styles.imageIcons}>
                <Image style={styles.imageStyles} source={{ uri: Item.images }} />
            </View>
            <Text style={styles.contactName}>{Item.name}</Text>
            <Text style={styles.contactDetails}>{Item.phoneno}</Text>
        </View>
    );

    const Item = ({ Item }) => (
        <HStack style={styles.innerContacts}>
            <View style={styles.imageIcon}>
                <Image style={styles.imageStyles} source={{ uri: Item.images }} />
            </View>
            <View style={{ marginVertical: '10%' }}>
                <Text style={styles.contactName}>{Item.name}</Text>
                <Text style={styles.contactDetails}>{Item.phoneno}</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.status}>Invite</Text>
            </TouchableOpacity>
        </HStack>
    );
    const renderItem = ({ item }) => (
        <Item Item={item} />
    );

    return (
        <SafeAreaView>
            <View style={styles.title}>
                <Text style={{color: color.white, textAlign: 'center', fontSize: 32, marginTop: '10%', fontWeight: 'bold', letterSpacing: 3}}>Transfer</Text>
                <View style={styles.activityContainer}>
                    <View style={styles.iconsContainer}>
                        <View style={styles.box}>
                            <View style={styles.icon}>
                                <Ionicons name='person' color={color.lightBlue} size={24} style={{ top: '30%', left: '30%' }} />
                            </View>
                            <View style={{ marginTop: '30%' }}>
                                <Text style={styles.label}>Mobile</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {navigation.navigate('savings')}} style={styles.box}>
                            <View style={styles.icon}>
                                <FontAwesome name='bank' color={color.lightBlue} size={24} style={{ top: '30%', left: '30%' }} />
                            </View>
                            <View  style={{ marginTop: '30%' }}>
                                <Text style={styles.label}>Bank</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.box}>
                            <View style={styles.icon}>
                                <Ionicons name='wifi' color={color.lightBlue} size={24} style={{ top: '30%', left: '30%' }} />
                            </View>
                            <View style={{ marginTop: '30%' }}>
                                <Text style={styles.label}>Online</Text>
                            </View>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.icon}>
                                <FontAwesome name='qrcode' color={color.lightBlue} size={24} style={{ top: '30%', left: '30%' }} />
                            </View>
                            <View style={{ marginTop: '30%' }}>
                                <Text style={styles.label}>QR Code</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.contactHeader}>Recent</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('savings')}}  style={{ flexDirection: 'row' }}>
                    {data.friends?.map((item, index) => (
                        <ContactItem key={index} Item={item} />
                    ))}
                </TouchableOpacity>
            </View>



            <View>
                <Text style={styles.contactHeader}>All Contacts</Text>
                <Searchbar
                    placeholder='Search Contacts'
                    iconColor={color.disabledbtn}
                    placeholderTextColor={color.disabledbtn}
                    style={styles.searchBar}

                />
            </View>
            <VirtualizedList
                data={data?.friends}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                getItemCount={(data) => data?.length || 0}
                getItem={(data, index) => data[index]}
            />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.lightBlue,
    },
    title: {
        backgroundColor: color.blue,
        height: 220,
        borderEndEndRadius: '45%',
        borderEndStartRadius: '45%',
        marginBottom: '3%'
    },
    activityContainer: {
        bottom: '55%',
    },
    iconsContainer: {
        flexDirection: 'row',
        marginTop: '35%'
    },
    box: {
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 12,
        marginHorizontal: '2%',
        marginBottom: '2%',
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: color.button,
    },
    label: {
        fontSize: 14,
        color: color.white,
    },
    friendsactivityContainer: {
        top: '9%',
    },
    friendsactivity: {
        color: color.black,
        fontSize: 24,
        fontWeight: 'semibold',
        marginHorizontal: '5%',
        marginBottom: '3%',
    },
    friendsiconsContainer: {
        flexDirection: 'row',
    },
    innerContainer: {
        backgroundColor: color.white,
        padding: 30,
        marginHorizontal: '5%',
        marginVertical: '3%',
        borderRadius: '10px',
        shadowColor: color.blue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    innerContacts: {
        backgroundColor: color.white,
        padding: 10,
        marginBottom: '3%',
        marginHorizontal: '5%',
        borderRadius: '10px',
        shadowColor: color.blue,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageStyles: {
        width: 100,
        height: 100,
    },
    imageIcon: {
        flexDirection: 'row',
    },

    friendsicon: {
        width: 60,
        height: 60,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: color.blue,
    },
    friendslabel: {
        fontSize: 14,
        color: '#4A4A4A',
    },
    contact: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    logo: {
        width: 50,
        height: 50,
    },
    contactDetails: {
        fontSize: 12,
        textAlign: 'center',
    },
    contactName: {
        fontSize: 15,
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    searchBar: {
        marginVertical: '5%',
        backgroundColor: color.search,
        borderColor: color.search,
        borderWidth: 2,
        marginHorizontal: '3%',
        shadowRadius: 0,
        shadowOpacity: 0,

    },
    contactHeader: {
        color: color.disabledbtn,
        fontSize: 24,
        fontWeight: 'semibold',
        marginHorizontal: '5%',
    },
    btn: {
        width: 90,
        height: 40,
        justifyContent: 'center',
        borderRadius: '10px',
        backgroundColor: color.disabledbtn,
        marginLeft: '8%',
        marginTop: '8%',
    },
    status: {
        fontSize: 14,
        color: color.lightBlue,
        textAlign: 'center'
    },

});
