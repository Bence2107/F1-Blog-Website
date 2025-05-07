export interface ArticleModel {
  id: string;
  url: string;
  title: string;
  summary: string;
  first_section: string;
  second_section?: string;
  third_section?: string;
  fourth_section?: string;
  last_section: string;
  date: string;
  reviewUrl?: string;
  isReview: boolean;
}
