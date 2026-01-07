import { Injectable } from '@nestjs/common';
import { Model, ModelStatic } from 'sequelize';
import { SequelizeFilterUtil } from 'src/common/utils/sequelize-filter-util';
import { PaginationFilterDto } from '../dto/pagination-filter.dto';

@Injectable()
export abstract class BaseService<T extends Model> {
  protected abstract model: ModelStatic<T>;

  /**
   * Универсальный метод для получения данных с пагинацией и фильтрацией
   */
  async findAllPaginated(query: PaginationFilterDto) {
    const {
      page = 1,
      limit = 10,
      filters = [],
      sorts = [],
      include,
      fields,
    } = query;

    const offset = (page - 1) * limit;

    // Строим условия запроса
    const where = SequelizeFilterUtil.buildWhereConditions(filters);
    const order = SequelizeFilterUtil.buildOrderConditions(sorts);
    const includeOptions = SequelizeFilterUtil.buildIncludeConditions(include);
    const attributes = SequelizeFilterUtil.buildAttributesConditions(fields);

    const { count, rows } = await this.model.findAndCountAll({
      where,
      limit,
      offset,
      order,
      include: includeOptions,
      attributes,
      distinct: true,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: count,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      filters: {
        applied: filters.length,
        conditions: filters,
      },
    };
  }
}
