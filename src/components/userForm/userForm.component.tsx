//react imports
import {useState} from "react"

// third party packes
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"

//utils
import {
	createUserAccount,
	signInUser,
} from "../../utils/firebase/firebase.utils"

type UserFormProps = {
	isLogin: boolean
}

const UserForm = ({isLogin}: UserFormProps) => {
	const navigate = useNavigate()

	const [errorMessage, setErrorMessage] = useState<string>()

	const {
		register,
		handleSubmit,
		getValues,
		formState: {errors, isSubmitting},
	} = useForm({
		defaultValues: {
			nameInput: "",
			emailInput: "",
			passwordInput: "",
			confirmPasswordInput: "",
		},
	})

	const onSubmitHandler = handleSubmit(async (data) => {
		setErrorMessage("")
		const email = data.emailInput
		const password = data.passwordInput

		const userResponse = isLogin
			? await signInUser(email, password)
			: await createUserAccount(email, password)

		if (userResponse instanceof Error) {
			if (userResponse.message.includes("too-many-requests"))
				setErrorMessage(
					"Too many failed attempts to login to this account. Try again later."
				)
			else if (userResponse.message.includes("wrong-password"))
				setErrorMessage("Incorrect password.")
			else if (userResponse.message.includes("user-not-found")) {
				setErrorMessage("User not found")
			} else {
				setErrorMessage(userResponse.message)
			}
		} else navigate("/home")
	})

	return (
		<div className="box-border flex flex-col justify-center items-center w-full">
			<form
				className="flex flex-col w-4/5 justify-center items-center sm:w-full sm:ml-0"
				onSubmit={onSubmitHandler}
			>
				{isLogin ? (
					<></>
				) : (
					<input
						className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
						sm:self-start sm:ml-0 sm:text-sm sm:h-12
						lg:h-[60px] lg:text-lg lg:max-w-[600px] "
						{...register("nameInput", {required: "Name is required."})}
						placeholder="Enter your name"
						type="text"
					/>
				)}
				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errors.nameInput?.message}
				</p>
				<input
					className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
					sm:self-start sm:ml-0 sm:text-sm sm:h-12
					lg:h-[60px] lg:text-lg lg:max-w-[600px]"
					{...register("emailInput", {
						required: "Email is required.",
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Invalid email",
						},
					})}
					placeholder="Enter your email"
				/>

				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errors.emailInput?.message}
				</p>

				<input
					className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
					sm:self-start sm:ml-0 sm:text-sm sm:h-12
					lg:h-[60px] lg:text-lg lg:max-w-[600px]"
					{...register("passwordInput", {
						required: "Password is required.",
						minLength: {
							value: 6,
							message: "Password must be atleast 6 characters long.",
						},
					})}
					placeholder="Enter your password"
					type="password"
				/>
				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errors.passwordInput?.message}
				</p>
				{isLogin ? (
					<></>
				) : (
					<input
						className="box-border w-full not-italic text-gray-900 outline-none leading-5 text-base m-0 p-4 border border-solid border-secondary-text-color font-lexend-deca focus:border-green-text-color placeholder-secondary-text-color
					sm:self-start sm:ml-0 sm:text-sm sm:h-12
					lg:h-[60px] lg:text-lg lg:max-w-[600px]"
						{...register("confirmPasswordInput", {
							required: "Confirmed Password is required.",
							minLength: {
								value: 6,
								message: "Password must be atleast 6 characters long.",
							},
							validate: (value) => {
								const password_value = getValues("passwordInput")
								return value === password_value || "The passwords do not match."
							},
						})}
						placeholder="Re-enter the password"
						type="password"
					/>
				)}
				<p className="m-0 p-0 self-start text-base font-lexend-deca after:content-[''] after:inline-block lg:text-[18px]  text-red-700">
					{errors.confirmPasswordInput?.message}
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
						<span>LOADING...</span>
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
