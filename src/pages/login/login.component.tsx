//third party imports
import {useNavigate, Link} from "react-router-dom"

//components
import Form from "../../components/form/form.component"

//utils
import {signInUser} from "../../utils/firebase/firebase.utils"

const LoginPage = () => {
	const navigate = useNavigate()

	const LoginFormFields = [
		{
			name: "email",
			type: "text",
			required: "Email is required.",
			pattern: {
				value:
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: "Invalid email",
			},
		},
		{
			name: "password",
			required: "Password is required",
			minLength: {
				value: 6,
				message: "Password must be atleast 6 characters long.",
			},
			type: "password",
		},
	]

	type DataType = {
		email: string
		password: string
	}

	const onSubmitHandler = async (data: DataType) => {
		const email = data.email
		const password = data.password

		const userResponse = await signInUser(email, password)

		if (userResponse instanceof Error) {
			if (userResponse.message.includes("too-many-requests"))
				return "Too many failed attempts to login to this account. Try again later."
			else if (userResponse.message.includes("wrong-password"))
				return "Incorrect password."
			else if (userResponse.message.includes("user-not-found")) {
				return "User not found"
			} else {
				return userResponse.message
			}
		} else navigate("/")
	}
	return (
		<div className="flex flex-row">
			<div className="hidden sm:flex sm:bg-form-sidebar sm:flex-row sm:justify-center sm:items-center sm:bg-cover w-[37%]">
				<h1 className="sm:not-italic sm:font-bold sm:text-white sm:text-6xl sm:font-lexend-deca sm:-rotate-90">
					Login
				</h1>
			</div>
			<div className="flex h-screen w-full flex-col justify-center items-center gap-8 sm:items-start sm:pl-16 sm:pr-16 sm:box-border sm:w-[63%] lg:pl-32 lg:pr-32">
				<div className="flex flex-col items-center justify-evenly sm:items-start">
					<h1 className="text-4xl m-0 font-light font-dm-serif-display sm:text-4xl lg:text-5xl">
						Welcome
					</h1>

					<p className="m-0 text-lg font-lexend-deca text-secondary-text-color lg:text-2xl">
						Let's log you in quickly
					</p>
				</div>
				<Form
					fields={LoginFormFields}
					buttonText="LOGIN"
					onSubmitHandler={onSubmitHandler}
				></Form>
				<p className="m-0 not-italic font-normal text-bottom-text-color text-base font-lexend-deca lg:text-xl">
					Don't have an account?
					<Link className=" no-underline text-green-text-color" to="../signup">
						{" Signup"}
					</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginPage
