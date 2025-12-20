import { Spinner } from "@/components/ui/spinner";

const loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background overflow-hidden">
      <Spinner className="size-10 text-primary" />
    </div>
  );
};

export default loading;
