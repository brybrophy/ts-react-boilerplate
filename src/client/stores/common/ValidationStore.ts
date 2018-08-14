import { observable, action } from 'mobx';
import validator from 'validator';

interface IRule {
    name: string;
    min?: number;
    max?: number;
}

export default class ValidationStore {
    private _validator = validator;
    private _validationMap = {
        required: {
            fn: (value: string) => this._checkIsNotEmpty(value),
            message: () => 'This field is required.'
        },
        isLength: {
            fn: (value: string, rule: IRule) => this._checkLength(value, rule),
            message: (rule: IRule) => this._formatIsLengthMessage(rule)
        },
        isEmail: {
            fn: (value: string) => this._checkIsEmail(value),
            message: () => 'Must be a valid email address.'
        },
        isPhone: {
            fn: (value: string) => this._checkIsPhone(value),
            message: () => 'Must be a valid U.S. phone number.'
        }
    };

    public validateField(field) {
        let isValid = true;
        let message = '';

        for (let rule of field.rules) {
            const validationFn = this._validationMap[rule.name].fn;
            const validationMessage = this._validationMap[rule.name].message;

            if (validationFn) {
                isValid = validationFn(field.value.trim(), rule);
                message = validationMessage(rule);
            }
        }

        return { isValid, message };
    }

    public validateForm(form) {
        const nextForm = Object.assign({}, form);

        for (const fieldName in nextForm) {
            const validation = this.validateField(nextForm[fieldName]);

            if (!validation.isValid) {
                nextForm[fieldName].error = validation.message;
            } else {
                nextForm[fieldName].error = '';
            }
        }

        return nextForm;
    }

    private _checkLength(str: string, rule: IRule) {
        return this._validator.isLength(str, { min: rule.min, max: rule.max });
    }

    private _checkIsNotEmpty(value: string) {
        return !this._validator.isEmpty(value);
    }

    private _checkIsEmail(value: string) {
        return this._validator.isEmail(value);
    }

    private _checkIsPhone(value: string) {
        return value.match(
            /^(\+?1?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/
        );
    }

    private _formatIsLengthMessage(rule: IRule) {
        const minPart = rule.min ? `greater than ${rule.min}` : '';
        const maxPart = rule.max ? `less than ${rule.max}` : '';
        let combiner = '';

        if (minPart && maxPart) {
            combiner = ' and ';
        }

        return `Must be ${minPart}${combiner}${maxPart} characters.`;
    }

    private _sanitizePhoneNumber(number: string) {
        return number
            .replace(' ', '')
            .replace('-', '')
            .replace('(', '')
            .replace(')', '')
            .replace('+', '');
    }
}

export interface IValidationStore extends ValidationStore {};
