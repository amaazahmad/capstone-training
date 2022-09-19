import InputBar from "../inputBar/inputBar.component";

type UserFormProps = {
	isLogin: boolean;
};

function UserForm(props: UserFormProps) {
	const { isLogin } = props;

	const onSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formElements = form.elements as typeof form.elements & {
			name_input?: { value: string };
			email_input: { value: string };
			password_input: { value: string };
			confirm_password_input?: { value: string };
		};
		const name = formElements.name_input?.value;
		const email = formElements.email_input.value;
		const password = formElements.password_input.value;
		const confirmPassword = formElements.confirm_password_input?.value;

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
