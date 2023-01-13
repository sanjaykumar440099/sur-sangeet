import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authService/auth.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from 'src/app/loader/loader.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;

  constructor(
    private authService: AuthService, 
    private alertController: AlertController,
    private ionLoader: LoaderService,
    private navController: NavController, 
    private router: Router,
    private toastController: ToastController
    ) {}

  ngOnInit() {}

  public SubmitLoginDetails() {
    this.ionLoader.showLoader();
    const form = {
      username: this.username,
      password: this.password,
    };
    this.authService.login(form).subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.ionLoader.hideLoader();
          this.navController.navigateRoot('/folder/inbox');
          this.presentToast();
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Welcome...! Successfully logged in.',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

}
