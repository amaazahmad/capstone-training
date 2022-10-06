import React from "react"

import { FieldValues, useForm } from "react-hook-form"
import { Bars } from 'react-loader-spinner'


type FormFields = {
	name: string
	type: string
	required?: string
	pattern?: {
		value: RegExp
		message: string
	}
	minLength?: {
		value: number
		message: string
	}
	defaultValue?: string
	styles: string
}

type FormProps = {
	fields: FormFields[]
	buttonText: string
	cancelButton?: boolean
	onSubmitHandler: (data: FieldValues) => {}
	onCancelHandler?: () => void
}

const Form = ({ fields, buttonText, cancelButton, onCancelHandler, onSubmitHandler }: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm()

	return (
		<div className="box-border flex flex-col justify-center items-center w-full h-full">
			<form
				className="flex flex-col w-4/5 justify-center items-center h-full sm:w-full "
				onSubmit={handleSubmit(async (data) => {
					await onSubmitHandler(data)
				})}
			>
				{fields.map((field: FormFields, index: number) => {
					const minLengthObj = {
						value: field.minLength ? field.minLength.value : 0,
						message: field.minLength ? field.minLength.message : "",
					}
					const patternObj = {
						value: field.pattern ? field.pattern.value : RegExp(".*?"),
						message: field.pattern ? field.pattern.message : "",
					}

					return (
						<React.Fragment key={field.name}>
							{field.type === 'textarea' ?
								<textarea className={field.styles}
									defaultValue={field.defaultValue}
									placeholder={`Enter your ${field.name}`}
									{...register(field.name, {
										required: field.required,
										pattern: { ...patternObj },
										minLength: { ...minLengthObj },
									})}
								/>
								:
								<input
									className={field.styles}
									type={field.type}
									defaultValue={field.defaultValue}
									placeholder={
										field.name === "confirmPassword"
											? `Re-enter the password`
											: `Enter your ${field.name}`
									}
									{...register(field.name, {
										required: field.required,
										pattern: { ...patternObj },
										minLength: { ...minLengthObj },
									})}
								></input>}

							<p className="m-0 pt-0 pb-3 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
								{errors[field.name] ? `${errors[field.name]?.message}` : ""}
							</p>
						</React.Fragment>
					)
				})}
				<div className={`${cancelButton ? "sm:flex-row-reverse sm:justify-around" : "sm:justify-start"} flex flex-col w-full justify-evenly`}>
					<button
						className={`box-border w-full bg-dark-gray-text-color opacity-100 border border-white font-lexend-deca not-italic font-semibold text-white text-base p-4 ml-0
							hover:text-dark-gray-text-color hover:bg-white hover:border hover:border-solid hover:border-dark-gray-text-color hover:cursor-pointer
							sm:h-[60px] sm:w-40 sm:text-[16px] 
							lg:w-48
							lg:h-16 lg:text-[20px]`}
						type="submit"
					>
						{isSubmitting ? <Bars visible={true} height="24" width="30" color="rgba(86, 204, 106, 1)" wrapperStyle={{ justifyContent: 'center' }} /> : buttonText}
					</button>

					{cancelButton ?
						<button
							className={`box-border w-full bg-dark-gray-text-color opacity-100 border border-white font-lexend-deca not-italic font-semibold text-white text-base p-4 ml-0 mt-3 
								hover:text-dark-gray-text-color hover:bg-white hover:border hover:border-solid hover:border-dark-gray-text-color hover:cursor-pointer
								sm:h-[60px] sm:w-40 sm:text-[16px] sm:mt-0
								
								lg:h-16 lg:text-[20px] lg:w-48`}
							onClick={onCancelHandler}
							type="button"

						>
							CANCEL
						</button>
						:
						<></>
					}
				</div>

			</form>
		</div>
	)
}

export default Form
