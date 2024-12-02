import { Avatar, AvatarFallback } from "../../components/ui/avatar";

const UserList = () => {
  return (
    <>
      <div className="space-y-2">
        <div className="border rounded-md">
          <p className="py-2 px-3">{"Ram" || "Unassignee"}</p>
        </div>
        {[1, 1, 1, 1].map((item) => (
          <div key={item} className="py-2 group hover:bgslate-800 cursor-pointer flex items-center rounded-md space-x-4  px-4 border ">
            <Avatar>
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-none">Code with Ash</p>
              <p className="text-sm text-muted-foreground">@Codewithash</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;
