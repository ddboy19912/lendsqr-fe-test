import { UserStatus } from "@/types/User";
import { http, HttpResponse, type HttpHandler } from "msw";
import { users } from "./data/users";

export const handlers: HttpHandler[] = [
  http.get("/api/users/current", () => {
    const basicProfile = users[0];
    return HttpResponse.json({
      id: basicProfile.id,
      firstName: basicProfile.personalInfo.firstName,
      lastName: basicProfile.personalInfo.lastName,
      profileImage: basicProfile.personalInfo.profileImage,
    });
  }),

  // Get all users
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const hasLoans = url.searchParams.has("hasLoans");
    const hasSavings = url.searchParams.has("hasSavings");

    const filteredUsers = users.filter((user) => {
      const loanCondition = hasLoans ? user.meta.loanAmount > 0 : true;
      const savingsCondition = hasSavings ? user.meta.savingsAmount > 0 : true;
      return loanCondition && savingsCondition;
    });

    return HttpResponse.json({
      data: filteredUsers,
      total: filteredUsers.length,
    });
  }),

  // Get single user
  http.get("/api/users/:userId", ({ params }) => {
    const { userId } = params;
    const user = users.find((u) => u.id === userId);
    return user
      ? HttpResponse.json(user)
      : new HttpResponse(null, { status: 404 });
  }),

  // Search users
  http.get("/api/users/search", ({ request }) => {
    const url = new URL(request.url);
    const term = url.searchParams.get("q")?.toLowerCase() ?? "";

    const results = users.filter((user) => {
      const fullName =
        `${user.personalInfo.firstName} ${user.personalInfo.lastName}`.toLowerCase();
      return fullName.includes(term);
    });

    return HttpResponse.json(results);
  }),

  // Update user status
  http.patch<{ userId: string }, { status: UserStatus }>(
    "/api/users/:userId/status",
    async ({ params, request }) => {
      const { userId } = params;
      const { status } = await request.json();

      const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        return HttpResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      users[userIndex].meta.status = status;

      return HttpResponse.json(
        {
          success: true,
          data: users[userIndex],
        },
        { status: 200 }
      );
    }
  ),
];
