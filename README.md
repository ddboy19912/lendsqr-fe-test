# Lendsqr Admin Dashboard

A modern admin dashboard for managing users and organizational data, built with React and TypeScript.

![Dashboard Preview](https://i.ibb.co/4gS1BMK9/Screenshot-2025-02-22-at-15-05-18.png)

## Features

- **User Management**
  - View user list with pagination
  - Detailed user profiles
  - Status management (Active, Blacklisted, Pending)
- **Responsive Design**
  - Mobile-first approach
  - Adaptive layout for all screen sizes
  - Collapsible sidebar
- **Authentication**
  - Protected routes
  - Role-based access control
- **Data Visualization**
  - Interactive tables with sorting/filtering
  - Pagination and virtual scrolling
- **UI Components**
  - Customizable theme
  - Reusable components library
  - Accessible ARIA labels

### Backend Services

- **Netlify Functions**
  - Serverless API endpoints
  - Mock user data generation
  - Status update endpoints
- **Local Development Server**
  - Hot-reload for API changes
  - Integrated with frontend dev server
  - CORS configuration

## Built With

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Table](https://tanstack.com/table/v8)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ddboy19912/lendsqr-admin-dashboard.git
```

2. Install dependencies:

```bash
npm install
```

3. Start development servers (frontend + backend):

```bash
npm run dev
```

4. Access endpoints:

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000/api/users`

## Project Structure

```
netlify/
└── functions/
    └── server.js       # Netlify function entry point
src/
├── __tests__/                # Main test directory
│   └──components/           # Component integration tests
|
├── components/       # Reusable components
│   ├── layout/       # Layout components
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom hooks
├── pages/            # Page components
├── styles/           # Global styles and mixins
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

## Development Scripts

```bash
# Start frontend only
npm run dev:frontend

# Start backend server only
npm run dev:server

# Run both simultaneously
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Backend Implementation

The server uses Express.js with Netlify Functions:

```javascript
// Mock data generation
const allUsers = Array.from({ length: 1000 }, () => ({
  id: faker.string.alpha(11),
  meta: {
    status: faker.helpers.arrayElement([
      "active",
      "inactive",
      "blacklisted",
      "pending",
    ]),
  },
}));

// API endpoints
router.get("/users", (req, res) => {
  res.json(allUsers.slice(0, req.query.count));
});

// Netlify function handler
export const handler = serverless(app);
```

## Testing

Run the full test suite including API mocks:

```bash
npm test
```

## Deployment

The project is configured for Netlify deployment:

- Automatic function detection in `netlify/functions`
- CI/CD pipeline with branch deploys
- Serverless function scaling

## Acknowledgements

- [Lendsqr](https://lendsqr.com/) for design inspiration and task
- [Vite React Template](https://vitejs.dev/guide/)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
