export interface CommentModel {
  id: number;
  articleId: number;
  userid: number;
  content: string;
  timestamp: Date;
}
