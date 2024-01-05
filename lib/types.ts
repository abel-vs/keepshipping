export interface Ship {
  id: string;
  description: string;
  date: Date; // ISO date string
  user_id: string;
}

export interface UserDetails {
  username: string;
  bio: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
}
