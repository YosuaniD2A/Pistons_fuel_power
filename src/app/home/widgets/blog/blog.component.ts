import { Component, OnInit, Input } from '@angular/core';
import { BlogSlider } from '../../../shared/data/slider';
import { NewsService } from '../../../shared/services/news.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  
  @Input() blogs: any[] = [];

  newsList: any[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getAll().subscribe(data =>{
      this.newsList = data.articles.slice(4,7);    
    })
  }

  fixImage(urlImage: string): string{
    return urlImage.slice(0, urlImage.indexOf('?'))+'?resize=1000,591';
  }

  formatDateString(dateISO: string): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
  
    const date = new Date(dateISO);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    const monthName = months[monthIndex];
    const formattedDate = `${day} ${monthName} ${year}`;
  
    return formattedDate;
  }
  
  public BlogSliderConfig: any = BlogSlider;

}
