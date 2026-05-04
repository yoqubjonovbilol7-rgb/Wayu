export class UpdateStaticInfoCommand {
  constructor(
    public readonly id: number,
    public readonly appStoreLink?: string,
    public readonly playMarketLink?: string,
    public readonly aboutUs?: string,
  ) {}
}