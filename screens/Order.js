import React, {useContext, useMemo} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {StoreContext} from '../store';
import Oc from 'react-native-vector-icons/dist/Octicons';
const Order = ({navigation}) => {
  console.log('Order');
  const {
    orderStore: {order},
  } = useContext(StoreContext);

  const orderData = useMemo(() => {
    let newOrder = order.sort((a, b) => {
      return new Date(b.pickup_date) - new Date(a.pickup_date);
    });
    return newOrder;
  }, [order]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTotal}>
            ยอดรวมงานทั้งหมด {order.length} รายการ
          </Text>
        </View>
        {orderData?.map((r, i) => {
          const date = r.pickup_date.split('T')[0].split('-');
          return (
            <TouchableOpacity
              key={i}
              style={styles.listOrder}
              onPress={() =>
                navigation.navigate('OrderDetail', {
                  order: r,
                  preRoute: 'history',
                })
              }>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Kanit-Regular',
                    marginTop: 4,
                    color: '#000',
                  }}>
                  {date[2] + '/' + date[1] + '/' + date[0]}
                </Text>
              </View>
              <View style={styles.detailList}>
                <Text style={styles.textList}>
                  {r.customer.cus_name.length > 10
                    ? r.customer.cus_name.substring(0, 13) + '****'
                    : r.customer.cus_name}
                </Text>
                <Text style={styles.textList}>
                  <Text style={styles.state1}>จัดส่ง</Text>
                  <Text style={styles.locationList}>
                    {'    ' + r.delivery_location}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
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
                    color: '#000',
                  }}>
                  {r.status}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
  headerTotal: {
    padding: 10,
    fontFamily: 'Kanit-Regular',
  },
  listOrder: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
    height: 90,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  detailList: {
    marginLeft: 20,
  },
  textList: {
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
  state1: {
    fontSize: 14,
    color: '#4a93ed',
    fontFamily: 'Kanit-Regular',
  },
  locationList: {
    marginLeft: 60,
    fontFamily: 'Kanit-Regular',
    color: '#000',
  },
});

export default Order;
