import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabValue } from "@/types/Tabs";
import type { User } from "@/types/User";
import { lazy } from "react";

const GeneralDetails = lazy(() => import("./GeneralDetails"));

export const NavigationTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabValue;
  setActiveTab: (value: TabValue) => void;
}) => (
  <Tabs
    className="hide-scrollbar overflow-auto"
    value={activeTab}
    onValueChange={(v) => setActiveTab(v as TabValue)}
  >
    <TabsList className="lg::px-9 grid h-full w-[calc(100%+200px)] grid-cols-6 px-6 py-0 lg:w-full">
      {[
        { value: "general details", label: "General Details" },
        { value: "documents", label: "Documents" },
        { value: "bank details", label: "Bank Details" },
        { value: "loans", label: "Loans" },
        { value: "savings", label: "Savings" },
        { value: "apps and details", label: "Apps & Details" },
      ].map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);

export const ContentTabs = ({
  activeTab,
  user,
  isError,
}: {
  activeTab: TabValue;
  user?: User;
  isError?: boolean;
}) => (
  <Tabs value={activeTab}>
    {[
      {
        value: "general details",
        content: user ? <GeneralDetails user={user} /> : null,
      },
      { value: "documents", content: "Documents Content" },
      { value: "bank details", content: "Bank Details Content" },
      { value: "loans", content: "Loans Content" },
      { value: "savings", content: "Savings Content" },
      { value: "apps and details", content: "Apps & Details Content" },
    ].map((tab) => (
      <TabsContent key={tab.value} value={tab.value}>
        {!isError ? (
          tab.content
        ) : (
          <div className="p-6 pt-20 text-center text-red-500">
            <h3 className="text-xl font-semibold">User Data Not Found</h3>
            <p className="text-secondary-font-color mt-2">
              The requested user information could not be loaded
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        )}
      </TabsContent>
    ))}
  </Tabs>
);
