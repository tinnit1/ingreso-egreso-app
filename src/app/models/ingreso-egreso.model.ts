export class IngresoEgreso {
  uid: string;
  constructor(
    public description: string,
    public amount: number,
    public type: string,
    // public uid?: string
  ) {
  }
}
