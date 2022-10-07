import { useBlockProps } from '@wordpress/block-editor';


export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ 'Categories Tabs – hello from the saved content!' }
		</p>
	);
}
