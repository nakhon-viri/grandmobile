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
import dayjs from 'dayjs';

const Financial = () => {
  const {
    orderStore: {order},
  } = useContext(StoreContext);

  const wageList = () => {
    return order?.map((r, i) => {
      if (
        dayjs(r.pickup_date).format('MM YYYY') ===
        dayjs(new Date()).format('MM YYYY')
      ) {
        return (
          <TouchableOpacity
            style={order.length - 1 == i ? styles.listLast : styles.list}
            key={i}>
            <View style={styles.date}>
              <Text style={styles.dateText}>{`${dayjs(r.pickup_date)
                .locale('th')
                .format('DD MMMM BBBB')}`}</Text>
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
      if (
        dayjs(r.pickup_date).format('MM YYYY') ===
        dayjs(new Date()).format('MM YYYY')
      ) {
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
