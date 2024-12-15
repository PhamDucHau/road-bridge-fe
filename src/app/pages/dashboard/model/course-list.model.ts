import * as _ from 'lodash';
import { CourseModel } from './course.model';


export class CourseListModel {
  public course_list: CourseModel[] = [];

  constructor(args?: any) {
    const { course_list = [] } = args || {};
    this.course_list = course_list;
  }

  convertDataFromAPI(args?: any): void {
    const data = args;
    if (!_.isNil(data)) {
      this.course_list = _.map(data, (item) => {
        return new CourseModel(item);
      });
    }
  }

  getCourseList() {
    return this.course_list;
  }
}

