import { Button } from "@/components/ui/button";
import { AlertTriangle, Users } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
    <div className="max-w-md text-center">
      <div className="mb-8 text-9xl font-bold text-teal-600">404</div>

      <AlertTriangle
        className="mx-auto mb-6 size-20 stroke-[1.5] text-red-500"
        aria-hidden="true"
      />

      <h1 className="mb-4 text-3xl font-semibold text-gray-800">
        Page Not Found
      </h1>

      <p className="mb-8 text-gray-600">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back to safety.
      </p>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          className="border-teal-600 text-teal-600 hover:bg-teal-50"
          asChild
        >
          <Link to="/admin/users" className="flex items-center gap-2">
            <Users className="size-5" />
            Users Dashboard
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
