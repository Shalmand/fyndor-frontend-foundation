/** Core domain types for Fyndor. Mirrors mock data shapes. */

export type ID = string;
export type ISODate = string;

export type StoryStatus = "ongoing" | "completed" | "hiatus" | "draft";
export type ContentRating = "general" | "teen" | "mature" | "explicit";
export type StoryKind = "original" | "fanfiction";

export interface Author {
  id: ID;
  handle: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  joinedAt: ISODate;
  followers: number;
  storiesCount: number;
  verified: boolean;
}

export interface Genre {
  id: ID;
  slug: string;
  name: string;
  description: string;
  accentColor: string;
}

export interface Franchise {
  id: ID;
  slug: string;
  name: string;
  description: string;
  coverUrl: string;
  storiesCount: number;
}

export interface Universe {
  id: ID;
  slug: string;
  name: string;
  description: string;
  coverUrl: string;
  franchiseId?: ID;
  curatorId: ID;
  loreCardIds: ID[];
}

export interface LoreCard {
  id: ID;
  universeId: ID;
  title: string;
  category: "character" | "location" | "artifact" | "event" | "concept";
  summary: string;
  imageUrl?: string;
}

export interface Story {
  id: ID;
  slug: string;
  title: string;
  subtitle?: string;
  synopsis: string;
  coverUrl: string;
  heroUrl?: string;
  kind: StoryKind;
  status: StoryStatus;
  rating: ContentRating;
  authorId: ID;
  universeId?: ID;
  franchiseId?: ID;
  genreIds: ID[];
  tags: string[];
  chaptersCount: number;
  wordsCount: number;
  readsCount: number;
  likesCount: number;
  publishedAt: ISODate;
  updatedAt: ISODate;
}

export interface ReadingList {
  id: ID;
  ownerId: ID;
  title: string;
  description: string;
  coverUrl: string;
  storyIds: ID[];
  isPublic: boolean;
  updatedAt: ISODate;
}

export interface Comment {
  id: ID;
  storyId: ID;
  chapterId?: ID;
  authorId: ID;
  body: string;
  likes: number;
  createdAt: ISODate;
  replyCount: number;
}

export interface Review {
  id: ID;
  storyId: ID;
  authorId: ID;
  rating: number; // 1..5
  title: string;
  body: string;
  createdAt: ISODate;
  helpfulCount: number;
}

export type NotificationKind =
  | "new_chapter"
  | "new_follower"
  | "comment_reply"
  | "story_recommended"
  | "system";

export interface Notification {
  id: ID;
  kind: NotificationKind;
  title: string;
  body: string;
  href?: string;
  read: boolean;
  createdAt: ISODate;
}
