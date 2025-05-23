import { RouteObject } from "react-router";
import ProtectedChildRoute from "../ProtectedChildRoute";
import AccountIndex from "../../view/account/AccountIndex";
import Expence from "../../view/account/Expence";
import AddCatagory from "../../view/account/AddCatagory";
import ExCategoryCreate from "../../view/account/expencess_category/ExCategoryCreate";
import ExCategoryUpdate from "../../view/account/expencess_category/ExCategoryUpdate";
import ExSubCategoryCreate from "../../view/account/expencess_category/ExSubCategoryCreate";
import ExSubCategoryUpdate from "../../view/account/expencess_category/ExSubCategoryUpdate";
import BankAccountCreate from "../../view/account/bank_account/BankAccountCreate";
import BankAccountIndex from "../../view/account/bank_account/BankAccountIndex";
import BankAccountUpdate from "../../view/account/bank_account/BankAccountUpdate";
import OtherIncomeIndex from "../../view/account/other_income/OtherIncomeIndex";
import OtherIncomeUpdate from "../../view/account/other_income/OtherIncomeUpdate";
import OtherincomeCreate from "../../view/account/other_income/OtherincomeCreate";
import BankDepositCreate from "../../view/account/bank_deposite/BankDepositCreate";
import BankDeposite from "../../view/account/bank_deposite/BankDeposite";
import BankDepositeUpdate from "../../view/account/bank_deposite/BankDepositUpdate";
import ExpenceUpdate from "../../view/account/expencess_category/ExpenceUpdate";
import AddOtherIncome from "../../view/account/other_income/AddOtherIncome";
import OtherIncomeManage from "../../view/account/other_income/OtherIncomeManage";
import SafeIndex from "../../view/account/safe/SafeIndex";
import UpdateOtherIncomePayment from "../../view/account/other_income/UpdateOtherIncomePayment";
import SafeLockerExpence from "../../view/account/SafeLockerExpence";

export const accountRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <AccountIndex />,
      },
    ],
  },
  {
    path: "account/", // you can add paths al you need for the UI
    element: <AccountIndex />, // create UI inside view/account folder then import to here
  },
  {
    path: "expence/", // you can add paths al you need for the UI
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <Expence />,
      },
      {
        path: "update/:expence_id",
        element: <ExpenceUpdate />,
      },
      {
        path: "manage/",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <AddCatagory />,
          },
          {
            path: "main_category",
            element: <ExCategoryCreate />,
          },
          {
            path: "main_category/:main_cat_id",
            element: <ExCategoryUpdate />,
          },
          {
            path: "sub/create/:main_cat_id",
            element: <ExSubCategoryCreate />,
          },
          {
            path: "sub/update/:sub_cat_id",
            element: <ExSubCategoryUpdate />,
          },
        ],
      },
    ],
  },
  {
    path: "add_catagory/", // you can add paths al you need for the UI
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <AddCatagory />,
      },
      {
        path: "main/",
        element: <ExCategoryCreate />,
      },
      {
        path: "main/:id",
        element: <ExCategoryUpdate />,
      },
      {
        path: "sub/create/:id",
        element: <ExSubCategoryCreate />,
      },
      {
        path: "sub/update/:id",
        element: <ExSubCategoryUpdate />,
      },
    ],
  },
  {
    path: "bank_accounts/",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <BankAccountIndex />,
      },
      {
        path: "create/",
        element: <BankAccountCreate />,
      },
      {
        path: "update/:account_id",
        element: <BankAccountUpdate />,
      },
    ],
  },
  {
    path: "other_income/",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <OtherIncomeIndex />,
      },
      {
        path: ":other_income_id",
        element: <UpdateOtherIncomePayment />,
      },
      {
        path: "manage/",
        element: <ProtectedChildRoute />,
        children: [
          {
            index: true,
            element: <OtherIncomeManage />,
          },
          {
            path: "create/",
            element: <OtherincomeCreate />,
          },
          {
            path: "update/:other_income_category_id",
            element: <OtherIncomeUpdate />,
          },
        ],
      },

      {
        path: "add_other_income/",
        element: <AddOtherIncome />,
      },
    ],
  },
  {
    path: "bank_deposite/",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <BankDeposite />,
      },
      {
        path: "create/",
        element: <BankDepositCreate />,
      },
      {
        path: "update/:bank_deposite_id",
        element: <BankDepositeUpdate />,
      },
    ],
  },
  {
    path: "safe/",
    element: <ProtectedChildRoute />,
    children: [
      {
        index: true,
        element: <SafeIndex />,
      },
      {
        path: "safe_expence/",
        element: <SafeLockerExpence />,
      },
    ],
  },
];
