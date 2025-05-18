# Forma-1 blogger oldal (DRS Zóna)

## Üdvözöllek az Imolai hétvége után! Részletezem a projektem beadásra szánt állását, hogy segítsem értékelőm becses munkáját!

---

## Installáció:

### 0. A weboldal hostolt linkje:

>https://angular-project-396d7.web.app/home


### 1. (Bármilyen IDE-ben)
```bash
git clone https://github.com/Bence2107/F1-Blog-Website
 ```
#### vagy GitHubon Code -> Download ZIP

### 2. (Függőségek telepítése - valamilyen IDE-n vagy konzolban)
```bash
npm install
```
### 3. (Lokális(!) Szerver indítása)
```bash
ng serve
```

#### majd böngészőben `localhost:4200/`

---

## Pontozási segítség (példák amelyek megtalálhatóak a projektben)
> Fontos! Nem minden pontozási szempontot írtam le!

### Adatmodell definiálása:

- **Interfészek**: models/article_model.ts, models/comment_model.ts, news_list_model.ts, user_model.ts
- **Kollekciók (már nem releváns)**: constants/articles.ts, constants/comments_list.ts, constants/news.ts, constants/users.ts

 - ### Felhasználási példák (Komponensenként .ts fájlban) (nem releváns):

   - **articles.ts**:  pages/article komponens 
   - **comments_list.ts**: pages/article/article.comments komponens 
   - **news.ts**:  pages/article/components/article-comments komponens 
   - **users.ts**:  pages/article/article.comments komponens


### Példák attribútum direktívákra:

   - **FormGroup**: 
     - pages/auth/login komponens: loginForm
     - pages/auth/signup komponnens: registerForm
   - **RouteLink**: 
     - components/header komponens
     - pages/notfound komponens


### Példák beépített vezérlési folyamatokra:

   - **NgIf**: 
     - pages/components/header komponens
     - pages/news/news-list komponens
   - **NgFor**: 
     - pages/article/components/article-comments komponens
     - pages/home/primary-news-list komponens


### Pldák Adatátadás szülő és gyermek komponensek közöttre: 

  - **@Input**: 
    - pages/profile/users-comments komponens
    - pages/article/article-comments komponens
  - **@Output**: 
    - pages/components/header komponens

### Példák Material elemekre:

  - mat-sidenav-container
  
  - mat-sidenav
  
  - mat-sidenav-content
  
  - mat-form-field
  
  - mat-label
  
  - mat-icon

  - matInput

  - matTooltip

  - matSnackBar

  - mat-dialog

### Példák Pipe osztályra:

- **capitalizeFirst (CapitalizeFirstPipe Osztály)**:  
  - Használata: pages/profile komponens
- **dateFormat (DateFormatPipe Osztály)**: 
  - Használata: pages/article/article-comments komponens

  
### Példák Angular Formok-ra: 

 - **pages/auth/login komponens: loginForm**
 - **pages/auth/register komponens: registerForm**
 - **pages/article/article-comments komponens: newCommentForm**
 - **pages/comment-edit-dialog komponens: commentEditForm**

### Példák Lifecycle Hook használatára:
 
 - ngOnInit()

### Példák route-okra:

  - app.routes-ban, összesen 8

### Példák komplex Firestore lekérdezésekre (metódusokban):

  - services/comment/comment.service:
    - getComments() 
    - getUsersComments()
  - services/news/news-list.service:
    - getNewsLists()
    - getPrimaryNews()

### Példa AuthGuard implementációra:
  - guards/auth-guard

### Példa route levédésére azonosítással (AuthGuard):
  - login
  - signup
  - profile/:id

---
