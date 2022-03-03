import React, {useContext} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {StoreContext} from '../store';

const Order = () => {
  const {
    orderStore: {order},
  } = useContext(StoreContext);

  function statusCounter(inputs) {
    let counter = 0;
    for (const input of inputs) {
      Object.entries(input.pickup_point).map((p, i) => {
        if (p[i]) counter++;
      });
    }
    return counter;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.headerTotal}>
            ยอดรวมงานทั้งหมด {statusCounter(order)} รายการ
          </Text>
        </View>
        {order.map((r, i) => {
          return Object.entries(r.pickup_point).map((p, i) => {
            const date = r.pickup_date.split('T')[0].split('-');
            if (p[i]) {
              return (
                <View style={styles.listOrder}>
                  <View key={i}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Kanit-Light',
                        marginTop: 4,
                      }}>
                      {date[2] + '/' + date[1] + '/' + date[0]}
                    </Text>
                  </View>
                  <View style={styles.detailList}>
                    <Text style={styles.textList}>
                      <Text style={styles.state1}>จุดรับ </Text>
                      <Text style={styles.locationList}>{'    ' + p[1]}</Text>
                    </Text>
                    <Text style={styles.textList}>
                      <Text style={styles.state2}>จุดส่ง</Text>
                      <Text style={styles.locationList}>
                        {'    ' + r.delivery_location}
                      </Text>
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        textAlign: 'right',
                        marginRight: 5,
                        marginTop: 4,
                      }}>
                      {r.status}
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
    padding: 10,
    fontFamily: 'Kanit-Light',
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
  state1: {
    fontSize: 14,
    color: '#4a93ed',
    fontFamily: 'Kanit-Regular',
  },
  state2: {
    fontSize: 14,
    color: '#4fc232',
    fontFamily: 'Kanit-Regular',
  },
  locationList: {
    marginLeft: 60,
    fontFamily: 'Kanit-Light',
  },
});

export default Order;
