import {
	createUserAccount,
	signInUser,
} from "../../utils/firebase/firebase.utils"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"

import "./userForm.css"
import {useState} from "react"

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
		watch,
		formState: {errors},
	} = useForm({
		defaultValues: {
			name_input: "",
			email_input: "",
			password_input: "",
			confirm_password_input: "",
		},
	})

	console.log(errors)
	watch("email_input")

	const onSubmitHandler = handleSubmit(async (data) => {
		//const name = data.name_input
		console.log("CLICKED")
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
		<div className="formContainer">
			<form className="formElement" onSubmit={onSubmitHandler}>
				{!isLogin && (
					<input
						{...register("name_input", {required: "Name is required."})}
						placeholder="Enter your name"
						type="text"
					/>
				)}
				<p
					className={errors.name_input ? "errorDisplayed" : "errorNotDisplayed"}
				>
					{errors.name_input?.message || "a"}
				</p>
				<input
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
					className={
						errors.email_input ? "errorDisplayed" : "errorNotDisplayed"
					}
				>
					{errors.email_input?.message || "a"}
				</p>
				<input
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
				<p
					className={
						errors.password_input ? "errorDisplayed" : "errorNotDisplayed"
					}
				>
					{errors.password_input?.message || "a"}
				</p>
				{!isLogin && (
					<input
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
				<p
					className={
						errors.confirm_password_input
							? "errorDisplayed"
							: "errorNotDisplayed"
					}
				>
					{errors.confirm_password_input?.message || "a"}
				</p>

				<button
					onClick={() => {
						setErrorMessage("")
					}}
					type="submit"
				>
					{isLogin ? "LOGIN" : "SUBMIT"}
				</button>
				<p className={errorMessage ? "errorDisplayed" : "errorNotDisplayed"}>
					{errorMessage || "a"}
				</p>
			</form>
			{/* <form onSubmit={onSubmitHandler}>
				{!isLogin && (
					<InputBar name="name_input" placeHolder="Name" type="text" />
				)}
				<InputBar name="email_input" placeHolder="Email" type="email" />
				<InputBar
					name="password_input"
					placeHolder="Password"
					type="password"
				/>
				{!isLogin && (
					<InputBar
						name="confirm_password_input"
						placeHolder="Confirm Password"
						type="password"
					/>
				)}
				<button type="submit">SUBMIT</button>
			</form> */}
		</div>
	)
}

export default UserForm
