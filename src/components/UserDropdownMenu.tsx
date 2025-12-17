"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IoIosArrowDown } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { FiLogOut } from "react-icons/fi";

const UserDropdownMenu = () => {
  const { data: session, error, refetch } = authClient.useSession();
  const router = useRouter();
  const userImage = session?.user?.image || "";

  if (!session) {
    return null;
  }

  async function SignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to sign-in page
          toast.success("Logged out successfully");
        },
        onError: () => {
          toast.error("Failed to sign out");
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden md:block cursor-pointer outline-none">
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
          <div>
            <button
              onClick={SignOut}
              className="flex items-center gap-2 text-md cursor-pointer text-lg"
            >
              <FiLogOut className="size-4 text-white" />
              Logout
            </button>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownMenu;
