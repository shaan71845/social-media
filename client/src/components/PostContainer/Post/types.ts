export type PostType = {
  _id: string;
  title: string;
  likes: string[];
  description: string;
  imgURL: string;
  creator: string;
  createdAt: Date;
  tags: string[];
};

export type PostProps = {
  post: PostType;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: (id: string) => void;
};
