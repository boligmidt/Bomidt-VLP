import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import theme from 'web/styles/theme';
import { useWindowDimensions } from 'web/styles/breakpoints';

const StyledNavigationModal = styled.div`
	display: flex;
	background-color: ${p => p.theme.colors.blue};
	flex-direction: column;
	width: 300px;
`;

export default function NavigationModal({
	children,
	modalID,
	closeModal,
	open,
}) {
	const { width } = useWindowDimensions();
	const node = useRef();

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	});

	const handleClick = e => {
		if (!node.current.contains(e.target)) {
			closeModal(modalID);
			return;
		}
	};

	let offset = 225;
	if (width >= 768) {
		offset = 300;
	}

	return (
		<motion.div
			style={{
				zIndex: 0,
				position: 'absolute',
				top: 0,
				bottom: 0,
				backgroundColor: theme.colors.blue,
			}}
			animate={{ x: open ? offset : 100 }}
			transition={{ ease: 'easeOut', duration: 0.3 }}>
			<StyledNavigationModal ref={node}>{children}</StyledNavigationModal>
		</motion.div>
	);
}
