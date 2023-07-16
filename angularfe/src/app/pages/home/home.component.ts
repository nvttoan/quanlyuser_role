import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images: string[] = [
    'https://cdnimg.vietnamplus.vn/uploaded/izhsa/2019_07_03/whatishrmwhyishrtechgainingpopularity.jpg',
    'https://www.talentnet.vn/sites/default/files/inline-images/ELSA1.png',
    'https://timviec365.vn/pictures/images_12_2020/cach-phat-bieu-truoc-cuoc-hop%20(3).jpg',
  ];
}
