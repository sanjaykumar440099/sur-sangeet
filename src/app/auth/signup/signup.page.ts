import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  username: any;
  password: any;
  firstname: any;
  lastname: any;
  email: any;

  constructor(
    private authService: AuthService, 
    private alertController: AlertController,
    private ionLoader: LoaderService
  ) { }

  ngOnInit() {
  }

  public SubmitSignupDetails() {
    this.ionLoader.showLoader();
    const form = { 
      firstName: this.firstname,
      lastName: this.lastname,
      userName: this.username,
      email: this.email,
      password: this.password
      
    };
    this.authService.signup(form).subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.ionLoader.hideLoader();
        } else {
          this.presentAlert(res);
          this.ionLoader.hideLoader();
        }
      },(err) => {
        this.ionLoader.hideLoader();
        console.log(err);
      }
    );
  }

  async presentAlert(res: any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Ivalid Input',
      message: res.message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
