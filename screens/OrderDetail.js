import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import React, {useState, useContext} from 'react';
import {Button} from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {httpClient} from '../utils/HttpClient';
import {StoreContext} from '../store';
const OrderDetail = ({
  route: {
    params: {order, preRoute},
  },
  navigation,
}) => {
  console.log('OrderDetail');
  const {
    orderStore: {upDateOrder},
  } = useContext(StoreContext);
  const [textDetail, setTextDetail] = useState('');

  const blockDetail = (section, value) => {
    return (
      <View style={styles.containerTextDetail}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{fontFamily: 'Kanit-Regular', fontSize: 18, color: '#000'}}>
            {section}
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontFamily: 'Kanit-Regular',
                color: '#777',
                fontSize: 18,
              }}>
              {value}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const handleSubmit = id => {
    // console.log(id);
    httpClient
      .post('http://192.168.1.20:2200/order/updatestatus', {id})
      .then(res => {
        httpClient
          .get('http://192.168.1.20:2200/order/mobile')
          .then(res => {
            upDateOrder(res.data.data);
            navigation.goBack();
          })
          .catch(err => {
            console.log(err.response);
          });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const date = order.pickup_date.split('T')[0].split('-');
  const newDate = date[2] + '/' + date[1] + '/' + date[0];

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>{order.customer.cus_name}</Text>
          </View>
          {blockDetail('หมายเลขโทรศัพท์ลูกค้า', order.customer.phone_no)}
          {blockDetail('สถานะงาน', order.status)}
          <View style={styles.containerTextDetail}>
            <Text
              style={{
                fontFamily: 'Kanit-Regular',
                fontSize: 18,
                color: '#000',
              }}>
              สถานที่รับสินค้า
            </Text>
            <View style={{width: '100%', marginTop: 10}}>
              {Object.entries(order.pickup_point).map((p, i) => {
                if (p[1]) {
                  return (
                    <View key={i} style={{flexDirection: 'row', padding: 7}}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            textAlign: 'left',
                            fontFamily: 'Kanit-Regular',
                            color: '#777',
                            fontSize: 18,
                          }}>
                          จุดที่ {i + 1}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Kanit-Regular',
                            color: '#777',
                            fontSize: 18,
                          }}>
                          {p[1]}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
            </View>
          </View>
          {blockDetail('สถานที่ส่งสินค้า', order.delivery_location)}
          {blockDetail('วันที่', newDate)}
          {blockDetail('ค่าเที่ยว', order.wage)}
          <View style={{paddingVertical: 18}}>
            <View>
              <Text
                style={{
                  fontFamily: 'Kanit-Regular',
                  fontSize: 18,
                  marginBottom: 10,
                  color: '#000',
                }}>
                รายละเอียด
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={text => setTextDetail(text)}
                value={textDetail}
                style={{borderWidth: 0.3, height: 100, borderRadius: 3}}
              />
            </View>
          </View>
          {preRoute === 'Home' ? (
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <Button
                size={25}
                color="#fff"
                style={{paddingHorizontal: 16, with: '40%'}}
                backgroundColor="#0dd406"
                onPress={() => {
                  handleSubmit(order._id);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Kanit-Regular',
                    fontSize: 18,
                  }}>
                  ยืนยันการจัดส่ง
                </Text>
              </Button>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 25,
          width: '100%',
          backgroundColor: '#fff',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    marginBottom: 120,
  },
  containerHeader: {
    paddingBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#999',
  },
  textHeader: {
    textAlign: 'center',
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
    color: '#000',
  },
  containerTextDetail: {
    paddingVertical: 18,
    borderBottomWidth: 0.2,
    borderBottomColor: '#999',
  },
});

export default OrderDetail;
