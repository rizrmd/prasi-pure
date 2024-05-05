import { session } from "@/globals/session";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default {
  url: "/",
  page: () => {
    if (!session.user) {
      location.href = "/login";
    }

    return (
      <div className="p-w-full p-h-full p-flex p-items-center p-justify-center">
        <Loader2
          className={cn(
            "p-my-28 p-text-primary/60 p-animate-spin"
          )}
        />
      </div>
    );
  },
};
