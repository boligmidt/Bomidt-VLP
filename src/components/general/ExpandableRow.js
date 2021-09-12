import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion, AnimatePresence } from 'framer-motion';

const Wrapper = styled.div`
	margin-bottom: 2px;
`;
const Overlay = styled.div`
	background-color: ${rgba('#444', 0.5)};
	position: fixed;
	top: 0;
	left: 0;
	right: 15px;
	bottom: 0;
	z-index: 100;
`;
const ClosedWrap = styled.div`
	display: flex;
	background: ${p => (p.dim ? '#f1f3ff' : 'white')};
`;
const OpenedWrap = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	background: white;
	z-index: 101;
	width: 80%;
	max-height: 90%;
	overflow: auto;
`;

export default function ExpandableRow(props) {
	const [isOpen, setIsOpen] = useState(props.isOpen);
	const [isSubOpen, setIsSubOpen] = useState(false);
	const { closedContent, keepClosedContent = false, children } = props;

	useEffect(() => {
		if (props.isOpen) {
			setIsOpen(true);
			setTimeout(() => {
				setIsSubOpen(true);
			}, 100);
		} else {
			if (props.closeAction) props.closeAction();
			setIsSubOpen(false);
			setTimeout(() => {
				setIsOpen(false);
			}, 500);
		}

		return () => {
			setIsOpen(false);
			setIsSubOpen(false);
		};
	}, [props.isOpen]);

	return (
		<Wrapper isOpen={isOpen}>
			{!isOpen && (
				<ClosedWrap onClick={() => props.handleOpen()} dim={props.dim}>
					{closedContent}
				</ClosedWrap>
			)}

			{isOpen && <Overlay onClick={() => props.handleOpen()} />}

			{isOpen && (
				<OpenedWrap>
					{keepClosedContent && (
						<ClosedWrap>{closedContent}</ClosedWrap>
					)}

					<AnimatePresence initial={false}>
						{isSubOpen && (
							<div style={{ overflow: 'hidden' }}>
								<motion.div
									initial="collapsed"
									animate="open"
									exit="collapsed"
									variants={{
										open: {
											opacity: 1,
											height: 'auto',
										},
										collapsed: {
											opacity: 0,
											height: 0,
										},
									}}
									transition={{
										duration: 0.4,
										ease: [0.04, 0.62, 0.23, 0.98],
									}}>
									{children}
								</motion.div>
							</div>
						)}
					</AnimatePresence>
				</OpenedWrap>
			)}
		</Wrapper>
	);
}
