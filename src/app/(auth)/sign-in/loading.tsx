import { Spinner } from "@/components/ui/spinner";

const loading = () => {
  return (
    <div className="flex h-dvh lg:h-full w-full items-center justify-center bg-background">
      <Spinner className="size-10 text-primary" />
    </div>
  );
};

export default loading;
