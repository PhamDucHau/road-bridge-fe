import { Component } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';

// components
import { AppTopCardsComponent } from '../../../components/dashboard1/top-cards/top-cards.component';
import { AppRevenueUpdatesComponent } from '../../../components/dashboard1/revenue-updates/revenue-updates.component';
import { AppYearlyBreakupComponent } from '../../../components/dashboard1/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from '../../../components/dashboard1/monthly-earnings/monthly-earnings.component';
import { AppEmployeeSalaryComponent } from '../../../components/dashboard1/employee-salary/employee-salary.component';
import { AppCustomersComponent } from '../../../components/dashboard1/customers/customers.component';
import { AppProductsComponent } from '../../../components/dashboard2/products/products.component';
import { AppSocialCardComponent } from '../../../components/dashboard1/social-card/social-card.component';
import { AppSellingProductComponent } from '../../../components/dashboard1/selling-product/selling-product.component';
import { AppWeeklyStatsComponent } from '../../../components/dashboard1/weekly-stats/weekly-stats.component';
import { AppTopProjectsComponent } from '../../../components/dashboard1/top-projects/top-projects.component';
import { AppProjectsComponent } from '../../../components/dashboard1/projects/projects.component';



import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subscription } from 'rxjs';
import { HomeService } from '../home.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from 'src/app/config/environments/environment';

@Component({
  selector: 'app-dashboard1',
  standalone: true,
  imports: [
    CommonModule,    
    CarouselModule,
    TablerIconsModule,
    AppTopCardsComponent,
    AppRevenueUpdatesComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppEmployeeSalaryComponent,
    AppCustomersComponent,
    AppProductsComponent,
    AppSocialCardComponent,
    AppSellingProductComponent,
    AppWeeklyStatsComponent,
    AppTopProjectsComponent,
    AppProjectsComponent,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class AppDashboard1Component {
  constructor(
    public service: HomeService,
  ) {}
  items: any[];
  private subscription1!: Subscription;
  private subscription2!: Subscription;
  protected sourceList$!: Observable<any | null>;
  protected sourceListProminent$!: Observable<any | null>;
  public loadingSpinner = false;
 

  ngOnInit() {  

    this.loadingSpinner = true;    

    this.sourceList$ = this.service.sourceList$; 
    this.sourceListProminent$ = this.service.sourceListProminent$;
    this.subscription1 = this.service.getAllCourse().subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    );
    this.subscription2 = this.service.getListProminentCourse().subscribe(
      (res: any) => {
        if(res){
          this.loadingSpinner = false;
        }
      }
    );
    this.sourceListProminent$.subscribe(res => {
      console.log('res',res)
    })
    
    
  }

  ngOnDestroy(): void {
   
    if (this.subscription1) {
      
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  converImage(imagePath: any) {
    const baseUrl = environment.domain
    let cleanedImagePath = null
    // const baseUrl = 'https://elearning-be-h3lj.onrender.com'; 
    // URL cơ sở của bạn
    // Loại bỏ 'uploads' khỏi đường dẫn
  if(imagePath.includes('uploads')){
   
    const format = imagePath.replace('uploads/', ''); 
    cleanedImagePath = `${baseUrl}/${format}`
  }else{

    cleanedImagePath = imagePath;
  }
 
  return cleanedImagePath
  }

 

  customOptions: OwlOptions = {
    items: 4,
    loop: false,
    margin: 10,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: false, // Set this to true if you want navigation arrows
    dots: false, // Enable if you want dots navigation
  }
  customOptionsProminent: OwlOptions = {
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: false, // Set this to true if you want navigation arrows
    dots: false, // Enable if you want dots navigation
  }

  

}
