import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NewsComponent} from './pages/news/news.component';
import {SignupComponent} from './pages/auth/signup/signup.component';
import {LoginComponent} from './pages/auth/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ArticleComponent} from './pages/article/article.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {authGuard, publicGuard} from './guards/auth.guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: "home", component: HomeComponent },

  { path: "news", component: NewsComponent },

  { path: "reviews", component: ReviewsComponent },

  { path: "login", component: LoginComponent, canActivate: [publicGuard] },

  { path: "signup", component: SignupComponent, canActivate: [publicGuard] },

  { path: "profile/:id", component: ProfileComponent, canActivate: [authGuard] },

  { path: "article/:url", component: ArticleComponent },

  { path: '**', component: NotfoundComponent },

];
