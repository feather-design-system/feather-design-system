export interface ISelectItem extends ISelectItemType {
  _text: string;
}

export interface ISelectItemType {
  [k: string]: unknown;
}
