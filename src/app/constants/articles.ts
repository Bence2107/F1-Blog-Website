import {ArticleModel} from '../models/article_model';

export const news_article_list: ArticleModel[] = [
  {
    id: 1,
    url: "japan-versenyzo-japan-festes",
    title: "Fehérbe borul a Red Bull",
    summary: "Japán versenyző, japán festés",
    first_section: "Szép a fehér red bull",
    last_section: "Nyert is",
    date: "2025.04.02.",
    isReview: false
  },
  {
    id: 2,
    url: "ferrari-25-attores",
    title: "Áttörést találhatott a Ferrari",
    summary: "20 különböző szimulátor tapasztalat után visszatérhetnek a Pirosak?",
    first_section:
      "<p>Az olasz <i>Gazetta dello Sport</i> információi szerint a Ferrari szimulátorban komolyabb áttörésre tehetett szert, ami a 2025-ös szezon során az autójuk felerősödhet és nagyobb esélyekkel szállhat versenybe a konstruktőri, de akár az egyéni világbajnoki címért. " +
      "Minden kezdet nehéz, ahogy szokták mondani. Ez a Ferrarinál sincs másképp: Ausztráliában alig szerzett pontot a csapat, a kínai nagydíjon pedig mindkét pilótát kizárták technikai okokra hivatkozva. " +
      "A szezon harmadik hétvégéjére, a Japán Nagydíjra másfél hét készülődés jutott neki, amit úgy látszik ki is használtak, ugyanis a szimulátorban végzett kemény munkának köszönhetően megoldást találtak a beállítással kapcsolatos problémákra. A lap úgy nyilatkozott, az olasz csapat ez idő alatt 20 különböző szimulátor beállítást tesztelt, amivel megoldást találhatnak az autók problémáira. </p><br>",
    last_section: "A csapat biztos abban, hogy az idei autónak a tervezése rendben van, így bizakodóan állnak hozzá a suzukai hétvégéhez. A szezon során több fejlesztési csomagot is bejelentett a Ferrari, egyet Bahreinben, egyet pedig a Miami hétvége idején. ",
    date: "2025.04.01.",
    isReview: false
  },
  {
    id: 3,
    url: "lawson-red-bull-sokk",
    title: "Lawsont sokként érte a Red Bull döntése",
    summary: "Tsunoda adott esetben legyőzheti Verstappent",
    first_section: "Nem tudja",
    last_section: "Nem elég szép a Red Bull",
    date: "2025.03.31.",
    isReview: false
  },
  {
    id: 4,
    url: "verstappen-nyert-japan-festesben",
    title: "Verstappen nyerte a 2025-ös Japán nagydíjat",
    summary: "Szerencsét hozott a fehér festés",
    first_section: "Hiába a McLaren-ek gumielőnye",
    last_section: "Csapattársa hazájában ennek ellenére csak a 12. helyen zárt",
    date: "2025.04.06.",
    reviewUrl: "2025-japan-nagydij-osszefoglalo",
    isReview: false
  }
]

export const review_article_list: ArticleModel[] = [
  {
    id: 1,
    url: "2025-japan-nagydij-osszefoglalo",
    title: "A felkelő nap országában sokan visszaaludtak - 2025. Japán Nagydíj",
    summary: "Japán versenyző, japán festés",
    first_section: "Nyert a Red Bull",
    second_section: "Szabadedzést nem láttam",
    third_section: "Időmérőre a Red Bull (Verstappen) megtalálta a jobb beállításokat",
    fourth_section: "Vasárnapi felkelés nem tartott sok izgalmat",
    last_section: "Nyert a Red Bull, McLaren továbbra is ",
    date: "2025.04.02.",
    isReview: true

  },
]
