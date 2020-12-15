type ID = { id: string };

export interface IMenuObject {
  menuName: string;
  menuLink: string | undefined;
}

export interface IDateRange {
  rangeStart: number;
  rangeEnd: number;
}

export interface IUser extends ID {
  plan: string;
  company: string;
}

export interface ILogo {
  width: string;
  height: string;
}

export interface IPropsLinkItem {
  text: string;
  offset: string;
  href: string;
}

export interface QRProps {
  id: string | null;
  href: string | null;
}

export interface ICheckinDataObject extends ID {
  createdAt: number;
  editedAt: number | null;
  owner: string;
  published: boolean;
}

export interface IAddMenuItem extends ID {
  type: string;
  title: string | null;
  itemTitle: string | null;
  itemPrice: number | null;
  other: string | null;
}

export interface IAddMenuCard {
  uid: string;
  name: string;
  userid: string;
  selfRefLink: string | undefined;
  selfRef: boolean;
  qrcode: boolean;
}

export interface IAddAccountInfo {
  uid: string;
  email: string;
}

export interface AccountInfoStore {
  company: string;
  vat: string;
  phone: string;
  location: string;
  docid: string;
}

export interface IncludedTos extends AccountInfoStore {
  tos: string;
}

export type IContextProps = { children: React.ReactNode };

export interface IPublicInfo {
  createdAt: number;
  docid: string;
  editedAt: number;
  id: string;
  items: {};
  owner: string;
  published: boolean;
}