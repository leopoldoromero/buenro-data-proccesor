import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IngestedDataRepository } from 'src/ingested_data/domain/IngestedDataRepository';
import {
  IngestedDataDocument,
  IngestedDataDocumentSchema,
} from './IngestedDataDbSchema';
import { IngestedData } from 'src/ingested_data/domain/IngestedData';
import { Criteria } from 'src/shared/domain/criteria/Criteria';
import { MongoDbFilters } from 'src/shared/infrastructure/persistance/mongodb/MongoDbFilters';
import { MongoDbOperator } from 'src/shared/infrastructure/persistance/mongodb/MongoDbOperator';
import { MongoDbOrderType } from 'src/shared/infrastructure/persistance/mongodb/MongoDbOrderType';

@Injectable()
export class IngestedDataMongoRepository implements IngestedDataRepository {
  constructor(
    @InjectModel(IngestedDataDocumentSchema.modelName)
    private readonly model: Model<IngestedDataDocument>,
  ) {}

  async persist(data: IngestedData): Promise<void> {
    await this.model.create(data.getProps());
  }

  async findAllByCriteria(criteria?: Criteria): Promise<Array<IngestedData>> {
    const { filters, limit, skip, sortBy } =
      this.getMongoDbFiltersByCriteria(criteria);
    const dbItems = await this.model
      .find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sortBy);
    return dbItems?.length
      ? dbItems.map((document) => this.toDomain(document))
      : [];
  }

  async persistMany(data: Array<IngestedData>): Promise<void> {
    if (!data.length) return;

    const docs = data.map((d) => d.getProps());

    await this.model.insertMany(docs);
  }

  private toDomain(document: IngestedDataDocumentSchema): IngestedData {
    return new IngestedData({
      id: document.id,
      name: document?.name ?? '',
      city: document.city,
      country: document?.country ?? '',
      isAvailable: document.isAvailable,
      ...(document?.priceSegment && {
        priceSegment: document?.priceSegment,
      }),
      pricePerNight: document.pricePerNight,
      source: document.source,
      ingestedAt: document.ingestedAt,
    });
  }

  private getMongoDbFiltersByCriteria(criteria?: Criteria): MongoDbFilters {
    let filters: any = {};

    if (criteria?.filters) {
      filters = criteria.filters.reduce(
        (acc: MongoDbFilters['filters'], filter) => {
          const field = filter.field.value;
          const operator = MongoDbOperator.create(filter.operator.value).value;
          const value = filter.value.value;
          if (Array.isArray(value)) {
            acc[field] = { $in: value };
          } else {
            acc[field] = { [operator]: value };
          }
          return acc;
        },
        {},
      );
    }

    const limit = criteria?.limit ? Number(criteria.limit) : this.model.length;
    const skip = criteria?.page ? (Number(criteria.page) - 1) * limit : 0;

    const sortBy = criteria?.order?.length
      ? criteria.order.reduce((acc: MongoDbFilters['sortBy'], order) => {
          acc[order.orderBy.value] = Number(
            MongoDbOrderType.create(order.orderType.value),
          );
          return acc;
        }, {})
      : {};

    return { filters, limit, skip, sortBy };
  }
}
