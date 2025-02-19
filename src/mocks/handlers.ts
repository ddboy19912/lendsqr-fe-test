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
  http.get("/api/users", async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return HttpResponse.json({
      data: users,
      total: users.length,
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
];
