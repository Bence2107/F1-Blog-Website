import {CommentModel} from '../models/comment_model';

export const comments_list : CommentModel[] = [
  {
    id: 1,
    articleId: 4,
    userid: 1,
    content: "Szépen ment Max! aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaa aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaa aaaaaaaaaaaaaaaaaaaaa",
    timestamp: new Date()
  },
  {
    id: 2,
    articleId: 4,
    userid: 2,
    content: "Lol",
    timestamp: new Date()
  },
  {
    id: 3,
    articleId: 2,
    userid: 1,
    content: "Nem jók a ferrarik",
    timestamp: new Date()
  },
]
