import {
	createUserAccount,
	signInUser,
} from "../../utils/firebase/firebase.utils"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"

import "./userForm.css"

type UserFormProps = {
	isLogin: boolean
}

const UserForm = (props: UserFormProps) => {
	const {isLogin} = props
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		getValues,
		//formState: {errors},
	} = useForm({
		defaultValues: {
			name_input: "",
			email_input: "",
			password_input: "",
			confirm_password_input: "",
		},
	})

	const onSubmitHandler = handleSubmit(async (data) => {
		const name = data.name_input
		const email = data.email_input
		const password = data.password_input
		const confirmPassword = data.confirm_password_input

		console.log(name, email, password, confirmPassword)
		let resp
		if (isLogin) resp = await signInUser(email, password)
		else resp = await createUserAccount(email, password)

		if (!(resp instanceof Error)) navigate("/home")
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
				<input
					{...register("email_input", {required: "Email is required."})}
					placeholder="Enter your email"
					type="email"
				/>
				<input
					{...register("password_input", {
						required: "Password is required.",
						minLength: {
							value: 6,
							message: "Password must be atleast 6 characters long!",
						},
					})}
					placeholder="Enter your password"
					type="password"
				/>
				{!isLogin && (
					<input
						{...register("confirm_password_input", {
							required: "Confirmed Password is required.",
							minLength: {
								value: 6,
								message: "Password must be atleast 6 characters long!",
							},
							validate: (value) => {
								const password_value = getValues("password_input")
								return value === password_value || "The passwords do not match"
							},
						})}
						placeholder="Re-enter the above password"
						type="password"
					/>
				)}
				<button type="submit">{isLogin ? "LOGIN" : "SUBMIT"}</button>
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
