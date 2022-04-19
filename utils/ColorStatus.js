export default function ColorStatus(status) {
  if (status == 'มอบหมายงานเเล้ว') {
    return `rgb(99, 115, 129)`;
  } else if (status == 'ปฏิเสธงาน') {
    return 'rgb(183, 33, 54)';
  } else if (status == 'ยอมรับ') {
    return `rgb(85, 153, 242)`;
  } else if (status == 'ส่งงานเเล้ว') {
    return `rgb(95, 325, 55)`;
  }
}
