import InputBar from "../inputBar/inputBar.component";

type UserFormProps = {
	isLogin: boolean;
};

function UserForm(props: UserFormProps) {
	const { isLogin } = props;

	const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const name = form.name_input.value;
		const email = form.email_input.value;
		const password = form.password_input.value;
		const confirmPassword = form.confirm_password_input?.value;

		console.log(name, email, password, confirmPassword);
	};

	return (
		<div>
			<form onSubmit={onSubmitHandler}>
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
			</form>
		</div>
	);
}

export default UserForm;
