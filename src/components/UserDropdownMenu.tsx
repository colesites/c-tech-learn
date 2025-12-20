import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getSession } from "@/lib/auth-server";
import { signOutAction } from "@/app/actions/auth";
import { IoIosArrowDown } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { FiLogOut } from "react-icons/fi";

const UserDropdownMenu = async () => {
  const session = await getSession();
  const userImage = session?.user?.image || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src={userImage} />
            <AvatarFallback>
              {session?.user?.name?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <IoIosArrowDown className="size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{session?.user?.name}</h2>
            <p className="text-sm">{session?.user?.email}</p>
          </div>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-md cursor-pointer text-lg"
            >
              <FiLogOut className="size-4 text-white" />
              Logout
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
