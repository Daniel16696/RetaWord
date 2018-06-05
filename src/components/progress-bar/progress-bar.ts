import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RondasPage } from '../../pages/rondas/rondas';


@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
  public loadProgressTime: number = 60;
  public loadProgress: number = 100;
  @Input('progress') progress;
  public intervalo2;

  public constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
    // Para mostrar el tiempo que va retrocediendo
    this.intervalo2 = setInterval(() => {
      if (this.loadProgressTime <= 60) {
        this.loadProgressTime -= 1;
        // this.loadProgress -= 1.667;
        // console.log(this.loadProgressTime);
        // console.log(this.loadProgress);
      }
      if (this.loadProgress <= 100) {
        this.loadProgress -= 1.667;
        // console.log(this.loadProgress);
      }

      if (this.loadProgress == 3.313999999999922) {
        this.loadProgress = 1.667;
        // console.log("lo he puesto a 0"+this.loadProgress);
      }

      if (this.loadProgressTime <= 0) {
        alert("se ha terminado");
        clearInterval(this.intervalo2);
        this.navCtrl.push(RondasPage);
        // clearInterval(this.loadProgress);
      }
    }, 1000);

  }

  ngOnDestroy() {
    if (this.intervalo2) {
      clearInterval(this.intervalo2);
    }
  }
}
