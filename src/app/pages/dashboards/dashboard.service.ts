import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/app/config/environments/environment';
import { Router } from '@angular/router';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';




@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  blogPosts: any[] = [];
  
  detailId: string = '';

  private url = environment.domain

  private allBaoCaoDisplay = new BehaviorSubject<any | null>(null);
  public allBaoCao$: Observable<any | null> =
    this.allBaoCaoDisplay.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router,
    // private s3Client: S3Client
  ) { 
    // this.s3Client = new S3Client({
    //   region: 'us-east-1', // MinIO không yêu cầu region
    //   endpoint: 'http://khoadue.me:9001', // URL của MinIO
    //   credentials: {
    //     accessKeyId: 'nltbO2VxDjerDd3YhxwI',
    //     secretAccessKey: 'FRmNitQwocCBwLxqlqaUp5qC3gQM8XSHi0AouDsc',
    //   },
    //   forcePathStyle: true, // Bắt buộc với MinIO
    // });
   }

   

  
  
  getAllDataForm(){
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.http.get<any>(`${this.url}/congtrinh-diadiem`,{headers: headers });
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

  getBaoCaoById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    let body = {
      id: id
    }
    return this.http.post<any>(`${this.url}/bao-cao/by-id`, body, { headers: headers });
  }

  getAllDataNhapKho(){
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.http.get<any>(`${this.url}/nhap-kho`,{headers: headers });
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


  updateDataBaoCao(data: any): Observable<any> {    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    return this.http.post<any>(`${this.url}/bao-cao/update`, data, { headers: headers });
  }
  createDataBaoCao(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    return this.http.post<any>(`${this.url}/bao-cao`, data, { headers: headers });
  }

  uploadFile(file: File): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.url}/minio/file`, formData, { headers: headers });
  }

  getAllDataBaoCao(filterApply:any){ 
    const params = filterApply ; 
    // console.log(params); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.http.get<any>(`${this.url}/bao-cao`,{headers: headers, params: params });
    return response.pipe(
      tap((res)=>{
        this.allBaoCaoDisplay.next(res.data);
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
  getAllBaoCao(){
    // const params = filterApply ; 
    // console.log(params); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.http.get<any>(`${this.url}/bao-cao/all`,{headers: headers});
    return response.pipe(
      map((res)=>{
        return res.data
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

  getAllBaoCaoForFilter(filterApply:any){
    const params = filterApply ; 
    // const params = filterApply ; 
    // console.log(params); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.http.get<any>(`${this.url}/bao-cao/all-filter`,{headers: headers, params: params});
    return response.pipe(
      map((res)=>{
        return res.data
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

  deleteDataBaoCao(id: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const body = {
      id: id
    }
    return this.http.post<any>(`${this.url}/bao-cao/delete`,body, { headers: headers });
  }

  changeStatusBaoCao(id: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const body = {
      id: id
    }
    return this.http.post<any>(`${this.url}/bao-cao/change-status`,body, { headers: headers });
  }
 

 

  

}