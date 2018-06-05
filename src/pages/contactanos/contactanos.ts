import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';


@IonicPage()
@Component({
  selector: 'page-contactanos',
  templateUrl: 'contactanos.html',
})
export class ContactanosPage {

  formularioContactanos: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userService: UserServiceProvider, public alertCtrl: AlertController) {
    this.formularioContactanos = this.crearFormularioDeContactanos();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactanosPage');
  }

  guardarConsultaDeContactanos() {
    console.log(this.formularioContactanos.value);
    try {
      console.log(this.formularioContactanos.value);
      console.log(this.formularioContactanos.value.name);
      console.log(this.formularioContactanos.value.email);
      console.log(this.formularioContactanos.value.comentario);


      this.userService.enviarEmailDeContactarnos(this.formularioContactanos.value.name, this.formularioContactanos.value.email, this.formularioContactanos.value.comentario);
      let alert = this.alertCtrl.create({
        title: 'Ha sido enviado el mensaje',
        subTitle: '¡Gracias por contactar con nosotros!',
        buttons: ['Ok']
      });
      this.navCtrl.pop();
      alert.present();
      this.formularioContactanos = this.crearFormularioDeContactanos();
    } catch (error) {
      console.log(error);
    }
  }

  private crearFormularioDeContactanos() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      comentario: ['', Validators.required],
    });
  }

}
