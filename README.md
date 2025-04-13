# Forma-1 blogger oldal (DRS Zóna)

## Üdvözöllek a Bahreini hétvége után! Részletezem a projektem akutális állását, hogy segítsem értékelőm becses munkáját!

---

## Installáció:

### 1. (Bármilyen IDE-ben)
```bash
git clone https://github.com/Bence2107/F1-Blog-Website
 ```
#### vagy GitHubon Code -> Download ZIP

### 2. (Függőségek telepítése)
```bash
npm install
```
### 3. (Szerver indítása)
```bash
ng serve
```

#### majd böngészőben `localhost:4200/`

---

## Pontozási segítség

### Adatmodell definiálása:

- **Interfészek**: models/article_model.ts, models/comment_model.ts, news_list_model.ts, user_model.ts
- **Kollekciók**: constants/articles.ts, constants/comments_list.ts, constants/news.ts, constants/users.ts

 - ### Felhasználási példák (Komponensenként .ts fájlban):

   - **articles.ts**:  pages/article komponens 
   - **comments_list.ts**: pages/article/article.comments komponens 
   - **news.ts**:  pages/article/components/article-comments komponens 
   - **users.ts**:  pages/article/article.comments komponens

### Attribútum direktívák:

   - **FormGroup**: pages/auth/login komponens
   - **RouteLink**: components/header komponens

### Beépített vezérlési folyamatok:

   - **NgIf**: pages/components/header komponens
   - **NgFor**: pages/article/components/article-comments komponens

### Adatátadás szülő és gyermek komponensek között: 

  - **@Input**: pages/home/components/primary-news-list komponens
  - **@Output**: pages/components/header komponens

### Material elemek:

  - mat-sidenav-container
  
  - mat-sidenav
  
  - mat-sidenav-content
  
  - mat-form-field
  
  - mat-label
  
  - mat-icon

  - matInput

  - matTooltip

  - matSnackBar

### Angular Formok: 

 - **pages/auth/login komponens**
 - **pages/auth/register komponens**

### Pipe osztály:

- **capitalizeFirst (CapitalizeFirstPipe Osztály)**:  Használata: pages/profile komponens
  
---

## Elérhetőség:

### Ha bármi kérdés van a projekttel kapcsolatban, Discordon bence2107 (régi név: Bence2107#3870) néven találtok meg!

---
