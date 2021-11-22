/**
 * トッピングを表すクラスです.
 */
export class Topping {
  constructor(
    public _id: number, //ID
    public _type: string, //タイプ
    public _name: string, //名前
    public _priceM: number, //Mの価格
    public _priceL: number //Lの価格
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
}
