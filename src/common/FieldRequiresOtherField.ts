import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
export class FieldRequiresOtherField implements ValidatorConstraintInterface {
  validate(fieldValue: any, validationArguments: ValidationArguments) {
    const fieldThenRequired: string = validationArguments.constraints[0];

    if (fieldValue !== undefined) {
      return validationArguments.object[fieldThenRequired] !== undefined;
    } else {
      return true;
    }
  }

  defaultMessage() {
    return '$constraint1 is required because $property is set';
  }
}
