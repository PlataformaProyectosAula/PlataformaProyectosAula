// Dependencies
import { useDropzone } from 'react-dropzone';

export const DropZone = ({ onDrop, accept }) => {
	const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

	return (
		<div {...getRootProps()} style={DropZoneStyles}>
			<input type='file' {...getInputProps()} style={inputStyles} />
			<p>
				Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos
			</p>
		</div>
	);
};

const DropZoneStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	transition: 'border .3s ease-in-out',
	cursor: 'pointer',
};

const inputStyles = {
	display: 'none',
	border: 'none',
	backgroundColor: 'inherit',
	outline: 'none',
    cursor: 'pointer',
};
