"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/lib/auth-client";
import { IoIosArrowDown } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UserDropdownMenu = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const userImage = session?.user?.image || "";

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!");
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  if (!session) return null;

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
        <DropdownMenuItem onClick={handleSignOut}>
          <div className="flex items-center gap-2 text-md cursor-pointer text-lg">
            <FiLogOut className="size-4 text-white" />
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
