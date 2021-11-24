import { Topping } from "./topping";

/**
 * 商品を表すクラスです.
 */
export class Item {
  constructor(
    public _id: number, //ID
    public _type: string, //タイプ
    public _name: string, //名前
    public _description: string, //説明
    public _priceM: number, //Mの価格
    public _priceL: number, //Lの価格
    public _imagePath: string, //画像パス
    public _deleted: boolean, //削除フラグ
    public _toppingList: Array<Topping> //トッピングリスト
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get type(): string {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get priceM(): number {
    return this._priceM;
  }

  public set priceM(priceM: number) {
    this._priceM = priceM;
  }

  public get priceL(): number {
    return this._priceL;
  }

  public set priceL(priceL: number) {
    this._priceL = priceL;
  }

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  public get deleted(): boolean {
    return this._deleted;
  }

  public set deleted(deleted: boolean) {
    this._deleted = deleted;
  }

  public get toppingList(): Array<Topping> {
    return this._toppingList;
  }

  public set toppingList(toppingList: Array<Topping>) {
    this._toppingList = toppingList;
  }
}
