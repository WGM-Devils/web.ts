// Types

type Id = string;
type AllType = "user" | "post" | "comment" | "like" | "userEvent" | "group";

// Interfaces

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
  city: {
    latitude: string;
    longitude: string;
  };
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
  city: {
    latitude: string;
    longitude: string;
  };
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
    allowed: boolean;
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

// Function

function isUser(object: any): object is User {
  return "id" in object;
}
function isGroup(object: any): object is Group {
  return "id" in object;
}
function isUserEvent(object: any): object is UserEvent {
  return "id" in object;
}
function isPost(object: any): object is Post {
  return "id" in object;
}
function isUserComment(object: any): object is UserComment {
  return "id" in object;
}
function isUserLike(object: any): object is UserLike {
  return "id" in object;
}
export {
  Id,
  AllType,
  User,
  Group,
  UserEvent,
  Post,
  UserComment,
  UserLike,
  isUser,
  isGroup,
  isUserEvent,
  isPost,
  isUserComment,
  isUserLike,
};
