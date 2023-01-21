/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, HeadingProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ConfirmFormInputValues = {
    Field0?: string;
};
export declare type ConfirmFormValidationValues = {
    Field0?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ConfirmFormOverridesProps = {
    ConfirmFormGrid?: PrimitiveOverrideProps<GridProps>;
    SectionalElement0?: PrimitiveOverrideProps<HeadingProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ConfirmFormProps = React.PropsWithChildren<{
    overrides?: ConfirmFormOverridesProps | undefined | null;
} & {
    onSubmit: (fields: ConfirmFormInputValues) => void;
    onChange?: (fields: ConfirmFormInputValues) => ConfirmFormInputValues;
    onValidate?: ConfirmFormValidationValues;
} & React.CSSProperties>;
export default function ConfirmForm(props: ConfirmFormProps): React.ReactElement;
