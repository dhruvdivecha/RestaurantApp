export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};


export type MenuItem = {
  _id?: string;
  name: string;
  price: number;
  category: string;
  owner?: string;
};

export type MenuItemsForm = {
  menuItems: MenuItem[];
};