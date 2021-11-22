import { User } from "./user";
import { OrderItem } from "./orderItem";
/**
 * 注文を表すクラスです.
 */
export class Order {
  constructor(
    public _id: string, //ID
    public _userId: number, //ユーザーID
    public _status: number, //状態
    public _totalPrice: number, //合計金額
    public _orderDate: Date, //注文日
    public _distinationName: string, //宛先氏名
    public _distinationEmail: string, //宛先Eメール
    public _distinationZipcode: string, //宛先郵便番号
    public _distinationAddress: string, //宛先住所
    public _distinationTel: string, //宛先電話番号
    public _deliveryTime: Date, //配達日時
    public _paymentMethod: number, //支払い方法
    public _user: Array<User>, //ユーザー
    public _orderItemList: Array<OrderItem> //注文商品リスト
  ) {}

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get userId(): number {
    return this._userId;
  }

  public set userId(userId: number) {
    this._userId = userId;
  }

  public get status(): number {
    return this._status;
  }

  public set status(status: number) {
    this._status = status;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public set totalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
  }

  public get orderDate(): Date {
    return this._orderDate;
  }

  public set orderDate(orderDate: Date) {
    this._orderDate = orderDate;
  }

  public get distinationName(): string {
    return this._distinationName;
  }

  public set distinationName(distinationName: string) {
    this._distinationName = distinationName;
  }

  public get distinationEmail(): string {
    return this._distinationEmail;
  }

  public set distinationEmail(distinationEmail: string) {
    this._distinationEmail = distinationEmail;
  }

  public get distinationZipcode(): string {
    return this._distinationZipcode;
  }

  public set distinationZipcode(distinationZipcode: string) {
    this._distinationZipcode = distinationZipcode;
  }

  public get distinationAddress(): string {
    return this._distinationAddress;
  }

  public set distinationAddress(distinationAddress: string) {
    this._distinationAddress = distinationAddress;
  }

  public get distinationTel(): string {
    return this._distinationTel;
  }

  public set distinationTel(distinationTel: string) {
    this._distinationTel = distinationTel;
  }

  public get deliveryTime(): Date {
    return this._deliveryTime;
  }

  public set deliveryTime(deliveryTime: Date) {
    this._deliveryTime = deliveryTime;
  }

  public get paymentMethod(): number {
    return this._paymentMethod;
  }

  public set paymentMethod(paymentMethod: number) {
    this._paymentMethod = paymentMethod;
  }

  public get user(): Array<User> {
    return this._user;
  }

  public set user(user: Array<User>) {
    this._user = user;
  }

  public get orderItemList(): Array<OrderItem> {
    return this._orderItemList;
  }

  public set orderItemList(orderItemList: Array<OrderItem>) {
    this._orderItemList = orderItemList;
  }
}
