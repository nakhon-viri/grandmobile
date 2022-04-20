import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {httpClient} from '../utils/HttpClient';
import {StoreContext} from '../store';
import dayjs from 'dayjs';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
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
  const [openModel, setOpenModel] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [loadingUpdateImage, setLoadingUpdateImage] = useState(false);

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
      includeBase64: true,
    }).then(async image => {
      try {
        setOpenModel(false);
        setLoadingUpdateImage(true);
        let img = `data:${image.mime};base64,${image.data}`;
        let {data} = await httpClient.post(
          'https://api-grandlogistics.herokuapp.com/order/updateimage',
          {id: newOrder._id, image: img},
        );
        console.log('data', data);
        setImageBase64(img);
        setLoadingUpdateImage(false);
      } catch (error) {
        console.log('error', error);
      }
    });
  };
  console.log(newOrder.path_image);
  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(async image => {
      try {
        setOpenModel(false);
        setLoadingUpdateImage(true);
        let img = `data:${image.mime};base64,${image.data}`;
        let {data} = await httpClient.post(
          'https://api-grandlogistics.herokuapp.com/order/updateimage',
          {id: newOrder._id, image: img},
        );
        console.log('data', data);
        setImageBase64(img);
        setLoadingUpdateImage(false);
      } catch (error) {
        console.log('error', error);
      }
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
      <Modal
        isVisible={openModel}
        backdropColor={'transparent'}
        onBackButtonPress={() => setOpenModel(false)}
        onBackdropPress={() => setOpenModel(false)}
        onSwipeComplete={() => setOpenModel(false)}
        swipeDirection="down"
        style={{padding: 0, margin: 0, justifyContent: 'flex-end'}}>
        <View
          style={{
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 9.65,
            backgroundColor: '#fff',
            borderWidth: 0.2,
            borderColor: '#aeaeae',
            borderTopLeftRadius: 15,
            borderTopEndRadius: 15,
            width: '100%',
            height: 300,
            padding: 17,
          }}>
          <Text style={{textAlign: 'center', marginBottom: 15, fontSize: 23}}>
            อัพโหลดรูปภาพ
          </Text>
          <TouchableOpacity
            style={{...styles.loginScreenButton, backgroundColor: '#00c'}}
            onPress={openCamera}
            underlayColor="#fff">
            <Text style={styles.loginText}>เปิดกล้อง</Text>
          </TouchableOpacity>
          <View style={{height: 1}} />
          <TouchableOpacity
            style={{...styles.loginScreenButton, backgroundColor: '#00c'}}
            onPress={openPicker}
            underlayColor="#fff">
            <Text style={styles.loginText}>เลือกรูปภาพจากคลัง</Text>
          </TouchableOpacity>
          <View style={{height: 1}} />
          <TouchableOpacity
            style={{...styles.loginScreenButton, backgroundColor: '#9e9e9e'}}
            onPress={() => setOpenModel(false)}
            underlayColor="#fff">
            <Text style={styles.loginText}>ยกเลิก</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
          {preRoute === 'Home' ? (
            <View
              style={{
                ...(imageBase64 ? {marginVertical: 30} : {marginTop: 30}),
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              {loadingUpdateImage ? (
                <Text style={{fontSize: 20, color: '#0f0f0f'}}>Loading...</Text>
              ) : (
                <TouchableOpacity onPress={() => setOpenModel(!openModel)}>
                  <Text style={{fontSize: 20, color: '#00f'}}>
                    อัพโหลดรูปภาพ
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
          {newOrder.path_image != 'nopic_item.png' ? (
            <View style={{marginTop: 30}}>
              <Image
                style={{height: 300}}
                source={{
                  uri: newOrder.path_image,
                }}
              />
            </View>
          ) : (
            imageBase64 && (
              <View>
                <Image
                  style={{height: 300}}
                  source={{
                    uri: imageBase64,
                  }}
                />
              </View>
            )
          )}
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
                <TouchableOpacity
                  style={{
                    ...styles.loginScreenButton,
                    backgroundColor: 'rgb(99,115,129)',
                  }}
                  onPress={() => {
                    handleSubmit(newOrder._id, 'ยอมรับ');
                  }}
                  underlayColor="#fff">
                  <Text style={styles.loginText}>ยกเลิก</Text>
                </TouchableOpacity>
              ) : (
                <>
                  {newOrder.status == 'มอบหมายงานเเล้ว' ? (
                    <TouchableOpacity
                      style={{
                        ...styles.loginScreenButton,
                        backgroundColor: 'rgb(85,153,242)',
                      }}
                      onPress={() => {
                        handleSubmit(newOrder._id, 'ยอมรับ');
                      }}
                      underlayColor="#fff">
                      <Text style={styles.loginText}>ยอมรับงาน</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        ...styles.loginScreenButton,
                        backgroundColor: '#0dd406',
                      }}
                      onPress={() => {
                        handleSubmit(newOrder._id, 'ส่งงานเเล้ว');
                      }}
                      underlayColor="#fff">
                      <Text style={styles.loginText}>ยืนยันการส่งงาน</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{
                      ...styles.loginScreenButton,
                      backgroundColor: 'rgb(254,00,00)',
                    }}
                    onPress={() => {
                      handleSubmit(newOrder._id, 'ปฏิเสธงาน');
                    }}
                    underlayColor="#fff">
                    <Text style={styles.loginText}>ปฏิเสธงาน</Text>
                  </TouchableOpacity>
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
  loginScreenButton: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default OrderDetail;
