export interface Comment {
  _id: string;
  date: string;
  message: string;
  author: {
    _id: string;
    fullName: string;
    avatar: string;
  };
}

export type PostType = {
  _id: string;
  caption: string;
  imageURL: string;
  thumbnailURL: string;
  author: {
    fullName: string;
    avatar: string;
  };
  filter: string;
  reactions: {
    reactions: Array<{
      _id: string;
      emoji: string;
      by: {
        _id: string;
        fullName: string;
        avatar: string;
      };
    }>;
  };
  comments: Comment[];
  commentCount: number;
};

export type PostProps = {
  post: PostType;
};
