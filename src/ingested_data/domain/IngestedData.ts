import { Guard } from 'src/shared/domain/Guard';

interface IngestedDataProps {
  id: number;
  name?: string;
  country?: string;
  city: string;
  isAvailable: boolean;
  priceSegment?: 'high' | 'medium' | 'low';
  pricePerNight: number;
  source: string;
  ingestedAt: Date;
}
export class IngestedData {
  private readonly MIN_PRICE_PERNIGHT = 100;
  private readonly MAX_PRICE_PERNIGHT = 1000;
  private readonly REQUIRED_PARAMS = [
    'id',
    'city',
    'isAvailable',
    'pricePerNight',
    'source',
    'ingestedAt',
  ];
  private readonly AVAILABLE_PRICE_SEGMENTS = ['high', 'medium', 'low'];
  constructor(private readonly props: IngestedDataProps) {
    this.validate(props);
  }

  private validate(props: IngestedDataProps) {
    const guardResult = Guard.againstNullOrUndefined(
      props,
      this.REQUIRED_PARAMS,
    );
    if (!guardResult.succeeded) throw new Error(guardResult.message);
    if (
      props.pricePerNight < this.MIN_PRICE_PERNIGHT ||
      props.pricePerNight > this.MAX_PRICE_PERNIGHT
    ) {
      throw new Error(
        `pricePerNight must be between: ${this.MIN_PRICE_PERNIGHT} and ${this.MAX_PRICE_PERNIGHT}`,
      );
    }

    if (
      props?.priceSegment &&
      !this.AVAILABLE_PRICE_SEGMENTS.includes(props?.priceSegment)
    ) {
      throw new Error(
        `priceSegment must one of: ${this.AVAILABLE_PRICE_SEGMENTS.join(',')}`,
      );
    }
  }

  public getProps(): IngestedDataProps {
    return this.props;
  }

  public getProp<T extends keyof IngestedDataProps>(
    prop: T,
  ): IngestedDataProps[T] {
    return this.props[prop];
  }
}
