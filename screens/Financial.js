import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useContext} from 'react';
import {StoreContext} from '../store';

const Financial = () => {
  const {
    orderStore: {order},
  } = useContext(StoreContext);

  const DateNow = () => {
    var today = new Date();
    var mm = String(
      Platform.OS === 'ios' ? today.getMonth() + 1 : today.getMonth() + 2,
    ).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm;

    return today;
  };

  const wageList = () => {
    return order?.map((r, i) => {
      if (r.pickup_date.split('T')[0].substring(0, 7) === DateNow()) {
        const date = r.pickup_date.split('T')[0].split('-');
        return (
          <TouchableOpacity
            style={order.length - 1 == i ? styles.listLast : styles.list}
            key={i}>
            <View style={styles.date}>
              <Text
                style={
                  styles.dateText
                }>{`${date[2]}/${date[1]}/${date[0]}`}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                จัดส่ง{'   '}
                <Text style={{fontSize: 18, color: '#000'}}>
                  {r.delivery_location}
                </Text>
              </Text>
            </View>
            <View style={styles.wage}>
              <Text
                style={{
                  flex: 1,
                  fontFamily: 'Kanit-Regular',
                  fontSize: 20,
                  justifyContent: 'center',
                  color: '#000',
                }}>
                {r.wage + '  '}
                <Text
                  style={{
                    flex: 1,
                    fontFamily: 'Kanit-Regular',
                    fontSize: 17,
                    fontWeight: '300',
                    justifyContent: 'center',
                    color: '#000',
                  }}>
                  บ.
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    });
  };

  const calculate = arr => {
    let calCost = 0;
    for (const r of arr) {
      if (r.pickup_date.split('T')[0].substring(0, 7) === DateNow()) {
        calCost += r.wage;
      }
    }
    return calCost;
  };

  return (
    <ScrollView>
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              flex: 1,
              fontFamily: 'Kanit-Regular',
              fontSize: 20,
              justifyContent: 'center',
              color: '#000',
            }}>
            ประวัติ
          </Text>
          <Text
            style={{
              fontFamily: 'Kanit-Regular',
              fontSize: 20,
              color: '#000',
            }}>
            {calculate(order) + ' '}
            <Text
              style={{
                flex: 1,
                fontFamily: 'Kanit-Regular',
                fontSize: 17,
                fontWeight: '300',
                justifyContent: 'center',
                color: '#000',
              }}>
              บ.
            </Text>
          </Text>
        </View>
        {wageList()}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    marginBottom: 140,
  },
  list: {
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor: '#999',
    paddingVertical: 20,
  },
  listLast: {
    flexDirection: 'row',
    borderColor: '#999',
    paddingTop: 20,
  },
  date: {
    marginRight: 15,
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionText: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
    color: '#4a93ed',
  },
  wage: {
    justifyContent: 'center',
  },
});
export default Financial;
