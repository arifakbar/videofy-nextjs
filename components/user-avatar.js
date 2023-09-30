import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ src, className }) => {
  return (
    <Avatar className={`h-7 w-7 md:h-10 md:w-10 ${className}`}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
