import {Link} from "react-router-dom"
import UserForm from "../../components/userForm/userForm.component"

const LoginPage = () => {
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
				<UserForm isLogin={true} />
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
