export class User {
  constructor(
    private _token: string,
    public email: string,
    public id: string,
    private _tokenExpirationDate: Date
  ) {}
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
