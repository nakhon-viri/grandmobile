import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import {StoreContext} from '../store';
import Io from 'react-native-vector-icons/dist/Ionicons';
import Fa from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Mc, {
  Button,
} from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import * as Keychain from 'react-native-keychain';
import dayjs from 'dayjs';

const Profile = () => {
  console.log('Profile', new Date());
  const {
    userStore: {profile, upDateProfile},
    auth: {upDateLogin},
    orderStore: {upDateOrder},
  } = useContext(StoreContext);

  const TextDetail = ({children}) => {
    return <Text style={styles.textDetail}>{children}</Text>;
  };

  const Pd = ({children}) => {
    return (
      <View style={styles.profileData}>
        <Text style={{color: '#4b5257'}}>{children}</Text>
      </View>
    );
  };

  const logOut = async () => {
    await Keychain.resetGenericPassword();
    upDateOrder(null);
    upDateProfile(null);
    upDateLogin(false);
  };

  return (
    <ScrollView>
      <View style={{marginBottom: 120}}>
        <View style={styles.containerHeader}>
          <View>
            <Image
              style={styles.img}
              source={{
                uri: profile?.photo,
              }}
            />
          </View>
          <View style={styles.detailUser}>
            <Text style={{fontSize: 17}}>
              {profile?.full_name.first_name +
                '   ' +
                profile?.full_name.last_name}
            </Text>
            <TextDetail>
              <Icon name="id-card-alt" size={12} color="#999" />
              {'   ' + profile?._uid}
            </TextDetail>
            <TextDetail>
              <Io name="ios-call" size={12} color="#999" />
              {'   ' + profile?.phone_no}
            </TextDetail>
            <TextDetail>
              <Fa name="automobile" size={12} color="#999" />
              {'   ' + profile?.car_no}
            </TextDetail>
          </View>
        </View>
        <View style={styles.containerProfile}>
          <Fa name="id-card-o" size={25} color="#444" />
          <View style={styles.profileDetail}>
            <Text style={{fontSize: 17}}>ข้อมูลส่วนตัว</Text>
            <Pd>เลขที่ประจำตัวประชาชน : {profile?.reference_id}</Pd>
            <Pd>เพศ : {profile?.gender}</Pd>
            <Pd>
              วัน/เดือน/ปีเกิด :{' '}
              {dayjs(profile?.birthday).locale('th').format('DD MMMM BBBB')}
            </Pd>
            <Text style={{paddingTop: 10, color: '#4b5257'}}>
              อายุ :{' '}
              {dayjs(new Date()).format('BBBB') -
                dayjs(profile?.birthday).format('BBBB')}{' '}
              ปี
            </Text>
          </View>
        </View>
        <View style={styles.containerAddress}>
          <Icon name="house-user" size={25} color="#444" />
          <View style={styles.addressDetail}>
            <Text style={{fontSize: 17, marginBottom: 10}}>ที่อยู่</Text>
            <Text style={{color: '#4b5257'}}>
              {profile?.address.house_no +
                ' ' +
                profile?.address.street +
                ' ตำบล' +
                profile?.address.subdistrict +
                ' อำเภอ' +
                profile?.address.district +
                ' จังหวัด' +
                profile?.address.province +
                ' ' +
                profile?.address.zip_code}
            </Text>
          </View>
        </View>
        <View style={styles.containerProfile}>
          <Mc name="card-account-details-star-outline" size={25} color="#444" />
          <View style={styles.profileDetail}>
            <Text style={{fontSize: 17}}>ข้อมูลที่ทำงาน</Text>
            <Text style={{paddingTop: 10, color: '#4b5257'}}>
              แผนก : {profile?.department}
            </Text>
          </View>
        </View>
        <View style={styles.containerProfile}>
          <Mc name="finance" size={25} color="#444" />
          <View style={styles.profileDetail}>
            <Text style={{fontSize: 17}}>ข้อมูลการเงิน</Text>
            <Pd>ชื่อธนาคาร : {profile?.bank_name}</Pd>
            <Text style={{paddingTop: 10, color: '#4b5257'}}>
              เลขที่บัญชี : {profile?.bank_no}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Button
            name="logout-variant"
            size={25}
            color="red"
            style={{paddingHorizontal: 16}}
            backgroundColor="#fff"
            onPress={() => logOut()}>
            <Text style={styles.logoutBtn}>ออกจากระบบ</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  img: {
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  detailUser: {
    marginLeft: 16,
  },
  textDetail: {
    fontSize: 14,
    paddingTop: 10,
    color: '#4b5257',
  },
  containerProfile: {
    // paddingVertical: 16,
    // paddingLeft: 16,
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  profileDetail: {
    marginLeft: 18,
    width: '100%',
  },
  profileData: {
    borderBottomWidth: 0.2,
    borderColor: '#bbb',
    paddingVertical: 10,
  },
  containerAddress: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  addressDetail: {
    marginLeft: 18,
    width: '80%',
  },
  logoutBtn: {
    fontSize: 17,
    color: 'red',
    marginLeft: 8,
  },
});

export default Profile;
