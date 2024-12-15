// import { NoiDungSaiPhamKyHieu, StatusGiaiTrinh, StatusSaiPham } from '@features/noi-quy-lao-dong/components/sai-pham/ca-nhan-giai-trinh-sai-pham/model/sai-pham-giai-trinh.enum';
// import { ChamCong, GiaiTrinh, NhanVienInfo, NoiDungSaiPham, Other } from '@features/noi-quy-lao-dong/components/sai-pham/ca-nhan-giai-trinh-sai-pham/model/sai-pham-giai-trinh.model';
import * as _ from 'lodash';


export class CourseModel {

  id: number;
  title: string;
  description: string;
  image: string;
  status: string;
  time_study: string;


  constructor(args?: any) {
    const {
      id = 0,           // Giá trị mặc định là 0 nếu không có id
      title = '',        // Giá trị mặc định là chuỗi rỗng nếu không có title
      description = '',  // Giá trị mặc định là chuỗi rỗng nếu không có description
      image = '',        // Giá trị mặc định là chuỗi rỗng nếu không có image
      status = '',       // Giá trị mặc định là chuỗi rỗng nếu không có status
      time_study = ''    // Giá trị mặc định là chuỗi rỗng nếu không có time_study
    } = args || {}; 

    this.id = id
    this.title = title
    this.description = description
    this.image = image
    this.status = status
    this.time_study = time_study  
    
  }
}


