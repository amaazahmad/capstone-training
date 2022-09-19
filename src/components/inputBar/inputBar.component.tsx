type InputBarProps = {
	name: string;
	type: string;
	placeHolder: string;
};

function InputBar(props: InputBarProps) {
	const { name, type, placeHolder } = props;

	return (
		<div>
			<input name={name} placeholder={placeHolder} type={type} />
		</div>
	);
}

export default InputBar;
