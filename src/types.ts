export interface IMenuObject {
  menuName: string;
  menuLink: string | undefined;
}

export interface IDateRange {
  rangeStart: number;
  rangeEnd: number;
}

export interface IUser {
  id: string;
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

export interface ICheckinDataObject {
  createdAt: number;
  editedAt: number | null;
  id: string;
  owner: string;
  published: boolean;
}

export type IContextProps = { children: React.ReactNode };
