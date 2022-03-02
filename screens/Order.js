import React, {useContext} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {StoreContext} from '../store';

const Order = () => {
  const {
    orderStore: {order},
  } = useContext(StoreContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTotal}>
            ยอดรวมงานทั้งหมด {order.length} รายการ
          </Text>
        </View>
        <Icon name="rocket" size={30} color="#900" />
        <Text>Order</Text>
        <Text>{JSON.stringify(order)}</Text>
        {order.map((r, i) => {
          return Object.entries(r.pickup_point).map((p, i) => {
            const date = r.pickup_date.split('T')[0].split('-');
            if (p[i]) {
              return (
                <View style={styles.listOrder}>
                  <View key={i}>
                    <Text style={{fontSize: 16, marginTop: 2}}>
                      {date[2] + '/' + date[1] + '/' + date[0]}
                    </Text>
                  </View>
                  <View style={styles.detailList}>
                    <Text style={styles.textList}>
                      <Text style={styles.state}>จุดรับ  </Text>
                      <Text>{p[1]}</Text>
                    </Text>
                    <Text style={styles.textList}>
                      <Text style={styles.state}>จุดส่ง  </Text>
                      <Text>{r.delivery_location}</Text>
                    </Text>
                  </View>
                </View>
              );
            } else {
              return null;
            }
          });
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
    marginTop: 10,
  },
  listOrder: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
    height: 100,
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
  },
  state: {
    fontSize: 14,
    color: '#4fc232',
  },
});

export default Order;
