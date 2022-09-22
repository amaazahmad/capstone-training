import {
	createUserAccount,
	signInUser,
} from "../../utils/firebase/firebase.utils"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"

import {useState} from "react"

import Spinner from "react-bootstrap/Spinner"

type UserFormProps = {
	isLogin: boolean
}

const UserForm = (props: UserFormProps) => {
	const {isLogin} = props
	const navigate = useNavigate()

	const [errorMessage, setErrorMessage] = useState<string>()

	const {
		register,
		handleSubmit,
		getValues,
		formState: {errors, isSubmitting},
	} = useForm({
		defaultValues: {
			name_input: "",
			email_input: "",
			password_input: "",
			confirm_password_input: "",
		},
	})

	const onSubmitHandler = handleSubmit(async (data) => {
		//const name = data.name_input
		setErrorMessage("")
		const email = data.email_input
		const password = data.password_input
		const confirmPassword = data.confirm_password_input

		//console.log(name, email, password, confirmPassword)
		if (confirmPassword)
			if (password !== confirmPassword) {
				setErrorMessage("Password and Confirmed Password do not match.")

				return
			}
		let resp
		if (isLogin) resp = await signInUser(email, password)
		else resp = await createUserAccount(email, password)

		if (!(resp instanceof Error)) navigate("/home")
		else {
			console.log(resp.message)
			if (resp.message.includes("too-many-requests"))
				setErrorMessage(
					"Too many failed attempts to login to this account. Try again later."
				)
			else if (resp.message.includes("wrong-password"))
				setErrorMessage("Incorrect password.")
			else if (resp.message.includes("user-not-found")) {
				setErrorMessage("User not found")
			}
		}
	})

	return (
		<div className="box-border flex flex-col justify-center items-center w-full">
			<form
				className="flex flex-col w-4/5 justify-center items-center sm:w-full sm:ml-0"
				onSubmit={onSubmitHandler}
			>
				{!isLogin && (
					<input
						className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
						sm:self-start sm:ml-0 sm:text-sm sm:h-12
						lg:h-[60px] lg:text-lg lg:max-w-[600px] "
						{...register("name_input", {required: "Name is required."})}
						placeholder="Enter your name"
						type="text"
					/>
				)}
				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errors.name_input?.message}
				</p>
				<input
					className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
					sm:self-start sm:ml-0 sm:text-sm sm:h-12
					lg:h-[60px] lg:text-lg lg:max-w-[600px]"
					{...register("email_input", {
						required: "Email is required.",
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Invalid email",
						},
					})}
					placeholder="Enter your email"
				/>

				<p
					className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700"
					//errors.email_input ? " text-red-700" : "errorNotDisplayed"
				>
					{errors.email_input?.message}
				</p>

				<input
					className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
					sm:self-start sm:ml-0 sm:text-sm sm:h-12
					lg:h-[60px] lg:text-lg lg:max-w-[600px]"
					{...register("password_input", {
						required: "Password is required.",
						minLength: {
							value: 6,
							message: "Password must be atleast 6 characters long",
						},
					})}
					placeholder="Enter your password"
					type="password"
				/>
				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errors.password_input?.message}
				</p>
				{!isLogin && (
					<input
						className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
						sm:self-start sm:ml-0 sm:text-sm sm:h-12
						lg:h-[60px] lg:text-lg lg:max-w-[600px]"
						{...register("confirm_password_input", {
							required: "Confirmed Password is required.",
							minLength: {
								value: 6,
								message: "Password must be atleast 6 characters long",
							},
							validate: (value) => {
								const password_value = getValues("password_input")
								return value === password_value || "The passwords do not match"
							},
						})}
						placeholder="Re-enter the password"
						type="password"
					/>
				)}
				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errors.confirm_password_input?.message}
				</p>

				<button
					className="box-border w-full m-2 bg-bottom-text-color opacity-100 border border-white font-lexend-deca not-italic font-semibold text-white text-base p-4 ml-0
					hover:text-bottom-text-color hover:bg-white hover:border hover:border-solid hover:border-bottom-text-color hover:cursor-pointer
					sm:h-[60px] sm:w-48 sm:self-start sm:text-[16px] 
					lg:h-16 lg:text-[20px]"
					onClick={() => {
						setErrorMessage("")
					}}
					type="submit"
				>
					{!isSubmitting ? (
						isLogin ? (
							"LOGIN"
						) : (
							"SUBMIT"
						)
					) : (
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					)}
				</button>
				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errorMessage}
				</p>
			</form>
		</div>
	)
}

export default UserForm
