/**
 * ユーザーを表すクラスです.
 */
export class User {
  constructor(
    public _id: number, //Id
    public _name: string, //名前
    public _email: string, //Eメール
    public _password: string, //パスワード
    public _zipcode: string, //郵便番号
    public _address: string, //住所
    public _telephone: string //電話番号
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get zipcode(): string {
    return this._zipcode;
  }

  public set zipcode(zipcode: string) {
    this._zipcode = zipcode;
  }

  public get address(): string {
    return this._address;
  }

  public set address(address: string) {
    this._address = address;
  }

  public get telephone(): string {
    return this._telephone;
  }

  public set telephone(telephone: string) {
    this._telephone = telephone;
  }
}
