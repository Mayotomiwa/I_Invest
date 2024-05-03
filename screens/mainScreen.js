import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { HStack } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { Button, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Progress from '../components/ProgressBar';
import { color } from '../constants/color';
import Separator from '../constants/Seperator';
import { fetchUser } from '../data/ApiData';

export default function MainScreen({ navigation }) {
  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchUser();
      setData(result[0]); // Access the first element of the array
    };

    fetchData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <HStack>
          <Text style={styles.titleName}>Hi {data?.name}</Text>
          <View style={styles.imageIcons}>
            <Image style={styles.imageStyles} source={{uri: data?.userImage}} />
          </View>
        </HStack>
        <Text style={styles.titleBalance}>${data?.balance.toLocaleString()}</Text>
        <Text style={styles.titleNaming}>Avaiable Balance</Text>
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
        <Text style={styles.figuresText}>You spent $2,732 on dining out this month. This is 25% more than last month.</Text>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.textBtn}>Tell me more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.activity}>Activity</Text>
        <View style={styles.iconsContainer}>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => { navigation.navigate('transfer') }} style={styles.icon}>
              <FontAwesome name='send' color={color.white} size={24} style={{ top: '30%', left: '30%' }} />
            </TouchableOpacity>
            <Text style={styles.label}>Transfer</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.icon}>
              <FontAwesome name='credit-card' color={color.white} size={24} style={{ top: '30%', left: '30%' }} />
            </View>
            <Text style={styles.label}>My Card</Text>
          </View>
          <View style={styles.box}>
            <TouchableOpacity onPress={() => { navigation.navigate('details') }} style={styles.icon}>
              <Entypo name='bar-graph' color={color.white} size={24} style={{ top: '30%', left: '30%' }} />
            </TouchableOpacity>
            <Text style={styles.label}>Insight</Text>
          </View>
        </View>
      </View>
      <View style={styles.verification}>
        <Text style={styles.verificationHeader}>Complete Verification</Text>
        <View style={styles.verificationBody}>
          <HStack style={{ alignItems: 'baseline' }} spacing={'25%'} >
            <Text style={styles.verificationPercentage}>75%</Text>
            <Text style={styles.verificationText}>7 out of 10 Completed</Text>
          </HStack>
          <View style={{ marginHorizontal: '5%' }}>
            <Progress now={75} max={100} height={10} />
          </View>
          <View>
            <HStack style={{ marginTop: '5%', marginHorizontal: '5%' }}>
              <Ionicons name="person" size={30} color={color.blue} />
              <View style={{ marginLeft: '3%', paddingHorizontal: '5%' }}>
                <Text style={styles.personalHeader}>Personal Information</Text>
                <Text style={styles.personalInfo}>Please provide all the documents necessary to verify your soucre of income personal information</Text>
              </View>
            </HStack>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.continueBtn}>Continue</Text>
            </TouchableOpacity>
            <View style={{ marginHorizontal: '10%', marginVertical: '5%' }}>
              <Separator />
            </View>
            <HStack style={{ marginLeft: '10%', alignItems: 'baseline' }}>
              <FontAwesome name='address-card' color={color.blue} size={24} />
              <Button title="Verification" onPress={() => { }} />
            </HStack>
            <View style={{ marginHorizontal: '10%', marginVertical: '5%' }}>
              <Separator />
            </View>
            <HStack style={{ marginLeft: '10%', alignItems: 'baseline' }}>
              <Entypo name="mail" size={30} color={color.blue} />
              <Button title="Confirm Email" onPress={() => { }} />
            </HStack>
          </View>
        </View>
      </View>
      <View style={styles.news}>
        <Text style={styles.newsHeader}>News and promo</Text>
        <View style={styles.newsBox}>
          <View>
            <Image style={styles.imageStyle} source={require('../assets/images/news_and_promo.png')} />
          </View>
          <View style={{ marginLeft: '10%' }}>
            <Text>Invite friends!</Text>
            <Text>For every user you invite and signs up can earn up to $5 </Text>
          </View>
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.newsBtn}>Invite now</Text>
          </TouchableOpacity>

        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBlue,
    marginTop: Platform.OS === 'ios' ? '5%' : 0,
  },
  title: {
    backgroundColor: color.blue,
    height: 460,
    paddingHorizontal: 10,
  },
  titleName: {
    color: color.white,
    fontSize: 20,
    marginTop: '10%',
  },
  titleBalance: {
    color: color.white,
    fontSize: 40,
    marginTop: '10%',
  },
  titleNaming: {
    color: color.offWhite,
    fontSize: 15,
    marginTop: '2%',
  },
  imageStyles: {
    width: 80,
    height: 80,
  },
  imageIcons: {
    paddingHorizontal: '60%',
    marginTop: Platform.OS === 'ios' ? '5%' : 0,
  },
  figures: {
    backgroundColor: color.white,
    paddingVertical: '15%',
    marginHorizontal: '5%',
    borderRadius: '10px',
    bottom: '10%',
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
    bottom: '10%',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: '5%',
    marginHorizontal: '10%',
  },
  spent: {
    backgroundColor: '#FF6B6B', // red
  },
  earned: {
    backgroundColor: '#1DD1A1', // green
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
  activityContainer: {
    bottom: '9%',
  },
  activity: {
    color: color.black,
    fontSize: 24,
    fontWeight: 'semibold',
    marginHorizontal: '5%',
    marginBottom: '3%',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: color.white,
    padding: 30,
    marginHorizontal: '2%',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: color.blue,
  },
  label: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  verification: {
    bottom: '8%',
  },
  news: {
    bottom: '8%',
  },
  newsBox: {
    backgroundColor: color.white,
    marginHorizontal: '5%',
    paddingBottom: '10%',
    borderRadius: '10px',
    shadowColor: color.blue,
    paddingVertical: '10px',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verificationHeader: {
    color: color.black,
    fontSize: 24,
    fontWeight: 'semibold',
    marginHorizontal: '5%',
    marginBottom: '3%',
  },
  newsHeader: {
    color: color.black,
    fontSize: 24,
    fontWeight: 'semibold',
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  verificationBody: {
    backgroundColor: color.white,
    paddingVertical: '15%',
    marginHorizontal: '5%',
    borderRadius: '10px',
    shadowColor: color.blue,
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  verificationPercentage: {
    fontSize: 30,
    color: color.blue,
    marginHorizontal: '9%',
  },
  verificationText: {
    fontSize: 14,
    color: color.black,
    marginHorizontal: '6%',
  },
  innerContainer: {
    paddingHorizontal: 30,
    paddingVertical: 70,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  personalHeader: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  personalInfo: {
    fontSize: 14,
  },
  continueBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.blue,
    marginHorizontal: '20%',
    marginTop: '5%',
  },
  newsBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.blue,
    marginHorizontal: '10%',
    marginTop: '5%',
  },
  imageStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    bottom: '10%',
  },
  nameText: {
    color: 'green',
    fontSize: 32,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    width: 200,
  }, image: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  imageContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: '5%',
    top: 60,
    marginHorizontal: 10,
  },
  textContainer: {
    alignItems: 'center',
    left: '50%',
    top: '20%',
    marginHorizontal: 10,
  }
});
