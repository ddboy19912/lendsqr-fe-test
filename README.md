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

3. Start development server:

```bash
npm run dev
```

4. Open in browser:

```bash
http://localhost:5173
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── layout/       # Layout components
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom hooks
├── pages/            # Page components
├── styles/           # Global styles and mixins
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

## Documentation

### Key Implementation Details

- **Routing**  
  Protected routes with lazy loading and code splitting

  ```jsx
  <Route
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path="/admin/users" element={<UsersPage />} />
  </Route>
  ```

- **Data Table**  
  Virtualized table with dynamic columns

  ```tsx
  <DataTable
    data={users}
    columns={userColumns}
    statusColumn={{
      accessorKey: "meta.status",
      configs: STATUS_CONFIGS,
    }}
  />
  ```

- **Responsive Design**  
  Mobile-first approach with breakpoint mixins
  ```scss
  @include mobile {
    padding: 0.5rem;
  }
  ```

## Acknowledgements

- [Lendsqr](https://lendsqr.com/) for design inspiration and task
- [Vite React Template](https://vitejs.dev/guide/)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
