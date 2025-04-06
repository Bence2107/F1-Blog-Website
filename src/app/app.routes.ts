import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NewsComponent} from './pages/news/news.component';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ArticleComponent} from './pages/article/article.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: "home", component: HomeComponent },

  { path: "news", component: NewsComponent },

  { path: "reviews", component: ReviewsComponent },

  { path: "login", component: LoginComponent },

  { path: "signup", component: SignupComponent },

  { path: "profile", component: ProfileComponent },

  { path: "article/:url", component: ArticleComponent },

];
