import { Topping } from "./topping";
/**
 * 注文トッピングを表すクラスです.
 */
export class OrderTopping {
  constructor(
    public _id: number, //ID
    public _toppingId: number, //トッピングID
    public _orderItemId: number, //注文商品ID
    public _topping: Topping //トッピング
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get toppingId(): number {
    return this._toppingId;
  }

  public set toppingId(toppingId: number) {
    this._toppingId = toppingId;
  }

  public get orderItemId(): number {
    return this._orderItemId;
  }

  public set orderItemId(orderItemId: number) {
    this._orderItemId = orderItemId;
  }

  public get Topping(): Array<Topping> {
    return this._Topping;
  }

  public set Topping(Topping: Array<Topping>) {
    this._Topping = Topping;
  }
}
