import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.i`
	width: ${p => p.width || '35px'};
	text-align: center;
	font-size: ${p => p.fontSize || '1.5rem'};
	margin-right: ${p => (p.marginRight ? p.marginRight : '20px')};
	color: ${p => p.color};
	margin-top: ${p => (p.marginTop ? p.marginTop : '0')};
	cursor: ${p => p.cursor? p.cursor : undefined };
`;

export default function Icon({
	icon,
	solid,
	regular,
	className = '',
	spin,
	pulse,
	size = 'lg',
	...props
}) {
	const iconStyleClass = (solid && 'fas') || (regular && 'far') || 'fal';

	const animationStyleClass = `${(spin && `fa-spin`) || ''} ${(pulse &&
		`fa-pulse`) ||
		''}`;

	const sizeStyleClass = (size && 'fa-' + size) || '';
	return (
		<StyledIcon
			className={`${iconStyleClass} fa-${icon} ${animationStyleClass} ${sizeStyleClass} ${className}`}
			{...props}
		/>
	);
}
