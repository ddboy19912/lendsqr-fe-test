import {
  formatAmount,
  formatMonthsToYears,
  formatPhoneNumber,
  replaceHyphensWithSpaces,
} from "@/lib/helpers";
import { User } from "@/types/User";
import React from "react";

const GeneralDetails = ({ user }: { user: User }) => {
  console.log(user);
  return (
    <div>
      <div className="flex flex-col">
        <p className="font-medium">Personal Information</p>
        <div className="chromebook:grid-cols-5 mt-[30px] grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Full Name
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.personalInfo.firstName} {user.personalInfo.lastName}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Phone Number
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {formatPhoneNumber(user.meta.phone)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Email Address
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words lowercase">
              {user.meta.email}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              BVN
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.account.bvn}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Gender
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.personalInfo.gender}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Marital Status
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.personalInfo.maritalStatus}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Children
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.personalInfo.children}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Type of Residence
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.personalInfo.residenceType}
            </p>
          </div>
        </div>
      </div>
      <hr className="bg-primary-blue my-[30px] h-[1px] w-full opacity-10" />
      <div className="flex flex-col">
        <p className="font-medium">Education and Employment</p>
        <div className="mt-[30px] grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Level of Education
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {replaceHyphensWithSpaces(user.education.level)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Employment Status
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.employment.company && "Employed"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Sector of Employment
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.employment.sector}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Duration of Employment
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words">
              {formatMonthsToYears(user.employment.duration)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Office Email
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words lowercase">
              {user.meta.email}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Monthly Income
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              ₦{formatAmount(user.employment.income)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Loan Repayment
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {formatAmount(user.meta.loanAmount)}
            </p>
          </div>
        </div>
      </div>
      <hr className="bg-primary-blue my-[30px] h-[1px] w-full opacity-10" />
      <div className="flex flex-col">
        <p className="font-medium">Socials</p>
        <div className="mt-[30px] grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Twitter
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              @{user.socials.twitter}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Facebook
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.socials.facebook}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              Instagram
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.socials.instagram}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="small-text text-secondary-font-color uppercase">
              LinkedIn
            </p>
            <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
              {user.socials.linkedin}
            </p>
          </div>
        </div>
      </div>
      <hr className="bg-primary-blue my-[30px] h-[1px] w-full opacity-10" />
      <div className="flex flex-col">
        <p className="font-medium">Guarantor</p>
        {user.guarantors.map((guarantor, index) => (
          <React.Fragment key={guarantor.name}>
            <div className="mt-[30px] grid grid-cols-2 gap-[30px] md:grid-cols-3 lg:grid-cols-4">
              <div className="flex flex-col">
                <p className="small-text text-secondary-font-color uppercase">
                  Full Name
                </p>
                <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
                  {guarantor.name}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="small-text text-secondary-font-color uppercase">
                  Phone Number
                </p>
                <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
                  {formatPhoneNumber(guarantor.phone)}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="small-text text-secondary-font-color uppercase">
                  Email Address
                </p>
                <p className="text-secondary-font-color mt-2 font-medium break-words lowercase">
                  {guarantor.email}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="small-text text-secondary-font-color uppercase">
                  Relationship
                </p>
                <p className="text-secondary-font-color mt-2 font-medium break-words capitalize">
                  {guarantor.relationship}
                </p>
              </div>
            </div>
            {index !== user.guarantors.length - 1 && (
              <hr className="bg-primary-blue mt-[30px] h-[1px] w-full opacity-10" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GeneralDetails;
