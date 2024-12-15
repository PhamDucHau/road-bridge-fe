import { Injectable } from "@angular/core";

import { BehaviorSubject, catchError, debounceTime, delay, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { environment } from "src/app/config/environments/environment";




@Injectable({
    providedIn: 'root'
})
export class UserService {
  private url = environment.domain
  private userListDisplay =
  new BehaviorSubject<any | null>(null);
  public userList$: Observable<any | null> =
    this.userListDisplay.asObservable();
  
  private readonly totalRecord = new BehaviorSubject<number>(0);
  public readonly totalRecord$ = this.totalRecord.asObservable();

constructor(public httpClient: HttpClient, 
            private router: Router,
            
          ) {
}

exportAsExcelFile(data: any[], fileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  // Thiết lập tiêu đề đậm (bold) cho dòng đầu tiên
  const range = XLSX.utils.decode_range(worksheet['!ref'] || ''); // Lấy phạm vi của worksheet
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // Địa chỉ ô trong dòng đầu tiên
    if (!worksheet[cellAddress]) continue; // Nếu ô trống, bỏ qua

    worksheet[cellAddress].s = { font: { bold: true } }; // Thiết lập font đậm cho ô
  }

  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, fileName);
}

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
}




deleteUser(body: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.post<any>(`${this.url}/user/delete`, body, { headers: headers });
  return response.pipe(tap((res)=>{}),
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


updateUser(body: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.post<any>(`${this.url}/user/update`, body, { headers: headers });
  return response.pipe(tap((res)=>{}),
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

getListRoleByUserId(id: number) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.get<any>(`${this.url}/user/list-role-by-user?userId=${id}`, { headers: headers });
  return response.pipe(tap((res)=>{}),
  catchError((error) => {
    console.log(error.statusText);
    if (error.statusText === 'Unauthorized') {
      localStorage.clear();
      this.router.navigate(['/authentication/login']);
      }
      return throwError(() => error);
    })
  );
}


createUser(body: any) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.post<any>(`${this.url}/user/create`, body, { headers: headers });
  return response.pipe(
    tap((res)=>{
      console.log(res)
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

getUserList(filter: any = { page: 1, size: 10, search: '' }) {
 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.get<any>(`${this.url}/user/search-by-filter?page=${filter.page}&size=${filter.size}&search=${filter.search}`,{ headers: headers });
  return response.pipe(    
    tap((res)=>{
      this.userListDisplay.next(res.data);
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


}