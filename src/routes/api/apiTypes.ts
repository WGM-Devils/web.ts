type Id = string;
type AllType = "user" | "post" | "comment" | "like" | "userEvent" | "group";
interface User {
  id: Id;
  username: string;
  description: string;
  pfp: {
    extension: "png" | "jpg";
    link: string;
  };
  banner: {
    extension: "png" | "jpg";
    link: string;
  };
  likes: {
    count: number;
    collection: Id[];
  };
  comments: {
    count: number;
    collection: Id[];
  };
  posts: {
    count: number;
    collection: Id[];
  };
  views: {
    count: number;
    collection: Id[];
  };
  events: Id[];
  groups: Group[];
}
interface Group {
  id: Id;
  creator: Id;
  name: string;
  slogan: string;
  members: Id[];
}
interface UserEvent {
  id: Id[];
  name: string;
  description: string;
  logo: {
    type: "png" | "jpg";
    link: string;
  };
  host: Id;
  website: string;
  date: string;
}
interface Post {
  id: Id;
  user: Id;
  title: string;
  description: string;
  embed: {
    type: "link" | "sound" | "picture" | "video";
    link: string;
  };
  comments: {
    count: number;
    collection: Id[];
  };
  likes: {
    count: number;
    collection: Id[];
  };
  views: {
    count: number;
    collection: Id[];
  };
}
interface UserComment {
  id: Id;
  creator: Id;
  post: Id;
}
interface UserLike {
  id: Id;
  user: Id;
  post: Id;
}
export { Id, AllType, User, Group, UserEvent, Post, UserComment, UserLike };
