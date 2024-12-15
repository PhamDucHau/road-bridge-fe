import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { dashboardData } from './dashboardData';
import { courseList } from './course-data';
import { CourseListModel } from './model/course-list.model';
import { Router } from '@angular/router';
import { environment } from 'src/app/config/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  blogPosts: any[] = [];
  
  detailId: string = '';

  private url = environment.domain
 

 
  // public token = localStorage.getItem('tokens');
  // private sourceList: CourseListModel =
  //   new CourseListModel();

  //course 
  private sourceListDisplay =
    new BehaviorSubject<CourseListModel | null>(null);
  public sourceList$: Observable<CourseListModel | null> =
    this.sourceListDisplay.asObservable();

  // course detail
  private sourceDetailListDisplay =
    new BehaviorSubject<CourseListModel | null>(null);
  public sourceDetailList$: Observable<CourseListModel | null> =
    this.sourceDetailListDisplay.asObservable();

  // course content detail
  private sourceContentDetailListDisplay =
  new BehaviorSubject<CourseListModel | null>(null);
  public sourceContentDetailList$: Observable<CourseListModel | null> =
  this.sourceContentDetailListDisplay.asObservable();

  // list user apply course
  private listUserApplyCourseListDisplay =
  new BehaviorSubject<CourseListModel | null>(null);
  public listUserApplyCourseList$: Observable<any | null> =
  this.listUserApplyCourseListDisplay.asObservable();

  // list user not apply course
  private listUserNotApplyCourseListDisplay =
  new BehaviorSubject<CourseListModel | null>(null);
  public listUserNotApplyCourseList$: Observable<any | null> =
  this.listUserNotApplyCourseListDisplay.asObservable();

  // total record
  private readonly totalRecord = new BehaviorSubject<number>(0);
  public readonly totalRecord$ = this.totalRecord.asObservable();

  private readonly totalRecordApply = new BehaviorSubject<number>(0);
  public readonly totalRecordApply$ = this.totalRecordApply.asObservable();

  private readonly totalRecordNotApply = new BehaviorSubject<number>(0);
  public readonly totalRecordNotApply$ = this.totalRecordNotApply.asObservable();

// Thêm token vào headers
// public headers = new HttpHeaders({
//   'Authorization': `Bearer ${this.token}`
// });

  constructor(public httpClient: HttpClient, private router: Router) {
  }

  addUserApplyCourse(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course/add-user-to-course`,data,{ headers: headers });
    return response.pipe(
      tap((res)=>{
      
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  removeUserApplyCourse(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course/remove-user-from-course`,data,{ headers: headers });
    return response.pipe(
      tap((res)=>{
      
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  getAllUserNotApplyCourse(course_id:any,filter: any = { page: 1, size: 5, search: '' }) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    filter.course_id = course_id
    const response = this.httpClient.get<any>(`${this.url}/course/get-user-not-active-course`,{ params: filter,headers: headers });

    return response.pipe(
      tap((res)=>{
        this.listUserNotApplyCourseListDisplay.next(res.data);
        this.totalRecordNotApply.next(res.total)
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  getAllUserApplyCourse(course_id:any,filter: any = { page: 1, size: 10, search: '' }) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    filter.course_id = course_id
    const response = this.httpClient.get<any>(`${this.url}/course/get-user-by-course`,{ params:  filter ,headers: headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.listUserApplyCourseListDisplay.next(res.data);
        this.totalRecordApply.next(res.total)
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  deleteCourseContentDetail(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course-content-detail/delete`,data,{ headers: headers });
    return response.pipe(
      tap((res)=>{  
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  )
  }

  updateCourseContentDetail(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course-content-detail/update`,data,{ headers: headers });
    return response.pipe(
      tap((res)=>{
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  )
  }
 

  
  createCourseContentDetail(data:any) {
    console.log('data',data)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    
    const response = this.httpClient.post<any>(`${this.url}/course-content-detail/create`,data,{ headers: headers });

    return response.pipe(
      tap((res)=>{
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  
  )
    
  }

  getAllCourseContentDetail(course_detail_id:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.get<any>(`${this.url}/course-content-detail/search-by-filter`,{ params: { course_detail_id: course_detail_id },headers: headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.sourceContentDetailListDisplay.next(res.data);
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  createCourseDetail(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course-detail/create`,data,{ headers: headers });

    return response.pipe(
      tap((res)=>{
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  
  )
    
  }

  updateCourseDetail(data:any) {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    
    const response = this.httpClient.post<any>(`${this.url}/course-detail/update`,data,{ headers: headers });

    return response.pipe(
      tap((res)=>{
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  
  )
    
  }

  deleteCourseDetail(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course-detail/delete`,data,{ headers: headers });
    return response.pipe(
      tap((res)=>{
      
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  getAllCourseDetail(course_id:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.get<any>(`${this.url}/course-detail/search-by-filter`,{ params: { course_id: course_id },headers: headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.sourceDetailListDisplay.next(res.data);
      }),
      catchError((error) => {
        console.log(error.statusText);
        
        return throwError(() => error);
      })
    )
  }

  public getBlog(): Observable<any> {
    return of(dashboardData);
  }

  deleteCourse(body:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course/delete`,body,{ headers: headers });
    return response.pipe(
      tap((res)=>{
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  
  )
  }
  
  

  getAllCourse(filter: any = { page: 1, size: 10, search: '' }) {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.get<any>(`${this.url}/course/search-by-filter`,{ params: filter,headers: headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.sourceListDisplay.next(res.data);
        this.totalRecord.next(res.total)
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  createCourse(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });


    const response = this.httpClient.post<any>(`${this.url}/course/create`,data,{ headers: headers });

    return response.pipe(
      tap((res)=>{
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  
  )
    
  }

  updateCourse(data:any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.post<any>(`${this.url}/course/update`,data,{ headers: headers });

    return response.pipe(
      tap((res)=>{
      
    }),
    catchError((error) => {
      console.log(error.statusText);
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  
  )
    
  }


  public course = courseList;
  public getCourse(): any[] {
    return this.course;
  }

  

}