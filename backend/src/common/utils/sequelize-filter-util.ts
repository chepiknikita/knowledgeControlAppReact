import { Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { SortDto } from '../dto/request/sort.dto';
import { FilterDto, FilterOperator } from '../dto/request/filter.dto';

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
  static buildIncludeConditions(includeString?: string, fieldsString?: string): any[] {
    if (!includeString) {
      return [];
    }

    const includes = includeString.split(',').map((field) => field.trim());
    const result = [];

    const fieldsMap: Record<string, string[]> = {};
    if (fieldsString) {
      fieldsString.split(',').forEach((field) => {
        const parts = field.split('.');
        if (parts.length > 1) {
          const assoc = parts[0];
          const attr = parts.slice(1).join('.');
          if (!fieldsMap[assoc]) fieldsMap[assoc] = [];
          fieldsMap[assoc].push(attr);
        }
      });
    }

    for (const includePath of includes) {
      const pathParts = includePath.split('.');
      let currentInclude = result;

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        let existingInclude = currentInclude.find((inc) => inc.association === part);

        if (!existingInclude) {
          existingInclude = { association: part, include: [] };

          if (fieldsMap[part]) {
            existingInclude.attributes = fieldsMap[part];
          }

          currentInclude.push(existingInclude);
        }

        currentInclude = existingInclude.include;
      }
    }

    return result;
  }

  static buildRootAttributes(fieldsString?: string): string[] | undefined {
    if (!fieldsString) return undefined;

    const rootAttrs = fieldsString
      .split(',')
      .map(f => f.trim())
      .filter(f => !f.includes('.'));

    return rootAttrs.length ? rootAttrs : undefined;
  }
}
