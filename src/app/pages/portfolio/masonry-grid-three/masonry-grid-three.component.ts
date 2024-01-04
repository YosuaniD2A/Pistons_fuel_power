import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ButtonsConfiguration } from '../../../shared/data/portfolio';
import { Image } from '@ks89/angular-modal-gallery';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ImageModalComponent } from 'src/app/shared/components/modal/image-modal/image-modal.component';

@Component({
  selector: 'app-masonry-grid-three',
  templateUrl: './masonry-grid-three.component.html',
  styleUrls: ['./masonry-grid-three.component.scss']
})
export class MasonryGridThreeComponent implements OnInit, AfterViewInit {

  public galleryFilter: string;
  public collection: string;
  public Images;

  mostrarImagenDeCarga = true;
  imagenCargada = false;

  showModal: boolean = false;
  selectedImageUrl: string = '';

  public AllImage = [
    new Image(1, { img: 'https://www.dropbox.com/scl/fi/3tjybtha0r4q7dopr28pp/HP-Power-Pistons-Fuel-Power.jpeg?rlkey=9j557ibhxe1ddxil9u1zkugle&dl=1' }),
    new Image(2, { img: 'https://www.dropbox.com/scl/fi/olktojmjjot0qjhc56baa/Dodge-Hemi-Pistons-Fuel-Power.jpeg?rlkey=0ewlwb0bbzqj7rzdvjxp9c2rb&dl=1' }),
    new Image(3, { img: 'https://www.dropbox.com/scl/fi/2omw57cqdv4xy2whyiqlo/Dodge-Daytona.jpeg?rlkey=2eq8t9vyvfpdnljv1pjkh9umq&dl=1' }),
    new Image(4, { img: 'https://www.dropbox.com/scl/fi/jsafuesdopgqrmw4zjeg2/Dodge-Charger-Rt-Pistons-Fuel-power.jpeg?rlkey=8im78du5l46pkpcz0jqcl5z0k&dl=1' }),
    new Image(5, { img: 'https://www.dropbox.com/scl/fi/alivtlxq3luqcld3hrat2/Mustang-PIstons-Fuel-Power.jpeg?rlkey=22f9vqqkjavkprjc9g8k09fji&dl=1' }),
    new Image(6, { img: 'https://www.dropbox.com/scl/fi/5f5jbeqfy4lte7t59101z/Modified-Camaro-PIstons-Fuel-Power.jpeg?rlkey=k1veky2qbevjcf7mpqpunrx1k&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/j3wbwkva9fnuiid9gp3jb/dodge-Charger-Pistons-Fuel-Power.jpeg?rlkey=vpk2rofsnxx6pzosruky1ejpy&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/rhy6guss7mu11qs9ererk/Dodge-Charger-Pistons-_Fuel-Power.jpeg?rlkey=1px8tq18c4oc5wt58s3wxn1as&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/31i3lsanp9qvs7k93jfc2/Dodge-Challenger-Pistons-Fuel-Power.jpeg?rlkey=rhdi34ar084w9e5bz4lu1fnb3&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/nq1flj8y13p314capkhlg/Cutlas-Pistons-Fuel-Power.jpeg?rlkey=6abunfcgwvsuzwyrzjq0ng2l4&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/3v3hr5jkg3cvek39kujrq/Custom-SS-Pistons-Fuel-Power.jpeg?rlkey=g05e4nmsiljxsbgwruf48p614&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/9gt4beluc6ftorut9wzwt/Camaro-Pistons-Fuel-Power.jpeg?rlkey=r9kp786gogeut964m8me3cz36&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/bas43larpl7or5rb21mjs/American-Muscle-Pistons-Fuel-Power.jpeg?rlkey=7007q7bm7znpfucrv7yrjvxju&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/wck3knlt7yzsu86v679il/Vintage-Ride-Pistons-Fuel-Power.jpeg?rlkey=rfvkfgbkv5ow5q2tesgxfksem&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/w6p5kxvdagpnefz5vzmsf/Triumph-Pistons-Fuel-Power.jpeg?rlkey=fz7b6nltiam6x226xgfw8j200&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/yrieesutyfsv4m9vqxirl/Triumph-Cafe-Racer-Pistons-Fuel-Power.jpeg?rlkey=cphya3p4xdcy7wg6opniy36qh&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/vvsfptwi3hn56yjzyzw8v/Triumph-Bobber-Pistons-Fuel-Power.jpeg?rlkey=ginw1guf8l1ivuv1wob7vw42q&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/n80coy2l4qme3st2f8u1v/Rubber-Luver-PIstons-Fuel-Power.jpeg?rlkey=cprif68arcsxx5yuir58wfalq&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/4gmyyzhttcmnyw2dg7p2z/RetroRacer-Pistons-Fuel-Power.jpeg?rlkey=cuhbg5u6gjb0r6ntjch2sdtcn&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/fzjshghfhqyiz2gt2npwm/Honda-Axis-Pistons-Fuel-Power.jpeg?rlkey=inlkcjckra7sapd7b6a4r382b&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/8g1f61u1z5eregju6kbuf/Harley-Davidson-PIstons-Fuel-Power.jpeg?rlkey=wz2xelstlbpj0iab0dpom25bl&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/g6nqauf3v0lhuvhkvzw7q/Harley-Davidson-Custom-Pistons-Fuel-Power.jpeg?rlkey=btfej8168l8j9swqgw7s3xbyd&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/b1r2ruv2ukb8gl7n4dy83/Custom-Chopper-Pistons-Fuel-Power.jpeg?rlkey=1pnvoc1x0mkd14qnwq303wk5v&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/xm9b7tzaiqa8q6pc6cj1n/Chopper-Classic-Pistons-Fuel-Power.jpeg?rlkey=fjjca9roldf39xt2yldasbccb&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/gsg2citlso7u3t1m5llj6/BMW-r80-Pistons-Fuel-Power.jpeg?rlkey=vorjazr2uw5xq1izcog33kji6&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/x6aqcdjw29t1094boittf/1957-Triumph-Thunderbird-Pistons-Fuel-Power.jpeg?rlkey=16vf71ec9am98i7obh70yh9as&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/87vlbio9fxtolmxusej32/Timeless-Machine-Pistons-Fuel-Power.jpeg?rlkey=d1tbokk6nenf22jcciy889z67&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/5n2t0ab8a60umt9ssgzuo/Porsche-PIstons-Fuel-Power.jpeg?rlkey=b0nt3xgv32quohiesd5clldyl&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/xeuragrao3sqq1q4tayd6/Maserati-Pistons-Fuel-Power.jpeg?rlkey=brmv0cwo7cd96i9mmx74o3f0c&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/z59p6ix5psnyep83le0xd/GT-Pistons-Fuel-Power.jpeg?rlkey=gatse94aia039ydrr0y5vq3we&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/e59r47dn5q11j819qhtnx/Ford-1946-Pistons-Fuel-Power.jpeg?rlkey=ke9b0eni60gfjwmxxaz3ygcds&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/0ugwueiqui14gclstwqwg/Ferrari-Testarosa-Pistons-Fuel-Power.jpeg?rlkey=kiv11erqasmkq3a53iqeqeu05&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/tj2kw9o0roak0grn51rz5/Dodge-Royal-Lancer-Pistons-Fuel-Power.jpeg?rlkey=hpvd7plnhk4xj2mkmei78jfx0&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/j96g7chzrl8nftyhrfg4r/Dodge-Royal-Lancer-interior-Pistons-Fuel-Power.jpeg?rlkey=mx8a4iaivednjbftvd5ffolkz&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/mtmrg1xdl48ogb7eauq9f/Custom-Ford-Classic-PIstons-Fuel-Power.jpeg?rlkey=0hmhmampopi0m39fgc35zozs7&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/pnw7btwzc16ed66s1xgsy/Classic-Plymouth-Pistons-Fuel-Power.jpeg?rlkey=x1y3rqi4p5hqwfyq92xnztrx9&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/v3p5xoy25653fm0oaj5ct/Classic-Mercedes-Diesel-PIstons-Fuel-POwer.jpeg?rlkey=fbs5xfcln4i29yrsuk2sr02i6&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/7gqe1ygp73zjfj84ox1g7/Classic-Ferrari-Pistons-Fuel-Power.jpeg?rlkey=qbomjt4xu6qbzeamgb6mwsf7o&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/dvqf80m4iokshhgyhh9fa/Chevrolet-Classic-Pistons-Fuel-Power.jpeg?rlkey=2tddo8a65nbk5jw0en1shlvid&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/3zap52l3cxiv185ge77uw/1940-Motor-LS3-Pistons-Fuel-Power.jpeg?rlkey=myi01sd2fol55nnbxnqkmw4hz&dl=1' })

  ];

  public MuscleImage = [
    new Image(1, { img: 'https://www.dropbox.com/scl/fi/3tjybtha0r4q7dopr28pp/HP-Power-Pistons-Fuel-Power.jpeg?rlkey=9j557ibhxe1ddxil9u1zkugle&dl=1' }),
    new Image(2, { img: 'https://www.dropbox.com/scl/fi/olktojmjjot0qjhc56baa/Dodge-Hemi-Pistons-Fuel-Power.jpeg?rlkey=0ewlwb0bbzqj7rzdvjxp9c2rb&dl=1' }),
    new Image(3, { img: 'https://www.dropbox.com/scl/fi/2omw57cqdv4xy2whyiqlo/Dodge-Daytona.jpeg?rlkey=2eq8t9vyvfpdnljv1pjkh9umq&dl=1' }),
    new Image(4, { img: 'https://www.dropbox.com/scl/fi/jsafuesdopgqrmw4zjeg2/Dodge-Charger-Rt-Pistons-Fuel-power.jpeg?rlkey=8im78du5l46pkpcz0jqcl5z0k&dl=1' }),
    new Image(5, { img: 'https://www.dropbox.com/scl/fi/alivtlxq3luqcld3hrat2/Mustang-PIstons-Fuel-Power.jpeg?rlkey=22f9vqqkjavkprjc9g8k09fji&dl=1' }),
    new Image(6, { img: 'https://www.dropbox.com/scl/fi/5f5jbeqfy4lte7t59101z/Modified-Camaro-PIstons-Fuel-Power.jpeg?rlkey=k1veky2qbevjcf7mpqpunrx1k&dl=1' }),
    new Image(7, { img: 'https://www.dropbox.com/scl/fi/3tjybtha0r4q7dopr28pp/HP-Power-Pistons-Fuel-Power.jpeg?rlkey=9j557ibhxe1ddxil9u1zkugle&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/j3wbwkva9fnuiid9gp3jb/dodge-Charger-Pistons-Fuel-Power.jpeg?rlkey=vpk2rofsnxx6pzosruky1ejpy&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/rhy6guss7mu11qs9ererk/Dodge-Charger-Pistons-_Fuel-Power.jpeg?rlkey=1px8tq18c4oc5wt58s3wxn1as&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/31i3lsanp9qvs7k93jfc2/Dodge-Challenger-Pistons-Fuel-Power.jpeg?rlkey=rhdi34ar084w9e5bz4lu1fnb3&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/nq1flj8y13p314capkhlg/Cutlas-Pistons-Fuel-Power.jpeg?rlkey=6abunfcgwvsuzwyrzjq0ng2l4&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/3v3hr5jkg3cvek39kujrq/Custom-SS-Pistons-Fuel-Power.jpeg?rlkey=g05e4nmsiljxsbgwruf48p614&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/9gt4beluc6ftorut9wzwt/Camaro-Pistons-Fuel-Power.jpeg?rlkey=r9kp786gogeut964m8me3cz36&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/bas43larpl7or5rb21mjs/American-Muscle-Pistons-Fuel-Power.jpeg?rlkey=7007q7bm7znpfucrv7yrjvxju&dl=1' }),
  ]

  public MotorsImages = [
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/wck3knlt7yzsu86v679il/Vintage-Ride-Pistons-Fuel-Power.jpeg?rlkey=rfvkfgbkv5ow5q2tesgxfksem&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/w6p5kxvdagpnefz5vzmsf/Triumph-Pistons-Fuel-Power.jpeg?rlkey=fz7b6nltiam6x226xgfw8j200&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/yrieesutyfsv4m9vqxirl/Triumph-Cafe-Racer-Pistons-Fuel-Power.jpeg?rlkey=cphya3p4xdcy7wg6opniy36qh&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/vvsfptwi3hn56yjzyzw8v/Triumph-Bobber-Pistons-Fuel-Power.jpeg?rlkey=ginw1guf8l1ivuv1wob7vw42q&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/n80coy2l4qme3st2f8u1v/Rubber-Luver-PIstons-Fuel-Power.jpeg?rlkey=cprif68arcsxx5yuir58wfalq&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/4gmyyzhttcmnyw2dg7p2z/RetroRacer-Pistons-Fuel-Power.jpeg?rlkey=cuhbg5u6gjb0r6ntjch2sdtcn&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/fzjshghfhqyiz2gt2npwm/Honda-Axis-Pistons-Fuel-Power.jpeg?rlkey=inlkcjckra7sapd7b6a4r382b&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/8g1f61u1z5eregju6kbuf/Harley-Davidson-PIstons-Fuel-Power.jpeg?rlkey=wz2xelstlbpj0iab0dpom25bl&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/g6nqauf3v0lhuvhkvzw7q/Harley-Davidson-Custom-Pistons-Fuel-Power.jpeg?rlkey=btfej8168l8j9swqgw7s3xbyd&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/b1r2ruv2ukb8gl7n4dy83/Custom-Chopper-Pistons-Fuel-Power.jpeg?rlkey=1pnvoc1x0mkd14qnwq303wk5v&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/xm9b7tzaiqa8q6pc6cj1n/Chopper-Classic-Pistons-Fuel-Power.jpeg?rlkey=fjjca9roldf39xt2yldasbccb&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/gsg2citlso7u3t1m5llj6/BMW-r80-Pistons-Fuel-Power.jpeg?rlkey=vorjazr2uw5xq1izcog33kji6&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/x6aqcdjw29t1094boittf/1957-Triumph-Thunderbird-Pistons-Fuel-Power.jpeg?rlkey=16vf71ec9am98i7obh70yh9as&dl=1' })
  ]

  public ClassicImages = [
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/87vlbio9fxtolmxusej32/Timeless-Machine-Pistons-Fuel-Power.jpeg?rlkey=d1tbokk6nenf22jcciy889z67&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/5n2t0ab8a60umt9ssgzuo/Porsche-PIstons-Fuel-Power.jpeg?rlkey=b0nt3xgv32quohiesd5clldyl&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/xeuragrao3sqq1q4tayd6/Maserati-Pistons-Fuel-Power.jpeg?rlkey=brmv0cwo7cd96i9mmx74o3f0c&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/z59p6ix5psnyep83le0xd/GT-Pistons-Fuel-Power.jpeg?rlkey=gatse94aia039ydrr0y5vq3we&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/e59r47dn5q11j819qhtnx/Ford-1946-Pistons-Fuel-Power.jpeg?rlkey=ke9b0eni60gfjwmxxaz3ygcds&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/0ugwueiqui14gclstwqwg/Ferrari-Testarosa-Pistons-Fuel-Power.jpeg?rlkey=kiv11erqasmkq3a53iqeqeu05&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/tj2kw9o0roak0grn51rz5/Dodge-Royal-Lancer-Pistons-Fuel-Power.jpeg?rlkey=hpvd7plnhk4xj2mkmei78jfx0&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/j96g7chzrl8nftyhrfg4r/Dodge-Royal-Lancer-interior-Pistons-Fuel-Power.jpeg?rlkey=mx8a4iaivednjbftvd5ffolkz&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/mtmrg1xdl48ogb7eauq9f/Custom-Ford-Classic-PIstons-Fuel-Power.jpeg?rlkey=0hmhmampopi0m39fgc35zozs7&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/pnw7btwzc16ed66s1xgsy/Classic-Plymouth-Pistons-Fuel-Power.jpeg?rlkey=x1y3rqi4p5hqwfyq92xnztrx9&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/v3p5xoy25653fm0oaj5ct/Classic-Mercedes-Diesel-PIstons-Fuel-POwer.jpeg?rlkey=fbs5xfcln4i29yrsuk2sr02i6&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/7gqe1ygp73zjfj84ox1g7/Classic-Ferrari-Pistons-Fuel-Power.jpeg?rlkey=qbomjt4xu6qbzeamgb6mwsf7o&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/dvqf80m4iokshhgyhh9fa/Chevrolet-Classic-Pistons-Fuel-Power.jpeg?rlkey=2tddo8a65nbk5jw0en1shlvid&dl=1' }),
    new Image(8, { img: 'https://www.dropbox.com/scl/fi/3zap52l3cxiv185ge77uw/1940-Motor-LS3-Pistons-Fuel-Power.jpeg?rlkey=myi01sd2fol55nnbxnqkmw4hz&dl=1' })
  ]

  public BadgesImages = [
    new Image(8, { img: 'https://img.freepik.com/vector-gratis/etiqueta-vintage-composicion-letras-oscuridad_1284-43724.jpg?size=626&ext=jpg&ga=GA1.2.1997202244.1697674262&semt=ais' }),
    new Image(8, { img: 'https://img.freepik.com/vector-gratis/diseno-etiqueta-vintage-composicion-letras_1284-47152.jpg?size=626&ext=jpg&ga=GA1.2.1997202244.1697674262&semt=ais' }),
    new Image(8, { img: 'https://img.freepik.com/vector-gratis/insignia-autoridad-clasica-sobre-fondo-foto_23-2147504408.jpg?size=626&ext=jpg&ga=GA1.2.1997202244.1697674262&semt=ais' }),
    new Image(8, { img: 'https://img.freepik.com/vector-gratis/logo-detallado-dibujado-mano_52683-83793.jpg?size=626&ext=jpg&ga=GA1.2.1997202244.1697674262&semt=ais' }),
    new Image(8, { img: 'https://assets.turbologo.com/blog/es/2019/10/19133003/harley-davidson-logo-evolution-958x575.jpg' }),
    new Image(8, { img: 'https://i.pinimg.com/originals/f0/e1/c1/f0e1c1907b9050a6b992a11424410c30.jpg' }),
  ]

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.collection = params.collection ? params.collection : 'all';

      if(this.collection === "Muscle cars")
        this.collection = "Muscle_cars"

      this.filter(this.collection);
      console.log(this.galleryFilter);
    });

    console.log(this.Images);
    
    
   }

  ngOnInit(): void {
    // this.Images = this.AllImage
    this.showModal = false;
  }

  ngAfterViewInit(): void {
    setTimeout(function () {
      // vanilla JS
      var grid = document.querySelector('.isotopeContainer');
      new (<any>window).Isotope(grid, {
        // options...
        itemSelector: '.isotopeSelector'
      });
    }, 1000);
  }


  openModal(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  cargarImagenPorDefecto(image: any) {
    image.modal.img = 'assets/images/portfolio/1.jpg';
    this.mostrarImagenDeCarga = false;
  }

  imageCloaded() {
    this.imagenCargada = true;
    this.mostrarImagenDeCarga = false;
  }

  openImage(image) {
    const index: number = this.getCurrentIndexCustomLayout(image, this.Images);
    // this.GalleryConfig = Object.assign({}, this.GalleryConfig, { 
    //     layout: new AdvancedLayout(index, true) 
    // });
  }

  getCurrentIndexCustomLayout(image: Image, images: Image[]): number {
    return image ? images.indexOf(image) : -1;
  };

  filter(term) {

    if (term == 'all') {
      this.Images = this.AllImage
    } else if (term == 'Muscle_cars') {
      this.Images = this.MuscleImage
    } else if (term == 'Motorcycles') {
      this.Images = this.MotorsImages
    } else if (term == 'Classics') {
      this.Images = this.ClassicImages
    }else if (term == 'Badges') {
      this.Images = this.BadgesImages
    }

    this.galleryFilter = term

    // For isotop layout
    setTimeout(function () {
      // vanilla JS
      var grid = document.querySelector('.isotopeContainer');
      new (<any>window).Isotope(grid, { filter: '.' + term });
    }, 500);

  }

}
