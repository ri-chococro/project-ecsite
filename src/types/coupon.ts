export class Coupon {
  constructor(
    private _code: string,
    private _discountPrice: number,
    private _couponType: string
  ) {}

  public get code(): string {
    return this._code;
  }

  public set code(code: string) {
    this._code = code;
  }

  public get discountPrice(): number {
    return this._discountPrice;
  }

  public set discountPrice(discountPrice: number) {
    this._discountPrice = discountPrice;
  }
  public get couponType(): string {
    return this._couponType;
  }

  public set couponType(couponType: string) {
    this._couponType = couponType;
  }
}
