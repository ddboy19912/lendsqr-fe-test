import { AvatarPlaceholder } from "@/assets";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/hooks/useUsers";
import { useUserStatus } from "@/hooks/useUserStatus";
import { formatAmount } from "@/lib/helpers";
import { TabValue } from "@/types/Tabs";
import { lazy, useState } from "react";
import { Link, useParams } from "react-router-dom";

const NavigationTabs = lazy(() =>
  import("./UserDetailsTabs").then((module) => ({
    default: module.NavigationTabs,
  }))
);

const ContentTabs = lazy(() =>
  import("./UserDetailsTabs").then((module) => ({
    default: module.ContentTabs,
  }))
);

const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const {
    data: user,
    refetch,
    isError,
    isLoading,
  } = useUserDetails(userId ?? "");

  const [activeTab, setActiveTab] = useState<TabValue>("general details");
  const { mutate } = useUserStatus();

  if (isLoading) return <LoadingSpinner />;

  const handleStatusChange = (status: "blacklisted" | "active") => {
    if (!userId) return;

    mutate(
      { userId, status },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div>
      <Link to="/admin/users" className="text-secondary-font-color">
        <Icon icon="back" size={30} className="mr-[13px]" /> Back to Users
      </Link>
      <div className="chromebook:mt-[26px] mt-10 flex flex-col items-start justify-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <h2 className="text-primary-blue font-medium">Users</h2>
        <div className="flex gap-3 md:gap-5">
          <Button
            onClick={() => handleStatusChange("blacklisted")}
            className="border-red text-red hover:bg-red cursor-pointer border bg-transparent px-4 py-[11.5px] text-xs font-semibold tracking-[0.1em] uppercase shadow-none transition-colors duration-200 hover:text-white md:text-sm"
          >
            Blacklist User
          </Button>
          <Button
            onClick={() => handleStatusChange("active")}
            className="border-teal text-teal hover:bg-teal cursor-pointer border bg-transparent px-4 py-[11.5px] text-xs font-semibold tracking-[0.1em] uppercase shadow-none transition-colors duration-200 hover:text-white md:text-sm"
          >
            Activate User
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <Card>
          <div className="flex flex-col items-center px-[30px] pt-[30px] pb-[51px] lg:flex-row">
            <div className="flex flex-col items-center gap-5 lg:flex-row">
              {user?.personalInfo.profileImage ? (
                <img
                  className="size-[100px] rounded-full object-cover"
                  src={user?.personalInfo.profileImage}
                  alt={user?.personalInfo.firstName}
                  loading="lazy"
                />
              ) : (
                <img
                  loading="eager"
                  className="size-[100px] rounded-full object-cover"
                  src={AvatarPlaceholder}
                  alt="avatar-placeholder"
                />
              )}
              <div>
                <h3 className="text-center font-medium lg:text-left">
                  {user?.personalInfo.firstName} {user?.personalInfo.lastName}
                </h3>
                <p className="leadnig-[1.2] text-secondary-font-color mt-2 text-center text-sm font-normal lg:text-left">
                  {user?.id}
                </p>
              </div>
            </div>
            <hr className="bg-secondary-font-color my-[30px] h-[1px] w-full opacity-20 lg:mx-[30px] lg:h-[80px] lg:w-[1px]" />
            <div className="flex flex-col items-center justify-center">
              <p className="!text-sm leading-[1.2] font-medium">User's Tier</p>
              <div className="space-x-1">
                {Array(3)
                  .fill(0)
                  .map((_, i) => {
                    const isFilled = i < (user?.account.tier ?? 0);
                    const key = "star" + i;

                    return (
                      <Icon
                        icon={isFilled ? "filled-star" : "star"}
                        size={16}
                        key={key}
                      />
                    );
                  })}
              </div>
            </div>
            <hr className="bg-secondary-font-color my-[30px] h-[1px] w-full opacity-20 lg:mx-[30px] lg:h-[80px] lg:w-[1px]" />
            <div className="flex flex-col justify-center">
              <h3 className="text-center leading-[1.1] font-medium lg:text-left">
                ₦{formatAmount(Number(user?.account.balance), { decimals: 2 })}
              </h3>
              <p className="small-text mt-3 text-center lg:text-left">
                {user?.account.number}/{user?.account.bank}
              </p>
            </div>
          </div>
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </Card>

        <Card className="mt-[30px] min-h-[910px] p-[30px] pb-[46px]">
          <ContentTabs isError={isError} activeTab={activeTab} user={user} />
        </Card>
      </div>
    </div>
  );
};

export default UserDetailsPage;
