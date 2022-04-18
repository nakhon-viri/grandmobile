import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {StoreContext} from '../store';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Oc from 'react-native-vector-icons/dist/Octicons';
import dayjs from 'dayjs';
import * as Keychain from 'react-native-keychain';

const Home = props => {
  const {
    orderStore: {order},
  } = useContext(StoreContext);

  const orderToDay = () => {
    let index = 0;
    return order?.map((r, i1) => {
      if (
        dayjs(r.pickup_date).format('DD/MM/YYYY') ===
        dayjs(new Date()).format('DD/MM/YYYY')
      ) {
        index++;
        const date = r.pickup_date.split('T')[0].split('-');
        return (
          <TouchableOpacity
            key={i1}
            style={styles.cardOrder}
            onPress={() =>
              props.navigation.navigate('OrderDetail', {
                orderDetail: r._id,
                preRoute: 'Home',
              })
            }>
            <View style={styles.indexCard}>
              <Text style={styles.textIndex}>{index}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Kanit-Regular',
                  color: '#000',
                }}>
                {r.customer.cus_name}
              </Text>
              <Text style={{fontSize: 20}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#4a93ed',
                    fontFamily: 'Kanit-Regular',
                  }}>
                  จัดส่ง
                </Text>
                <Text style={{fontFamily: 'Kanit-Regular', color: '#000'}}>
                  {'  ' + r.delivery_location}
                </Text>
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Icon
                  name="clock"
                  size={15}
                  color="#999"
                  style={{marginTop: 6}}
                />
                <Text style={{color: '#888', padding: 5}}>
                  {date[2] + '/' + date[1] + '/' + date[0]}
                </Text>
              </View>
            </View>
            <View style={styles.statusCard}>
              <Oc
                name="dot-fill"
                size={20}
                color={r.status === 'จัดส่งสำเร็จ' ? '#6f6' : '#4a93ed'}
                style={{marginTop: 5, marginRight: 5}}
              />
              <Text
                style={{
                  textAlign: 'right',
                  marginRight: 5,
                  marginTop: 4,
                  fontSize: 15,
                  fontFamily: 'Kanit-Light',
                }}>
                {r.status}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  return (
    <ScrollView>
      <View style={{marginBottom: 120}}>{orderToDay()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardOrder: {
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 12,
    flex: 1,
    flexDirection: 'row',
    overflow: 'visible',
    shadowColor: '#555',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  indexCard: {
    backgroundColor: '#faf',
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  textIndex: {
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Kanit-Light',
    fontWeight: '600',
  },
  detailCard: {
    flex: 0.6,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  statusCard: {
    padding: 10,
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Home;
