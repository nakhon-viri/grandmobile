import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Button} from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {httpClient} from '../utils/HttpClient';
import {StoreContext} from '../store';
import dayjs from 'dayjs';
import ImagePicker from 'react-native-image-crop-picker';

const OrderDetail = ({
  route: {
    params: {orderDetail, preRoute},
  },
  navigation,
}) => {
  console.log('OrderDetail');
  const {
    orderStore: {order, upDateSomeOrder},
  } = useContext(StoreContext);
  const [newOrder, setNewOrder] = useState(null);
  const [textDetail, setTextDetail] = useState('');
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (id, status) => {
    setLoading(true);
    httpClient
      .post('https://api-grandlogistics.herokuapp.com/order/updatestatus', {
        id,
        status,
      })
      .then(res => {
        console.log('res.data', res.data);
        upDateSomeOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  useEffect(() => {
    if (!orderDetail || !order) return [];
    let resOrder = order.find(element => element._id == orderDetail);
    setNewOrder(resOrder);
    setLoadingOrder(false);
  }, [order, orderDetail]);

  if (loadingOrder)
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Text style={{fontSize: 30}}>Loading...</Text>
      </View>
    );

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View style={styles.container}>
          <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>{newOrder.customer.cus_name}</Text>
          </View>
          {blockDetail('หมายเลขโทรศัพท์ลูกค้า', newOrder.customer.phone_no)}
          {blockDetail('สถานะงาน', newOrder.status)}
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
              {Object.entries(newOrder.pickup_point).map((p, i) => {
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
          {blockDetail('สถานที่ส่งสินค้า', newOrder.delivery_location)}
          {blockDetail(
            'วันที่',
            dayjs(newOrder.pickup_date).locale('th').format('DD MMMM BBBB'),
          )}
          {blockDetail('ค่าเที่ยว', newOrder.wage)}
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
          <View
            style={{
              marginTop: 30,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <Button
              size={25}
              color="#fff"
              style={{paddingHorizontal: 16}}
              backgroundColor="#00f"
              onPress={openPicker}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Kanit-Regular',
                  fontSize: 18,
                }}>
                คลัง
              </Text>
            </Button>
            <Button
              size={25}
              color="#fff"
              style={{paddingHorizontal: 16}}
              backgroundColor="#00f"
              onPress={openCamera}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Kanit-Regular',
                  fontSize: 18,
                }}>
                กล้อง
              </Text>
            </Button>
          </View>
          {preRoute === 'Home' ? (
            <View
              style={{
                marginTop: 30,
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              {loading ? (
                <Text style={{fontSize: 20}}>Loading...</Text>
              ) : newOrder.status == 'ปฏิเสธงาน' ||
                newOrder.status == 'ส่งงานเเล้ว' ? (
                <Button
                  size={25}
                  color="#fff"
                  style={{paddingHorizontal: 16}}
                  backgroundColor="rgb(99,115,129)"
                  onPress={() => {
                    handleSubmit(newOrder._id, 'ยอมรับ');
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Kanit-Regular',
                      fontSize: 18,
                    }}>
                    ยกเลิก
                  </Text>
                </Button>
              ) : (
                <>
                  {newOrder.status == 'มอบหมายงานเเล้ว' ? (
                    <Button
                      size={25}
                      color="#fff"
                      style={{paddingHorizontal: 16}}
                      backgroundColor="rgb(85,153,242)"
                      onPress={() => {
                        handleSubmit(newOrder._id, 'ยอมรับ');
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Kanit-Regular',
                          fontSize: 18,
                        }}>
                        ยอมรับงาน
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      size={25}
                      color="#fff"
                      style={{paddingHorizontal: 16}}
                      backgroundColor="#0dd406"
                      onPress={() => {
                        handleSubmit(newOrder._id, 'ส่งงานเเล้ว');
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: 'Kanit-Regular',
                          fontSize: 18,
                        }}>
                        ยืนยันการส่งงาน
                      </Text>
                    </Button>
                  )}
                  <Button
                    size={25}
                    color="#fff"
                    style={{paddingHorizontal: 16}}
                    backgroundColor="rgb(254,00,00)"
                    onPress={() => {
                      handleSubmit(newOrder._id, 'ปฏิเสธงาน');
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Kanit-Regular',
                        fontSize: 18,
                      }}>
                      ปฏิเสธงาน
                    </Text>
                  </Button>
                </>
              )}
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
