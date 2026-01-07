import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { SortDto } from '../dto/sort.dto';
import { FilterDto, FilterOperator } from '../dto/filter.dto';

export class SequelizeFilterUtil {
  static buildWhereConditions(filters: FilterDto[]): WhereOptions {
    if (!filters || filters.length === 0) {
      return {};
    }

    const where: WhereOptions = {};

    filters.forEach((filter) => {
      const value = this.convertValue(filter.value, filter.valueType);
      const value2 = filter.value2
        ? this.convertValue(filter.value2, filter.valueType)
        : undefined;

      switch (filter.operator) {
        case FilterOperator.EQUALS:
          where[filter.field] = value;
          break;

        case FilterOperator.NOT_EQUALS:
          where[filter.field] = { [Op.ne]: value };
          break;

        case FilterOperator.CONTAINS:
          where[filter.field] = { [Op.iLike]: `%${value}%` };
          break;

        case FilterOperator.NOT_CONTAINS:
          where[filter.field] = { [Op.notILike]: `%${value}%` };
          break;

        case FilterOperator.STARTS_WITH:
          where[filter.field] = { [Op.iLike]: `${value}%` };
          break;

        case FilterOperator.ENDS_WITH:
          where[filter.field] = { [Op.iLike]: `%${value}` };
          break;

        case FilterOperator.GREATER_THAN:
          where[filter.field] = { [Op.gt]: value };
          break;

        case FilterOperator.LESS_THAN:
          where[filter.field] = { [Op.lt]: value };
          break;

        case FilterOperator.GREATER_THAN_OR_EQUAL:
          where[filter.field] = { [Op.gte]: value };
          break;

        case FilterOperator.LESS_THAN_OR_EQUAL:
          where[filter.field] = { [Op.lte]: value };
          break;

        case FilterOperator.IN:
          where[filter.field] = {
            [Op.in]: Array.isArray(value) ? value : [value],
          };
          break;

        case FilterOperator.NOT_IN:
          where[filter.field] = {
            [Op.notIn]: Array.isArray(value) ? value : [value],
          };
          break;

        case FilterOperator.IS_NULL:
          where[filter.field] = { [Op.is]: null };
          break;

        case FilterOperator.IS_NOT_NULL:
          where[filter.field] = { [Op.not]: null };
          break;

        case FilterOperator.BETWEEN:
          if (value !== undefined && value2 !== undefined) {
            where[filter.field] = { [Op.between]: [value, value2] };
          }
          break;

        default:
          where[filter.field] = value;
      }
    });

    return where;
  }

  private static convertValue(value: any, valueType?: string): any {
    if (value === undefined || value === null) {
      return value;
    }

    switch (valueType) {
      case 'number':
        return Number(value);

      case 'boolean':
        return value === 'true' || value === true || value === 1;

      case 'date':
        return new Date(value);

      case 'array':
        if (Array.isArray(value)) return value;
        if (typeof value === 'string')
          return value.split(',').map((v) => v.trim());
        return [value];

      case 'string':
      default:
        return String(value);
    }
  }

  /**
   * Преобразует массив сортировок в ORDER для Sequelize
   */
  static buildOrderConditions(sorts: SortDto[]): any[] {
    if (!sorts || sorts.length === 0) {
      return [['createdAt', 'DESC']];
    }

    return sorts.map((sort) => [sort.field, sort.order]);
  }

  /**
   * Преобразует строку include в массив ассоциаций
   */
  static buildIncludeConditions(includeString?: string): any[] {
    if (!includeString) {
      return [];
    }

    const includes = includeString.split(',').map((field) => field.trim());
    const result = [];

    for (const includePath of includes) {
      const pathParts = includePath.split('.');
      let currentInclude = result;
      let currentPath = '';

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        currentPath = currentPath ? `${currentPath}.${part}` : part;

        let existingInclude = currentInclude.find(
          (inc) => inc.association === part,
        );

        if (!existingInclude) {
          existingInclude = {
            association: part,
            include: [],
          };
          currentInclude.push(existingInclude);
        }

        currentInclude = existingInclude.include;
      }
    }
  }

  /**
   * Преобразует строку fields в массив атрибутов
   */
  static buildAttributesConditions(fieldsString?: string): string[] {
    if (!fieldsString) {
      return undefined;
    }

    return fieldsString.split(',').map((field) => field.trim());
  }
}
