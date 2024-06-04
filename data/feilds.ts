import { categories } from "./categories";

export const articlesFeilds = [
  {
    name: "title",
    placeholder: "عنوان المقالة",
    type: "text",
  },
  {
    name: "category",
    placeholder: "التصنيف",
    type: "select",
    options: categories,
  },
  {
    name: "breif",
    placeholder: "نبذة",
    type: "textarea",
  },
  {
    name: "body",
    placeholder: "المقالة",
    type: "textarea",
  },
];

export const productsFeilds = [
  {
    name: "name",
    placeholder: "اسم الخدمة",
    type: "text",
  },
  {
    name: "cost",
    placeholder: "التكلفة",
    type: "number",
  },
  {
    name: "category",
    placeholder: "التصنيف",
    type: "select",
    options: categories,
  },
  {
    name: "breif",
    placeholder: "نبذة",
    type: "textarea",
  },
  {
    name: "descreption",
    placeholder: "الوصف",
    type: "textarea",
  },
  {
    name: "details",
    placeholder: "التفاصيل",
    type: "textarea",
  },
];

export const userInfoFeilds = [
  {
    name: "displayName",
    placeholder: "اسم المستخدم",
    type: "text",
  },
  {
    name: "email",
    placeholder: "البريد الالكتروني",
    type: "email",
    disabled: true,
  },
  {
    name: "role",
    placeholder: "نوع المستخدم",
    type: "text",

    disabled: true,
  },
  { name: "bio", placeholder: "نبذة عني", type: "textarea" },
];
